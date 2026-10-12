import React, { useState } from 'react'
import { CheckCircle2, Cloud, ShieldCheck, LogOut, UserRound, LockKeyhole } from 'lucide-react'

export function GoogleAccount({ auth, lang = 'ru' }) {
  const [saving, setSaving] = useState(false)
  const [nickname, setNickname] = useState('')
  const [error, setError] = useState('')
  const texts = {
    ru: { title: 'Google-аккаунт VOXUP', config: 'Google-вход ещё не подключён. Настрой настройки входа.', login: 'Войти через Google', logout: 'Выйти', loaded: 'Онлайн-профиль', nickname: 'Никнейм', email: 'Google-почта', admin: 'Администратор', player: 'Игрок', busy: 'Загрузка профиля…', save: 'Создать ник', create: 'Придумай уникальный ник', rules: 'От 3 до 20 символов: A–Z, 0–9, _. Ник нельзя будет менять на этом этапе.', local: 'Все игровые предметы и MC сохраняются в аккаунте.' },
    uk: { title: 'Google-акаунт VOXUP', config: 'Google-вхід ще не підключено. Налаштуй налаштування входу.', login: 'Увійти через Google', logout: 'Вийти', loaded: 'Онлайн-профіль', nickname: 'Нікнейм', email: 'Google-пошта', admin: 'Адміністратор', player: 'Гравець', busy: 'Завантаження профілю…', save: 'Створити нік', create: 'Створи унікальний нік', rules: 'Від 3 до 20 символів: A–Z, 0–9, _. На цьому етапі змінити нік не можна.', local: 'Усі предмети та MC зберігаються у профілі.' },
    en: { title: 'VOXUP Google account', config: 'Google sign-in is not connected yet. Configure your sign-in configuration.', login: 'Continue with Google', logout: 'Sign out', loaded: 'Online profile', nickname: 'Nickname', email: 'Google email', admin: 'Administrator', player: 'Player', busy: 'Loading profile…', save: 'Create nickname', create: 'Choose a unique nickname', rules: '3–20 characters: A–Z, 0–9, _. Nicknames cannot be changed at this stage.', local: 'Your items and MC Coins are saved in your account.' }
  }
  const t = texts[lang] || texts.en

  async function run(fn) {
    setError('')
    setSaving(true)
    try { await fn() } catch (e) { setError(e?.message || 'Что-то пошло не так') }
    finally { setSaving(false) }
  }
  async function register(e) { e.preventDefault(); await run(() => auth.saveNickname(nickname)) }

  return <section className="onlineAccountPanel" aria-label={t.title}>
    <div className="onlineAccountHead"><div><div className="eyebrow">VOXUP / PROFILE</div><h3>{t.title}</h3></div><Cloud size={25}/></div>
    {!auth.configured ? <p className="onlineAccountInfo">{t.config}</p> : !auth.ready ? <p className="onlineAccountInfo">{t.busy}</p> : !auth.user ?
      <><p className="onlineAccountInfo">{t.local}</p><button className="primary googleButton" type="button" disabled={saving} onClick={() => run(auth.signInGoogle)}><span className="googleG">G</span>{t.login}</button></> :
      <><div className="onlineAccountIdentity"><span className="onlineAvatar">{auth.user.user_metadata?.avatar_url ? <img src={auth.user.user_metadata.avatar_url} alt="" referrerPolicy="no-referrer"/> : <UserRound size={22}/>}</span><div><b>{auth.nickname || t.create}</b><small>{auth.user.email || ''}</small></div><span className="onlineRole">{auth.isAdmin ? <><ShieldCheck size={14}/>{t.admin}</> : <><CheckCircle2 size={14}/>{t.player}</>}</span></div>
      {auth.nickname ? <div className="onlineInfoRow"><CheckCircle2 size={17}/>{t.loaded}: <b>@{auth.nickname}</b></div> :
      <form onSubmit={register} className="onlineNicknameForm"><label htmlFor="voxup-nickname">{t.create}</label><div className="onlineNickRow"><input required autoComplete="off" maxLength={20} id="voxup-nickname" value={nickname} onChange={e => setNickname(e.target.value)} placeholder="Player_2026"/><button type="submit" disabled={saving} className="primary">{t.save}</button></div><small>{t.rules}</small></form>}
      
      <button type="button" className="secondaryBtn" disabled={saving} onClick={() => run(auth.signOut)}><LogOut size={16}/>{t.logout}</button>
      </>}
    {(error || auth.error) && <p className="onlineAccountError" role="alert">{error || auth.error}</p>}
  </section>
}
