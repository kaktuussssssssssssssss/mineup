import React, { useEffect, useMemo, useRef, useState } from 'react'
import {VoxelViewer, VoxelThumbnail} from './Voxel3D.jsx'
import { Gem, Layers3, Boxes, UserRound, Settings2, ArrowUpRight, ChevronRight, LockKeyhole, Gift, Sparkles, Menu, X, Check, ShieldCheck, Coins, Globe2, SlidersHorizontal, Wallet, Swords, RotateCcw, Search, Download, Upload, TrendingUp, Activity, Filter, Volume2 } from 'lucide-react'

const mcTextureRoot = 'https://raw.githubusercontent.com/Faithful-Pack/Default-Java/1.21.8/assets/minecraft/textures/'
const itemTextures = {
  "dirt": "block/dirt.png",
  "stick": "item/stick.png",
  "cobblestone": "block/cobblestone.png",
  "oak_planks": "block/oak_planks.png",
  "stone": "block/stone.png",
  "coal": "item/coal.png",
  "bread": "item/bread.png",
  "apple": "item/apple.png",
  "copper_ingot": "item/copper_ingot.png",
  "raw_iron": "item/raw_iron.png",
  "iron": "item/iron_ingot.png",
  "lapis": "item/lapis_lazuli.png",
  "redstone": "item/redstone.png",
  "iron_sword": "item/iron_sword.png",
  "gold": "item/gold_ingot.png",
  "iron_pickaxe": "item/iron_pickaxe.png",
  "crafting_table": "block/crafting_table_front.png",
  "emerald": "item/emerald.png",
  "golden_apple": "item/golden_apple.png",
  "obsidian": "block/obsidian.png",
  "diamond": "item/diamond.png",
  "diamond_ore": "block/diamond_ore.png",
  "blaze_rod": "item/blaze_rod.png",
  "ender_pearl": "item/ender_pearl.png",
  "diamond_pickaxe": "item/diamond_pickaxe.png",
  "diamond_sword": "item/diamond_sword.png",
  "enchanting_table": "block/enchanting_table_side.png",
  "ghast_tear": "item/ghast_tear.png",
  "ender_eye": "item/ender_eye.png",
  "magma_cream": "item/magma_cream.png",
  "crying_obsidian": "block/crying_obsidian.png",
  "end_stone": "block/end_stone.png",
  "totem": "item/totem_of_undying.png",
  "ancient_debris": "block/ancient_debris_side.png",
  "trident": "item/trident.png",
  "netherite": "item/netherite_ingot.png",
  "shulker_shell": "item/shulker_shell.png",
  "netherite_sword": "item/netherite_sword.png",
  "nether_star": "item/nether_star.png",
  "elytra": "item/elytra.png",
  "netherite_chestplate": "item/netherite_chestplate.png",
  "heart_of_the_sea": "item/heart_of_the_sea.png",
  "beacon": "block/beacon.png",
  "end_crystal": "item/end_crystal.png",
  "dragon_egg": "block/dragon_egg.png",
  "enchanted_apple": "item/golden_apple.png",
  "sand": "block/sand.png",
  "gravel": "block/gravel.png",
  "netherrack": "block/netherrack.png",
  "grass_block": "block/grass_block_side.png",
  "oak_log": "block/oak_log.png",
  "mud": "block/mud.png",
  "snowball": "item/snowball.png",
  "flint": "item/flint.png",
  "clay_ball": "item/clay_ball.png",
  "wheat": "item/wheat.png",
  "leather": "item/leather.png",
  "feather": "item/feather.png",
  "string": "item/string.png",
  "raw_copper": "item/raw_copper.png",
  "raw_gold": "item/raw_gold.png",
  "stone_pickaxe": "item/stone_pickaxe.png",
  "bow": "item/bow.png",
  "arrow": "item/arrow.png",
  "book": "item/book.png",
  "torch": "item/torch.png",
  "iron_axe": "item/iron_axe.png",
  "iron_helmet": "item/iron_helmet.png",
  "iron_chestplate": "item/iron_chestplate.png",
  "golden_carrot": "item/golden_carrot.png",
  "glass": "block/glass.png",
  "quartz": "item/quartz.png",
  "gunpowder": "item/gunpowder.png",
  "glowstone_dust": "item/glowstone_dust.png",
  "slime_ball": "item/slime_ball.png",
  "nether_wart": "item/nether_wart.png",
  "amethyst_shard": "item/amethyst_shard.png",
  "prismarine_shard": "item/prismarine_shard.png",
  "prismarine_crystals": "item/prismarine_crystals.png",
  "golden_sword": "item/golden_sword.png",
  "golden_pickaxe": "item/golden_pickaxe.png",
  "diamond_axe": "item/diamond_axe.png",
  "diamond_helmet": "item/diamond_helmet.png",
  "diamond_chestplate": "item/diamond_chestplate.png",
  "sea_lantern": "block/sea_lantern.png",
  "tnt": "block/tnt_side.png",
  "ender_chest": "block/ender_chest_front.png",
  "gilded_blackstone": "block/gilded_blackstone.png",
  "soul_sand": "block/soul_sand.png",
  "netherite_pickaxe": "item/netherite_pickaxe.png",
  "netherite_axe": "item/netherite_axe.png",
  "netherite_helmet": "item/netherite_helmet.png",
  "echo_shard": "item/echo_shard.png",
  "music_disc_pigstep": "item/music_disc_pigstep.png",
  "music_disc_13": "item/music_disc_13.png",
  "mace": "item/mace.png",
  "heavy_core": "block/heavy_core.png",
  "trial_key": "item/trial_key.png",
  "ominous_trial_key": "item/ominous_trial_key.png",
  "dragon_breath": "item/dragon_breath.png"
}
const blockIds = ["dirt", "cobblestone", "oak_planks", "stone", "crafting_table", "obsidian", "diamond_ore", "enchanting_table", "crying_obsidian", "end_stone", "ancient_debris", "beacon", "sand", "gravel", "netherrack", "grass_block", "oak_log", "mud", "glass", "sea_lantern", "tnt", "ender_chest", "gilded_blackstone", "soul_sand"]
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
  {id: "dirt", name: "Земля", value: 8, rarity: "COMMON"},
  {id: "stick", name: "Палка", value: 12, rarity: "COMMON"},
  {id: "sand", name: "Песок", value: 14, rarity: "COMMON"},
  {id: "cobblestone", name: "Булыжник", value: 18, rarity: "COMMON"},
  {id: "gravel", name: "Гравий", value: 19, rarity: "COMMON"},
  {id: "netherrack", name: "Незерак", value: 23, rarity: "COMMON"},
  {id: "oak_planks", name: "Дубовые доски", value: 25, rarity: "COMMON"},
  {id: "stone", name: "Камень", value: 28, rarity: "COMMON"},
  {id: "grass_block", name: "Дёрн", value: 30, rarity: "COMMON"},
  {id: "oak_log", name: "Дубовое бревно", value: 32, rarity: "COMMON"},
  {id: "mud", name: "Грязь", value: 36, rarity: "COMMON"},
  {id: "snowball", name: "Снежок", value: 40, rarity: "COMMON"},
  {id: "coal", name: "Уголь", value: 42, rarity: "COMMON"},
  {id: "bread", name: "Хлеб", value: 55, rarity: "COMMON"},
  {id: "flint", name: "Кремень", value: 58, rarity: "COMMON"},
  {id: "clay_ball", name: "Комок глины", value: 62, rarity: "COMMON"},
  {id: "wheat", name: "Пшеница", value: 68, rarity: "COMMON"},
  {id: "apple", name: "Яблоко", value: 75, rarity: "COMMON"},
  {id: "leather", name: "Кожа", value: 82, rarity: "COMMON"},
  {id: "feather", name: "Перо", value: 90, rarity: "COMMON"},
  {id: "string", name: "Нить", value: 97, rarity: "COMMON"},
  {id: "copper_ingot", name: "Медный слиток", value: 105, rarity: "UNCOMMON"},
  {id: "raw_copper", name: "Рудная медь", value: 115, rarity: "UNCOMMON"},
  {id: "raw_iron", name: "Рудное железо", value: 125, rarity: "UNCOMMON"},
  {id: "iron", name: "Железный слиток", value: 155, rarity: "UNCOMMON"},
  {id: "raw_gold", name: "Рудное золото", value: 175, rarity: "UNCOMMON"},
  {id: "stone_pickaxe", name: "Каменная кирка", value: 185, rarity: "UNCOMMON"},
  {id: "lapis", name: "Лазурит", value: 200, rarity: "UNCOMMON"},
  {id: "redstone", name: "Редстоун", value: 225, rarity: "UNCOMMON"},
  {id: "bow", name: "Лук", value: 240, rarity: "UNCOMMON"},
  {id: "arrow", name: "Стрела", value: 255, rarity: "UNCOMMON"},
  {id: "iron_sword", name: "Железный меч", value: 270, rarity: "UNCOMMON"},
  {id: "book", name: "Книга", value: 295, rarity: "UNCOMMON"},
  {id: "gold", name: "Золотой слиток", value: 310, rarity: "UNCOMMON"},
  {id: "torch", name: "Факел", value: 315, rarity: "UNCOMMON"},
  {id: "iron_pickaxe", name: "Железная кирка", value: 390, rarity: "UNCOMMON"},
  {id: "iron_axe", name: "Железный топор", value: 430, rarity: "UNCOMMON"},
  {id: "crafting_table", name: "Верстак", value: 450, rarity: "UNCOMMON"},
  {id: "iron_helmet", name: "Железный шлем", value: 480, rarity: "UNCOMMON"},
  {id: "emerald", name: "Изумруд", value: 520, rarity: "RARE"},
  {id: "iron_chestplate", name: "Железный нагрудник", value: 690, rarity: "RARE"},
  {id: "golden_apple", name: "Золотое яблоко", value: 700, rarity: "RARE"},
  {id: "obsidian", name: "Обсидиан", value: 790, rarity: "RARE"},
  {id: "golden_carrot", name: "Золотая морковь", value: 830, rarity: "RARE"},
  {id: "glass", name: "Стекло", value: 900, rarity: "RARE"},
  {id: "diamond", name: "Алмаз", value: 1000, rarity: "RARE"},
  {id: "quartz", name: "Кварц", value: 1100, rarity: "RARE"},
  {id: "gunpowder", name: "Порох", value: 1250, rarity: "RARE"},
  {id: "diamond_ore", name: "Алмазная руда", value: 1350, rarity: "RARE"},
  {id: "glowstone_dust", name: "Светокаменная пыль", value: 1600, rarity: "RARE"},
  {id: "blaze_rod", name: "Огненный стержень", value: 1700, rarity: "RARE"},
  {id: "slime_ball", name: "Сгусток слизи", value: 1750, rarity: "RARE"},
  {id: "ender_pearl", name: "Эндер-жемчуг", value: 1900, rarity: "RARE"},
  {id: "nether_wart", name: "Незерский нарост", value: 2050, rarity: "RARE"},
  {id: "diamond_pickaxe", name: "Алмазная кирка", value: 2200, rarity: "EPIC"},
  {id: "amethyst_shard", name: "Осколок аметиста", value: 2450, rarity: "EPIC"},
  {id: "diamond_sword", name: "Алмазный меч", value: 2600, rarity: "EPIC"},
  {id: "prismarine_shard", name: "Призмариновый осколок", value: 3150, rarity: "EPIC"},
  {id: "enchanting_table", name: "Чародейский стол", value: 3300, rarity: "EPIC"},
  {id: "prismarine_crystals", name: "Призмариновые кристаллы", value: 3600, rarity: "EPIC"},
  {id: "golden_sword", name: "Золотой меч", value: 4000, rarity: "EPIC"},
  {id: "ghast_tear", name: "Слеза гаста", value: 4100, rarity: "EPIC"},
  {id: "golden_pickaxe", name: "Золотая кирка", value: 4550, rarity: "EPIC"},
  {id: "ender_eye", name: "Око Эндера", value: 4900, rarity: "EPIC"},
  {id: "magma_cream", name: "Сгусток магмы", value: 5100, rarity: "EPIC"},
  {id: "diamond_axe", name: "Алмазный топор", value: 5550, rarity: "EPIC"},
  {id: "crying_obsidian", name: "Плачущий обсидиан", value: 6200, rarity: "EPIC"},
  {id: "diamond_helmet", name: "Алмазный шлем", value: 6700, rarity: "EPIC"},
  {id: "end_stone", name: "Эндняк", value: 7200, rarity: "EPIC"},
  {id: "totem", name: "Тотем бессмертия", value: 7800, rarity: "EPIC"},
  {id: "diamond_chestplate", name: "Алмазный нагрудник", value: 8900, rarity: "LEGENDARY"},
  {id: "ancient_debris", name: "Древние обломки", value: 9800, rarity: "LEGENDARY"},
  {id: "sea_lantern", name: "Морской фонарь", value: 10400, rarity: "LEGENDARY"},
  {id: "tnt", name: "Динамит", value: 11300, rarity: "LEGENDARY"},
  {id: "trident", name: "Трезубец", value: 11500, rarity: "LEGENDARY"},
  {id: "ender_chest", name: "Эндер-сундук", value: 12700, rarity: "LEGENDARY"},
  {id: "netherite", name: "Незеритовый слиток", value: 14500, rarity: "LEGENDARY"},
  {id: "gilded_blackstone", name: "Позолоченный чернит", value: 15400, rarity: "LEGENDARY"},
  {id: "shulker_shell", name: "Панцирь шалкера", value: 15500, rarity: "LEGENDARY"},
  {id: "soul_sand", name: "Песок душ", value: 17800, rarity: "LEGENDARY"},
  {id: "netherite_sword", name: "Незеритовый меч", value: 22000, rarity: "LEGENDARY"},
  {id: "netherite_pickaxe", name: "Незеритовая кирка", value: 26000, rarity: "LEGENDARY"},
  {id: "nether_star", name: "Звезда Незера", value: 29000, rarity: "LEGENDARY"},
  {id: "netherite_axe", name: "Незеритовый топор", value: 32500, rarity: "LEGENDARY"},
  {id: "netherite_helmet", name: "Незеритовый шлем", value: 38000, rarity: "LEGENDARY"},
  {id: "echo_shard", name: "Осколок эха", value: 44000, rarity: "MYTHIC"},
  {id: "elytra", name: "Элитры", value: 48000, rarity: "MYTHIC"},
  {id: "music_disc_pigstep", name: "Пластинка Pigstep", value: 51000, rarity: "MYTHIC"},
  {id: "music_disc_13", name: "Пластинка 13", value: 56000, rarity: "MYTHIC"},
  {id: "netherite_chestplate", name: "Незеритовый нагрудник", value: 58000, rarity: "MYTHIC"},
  {id: "heart_of_the_sea", name: "Сердце моря", value: 65000, rarity: "MYTHIC"},
  {id: "mace", name: "Булава", value: 69000, rarity: "MYTHIC"},
  {id: "heavy_core", name: "Тяжёлое ядро", value: 73000, rarity: "MYTHIC"},
  {id: "beacon", name: "Маяк", value: 80000, rarity: "MYTHIC"},
  {id: "trial_key", name: "Ключ испытаний", value: 87000, rarity: "MYTHIC"},
  {id: "end_crystal", name: "Кристалл Энда", value: 97000, rarity: "MYTHIC"},
  {id: "ominous_trial_key", name: "Зловещий ключ испытаний", value: 110000, rarity: "MYTHIC"},
  {id: "dragon_breath", name: "Драконье дыхание", value: 120000, rarity: "MYTHIC"},
  {id: "dragon_egg", name: "Яйцо дракона", value: 135000, rarity: "MYTHIC"},
  {id: "enchanted_apple", name: "Зачарованное золотое яблоко", value: 350000, rarity: "MYTHIC"}
]
const itemMap = Object.fromEntries(previewItems.map((item) => [item.id, item]))
const rarityColors = { COMMON: '#9ba3b2', UNCOMMON: '#d6b069', RARE: '#5dd8c4', EPIC: '#7ca8ff', LEGENDARY: '#c89bff', MYTHIC: '#f070ff' }
const casePools = [[["dirt",38],["stick",20],["cobblestone",12],["coal",7],["copper_ingot",5],["iron",2],["sand",3],["gravel",2],["snowball",3],["netherrack",2],["stone",1],["grass_block",1],["oak_log",1],["mud",1],["flint",1],["clay_ball",1]],[["oak_planks",10],["bread",22],["apple",25.5],["copper_ingot",13],["iron",10],["iron_pickaxe",3.5],["emerald",0.5],["wheat",3],["leather",3],["raw_copper",5],["feather",2],["string",1],["arrow",1],["bow",0.5]],[["coal",8],["raw_iron",19],["iron",26],["lapis",13],["iron_pickaxe",15],["emerald",5],["diamond",1],["raw_gold",3],["stone_pickaxe",3],["book",3],["torch",2],["crafting_table",1],["arrow",1]],[["iron_sword",15],["iron_pickaxe",16],["emerald",26],["obsidian",17],["diamond",11],["diamond_sword",2.5],["totem",0.5],["iron_axe",5],["iron_helmet",3],["book",2],["iron_chestplate",2]],[["gold",7],["emerald",25],["golden_apple",22],["diamond",19],["diamond_sword",12],["totem",1.8],["netherite",0.2],["golden_carrot",3],["quartz",2],["glass",2],["gunpowder",3],["glowstone_dust",1],["blaze_rod",1],["slime_ball",1]],[["lapis",8],["redstone",8],["diamond_ore",20],["diamond_pickaxe",25],["diamond_sword",17],["totem",7.5],["netherite",0.5],["amethyst_shard",4],["prismarine_shard",3],["prismarine_crystals",3],["ender_pearl",1],["nether_wart",1],["enchanting_table",1],["golden_sword",1]],[["diamond",8],["diamond_ore",10],["diamond_pickaxe",22],["diamond_sword",18],["totem",19],["ancient_debris",9],["netherite",1.9],["nether_star",0.1],["diamond_axe",3],["golden_pickaxe",3],["diamond_helmet",2],["diamond_chestplate",2],["magma_cream",1],["end_stone",1]],[["ender_eye",7],["ghast_tear",10],["crying_obsidian",13],["totem",30],["ancient_debris",11],["netherite",14],["netherite_sword",2.8],["nether_star",0.2],["sea_lantern",2],["tnt",2],["ender_chest",2],["gilded_blackstone",1],["netherite_pickaxe",2],["trident",1],["shulker_shell",1],["soul_sand",1]],[["totem",7],["ancient_debris",14],["netherite",30],["netherite_sword",26],["nether_star",10],["elytra",2.8],["dragon_egg",0.2],["netherite_pickaxe",3],["netherite_axe",3],["netherite_helmet",2],["echo_shard",2]],[["netherite_sword",16],["nether_star",21],["elytra",22],["netherite_chestplate",15],["beacon",9],["dragon_egg",3.7],["enchanted_apple",0.3],["music_disc_pigstep",4],["music_disc_13",4],["mace",2],["heavy_core",2],["heart_of_the_sea",1]],[["nether_star",7],["elytra",10],["netherite_chestplate",13],["beacon",19],["end_crystal",20],["dragon_egg",16],["enchanted_apple",5],["trial_key",2],["ominous_trial_key",2],["dragon_breath",2],["heavy_core",2],["mace",2]]]
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
    notice: 'Это тестовая версия. Кейсы и монеты работают локально в браузере; реклама и серверные аккаунты появятся позже.',
    owned: 'В наличии', sell: 'Продать', history: 'История апгрейдов', emptyHistory: 'Попробуй первый тестовый апгрейд.',
    starter: 'Стартовый баланс', resetDemo: 'Сбросить демо',
    invText: 'Ниже уже работает локальный тестовый инвентарь. Он хранится прямо в браузере и нужен для следующих этапов.',
    coinsInfo: 'MC Coins используются для кейсов. Продажа возвращает 85% стоимости предмета.',
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
    notice: 'Це тестова версія. Кейси та монети працюють локально в браузері; реклама і серверні акаунти будуть пізніше.',
    owned: 'У наявності', sell: 'Продати', history: 'Історія апгрейдів', emptyHistory: 'Спробуй перший тестовий апгрейд.',
    starter: 'Стартовий баланс', resetDemo: 'Скинути демо',
    invText: 'Нижче вже працює локальний тестовий інвентар. Він зберігається прямо в браузері та потрібен для наступних етапів.',
    coinsInfo: 'MC Coins використовуються для кейсів. Продаж повертає 85% вартості предмета.',
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
    notice: 'Demo mode: cases and coins work locally. Ads and server accounts will come later.',
    owned: 'Owned', sell: 'Sell', history: 'Upgrade history', emptyHistory: 'Try your first demo upgrade.',
    starter: 'Starter balance', resetDemo: 'Reset demo',
    invText: 'A local test inventory is already active below. It is stored in your browser and will support the next stages.',
    coinsInfo: 'MC Coins are used for cases. Selling returns 85% of item value.',
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

