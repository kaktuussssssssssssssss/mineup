import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Gem, Layers3, Boxes, UserRound, Settings2, ArrowUpRight, ChevronRight, LockKeyhole, Gift, Sparkles, Menu, X, Check, ShieldCheck, Coins, Globe2, SlidersHorizontal, Wallet, Swords, RotateCcw } from 'lucide-react'

const mcTextureRoot = 'https://raw.githubusercontent.com/Faithful-Pack/Default-Java/1.21.8/assets/minecraft/textures/'
const itemTextures = {
  cobblestone: 'block/cobblestone.png',
  coal: 'item/coal.png',
  iron: 'item/iron_ingot.png',
  gold: 'item/gold_ingot.png',
  emerald: 'item/emerald.png',
  diamond: 'item/diamond.png',
  diamond_sword: 'item/diamond_sword.png',
  totem: 'item/totem_of_undying.png',
  netherite: 'item/netherite_ingot.png',
  nether_star: 'item/nether_star.png',
  dragon_egg: 'block/dragon_egg.png',
  enchanted_apple: 'item/golden_apple.png'
}
const textureSource = (id) => mcTextureRoot + (itemTextures[id] || itemTextures.diamond)

const cases = [
  ['FREE CASE', 'Бесплатный', 0, '#a8b5ac', 'Земля / уголь / палки'],
  ['VILLAGE', 'Деревенский', 100, '#c89b6c', 'Деревня и инструменты'],
  ['MINER', 'Шахтёрский', 300, '#96a5af', 'Руды и ресурсы'],
  ['IRON AGE', 'Железная эпоха', 750, '#b1bcc1', 'Железные предметы'],
  ['GOLD RUSH', 'Золотая лихорадка', 1500, '#e2ba61', 'Золотые находки'],
  ['REDSTONE', 'Редстоун', 3000, '#d75d57', 'Механизмы и схемы'],
  ['DIAMOND', 'Алмазный', 6000, '#64d1dc', 'Алмазное снаряжение'],
  ['NETHER', 'Незер', 12000, '#eb8265', 'Сокровища Незера'],
  ['NETHERITE', 'Незеритовый', 25000, '#ae89cd', 'Незеритовое снаряжение'],
  ['THE END', 'Энд', 60000, '#bd9bdc', 'Редкие находки Энда'],
  ['LEGENDARY', 'Легендарный', 150000, '#f4cf80', 'Легендарные предметы']
]

const previewItems = [
  { id: 'cobblestone', name: 'Булыжник', value: 35, rarity: 'COMMON' },
  { id: 'coal', name: 'Уголь', value: 70, rarity: 'COMMON' },
  { id: 'iron', name: 'Железный слиток', value: 140, rarity: 'UNCOMMON' },
  { id: 'gold', name: 'Золотой слиток', value: 280, rarity: 'UNCOMMON' },
  { id: 'emerald', name: 'Изумруд', value: 450, rarity: 'RARE' },
  { id: 'diamond', name: 'Алмаз', value: 800, rarity: 'RARE' },
  { id: 'diamond_sword', name: 'Алмазный меч', value: 1500, rarity: 'EPIC' },
  { id: 'totem', name: 'Тотем бессмертия', value: 3500, rarity: 'EPIC' },
  { id: 'netherite', name: 'Незеритовый слиток', value: 8000, rarity: 'LEGENDARY' },
  { id: 'nether_star', name: 'Звезда Незера', value: 16000, rarity: 'LEGENDARY' },
  { id: 'dragon_egg', name: 'Яйцо дракона', value: 45000, rarity: 'MYTHIC' },
  { id: 'enchanted_apple', name: 'Зачарованное золотое яблоко', value: 100000, rarity: 'MYTHIC' }
]

const itemMap = Object.fromEntries(previewItems.map((item) => [item.id, item]))
const rarityColors = { COMMON: '#9ba3b2', UNCOMMON: '#d6b069', RARE: '#5dd8c4', EPIC: '#7ca8ff', LEGENDARY: '#c89bff', MYTHIC: '#f070ff' }
const nav = [['upgrade', Gem], ['cases', Gift], ['inventory', Boxes], ['profile', UserRound], ['settings', Settings2]]

