import React, {useCallback, useEffect, useState} from 'react'
import {supabase} from './useVoxupAuth.js'
import {Users, Coins, Package, Search, ShieldCheck, Gift, ListChecks, FlaskConical, RefreshCw, Plus, Minus, Crown, Activity, TrendingUp, AlertTriangle, Lock, Check, ClipboardList} from 'lucide-react'

const ru = (lang, r, u, e) => lang==='uk'?u:lang==='en'?e:r
const money = cents => (Number(cents ?? 0)/100).toLocaleString('ru-RU',{minimumFractionDigits:2,maximumFractionDigits:2})
const message = err => err?.message || String(err || 'Unknown error')
const makeId = () => crypto.randomUUID()
export function inputToCents(value){
  const text=String(value).trim().replace(/\s/g,'').replace(',','.')
  if (!/^\d{1,10}(\.\d{1,2})?$/.test(text)) return null
  const [whole,fraction='']=text.split('.')
  const n=Number(whole)*100+Number((fraction+'00').slice(0,2))
  return Number.isSafeInteger(n)&&n<=10000000000?n:null
}

function Status({error,success}){return <>{error&&<p className="cloudError" role="alert">{error}</p>}{success&&<p className="cloudSuccess" role="status">{success}</p>}</>}

export function CloudEconomy({auth,lang='ru'}) {
 const [wallet,setWallet]=useState(null)
 const [items,setItems]=useState([])
 const [recent,setRecent]=useState([])
 const [loading,setLoading]=useState(false)
 const [error,setError]=useState('')
 const [feedback,setFeedback]=useState('')
 const [promo,setPromo]=useState('')
 const [busy,setBusy]=useState(false)
 const userId=auth.user?.id
 const refresh=useCallback(async()=>{
   if(!supabase||!userId||!auth.nickname)return
   setLoading(true);setError('')
   const [w,i,h]=await Promise.all([
     supabase.from('voxup_wallets').select('balance_cents').eq('user_id',userId).maybeSingle(),
     supabase.from('voxup_user_items').select('item_id,quantity').eq('user_id',userId).order('quantity',{ascending:false}).limit(100),
     supabase.from('voxup_economy_ledger').select('action,amount_cents,item_id,quantity,created_at').eq('target_user_id',userId).order('created_at',{ascending:false}).limit(5)
   ])
   if(w.error||i.error||h.error)setError(message(w.error||i.error||h.error))
   else {setWallet(w.data?.balance_cents??0);setItems(i.data||[]);setRecent(h.data||[])}
   setLoading(false)
 },[userId,auth.nickname])
 useEffect(()=>{refresh()},[refresh])
 async function redeem(e){
  e.preventDefault();if(busy||!promo.trim())return
  setBusy(true);setError('');setFeedback('')
  try{
   const {data,error:err}=await supabase.rpc('voxup_redeem_cloud_promo',{p_code:promo.trim().toUpperCase(),p_request_id:makeId()})
   if(err)throw err
   const d=Array.isArray(data)?data[0]:data
   setFeedback(ru(lang,`Награда: ${money(d?.awarded_cents)} MC${d?.awarded_item_id?' + '+d.awarded_quantity+' × '+d.awarded_item_id:''}`,`Нагорода: ${money(d?.awarded_cents)} MC`,`Awarded ${money(d?.awarded_cents)} MC`))
   setPromo('');await refresh()
  }catch(err){setError(message(err))}finally{setBusy(false)}
 }
 if(!userId||!auth.nickname)return null
 return <section className="cloudCard" aria-label="Онлайн-экономика">
  <div className="cloudHead"><div><span className="cloudKicker"><ShieldCheck size={14}/> VOXUP CLOUD / SERVER</span><h3>{ru(lang,'Онлайн-кошелёк и коллекция','Онлайн-гаманець та колекція','Online wallet & collection')}</h3><p>{ru(lang,'Независимы от локальных MC и JSON. Пока серверные кейсы не подключены, награды выдаются через администратора и онлайн-промокоды.','Окремо від локальних монет та JSON.','Separate from local demo coins and saves.')}</p></div><button className="cloudOutline" disabled={loading} onClick={refresh}><RefreshCw size={15}/> {loading?'...':'Обновить'}</button></div>
  <div className="cloudStats"><div><small>ONLINE MC</small><strong>{wallet===null?'—':money(wallet)}</strong></div><div><small>{ru(lang,'ПРЕДМЕТОВ В ОБЛАКЕ','РЕЧЕЙ У ХМАРІ','CLOUD ITEMS')}</small><strong>{items.reduce((sum,i)=>sum+i.quantity,0)}</strong></div><div><small>{ru(lang,'ТИПОВ ПРЕДМЕТОВ','ВИДІВ ПРЕДМЕТІВ','ITEM TYPES')}</small><strong>{items.length}</strong></div></div>
  {items.length>0&&<div className="cloudItems">{items.slice(0,10).map(i=><span key={i.item_id}>{i.item_id} <b>×{i.quantity}</b></span>)}</div>}
  <form onSubmit={redeem} className="cloudPromoRow"><label>{ru(lang,'Общий промокод (онлайн)','Спільний промокод','Cloud promo code')}<input value={promo} onChange={e=>setPromo(e.target.value.toUpperCase())} maxLength={24} placeholder="ENTER CODE" autoComplete="off"/></label><button className="primary" disabled={busy||!promo.trim()} type="submit"><Gift size={16}/>{busy?'...':'Активировать'}</button></form>
  <Status error={error} success={feedback}/>
  {recent.length>0&&<div className="cloudRecent"><b>ОПЕРАЦИИ</b>{recent.map((x,i)=><span key={`${x.created_at}-${i}`}>{x.action} · {x.item_id?`${x.quantity} × ${x.item_id}`:`${money(x.amount_cents)} MC`} <small>{new Date(x.created_at).toLocaleDateString()}</small></span>)}</div>}
 </section>
}

