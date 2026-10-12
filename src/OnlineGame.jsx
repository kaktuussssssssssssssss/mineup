import React, {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react'
import {createPortal} from 'react-dom'
import {supabase} from './useVoxupAuth.js'
import {VoxelThumbnail, VoxelViewer} from './Voxel3D.jsx'
import {ShieldCheck, Coins, Gift, Package, Swords, Search, RefreshCw, LockKeyhole, Check, X, ArrowRight, Trophy, AlertTriangle, CircleHelp, Sparkles, ChevronDown, Zap, Timer} from 'lucide-react'

const fmtMoney = cents => (Number(cents || 0)/100).toLocaleString('ru-RU',{minimumFractionDigits:2,maximumFractionDigits:2})
const textError = error => error?.message || String(error || 'Неизвестная ошибка')
const randomId = () => crypto.randomUUID()
const SPIN_MS = 5000
const WIN_INDEX = 45
const CARD = 126
const GAP = 10
const rarityColors = {COMMON:'#96a3aa',UNCOMMON:'#e4c286',RARE:'#5fdbc3',EPIC:'#7faaff',LEGENDARY:'#c697ff',MYTHIC:'#f485d2'}
const translate = (lang,ru,uk,en) => lang==='uk'?uk:lang==='en'?en:ru
function ItemArt({id,textureSource,blockIds,large=false}) {
  if(!id)return <span className="serverMystery">?</span>
  return large ? <VoxelViewer id={id} label={id} textureSource={textureSource} blockIds={blockIds}/> : <VoxelThumbnail id={id} textureSource={textureSource} blockIds={blockIds}/>
}

export function OnlineGame({auth,lang='ru',textureSource,blockIds=[],activeTab='cases',onWalletChange,onItemsChange}) {
 const tab=activeTab
 const [cases,setCases]=useState([]),[drops,setDrops]=useState([]),[catalog,setCatalog]=useState([])
 const [wallet,setWallet]=useState(null),[owned,setOwned]=useState({}),[pending,setPending]=useState(null),[history,setHistory]=useState([])
 const [limits,setLimits]=useState({starter:false,freeAt:null}),[clock,setClock]=useState(Date.now())
 const [selectedCase,setSelectedCase]=useState(null),[oddsOpen,setOddsOpen]=useState(false)
 const [src,setSrc]=useState('iron'),[target,setTarget]=useState('diamond')
 const [search,setSearch]=useState(''),[sourceSearch,setSourceSearch]=useState(''),[targetSearch,setTargetSearch]=useState('')
 const [status,setStatus]=useState(''),[error,setError]=useState(''),[loading,setLoading]=useState(true)
 const [working,setWorking]=useState(false),[spin,setSpin]=useState(null),[resultVisible,setResultVisible]=useState(true),[pendingDismissed,setPendingDismissed]=useState(false)
 const [vault,setVault]=useState(null),[vaultBusy,setVaultBusy]=useState(false)
 const walletRef=useRef(onWalletChange),itemsRef=useRef(onItemsChange)
 walletRef.current=onWalletChange;itemsRef.current=onItemsChange
 const lock=useRef(false),trackRef=useRef(null),pointerRef=useRef(null),spinTimer=useRef(null),animations=useRef([]),caseDialogRef=useRef(null)
 const userId=auth.user?.id
 useEffect(()=>setPendingDismissed(false),[pending?.request_id])
 const itemMap=useMemo(()=>Object.fromEntries(catalog.map(i=>[i.item_id,i])),[catalog])
 const ownedList=useMemo(()=>catalog.filter(i=>(owned[i.item_id]||0)>0),[catalog,owned])
 const dropsByCase=useMemo(()=>{const map={};for(const d of drops)(map[d.case_id]||=([])).push(d);return map},[drops])
 const currentCase=cases.find(c=>c.case_id===selectedCase)
 const currentDrops=dropsByCase[selectedCase]||[]
 const showName=id=>itemMap[id]?.item_name||id
 const price=id=>Number(itemMap[id]?.price_cents||0)
 const sourcePrice=price(src),targetPrice=price(target)
 const validUpgrade=Boolean(sourcePrice>0 && targetPrice>sourcePrice && targetPrice/sourcePrice<=900 && (owned[src]||0)>0)
 const chance=validUpgrade?Math.min(90,90*sourcePrice/targetPrice):0
 const invalidUpgradeReason=!ownedList.length?'В инвентаре нет предметов. Открой бесплатный кейс.':!(owned[src]>0)?'Выбери предмет из своего инвентаря.':!sourcePrice?'Не удалось загрузить цену исходного предмета.':!targetPrice?'Выбери предмет для улучшения.':targetPrice<=sourcePrice?'Цель должна стоить дороже исходного предмета.':targetPrice/sourcePrice>900?'Цель слишком дорогая для апгрейда (максимум ×900).':null


 const sortedCases=useMemo(()=>[...cases].sort((a,b)=>a.price_cents-b.price_cents || a.case_id-b.case_id),[cases])
 const refresh=useCallback(async({silent=false}={})=>{
  if(!supabase||!userId||!auth.nickname)return
  if(!silent)setLoading(true)
  setError('')
  const [caseResult,dropResult,dropResult2,catResult,walletResult,itemsResult,pendingResult,historyResult,starterResult,freeResult,vaultResult]=await Promise.all([
   supabase.from('voxup_game_cases').select('case_id,code,name,price_cents,cooldown_seconds,once_per_user,active').eq('active',true),
   supabase.from('voxup_game_case_drops').select('case_id,item_id,weight').order('case_id',{ascending:true}).order('item_id',{ascending:true}).range(0,999),
   supabase.from('voxup_game_case_drops').select('case_id,item_id,weight').order('case_id',{ascending:true}).order('item_id',{ascending:true}).range(1000,1999),
   supabase.from('voxup_item_catalog').select('item_id,item_name,rarity,price_cents,active').eq('active',true).order('price_cents',{ascending:true}),
   supabase.from('voxup_wallets').select('balance_cents').eq('user_id',userId).maybeSingle(),
   supabase.from('voxup_user_items').select('item_id,quantity').eq('user_id',userId).limit(500),
   supabase.from('voxup_game_pending').select('user_id,request_id,item_id,outcome,source_kind,created_at').eq('user_id',userId).maybeSingle(),
   supabase.from('voxup_game_actions').select('kind,case_id,result,created_at').eq('user_id',userId).order('created_at',{ascending:false}).limit(40),
   supabase.from('voxup_game_actions').select('created_at').eq('user_id',userId).eq('kind','case').eq('case_id',21).limit(1),
   supabase.from('voxup_game_actions').select('created_at').eq('user_id',userId).eq('kind','case').eq('case_id',0).order('created_at',{ascending:false}).limit(1),
   supabase.from('voxup_vault_rounds').select('user_id,opened_at,cell_index,slots,prize_id').eq('user_id',userId).maybeSingle()
  ])
  const fail=[caseResult,dropResult,dropResult2,catResult,walletResult,itemsResult,pendingResult,historyResult,starterResult,freeResult,vaultResult].find(r=>r.error)
  if(fail)setError(textError(fail.error))
  else{
   setCases(caseResult.data||[])
   setDrops([...(dropResult.data||[]),...(dropResult2.data||[])])
   setCatalog(catResult.data||[])
   const nextWallet=Number(walletResult.data?.balance_cents??0)
   setWallet(nextWallet);walletRef.current?.(nextWallet)
   const nextItems=(itemsResult.data||[])
   setOwned(Object.fromEntries(nextItems.map(i=>[i.item_id,i.quantity])));itemsRef.current?.(nextItems)
   setPending(pendingResult.data||null)
   setHistory(historyResult.data||[])
   setLimits({starter:Boolean(starterResult.data?.length),freeAt:freeResult.data?.[0]?.created_at?new Date(freeResult.data[0].created_at).getTime()+86400000:null})
   setVault(vaultResult.data||null)
  }
  if(!silent)setLoading(false)
 },[userId,auth.nickname])
 useEffect(()=>{refresh()},[refresh])
 useEffect(()=>{const timer=setInterval(()=>setClock(Date.now()),1000);return()=>clearInterval(timer)},[])
 useEffect(()=>{
   if(selectedCase===null)return
   const oldOverflow=document.body.style.overflow
   document.body.style.overflow='hidden'
   const frame=requestAnimationFrame(()=>{if(caseDialogRef.current){caseDialogRef.current.scrollTop=0;caseDialogRef.current.focus({preventScroll:true})}})
   const onEscape=e=>{if(e.key==='Escape')setSelectedCase(null)}
   document.addEventListener('keydown',onEscape)
   return()=>{cancelAnimationFrame(frame);document.removeEventListener('keydown',onEscape);document.body.style.overflow=oldOverflow}
 },[selectedCase])
 useEffect(()=>{setSelectedCase(null);setOddsOpen(false)},[tab])
 useEffect(()=>()=>{if(spinTimer.current)clearTimeout(spinTimer.current);for(const animation of animations.current)animation.cancel()},[])
 useEffect(()=>{
  if((owned[src]||0)>0 || !ownedList.length)return
  setSrc(ownedList[0].item_id)
 },[ownedList,src,owned])
 useEffect(()=>{
  const sp=price(src),tp=price(target)
  if(!sp || (tp>sp && tp/sp<=900))return
  const option=catalog.find(i=>i.price_cents>sp && i.price_cents<=sp*900)
  if(option)setTarget(option.item_id)
 },[src,target,catalog])
 function chooseWeight(pool){
  let r=Math.random()*1000000
  for(const d of pool){r-=d.weight;if(r<0)return d.item_id}
  return pool.at(-1)?.item_id
 }
 const startSpin=(mode,response,entries=[])=>{
  if(mode==='case')setSelectedCase(null)
  setSpin({mode,response,entries,key:randomId()})
  setResultVisible(false)
  setWorking(false)
 }
 useLayoutEffect(()=>{
  if(!spin)return
  const node=spin.mode==='case'?trackRef.current:pointerRef.current
  if(!node){setSpin(null);setResultVisible(true);return}
  const start=spin.mode==='case'?-CARD/2:0
  const finish=spin.mode==='case'?-(WIN_INDEX*(CARD+GAP)+CARD/2):(7*360+Number(spin.response.roll||50)*3.6)
  const frames=spin.mode==='case' ? [{transform:`translate3d(${start}px,-50%,0)`},{transform:`translate3d(${finish}px,-50%,0)`}] : [{transform:'rotate(0deg)'},{transform:`rotate(${finish}deg)`}]
  const anim=node.animate(frames,{duration:SPIN_MS,easing:'cubic-bezier(.09,.68,.16,1)',fill:'forwards'})
  animations.current.push(anim)
  let done=false
  const complete=()=>{
   if(done)return
   done=true
   if(spinTimer.current)clearTimeout(spinTimer.current)
   try{anim.commitStyles()}catch{node.style.transform=spin.mode==='case'?`translate3d(${finish}px,-50%,0)`:`rotate(${finish}deg)`}
   anim.cancel()
   setSpin(null)
   setResultVisible(true)
  }
  anim.onfinish=complete
  spinTimer.current=setTimeout(complete,SPIN_MS+800)
  return()=>{anim.onfinish=null;if(spinTimer.current)clearTimeout(spinTimer.current);anim.cancel()}
 },[spin?.key])
 async function transact(name,args,handler){
  if(lock.current||pending||spin)return
  lock.current=true;setWorking(true);setError('');setStatus('')
  try{
   const {data,error:err}=await supabase.rpc(name,{...args,p_request_id:randomId()})
   if(err)throw err
   if(!data || typeof data!=='object')throw new Error('Сервер не вернул результат операции. Попробуй обновить страницу.')
   await refresh({silent:true})
   await handler?.(data)
  }catch(err){setError('Не удалось выполнить действие: '+textError(err));setStatus('');await refresh({silent:true})}
  finally{lock.current=false;setWorking(false)}
 }
 async function openCase(){
  if(!currentCase)return
  await transact('voxup_game_open_case',{p_case_id:currentCase.case_id},async data=>{
   const pool=currentDrops
   const entries=Array.from({length:55},(_,i)=>i===WIN_INDEX?data.itemId:chooseWeight(pool))
   startSpin('case',data,entries)
  })
 }
 async function upgrade(){
  if(pending){setPendingDismissed(false);setResultVisible(true);setStatus('');return}
  if(lock.current||spin||working)return
  if(!validUpgrade){setError(invalidUpgradeReason||'Проверь выбранные предметы.');return}
  await transact('voxup_game_upgrade',{p_source_item_id:src,p_target_item_id:target},async data=>startSpin('upgrade',data))
 }
 async function resolve(action){
  if(!pending||lock.current||spin)return
  lock.current=true;setWorking(true);setError('')
  try{
   const {error:err}=await supabase.rpc('voxup_game_resolve',{p_action:action,p_request_id:randomId()})
   if(err)throw err
   setStatus(action==='sell'?translate(lang,'Продано за 96% цены.','Продано за 96% ціни.','Sold for 96% of item value.'):action==='claim'?translate(lang,'Предмет добавлен в инвентарь!','Предмет додано до інвентарю!','Item added to your inventory!'):translate(lang,'Продолжаем!','Продовжуємо!','Continue!'))
   await refresh({silent:true})
  }catch(err){setError(textError(err));await refresh({silent:true})}
  finally{lock.current=false;setWorking(false)}
 }
 async function sellItem(id){
  if(!id || lock.current || pending || spin)return
  lock.current=true;setWorking(true);setError('')
  try{
   const {error:err}=await supabase.rpc('voxup_game_sell_item',{p_item_id:id,p_request_id:randomId()})
   if(err)throw err
   setStatus(`${showName(id)}: +${fmtMoney(Math.floor(price(id)*.96))} MC`)
   await refresh({silent:true})
  }catch(err){setError(textError(err));await refresh({silent:true})}
  finally{lock.current=false;setWorking(false)}
 }
 const expiredFree=()=>Boolean(limits.freeAt && clock < limits.freeAt)
 const started=()=>limits.starter
 async function openVault(cellIndex){
  if(vaultBusy||lock.current || cellIndex<0||cellIndex>8)return
  setVaultBusy(true);setError('')
  try{
    const {error:err}=await supabase.rpc('voxup_open_vault',{p_cell:cellIndex,p_request_id:randomId()})
    if(err)throw err
    await refresh({silent:true})
  }catch(err){setError(textError(err))}
  finally{setVaultBusy(false)}
 }
 const countdown=limits.freeAt&&clock<limits.freeAt?new Date(limits.freeAt-clock).toISOString().slice(11,19):null
 const poolByPrice=[...currentDrops].sort((a,b)=>b.weight-a.weight)
 const caseUsed=currentCase?.once_per_user && started()
 const freeUsed=currentCase?.case_id===0 && expiredFree()
 const visibleCases=sortedCases.filter(c=>(c.name+' '+c.code).toLowerCase().includes(search.trim().toLowerCase()))
 const targets=catalog.filter(i=>i.price_cents>sourcePrice && i.price_cents<=sourcePrice*900 && i.item_name.toLowerCase().includes(targetSearch.trim().toLowerCase()))
 const sources=ownedList.filter(i=>i.item_name.toLowerCase().includes(sourceSearch.trim().toLowerCase()))
 const displayedOwned=ownedList.filter(i=>i.item_name.toLowerCase().includes(search.trim().toLowerCase())).sort((a,b)=>b.price_cents-a.price_cents)
 const winner=spin?.response?.itemId || pending?.item_id

 if(!auth.user||!auth.nickname)return <section className="serverCard"><p>Войди через Google и создай ник в личном кабинете.</p></section>
 return <div className="serverGame voxupSeamlessGame">
  {pending && !spin && pendingDismissed && <button type="button" className="serverRewardReminder" onClick={()=>setPendingDismissed(false)}><Gift size={16}/> Незабранный приз — открыть</button>}
  {error&&<p className="serverAlert error" role="alert"><AlertTriangle size={18}/>{error}</p>}
  {status&&<p className="serverAlert success" role="status"><Check size={18}/>{status}</p>}
  {loading?<div className="serverCard"><p>Загружаем…</p></div>:<>
   {tab==='cases' && <><div className="serverToolbar"><div><h2>Кейсы VOXUP <small>{cases.length}</small></h2><p>Собери свою коллекцию. Бесплатный кейс доступен раз в сутки.</p></div><label><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Найти кейс"/></label></div>
    <div className="serverCases">{visibleCases.map(c=>{
     const pool=dropsByCase[c.case_id]||[]
     const feature=[...pool].sort((a,b)=>b.weight-a.weight).slice(0,3)
     return <button type="button" key={c.case_id} className={'serverCaseCard '+(selectedCase===c.case_id?'selected':'')} onClick={()=>{setSelectedCase(c.case_id);setOddsOpen(false)}}><small>#{String(c.case_id+1).padStart(2,'0')} / {c.code}</small><div className="serverCaseArt">{feature.map((d,k)=><span key={d.item_id} className={'serverCaseSample sample'+k} style={{'--rarity':rarityColors[itemMap[d.item_id]?.rarity]||'#888'}}><img src={textureSource(d.item_id)} alt="" loading="lazy"/></span>)}</div><strong>{c.name}</strong><span>{c.price_cents?fmtMoney(c.price_cents)+' MC':c.once_per_user?'БЕСПЛАТНО · 1 РАЗ':'БЕСПЛАТНО · 24Ч'}</span></button>
    })}</div>
    {currentCase && createPortal(<div className="serverCaseBackdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setSelectedCase(null)}}><section ref={caseDialogRef} tabIndex={-1} className="serverCaseDetail" role="dialog" aria-modal="true" aria-label={currentCase.name}><button className="serverCloseCase" aria-label="Закрыть" type="button" onClick={()=>setSelectedCase(null)}><X size={20}/></button><div className="serverCaseTitle"><div><span className="eyebrow">VOXUP / CASE #{currentCase.case_id+1}</span><h2>{currentCase.name}</h2><p>{currentCase.price_cents?fmtMoney(currentCase.price_cents)+' MC':'Бесплатно'} · {currentDrops.length} возможных предметов</p></div><button className="primary" disabled={working||!!pending||!!spin||caseUsed||freeUsed||wallet<currentCase.price_cents} onClick={openCase}><Gift size={16}/>{caseUsed?'УЖЕ ОТКРЫТ':freeUsed?`ЖДАТЬ ${countdown||'24Ч'}`:working?'ОТКРЫТИЕ…':'ОТКРЫТЬ'}</button></div>
     <div className="serverCaseHeroPreview" aria-hidden="true">{[...currentDrops].sort((a,b)=>b.weight-a.weight).slice(0,3).map((d,i)=><div key={d.item_id} className={'serverCaseHeroItem hero'+i} style={{'--rarity':rarityColors[itemMap[d.item_id]?.rarity]||'#aaa'}}><img src={textureSource(d.item_id)} alt=""/></div>)}</div>
     <button type="button" className="serverDisclosure" onClick={()=>setOddsOpen(v=>!v)}><CircleHelp size={16}/> Шансы и содержимое ({currentDrops.length}) <ChevronDown size={16}/></button>
     {oddsOpen&&<div className="serverOdds">{poolByPrice.map(d=><div key={d.item_id}><img src={textureSource(d.item_id)} alt=""/><span>{showName(d.item_id)}<small>{fmtMoney(price(d.item_id))} MC</small></span><b>{(d.weight/10000).toLocaleString('ru-RU',{maximumFractionDigits:4})}%</b></div>)}</div>}
    </section></div>,document.body)}</>}
   {tab==='upgrade'&&<><div className="serverToolbar"><div><h2>Мастерская апгрейда</h2><p>Выбери свой предмет и цель. Чем дороже цель, тем меньше шанс.</p></div></div>{error&&<div className="serverUpgradeInlineError" role="alert">{error}</div>}
    <div className="serverUpgradeArea"><div className="serverUpgradeSlot"><span>ТВОЙ ПРЕДМЕТ</span><ItemArt id={src} textureSource={textureSource} blockIds={blockIds} large/><strong>{showName(src)}</strong><small>{fmtMoney(sourcePrice)} MC · В наличии: {owned[src]||0}</small></div><div className="serverChanceWrap"><div className="serverWheel" style={{'--chance':`${chance}%`}}><div className="serverArrow" ref={pointerRef} aria-hidden="true"><i/></div><div className="serverWheelText"><b>{chance.toFixed(2)}%</b><small>ШАНС</small></div></div><button type="button" className="primary serverUpgradeButton" disabled={working||!!spin||loading} onClick={upgrade}><Zap size={16}/>{pending?'ЗАВЕРШИТЬ ПРИЗ':working?'ОЖИДАНИЕ…':'АПГРЕЙД'}</button><div className="serverUpgradeHint" role="status" aria-live="polite">{pending?'Сначала забери или продай предыдущий выигрыш.':invalidUpgradeReason||'Один предмет и один результат за попытку.'}</div></div><div className="serverUpgradeSlot"><span>ЦЕЛЬ</span><ItemArt id={target} textureSource={textureSource} blockIds={blockIds} large/><strong>{showName(target)}</strong><small>{fmtMoney(targetPrice)} MC</small></div></div>
    <div className="serverPickers"><section><h3>Из инвентаря</h3><label><Search size={16}/><input value={sourceSearch} onChange={e=>setSourceSearch(e.target.value)} placeholder="Поиск предмета"/></label><div className="serverItemGrid">{sources.map(i=><button key={i.item_id} onClick={()=>setSrc(i.item_id)} className={src===i.item_id?'active':''}><img src={textureSource(i.item_id)} alt=""/><span>{i.item_name}<small>×{owned[i.item_id]} · {fmtMoney(i.price_cents)} MC</small></span></button>)}</div></section><section><h3>Выбери цель</h3><label><Search size={16}/><input value={targetSearch} onChange={e=>setTargetSearch(e.target.value)} placeholder="Поиск цели"/></label><div className="serverItemGrid">{targets.map(i=><button key={i.item_id} onClick={()=>setTarget(i.item_id)} className={target===i.item_id?'active':''}><img src={textureSource(i.item_id)} alt=""/><span>{i.item_name}<small>{fmtMoney(i.price_cents)} MC</small></span></button>)}</div></section></div>
   </>}
   {tab==='arcade' && <section className="voxupVaults">
     <div className="serverToolbar"><div><h2>Девять тайников</h2><p>Открой одну клетку и узнай, что могло скрываться в остальных. Новая попытка каждый час.</p></div></div>
     {(()=>{
       const until=vault?.opened_at?new Date(vault.opened_at).getTime()+3600000:0
       const timeLeft=Math.max(0,until-clock)
       const ready=timeLeft===0
       const shown=Array.isArray(vault?.slots)&&vault.slots.length===9&&!ready
       const hh=Math.floor(timeLeft/3600000),mm=Math.floor(timeLeft%3600000/60000),ss=Math.ceil(timeLeft%60000/1000)
       return <><div className="voxupVaultStatus">{ready?'Выбери клетку':`Следующая попытка через ${[hh,mm,ss].map(v=>String(v).padStart(2,'0')).join(':')}`}</div><div className="voxupVaultGrid">{Array.from({length:9},(_,i)=><button key={i} disabled={!ready||vaultBusy} type="button" onClick={()=>openVault(i)} className={'voxupVaultCell '+(shown&&i===vault.cell_index?'won':'')}><span className="vaultNumber">0{i+1}</span>{shown?<><img src={textureSource(vault.slots[i])} alt=""/><strong>{showName(vault.slots[i])}</strong><small>{i===vault.cell_index?'ТВОЙ ПРЕДМЕТ':fmtMoney(price(vault.slots[i]))+' MC'}</small></>:<><Gift size={38}/><span>?</span></>}</button>)}</div>{shown&&<p className="vaultNote">Твой выигрыш уже в инвентаре. Остальные клетки показывают, что могло выпасть.</p>}</>
     })()}
   </section>}
   {tab==='inventory'&&<><div className="serverToolbar"><div><h2>Мой инвентарь</h2><p>Все твои предметы в одном месте.</p></div><label><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Искать предмет"/></label></div><div className="serverInventory">{displayedOwned.map(i=><div key={i.item_id} className="serverInvCard"><ItemArt id={i.item_id} textureSource={textureSource} blockIds={blockIds}/><strong>{i.item_name}</strong><small>{fmtMoney(i.price_cents)} MC · ×{owned[i.item_id]}</small><button disabled={working||!!pending||!!spin} onClick={()=>sellItem(i.item_id)}>Продать за {fmtMoney(Math.floor(i.price_cents*.96))} MC</button></div>)}{!displayedOwned.length&&<div className="serverCard">Пока нет предметов. Открой бесплатный кейс!</div>}</div></>}
 
  </>}
  {spin&&<div className="serverSpinOverlay" role="dialog" aria-modal="true" aria-label="Идёт открытие"><section className="serverSpinDialog"><h2>{spin.mode==='case'?'ОТКРЫТИЕ КЕЙСА':'АПГРЕЙД'}</h2><p>Удача уже определена. Смотри, что выпадет!</p>{spin.mode==='case'?<div className="serverReelWindow"><span className="serverReelMarker"/><div className="serverReelTrack" ref={trackRef}>{spin.entries.map((id,i)=><div key={`${i}-${id}`} style={{'--rarity':rarityColors[itemMap[id]?.rarity]||'#aaa'}}><img src={textureSource(id)} alt=""/><small>{showName(id)}</small></div>)}</div></div>:<div className="serverSpinWheel" style={{'--chance':`${Number(spin.response.chance||0)}%`}}><div className="serverSpinPointer" ref={pointerRef}><i/></div><b>{Number(spin.response.chance||0).toFixed(2)}%</b></div>}<span className="serverSpinBar"/></section></div>}
  {pending&&!spin&&resultVisible&&!pendingDismissed&&<div className="serverPendingOverlay" role="dialog" aria-modal="true" aria-label="Результат"><section className="serverPendingDialog"><button type="button" className="serverCloseCase" aria-label="Закрыть окно и забрать позже" title="Забрать позже" onClick={()=>setPendingDismissed(true)}><X size={20}/></button><span className="eyebrow"><Sparkles size={15}/> VOXUP / REWARD</span><h2>{pending.outcome==='win'?'ТВОЙ ВЫИГРЫШ!':'НЕУДАЧА'}</h2>{pending.item_id?<><div className="serverPrizeArt"><ItemArt id={pending.item_id} textureSource={textureSource} blockIds={blockIds} large/></div><strong>{showName(pending.item_id)}</strong><small>{fmtMoney(price(pending.item_id))} MC</small><div className="serverPendingActions"><button className="primary" disabled={working} onClick={()=>resolve('claim')}><Check size={17}/> ЗАБРАТЬ</button><button disabled={working} onClick={()=>resolve('sell')}><Coins size={17}/> ПРОДАТЬ +{fmtMoney(Math.floor(price(pending.item_id)*.96))} MC</button></div></>:<><p>Исходный предмет потрачен. Можно попробовать снова с другим предметом.</p><button className="primary" disabled={working} onClick={()=>resolve('ack')}><ArrowRight size={16}/> ПРОДОЛЖИТЬ</button></>}<small className="serverMuted"><LockKeyhole size={14}/> Не забудь забрать свою награду.</small></section></div>}
 </div>
}