const labels = {
  ru: {
    upgrade: 'Апгрейдер', cases: 'Кейсы', inventory: 'Инвентарь', profile: 'Профиль', settings: 'Настройки',
    head: 'НЕ ПРОСТО УДАЧА.', sub: 'Твоя коллекция. Твой риск. Твой следующий апгрейд.',
    explore: 'Посмотреть кейсы', demo: 'В разработке', hello: 'Основа будущей игровой платформы',
    catalog: 'КАТАЛОГ КЕЙСОВ', all: 'Все кейсы', free: 'За рекламу', balance: 'Баланс', guest: 'Гостевой режим',
    ready: 'Первый этап готов', progress: 'Подключим на следующих этапах',
    intro: 'Мы строим настоящий игровой проект по частям. Сейчас доступны оформление, каталог и персональные настройки. А ниже уже появился первый тестовый игровой цикл: предметы, шанс, инвентарь и демо-апгрейд.',
    lang: 'Язык', theme: 'Тема', accent: 'Цвет акцента', sound: 'Звуки интерфейса', saved: 'Настройки автоматически сохраняются в этом браузере',
    noinvent: 'Здесь появятся предметы после запуска экономики и системы дропа.',
    nologin: 'Аккаунты и облачное сохранение появятся позже.',
    notice: 'Это демонстрация интерфейса. Открытие кейсов и полноценная экономика пока недоступны.',
    owned: 'В наличии', sell: 'Продать', history: 'История апгрейдов', emptyHistory: 'Попробуй первый тестовый апгрейд.',
    starter: 'Стартовый баланс', resetDemo: 'Сбросить демо',
    invText: 'Ниже уже работает локальный тестовый инвентарь. Он хранится прямо в браузере и нужен для следующих этапов.',
    coinsInfo: 'MC Coins пригодятся для кейсов и будущих функций продажи / открытия.',
    success: 'Успех!', fail: 'Неудача', test: 'Тестовый апгрейд', demoMode: 'ДЕМО / TEST LOOP',
    sourceOwned: 'Твоё количество',
    actionHint: 'Сейчас уже можно тратить предметы: при удаче ты получаешь цель, при неудаче исходный предмет сгорает.',
    profileSoon: 'Позже здесь будут вход, облачное сохранение и статистика.'
  },
  uk: {
    upgrade: 'Апгрейдер', cases: 'Кейси', inventory: 'Інвентар', profile: 'Профіль', settings: 'Налаштування',
    head: 'НЕ ПРОСТО УДАЧА.', sub: 'Твоя колекція. Твій ризик. Твій наступний апгрейд.',
    explore: 'Переглянути кейси', demo: 'У розробці', hello: 'Основа майбутньої ігрової платформи',
    catalog: 'КАТАЛОГ КЕЙСІВ', all: 'Усі кейси', free: 'За рекламу', balance: 'Баланс', guest: 'Гостьовий режим',
    ready: 'Перший етап готовий', progress: 'Підключимо на наступних етапах',
    intro: 'Ми будуємо справжній ігровий проєкт поступово. Зараз доступні оформлення, каталог і персональні налаштування. Нижче вже є перший тестовий ігровий цикл: предмети, шанс, інвентар і демо-апгрейд.',
    lang: 'Мова', theme: 'Тема', accent: 'Колір акценту', sound: 'Звуки інтерфейсу', saved: 'Налаштування автоматично зберігаються в цьому браузері',
    noinvent: 'Тут з’являться предмети після запуску економіки та випадання предметів.',
    nologin: 'Акаунти та хмарне збереження з’являться пізніше.',
    notice: 'Це демонстрація інтерфейсу. Відкриття кейсів і повна економіка поки недоступні.',
    owned: 'У наявності', sell: 'Продати', history: 'Історія апгрейдів', emptyHistory: 'Спробуй перший тестовий апгрейд.',
    starter: 'Стартовий баланс', resetDemo: 'Скинути демо',
    invText: 'Нижче вже працює локальний тестовий інвентар. Він зберігається прямо в браузері та потрібен для наступних етапів.',
    coinsInfo: 'MC Coins знадобляться для кейсів і майбутніх функцій продажу / відкриття.',
    success: 'Успіх!', fail: 'Невдача', test: 'Тестовий апгрейд', demoMode: 'ДЕМО / TEST LOOP',
    sourceOwned: 'Твоя кількість',
    actionHint: 'Тепер уже можна витрачати предмети: при успіху ти отримуєш ціль, при невдачі початковий предмет згорає.',
    profileSoon: 'Пізніше тут будуть вхід, хмарне збереження та статистика.'
  },
  en: {
    upgrade: 'Upgrader', cases: 'Cases', inventory: 'Inventory', profile: 'Profile', settings: 'Settings',
    head: 'MORE THAN LUCK.', sub: 'Your collection. Your risk. Your next upgrade.',
    explore: 'Explore cases', demo: 'In development', hello: 'The foundation of a new game platform',
    catalog: 'CASE COLLECTION', all: 'All cases', free: 'Watch an ad', balance: 'Balance', guest: 'Guest mode',
    ready: 'Stage one complete', progress: 'Available in future stages',
    intro: 'We are building a real game platform step by step. Design, catalogue and personal settings are already live. Below you now have the first playable test loop: items, odds, inventory and a demo upgrade.',
    lang: 'Language', theme: 'Theme', accent: 'Accent color', sound: 'Interface sound', saved: 'Settings are saved automatically in this browser',
    noinvent: 'Items will appear here once the economy and drops are ready.',
    nologin: 'Accounts and cloud saves will arrive later.',
    notice: 'Interface preview only. Case openings and full economy are not active yet.',
    owned: 'Owned', sell: 'Sell', history: 'Upgrade history', emptyHistory: 'Try your first demo upgrade.',
    starter: 'Starter balance', resetDemo: 'Reset demo',
    invText: 'A local test inventory is already active below. It is stored in your browser and will support the next stages.',
    coinsInfo: 'MC Coins will be used for cases and future selling / opening systems.',
    success: 'Success!', fail: 'Failed', test: 'Demo upgrade', demoMode: 'DEMO / TEST LOOP',
    sourceOwned: 'Your count',
    actionHint: 'You can already spend items: on success you receive the target, on failure the source item is consumed.',
    profileSoon: 'Login, cloud save and stats will come later.'
  }
}

