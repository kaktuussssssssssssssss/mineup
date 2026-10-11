import React, { useEffect, useMemo, useRef, useState } from 'react'
import {VoxelViewer, VoxelThumbnail} from './Voxel3D.jsx'
import { Gem, Layers3, Boxes, UserRound, Settings2, ArrowUpRight, ChevronRight, LockKeyhole, Gift, Sparkles, Menu, X, Check, ShieldCheck, Coins, Globe2, SlidersHorizontal, Wallet, Swords, RotateCcw, Search, Download, Upload, TrendingUp, Activity, Filter, Volume2, Zap, Gamepad2, Timer, Target } from 'lucide-react'

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
  "dragon_breath": "item/dragon_breath.png",
  "wooden_sword": "item/wooden_sword.png",
  "wooden_pickaxe": "item/wooden_pickaxe.png",
  "beetroot": "item/beetroot.png",
  "potato": "item/potato.png",
  "carrot": "item/carrot.png",
  "bone": "item/bone.png",
  "rotten_flesh": "item/rotten_flesh.png",
  "egg": "item/egg.png",
  "melon_slice": "item/melon_slice.png",
  "cooked_chicken": "item/cooked_chicken.png",
  "cooked_beef": "item/cooked_beef.png",
  "pumpkin_pie": "item/pumpkin_pie.png",
  "paper": "item/paper.png",
  "fishing_rod": "item/fishing_rod.png",
  "saddle": "item/saddle.png",
  "leather_boots": "item/leather_boots.png",
  "shield": "item/shield.png",
  "shears": "item/shears.png",
  "chainmail_helmet": "item/chainmail_helmet.png",
  "clock": "item/clock_00.png",
  "compass": "item/compass_00.png",
  "map": "item/map.png",
  "bucket": "item/bucket.png",
  "water_bucket": "item/water_bucket.png",
  "fire_charge": "item/fire_charge.png",
  "crossbow": "item/crossbow_standby.png",
  "spyglass": "item/spyglass.png",
  "golden_helmet": "item/golden_helmet.png",
  "diamond_boots": "item/diamond_boots.png",
  "diamond_leggings": "item/diamond_leggings.png",
  "golden_chestplate": "item/golden_chestplate.png",
  "diamond_horse_armor": "item/diamond_horse_armor.png",
  "turtle_scute": "item/turtle_scute.png",
  "turtle_helmet": "item/turtle_helmet.png",
  "phantom_membrane": "item/phantom_membrane.png",
  "nautilus_shell": "item/nautilus_shell.png",
  "spectral_arrow": "item/spectral_arrow.png",
  "experience_bottle": "item/experience_bottle.png",
  "enchanted_book": "item/enchanted_book.png",
  "netherite_leggings": "item/netherite_leggings.png",
  "netherite_boots": "item/netherite_boots.png",
  "conduit": "entity/conduit/base.png",
  "blue_ice": "block/blue_ice.png",
  "wind_charge": "item/wind_charge.png",
  "netherite_shovel": "item/netherite_shovel.png",
  "netherite_hoe": "item/netherite_hoe.png",
  "netherite_scrap": "item/netherite_scrap.png",
  "breeze_rod": "item/breeze_rod.png",
  "music_disc_relic": "item/music_disc_relic.png",
  "music_disc_creator": "item/music_disc_creator.png"
}
const blockIds = ["dirt", "cobblestone", "oak_planks", "stone", "crafting_table", "obsidian", "diamond_ore", "enchanting_table", "crying_obsidian", "end_stone", "ancient_debris", "beacon", "sand", "gravel", "netherrack", "grass_block", "oak_log", "mud", "glass", "sea_lantern", "tnt", "ender_chest", "gilded_blackstone", "soul_sand", "conduit", "blue_ice"]
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
,
  ["FARM", "Фермерский", 160, "#a6cf78", "Пища, урожай и редкие находки"],
  ["RANGER", "Следопыт", 500, "#94c8a2", "Лук, карта и инструменты"],
  ["EXPLORER", "Исследователь", 1100, "#8fa8d7", "Компас, книги и сокровища"],
  ["ALCHEMY", "Алхимик", 2200, "#b398e0", "Магия и редкие материалы"],
  ["ADVENTURE", "Приключение", 4500, "#edab81", "Экипировка и артефакты"],
  ["OCEAN", "Океан", 9000, "#6bd8d9", "Морские ценности"],
  ["DUNGEON", "Подземелье", 18000, "#c59b81", "Снаряжение и награды"],
  ["TRIALS", "Испытания", 40000, "#e5b459", "Опасные находки испытаний"],
  ["STORM", "Шторм", 85000, "#91a9fc", "Стихии и редкости"],
  ["RELICS", "Реликвии", 210000, "#e28ec9", "Коллекционные реликвии"]]

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
,
  {id: "wooden_sword", name: "Деревянный меч", value: 42, rarity: "COMMON"},
  {id: "wooden_pickaxe", name: "Деревянная кирка", value: 49, rarity: "COMMON"},
  {id: "beetroot", name: "Свёкла", value: 57, rarity: "COMMON"},
  {id: "potato", name: "Картофель", value: 63, rarity: "COMMON"},
  {id: "carrot", name: "Морковь", value: 70, rarity: "COMMON"},
  {id: "bone", name: "Кость", value: 78, rarity: "COMMON"},
  {id: "rotten_flesh", name: "Гнилая плоть", value: 85, rarity: "COMMON"},
  {id: "egg", name: "Яйцо", value: 92, rarity: "COMMON"},
  {id: "melon_slice", name: "Ломтик арбуза", value: 99, rarity: "COMMON"},
  {id: "cooked_chicken", name: "Жареная курица", value: 142, rarity: "UNCOMMON"},
  {id: "cooked_beef", name: "Стейк", value: 165, rarity: "UNCOMMON"},
  {id: "pumpkin_pie", name: "Тыквенный пирог", value: 188, rarity: "UNCOMMON"},
  {id: "paper", name: "Бумага", value: 215, rarity: "UNCOMMON"},
  {id: "fishing_rod", name: "Удочка", value: 285, rarity: "UNCOMMON"},
  {id: "saddle", name: "Седло", value: 355, rarity: "UNCOMMON"},
  {id: "leather_boots", name: "Кожаные ботинки", value: 440, rarity: "UNCOMMON"},
  {id: "shield", name: "Щит", value: 630, rarity: "RARE"},
  {id: "shears", name: "Ножницы", value: 765, rarity: "RARE"},
  {id: "chainmail_helmet", name: "Кольчужный шлем", value: 980, rarity: "RARE"},
  {id: "clock", name: "Часы", value: 1180, rarity: "RARE"},
  {id: "compass", name: "Компас", value: 1420, rarity: "RARE"},
  {id: "map", name: "Карта", value: 1560, rarity: "RARE"},
  {id: "bucket", name: "Ведро", value: 1760, rarity: "RARE"},
  {id: "water_bucket", name: "Ведро воды", value: 2080, rarity: "RARE"},
  {id: "fire_charge", name: "Огненный заряд", value: 2410, rarity: "EPIC"},
  {id: "crossbow", name: "Арбалет", value: 2920, rarity: "EPIC"},
  {id: "spyglass", name: "Подзорная труба", value: 3460, rarity: "EPIC"},
  {id: "golden_helmet", name: "Золотой шлем", value: 4250, rarity: "EPIC"},
  {id: "diamond_boots", name: "Алмазные ботинки", value: 6150, rarity: "EPIC"},
  {id: "diamond_leggings", name: "Алмазные поножи", value: 8050, rarity: "EPIC"},
  {id: "golden_chestplate", name: "Золотой нагрудник", value: 9250, rarity: "LEGENDARY"},
  {id: "diamond_horse_armor", name: "Алмазная конская броня", value: 11200, rarity: "LEGENDARY"},
  {id: "turtle_scute", name: "Черепаший щиток", value: 12300, rarity: "LEGENDARY"},
  {id: "turtle_helmet", name: "Черепаший панцирь", value: 14300, rarity: "LEGENDARY"},
  {id: "phantom_membrane", name: "Мембрана фантома", value: 17100, rarity: "LEGENDARY"},
  {id: "nautilus_shell", name: "Раковина наутилуса", value: 18700, rarity: "LEGENDARY"},
  {id: "spectral_arrow", name: "Спектральная стрела", value: 21500, rarity: "LEGENDARY"},
  {id: "experience_bottle", name: "Пузырёк опыта", value: 24600, rarity: "LEGENDARY"},
  {id: "enchanted_book", name: "Зачарованная книга", value: 29800, rarity: "LEGENDARY"},
  {id: "netherite_leggings", name: "Незеритовые поножи", value: 35200, rarity: "LEGENDARY"},
  {id: "netherite_boots", name: "Незеритовые ботинки", value: 41600, rarity: "MYTHIC"},
  {id: "conduit", name: "Морской проводник", value: 50500, rarity: "MYTHIC"},
  {id: "blue_ice", name: "Синий лёд", value: 59400, rarity: "MYTHIC"},
  {id: "wind_charge", name: "Заряд ветра", value: 68200, rarity: "MYTHIC"},
  {id: "netherite_shovel", name: "Незеритовая лопата", value: 85200, rarity: "MYTHIC"},
  {id: "netherite_hoe", name: "Незеритовая мотыга", value: 95700, rarity: "MYTHIC"},
  {id: "netherite_scrap", name: "Незеритовый скрап", value: 123000, rarity: "MYTHIC"},
  {id: "breeze_rod", name: "Стержень бриза", value: 146000, rarity: "MYTHIC"},
  {id: "music_disc_relic", name: "Пластинка Relic", value: 171000, rarity: "MYTHIC"},
  {id: "music_disc_creator", name: "Пластинка Creator", value: 198000, rarity: "MYTHIC"}]
