import { useCallback, useEffect, useRef, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

// The publishable key is designed for the browser. NEVER put a service_role or
// secret key in VITE_* variables: they become public parts of the JavaScript.
const url = import.meta.env.VITE_SUPABASE_URL?.trim()
const key = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY)?.trim()
const configured = Boolean(url && key && /^https:\/\//.test(url))
const client = configured ? createClient(url, key, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
}) : null

const EMPTY = { configured, ready: !configured, user: null, nickname: null, isAdmin: false, error: '' }

export function useVoxupAuth() {
  const [auth, setAuth] = useState(EMPTY)
  const request = useRef(0)

  const reload = useCallback(async (maybeUser) => {
    if (!client) return
    const token = ++request.current
    try {
      let user = maybeUser
      if (user === undefined) {
        const { data, error } = await client.auth.getUser()
        if (error && error.name !== 'AuthSessionMissingError') throw error
        user = data?.user ?? null
      }
      if (!user) {
        if (token === request.current) setAuth({ ...EMPTY, ready: true })
        return
      }
      const [profileResult, adminResult] = await Promise.all([
        client.from('voxup_profiles').select('nickname').eq('user_id', user.id).maybeSingle(),
        client.from('voxup_admins').select('user_id').eq('user_id', user.id).maybeSingle()
      ])
      if (profileResult.error) throw profileResult.error
      if (adminResult.error) throw adminResult.error
      if (token === request.current) setAuth({
        configured: true, ready: true, user,
        nickname: profileResult.data?.nickname ?? null,
        isAdmin: Boolean(adminResult.data?.user_id), error: ''
      })
    } catch (error) {
      if (token === request.current) setAuth((old) => ({
        ...old, ready: true, isAdmin: false,
        error: error?.message || 'Не удалось загрузить онлайн-профиль'
      }))
    }
  }, [])

  useEffect(() => {
    if (!client) return
    let active = true
    // Do not issue Supabase queries synchronously inside the auth callback:
    // they can deadlock with the session event processing in some SDK versions.
    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
      Promise.resolve().then(() => { if (active) reload(session?.user ?? null) })
    })
    reload()
    return () => {
      active = false
      request.current += 1
      subscription.unsubscribe()
    }
  }, [reload])

  async function signInGoogle() {
    if (!client) throw new Error('Supabase ещё не настроен')
    const { error } = await client.auth.signInWithOAuth({
      provider: 'google', options: { redirectTo: window.location.origin }
    })
    if (error) throw error
  }

  async function saveNickname(value) {
    if (!client || !auth.user) throw new Error('Сначала войди через Google')
    const nickname = String(value).trim()
    if (!/^[A-Za-z0-9_]{3,20}$/.test(nickname)) {
      throw new Error('Ник: 3–20 символов, латинские буквы, цифры или _')
    }
    const { error } = await client.from('voxup_profiles').insert({
      user_id: auth.user.id, nickname
    })
    if (error) {
      if (error.code === '23505') throw new Error('Этот ник уже занят. Выбери другой.')
      if (error.code === '23514') throw new Error('Ник не проходит проверку правил.')
      throw error
    }
    await reload(auth.user)
  }

  async function signOut() {
    if (!client) return
    const { error } = await client.auth.signOut()
    if (error) throw error
    request.current += 1
    setAuth({ ...EMPTY, ready: true })
  }

  return { ...auth, signInGoogle, saveNickname, signOut, refresh: () => reload() }
}