const extraCopy = {
 ru: { search:'Поиск предметов...', found:'Найдено', nothing:'Ничего не найдено', sortCheap:'Сначала дешёвые', sortExpensive:'Сначала дорогие', sortName:'По названию', sourceList:'Мои предметы', targetList:'Каталог целей', reset:'Сброс', mode:'ИГРОВОЕ ДЕМО', myCollection:'Коллекция', demoSaves:'Локальное сохранение', download:'Скачать сохранение', upload:'Восстановить сохранение', backupHint:'Сохрани JSON-файл, чтобы перенести тестовый прогресс в другой браузер. Серверные аккаунты добавим отдельно.', confirmReset:'Сбросить весь тестовый прогресс? Отменить это действие нельзя.', backupBad:'Неверный файл сохранения VOXUP.', backupOk:'Сохранение восстановлено.', spin:'АПГРЕЙД В ПРОЦЕССЕ', noHigher:'Для самого дорогого предмета нет более дорогих целей.', pickSource:'Выбери предмет из инвентаря', resetFilters:'Очистить фильтры', showcase:'Каталог предметов', total:'Предметов', casesOpened:'Кейсов открыто', upgrades:'Апгрейдов', wins:'Удачных', profit:'Стоимость инвентаря', fair:'Вероятность совпадает с показанной. Тестовая валюта, без реальных денег.'},
 uk: { search:'Пошук предметів...', found:'Знайдено', nothing:'Нічого не знайдено', sortCheap:'Спочатку дешеві', sortExpensive:'Спочатку дорогі', sortName:'За назвою', sourceList:'Мої предмети', targetList:'Каталог цілей', reset:'Скинути', mode:'ІГРОВЕ ДЕМО', myCollection:'Колекція', demoSaves:'Локальне збереження', download:'Завантажити збереження', upload:'Відновити збереження', backupHint:'Збережи JSON-файл, щоб перенести тестовий прогрес в інший браузер. Серверні акаунти додамо окремо.', confirmReset:'Скинути весь тестовий прогрес? Скасувати цю дію не можна.', backupBad:'Неправильний файл збереження VOXUP.', backupOk:'Збереження відновлено.', spin:'АПГРЕЙД В ПРОЦЕСІ', noHigher:'Для найдорожчого предмета немає дорожчих цілей.', pickSource:'Обери предмет з інвентарю', resetFilters:'Очистити фільтри', showcase:'Каталог предметів', total:'Предметів', casesOpened:'Кейсів відкрито', upgrades:'Апгрейдів', wins:'Успішних', profit:'Вартість інвентарю', fair:'Імовірність відповідає показаній. Тестова валюта, без реальних грошей.'},
 en: { search:'Search items...', found:'Found', nothing:'Nothing found', sortCheap:'Cheapest first', sortExpensive:'Most expensive first', sortName:'By name', sourceList:'Owned items', targetList:'Upgrade targets', reset:'Reset', mode:'GAME DEMO', myCollection:'Collection', demoSaves:'Local backup', download:'Download save', upload:'Restore save', backupHint:'Export JSON to move your test progress to another browser. Cloud accounts come later.', confirmReset:'Reset all demo progress? This cannot be undone.', backupBad:'Invalid VOXUP save file.', backupOk:'Save restored.', spin:'UPGRADE IN PROGRESS', noHigher:'There are no more expensive targets for the highest-value item.', pickSource:'Select an item from your inventory', resetFilters:'Clear filters', showcase:'Item catalogue', total:'Items', casesOpened:'Cases opened', upgrades:'Upgrades', wins:'Wins', profit:'Inventory value', fair:'The displayed probability matches actual odds. Simulated currency only.'}
}