const itemMap = Object.fromEntries(previewItems.map((item) => [item.id, item]))
const rarityColors = { COMMON: '#9ba3b2', UNCOMMON: '#d6b069', RARE: '#5dd8c4', EPIC: '#7ca8ff', LEGENDARY: '#c89bff', MYTHIC: '#f070ff' }
const casePools = [[["dirt",38.0],["stick",20.0],["sand",3.0],["cobblestone",12.0],["gravel",2.0],["netherrack",2.0],["stone",1.0],["grass_block",1.0],["oak_log",1.0],["mud",1.0],["snowball",3.0],["coal",7.0],["flint",1.0],["clay_ball",1.0],["copper_ingot",5.0],["iron",2.0]],[["oak_planks",11.82],["bread",24.03],["wheat",3.17],["apple",26.42],["leather",3.05],["feather",1.99],["string",0.98],["copper_ingot",12.44],["raw_copper",4.66],["iron",8.39],["bow",0.33],["arrow",0.64],["iron_pickaxe",1.58],["emerald",0.5]],[["feather",4.31],["string",4.34],["copper_ingot",4.39],["raw_copper",4.45],["raw_iron",14.27],["iron",20.32],["raw_gold",2.41],["stone_pickaxe",2.44],["lapis",10.78],["redstone",0.86],["arrow",0.89],["book",2.82],["torch",1.93],["iron_pickaxe",15.96],["crafting_table",1.15],["emerald",6.31],["diamond",2.37]],[["bow",4.63],["arrow",4.64],["iron_sword",11.62],["book",1.56],["gold",4.68],["torch",4.68],["iron_pickaxe",12.61],["iron_axe",3.96],["iron_helmet",2.39],["emerald",20.85],["iron_chestplate",1.64],["obsidian",14.15],["diamond",9.42],["diamond_sword",2.67],["totem",0.5]],[["iron_axe",4.79],["crafting_table",4.8],["iron_helmet",4.82],["emerald",20.15],["iron_chestplate",4.92],["golden_apple",18.06],["golden_carrot",2.5],["glass",1.68],["diamond",16.08],["quartz",1.71],["gunpowder",2.6],["glowstone_dust",0.9],["blaze_rod",0.91],["slime_ball",0.91],["diamond_sword",11.94],["totem",3.03],["netherite",0.2]],[["glass",5.55],["diamond",5.55],["quartz",5.55],["gunpowder",5.55],["diamond_ore",18.51],["ender_pearl",0.93],["nether_wart",0.93],["diamond_pickaxe",23.14],["amethyst_shard",3.7],["diamond_sword",15.73],["prismarine_shard",2.78],["enchanting_table",0.93],["prismarine_crystals",2.78],["golden_sword",0.93],["totem",6.94],["netherite",0.5]],[["ender_pearl",5.43],["nether_wart",5.44],["diamond_pickaxe",19.98],["amethyst_shard",5.47],["diamond_sword",16.45],["prismarine_shard",5.53],["golden_pickaxe",2.82],["magma_cream",0.95],["diamond_axe",2.87],["diamond_helmet",1.94],["end_stone",0.98],["totem",18.78],["diamond_chestplate",2.01],["ancient_debris",9.17],["netherite",2.08],["nether_star",0.1]],[["golden_sword",3.95],["ghast_tear",6.61],["golden_pickaxe",4.04],["ender_eye",4.78],["magma_cream",4.13],["diamond_axe",4.2],["crying_obsidian",9.35],["totem",23.0],["ancient_debris",9.14],["sea_lantern",1.7],["tnt",1.76],["trident",0.89],["ender_chest",1.86],["netherite",14.04],["gilded_blackstone",1.04],["shulker_shell",1.04],["soul_sand",1.14],["netherite_sword",3.79],["netherite_pickaxe",3.18],["nether_star",0.36]],[["totem",4.55],["diamond_chestplate",3.99],["ancient_debris",9.46],["sea_lantern",4.1],["tnt",4.18],["trident",4.19],["netherite",22.24],["netherite_sword",22.32],["netherite_pickaxe",2.78],["nether_star",9.84],["netherite_axe",3.16],["netherite_helmet",2.35],["echo_shard",2.64],["elytra",4.0],["dragon_egg",0.2]],[["netherite_sword",13.15],["netherite_pickaxe",4.96],["nether_star",17.41],["netherite_axe",4.99],["netherite_helmet",5.03],["elytra",18.66],["music_disc_pigstep",3.4],["music_disc_13",3.43],["netherite_chestplate",12.88],["heart_of_the_sea",0.87],["mace",1.74],["heavy_core",1.75],["beacon",7.94],["dragon_egg",3.49],["enchanted_apple",0.3]],[["echo_shard",4.1],["elytra",6.94],["music_disc_pigstep",4.21],["music_disc_13",4.29],["netherite_chestplate",9.37],["heart_of_the_sea",4.44],["mace",1.51],["heavy_core",1.53],["beacon",14.92],["trial_key",1.61],["end_crystal",16.77],["ominous_trial_key",1.76],["dragon_breath",1.83],["dragon_egg",15.55],["enchanted_apple",11.17]],
  [["wooden_sword",2.6],["wooden_pickaxe",3.27],["beetroot",4.13],["potato",4.84],["carrot",5.75],["bone",6.91],["rotten_flesh",8.03],["egg",9.27],["melon_slice",10.62],["cooked_chicken",10.05],["cooked_beef",10.03],["pumpkin_pie",10.24],["paper",6.44],["fishing_rod",7.82]],
  [["fishing_rod",12.25],["saddle",12.95],["leather_boots",11.12],["shield",5.46],["shears",5.08],["copper_ingot",3.19],["redstone",8.73],["gold",13.87],["iron_pickaxe",12.08],["emerald",10.04],["golden_apple",5.23]],
  [["iron_pickaxe",18.28],["chainmail_helmet",11.46],["clock",7.23],["compass",2.61],["map",1.97],["bucket",1.35],["water_bucket",0.75],["golden_carrot",16.7],["obsidian",18.57],["diamond",10.92],["quartz",8.65],["blaze_rod",1.51]],
  [["emerald",22.4],["bucket",18.14],["water_bucket",11.38],["fire_charge",7.24],["crossbow",2.26],["spyglass",1.17],["diamond_pickaxe",9.62],["diamond_sword",5.64],["amethyst_shard",6.86],["ender_pearl",14.73],["ghast_tear",0.56]],
  [["ender_pearl",18.26],["spyglass",16.01],["golden_helmet",10.53],["diamond_boots",2.66],["diamond_leggings",1.26],["enchanting_table",17.55],["prismarine_crystals",14.81],["golden_sword",11.96],["diamond_axe",3.44],["diamond_helmet",2.13],["totem",1.39]],
  [["golden_sword",28.3],["diamond_boots",25.3],["diamond_leggings",12.81],["golden_chestplate",8.64],["diamond_horse_armor",2.85],["turtle_scute",2.06],["turtle_helmet",1.18],["sea_lantern",6.03],["trident",2.61],["netherite",1.12],["ender_chest",1.84],["ancient_debris",7.26]],
  [["totem",23.6],["turtle_scute",23.3],["turtle_helmet",16.77],["phantom_membrane",10.99],["nautilus_shell",8.75],["spectral_arrow",6.0],["experience_bottle",2.43],["enchanted_book",1.3],["netherite_sword",3.38],["netherite_pickaxe",2.05],["nether_star",1.43]],
  [["spectral_arrow",17.45],["experience_bottle",18.86],["enchanted_book",14.06],["netherite_leggings",10.16],["netherite_boots",7.15],["conduit",2.76],["blue_ice",1.84],["netherite_axe",11.9],["netherite_helmet",8.68],["elytra",5.18],["netherite_chestplate",1.96]],
  [["echo_shard",15.12],["conduit",16.37],["blue_ice",13.98],["wind_charge",10.73],["netherite_shovel",6.78],["netherite_hoe",5.23],["heavy_core",9.37],["beacon",7.75],["end_crystal",5.07],["trial_key",6.47],["dragon_breath",1.81],["dragon_egg",1.32]],
  [["netherite_scrap",10.73],["breeze_rod",12.44],["music_disc_relic",12.59],["music_disc_creator",13.1],["ominous_trial_key",8.54],["dragon_breath",10.19],["dragon_egg",12.51],["enchanted_apple",13.22],["end_crystal",6.68]]
]
const nav = [['upgrade', Gem], ['cases', Gift], ['inventory', Boxes], ['profile', UserRound], ['arcade', Gamepad2], ['settings', Settings2]]

const labels = {
  ru: {
    upgrade: 'Апгрейдер', cases: 'Кейсы', inventory: 'Инвентарь', profile: 'Профиль', settings: 'Настройки', arcade: 'Аркада',
    head: 'НЕ ПРОСТО УДАЧА.', sub: 'Твоя коллекция. Твой риск. Твой следующий апгрейд.',
    explore: 'Посмотреть кейсы', demo: 'В разработке', hello: '150 предметов · 21 кейс · игровой инвентарь',
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
    upgrade: 'Апгрейдер', cases: 'Кейси', inventory: 'Інвентар', profile: 'Профіль', settings: 'Налаштування', arcade: 'Аркада',
    head: 'НЕ ПРОСТО УДАЧА.', sub: 'Твоя колекція. Твій ризик. Твій наступний апгрейд.',
    explore: 'Переглянути кейси', demo: 'У розробці', hello: '150 предметів · 21 кейс · ігровий інвентар',
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
    upgrade: 'Upgrader', cases: 'Cases', inventory: 'Inventory', profile: 'Profile', settings: 'Settings', arcade: 'Arcade',
    head: 'MORE THAN LUCK.', sub: 'Your collection. Your risk. Your next upgrade.',
    explore: 'Explore cases', demo: 'In development', hello: '150 items · 21 cases · Minecraft collection',
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


// Upgrade 10.1: the cursor is a single GPU-composited transform.
// Probability and final angle share ONE random number: [0, chance) = success.
// No React setState calls occur on animation frames.
function UpgradeWheel({ chance, spinning, spinPlan, caption, winLabel, loseLabel }) {
  const needle = useRef(null)
  const angle = useRef(0)
  React.useLayoutEffect(() => {
    if (!spinPlan || !needle.current) return
    const el = needle.current
    const start = angle.current
    const normalized = ((start % 360) + 360) % 360
    const delta = ((spinPlan.finalAngle - normalized) + 360) % 360
    const end = start + 360 * 7 + delta
    angle.current = end
    const from = `rotate(${start}deg)`
    const to = `rotate(${end}deg)`
    el.style.transform = from
    if (typeof el.animate !== 'function') {
      // Fallback for older browsers; Chrome/Firefox use WAAPI above.
      el.style.transition = `transform ${spinPlan.duration}ms cubic-bezier(.32,0,.12,1)`
      requestAnimationFrame(() => { el.style.transform = to })
      return () => { el.style.transition = 'none'; el.style.transform = to }
    }
    const anim = el.animate(
      [{ transform: from }, { transform: to }],
      { duration: spinPlan.duration, easing: 'cubic-bezier(.32, 0, .12, 1)', fill: 'forwards' }
    )
    anim.onfinish = () => {
      el.style.transform = to
      anim.cancel()
      spinPlan.onFinished?.()
    }
    return () => {
      anim.onfinish = null
      el.style.transform = to
      anim.cancel()
    }
  }, [spinPlan?.id])
  return <div className="upWheelShell" aria-label={`${caption}: ${chance.toFixed(2)}%`}>
    <div className={'upWheel upWheelV10' + (spinning ? ' upgradeWheelLive' : '')} style={{ '--pct': `${chance}%` }}>
      <div className="upWheelRingInsets" aria-hidden="true" />
      <div className="upWheelCore">
        <strong>{chance.toFixed(2)}%</strong>
        <span>{caption}</span>
        <small>{spinning ? '● LIVE' : 'UPGRADE'}</small>
      </div>
      <div className="upNeedle" ref={needle} aria-hidden="true">
        <div className="upNeedleBody" />
        <div className="upNeedleTip" />
        <div className="upNeedlePivot" />
      </div>
    </div>
    <div className="upWheelLegend" aria-hidden="true"><span><i className="upLegendWin" />{winLabel}</span><span><i className="upLegendLose" />{loseLabel}</span></div>
  </div>
}

function upgradeSound(kind,volume=0.55) {
  try {
    const Audio = window.AudioContext || window.webkitAudioContext
    if (!Audio) return
    const ctx = new Audio()
    const notes = kind === 'start' ? [370, 550] : kind === 'win' ? [520, 660, 850] : [410, 290]
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = kind === 'fail' ? 'triangle' : 'sine'
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.09)
      gain.gain.setValueAtTime(0.0001, ctx.currentTime + idx * 0.09)
      gain.gain.exponentialRampToValueAtTime(Math.max(.0001,0.06*volume), ctx.currentTime + idx * 0.09 + 0.012)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.09 + 0.17)
      osc.connect(gain).connect(ctx.destination)
      osc.start(ctx.currentTime + idx * 0.09)
      osc.stop(ctx.currentTime + idx * 0.09 + 0.18)
    })
    window.setTimeout(() => { void ctx.close().catch(() => {}) }, 1200)
  } catch { /* Sounds are optional, gameplay never depends on audio. */ }
}
const upgradeWheelCopy = {
  ru: { win: 'Успех', lose: 'Провал', spinning: 'СТРЕЛКА ВРАЩАЕТСЯ', duration: '5 секунд • плавное торможение', wait: 'Дождись остановки стрелки' },
  uk: { win: 'Успіх', lose: 'Невдача', spinning: 'СТРІЛКА ОБЕРТАЄТЬСЯ', duration: '5 секунд • плавне гальмування', wait: 'Дочекайся зупинки стрілки' },
  en: { win: 'Success', lose: 'Fail', spinning: 'POINTER SPINNING', duration: '5 seconds • smooth slowdown', wait: 'Wait for the pointer to stop' }
}