const chanceCopy = {
  ru: {
    title: 'Мастерская апгрейда',
    desc: 'Выбирай исходный предмет из инвентаря, цель апгрейда и пробуй тестовые апгрейды. Теперь это не просто расчёт, а первая рабочая механика.',
    source: 'Исходный предмет', target: 'Цель апгрейда', chance: 'Расчётный шанс', mult: 'Множитель цели',
    noMoney: 'Локальное демо', launch: 'Инвентарь и результат уже работают только в этом браузере.',
    formula: 'Шанс = 90% × стоимость исходного / стоимость цели. Диапазон 0,1–90%.',
    run: 'Запустить апгрейд', inventorySource: 'Доступные предметы', inventoryTarget: 'Подходящие цели'
  },
  uk: {
    title: 'Майстерня апгрейду',
    desc: 'Обирай початковий предмет з інвентарю, ціль апгрейду й пробуй тестові апгрейди. Тепер це не просто розрахунок, а перша робоча механіка.',
    source: 'Початковий предмет', target: 'Мета апгрейду', chance: 'Розрахунковий шанс', mult: 'Множник цілі',
    noMoney: 'Локальне демо', launch: 'Інвентар та результат вже працюють тільки у цьому браузері.',
    formula: 'Шанс = 90% × вартість початкового / вартість цілі. Діапазон 0,1–90%.',
    run: 'Запустити апгрейд', inventorySource: 'Доступні предмети', inventoryTarget: 'Можливі цілі'
  },
  en: {
    title: 'Upgrade workshop',
    desc: 'Choose a source item from your inventory, select a target and try real demo upgrades. It is no longer only a calculator: this is the first working gameplay loop.',
    source: 'Source item', target: 'Upgrade target', chance: 'Estimated chance', mult: 'Target multiplier',
    noMoney: 'Local demo', launch: 'Inventory and results now work in this browser.',
    formula: 'Chance = 90% × source value / target value. Range 0.1–90%.',
    run: 'Start upgrade', inventorySource: 'Available items', inventoryTarget: 'Possible targets'
  }
}

const defaultInventory = {
  cobblestone: 12,
  coal: 8,
  iron: 5,
  gold: 3,
  emerald: 2,
  diamond: 1,
  diamond_sword: 1,
  totem: 1,
  netherite: 0,
  nether_star: 0,
  dragon_egg: 0,
  enchanted_apple: 0
}