const defaultInventory = {
  dirt: 30, stick: 25, cobblestone: 20, oak_planks: 12, stone: 10, coal: 10,
  bread: 5, apple: 5, copper_ingot: 4, raw_iron: 4, iron: 4,
  lapis: 2, redstone: 2, gold: 3, emerald: 2, diamond: 1,
  diamond_sword: 1, totem: 1
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
  const [coins, setCoins] = useState(() => { const n = Number(stored('mineup-demo-coins', 2500)); return Number.isFinite(n) && n >= 0 ? n : 2500 })
  const [inventory, setInventory] = useState(() => ({ ...defaultInventory, ...stored('mineup-demo-inventory', defaultInventory) }))
  const [history, setHistory] = useState(() => stored('mineup-demo-history', []))
  const [result, setResult] = useState(null)
  const [caseRolling, setCaseRolling] = useState(false)
  const [caseRollResult, setCaseRollResult] = useState(null)
  const [caseReel, setCaseReel] = useState([])
  const [caseSpinId, setCaseSpinId] = useState(0)
  const [caseHistory, setCaseHistory] = useState(() => stored('mineup-case-history', []))
  const [stats,setStats]=useState(()=>{
    const saved=stored('mineup-demo-stats',null)
    if(saved && typeof saved==='object')return saved
    const h=stored('mineup-demo-history',[]),c=stored('mineup-case-history',[])
    return {cases:Array.isArray(c)?c.length:0,upgrades:Array.isArray(h)?h.length:0,wins:Array.isArray(h)?h.filter(x=>x.ok).length:0}
  })
  const [inventoryOnly,setInventoryOnly]=useState(true)
  const [inventoryOrder,setInventoryOrder]=useState('value_desc')
  const [sourceSearch,setSourceSearch]=useState('')
  const [targetSearch,setTargetSearch]=useState('')
  const [inventorySearch,setInventorySearch]=useState('')
  const [sourceOrder,setSourceOrder]=useState('value_asc')
  const [targetOrder,setTargetOrder]=useState('value_asc')
  const [targetRarity,setTargetRarity]=useState('all')
  const [upgradeBusy,setUpgradeBusy]=useState(false)
  const [backupMessage,setBackupMessage]=useState('')
  const busyGuard=useRef(false)
  const upgradeTimer=useRef(null)
  const backupInput=useRef(null)
  const reelTrack = useRef(null)
  const reelWindow = useRef(null)
  const reelAnimation = useRef(null)
  const rollingGuard = useRef(false)
  const WINNER_INDEX = 43
  const SPIN_TIME = 5000

  const t = labels[lang] || labels.ru
  const uc = chanceCopy[lang] || chanceCopy.ru
  const ex = extraCopy[lang] || extraCopy.ru
  const source = useMemo(() => getItem(sourceId), [sourceId])
  const target = useMemo(() => getItem(targetId), [targetId])
  const ownedItems = previewItems.filter((item) => (inventory[item.id] || 0) > 0)
  const possibleTargets = previewItems.filter((item) => item.value > source.value)
  const validTarget = target.value > source.value
  const chance = validTarget ? clamp((source.value / target.value) * 90, 0.1, 90) : 0
  const sliderValue = clamp(Math.round((Math.log(clamp(multiplier,1.01,900) / 1.01) / Math.log(900 / 1.01)) * 1000),0,1000)
  const bySort=(a,b,order)=>order==='name'?a.name.localeCompare(b.name,'ru'):order==='value_desc'?b.value-a.value:a.value-b.value
  const matches=(item,term)=>!term.trim()||`${item.name} ${item.id} ${item.rarity}`.toLowerCase().includes(term.trim().toLowerCase())
  const filteredSources=ownedItems.filter(item=>matches(item,sourceSearch)).sort((a,b)=>bySort(a,b,sourceOrder))
  const filteredTargets=possibleTargets.filter(item=>matches(item,targetSearch)&&(targetRarity==='all'||item.rarity===targetRarity)).sort((a,b)=>bySort(a,b,targetOrder))
  const portfolioValue=previewItems.reduce((total,item)=>total+(Number(inventory[item.id])||0)*item.value,0)
  const totalItems=previewItems.reduce((total,item)=>total+(Number(inventory[item.id])||0),0)
  useEffect(()=>()=>{if(upgradeTimer.current)clearTimeout(upgradeTimer.current)},[])

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
      localStorage.setItem('mineup-case-history', JSON.stringify(caseHistory))
      localStorage.setItem('mineup-demo-stats', JSON.stringify(stats))
    } catch {}
  }, [sourceId, targetId, multiplier, coins, inventory, history, caseHistory, stats])

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
    if(busyGuard.current)return
    setSourceId(id)
    const item = getItem(id)
    if (target.value <= item.value) {
      const next = findNearestTarget(item.value, multiplier)
      if (next) setTargetId(next.id)
    }
    setResult(null)
  }
  function selectTarget(id){
    if(busyGuard.current)return
    const item=getItem(id)
    if(item.value<=source.value)return
    setTargetId(id)
    setMultiplier(clamp(item.value/source.value,1.01,900))
    setResult(null)
  }

  function runUpgrade() {
    if(!validTarget || busyGuard.current)return
    const count=Number(inventory[source.id])||0
    if(count<1){
      setResult({type:'error',text:lang==='en'?'You do not own this item.':lang==='uk'?'У тебе немає цього предмета.':'У тебя нет этого предмета.'})
      return
    }
    busyGuard.current=true
    const success=secureRoll()*100<chance
    const nextInventory={...inventory,[source.id]:count-1}
    if(success)nextInventory[target.id]=(Number(nextInventory[target.id])||0)+1
    const entry={id:Date.now()+secureRoll(),ok:success,source:source.id,target:target.id,chance:chance.toFixed(2),time:new Date().toLocaleTimeString(lang==='en'?'en-US':'ru-RU',{hour:'2-digit',minute:'2-digit'})}
    const nextHistory=[entry,...history].slice(0,12)
    // Commit rewards before the animation starts. A reload cannot reroll a result.
    try{
      localStorage.setItem('mineup-demo-inventory',JSON.stringify(nextInventory))
      localStorage.setItem('mineup-demo-history',JSON.stringify(nextHistory))
    }catch{}
    setInventory(nextInventory)
    setHistory(nextHistory)
    const nextStats={cases:stats.cases||0,upgrades:(stats.upgrades||0)+1,wins:(stats.wins||0)+(success?1:0)}
    try{localStorage.setItem('mineup-demo-stats',JSON.stringify(nextStats))}catch{}
    setStats(nextStats)
    setResult(null)
    setUpgradeBusy(true)
    if(upgradeTimer.current)clearTimeout(upgradeTimer.current)
    upgradeTimer.current=setTimeout(()=>{
      busyGuard.current=false
      setUpgradeBusy(false)
      setResult({type:success?'success':'fail',text:success?`${t.success} • ${source.name} → ${target.name}`:`${t.fail} • ${source.name}`})
      upgradeTimer.current=null
    },1600)
  }

  function sellItem(id) {
    if (!(inventory[id] > 0)) return
    const item = getItem(id)
    setInventory((prev) => ({ ...prev, [id]: prev[id] - 1 }))
    setCoins((prev) => prev + Math.floor(item.value * 0.85))
  }

  function resetDemo() {
    if(busyGuard.current || rollingGuard.current)return
    if(!window.confirm(ex.confirmReset))return
    setCoins(2500)
    setInventory({ ...defaultInventory })
    setHistory([])
    setCaseHistory([])
    setStats({cases:0,upgrades:0,wins:0})
    setSourceId('iron')
    setTargetId('diamond')
    setMultiplier(5.714)
    setResult(null)
  }

  function exportSave(){
    const data={format:'voxup-save',version:1,createdAt:new Date().toISOString(),coins,inventory,history,caseHistory,stats,sourceId,targetId,multiplier,lang,theme,accent}
    const file=new Blob([JSON.stringify(data,null,2)],{type:'application/json'})
    const url=URL.createObjectURL(file)
    const a=document.createElement('a');a.href=url;a.download='voxup-save.json';document.body.appendChild(a);a.click();a.remove()
    setTimeout(()=>URL.revokeObjectURL(url),500)
  }
  async function importSave(e){
    const file=e.target.files?.[0]
    if(!file)return
    try{
      if(file.size>2*1024*1024)throw new Error('oversized')
      const data=JSON.parse(await file.text())
      if(data?.format!=='voxup-save'||data.version!==1||!data.inventory||typeof data.inventory!=='object'||!Number.isFinite(data.coins))throw new Error('invalid')
      if(busyGuard.current||rollingGuard.current)throw new Error('busy')
      const validInventory={}
      for(const item of previewItems){
        const count=Number(data.inventory[item.id]||0)
        validInventory[item.id]=Number.isSafeInteger(count)&&count>=0&&count<=1e7?count:0
      }
      const safeCoins=clamp(Math.floor(data.coins),0,1e12)
      const safeHistory=Array.isArray(data.history)?data.history.filter(h=>h&&itemMap[h.source]&&itemMap[h.target]).slice(0,12):[]
      const safeCaseHistory=Array.isArray(data.caseHistory)?data.caseHistory.filter(h=>h&&itemMap[h.item]).slice(0,30):[]
      const nextSource=itemMap[data.sourceId]?data.sourceId:'iron'
      const nextTarget=itemMap[data.targetId]?data.targetId:'diamond'
      const nextMult=clamp(Number(data.multiplier)||5.714,1.01,900)
      const positiveInt=(v,fallback)=>Number.isSafeInteger(Number(v))&&Number(v)>=0&&Number(v)<=1e9?Number(v):fallback
      const nextStats={cases:positiveInt(data.stats?.cases,safeCaseHistory.length),upgrades:positiveInt(data.stats?.upgrades,safeHistory.length),wins:positiveInt(data.stats?.wins,safeHistory.filter(h=>h.ok).length)}
      const writes={'mineup-demo-coins':safeCoins,'mineup-demo-inventory':validInventory,'mineup-demo-history':safeHistory,'mineup-case-history':safeCaseHistory,'mineup-preview-source':nextSource,'mineup-preview-target':nextTarget,'mineup-preview-multiplier':nextMult,'mineup-demo-stats':nextStats}
      Object.entries(writes).forEach(([key,val])=>localStorage.setItem(key,JSON.stringify(val)))
      setCoins(safeCoins);setInventory(validInventory);setHistory(safeHistory);setCaseHistory(safeCaseHistory);setStats(nextStats)
      setSourceId(nextSource);setTargetId(nextTarget);setMultiplier(nextMult)
      setBackupMessage(ex.backupOk)
    }catch{setBackupMessage(ex.backupBad)}
    e.target.value=''
  }

  // DEMO CASE: draws using browser crypto, costs only simulated MC.
  // Not a rewarded ad integration. A real site must validate payment and reward server-side.
  function secureRoll() {
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const a = new Uint32Array(1);crypto.getRandomValues(a);return a[0] / 4294967296
    }
    return Math.random()
  }
  function pickPrize(pool) {
    let pick = secureRoll() * 100
    for(const [id,weight] of pool){ pick -= weight;if(pick < 0)return id }
    return pool[pool.length-1][0]
  }
  const caseEvs = casePools.map(pool => pool.reduce((sum,[id,pct])=>sum+getItem(id).value*pct/100,0))

  function openDemoCase() {
    if(activeCase===null || rollingGuard.current)return
    const idx=activeCase,price=cases[idx][2]
    if(coins<price){setCaseRollResult({error:true,text:lang==='en'?'Not enough MC Coins.':'Недостаточно MC Coins.'});return}
    const pool=casePools[idx]
    const won=pickPrize(pool)
    const reel=Array.from({length:60},(_,i)=>i===WINNER_INDEX?won:pickPrize(pool))
    // Charge AND deliver synchronously at click time. Both React state and local
    // persistent state receive the same transaction before animation begins.
    const nextCoins=coins-price
    const nextInventory={...inventory,[won]:(inventory[won]||0)+1}
    const nextHistory=[{id:Date.now()+secureRoll(),item:won,caseName:cases[idx][1],price,time:new Date().toLocaleString('ru-RU')},...caseHistory].slice(0,30)
    try{
      localStorage.setItem('mineup-demo-coins',JSON.stringify(nextCoins))
      localStorage.setItem('mineup-demo-inventory',JSON.stringify(nextInventory))
      localStorage.setItem('mineup-case-history',JSON.stringify(nextHistory))
    }catch{}
    setCoins(nextCoins)
    setInventory(nextInventory)
    setCaseHistory(nextHistory)
    const nextStats={cases:(stats.cases||0)+1,upgrades:stats.upgrades||0,wins:stats.wins||0}
    try{localStorage.setItem('mineup-demo-stats',JSON.stringify(nextStats))}catch{}
    setStats(nextStats)
    rollingGuard.current=true
    setCaseRollResult(null)
    setCaseReel(reel)
    setCaseSpinId(i=>i+1)
    setCaseRolling(true)
  }
  // WAAPI runs entirely on a single transform layer. No keyframe jumps, no
  // re-mounts, and no hardcoded pixel offsets that depend on viewport size.
  React.useLayoutEffect(()=>{
    if(!caseRolling || !caseReel.length || !reelTrack.current || !reelWindow.current)return
    const track=reelTrack.current
    const width=120,gap=10
    const start=-(width/2)
    const target=-(WINNER_INDEX*(width+gap)+width/2)
    track.style.transform=`translate3d(${target}px,-50%,0)`
    const animation=track.animate([
      {transform:`translate3d(${start}px,-50%,0)`},
      {transform:`translate3d(${target}px,-50%,0)`}
    ],{duration:SPIN_TIME,easing:'cubic-bezier(.09,.68,.16,1)',fill:'forwards'})
    reelAnimation.current=animation
    animation.onfinish=()=>{
      reelAnimation.current=null
      rollingGuard.current=false
      setCaseRolling(false)
      setCaseRollResult({id:caseReel[WINNER_INDEX]})
    }
    return()=>{
      animation.onfinish=null
      animation.cancel()
      if(reelAnimation.current===animation)reelAnimation.current=null
    }
  },[caseSpinId])
  function closeCase(){
    if(rollingGuard.current)return
    setActiveCase(null);setCaseRollResult(null);setCaseReel([])
  }

  function go(p) {
    setPage(p)
    setMenu(false)
    setActiveCase(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const caseFeature = ['dirt','apple','iron_pickaxe','iron_sword','gold','redstone','diamond_sword','blaze_rod','netherite','dragon_egg','enchanted_apple']
  const caseArt = (i) => (
    <div className="caseArt caseArtPremium" style={{ '--tone': cases[i][3] }}>
      <span className="caseGlow" />
      <div className="caseArtModel"><VoxelThumbnail id={caseFeature[i]} textureSource={textureSource} blockIds={blockIds} /></div>
      <span className="caseArtMiniLabel">{cases[i][0]}</span>
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
          <div className="stage">MINEUP <strong>ALPHA 0.4</strong><div className="stageBar"><i style={{ width: '34%' }} /></div><span>{t.ready}</span></div>
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
              <div className="eyebrow"><span className="dot" /> MINEUP PROJECT — ALPHA 0.4</div>
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
                  <div><div className="eyebrow">STAGE 09 / 100 ITEMS · SEARCH · 3D BEACON</div><h2>{uc.title}</h2><p>{uc.desc}</p></div>
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
                    <VoxelViewer id={source.id} label={source.name} textureSource={textureSource} blockIds={blockIds} />
                    <strong>{source.name}</strong>
                    <span className="upValue">{formatCoins(source.value)} MC</span>
                    <small className="ownedMark">{t.sourceOwned}: <b>{inventory[source.id] || 0}</b></small>
                  </div>
                  <div className="upChance">
                    <div className={'upWheel '+(upgradeBusy?'wheelRolling':'')} style={{ '--pct': chance + '%' }}><div><strong>{chance.toFixed(2)}%</strong><span>{upgradeBusy?ex.spin:uc.chance}</span></div></div>
                    <small>{uc.formula}</small>
                    <button className="upgradeRun" onClick={runUpgrade} disabled={upgradeBusy || (inventory[source.id] || 0) < 1 || !validTarget}><Swords size={16} /> {upgradeBusy?ex.spin:uc.run}</button>
                  </div>
                  <div className="upSlot">
                    <span className="upSlotLabel">02 / {uc.target}</span>
                    <VoxelViewer id={target.id} label={target.name} textureSource={textureSource} blockIds={blockIds} />
                    <strong>{target.name}</strong>
                    <span className="upValue">{formatCoins(target.value)} MC</span>
                    <small className="rarityMark" style={{ color: rarityColors[target.rarity] }}>{target.rarity}</small>
                  </div>
                </div>

                <div className="upgradeSlider">
                  <label htmlFor="upMultiplier">{uc.mult} <b>×{multiplier < 10 ? multiplier.toFixed(2) : multiplier.toFixed(0)}</b></label>
                  <input id="upMultiplier" type="range" min="0" max="1000" step="1" value={sliderValue} disabled={upgradeBusy} onChange={(e) => pickTargetByMultiplier((1.01 * Math.pow(900 / 1.01, Number(e.target.value) / 1000)).toFixed(3))} />
                  <div><span>×1.01 • до 90%</span><span>×900 • до 0,1%</span></div>
                </div>

                {result && <div className={'resultBanner resultReveal ' + result.type} role="status"><span>{result.type==='success'?'✦':result.type==='fail'?'×':'!'}</span>{result.text}</div>}

                <div className="catalogCountBadge"><Gem size={15}/><b>{previewItems.length}</b> {ex.total} • {ex.showcase} <span>{ex.fair}</span></div>
                <div className="upCollections">
                  <section className="upCollectionSide">
                    <div className="collectionHead"><h3>{uc.inventorySource} <small>{filteredSources.length} / {ownedItems.length}</small></h3></div>
                    <div className="catalogControls">
                      <label className="catalogSearch"><Search size={16}/><input type="search" placeholder={ex.search} aria-label={ex.sourceList} value={sourceSearch} onChange={e=>setSourceSearch(e.target.value)} autoComplete="off"/></label>
                      <select value={sourceOrder} onChange={e=>setSourceOrder(e.target.value)} aria-label="Сортировка исходных предметов"><option value="value_asc">{ex.sortCheap}</option><option value="value_desc">{ex.sortExpensive}</option><option value="name">{ex.sortName}</option></select>
                    </div>
                    <div className="upItemList">
                      {filteredSources.map(item=><button key={item.id} className={'upItem '+(item.id===source.id?'upPicked':'')} onClick={()=>selectSource(item.id)} disabled={upgradeBusy} aria-pressed={item.id===source.id}>
                        <VoxelThumbnail id={item.id} textureSource={textureSource} blockIds={blockIds}/>
                        <strong>{item.name}</strong><small>{formatCoins(item.value)} MC</small><em>{t.owned}: {inventory[item.id]||0}</em>
                      </button>)}
                      {!filteredSources.length&&<div className="catalogEmpty"><Search size={19}/>{ex.nothing}</div>}
                    </div>
                  </section>
                  <section className="upCollectionSide">
                    <div className="collectionHead"><h3>{uc.inventoryTarget} <small>{filteredTargets.length} / {possibleTargets.length}</small></h3></div>
                    <div className="catalogControls">
                      <label className="catalogSearch"><Search size={16}/><input type="search" placeholder={ex.search} aria-label={ex.targetList} value={targetSearch} onChange={e=>setTargetSearch(e.target.value)} autoComplete="off"/></label>
                      <select value={targetOrder} onChange={e=>setTargetOrder(e.target.value)} aria-label="Сортировка целей"><option value="value_asc">{ex.sortCheap}</option><option value="value_desc">{ex.sortExpensive}</option><option value="name">{ex.sortName}</option></select>
                    </div>
                    <div className="rarityFilters" aria-label="Filter by rarity">
                      {['all','COMMON','UNCOMMON','RARE','EPIC','LEGENDARY','MYTHIC'].map(r=><button key={r} type="button" className={targetRarity===r?'selected':''} onClick={()=>setTargetRarity(r)} style={r==='all'?{}:{'--rarity':rarityColors[r]}}>{r==='all'?lang==='en'?'All':'Все':r}</button>)}
                    </div>
                    <div className="upItemList">
                      {filteredTargets.map(item=><button key={item.id} className={'upItem '+(item.id===target.id?'upPicked':'')} onClick={()=>selectTarget(item.id)} disabled={upgradeBusy} aria-pressed={item.id===target.id}>
                        <VoxelThumbnail id={item.id} textureSource={textureSource} blockIds={blockIds}/>
                        <strong>{item.name}</strong><small>{formatCoins(item.value)} MC</small><em style={{color:rarityColors[item.rarity]}}>{item.rarity}</em>
                      </button>)}
                      {!filteredTargets.length&&<div className="catalogEmpty"><Search size={19}/>{possibleTargets.length?ex.nothing:ex.noHigher}</div>}
                    </div>
                  </section>
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
              <div className="eyebrow"><span className="dot" /> MINEUP / CASE COLLECTION · 11 CASES · 100 ITEMS</div>
              <div className="areaHeading"><div><h1 className="sectionTitle">{t.catalog}</h1><p>{t.notice}</p></div><span className="stamp"><Coins size={15} /> {formatCoins(coins)} MC</span></div>
              <div className="economyBanner"><div><strong>ЭКОНОМИКА / DEMO</strong><span>Открытия бесплатного кейса доступны для теста без рекламы. У платных кейсов свои таблицы шансов; все цены игровые.</span></div><button className="secondaryBtn" onClick={()=>go('inventory')}>Инвентарь <ArrowUpRight size={15}/></button></div>
              <div className="caseGrid">{cases.map((c,i)=><button className="caseCard caseCardNew" key={i} onClick={()=>{setActiveCase(i);setCaseRollResult(null);setCaseReel([])}}>
                <span className="caseIndex">{String(i+1).padStart(2,'0')} / {c[0]}</span>{caseArt(i)}
                <strong>{c[1]}</strong><div className="caseMeta"><span>Дропов: {casePools[i].length}</span><span>EV {formatCoins(Math.round(caseEvs[i]))} MC</span></div>
                <div className="casePrice">{i===0?'БЕСПЛАТНО':formatCoins(c[2])+' MC'} <ArrowUpRight size={15}/></div>
              </button>)}</div>
              <section className="caseHistoryPanel"><h3>ПОСЛЕДНИЕ ВЫПАДЕНИЯ</h3>{caseHistory.length?<div className="caseHistoryGrid">{caseHistory.slice(0,8).map(entry=><div key={entry.id} className="dropHistory"><img src={textureSource(entry.item)} alt=""/><span><b>{getItem(entry.item).name}</b><small>{entry.caseName} • {entry.time}</small></span></div>)}</div>:<p>Пока не было открытий. Начни с бесплатного кейса.</p>}</section>
            </>
          )}

          {page === 'inventory' && (
            <>
              <div className="eyebrow">MINEUP / COLLECTION</div>
              <div className="areaHeading"><div><h1 className="sectionTitle">{t.inventory}</h1><p>{t.invText}</p></div><span className="stamp"><Coins size={15} />{formatCoins(coins)} MC</span></div>
              <div className="inventoryMeta"><div className="notice"><Coins size={18} />{t.coinsInfo}</div><button className="secondaryBtn" onClick={resetDemo}><RotateCcw size={16} /> {t.resetDemo}</button></div>
              <div className="inventoryControls">
                <label className="catalogSearch inventorySearch"><Search size={16}/><input type="search" placeholder={ex.search} value={inventorySearch} onChange={e=>setInventorySearch(e.target.value)} autoComplete="off"/></label>
                <button className={'secondaryBtn '+(inventoryOnly?'inventoryControlActive':'')} onClick={()=>setInventoryOnly(v=>!v)}>{inventoryOnly?'✓ Только мои предметы':'Показать только мои'}</button>
                <select value={inventoryOrder} onChange={e=>setInventoryOrder(e.target.value)} aria-label="Сортировать инвентарь"><option value="value_desc">{ex.sortExpensive}</option><option value="value_asc">{ex.sortCheap}</option><option value="name">{ex.sortName}</option></select>
              </div>
              <div className="inventoryGrid">
                {previewItems.filter(item=>(!inventoryOnly||(inventory[item.id]||0)>0)&&matches(item,inventorySearch)).sort((a,b)=>inventoryOrder==='name'?a.name.localeCompare(b.name,'ru'):inventoryOrder==='value_asc'?a.value-b.value:b.value-a.value).map((item) => (
                  <div key={item.id} className={'invCard ' + ((inventory[item.id] || 0) < 1 ? 'is-empty' : '')}>
                    <VoxelThumbnail id={item.id} textureSource={textureSource} blockIds={blockIds} />
                    <strong>{item.name}</strong>
                    <small>{formatCoins(item.value)} MC</small>
                    <div className="invMeta"><span className="invCount">×{inventory[item.id] || 0}</span><span style={{ color: rarityColors[item.rarity] }}>{item.rarity}</span></div>
                    <button className="sellBtn" onClick={() => sellItem(item.id)} disabled={(inventory[item.id] || 0) < 1}>{t.sell} +{formatCoins(Math.floor(item.value * 0.85))}</button>
                  </div>
                ))}
              </div>
            </>
          )}

          {page === 'profile' && (
            <>
              <div className="eyebrow">MINEUP / USER</div>
              <h1 className="sectionTitle">{t.profile}</h1>
              <div className="profileLead"><UserRound size={38}/><div><h2>{t.guest}</h2><p>{t.profileSoon}</p><span>{ex.mode}</span></div></div>
              <div className="profileStats">
                {[ [ex.total,previewItems.length], [ex.myCollection,totalItems], [ex.profit,formatCoins(portfolioValue)+' MC'], [ex.casesOpened,stats.cases||0], [ex.upgrades,stats.upgrades||0], [ex.wins,stats.wins||0] ].map(([label,value],i)=><div className="profileStat" key={i}><span>{label}</span><strong>{value}</strong></div>)}
              </div>
              <section className="backupPanel"><div><div className="eyebrow">SAVE / LOCAL BACKUP</div><h3>{ex.demoSaves}</h3><p>{ex.backupHint}</p></div><div className="backupActions">
                <button className="primary" onClick={exportSave}><Download size={17}/>{ex.download}</button>
                <button className="secondaryBtn" onClick={()=>backupInput.current?.click()}><Upload size={17}/>{ex.upload}</button>
                <input ref={backupInput} type="file" accept=".json,application/json" hidden onChange={importSave}/>
              </div>{backupMessage&&<div className="backupFeedback" role="status">{backupMessage}</div>}</section>
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

          <footer><span>© 2026 MINEUP. UNOFFICIAL MINECRAFT FAN PROJECT.</span><span>ALPHA 0.4 • LOCAL DEMO / 100 ITEMS + SEARCH</span></footer>
        </main>
      </div>

      {activeCase !== null && (
        <div className="modalBackdrop caseBackdrop" onClick={closeCase}>
          <div className="modal caseModalV8" role="dialog" aria-modal="true" aria-label={cases[activeCase][1]} onClick={e=>e.stopPropagation()}>
            <button className="modalClose" disabled={caseRolling} onClick={closeCase} aria-label="Закрыть"><X/></button>
            <div className="caseModalHeader">
              <div className="caseTitle"><span className="eyebrow">CASE / {String(activeCase+1).padStart(2,'0')} • LOCAL DEMO</span><h2>{cases[activeCase][1]}</h2><p>{cases[activeCase][4]}</p></div>
              <div className="casePriceHead"><small>СТОИМОСТЬ ОТКРЫТИЯ</small><strong>{activeCase===0?'БЕСПЛАТНО':formatCoins(cases[activeCase][2])+' MC'}</strong><small>Баланс: {formatCoins(coins)} MC</small></div>
            </div>
            <div className="rouletteWrap">
              <div className="reelPointer" aria-hidden="true"/>
              <div className="caseReelWindowV8" ref={reelWindow}>
                <div className="caseReelTrackV8" ref={reelTrack}>
                  {(caseReel.length?caseReel:Array.from({length:60},(_,i)=>casePools[activeCase][i%casePools[activeCase].length][0])).map((id,i)=><div className={'caseReelCardV8 '+(caseRollResult?.id&&i===WINNER_INDEX?'reelWon':'')} key={i} style={{'--rarity':rarityColors[getItem(id).rarity]}}>
                    <img src={textureSource(id)} alt="" draggable="false"/><small>{getItem(id).name}</small><i/></div>)}
                </div>
              </div>
              <div className="rouletteBottom"><span>{caseRolling?'ПРОКРУТКА • 5 СЕКУНД':'СОДЕРЖИМОЕ КЕЙСА'}</span><span>{caseRolling?'● LIVE ROLL':caseRollResult?.id?'РЕЗУЛЬТАТ ПОЛУЧЕН':'ГОТОВ К ОТКРЫТИЮ'}</span></div>
            </div>
            {caseRollResult?.id&&<div className="dropCelebration dropReveal" style={{'--rarity':rarityColors[getItem(caseRollResult.id).rarity]}}><VoxelThumbnail id={caseRollResult.id} textureSource={textureSource} blockIds={blockIds}/><div><small>ТВОЙ ДРОП • +1 В ИНВЕНТАРЬ</small><strong>{getItem(caseRollResult.id).name}</strong><span>{formatCoins(getItem(caseRollResult.id).value)} MC • {getItem(caseRollResult.id).rarity}</span></div></div>}
            {caseRollResult?.error&&<div className="resultBanner error">{caseRollResult.text}</div>}
            <div className="caseActions"><button className="primary caseSpinBtn" disabled={caseRolling} onClick={openDemoCase}>{caseRolling?'ПРОКРУТКА...':caseRollResult?.id?'ОТКРЫТЬ ЕЩЁ':'ОТКРЫТЬ КЕЙС'} <Gift size={18}/></button><div className="caseSecurity"><ShieldCheck size={17}/><span>{activeCase===0?'Тестовый free case без рекламы. Рекламу подключим только после серверной части.':'Приз начисляется один раз при нажатии. Перезагрузка не уничтожит выигрыш.'}</span></div></div>
            <section className="oddsSection"><div className="oddsHeader"><div><h3>ЧТО МОЖЕТ ВЫПАСТЬ</h3><p>Фиксированные вероятности, указаны для каждого предмета</p></div><span>СРЕДНИЙ ДРОП: {formatCoins(Math.round(caseEvs[activeCase]))} MC</span></div>
              <div className="oddsGrid">{casePools[activeCase].map(([id,p])=><div className="oddsItem" key={id} style={{'--rarity':rarityColors[getItem(id).rarity]}}><img src={textureSource(id)} alt=""/><div><strong>{getItem(id).name}</strong><small>{formatCoins(getItem(id).value)} MC</small></div><b>{Number(p).toLocaleString('ru-RU',{maximumFractionDigits:2})}%</b></div>)}</div>
              <div className="economyNote">Сумма вероятностей: 100%. Виртуальная валюта и предметы • расчёт дропа пока происходит в браузере. Показанный средний дроп — математическое ожидание стоимости, а не гарантированная награда.</div>
            </section>
          </div>
        </div>
      )}
    </div>
  )
}