const polishCopy = {
 ru: { minDrop:'Минимальный дроп', averageDrop:'Средний дроп', caseEv:'Сбалансированные кейсы',
  winTitle:'ВЫ ВЫИГРАЛИ!', loseTitle:'НЕУДАЧНЫЙ АПГРЕЙД', jackpotTitle:'JACKPOT!',
  take:'ЗАБРАТЬ', sellNow:'ПРОДАТЬ', continue:'ПРОДОЛЖИТЬ', sold:'Продано',
  resultDesc:'Выбери, что сделать с предметом. Награда сохранена, пока не заберёшь или не продашь её.',
  failedDesc:'Исходный предмет потрачен. Следующую попытку можно сделать с другим предметом.',
  dontLose:'Награда сохранится даже после обновления страницы.',
  visualSettings:'Оформление', gameplaySettings:'Комфорт и эффекты', effects:'Визуальные эффекты',
  radius:'Скругление элементов', glow:'Яркость свечения', volume:'Громкость', density:'Плотность карточек',
  spacious:'Просторно', compact:'Компактно', motion:'Анимации интерфейса',
  motionFull:'Полные', motionCalm:'Спокойные', motionOff:'Без эффектов',
  rareEffects:'Эффекты JACKPOT', rareOn:'Включены', rareOff:'Выключены',
  oddsGuarantee:'Цена и шансы каждого предмета доступны до открытия. Реальные ставки отсутствуют.',
  sourceGone:'Нет предметов для апгрейда. Получи новый предмет из кейса.',
  upgradeRunLocked:'Сначала выбери доступный предмет', pending:'Заверши предыдущий результат.',
 },
 uk: { minDrop:'Мінімальний дроп', averageDrop:'Середній дроп', caseEv:'Збалансовані кейси',
  winTitle:'ТИ ВИГРАВ!', loseTitle:'НЕВДАЛИЙ АПГРЕЙД', jackpotTitle:'JACKPOT!',
  take:'ЗАБРАТИ', sellNow:'ПРОДАТИ', continue:'ПРОДОВЖИТИ', sold:'Продано',
  resultDesc:'Обери, що зробити з предметом. Нагорода збережеться, поки не забереш або не продаси її.',
  failedDesc:'Початковий предмет витрачено. Наступну спробу можна зробити з іншим предметом.',
  dontLose:'Нагорода залишиться після оновлення сторінки.',
  visualSettings:'Оформлення', gameplaySettings:'Комфорт і ефекти', effects:'Візуальні ефекти',
  radius:'Заокруглення елементів', glow:'Яскравість сяйва', volume:'Гучність', density:'Щільність карток',
  spacious:'Просторо', compact:'Компактно', motion:'Анімації інтерфейсу',
  motionFull:'Повні', motionCalm:'Спокійні', motionOff:'Без ефектів',
  rareEffects:'Ефекти JACKPOT', rareOn:'Увімкнені', rareOff:'Вимкнені',
  oddsGuarantee:'Ціна і шанс кожного предмета відомі до відкриття. Реальних ставок немає.',
  sourceGone:'Немає предметів для апгрейду. Отримай новий предмет із кейса.',
  upgradeRunLocked:'Спочатку обери доступний предмет', pending:'Заверши попередній результат.',
 },
 en: { minDrop:'Minimum drop', averageDrop:'Average drop', caseEv:'Rebalanced cases',
  winTitle:'YOU WON!', loseTitle:'UPGRADE FAILED', jackpotTitle:'JACKPOT!',
  take:'CLAIM', sellNow:'SELL', continue:'CONTINUE', sold:'Sold',
  resultDesc:'Choose what to do with your item. This reward is saved until you claim or sell it.',
  failedDesc:'The source item was consumed. Select another item to try again.',
  dontLose:'Your reward remains saved if you reload the page.',
  visualSettings:'Appearance', gameplaySettings:'Comfort and effects', effects:'Visual effects',
  radius:'Corner roundness', glow:'Glow strength', volume:'Volume', density:'Card density',
  spacious:'Spacious', compact:'Compact', motion:'Interface animations',
  motionFull:'Full', motionCalm:'Calm', motionOff:'No effects',
  rareEffects:'JACKPOT effects', rareOn:'Enabled', rareOff:'Disabled',
  oddsGuarantee:'Prices and item odds are visible before opening. No real-money gambling.',
  sourceGone:'No items left to upgrade. Get a new item from a case.',
  upgradeRunLocked:'Choose an owned item first', pending:'Please finish the previous result.',
 }
}
const detailedUI = {"ru": {"case_open": "ОТКРЫТЬ КЕЙС", "case_more": "ОТКРЫТЬ ЕЩЁ", "case_spinning": "ПРОКРУТКА...", "case_contents": "ЧТО МОЖЕТ ВЫПАСТЬ", "case_cost": "СТОИМОСТЬ ОТКРЫТИЯ", "free": "БЕСПЛАТНО", "drop_count": "Дропов", "inventory": "Инвентарь", "history": "ПОСЛЕДНИЕ ВЫПАДЕНИЯ", "filter_owned": "Показать только мои", "filter_active": "✓ Только мои предметы", "case_balance": "Баланс", "notEnough": "Недостаточно MC Coins.", "case_ev": "СРЕДНИЙ ДРОП", "cases_banner": "Экономика · демо: каждый кейс имеет собственную таблицу вероятностей. Покупки за игровые MC Coins.", "case_probability": "Фиксированные вероятности для каждого предмета."}, "uk": {"case_open": "ВІДКРИТИ КЕЙС", "case_more": "ВІДКРИТИ ЩЕ", "case_spinning": "ПРОКРУТКА...", "case_contents": "ЩО МОЖЕ ВИПАСТИ", "case_cost": "ВАРТІСТЬ ВІДКРИТТЯ", "free": "БЕЗКОШТОВНО", "drop_count": "Предметів", "inventory": "Інвентар", "history": "ОСТАННІ ВИПАДІННЯ", "filter_owned": "Показати лише мої", "filter_active": "✓ Лише мої предмети", "case_balance": "Баланс", "notEnough": "Недостатньо MC Coins.", "case_ev": "СЕРЕДНІЙ ДРОП", "cases_banner": "Економіка · демо: кожен кейс має власну таблицю шансів. Купівлі за ігрові MC Coins.", "case_probability": "Фіксовані ймовірності для кожного предмета."}, "en": {"case_open": "OPEN CASE", "case_more": "OPEN AGAIN", "case_spinning": "ROLLING...", "case_contents": "POSSIBLE DROPS", "case_cost": "OPEN PRICE", "free": "FREE", "drop_count": "Drops", "inventory": "Inventory", "history": "RECENT DROPS", "filter_owned": "Owned only", "filter_active": "✓ Owned only", "case_balance": "Balance", "notEnough": "Not enough MC Coins.", "case_ev": "AVERAGE DROP", "cases_banner": "Economy · demo: each case has its own drop table. Virtual MC Coins only.", "case_probability": "Fixed, disclosed probability for each item."}}
const languageOptions = [["ru","Русский","🇷🇺"],["uk","Українська","🇺🇦"],["en","English","🇬🇧"],["de","Deutsch","🇩🇪"],["pl","Polski","🇵🇱"],["fr","Français","🇫🇷"],["es","Español","🇪🇸"],["pt","Português","🇵🇹"],["it","Italiano","🇮🇹"],["tr","Türkçe","🇹🇷"],["cs","Čeština","🇨🇿"],["ja","日本語","🇯🇵"],["ko","한국어","🇰🇷"],["zh","中文","🇨🇳"]]
const localeExtras = {
  "de": {
    "upgrade": "Upgrader",
    "cases": "Kisten",
    "inventory": "Inventar",
    "profile": "Profil",
    "settings": "Einstellungen",
    "arcade": "Arcade",
    "head": "MEHR ALS GLÜCK.",
    "sub": "Deine Sammlung. Dein Risiko. Dein nächstes Upgrade.",
    "explore": "Kisten ansehen",
    "demo": "In Entwicklung",
    "catalog": "KISTENKATALOG",
    "balance": "Guthaben",
    "guest": "Gastmodus",
    "lang": "Sprache",
    "theme": "Design",
    "accent": "Akzentfarbe",
    "sound": "Sound",
    "take": "Sammeln",
    "sell": "Verkaufen",
    "play": "Spielen",
    "start": "Start",
    "best": "Beste Punktzahl",
    "gameOver": "Spiel beenden"
  },
  "pl": {
    "upgrade": "Ulepszanie",
    "cases": "Skrzynki",
    "inventory": "Ekwipunek",
    "profile": "Profil",
    "settings": "Ustawienia",
    "arcade": "Salon gier",
    "head": "WIĘCEJ NIŻ SZCZĘŚCIE.",
    "sub": "Twoja kolekcja. Twoje ryzyko. Twój upgrade.",
    "explore": "Zobacz skrzynki",
    "demo": "W przygotowaniu",
    "catalog": "KATALOG SKRZYNEK",
    "balance": "Saldo",
    "guest": "Tryb gościa",
    "lang": "Język",
    "theme": "Motyw",
    "accent": "Kolor akcentu",
    "sound": "Dźwięk",
    "take": "Odbierz",
    "sell": "Sprzedaj",
    "play": "Graj",
    "start": "Start",
    "best": "Rekord",
    "gameOver": "Koniec gry"
  },
  "fr": {
    "upgrade": "Amélioration",
    "cases": "Caisses",
    "inventory": "Inventaire",
    "profile": "Profil",
    "settings": "Paramètres",
    "arcade": "Arcade",
    "head": "PLUS QUE DE LA CHANCE.",
    "sub": "Ta collection. Ton risque. Ta prochaine amélioration.",
    "explore": "Voir les caisses",
    "demo": "En développement",
    "catalog": "CATALOGUE DES CAISSES",
    "balance": "Solde",
    "guest": "Mode invité",
    "lang": "Langue",
    "theme": "Thème",
    "accent": "Couleur",
    "sound": "Son",
    "take": "Récupérer",
    "sell": "Vendre",
    "play": "Jouer",
    "start": "Démarrer",
    "best": "Meilleur score",
    "gameOver": "Partie terminée"
  },
  "es": {
    "upgrade": "Mejoras",
    "cases": "Cajas",
    "inventory": "Inventario",
    "profile": "Perfil",
    "settings": "Ajustes",
    "arcade": "Arcade",
    "head": "MÁS QUE SUERTE.",
    "sub": "Tu colección. Tu riesgo. Tu próxima mejora.",
    "explore": "Ver cajas",
    "demo": "En desarrollo",
    "catalog": "CATÁLOGO DE CAJAS",
    "balance": "Saldo",
    "guest": "Modo invitado",
    "lang": "Idioma",
    "theme": "Tema",
    "accent": "Color",
    "sound": "Sonido",
    "take": "Reclamar",
    "sell": "Vender",
    "play": "Jugar",
    "start": "Empezar",
    "best": "Récord",
    "gameOver": "Juego terminado"
  },
  "pt": {
    "upgrade": "Melhorias",
    "cases": "Caixas",
    "inventory": "Inventário",
    "profile": "Perfil",
    "settings": "Definições",
    "arcade": "Arcade",
    "head": "MAIS DO QUE SORTE.",
    "sub": "A tua coleção. O teu risco. A próxima melhoria.",
    "explore": "Ver caixas",
    "demo": "Em desenvolvimento",
    "catalog": "CATÁLOGO DE CAIXAS",
    "balance": "Saldo",
    "guest": "Modo convidado",
    "lang": "Idioma",
    "theme": "Tema",
    "accent": "Cor",
    "sound": "Som",
    "take": "Receber",
    "sell": "Vender",
    "play": "Jogar",
    "start": "Começar",
    "best": "Recorde",
    "gameOver": "Fim do jogo"
  },
  "it": {
    "upgrade": "Potenziamenti",
    "cases": "Casse",
    "inventory": "Inventario",
    "profile": "Profilo",
    "settings": "Impostazioni",
    "arcade": "Arcade",
    "head": "PIÙ CHE FORTUNA.",
    "sub": "La tua collezione. Il tuo rischio. Il tuo potenziamento.",
    "explore": "Mostra casse",
    "demo": "In sviluppo",
    "catalog": "CATALOGO CASSE",
    "balance": "Saldo",
    "guest": "Ospite",
    "lang": "Lingua",
    "theme": "Tema",
    "accent": "Colore",
    "sound": "Audio",
    "take": "Riscatta",
    "sell": "Vendi",
    "play": "Gioca",
    "start": "Inizia",
    "best": "Record",
    "gameOver": "Partita finita"
  },
  "tr": {
    "upgrade": "Yükseltme",
    "cases": "Kasalar",
    "inventory": "Envanter",
    "profile": "Profil",
    "settings": "Ayarlar",
    "arcade": "Arcade",
    "head": "ŞANSTAN DA FAZLASI.",
    "sub": "Koleksiyonun. Riskin. Sonraki yükseltmen.",
    "explore": "Kasaları gör",
    "demo": "Geliştiriliyor",
    "catalog": "KASA KATALOĞU",
    "balance": "Bakiye",
    "guest": "Misafir modu",
    "lang": "Dil",
    "theme": "Tema",
    "accent": "Vurgu rengi",
    "sound": "Ses",
    "take": "Al",
    "sell": "Sat",
    "play": "Oyna",
    "start": "Başlat",
    "best": "Rekor",
    "gameOver": "Oyun bitti"
  },
  "cs": {
    "upgrade": "Vylepšování",
    "cases": "Bedny",
    "inventory": "Inventář",
    "profile": "Profil",
    "settings": "Nastavení",
    "arcade": "Arkádové hry",
    "head": "VÍC NEŽ ŠTĚSTÍ.",
    "sub": "Tvá sbírka. Tvé riziko. Tvé další vylepšení.",
    "explore": "Zobrazit bedny",
    "demo": "Ve vývoji",
    "catalog": "KATALOG BEDEN",
    "balance": "Zůstatek",
    "guest": "Režim hosta",
    "lang": "Jazyk",
    "theme": "Motiv",
    "accent": "Barva",
    "sound": "Zvuk",
    "take": "Vyzvednout",
    "sell": "Prodat",
    "play": "Hrát",
    "start": "Start",
    "best": "Rekord",
    "gameOver": "Konec hry"
  },
  "ja": {
    "upgrade": "アップグレード",
    "cases": "ケース",
    "inventory": "インベントリ",
    "profile": "プロフィール",
    "settings": "設定",
    "arcade": "アーケード",
    "head": "運だけじゃない。",
    "sub": "コレクションとリスク、次のアップグレード。",
    "explore": "ケースを見る",
    "demo": "開発中",
    "catalog": "ケース一覧",
    "balance": "残高",
    "guest": "ゲストモード",
    "lang": "言語",
    "theme": "テーマ",
    "accent": "アクセントカラー",
    "sound": "音",
    "take": "受け取る",
    "sell": "売却",
    "play": "プレイ",
    "start": "開始",
    "best": "最高記録",
    "gameOver": "終了"
  },
  "ko": {
    "upgrade": "업그레이드",
    "cases": "케이스",
    "inventory": "인벤토리",
    "profile": "프로필",
    "settings": "설정",
    "arcade": "아케이드",
    "head": "운 그 이상.",
    "sub": "나의 컬렉션, 나의 선택, 다음 업그레이드.",
    "explore": "케이스 보기",
    "demo": "개발 중",
    "catalog": "케이스 목록",
    "balance": "잔액",
    "guest": "게스트 모드",
    "lang": "언어",
    "theme": "테마",
    "accent": "강조 색상",
    "sound": "소리",
    "take": "받기",
    "sell": "판매",
    "play": "게임",
    "start": "시작",
    "best": "최고 점수",
    "gameOver": "게임 종료"
  },
  "zh": {
    "upgrade": "升级",
    "cases": "宝箱",
    "inventory": "库存",
    "profile": "个人资料",
    "settings": "设置",
    "arcade": "街机",
    "head": "不止是运气。",
    "sub": "你的收藏，你的选择，你的下一次升级。",
    "explore": "查看宝箱",
    "demo": "开发中",
    "catalog": "宝箱目录",
    "balance": "余额",
    "guest": "访客模式",
    "lang": "语言",
    "theme": "主题",
    "accent": "强调色",
    "sound": "声音",
    "take": "领取",
    "sell": "出售",
    "play": "开始游戏",
    "start": "开始",
    "best": "最高纪录",
    "gameOver": "游戏结束"
  }
}