function Chip({children}){return <span className="cloudChip">{children}</span>}

export function OnlineAdmin({auth,localConsole,items=[],lang='ru'}) {
 const [tab,setTab]=useState('overview')
 const [players,setPlayers]=useState([]),[query,setQuery]=useState(''),[selected,setSelected]=useState(null)
 const [inventory,setInventory]=useState([]),[stats,setStats]=useState(null)
 const [top,setTop]=useState([]),[logs,setLogs]=useState([]),[promos,setPromos]=useState([])
 const [amount,setAmount]=useState('1000'),[note,setNote]=useState('Admin award')
 const [itemId,setItemId]=useState('diamond'),[qty,setQty]=useState('1')
 const [promoCode,setPromoCode]=useState(''),[promoAmount,setPromoAmount]=useState('500')
 const [promoItem,setPromoItem]=useState(''),[promoQty,setPromoQty]=useState('0'),[promoUses,setPromoUses]=useState('100'),[promoDays,setPromoDays]=useState('0')
 const [busy,setBusy]=useState(false),[loading,setLoading]=useState(false)
 const [error,setError]=useState(''),[success,setSuccess]=useState('')
 const rpc=async(name,args={})=>{const {data,error:err}=await supabase.rpc(name,args);if(err)throw err;return data}
 const refresh=useCallback(async(needle='')=>{
  if(!auth.isAdmin||!supabase)return
  setLoading(true);setError('')
  try{
   const [s,p,t,l,c]=await Promise.all([
    rpc('voxup_admin_stats'),rpc('voxup_admin_list_players',{p_query:needle,p_limit:30}),
    rpc('voxup_admin_top_players',{p_limit:10}),rpc('voxup_admin_recent_actions',{p_limit:40}),
    rpc('voxup_admin_list_promos',{p_limit:50})
   ])
   setStats(Array.isArray(s)?s[0]:s);setPlayers(p||[]);setTop(t||[]);setLogs(l||[]);setPromos(c||[])
  }catch(e){setError(message(e))}finally{setLoading(false)}
 },[auth.isAdmin])
 useEffect(()=>{refresh()},[refresh])
 const loadInventory=useCallback(async(player)=>{
  if(!player)return
  try{const data=await rpc('voxup_admin_get_inventory',{p_user_id:player.user_id});setInventory(data||[])}catch(e){setError(message(e))}
 },[])
 useEffect(()=>{if(selected)loadInventory(selected)},[selected?.user_id])
 async function changeCoins(sign){
  if(!selected||busy)return
  const cents=inputToCents(amount)
  if(cents===null||cents<=0){setError('Неверная сумма: максимум 100 000 000 MC, до 2 знаков.');return}
  if(sign<0&&!window.confirm(`Списать ${money(cents)} MC с ${selected.nickname}?`))return
  await action(async()=>{
   const balance=await rpc('voxup_admin_change_coins',{p_user_id:selected.user_id,p_delta_cents:cents*sign,p_note:note,p_request_id:makeId()})
   setSelected(p=>({...p,balance_cents:balance}));return `${sign>0?'Начислено':'Списано'} ${money(cents)} MC`;
  })
 }
 async function changeItem(sign){
  if(!selected||busy)return
  const n=Number(qty)
  if(!Number.isSafeInteger(n)||n<1||n>100){setError('Количество 1–100');return}
  if(sign<0&&!window.confirm(`Списать ${n} × ${itemId} у ${selected.nickname}?`))return
  await action(async()=>{
   await rpc('voxup_admin_change_item',{p_user_id:selected.user_id,p_item_id:itemId,p_delta:n*sign,p_note:note,p_request_id:makeId()});
   await loadInventory(selected);return `${sign>0?'Выдан':'Списан'} ${n} × ${itemId}`;
  })
 }
 async function action(work){
  setBusy(true);setError('');setSuccess('')
  try{const msg=await work();setSuccess(msg);await refresh(query)}catch(e){setError(message(e))}finally{setBusy(false)}
 }
 async function createPromo(e){
  e.preventDefault()
  const cents=inputToCents(promoAmount),n=Number(promoQty),uses=Number(promoUses),days=Number(promoDays)
  if(cents===null||!Number.isInteger(n)||n<0||n>100||!Number.isInteger(uses)||uses<1||uses>100000||!Number.isInteger(days)||days<0||days>3650||(!cents&&!n)||Boolean(promoItem)!==Boolean(n)){
   setError('Проверь сумму, предмет, количество (до 100), лимит и срок действия.');return
  }
  await action(async()=>{const name=await rpc('voxup_admin_create_promo',{
   p_code:promoCode.trim().toUpperCase(),p_amount_cents:cents,p_item_id:promoItem||null,p_quantity:n,p_max_uses:uses,
   p_expires_at:days?new Date(Date.now()+days*86400000).toISOString():null
  });setPromoCode('');return `Онлайн-промокод ${name} создан`})
 }
 async function setPromoActive(p){await action(async()=>{await rpc('voxup_admin_set_promo_active',{p_code:p.code,p_active:!p.active});return `Промокод ${p.code}: ${p.active?'отключён':'включён'}`})}
 const tabs=[['overview','Обзор',Activity],['players','Игроки',Users],['promos','Промокоды',Gift],['logs','Журнал',ClipboardList]]
 if(!auth.isAdmin)return null
 return <section className="onlineAdmin">
  <header className="onlineAdminHeader"><div><span className="cloudKicker"><Crown size={16}/> AUTHORIZED ACCOUNT · VOXUP CONTROL CENTER</span><h1>Администрирование</h1><p>Управление онлайн-профилями через Supabase. Локальный игровой режим отделён от защищённого сервера.</p></div><button className="cloudOutline" onClick={()=>refresh(query)} disabled={loading||busy}><RefreshCw size={16}/>{loading?'Загрузка':'Обновить данные'}</button></header>
  <nav className="adminTabs" aria-label="Администрирование">{tabs.map(([id,label,Icon])=><button key={id} className={tab===id?'selected':''} onClick={()=>{setTab(id);setError('');setSuccess('')}}><Icon size={16}/>{label}</button>)}</nav>
  {tab!=='lab'&&<Status error={error} success={success}/>}
  {tab==='overview'&&<><div className="adminOverviewStats"><div><Users/><small>ИГРОКИ</small><strong>{stats?.players??'—'}</strong></div><div><Coins/><small>ВСЕ ОНЛАЙН MC</small><strong>{stats?money(stats.total_coins_cents):'—'}</strong></div><div><Package/><small>ПРЕДМЕТЫ В ОБЛАКЕ</small><strong>{stats?.total_items??'—'}</strong></div><div><Activity/><small>ОПЕРАЦИЙ ЗА 24 Ч</small><strong>{stats?.actions_24h??'—'}</strong></div></div>
   <div className="cloudPanel"><h3><TrendingUp size={19}/> Топ игроков по онлайн-балансу</h3>{top.length?<div className="cloudRankList">{top.map((p,i)=><div key={p.nickname}><span><b>#{i+1}</b> @{p.nickname}</span><strong>{money(p.balance_cents)} MC</strong><small>Коллекция: {money(p.inventory_value_cents)} MC</small></div>)}</div>:<p className="cloudMuted">Пока нет данных</p>}</div>
  </>}
  {tab==='players'&&<div className="adminPlayerGrid"><div className="cloudPanel"><h3><Users size={19}/> Игроки</h3><form className="cloudSearch" onSubmit={e=>{e.preventDefault();refresh(query)}}><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Найти по уникальному нику" maxLength={60}/><button type="submit" className="cloudOutline"><Search size={16}/>Найти</button></form><div className="cloudPlayers">{players.map(p=><button key={p.user_id} className={selected?.user_id===p.user_id?'active':''} onClick={()=>{setSelected(p);setError('');setSuccess('')}}><span><b>@{p.nickname}</b><small>{p.items_total} шт. · {new Date(p.created_at).toLocaleDateString()}</small></span><strong>{money(p.balance_cents)} MC</strong></button>)}{!players.length&&<p>Игроки не найдены</p>}</div></div>
  <div className="cloudPanel">{selected?<><div className="adminSelected"><div><span className="cloudKicker">PLAYER PROFILE</span><h3>@{selected.nickname}</h3><small>{selected.user_id.slice(0,8)}…</small></div><Chip>{money(selected.balance_cents)} MC</Chip></div><label className="cloudField">Комментарий операции<input value={note} onChange={e=>setNote(e.target.value)} maxLength={200}/></label>
  <div className="cloudOperation"><h4><Coins size={17}/> MC Coins</h4><label className="cloudField">Сумма<input value={amount} onChange={e=>setAmount(e.target.value)} inputMode="decimal" placeholder="1500,25"/></label><div className="adminActions"><button disabled={busy} onClick={()=>changeCoins(1)}><Plus size={16}/> Начислить</button><button disabled={busy} onClick={()=>changeCoins(-1)} className="danger"><Minus size={16}/> Списать</button></div></div>
<div className="cloudOperation"><h4>Девять тайников</h4><div className="adminActions"><button type="button" disabled={busy} onClick={()=>{if(!window.confirm(`Сбросить часовой таймер игрока @${selected.nickname}?`))return;action(async()=>{await rpc('voxup_admin_reset_vault',{p_user_id:selected.user_id});return `Таймер игрока @${selected.nickname} сброшен`})}}>Сбросить таймер игрока</button></div></div>  <div className="cloudOperation"><h4><Package size={17}/> Инвентарь</h4><div className="cloudFieldRow"><label className="cloudField">Предмет<select value={itemId} onChange={e=>setItemId(e.target.value)}>{items.map(item=><option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label className="cloudField">Количество<input type="number" min="1" max="100" value={qty} onChange={e=>setQty(e.target.value)}/></label></div><div className="adminActions"><button disabled={busy} onClick={()=>changeItem(1)}><Plus size={16}/> Выдать</button><button disabled={busy} onClick={()=>changeItem(-1)} className="danger"><Minus size={16}/> Забрать</button></div><div className="cloudItems">{inventory.length?inventory.map(i=><span key={i.item_id}>{i.item_name} <b>×{i.quantity}</b></span>):<span>Инвентарь пока пуст</span>}</div></div>
  </>:<div className="cloudEmpty"><Users size={34}/><h3>Выбери игрока</h3><p>Найди ник слева, чтобы выдать или списать MC и Minecraft-предметы.</p></div>}</div></div>}
  {tab==='promos'&&<div className="adminPlayerGrid"><div className="cloudPanel"><h3><Gift size={19}/> Создать общий промокод</h3><form className="adminPromoForm" onSubmit={createPromo}><label className="cloudField">Код<input required value={promoCode} onChange={e=>setPromoCode(e.target.value.toUpperCase().replace(/[^A-Z0-9_-]/g,''))} maxLength={24} minLength={3} placeholder="VOXUP2026"/></label><label className="cloudField">MC Coins<input value={promoAmount} onChange={e=>setPromoAmount(e.target.value)} inputMode="decimal"/></label><label className="cloudField">Предмет<select value={promoItem} onChange={e=>setPromoItem(e.target.value)}><option value="">Без предмета</option>{items.map(i=><option key={i.id} value={i.id}>{i.name}</option>)}</select></label><label className="cloudField">Количество предметов<input type="number" value={promoQty} onChange={e=>setPromoQty(e.target.value)} min="0" max="100"/></label><label className="cloudField">Максимум активаций<input type="number" value={promoUses} min="1" max="100000" onChange={e=>setPromoUses(e.target.value)}/></label><label className="cloudField">Истекает через дней (0 = без срока)<input type="number" value={promoDays} min="0" max="3650" onChange={e=>setPromoDays(e.target.value)}/></label><button className="primary" disabled={busy} type="submit"><Plus size={16}/> Создать на сервере</button></form></div>
  <div className="cloudPanel"><h3><ListChecks size={19}/> Активные и прошлые коды</h3><p className="cloudMuted">Только администраторы видят список действующих промокодов и награды.</p><div className="cloudPromoList">{promos.map(p=><div key={p.code}><div><b>{p.code}</b><small>{money(p.amount_cents)} MC {p.item_id?` + ${p.quantity} × ${p.item_id}`:''}</small><small>{p.used_count}/{p.max_uses} активаций</small></div><button disabled={busy} className="cloudOutline" onClick={()=>setPromoActive(p)}>{p.active?'Отключить':'Включить'}</button></div>)}{!promos.length&&<p>Промокодов ещё нет</p>}</div></div></div>}
  {tab==='logs'&&<div className="cloudPanel"><h3><ClipboardList size={19}/> Серверный журнал действий</h3><div className="cloudLogList">{logs.map((x,i)=><div key={`${x.created_at}-${i}`}><span><b>{x.action}</b> · @{x.actor} → @{x.target}</span><strong>{x.item_id?`${x.quantity} × ${x.item_id}`:`${money(x.amount_cents)} MC`}</strong><small>{x.note} · {new Date(x.created_at).toLocaleString()}</small></div>)}{!logs.length&&<p>Операций пока нет</p>}</div><p className="cloudMuted">Журнал пишется в Supabase; редактирование локального JSON на него не влияет.</p></div>}

 </section>
}