function stored(key, fallback) {
  try {
    const v = localStorage.getItem(key)
    if (v === null) return fallback
    try { return JSON.parse(v) } catch { return v }
  } catch {
    return fallback
  }
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

function formatCoins(value) {
  return value.toLocaleString('ru-RU')
}

function getItem(id) {
  return itemMap[id] || previewItems[0]
}

function findNearestTarget(sourceValue, multiplier) {
  const targetValue = sourceValue * multiplier
  const options = previewItems.filter((x) => x.value > sourceValue)
  if (!options.length) return null
  return options.reduce((a, b) => (Math.abs(a.value - targetValue) < Math.abs(b.value - targetValue) ? a : b), options[0])
}

function VoxelCuboid({ w, h, d, x = 0, y = 0, z = 0, front, side, top, className = '' }) {
  return (
    <span
      className={`voxel-piece ${className}`}
      style={{
        '--w': `${w}px`, '--h': `${h}px`, '--d': `${d}px`, '--x': `${x}px`, '--y': `${y}px`, '--z': `${z}px`,
        '--front': front, '--side': side, '--top': top
      }}
    >
      <i className="vf" /><i className="vb" /><i className="vl" /><i className="vr" /><i className="vt" /><i className="vd" />
    </span>
  )
}

function DragonEggModel() {
  const src = textureSource('dragon_egg')
  const face = `center/100% 100% no-repeat url(${src})`
  const side = 'linear-gradient(180deg,#1a1621,#2c2634 55%,#16121a)'
  const top = 'linear-gradient(180deg,#3d3449,#241f2b)'
  const layers = [
    { w: 28, h: 10, d: 28, y: -46 },
    { w: 44, h: 12, d: 44, y: -32 },
    { w: 60, h: 13, d: 60, y: -17 },
    { w: 72, h: 14, d: 72, y: 0 },
    { w: 80, h: 15, d: 80, y: 17 },
    { w: 70, h: 14, d: 70, y: 33 },
    { w: 54, h: 13, d: 54, y: 48 }
  ]
  return (
    <span className="voxel-assembly egg-solid" aria-hidden="true">
      {layers.map((layer, index) => (
        <VoxelCuboid key={index} {...layer} front={face} side={side} top={top} className="eggBand" />
      ))}
    </span>
  )
}

function MinecraftSprite({ id }) {
  if (id === 'dragon_egg') return <DragonEggModel />
  const src = textureSource(id)
  return (
    <span className={'mc-sprite-extrusion' + (id === 'enchanted_apple' ? ' mc-enchanted' : '')} aria-hidden="true">
      {[-7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7].map((z, i) => (
        <img
          key={z}
          className={i === 14 ? 'mc-sprite-face' : 'mc-sprite-layer'}
          src={src}
          alt=""
          draggable="false"
          loading={i === 14 ? 'eager' : 'lazy'}
          style={{ transform: `translateZ(${z}px)` }}
        />
      ))}
    </span>
  )
}

function VoxelViewer({ id, label }) {
  const [angles, setAngles] = useState({ x: -10, y: 25 })
  const drag = useRef(null)
  useEffect(() => setAngles({ x: -10, y: 25 }), [id])

  function down(e) {
    drag.current = { px: e.clientX, py: e.clientY, x: angles.x, y: angles.y }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  function move(e) {
    if (!drag.current) return
    const d = drag.current
    setAngles({ x: clamp(d.x - (e.clientY - d.py) * 0.55, -78, 78), y: d.y + (e.clientX - d.px) * 0.65 })
  }

  return (
    <div className="voxel-viewer" role="group" aria-label={label + ' — Minecraft 3D'}>
      <div
        className="voxel-stage"
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={() => (drag.current = null)}
        onPointerCancel={() => (drag.current = null)}
        onLostPointerCapture={() => (drag.current = null)}
        title="Зажми мышку, чтобы повернуть"
        style={{ touchAction: 'none' }}
      >
        <div className="voxel-rotator" style={{ transform: `rotateX(${angles.x}deg) rotateY(${angles.y}deg)` }}>
          <MinecraftSprite id={id} />
        </div>
      </div>
      <div className="voxel-actions">
        <span>↔ 3D • DRAG</span>
        <button type="button" onClick={() => setAngles({ x: -10, y: 25 })} aria-label="Сбросить поворот">↺</button>
      </div>
    </div>
  )
}

function VoxelThumbnail({ id }) {
  return (
    <span className="voxel-thumb" aria-hidden="true">
      <span className="voxel-thumb-perspective">
        <span className="voxel-thumb-rotator">
          <MinecraftSprite id={id} />
        </span>
      </span>
    </span>
  )
}

export default function App() {
  const [page, setPage] = useState('upgrade')
  const [lang, setLang] = useState(() => stored('mineup-language', 'ru'))
  const [theme, setTheme] = useState(() => stored('mineup-theme', 'gold'))
  const [accent, setAccent] = useState(() => stored('mineup-accent', 'amber'))
  const [sound, setSound] = useState(() => stored('mineup-sound', 'off'))
  const [menu, setMenu] = useState(false)
  const [activeCase, setActiveCase] = useState(null)

  const [sourceId, setSourceId] = useState(() => stored('mineup-preview-source', 'iron'))
  const [targetId, setTargetId] = useState(() => stored('mineup-preview-target', 'diamond'))
  const [multiplier, setMultiplier] = useState(() => Number(stored('mineup-preview-multiplier', 5.714)) || 5.714)
  const [coins, setCoins] = useState(() => Number(stored('mineup-demo-coins', 2500)) || 2500)
  const [inventory, setInventory] = useState(() => ({ ...defaultInventory, ...stored('mineup-demo-inventory', defaultInventory) }))
  const [history, setHistory] = useState(() => stored('mineup-demo-history', []))
  const [result, setResult] = useState(null)

  const t = labels[lang] || labels.ru
  const uc = chanceCopy[lang] || chanceCopy.ru
  const source = useMemo(() => getItem(sourceId), [sourceId])
  const target = useMemo(() => getItem(targetId), [targetId])
  const ownedItems = previewItems.filter((item) => (inventory[item.id] || 0) > 0)
  const possibleTargets = previewItems.filter((item) => item.value > source.value)
  const chance = clamp((source.value / target.value) * 90, 0.1, 90)
  const sliderValue = Math.round((Math.log(multiplier / 1.01) / Math.log(900 / 1.01)) * 1000)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.dataset.accent = accent
    document.documentElement.lang = lang
    try {
      localStorage.setItem('mineup-theme', JSON.stringify(theme))
      localStorage.setItem('mineup-language', JSON.stringify(lang))
      localStorage.setItem('mineup-accent', JSON.stringify(accent))
      localStorage.setItem('mineup-sound', JSON.stringify(sound))
    } catch {}
  }, [theme, lang, accent, sound])

  useEffect(() => {
    try {
      localStorage.setItem('mineup-preview-source', JSON.stringify(sourceId))
      localStorage.setItem('mineup-preview-target', JSON.stringify(targetId))
      localStorage.setItem('mineup-preview-multiplier', JSON.stringify(multiplier))
      localStorage.setItem('mineup-demo-coins', JSON.stringify(coins))
      localStorage.setItem('mineup-demo-inventory', JSON.stringify(inventory))
      localStorage.setItem('mineup-demo-history', JSON.stringify(history))
    } catch {}
  }, [sourceId, targetId, multiplier, coins, inventory, history])

  useEffect(() => {
    if (target.value <= source.value) {
      const next = findNearestTarget(source.value, multiplier)
      if (next) setTargetId(next.id)
    }
  }, [sourceId])

  function pickTargetByMultiplier(nextMultiplier) {
    const numeric = clamp(Number(nextMultiplier) || 1.01, 1.01, 900)
    setMultiplier(numeric)
    const next = findNearestTarget(source.value, numeric)
    if (next) setTargetId(next.id)
  }

  function selectSource(id) {
    setSourceId(id)
    const item = getItem(id)
    if (target.value <= item.value) {
      const next = findNearestTarget(item.value, multiplier)
      if (next) setTargetId(next.id)
    }
    setResult(null)
  }

  function runUpgrade() {
    const count = inventory[source.id] || 0
    if (count < 1) {
      setResult({ type: 'error', text: lang === 'en' ? 'You do not own this source item.' : lang === 'uk' ? 'У тебе немає цього початкового предмета.' : 'У тебя нет этого исходного предмета.' })
      return
    }
    const success = Math.random() * 100 < chance
    const nextInventory = { ...inventory, [source.id]: count - 1 }
    if (success) nextInventory[target.id] = (nextInventory[target.id] || 0) + 1
    setInventory(nextInventory)
    const entry = {
      id: Date.now(),
      ok: success,
      source: source.id,
      target: target.id,
      chance: chance.toFixed(2),
      time: new Date().toLocaleTimeString(lang === 'en' ? 'en-US' : 'ru-RU', { hour: '2-digit', minute: '2-digit' })
    }
    setHistory((prev) => [entry, ...prev].slice(0, 12))
    setResult({
      type: success ? 'success' : 'fail',
      text: success
        ? `${t.success} • ${source.name} → ${target.name}`
        : `${t.fail} • ${source.name} сгорел${lang === 'uk' ? '' : ''}`
    })
  }

  function sellItem(id) {
    if (!(inventory[id] > 0)) return
    const item = getItem(id)
    setInventory((prev) => ({ ...prev, [id]: prev[id] - 1 }))
    setCoins((prev) => prev + item.value)
  }

  function resetDemo() {
    setCoins(2500)
    setInventory({ ...defaultInventory })
    setHistory([])
    setSourceId('iron')
    setTargetId('diamond')
    setMultiplier(5.714)
    setResult(null)
  }

  function go(p) {
    setPage(p)
    setMenu(false)
    setActiveCase(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const caseArt = (i) => (
    <div className="caseArt" style={{ '--tone': cases[i][3] }}>
      <span className="caseShape"><span className="caseLid" /><span className="caseLock" /></span><span className="caseGlow" />
    </div>
  )

  return (
    <div className="app">
      <aside className={'side ' + (menu ? 'show' : '')}>
        <button className="brand" onClick={() => go('upgrade')}>
          <span className="brandIcon"><Gem size={23} /></span>
          <span>MINE<span className="brandAccent">UP</span><small>ITEM UPGRADE PLATFORM</small></span>
        </button>
        <div className="navCaption">PLATFORM / 01</div>
        <div className="navItems">
          {nav.map(([id, Icon]) => (
            <button key={id} className={'navItem ' + (page === id ? 'active' : '')} onClick={() => go(id)}>
              <Icon size={19} /><span>{t[id]}</span>{id === 'cases' && <small>11</small>}
            </button>
          ))}
        </div>
        <div className="sideBottom">
          <div className="online"><span className="onlineDot" />{t.demo}</div>
          <div className="stage">MINEUP <strong>ALPHA 0.2</strong><div className="stageBar"><i style={{ width: '34%' }} /></div><span>{t.ready}</span></div>
        </div>
      </aside>
      {menu && <div className="overlay" onClick={() => setMenu(false)} />}

      <div className="shell">
        <header className="top">
          <div className="topLeft"><button className="mobileMenu" onClick={() => setMenu((v) => !v)} aria-label="menu">{menu ? <X size={22} /> : <Menu size={22} />}</button><span className="crumb">MINEUP</span><ChevronRight size={13} /><span>{t[page]}</span></div>
          <div className="topRight">
            <div className="topBalance"><Coins size={17} /><span>{formatCoins(coins)} <em>MC</em></span><small>{t.demo}</small></div>
            <button className="account" onClick={() => go('profile')}><UserRound size={17} /><span>{t.guest}</span></button>
          </div>
        </header>

        <main className="main">
          {page === 'upgrade' && (
            <>
              <div className="eyebrow"><span className="dot" /> MINEUP PROJECT — ALPHA 0.2</div>
              <section className="hero">
                <div className="heroContent">
                  <div className="heroBadge"><Sparkles size={13} />{t.hello}</div>
                  <h1>{t.head.split(' ').slice(0, 2).join(' ')}<br /><span>{t.head.split(' ').slice(2).join(' ') || 'UPGRADE.'}</span></h1>
                  <p>{t.sub}</p>
                  <div className="heroBtns"><button className="primary" onClick={() => go('cases')}>{t.explore}<ArrowUpRight size={17} /></button><span className="betaTag"><span className="onlineDot" />{t.demo}</span></div>
                </div>
                <div className="heroImage"><div className="halo haloOne" /><div className="halo haloTwo" /><div className="heroItem"><img src="/items/custom_question_black_white.png" alt="Question block" /></div><div className="heroOrb orb1" /><div className="heroOrb orb2" /><div className="renderNote">ITEM PREVIEW / CUSTOM TEXTURE</div></div>
              </section>

              <section className="upgradeLab" aria-label={uc.title}>
                <div className="upgradeIntro">
                  <div><div className="eyebrow">STAGE 05 / INVENTORY + TRUE EGG 3D</div><h2>{uc.title}</h2><p>{uc.desc}</p></div>
                  <span className="stamp"><ShieldCheck size={15} /> {t.demoMode}</span>
                </div>

                <div className="resourceBar">
                  <div className="resourceStat"><Wallet size={17} /><div><strong>{formatCoins(coins)} MC</strong><span>{t.starter}</span></div></div>
                  <div className="resourceStat"><Boxes size={17} /><div><strong>{ownedItems.reduce((sum, item) => sum + (inventory[item.id] || 0), 0)} pcs</strong><span>{t.owned}</span></div></div>
                  <button className="secondaryBtn" onClick={resetDemo}><RotateCcw size={16} /> {t.resetDemo}</button>
                </div>

                <div className="upgradeTriad">
                  <div className="upSlot">
                    <span className="upSlotLabel">01 / {uc.source}</span>
                    <VoxelViewer id={source.id} label={source.name} />
                    <strong>{source.name}</strong>
                    <span className="upValue">{formatCoins(source.value)} MC</span>
                    <small className="ownedMark">{t.sourceOwned}: <b>{inventory[source.id] || 0}</b></small>
                  </div>
                  <div className="upChance">
                    <div className="upWheel" style={{ '--pct': chance + '%' }}><div><strong>{chance.toFixed(2)}%</strong><span>{uc.chance}</span></div></div>
                    <small>{uc.formula}</small>
                    <button className="upgradeRun" onClick={runUpgrade} disabled={(inventory[source.id] || 0) < 1}><Swords size={16} /> {uc.run}</button>
                  </div>
                  <div className="upSlot">
                    <span className="upSlotLabel">02 / {uc.target}</span>
                    <VoxelViewer id={target.id} label={target.name} />
                    <strong>{target.name}</strong>
                    <span className="upValue">{formatCoins(target.value)} MC</span>
                    <small className="rarityMark" style={{ color: rarityColors[target.rarity] }}>{target.rarity}</small>
                  </div>
                </div>

                <div className="upgradeSlider">
                  <label htmlFor="upMultiplier">{uc.mult} <b>×{multiplier < 10 ? multiplier.toFixed(2) : multiplier.toFixed(0)}</b></label>
                  <input id="upMultiplier" type="range" min="0" max="1000" step="1" value={sliderValue} onChange={(e) => pickTargetByMultiplier((1.01 * Math.pow(900 / 1.01, Number(e.target.value) / 1000)).toFixed(3))} />
                  <div><span>×1.01 • до 90%</span><span>×900 • до 0,1%</span></div>
                </div>

                {result && <div className={'resultBanner ' + result.type}>{result.text}</div>}

                <div className="upCollections">
                  <div>
                    <h3>{uc.inventorySource}</h3>
                    <div className="upItemList">
                      {previewItems.map((item) => (
                        <button key={item.id} className={'upItem ' + (item.id === source.id ? 'upPicked' : '') + ((inventory[item.id] || 0) < 1 ? ' upDisabled' : '')} onClick={() => selectSource(item.id)} aria-pressed={item.id === source.id}>
                          <VoxelThumbnail id={item.id} />
                          <strong>{item.name}</strong>
                          <small>{formatCoins(item.value)} MC</small>
                          <em>{t.owned}: {inventory[item.id] || 0}</em>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3>{uc.inventoryTarget}</h3>
                    <div className="upItemList">
                      {possibleTargets.map((item) => (
                        <button key={item.id} className={'upItem ' + (item.id === target.id ? 'upPicked' : '')} onClick={() => setTargetId(item.id)} aria-pressed={item.id === target.id}>
                          <VoxelThumbnail id={item.id} />
                          <strong>{item.name}</strong>
                          <small>{formatCoins(item.value)} MC</small>
                          <em style={{ color: rarityColors[item.rarity] }}>{item.rarity}</em>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="historyPanel">
                  <div className="historyHead"><h3>{t.history}</h3><span>{t.actionHint}</span></div>
                  {history.length ? (
                    <div className="historyList">
                      {history.map((entry) => {
                        const s = getItem(entry.source)
                        const tg = getItem(entry.target)
                        return (
                          <div key={entry.id} className={'historyRow ' + (entry.ok ? 'ok' : 'bad')}>
                            <span className="historyBadge">{entry.ok ? t.success : t.fail}</span>
                            <span>{s.name} → {tg.name}</span>
                            <span>{entry.chance}%</span>
                            <span>{entry.time}</span>
                          </div>
                        )
                      })}
                    </div>
                  ) : <div className="emptyMini">{t.emptyHistory}</div>}
                </div>

                <div className="upDisclaimer"><LockKeyhole size={17} /><span>{uc.noMoney}. {uc.launch}</span></div>
              </section>

              <div className="areaHeading"><div><div className="eyebrow">STAGE 01 / FIRST LOOK</div><h2>{t.ready}</h2><p>{t.intro}</p></div><span className="stamp"><ShieldCheck size={15} />{t.demo}</span></div>
              <div className="previewPanels">
                <div className="previewCard"><div className="cardEyebrow"><Gem size={16} />UPGRADER</div><div className="previewCenter"><div className="previewQuestion">?</div><div className="previewRing"><span>— %</span></div><div className="previewQuestion">✓</div></div><div className="previewFoot"><span>{t.progress}</span><LockKeyhole size={17} /></div></div>
                <div className="previewCard"><div className="cardEyebrow"><Gift size={16} />FREE CASE</div>{caseArt(0)}<div className="previewFoot"><span>{t.progress}</span><LockKeyhole size={17} /></div></div>
              </div>
            </>
          )}

          {page === 'cases' && (
            <>
              <div className="eyebrow"><span className="dot" /> MINEUP / COLLECTION</div>
              <div className="areaHeading"><div><h1 className="sectionTitle">{t.catalog}</h1><p>{t.notice}</p></div><span className="stamp"><Layers3 size={15} />11 CASES</span></div>
              <div className="caseGrid">{cases.map((c, i) => <button className="caseCard" key={i} onClick={() => setActiveCase(i)}><span className="caseIndex">{String(i + 1).padStart(2, '0')} / {c[0]}</span>{caseArt(i)}<strong>{c[1]}</strong><div className="casePrice">{i === 0 ? t.free : formatCoins(c[2]) + ' MC'} <ArrowUpRight size={15} /></div></button>)}</div>
            </>
          )}

          {page === 'inventory' && (
            <>
              <div className="eyebrow">MINEUP / COLLECTION</div>
              <div className="areaHeading"><div><h1 className="sectionTitle">{t.inventory}</h1><p>{t.invText}</p></div><span className="stamp"><Coins size={15} />{formatCoins(coins)} MC</span></div>
              <div className="inventoryMeta"><div className="notice"><Coins size={18} />{t.coinsInfo}</div><button className="secondaryBtn" onClick={resetDemo}><RotateCcw size={16} /> {t.resetDemo}</button></div>
              <div className="inventoryGrid">
                {previewItems.map((item) => (
                  <div key={item.id} className={'invCard ' + ((inventory[item.id] || 0) < 1 ? 'is-empty' : '')}>
                    <VoxelThumbnail id={item.id} />
                    <strong>{item.name}</strong>
                    <small>{formatCoins(item.value)} MC</small>
                    <div className="invMeta"><span className="invCount">×{inventory[item.id] || 0}</span><span style={{ color: rarityColors[item.rarity] }}>{item.rarity}</span></div>
                    <button className="sellBtn" onClick={() => sellItem(item.id)} disabled={(inventory[item.id] || 0) < 1}>{t.sell} +{formatCoins(item.value)}</button>
                  </div>
                ))}
              </div>
            </>
          )}

          {page === 'profile' && (
            <>
              <div className="eyebrow">MINEUP / USER</div>
              <h1 className="sectionTitle">{t.profile}</h1>
              <div className="empty"><UserRound size={45} /><h2>{t.guest}</h2><p>{t.profileSoon}</p><span>{t.demo}</span></div>
            </>
          )}

          {page === 'settings' && (
            <>
              <div className="eyebrow">MINEUP / PREFERENCES</div>
              <h1 className="sectionTitle">{t.settings}</h1>
              <p className="settingsLead">{t.saved}</p>
              <div className="settingsGrid">
                <section className="settingBox"><div className="settingName"><Globe2 size={17} />{t.lang}</div><div className="choices">{[['ru', 'Русский'], ['uk', 'Українська'], ['en', 'English']].map(([id, name]) => <button className={lang === id ? 'chosen' : ''} key={id} onClick={() => setLang(id)}>{name}{lang === id && <Check size={15} />}</button>)}</div></section>
                <section className="settingBox"><div className="settingName"><Layers3 size={17} />{t.theme}</div><div className="choices">{[['gold', 'Dark Gold'], ['violet', 'Deep Violet'], ['emerald', 'Emerald'], ['light', 'Light']].map(([id, name]) => <button className={theme === id ? 'chosen' : ''} key={id} onClick={() => setTheme(id)}>{name}{theme === id && <Check size={15} />}</button>)}</div></section>
                <section className="settingBox"><div className="settingName"><SlidersHorizontal size={17} />{t.accent}</div><div className="choices">{[['amber', 'Amber'], ['mint', 'Mint'], ['blue', 'Blue']].map(([id, name]) => <button className={accent === id ? 'chosen' : ''} key={id} onClick={() => setAccent(id)}>{name}{accent === id && <Check size={15} />}</button>)}</div></section>
                <section className="settingBox"><div className="settingName"><Settings2 size={17} />{t.sound}</div><div className="choices">{[['off', 'OFF'], ['on', 'ON (later)']].map(([id, name]) => <button className={sound === id ? 'chosen' : ''} key={id} onClick={() => setSound(id)}>{name}{sound === id && <Check size={15} />}</button>)}</div><small className="settingNote">{t.progress}</small></section>
              </div>
            </>
          )}

          <footer><span>© 2026 MINEUP. UNOFFICIAL MINECRAFT FAN PROJECT.</span><span>ALPHA 0.2 • DEMO INVENTORY / DEMO UPGRADE LOOP</span></footer>
        </main>
      </div>

      {activeCase !== null && (
        <div className="modalBackdrop" onClick={() => setActiveCase(null)}>
          <div className="modal" role="dialog" aria-modal="true" aria-label={cases[activeCase][1]} onClick={(e) => e.stopPropagation()}>
            <button className="modalClose" onClick={() => setActiveCase(null)} aria-label="Close"><X /></button>
            {caseArt(activeCase)}
            <span className="eyebrow">{cases[activeCase][0]}</span>
            <h2>{cases[activeCase][1]}</h2>
            <p>{cases[activeCase][4]}</p>
            <div className="modalPrice">{activeCase === 0 ? t.free : formatCoins(cases[activeCase][2]) + ' MC'}</div>
            <div className="notice"><LockKeyhole size={18} />{t.notice}</div>
            <button className="primary" onClick={() => setActiveCase(null)}>OK <Check size={16} /></button>
          </div>
        </div>
      )}
    </div>
  )
}