const MATCH_ITEMS = ['diamond','emerald','coal','iron','redstone','gold','amethyst_shard','ender_pearl','blaze_rod','netherite','prismarine_shard','totem','lapis','golden_apple','copper_ingot','diamond_sword','trident','wind_charge','nether_star','enchanted_book'];
const MATCH_REWARD_ITEMS = ['coal','raw_iron','lapis','copper_ingot','redstone','amethyst_shard','iron'];
function shuffleCards(list){
 const out=[...list];
 for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]]}
 return out;
}
function ItemMatchArcade({lang='ru',onComplete}){
 const phrases={
 ru:{title:'ПАРНЫЙ ДРОП',subtitle:'Найди 8 пар предметов Minecraft за 75 секунд. Карточки открываются по две — запоминай расположение и собирай коллекцию.',start:'НАЧАТЬ ИГРУ',again:'ИГРАТЬ ЕЩЁ',time:'ВРЕМЯ',moves:'ХОДЫ',matched:'НАЙДЕНО',best:'РЕКОРД',won:'КОЛЛЕКЦИЯ СОБРАНА',lost:'ВРЕМЯ ВЫШЛО',idle:'Готов к поиску?',hint:'Переворачивай карточки и находи два одинаковых предмета. Победа — все 8 пар до конца времени.',reward:'Награда дня',taken:'Сегодняшняя награда уже получена',free:'Первая победа дня даёт один небольшой предмет в инвентарь. Без реальных денег и рекламы.',noPrize:'Сегодняшний бонус уже получен. Играть на рекорд можно сколько угодно.'},
 uk:{title:'ПАРНИЙ ДРОП',subtitle:'Знайди 8 пар предметів Minecraft за 75 секунд. Відкривай дві картки та запам’ятовуй розташування.',start:'ПОЧАТИ ГРУ',again:'ГРАТИ ЩЕ',time:'ЧАС',moves:'ХОДИ',matched:'ЗНАЙДЕНО',best:'РЕКОРД',won:'КОЛЕКЦІЮ ЗІБРАНО',lost:'ЧАС ВИЙШОВ',idle:'Готовий до пошуку?',hint:'Знаходь дві однакові речі. Перемога — всі 8 пар до завершення часу.',reward:'Нагорода дня',taken:'Сьогодні нагороду вже отримано',free:'Перша перемога дня дає один недорогий предмет до інвентарю. Без реальних грошей і реклами.',noPrize:'Сьогодні бонус уже отримано. Грай на рекорд скільки завгодно.'},
 en:{title:'ITEM MATCH',subtitle:'Find 8 matching Minecraft item pairs in 75 seconds. Flip two cards at a time and remember their positions.',start:'START GAME',again:'PLAY AGAIN',time:'TIME',moves:'MOVES',matched:'MATCHED',best:'BEST SCORE',won:'COLLECTION COMPLETE',lost:'TIME IS UP',idle:'Ready to play?',hint:'Find two identical items. Match all 8 pairs before the countdown reaches zero.',reward:'Daily drop',taken:'Daily reward already claimed',free:'Your first win each day adds one small item to your demo inventory. No real money or ads.',noPrize:'You already claimed today’s bonus. Keep playing for a high score.'}
 };
 const t=phrases[lang]||phrases.en;
 const [phase,setPhase]=React.useState('idle');
 const [deck,setDeck]=React.useState([]);
 const [faceUp,setFaceUp]=React.useState([]);
 const [matched,setMatched]=React.useState([]);
 const [moves,setMoves]=React.useState(0);
 const [time,setTime]=React.useState(75);
 const [score,setScore]=React.useState(0);
 const [best,setBest]=React.useState(()=>Math.max(0,Number(stored('voxup-match-best',0))||0));
 const [prize,setPrize]=React.useState(null);
 const phaseRef=React.useRef('idle'),faceRef=React.useRef([]),matchRef=React.useRef(new Set()),busyRef=React.useRef(false),countRef=React.useRef(0),deadlineRef=React.useRef(0),timeouts=React.useRef([]);
 React.useEffect(()=>()=>{timeouts.current.forEach(clearTimeout);timeouts.current=[]},[]);
 React.useEffect(()=>{
  if(phase!=='playing')return;
  const interval=window.setInterval(()=>{
   const left=Math.max(0,Math.ceil((deadlineRef.current-Date.now())/1000));setTime(left);
   if(!left){phaseRef.current='lost';setPhase('lost');busyRef.current=true;timeouts.current.forEach(clearTimeout);timeouts.current=[]}
  },180);
  return()=>clearInterval(interval);
 },[phase]);
 function begin(){
  timeouts.current.forEach(clearTimeout);timeouts.current=[];
  const picks=shuffleCards(MATCH_ITEMS).slice(0,8);
  const cards=shuffleCards([...picks,...picks].map((id,i)=>({id,uid:i})));
  setDeck(cards);setFaceUp([]);setMatched([]);setMoves(0);setScore(0);setTime(75);setPrize(null);
  faceRef.current=[];matchRef.current=new Set();busyRef.current=false;countRef.current=0;
  deadlineRef.current=Date.now()+75000;phaseRef.current='playing';setPhase('playing');
 }
 function flip(i){
  if(phaseRef.current!=='playing'||busyRef.current||faceRef.current.includes(i)||matchRef.current.has(i)||!deck[i])return;
  const next=[...faceRef.current,i];faceRef.current=next;setFaceUp(next);
  if(next.length!==2)return;
  busyRef.current=true;const [a,b]=next;setMoves(n=>n+1);countRef.current++;
  const same=deck[a].id===deck[b].id;
  const timer=window.setTimeout(()=>{
   if(phaseRef.current!=='playing')return;
   if(same){matchRef.current.add(a);matchRef.current.add(b);setMatched([...matchRef.current]);}
   faceRef.current=[];setFaceUp([]);busyRef.current=false;
   if(same&&matchRef.current.size===16){
    phaseRef.current='won';setPhase('won');busyRef.current=true;
    const remaining=Math.max(0,Math.ceil((deadlineRef.current-Date.now())/1000));
    const finalScore=Math.max(100,1000+remaining*10-Math.max(0,countRef.current-8)*45);
    setScore(finalScore);
    if(finalScore>best){setBest(finalScore);try{localStorage.setItem('voxup-match-best',JSON.stringify(finalScore))}catch{}}
    const earned=onComplete?.();setPrize(earned||null);
   }
  },same?320:700);
  timeouts.current.push(timer);
 }
 const complete=matched.length/2;
 return <section className="matchArena" aria-label={t.title}>
  <div className="matchHero"><div><div className="eyebrow">VOXUP / ITEM-BASED ARCADE</div><h2>{t.title}</h2><p>{t.subtitle}</p><div className="matchPill">✦ {t.free}</div></div><div className="matchHeroArt"><img src={textureSource('diamond')} alt=""/><img src={textureSource('emerald')} alt=""/><img src={textureSource('nether_star')} alt=""/></div></div>
  <div className="matchCounters"><div><small>{t.time}</small><strong>{time}<em>s</em></strong></div><div><small>{t.moves}</small><strong>{moves}</strong></div><div><small>{t.matched}</small><strong>{complete}<em>/8</em></strong></div><div><small>{t.best}</small><strong>{best}</strong></div></div>
  <div className="matchLayout"><div className="matchBoard">{Array.from({length:16},(_,i)=>{
   const card=deck[i],revealed=faceUp.includes(i)||matched.includes(i);
   return <button key={card?.uid??i} type="button" className={'matchCard '+(revealed?'flipped ':'')+(matched.includes(i)?'matched ':'')} onClick={()=>flip(i)} disabled={phase!=='playing'||matched.includes(i)} aria-label={revealed&&card?getItem(card.id).name:'Скрытая карточка '+(i+1)}>
    <span className="matchCardInner"><span className="matchCardBack"><Gem size={25}/><small>VOXUP</small></span><span className="matchCardFront">{card&&<><img src={textureSource(card.id)} alt="" draggable="false"/><small>{getItem(card.id).name}</small></>}</span></span>
   </button>
  })}</div><aside className="matchSide"><div className="matchSideHead"><div className="eyebrow">SKIN MEMORY / 08 PAIRS</div><h3>{phase==='won'?t.won:phase==='lost'?t.lost:t.idle}</h3><p>{phase==='won'?(prize?.awarded?`${t.reward}: ${getItem(prize.id).name}`:t.noPrize):t.hint}</p></div>
   <div className="matchRewardArt"><img src={textureSource(prize?.id||'diamond')} alt=""/><div><strong>{prize?.awarded?getItem(prize.id).name:t.reward}</strong><small>{prize?.awarded?`${getItem(prize.id).value} MC · ${t.reward}`:t.free}</small></div></div>
   <button className="primary matchStart" onClick={begin}><Gamepad2 size={18}/>{phase==='idle'?t.start:t.again}</button><p className="matchFootnote">{t.taken}: {stored('voxup-match-last-reward-day','')===new Date().toLocaleDateString('sv-SE')?'✓':'—'}</p>
  </aside></div>
 </section>
}

function AdminConsole({coins,onCoins,onItem,audit,onLock,blocked=false,lang='ru'}){
 const [amount,setAmount]=React.useState('10000');const [itemId,setItemId]=React.useState('diamond');const [qty,setQty]=React.useState('1');const [feedback,setFeedback]=React.useState('');
 const ru=lang==='ru',uk=lang==='uk';
 const txt=(r,u,e)=>ru?r:uk?u:e;
 function grantCoins(mode){const n=Number(amount);if(!Number.isSafeInteger(n)||n<1||n>1e8){setFeedback(txt('Введите целое число от 1 до 100 000 000','Введіть ціле число від 1 до 100 000 000','Enter an integer from 1 to 100,000,000'));return}if(blocked){setFeedback(txt('Заверши текущую игру/выигрыш','Заверши поточну гру/виграш','Finish the current reward first'));return}onCoins(n,mode);setFeedback(txt('Тестовая операция выполнена','Тестову операцію виконано','Local test balance updated'))}
 function grantItem(){const n=Number(qty);if(!Number.isSafeInteger(n)||n<1||n>100){setFeedback(txt('Количество: от 1 до 100','Кількість: від 1 до 100','Quantity: 1–100'));return}if(blocked){setFeedback(txt('Заверши текущий выигрыш','Заверши поточний виграш','Finish the pending reward'));return}onItem(itemId,n);setFeedback(txt('Предметы добавлены в локальный инвентарь','Предмети додано до локального інвентарю','Items added to local inventory'))}
 return <section className="adminStudio"><div className="adminIntro"><div><div className="eyebrow">VOXUP LAB / LOCAL TEST ONLY</div><h2>{txt('Панель администратора','Панель адміністратора','Admin laboratory')}</h2><p>{txt('Здесь можно тестировать баланс и предметы именно в своём браузере. Код 1764 не защищает настоящую серверную валюту: для публичного сайта потребуется серверная авторизация.','Тут можна тестувати баланс і предмети лише у своєму браузері. Код 1764 не захищає серверну валюту.','This only changes the current browser’s local demo. Code 1764 does not secure real server balances.')}</p></div><button className="secondaryBtn" onClick={onLock}><LockKeyhole size={16}/>{txt('Закрыть панель','Закрити панель','Lock panel')}</button></div>
 <div className="adminBalance"><Coins size={26}/><div><small>{txt('Текущий локальный баланс','Поточний локальний баланс','Current local balance')}</small><strong>{formatCoins(coins)} <em>MC</em></strong></div><span>DEMO · NOT SERVER VERIFIED</span></div>
 <div className="adminGrid"><section className="adminCard"><div className="eyebrow">01 / MC COINS</div><h3>{txt('Выдать монеты','Видати монети','Grant coins')}</h3><label htmlFor="admin-coins">{txt('Количество MC','Кількість MC','Amount MC')}</label><input id="admin-coins" type="number" min="1" max="100000000" value={amount} onChange={e=>setAmount(e.target.value)} /><div className="adminPresets">{[1000,10000,50000,100000].map(n=><button key={n} onClick={()=>setAmount(String(n))}>+{formatCoins(n)}</button>)}</div><div className="adminActions"><button className="primary" onClick={()=>grantCoins('add')}><Coins size={16}/>{txt('Начислить','Нарахувати','Add')}</button><button className="secondaryBtn" onClick={()=>grantCoins('subtract')}>{txt('Списать','Списати','Subtract')}</button></div></section>
 <section className="adminCard"><div className="eyebrow">02 / ITEMS</div><h3>{txt('Выдать предметы','Видати предмети','Grant items')}</h3><label htmlFor="admin-item">{txt('Предмет из каталога','Предмет з каталогу','Catalogue item')}</label><select id="admin-item" value={itemId} onChange={e=>setItemId(e.target.value)}>{previewItems.map(i=><option key={i.id} value={i.id}>{i.name} — {formatCoins(i.value)} MC</option>)}</select><div className="adminChosen"><img src={textureSource(itemId)} alt=""/><span>{getItem(itemId).name}</span><small>{getItem(itemId).rarity}</small></div><label htmlFor="admin-qty">{txt('Количество','Кількість','Quantity')}</label><input id="admin-qty" type="number" min="1" max="100" value={qty} onChange={e=>setQty(e.target.value)}/><button className="primary" onClick={grantItem}><Gift size={16}/>{txt('Добавить в инвентарь','Додати до інвентарю','Grant item')}</button></section></div>
 <div className="adminLogs"><h3>{txt('История тестовых выдач','Історія тестових видач','Local activity log')}</h3>{audit.length?<div className="adminLogList">{audit.map(a=><div key={a.id}><span>{a.label}</span><small>{a.when}</small></div>)}</div>:<p>{txt('Пока операций нет','Операцій ще немає','No local actions yet')}</p>}</div>{feedback&&<div className="adminFeedback" role="status">{feedback}</div>}
 </section>
}

export default function App() {
  const [page, setPage] = useState('upgrade')
  const [lang, setLang] = useState(() => stored('mineup-language', 'ru'))
  const [theme, setTheme] = useState(() => stored('mineup-theme', 'gold'))
  const [accent, setAccent] = useState(() => stored('mineup-accent', 'amber'))
  const [sound, setSound] = useState(() => stored('mineup-sound', 'off'))
  const [volume, setVolume] = useState(() => clamp(Number(stored('voxup-volume', 55)),0,100))
  const [radius, setRadius] = useState(() => clamp(Number(stored('voxup-radius', 12)),4,24))
  const [glow, setGlow] = useState(() => clamp(Number(stored('voxup-glow', 70)),0,100))
  const [density, setDensity] = useState(() => stored('voxup-density', 'spacious'))
  const [motion, setMotion] = useState(() => stored('voxup-motion', 'full'))
  const [jackpotFx, setJackpotFx] = useState(() => stored('voxup-jackpot-fx', 'on'))
  const [pendingReward, setPendingReward] = useState(() => stored('mineup-pending-reward',null))
  const [menu, setMenu] = useState(false)
  const [activeCase, setActiveCase] = useState(null)
  const [adminUnlocked,setAdminUnlocked]=useState(false)
  const [adminLoginOpen,setAdminLoginOpen]=useState(false)
  const [adminCode,setAdminCode]=useState('')
  const [adminError,setAdminError]=useState('')
  const [adminAudit,setAdminAudit]=useState(()=>stored('voxup-admin-audit',[]))

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
  const [upgradeSpinPlan,setUpgradeSpinPlan]=useState(null)
  const spinSerial=useRef(0)
  const [backupMessage,setBackupMessage]=useState('')
  const busyGuard=useRef(false)
  const resolveGuard=useRef(false)
  const upgradeTimer=useRef(null)
  const backupInput=useRef(null)
  const reelTrack = useRef(null)
  const reelWindow = useRef(null)
  const reelAnimation = useRef(null)
  const rollingGuard = useRef(false)
  const WINNER_INDEX = 43
  const SPIN_TIME = 5000

  const t = lang in labels ? labels[lang] : {...labels.en,...localeExtras[lang]}
  const L = detailedUI[lang] || detailedUI.en
  const caseTitle = (idx) => ['ru','uk'].includes(lang) ? cases[idx][1] : cases[idx][0]
  const pc = polishCopy[lang] || polishCopy.en
  const uc = chanceCopy[lang] || chanceCopy.en
  const ex = extraCopy[lang] || extraCopy.en
  const wc = upgradeWheelCopy[lang] || upgradeWheelCopy.en
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
  const currentSourceOwned = (Number(inventory[source.id]) || 0) > 0
  const displayClaim = pendingReward && !upgradeBusy && !caseRolling
  const pendingItem = pendingReward?.itemId && itemMap[pendingReward.itemId] ? getItem(pendingReward.itemId) : null
  useEffect(()=>()=>{if(upgradeTimer.current)clearTimeout(upgradeTimer.current)},[])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.dataset.accent = accent
    document.documentElement.lang = lang
    document.documentElement.dataset.density=density
    document.documentElement.dataset.motion=motion
    document.documentElement.dataset.fx=jackpotFx
    document.documentElement.style.setProperty('--vox-radius', `${radius}px`)
    document.documentElement.style.setProperty('--vox-glow',String(glow/100))
    document.documentElement.style.setProperty('--vox-glow-alpha',String(.18*glow/100))
    document.documentElement.style.setProperty('--vox-blur-size',`${Math.round(38*glow/100)}px`)
    try {
      localStorage.setItem('mineup-theme', JSON.stringify(theme))
      localStorage.setItem('mineup-language', JSON.stringify(lang))
      localStorage.setItem('mineup-accent', JSON.stringify(accent))
      localStorage.setItem('mineup-sound', JSON.stringify(sound))
      localStorage.setItem('voxup-volume',JSON.stringify(volume))
      localStorage.setItem('voxup-radius',JSON.stringify(radius))
      localStorage.setItem('voxup-glow',JSON.stringify(glow))
      localStorage.setItem('voxup-density',JSON.stringify(density))
      localStorage.setItem('voxup-motion',JSON.stringify(motion))
      localStorage.setItem('voxup-jackpot-fx',JSON.stringify(jackpotFx))
    } catch {}
  }, [theme, lang, accent, sound, volume, radius, glow, density, motion, jackpotFx])

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

  useEffect(()=>{try{localStorage.setItem('voxup-admin-audit',JSON.stringify(adminAudit.slice(0,30)))}catch{}},[adminAudit])

  useEffect(() => {
    try {
      if(pendingReward) localStorage.setItem('mineup-pending-reward',JSON.stringify(pendingReward))
      else localStorage.removeItem('mineup-pending-reward')
    } catch {}
  },[pendingReward])

  useEffect(() => {
    if(upgradeBusy || pendingReward || rollingGuard.current) return
    if((inventory[sourceId] || 0) > 0) return
    const candidates = previewItems.filter(item => (inventory[item.id]||0)>0 && item.value<Math.max(...previewItems.map(item=>item.value)))
    if(!candidates.length) return
    const current=getItem(sourceId)
    const next=candidates.reduce((best,item)=>Math.abs(item.value-current.value)<Math.abs(best.value-current.value)?item:best,candidates[0])
    setSourceId(next.id)
    if(getItem(targetId).value<=next.value) {
      const nextTarget=findNearestTarget(next.value,multiplier)
      if(nextTarget)setTargetId(nextTarget.id)
    }
  },[inventory,sourceId,upgradeBusy,pendingReward])


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
    if (!validTarget || busyGuard.current || pendingReward || rollingGuard.current) return
    const count = Number(inventory[source.id]) || 0
    if (count < 1) {
      setResult({ type:'error', text:lang==='en'?'You do not own this item.':lang==='uk'?'У тебе немає цього предмета.':'У тебя нет этого предмета.' })
      return
    }
    // The position under the pointer and the result use the very same roll.
    // The green sector begins at 0 degrees (12 o'clock), clockwise.
    const roll = secureRoll()
    const success = roll < chance / 100
    const finalAngle = roll * 360
    busyGuard.current = true // set synchronously: double-click cannot make two attempts
    resolveGuard.current=false
    const nextInventory = { ...inventory, [source.id]:count - 1 }
    // Successful prize stays in escrow until the player chooses CLAIM or SELL.
    const entry = { id:Date.now()+secureRoll(), ok:success, source:source.id, target:target.id, chance:chance.toFixed(2), time:new Date().toLocaleTimeString(lang==='en'?'en-US':'ru-RU',{hour:'2-digit',minute:'2-digit'}) }
    const nextHistory = [entry, ...history].slice(0, 12)
    const nextStats = { cases:stats.cases||0, upgrades:(stats.upgrades||0)+1, wins:(stats.wins||0)+(success?1:0) }
    // Commit transaction before the animation, so refresh cannot reroll/reclaim it.
    try {
      localStorage.setItem('mineup-demo-inventory', JSON.stringify(nextInventory))
      localStorage.setItem('mineup-demo-history', JSON.stringify(nextHistory))
      localStorage.setItem('mineup-demo-stats', JSON.stringify(nextStats))
    } catch {}
    setInventory(nextInventory)
    setHistory(nextHistory)
    setStats(nextStats)
    const reward={txId:`u-${Date.now()}-${Math.round(secureRoll()*1e9)}`,kind:'upgrade',outcome:success?'win':'lose',itemId:success?target.id:null,sourceId:source.id,sourceName:source.name,targetName:target.name,chance:Number(chance.toFixed(2)),createdAt:Date.now()}
    try{localStorage.setItem('mineup-pending-reward',JSON.stringify(reward))}catch{}
    setPendingReward(reward)
    setResult(null)
    setUpgradeBusy(true)
    const duration = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 450 : 5000
    const finish = () => {
      if (!busyGuard.current) return // WAAPI completion + timer fallback cannot double-finish.
      busyGuard.current = false
      if (upgradeTimer.current) window.clearTimeout(upgradeTimer.current)
      upgradeTimer.current = null
      setUpgradeBusy(false)
      setUpgradeSpinPlan(null)
      setResult(null)
      // The modal opens after wheel stops. No stale source model remains once resolved.
      if (sound === 'on') upgradeSound(success ? 'win' : 'fail',volume/100)
    }
    setUpgradeSpinPlan({ id:++spinSerial.current, finalAngle, duration, onFinished:finish })
    if (sound === 'on') upgradeSound('start',volume/100)
    if (upgradeTimer.current) window.clearTimeout(upgradeTimer.current)
    // If an animation is paused by a browser/tab, don't lock the app forever.
    upgradeTimer.current = window.setTimeout(finish, duration + 500)
  }

  function sellItem(id) {
    if (pendingReward || busyGuard.current || rollingGuard.current || !(inventory[id] > 0)) return
    const item = getItem(id)
    setInventory((prev) => ({ ...prev, [id]: prev[id] - 1 }))
    setCoins((prev) => prev + Math.floor(item.value * 0.85))
  }

  function resolveReward(action) {
    const reward=pendingReward
    if(!reward || busyGuard.current || rollingGuard.current || resolveGuard.current) return
    resolveGuard.current=true
    if(reward.outcome==='win' && itemMap[reward.itemId]) {
      if(action==='sell') {
        const sale=Math.floor(getItem(reward.itemId).value*.85)
        const nextCoins=coins+sale
        try{localStorage.setItem('mineup-demo-coins',JSON.stringify(nextCoins))}catch{}
        setCoins(nextCoins)
      } else {
        const nextInventory={...inventory,[reward.itemId]:(Number(inventory[reward.itemId])||0)+1}
        try{localStorage.setItem('mineup-demo-inventory',JSON.stringify(nextInventory))}catch{}
        setInventory(nextInventory)
      }
    }
    // Remove escrow only after applying the claim/sale. No duplicate reward on reload.
    try{localStorage.removeItem('mineup-pending-reward')}catch{}
    setPendingReward(null)
    setResult(null)
    if(reward.kind==='case') {
      setCaseRollResult(null)
      setCaseReel([])
    }
  }

  function resetDemo() {
    if(busyGuard.current || rollingGuard.current || pendingReward)return
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
    setPendingReward(null)
    setAdminAudit([])
    try{localStorage.removeItem('mineup-pending-reward');localStorage.removeItem('voxup-match-best');localStorage.removeItem('voxup-match-last-reward-day');localStorage.removeItem('voxup-admin-audit')}catch{}
  }

  function exportSave(){
    const data={format:'voxup-save',version:1,createdAt:new Date().toISOString(),coins,inventory,history,caseHistory,stats,sourceId,targetId,multiplier,lang,theme,accent,pendingReward,extras:{matchBest:stored('voxup-match-best',0),matchLastRewardDay:stored('voxup-match-last-reward-day',''),adminAudit},settings:{volume,radius,glow,density,motion,jackpotFx,sound}}
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
      if(busyGuard.current||rollingGuard.current||pendingReward)throw new Error('busy')
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
      const safePending=data.pendingReward && typeof data.pendingReward==='object' && ['case','upgrade'].includes(data.pendingReward.kind) && ['win','lose'].includes(data.pendingReward.outcome) && (data.pendingReward.outcome==='lose'||itemMap[data.pendingReward.itemId]) ? data.pendingReward : null
      const writes={'mineup-demo-coins':safeCoins,'mineup-demo-inventory':validInventory,'mineup-demo-history':safeHistory,'mineup-case-history':safeCaseHistory,'mineup-preview-source':nextSource,'mineup-preview-target':nextTarget,'mineup-preview-multiplier':nextMult,'mineup-demo-stats':nextStats,'mineup-pending-reward':safePending}
      Object.entries(writes).forEach(([key,val])=>localStorage.setItem(key,JSON.stringify(val)))
      setCoins(safeCoins);setInventory(validInventory);setHistory(safeHistory);setCaseHistory(safeCaseHistory);setStats(nextStats)
      setSourceId(nextSource);setTargetId(nextTarget);setMultiplier(nextMult)
      setPendingReward(safePending)
      if(data.extras && typeof data.extras==='object'){
        const best=Number(data.extras.matchBest)
        const safeBest=Number.isSafeInteger(best)&&best>=0&&best<=1000000?best:0
        const claimDay=String(data.extras.matchLastRewardDay||'')
        const safeDay=/^\d{4}-\d{2}-\d{2}$/.test(claimDay)?claimDay:''
        try{localStorage.setItem('voxup-match-best',JSON.stringify(safeBest));localStorage.setItem('voxup-match-last-reward-day',JSON.stringify(safeDay))}catch{}
        const safeAudit=Array.isArray(data.extras.adminAudit)?data.extras.adminAudit.slice(0,30).filter(x=>x&&typeof x==='object'&&typeof x.label==='string'&&x.label.length<150).map((x,i)=>({id:String(x.id||'import-'+i).slice(0,60),label:x.label,when:String(x.when||'').slice(0,40)})):[]
        setAdminAudit(safeAudit)
      }
      const opts=data.settings||{}
      if(Number.isFinite(Number(opts.volume)))setVolume(clamp(Number(opts.volume),0,100))
      if(Number.isFinite(Number(opts.radius)))setRadius(clamp(Number(opts.radius),4,24))
      if(Number.isFinite(Number(opts.glow)))setGlow(clamp(Number(opts.glow),0,100))
      if(['spacious','compact'].includes(opts.density))setDensity(opts.density)
      if(['full','calm','off'].includes(opts.motion))setMotion(opts.motion)
      if(['on','off'].includes(opts.jackpotFx))setJackpotFx(opts.jackpotFx)
      if(['on','off'].includes(opts.sound))setSound(opts.sound)
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
    if(activeCase===null || rollingGuard.current || busyGuard.current || pendingReward)return
    resolveGuard.current=false
    const idx=activeCase,price=cases[idx][2]
    if(coins<price){setCaseRollResult({error:true,text:L.notEnough});return}
    const pool=casePools[idx]
    const won=pickPrize(pool)
    const reel=Array.from({length:60},(_,i)=>i===WINNER_INDEX?won:pickPrize(pool))
    // Charge AND deliver synchronously at click time. Both React state and local
    // persistent state receive the same transaction before animation begins.
    const nextCoins=coins-price
    // Prize goes to persistent escrow, not directly into inventory.
    const nextHistory=[{id:Date.now()+secureRoll(),item:won,caseName:cases[idx][1],price,time:new Date().toLocaleString('ru-RU')},...caseHistory].slice(0,30)
    try{
      localStorage.setItem('mineup-demo-coins',JSON.stringify(nextCoins))
      localStorage.setItem('mineup-case-history',JSON.stringify(nextHistory))
    }catch{}
    setCoins(nextCoins)
    setCaseHistory(nextHistory)
    const nextStats={cases:(stats.cases||0)+1,upgrades:stats.upgrades||0,wins:stats.wins||0}
    try{localStorage.setItem('mineup-demo-stats',JSON.stringify(nextStats))}catch{}
    setStats(nextStats)
    const odds=pool.find(([id])=>id===won)?.[1]||0
    const reward={txId:`c-${Date.now()}-${Math.round(secureRoll()*1e9)}`,kind:'case',outcome:'win',itemId:won,caseIndex:idx,caseName:cases[idx][1],odds,price,createdAt:Date.now()}
    try{localStorage.setItem('mineup-pending-reward',JSON.stringify(reward))}catch{}
    setPendingReward(reward)
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
    let finished=false
    let fallbackTimer=null
    const complete=()=>{
      if(finished)return
      finished=true
      if(fallbackTimer!==null)window.clearTimeout(fallbackTimer)
      reelAnimation.current=null
      rollingGuard.current=false
      setCaseRolling(false)
      setCaseRollResult({id:caseReel[WINNER_INDEX]})
    }
    animation.onfinish=complete
    // Browser background tabs sometimes pause WAAPI. Avoid a stuck locked case.
    fallbackTimer=window.setTimeout(complete, SPIN_TIME+650)
    return()=>{
      animation.onfinish=null
      if(fallbackTimer!==null)window.clearTimeout(fallbackTimer)
      animation.cancel()
      if(reelAnimation.current===animation)reelAnimation.current=null
    }
  },[caseSpinId])
  function closeCase(){
    if(rollingGuard.current || pendingReward)return
    setActiveCase(null);setCaseRollResult(null);setCaseReel([])
  }

  function go(p) {
    if (busyGuard.current || pendingReward || rollingGuard.current) return
    setPage(p)
    setMenu(false)
    setActiveCase(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function appendAdminAudit(label){setAdminAudit(prev=>[{id:`a-${Date.now()}-${Math.random()}`,label,when:new Date().toLocaleString('ru-RU')},...prev].slice(0,30))}
  function changeAdminCoins(amount,mode){
    if(!adminUnlocked || busyGuard.current || rollingGuard.current || pendingReward)return;
    if(!Number.isSafeInteger(amount)||amount<1||amount>1e8)return;
    const next=clamp(coins+(mode==='subtract'?-amount:amount),0,1e12);
    try{localStorage.setItem('mineup-demo-coins',JSON.stringify(next))}catch{}
    setCoins(next);appendAdminAudit(`${mode==='subtract'?'-':'+'}${formatCoins(amount)} MC`);
  }
  function grantAdminItem(id,qty){
    if(!adminUnlocked || busyGuard.current || rollingGuard.current || pendingReward || !itemMap[id] || !Number.isSafeInteger(qty)||qty<1||qty>100)return;
    const next={...inventory,[id]:clamp((Number(inventory[id])||0)+qty,0,1e7)};
    try{localStorage.setItem('mineup-demo-inventory',JSON.stringify(next))}catch{}
    setInventory(next);appendAdminAudit(`+${qty} × ${itemMap[id].name}`);
  }
  function unlockAdmin(e){
    e?.preventDefault?.();
    if(adminCode.trim()!=='1764'){setAdminError(lang==='ru'?'Неверный код':lang==='uk'?'Неправильний код':'Wrong code');return}
    setAdminUnlocked(true);setAdminLoginOpen(false);setAdminCode('');setAdminError('');go('admin');
  }
  function awardMatchPrize(){
    const day=new Date().toLocaleDateString('sv-SE')
    if(stored('voxup-match-last-reward-day','')===day)return {awarded:false}
    const itemId=MATCH_REWARD_ITEMS[Math.floor(secureRoll()*MATCH_REWARD_ITEMS.length)]
    const next={...inventory,[itemId]:(Number(inventory[itemId])||0)+1}
    // Commit inventory and one-time claim synchronously, before UI result.
    try{localStorage.setItem('voxup-match-last-reward-day',JSON.stringify(day));localStorage.setItem('mineup-demo-inventory',JSON.stringify(next))}catch{}
    setInventory(next)
    return {awarded:true,id:itemId}
  }
  const caseFeature = ['dirt','apple','iron_pickaxe','iron_sword','gold','redstone','diamond_sword','blaze_rod','netherite','dragon_egg','enchanted_apple','wheat','bow','compass','crossbow','golden_helmet','prismarine_shard','netherite_sword','mace','wind_charge','music_disc_creator']
  const caseDisplayOrder = cases.map((_,i)=>i).sort((a,b)=>cases[a][2]-cases[b][2] || a-b)
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
          <span>VOX<span className="brandAccent">UP</span><small>ITEM UPGRADE PLATFORM</small></span>
        </button>
        <div className="navCaption">PLATFORM / 01</div>
        <div className="navItems">
          {(adminUnlocked?[...nav,['admin',ShieldCheck]]:nav).map(([id, Icon]) => (
            <button key={id} className={'navItem ' + (page === id ? 'active' : '')} onClick={() => go(id)}>
              <Icon size={19} /><span>{id==='admin'?'LAB / ADMIN':t[id]}</span>{id === 'cases' && <small>{cases.length}</small>}
            </button>
          ))}
        </div>
        <div className="sideBottom">
          <div className="online"><span className="onlineDot" />{t.demo}</div>
          <div className="stage">VOXUP <strong>ALPHA 0.8</strong><div className="stageBar"><i style={{ width: '34%' }} /></div><span>{t.ready}</span></div>
        </div>
      </aside>
      {menu && <div className="overlay" onClick={() => setMenu(false)} />}

      <div className="shell">
        <header className="top">
          <div className="topLeft"><button className="mobileMenu" onClick={() => setMenu((v) => !v)} aria-label="menu">{menu ? <X size={22} /> : <Menu size={22} />}</button><span className="crumb">VOXUP</span><ChevronRight size={13} /><span>{t[page]}</span></div>
          <div className="topRight">
            <div className="topBalance"><Coins size={17} /><span>{formatCoins(coins)} <em>MC</em></span><small>{t.demo}</small></div>
            <button className="account" onClick={() => go('profile')}><UserRound size={17} /><span>{t.guest}</span></button>
          </div>
        </header>

        <main className="main">
          {page === 'upgrade' && (
            <>
              <div className="eyebrow"><span className="dot" /> VOXUP PROJECT — ALPHA 0.8</div>
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
                  <div><div className="eyebrow">STAGE 12 / UPGRADE ARENA</div><h2>{uc.title}</h2><p>{uc.desc}</p></div>
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
                    {currentSourceOwned || upgradeBusy ? <VoxelViewer id={source.id} label={source.name} textureSource={textureSource} blockIds={blockIds} /> : <div className="emptySourceSlot"><Boxes size={39}/><span>{pc.sourceGone}</span></div>}
                    <strong>{source.name}</strong>
                    <span className="upValue">{formatCoins(source.value)} MC</span>
                    <small className="ownedMark">{t.sourceOwned}: <b>{inventory[source.id] || 0}</b></small>
                  </div>
                  <div className="upChance">
                    <UpgradeWheel chance={chance} spinning={upgradeBusy} spinPlan={upgradeSpinPlan} caption={uc.chance} winLabel={wc.win} loseLabel={wc.lose} />
                    <small className="wheelInfo">{upgradeBusy ? wc.spinning : uc.formula}</small>
                    <button className="upgradeRun" onClick={runUpgrade} disabled={upgradeBusy || Boolean(pendingReward) || (inventory[source.id] || 0) < 1 || !validTarget}><Swords size={16} /> {upgradeBusy ? wc.spinning : uc.run}</button>
                    <div className="upSpinTiming">{upgradeBusy ? <span className="upSpinBar" style={{'--duration':`${upgradeSpinPlan?.duration||5000}ms`}}/> : null}<span>{upgradeBusy ? wc.wait : wc.duration}</span></div>
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

                {result?.type==='error' && <div className="resultBanner error" role="status">{result.text}</div>}

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

              <section className="discoverSection">
                <div className="discoverHeading"><div><div className="eyebrow">DISCOVER / VOXUP EXPERIENCE</div><h2>{lang==='ru'?'Твоя коллекция. Твои возможности.':lang==='uk'?'Твоя колекція. Твої можливості.':'Your inventory. More ways to play.'}</h2><p>{lang==='ru'?'Выбирай кейсы, собирай редкие предметы или играй в поиск пар. Вся игра строится вокруг Minecraft-предметов.':lang==='uk'?'Відкривай кейси, збирай рідкісні предмети або знаходь пари. Усе пов’язано з Minecraft-предметами.':'Collect items, open cases or match skins. Everything connects to your Minecraft collection.'}</p></div><span className="stamp"><Sparkles size={15}/> 150 ITEMS · 21 CASES</span></div>
                <div className="discoverGrid">
                  <button className="discoverCard discoverCases" onClick={()=>go('cases')}><div className="eyebrow">01 / CASE COLLECTION</div><h3>{t.cases}</h3><p>{lang==='ru'?'21 тематический кейс и подробные таблицы вероятностей.':lang==='uk'?'21 тематичний кейс з відкритими шансами.':'21 themed cases with visible odds.'}</p><div className="discoverArt"><img src={textureSource('diamond')} alt=""/><img src={textureSource('totem')} alt=""/></div><span className="discoverLink">{t.explore} <ArrowUpRight size={16}/></span></button>
                  <button className="discoverCard discoverArcade" onClick={()=>go('arcade')}><div className="eyebrow">02 / ITEM MATCH</div><h3>{t.arcade}</h3><p>{lang==='ru'?'Открой 16 карт и найди пары. Первый успех дня приносит предмет.':lang==='uk'?'Відкрий 16 карт і знайди пари. Перша перемога дня дає предмет.':'Match 16 item cards. First win of the day awards a demo item.'}</p><div className="discoverArt"><img src={textureSource('emerald')} alt=""/><img src={textureSource('nether_star')} alt=""/></div><span className="discoverLink">{lang==='ru'?'Играть':lang==='uk'?'Грати':'Play'} <ArrowUpRight size={16}/></span></button>
                  <button className="discoverCard discoverInventory" onClick={()=>go('inventory')}><div className="eyebrow">03 / YOUR COLLECTION</div><h3>{t.inventory}</h3><p>{totalItems} {lang==='ru'?'предметов в твоём инвентаре.':lang==='uk'?'предметів у твоєму інвентарі.':'items in your current inventory.'}</p><div className="discoverArt"><img src={textureSource('netherite_sword')} alt=""/><img src={textureSource('ender_pearl')} alt=""/></div><span className="discoverLink">{lang==='ru'?'Открыть':lang==='uk'?'Відкрити':'Open'} <ArrowUpRight size={16}/></span></button>
                </div>
              </section>
            </>
          )}

          {page === 'cases' && (
            <>
              <div className="eyebrow"><span className="dot" /> VOXUP / CASE COLLECTION · 21 CASES · 150 ITEMS</div>
              <div className="areaHeading"><div><h1 className="sectionTitle">{t.catalog}</h1><p>{t.notice}</p></div><span className="stamp"><Coins size={15} /> {formatCoins(coins)} MC</span></div>
              <div className="economyBanner"><div><strong>ECONOMY / DEMO</strong><span>{L.cases_banner}</span></div><button className="secondaryBtn" onClick={()=>go('inventory')}>{L.inventory} <ArrowUpRight size={15}/></button></div>
              <div className="caseGrid">{caseDisplayOrder.map((i,orderIndex)=>{const c=cases[i];return <button className="caseCard caseCardNew" key={i} onClick={()=>{setActiveCase(i);setCaseRollResult(null);setCaseReel([])}}>
                <span className="caseIndex">{String(orderIndex+1).padStart(2,'0')} / {c[0]}</span>{caseArt(i)}
                <strong>{caseTitle(i)}</strong><div className="caseMeta"><span>{L.drop_count}: {casePools[i].length}</span><span>EV {formatCoins(Math.round(caseEvs[i]))} MC</span></div>
                <div className="casePrice">{i===0?L.free:formatCoins(c[2])+' MC'} <ArrowUpRight size={15}/></div>
              </button>})}</div>
              <section className="caseHistoryPanel"><h3>{L.history}</h3>{caseHistory.length?<div className="caseHistoryGrid">{caseHistory.slice(0,8).map(entry=><div key={entry.id} className="dropHistory"><img src={textureSource(entry.item)} alt=""/><span><b>{getItem(entry.item).name}</b><small>{entry.caseName} • {entry.time}</small></span></div>)}</div>:<p>Пока не было открытий. Начни с бесплатного кейса.</p>}</section>
            </>
          )}

          {page === 'inventory' && (
            <>
              <div className="eyebrow">VOXUP / COLLECTION</div>
              <div className="areaHeading"><div><h1 className="sectionTitle">{t.inventory}</h1><p>{t.invText}</p></div><span className="stamp"><Coins size={15} />{formatCoins(coins)} MC</span></div>
              <div className="inventoryMeta"><div className="notice"><Coins size={18} />{t.coinsInfo}</div><button className="secondaryBtn" onClick={resetDemo}><RotateCcw size={16} /> {t.resetDemo}</button></div>
              <div className="inventoryControls">
                <label className="catalogSearch inventorySearch"><Search size={16}/><input type="search" placeholder={ex.search} value={inventorySearch} onChange={e=>setInventorySearch(e.target.value)} autoComplete="off"/></label>
                <button className={'secondaryBtn '+(inventoryOnly?'inventoryControlActive':'')} onClick={()=>setInventoryOnly(v=>!v)}>{inventoryOnly?L.filter_active:L.filter_owned}</button>
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

          {page === 'arcade' && <ItemMatchArcade lang={lang} onComplete={awardMatchPrize} />}

          {page === 'admin' && adminUnlocked && <AdminConsole lang={lang} coins={coins} inventory={inventory} onCoins={changeAdminCoins} onItem={grantAdminItem} audit={adminAudit} blocked={Boolean(pendingReward||upgradeBusy||caseRolling)} onLock={()=>{setAdminUnlocked(false);go('settings')}}/>}

          {page === 'profile' && (
            <>
              <div className="eyebrow">VOXUP / USER</div>
              <h1 className="sectionTitle">{t.profile}</h1>
              <div className="profileLead"><UserRound size={38}/><div><h2>{t.guest}</h2><p>{t.profileSoon}</p><span>{ex.mode}</span></div></div>
              <div className="profileStats">
                {[ [ex.total,previewItems.length], [ex.myCollection,totalItems], [ex.profit,formatCoins(portfolioValue)+' MC'], [ex.casesOpened,stats.cases||0], [ex.upgrades,stats.upgrades||0], [ex.wins,stats.wins||0] ].map(([label,value],i)=><div className="profileStat" key={i}><span>{label}</span><strong>{value}</strong></div>)}
              </div>
              <section className="cloudNextPanel"><div className="eyebrow">NEXT / CLOUD ACCOUNT</div><h3>{lang==='ru'?'Google-вход — следующий этап':lang==='uk'?'Вхід Google — наступний етап':'Google login — next milestone'}</h3><p>{lang==='ru'?'Для настоящих аккаунтов потребуется подключить Supabase. До этого монеты и предметы хранятся в браузере — скачай резервную копию ниже.':lang==='uk'?'Для акаунтів потрібно підключити Supabase. Наразі монети й предмети зберігаються в браузері — зроби резервну копію нижче.':'Real accounts require Supabase configuration. Until then, your coins and items stay in this browser: export a backup below.'}</p></section>
              <section className="backupPanel"><div><div className="eyebrow">SAVE / LOCAL BACKUP</div><h3>{ex.demoSaves}</h3><p>{ex.backupHint}</p></div><div className="backupActions">
                <button className="primary" onClick={exportSave}><Download size={17}/>{ex.download}</button>
                <button className="secondaryBtn" onClick={()=>backupInput.current?.click()}><Upload size={17}/>{ex.upload}</button>
                <input ref={backupInput} type="file" accept=".json,application/json" hidden onChange={importSave}/>
              </div>{backupMessage&&<div className="backupFeedback" role="status">{backupMessage}</div>}</section>
            </>
          )}

          {page === 'settings' && (
            <>
              <div className="eyebrow">VOXUP / PREFERENCES</div>
              <h1 className="sectionTitle">{t.settings}</h1>
              <p className="settingsLead">{t.saved}</p>
              <div className="settingsGroupTitle"><Sparkles size={18}/>{pc.visualSettings}</div>
              <div className="settingsGrid">
                <section className="settingBox"><div className="settingName"><Globe2 size={17}/>{t.lang}</div><div className="languageChooser"><select aria-label={t.lang} value={lang} onChange={e=>setLang(e.target.value)}>{languageOptions.map(([code,name,flag])=><option key={code} value={code}>{flag} {name}</option>)}</select><div className="languageGrid">{languageOptions.map(([code,name,flag])=><button key={code} className={lang===code?'languageActive':''} onClick={()=>setLang(code)}>{flag} {name}{lang===code&&<Check size={14}/>}</button>)}</div><small className="languageNote">{lang==='ru'?'Переведены основные разделы; названия Minecraft-предметов пока на русском.':lang==='uk'?'Основні розділи перекладені; назви предметів ще російською.':'Core navigation translated; item names currently use Russian catalogue labels.'}</small></div></section>
                <section className="settingBox"><div className="settingName"><Layers3 size={17}/>{t.theme}</div><div className="choices themeSwatches">{[['gold','Dark Gold','#e8b654'],['violet','Deep Violet','#bd9cff'],['emerald','Emerald','#70dbad'],['light','Light','#e6e8df'],['crimson','Crimson','#ee6778'],['midnight','Midnight','#7f9dfb'],['frost','Frost','#8fdcf1']].map(([id,name,col])=><button className={theme===id?'chosen':''} key={id} onClick={()=>setTheme(id)}><i className="themeDot" style={{background:col}}/>{name}{theme===id&&<Check size={15}/>}</button>)}</div></section>
                <section className="settingBox"><div className="settingName"><SlidersHorizontal size={17}/>{t.accent}</div><div className="choices themeSwatches">{[['amber','Amber','#efb857'],['mint','Mint','#67dbbb'],['blue','Blue','#6baefd'],['pink','Pink','#ed89c7'],['red','Red','#f27b80'],['white','White','#d8e0ea']].map(([id,name,col])=><button className={accent===id?'chosen':''} key={id} onClick={()=>setAccent(id)}><i className="themeDot" style={{background:col}}/>{name}{accent===id&&<Check size={15}/>}</button>)}</div></section>
                <section className="settingBox settingSliders"><div className="settingName"><SlidersHorizontal size={17}/>{pc.radius}</div><div className="rangeCaption"><span>4px</span><b>{radius}px</b><span>24px</span></div><input type="range" min="4" max="24" value={radius} onChange={e=>setRadius(Number(e.target.value))}/><div className="radiusDemo"><span style={{borderRadius:`${radius}px`}}>VOXUP</span></div></section>
                <section className="settingBox settingSliders"><div className="settingName"><Sparkles size={17}/>{pc.glow}</div><div className="rangeCaption"><span>0%</span><b>{glow}%</b><span>100%</span></div><input type="range" min="0" max="100" value={glow} onChange={e=>setGlow(Number(e.target.value))}/><div className="glowDemo" style={{boxShadow:`0 0 ${glow/2}px color-mix(in srgb,var(--primary),transparent 38%)`}}/></section>
              </div>
              <div className="settingsGroupTitle"><Settings2 size={18}/>{pc.gameplaySettings}</div>
              <div className="settingsGrid">
                <section className="settingBox"><div className="settingName"><Volume2 size={17}/>{t.sound}</div><div className="choices">{[['off','OFF'],['on','ON']].map(([id,name])=><button className={sound===id?'chosen':''} key={id} onClick={()=>setSound(id)}>{name}{sound===id&&<Check size={15}/>}</button>)}</div><div className="rangeCaption"><span>{pc.volume}</span><b>{volume}%</b></div><input type="range" min="0" max="100" value={volume} onChange={e=>setVolume(Number(e.target.value))}/></section>
                <section className="settingBox"><div className="settingName"><Layers3 size={17}/>{pc.density}</div><div className="choices">{[['spacious',pc.spacious],['compact',pc.compact]].map(([id,name])=><button key={id} className={density===id?'chosen':''} onClick={()=>setDensity(id)}>{name}{density===id&&<Check size={15}/>}</button>)}</div></section>
                <section className="settingBox"><div className="settingName"><Activity size={17}/>{pc.motion}</div><div className="choices">{[['full',pc.motionFull],['calm',pc.motionCalm],['off',pc.motionOff]].map(([id,name])=><button key={id} className={motion===id?'chosen':''} onClick={()=>setMotion(id)}>{name}{motion===id&&<Check size={15}/>}</button>)}</div></section>
                <section className="settingBox"><div className="settingName"><Sparkles size={17}/>{pc.rareEffects}</div><div className="choices">{[['on',pc.rareOn],['off',pc.rareOff]].map(([id,name])=><button key={id} className={jackpotFx===id?'chosen':''} onClick={()=>setJackpotFx(id)}>{name}{jackpotFx===id&&<Check size={15}/>}</button>)}</div><small className="settingNote">{pc.oddsGuarantee}</small></section>
              </div>
              <div className="adminAccess"><div><div className="eyebrow">LOCAL LAB / DEV MODE</div><h3>{lang==='ru'?'Тестовая панель':lang==='uk'?'Тестова панель':'Local testing console'}</h3><p>{lang==='ru'?'Быстро выдавай тестовые MC Coins и предметы. Для настоящих аккаунтов нужна серверная админ-панель.':lang==='uk'?'Видавай тестові MC Coins та предмети. Для справжніх акаунтів потрібна серверна панель.':'Grant demo coins and items on this device. Real accounts require a secure server.'}</p></div><button className="secondaryBtn" onClick={()=>{if(adminUnlocked)go('admin');else setAdminLoginOpen(true)}}><ShieldCheck size={17}/>{lang==='ru'?'Открыть панель':lang==='uk'?'Відкрити панель':'Open admin lab'}</button></div>
            </>
          )}

          <footer><span>© 2026 VOXUP. UNOFFICIAL MINECRAFT FAN PROJECT.</span><span>ALPHA 0.8 • LOCAL DEMO / 150 ITEMS · 21 CASES</span></footer>
        </main>
      </div>

      {adminLoginOpen && <div className="modalBackdrop adminLoginBackdrop" onClick={()=>setAdminLoginOpen(false)}><form className="adminLoginModal" onSubmit={unlockAdmin} onClick={e=>e.stopPropagation()}><div className="adminLoginIcon"><ShieldCheck size={27}/></div><div className="eyebrow">VOXUP / LOCAL DEVELOPMENT</div><h2>{lang==='ru'?'Доступ к тестовой панели':lang==='uk'?'Доступ до тестової панелі':'Local admin access'}</h2><p>{lang==='ru'?'Этот код открывает только локальную панель на твоём устройстве. Публичную экономику он не защищает.':lang==='uk'?'Цей код відкриває лише локальну панель. Він не захищає серверну економіку.':'This code unlocks browser-only test tools. It is not server authentication.'}</p><label htmlFor="admin-code">ACCESS CODE</label><input id="admin-code" type="password" autoFocus value={adminCode} onChange={e=>setAdminCode(e.target.value)} placeholder="••••" maxLength={12}/>{adminError&&<span className="adminCodeError" role="alert">{adminError}</span>}<div className="adminLoginActions"><button type="button" className="secondaryBtn" onClick={()=>{setAdminLoginOpen(false);setAdminError('')}}>{lang==='ru'?'Отмена':lang==='uk'?'Скасувати':'Cancel'}</button><button type="submit" className="primary">{lang==='ru'?'Открыть':lang==='uk'?'Відкрити':'Unlock'}</button></div></form></div>}

      {activeCase !== null && (
        <div className="modalBackdrop caseBackdrop" onClick={closeCase}>
          <div className="modal caseModalV8" role="dialog" aria-modal="true" aria-label={caseTitle(activeCase)} onClick={e=>e.stopPropagation()}>
            <button className="modalClose" disabled={caseRolling} onClick={closeCase} aria-label="Закрыть"><X/></button>
            <div className="caseModalHeader">
              <div className="caseTitle"><span className="eyebrow">CASE / {String(caseDisplayOrder.indexOf(activeCase)+1).padStart(2,'0')} • LOCAL DEMO</span><h2>{caseTitle(activeCase)}</h2><p>{cases[activeCase][4]}</p></div>
              <div className="casePriceHead"><small>{L.case_cost}</small><strong>{activeCase===0?L.free:formatCoins(cases[activeCase][2])+' MC'}</strong><small>{L.case_balance}: {formatCoins(coins)} MC</small><small className="caseMinimum">{pc.minDrop}: {formatCoins(Math.min(...casePools[activeCase].map(([id])=>getItem(id).value)))} MC</small></div>
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
            {caseRollResult?.error&&<div className="resultBanner error">{caseRollResult.text}</div>}
            <div className="caseActions"><button className="primary caseSpinBtn" disabled={caseRolling || Boolean(pendingReward)} onClick={openDemoCase}>{caseRolling?L.case_spinning:caseRollResult?.id?L.case_more:L.case_open} <Gift size={18}/></button><div className="caseSecurity"><ShieldCheck size={17}/><span>{activeCase===0?'Тестовый free case без рекламы. Рекламу подключим только после серверной части.':'Приз сохраняется до выбора «Забрать» или «Продать». Перезагрузка не уничтожит выигрыш.'}</span></div></div>
            <section className="oddsSection"><div className="oddsHeader"><div><h3>{L.case_contents}</h3><p>{L.case_probability}</p></div><span>{pc.averageDrop}: {formatCoins(Math.round(caseEvs[activeCase]))} MC</span></div>
              <div className="oddsGrid">{casePools[activeCase].map(([id,p])=><div className="oddsItem" key={id} style={{'--rarity':rarityColors[getItem(id).rarity]}}><img src={textureSource(id)} alt=""/><div><strong>{getItem(id).name}</strong><small>{formatCoins(getItem(id).value)} MC</small></div><b>{Number(p).toLocaleString('ru-RU',{maximumFractionDigits:2})}%</b></div>)}</div>
              <div className="economyNote">Сумма вероятностей: 100%. Виртуальная валюта и предметы • расчёт дропа пока происходит в браузере. Показанный средний дроп — математическое ожидание стоимости, а не гарантированная награда.</div>
            </section>
          </div>
        </div>
      )}
      {displayClaim && <div className={'voxResultBackdrop '+(pendingReward.kind==='case' && pendingReward.odds<=0.5 && jackpotFx==='on'?'voxJackpot':'')} role="presentation">
        <section className="voxResultDialog" role="dialog" aria-modal="true" aria-labelledby="voxResultTitle">
          {pendingReward.outcome==='win' && pendingReward.kind==='case' && pendingReward.odds<=0.5 && jackpotFx==='on' && <div className="voxJackpotSparks" aria-hidden="true">{Array.from({length:18},(_,i)=><i key={i} style={{'--n':i}}/>)}</div>}
          <div className="voxResultMark">{pendingReward.outcome==='win'?<Sparkles size={25}/>:<X size={25}/>}</div>
          <span className="voxResultEyebrow">{pendingReward.kind==='case'?`CASE DROP / ${pendingReward.caseName}`:'UPGRADE / RESULT'}</span>
          <h2 id="voxResultTitle">{pendingReward.outcome==='lose'?pc.loseTitle:pendingReward.kind==='case' && pendingReward.odds<=0.5 && jackpotFx==='on'?pc.jackpotTitle:pc.winTitle}</h2>
          {pendingReward.outcome==='win' && pendingItem ? <>
            <div className="voxResultArt" style={{'--rarity':rarityColors[pendingItem.rarity]}}><VoxelViewer id={pendingItem.id} label={pendingItem.name} textureSource={textureSource} blockIds={blockIds}/></div>
            <strong className="voxResultItem">{pendingItem.name}</strong>
            <span className="voxResultValue">{formatCoins(pendingItem.value)} MC · {pendingItem.rarity}</span>
            {pendingReward.kind==='case' && <span className="voxResultOdds">DROP RATE {Number(pendingReward.odds).toLocaleString('ru-RU')}%</span>}
            <p>{pc.resultDesc}</p>
            <div className="voxResultActions">
              <button className="primary" onClick={()=>resolveReward('claim')}><Check size={18}/>{pc.take}</button>
              <button className="voxSellNow" onClick={()=>resolveReward('sell')}><Coins size={18}/>{pc.sellNow} +{formatCoins(Math.floor(pendingItem.value*.85))} MC</button>
            </div>
            <small className="voxResultSafety"><ShieldCheck size={15}/>{pc.dontLose}</small>
          </> : <>
            <div className="voxFailureSymbol"><X size={44}/></div>
            <p>{pc.failedDesc}</p>
            <button className="primary voxContinue" onClick={()=>resolveReward('continue')}>{pc.continue}<ArrowUpRight size={18}/></button>
          </>}
        </section>
      </div>}
    </div>
  )
}
