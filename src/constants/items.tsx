import type { ReactNode } from 'react';
import { ITEM_EFFECTS } from './item-effects';
import {
  ShoppingBag, Star, Zap, Shield, Heart, Coins, CheckCircle2, Users, Tag, Trash2, Plus,
  ArrowRightLeft, Apple, Coffee, Pizza, Utensils, Mouse, Trophy, Book, Bug, ShieldCheck,
  Gem, Ghost, Flame, Wind, Droplets, Target, Cpu, Gift, Brain, Swords, Package,
  BrainCircuit, TerminalSquare, FileText, Globe, Gamepad2, Sparkles, Skull, Rocket,
  MessageCircle, Clock, Home as HomeIcon, Lock as LockIcon
} from 'lucide-react';

/**
 * The item catalogue.
 *
 * This used to live inside `pages/Shop.tsx`, which meant AuthContext,
 * Inventory, Admin and PetCompanion all imported the Shop *page* just to read
 * item data. That static edge defeated the route's lazy import — Rollup warned
 * that the dynamic import could not move Shop into its own chunk — and pulled
 * the whole shop UI into the initial bundle. The data now stands on its own.
 */

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: ReactNode;
  color: string;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
}

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'xp_boost_1',
    name: '250 игровых XP',
    description: 'При использовании начисляет 250 игровых XP. Это не оценка знания Python.',
    price: 500,
    icon: <Zap className="w-6 h-6" />,
    color: 'from-amber-400 to-amber-500'
  },
  {
    id: 'shield_1',
    name: 'Защита серии',
    description: 'Коллекционный предмет. Игровой эффект пока недоступен.',
    price: 300,
    icon: <Shield className="w-6 h-6" />,
    color: 'from-teal-400 to-teal-500'
  },
  {
    id: 'extra_life_1',
    name: 'Дополнительная жизнь',
    description: 'Коллекционный предмет. Игровой эффект пока недоступен.',
    price: 200,
    icon: <Heart className="w-6 h-6" />,
    color: 'from-red-400 to-amber-500'
  },
  {
    id: 'premium_avatar_1',
    name: 'Золотая рамка',
    description: 'Коллекционный предмет. Установка рамки пока недоступна.',
    price: 1000,
    icon: <Star className="w-6 h-6" />,
    color: 'from-amber-300 to-amber-600'
  }
];

const RAW_ITEMS: ShopItem[] = [
  ...SHOP_ITEMS,
  { id: 'xp_boost_2', name: 'XP Буст (2ч)', description: 'Удваивает получаемый опыт в течение двух часов.', price: 800, icon: <Zap className="w-6 h-6" />, color: 'from-amber-400 to-amber-500' },
  { id: 'shield_2', name: 'Супер Защита', description: 'Сохраняет вашу серию заходов на 3 дня.', price: 600, icon: <Shield className="w-6 h-6" />, color: 'from-teal-400 to-teal-500' },
  { id: 'extra_life_2', name: 'Жизнь x2', description: 'Дает две попытки в сложных испытаниях.', price: 350, icon: <Heart className="w-6 h-6" />, color: 'from-red-400 to-amber-500' },
  { id: 'premium_avatar_2', name: 'Серебряная рамка', description: 'Стильная серебряная рамка для аватара.', price: 700, icon: <Star className="w-6 h-6" />, color: 'from-gray-300 to-gray-500' },


  { id: 'apple_red', name: 'Красное Яблоко', description: 'Дает +5 к Логике вашего питомца.', price: 150, icon: <Apple className="w-6 h-6" />, color: 'from-red-500 to-red-700' },
  { id: 'coffee_cup', name: 'Крепкий Кофе', description: 'Дает +5 к Скорости вашего питомца.', price: 150, icon: <Coffee className="w-6 h-6" />, color: 'from-brown-500 to-amber-900' },
  { id: 'burger_king', name: 'Мега Бургер', description: 'Дает +5 к Силе вашего питомца.', price: 200, icon: <Utensils className="w-6 h-6" />, color: 'from-amber-400 to-red-600' },
  { id: 'pizza_slice', name: 'Пицца "Кодер"', description: 'Дает +2 к Логике и +3 к Силе.', price: 180, icon: <Pizza className="w-6 h-6" />, color: 'from-amber-400 to-red-500' },
  { id: 'energy_drink', name: 'Энергетик', description: 'Дает +8 к Скорости вашего питомца.', price: 250, icon: <Zap className="w-6 h-6" />, color: 'from-teal-400 to-teal-500' },
  { id: 'brain_boost', name: 'Нейро-Стимулятор', description: 'Дает +8 к Интеллекту вашего питомца.', price: 300, icon: <Cpu className="w-6 h-6" />, color: 'from-emerald-400 to-teal-600' },
  { id: 'golden_apple', name: 'Золотое Яблоко', description: 'Дает +20 ко всем статам питомца.', price: 2000, icon: <Apple className="w-6 h-6" />, color: 'from-amber-300 to-amber-600' },
  { id: 'bit_bot_food', name: '🤖 Бит-Бот корм', description: 'Специальный корм для Бит-Бота. Дает +10 к случайному стату питомца.', price: 350, icon: <Cpu className="w-6 h-6" />, color: 'from-teal-500 to-teal-700', rarity: 'rare' as const },


  { id: 'logic_booster', name: 'Логик-Бустер', description: 'Постоянно увеличивает Логику на 5.', price: 1500, icon: <Brain className="w-6 h-6" />, color: 'from-teal-400 to-emerald-600' },
  { id: 'speed_serum', name: 'Сыворотка Скорости', description: 'Постоянно увеличивает Скорость на 5.', price: 1500, icon: <Zap className="w-6 h-6" />, color: 'from-amber-400 to-amber-600' },
  { id: 'power_gloves', name: 'Перчатки Силы', description: 'Постоянно увеличивают Силу на 5.', price: 1500, icon: <Swords className="w-6 h-6" />, color: 'from-red-400 to-amber-600' },
  { id: 'intellect_chip', name: 'Чип Интеллекта', description: 'Постоянно увеличивает Интеллект на 5.', price: 1500, icon: <Star className="w-6 h-6" />, color: 'from-teal-400 to-teal-600' },
  { id: 'stamina_drink', name: 'Напиток Выносливости', description: 'Постоянно увеличивает Выносливость на 5.', price: 1500, icon: <Heart className="w-6 h-6" />, color: 'from-emerald-400 to-emerald-600' },
  { id: 'data_crystal', name: 'Кристалл Данных', description: 'Мгновенно дает 100 XP вашему герою.', price: 400, icon: <Gem className="w-6 h-6" />, color: 'from-teal-300 to-teal-500' },
  { id: 'lucky_coin', name: 'Счастливая Монета', description: 'Увеличивает награду за уроки на 10%.', price: 1200, icon: <Coins className="w-6 h-6" />, color: 'from-amber-300 to-amber-600' },
  { id: 'debug_tool', name: 'Дебаггер', description: 'Позволяет пропустить одну ошибку в песочнице.', price: 500, icon: <Bug className="w-6 h-6" />, color: 'from-emerald-400 to-emerald-600' },
  { id: 'firewall_v1', name: 'Файервол v1', description: 'Защищает от потери XP при проигрыше в дуэли.', price: 450, icon: <ShieldCheck className="w-6 h-6" />, color: 'from-amber-500 to-red-600' },
  { id: 'mystery_box', name: 'Таинственный Ящик', description: 'Содержит случайный предмет или монеты.', price: 800, icon: <Package className="w-6 h-6" />, color: 'from-emerald-500 to-amber-600' },
  { id: 'nano_bot', name: 'Нано-Бот', description: 'Автоматически исправляет мелкие ошибки в коде.', price: 2500, icon: <Cpu className="w-6 h-6" />, color: 'from-teal-400 to-teal-600' },
  { id: 'quantum_core', name: 'Квантовое Ядро', description: 'Увеличивает все статы на 10.', price: 5000, icon: <Zap className="w-6 h-6" />, color: 'from-teal-400 to-teal-600' },
  { id: 'neural_link', name: 'Нейро-Связь', description: 'Позволяет питомцу помогать вам в решении задач.', price: 3000, icon: <BrainCircuit className="w-6 h-6" />, color: 'from-emerald-400 to-amber-600' },
  { id: 'coding_manual', name: 'Справочник Python', description: 'Дает 50 XP и полезный совет.', price: 150, icon: <Book className="w-6 h-6" />, color: 'from-teal-500 to-teal-700' },


  { id: 'scroll_logic', name: 'Свиток Логики', description: 'Древний свиток, дающий +10 к Логике.', price: 2500, icon: <Book className="w-6 h-6" />, color: 'from-teal-600 to-teal-900' },
  { id: 'scroll_speed', name: 'Свиток Скорости', description: 'Древний свиток, дающий +10 к Скорости.', price: 2500, icon: <Zap className="w-6 h-6" />, color: 'from-amber-500 to-amber-700' },
  { id: 'scroll_power', name: 'Свиток Силы', description: 'Древний свиток, дающий +10 к Силе.', price: 2500, icon: <Swords className="w-6 h-6" />, color: 'from-red-600 to-amber-900' },
  { id: 'scroll_intellect', name: 'Свиток Интеллекта', description: 'Древний свиток, дающий +10 к Интеллекту.', price: 2500, icon: <Brain className="w-6 h-6" />, color: 'from-emerald-600 to-emerald-900' },
  { id: 'scroll_stamina', name: 'Свиток Выносливости', description: 'Древний свиток, дающий +10 к Выносливости.', price: 2500, icon: <Heart className="w-6 h-6" />, color: 'from-emerald-600 to-emerald-900' },
  { id: 'ancient_scroll', name: 'Древний Манускрипт', description: 'Дает +5 ко всем характеристикам героя.', price: 4500, icon: <Star className="w-6 h-6" />, color: 'from-amber-400 to-amber-800' },


  { id: 'code_breaker', name: 'Взломщик Кода', description: 'Меч, дающий +15 к Силе и +5 к Скорости.', price: 3500, icon: <Swords className="w-6 h-6" />, color: 'from-teal-500 to-teal-800' },
  { id: 'logic_staff', name: 'Посох Логики', description: 'Посох, дающий +15 к Логике и +5 к Интеллекту.', price: 3500, icon: <Target className="w-6 h-6" />, color: 'from-teal-500 to-emerald-800' },
  { id: 'binary_dagger', name: 'Бинарный Кинжал', description: 'Кинжал, дающий +10 к Скорости и +5 к Силе.', price: 2800, icon: <Swords className="w-6 h-6" />, color: 'from-gray-600 to-black' },
  { id: 'compiler_shield', name: 'Щит Компилятора', description: 'Щит, дающий +20 к Выносливости и +5 к Силе.', price: 3200, icon: <ShieldCheck className="w-6 h-6" />, color: 'from-emerald-500 to-emerald-800' },
  { id: 'neural_bow', name: 'Нейронный Лук', description: 'Лук, дающий +15 к Интеллекту и +5 к Скорости.', price: 3400, icon: <Target className="w-6 h-6" />, color: 'from-amber-500 to-amber-800' },
  { id: 'data_scythe', name: 'Коса Данных', description: 'Коса, дающая +10 к Силе и +10 к Логике.', price: 3800, icon: <Flame className="w-6 h-6" />, color: 'from-red-700 to-amber-900' },


  { id: 'pet_toy_mouse', name: 'Мышка-Игрушка', description: 'Дает +2 XP вашему питомцу.', price: 100, icon: <Mouse className="w-6 h-6" />, color: 'from-gray-400 to-gray-600' },
  { id: 'pet_toy_ball', name: 'Пиксельный Мяч', description: 'Дает +2 XP вашему питомцу.', price: 100, icon: <Target className="w-6 h-6" />, color: 'from-amber-400 to-amber-600' },


  { id: 'neon_sword', name: 'Неоновый Меч', description: 'Редкий косметический предмет для профиля.', price: 2500, icon: <Flame className="w-6 h-6" />, color: 'from-red-500 to-emerald-600' },
  { id: 'void_essence', name: 'Эссенция Пустоты', description: 'Легендарный эффект для вашего аватара.', price: 5000, icon: <Ghost className="w-6 h-6" />, color: 'from-teal-900 to-black' },
  { id: 'wind_boots', name: 'Сапоги Ветра', description: 'Ускоряет анимации в интерфейсе.', price: 1500, icon: <Wind className="w-6 h-6" />, color: 'from-teal-300 to-teal-500' },
  { id: 'aqua_shell', name: 'Водный Щит', description: 'Красивый эффект вокруг аватара.', price: 1800, icon: <Droplets className="w-6 h-6" />, color: 'from-teal-400 to-teal-600' },
  { id: 'gift_box', name: 'Подарочный Набор', description: 'Содержит случайный косметический предмет.', price: 3000, icon: <Gift className="w-5 h-5" />, color: 'from-emerald-500 to-amber-600' },




  { id: 'os_module', name: 'Модуль OS', description: 'Дает власть над системными путями. +5 к Логике.', price: 600, icon: <Cpu className="w-6 h-6" />, color: 'from-gray-500 to-gray-700' },
  { id: 'sys_module', name: 'Модуль SYS', description: 'Доступ к аргументам командной строки. +5 к Скорости.', price: 600, icon: <TerminalSquare className="w-6 h-6" />, color: 'from-teal-500 to-teal-700' },
  { id: 'json_scroll', name: 'Свиток JSON', description: 'Мастерство сериализации. +5 к Интеллекту.', price: 600, icon: <FileText className="w-6 h-6" />, color: 'from-amber-500 to-amber-700' },
  { id: 'math_tome', name: 'Том Математики', description: 'Сложные вычисления. +10 к Логике.', price: 1200, icon: <Book className="w-6 h-6" />, color: 'from-emerald-500 to-teal-800' },
  { id: 'requests_cloak', name: 'Плащ Requests', description: 'Связь с внешним миром. +5 к Выносливости.', price: 800, icon: <Globe className="w-6 h-6" />, color: 'from-teal-400 to-teal-600' },
  { id: 'pygame_controller', name: 'Контроллер Pygame', description: 'Радость разработки игр. +5 к Скорости.', price: 900, icon: <Gamepad2 className="w-6 h-6" />, color: 'from-emerald-400 to-emerald-600' },
  { id: 'sqlite_vault', name: 'Хранилище SQLite', description: 'Локальная база данных. +15 к Инвентарю (визуально).', price: 1500, icon: <Package className="w-6 h-6" />, color: 'from-amber-400 to-amber-600' },
  { id: 'pandas_shield', name: 'Щит Pandas', description: 'Мощь анализа данных. +15 к Выносливости.', price: 1800, icon: <ShieldCheck className="w-6 h-6" />, color: 'from-teal-500 to-teal-500' },
  { id: 'numpy_array', name: 'Массив NumPy', description: 'Эффективные вычисления. +10 к Силе.', price: 1300, icon: <Target className="w-6 h-6" />, color: 'from-teal-400 to-teal-600' },
  { id: 'matplotlib_brush', name: 'Кисть Matplotlib', description: 'Визуализация данных. +5 к Интеллекту.', price: 1100, icon: <Sparkles className="w-6 h-6" />, color: 'from-amber-400 to-amber-600' },


  { id: 'optic_cable', name: 'Оптический Кабель', description: 'Скорость света. +8 к Скорости.', price: 1200, icon: <Zap className="w-6 h-6" />, color: 'from-teal-300 to-teal-400' },
  { id: 'neural_uprising', name: 'Восстание Нейронов', description: 'Критический буст Интеллекта (+12).', price: 2200, icon: <BrainCircuit className="w-6 h-6" />, color: 'from-emerald-600 to-amber-600' },
  { id: 'glitch_dagger', name: 'Кинжал Глича', description: 'Прошивает любую защиту. +12 к Силе.', price: 2100, icon: <Swords className="w-6 h-6" />, color: 'from-red-500 to-black' },
  { id: 'titanium_server', name: 'Титановый Сервер', description: 'Безотказная работа. +20 к Выносливости.', price: 2800, icon: <Shield className="w-6 h-6" />, color: 'from-gray-300 to-gray-500' },
  { id: 'logic_gate_key', name: 'Ключ Логики', description: 'Открывает доступ к скрытым путям. +10 к Логике.', price: 1600, icon: <Target className="w-6 h-6" />, color: 'from-amber-400 to-amber-600' },
  { id: 'proxy_mask', name: 'Прокси-Маска', description: 'Анонимность и скрытность. +5 к Скорости.', price: 1100, icon: <Ghost className="w-6 h-6" />, color: 'from-teal-900 to-emerald-900' },
  { id: 'ram_cartridge', name: 'Картридж RAM', description: 'Мгновенная память. +10 к Интеллекту.', price: 1700, icon: <Package className="w-6 h-6" />, color: 'from-emerald-400 to-teal-600' },
  { id: 'ssd_overdrive', name: 'SSD Овердрайв', description: 'Никаких задержек! +15 к Скорости.', price: 2500, icon: <Zap className="w-6 h-6" />, color: 'from-amber-400 to-red-500' },
  { id: 'silicon_heart', name: 'Кремниевое Сердце', description: 'Жизнь без багов. +15 к Выносливости.', price: 2300, icon: <Heart className="w-6 h-6" />, color: 'from-amber-400 to-red-600' },
  { id: 'motherboard_chestplate', name: 'Кираса Материнки', description: 'Основа всей системы. +25 к Силе.', price: 3500, icon: <ShieldCheck className="w-6 h-6" />, color: 'from-emerald-500 to-emerald-900' },


  { id: 'python_fang', name: 'Клык Питона', description: 'Ядовитый урон. +18 к Силе.', price: 3200, icon: <Swords className="w-6 h-6" />, color: 'from-emerald-600 to-emerald-900' },
  { id: 'recursive_ring', name: 'Кольцо Рекурсии', description: 'Бесконечный цикл силы. +10 ко всем статам.', price: 4800, icon: <Target className="w-6 h-6" />, color: 'from-teal-600 to-emerald-800' },
  { id: 'stack_overflow_staff', name: 'Посох Переполнения', description: 'Магия, которую не сдержать. +25 к Интеллекту.', price: 4200, icon: <Zap className="w-6 h-6" />, color: 'from-amber-500 to-red-700' },
  { id: 'heap_memory_bottle', name: 'Бутыль Кучи', description: 'Много временной силы. +5 XP навсегда.', price: 800, icon: <Droplets className="w-6 h-6" />, color: 'from-teal-400 to-teal-500' },
  { id: 'zen_mantle', name: 'Мантия Дзен', description: 'Красивое лучше, чем уродливое. +15 к Логике.', price: 2900, icon: <Wind className="w-6 h-6" />, color: 'from-white to-gray-400' },
  { id: 'guido_wisdom', name: 'Мудрость Гвидо', description: 'Легендарные знания. Мгновенно +1 уровень.', price: 7500, icon: <Star className="w-6 h-6" />, color: 'from-amber-400 to-amber-600' },
  { id: 'pep8_shrine', name: 'Святыня PEP 8', description: 'Чистота кода - залог успеха. +20 к Логике.', price: 3600, icon: <ShieldCheck className="w-6 h-6" />, color: 'from-teal-300 to-teal-600' },
  { id: 'tuple_boots', name: 'Сапоги Тюпла', description: 'Неизменная скорость. +12 к Скорости.', price: 2200, icon: <Wind className="w-6 h-6" />, color: 'from-teal-400 to-teal-800' },
  { id: 'dictionary_necklace', name: 'Ожерелье Словаря', description: 'Быстрый поиск ответов. +15 к Интеллекту.', price: 3100, icon: <Book className="w-6 h-6" />, color: 'from-amber-300 to-amber-700' },
  { id: 'exception_shield', name: 'Щит Исключений', description: 'Обработка любых атак. +30 к Выносливости.', price: 5500, icon: <ShieldCheck className="w-6 h-6" />, color: 'from-red-500 to-amber-900' },


  { id: 'pet_house_deluxe', name: 'Люкс-Домик', description: 'Питомец отдыхает с комфортом. +5 XP питомцу/час.', price: 2500, icon: <Package className="w-6 h-6" />, color: 'from-teal-500 to-teal-700' },
  { id: 'pet_diamond_collar', name: 'Алмазный Ошейник', description: 'Статус вашего спутника. +10 к его Красоте.', price: 1500, icon: <Star className="w-6 h-6" />, color: 'from-teal-300 to-teal-500' },
  { id: 'pet_laser_pointer', name: 'Лазерная Указка', description: 'Развлечение для пикселей. +10 XP питомцу.', price: 400, icon: <Target className="w-6 h-6" />, color: 'from-red-400 to-red-600' },
  { id: 'pet_organic_treats', name: 'Органик-Лакомства', description: 'Здоровая еда. +5 ко всем статам питомца.', price: 300, icon: <Apple className="w-6 h-6" />, color: 'from-emerald-400 to-emerald-600' },
  { id: 'pet_vr_headset', name: 'VR-Шлем для пета', description: 'Тренировки в виртуальности. +15 XP питомцу.', price: 900, icon: <Skull className="w-6 h-6" />, color: 'from-teal-600 to-emerald-800' },
  { id: 'pet_rocket_boots', name: 'Ракетные сапожки', description: 'Полет нормальный! +15 к Скорости питомца.', price: 2200, icon: <Rocket className="w-6 h-6" />, color: 'from-amber-500 to-red-600' },
  { id: 'pet_mystery_egg', name: 'Таинственное Яйцо', description: 'Кто же из него вылупится?', price: 4500, icon: <Package className="w-6 h-6" />, color: 'from-emerald-400 to-amber-600' },
  { id: 'pet_crown', name: 'Корона Питона', description: 'Для настоящего короля сервера. +50 к ЧСВ.', price: 10000, icon: <Trophy className="w-6 h-6" />, color: 'from-amber-300 to-amber-600' },
  { id: 'pet_cape_invisibility', name: 'Плащ-невидимка', description: 'Скрывает питомца (шутка). +10 к Логике.', price: 1800, icon: <Ghost className="w-6 h-6" />, color: 'from-teal-900 to-teal-950' },
  { id: 'pet_translator', name: 'Переводчик "Гав-в-Код"', description: 'Понимайте своего друга лучше. +15 к Интеллекту.', price: 2600, icon: <MessageCircle className="w-6 h-6" />, color: 'from-white to-teal-200' },


  { id: 'lambda_lance', name: 'Лямбда-Копье', description: 'Анонимная мощь в одной строке. +35 к Силе.', price: 6500, icon: <Swords className="w-6 h-6" />, color: 'from-amber-400 to-red-800' },
  { id: 'async_clock', name: 'Асинхронные Часы', description: 'Управление временем выполнения. +25 к Скорости.', price: 5800, icon: <Clock className="w-6 h-6" />, color: 'from-teal-400 to-teal-600' },
  { id: 'decorators_hat', name: 'Шляпа Декоратора', description: 'Добавьте функциональности стильно. +20 к Логике.', price: 4200, icon: <Package className="w-6 h-6" />, color: 'from-emerald-500 to-teal-700' },
  { id: 'generator_well', name: 'Колодец Генераторов', description: 'Бесконечный поток ресурсов. +50 монет в день.', price: 8500, icon: <Droplets className="w-6 h-6" />, color: 'from-emerald-500 to-teal-700' },
  { id: 'comprehension_eye', name: 'Око Списков', description: 'Видит структуру данных насквозь. +25 к Интеллекту.', price: 6200, icon: <Target className="w-6 h-6" />, color: 'from-teal-500 to-teal-900' },
  { id: 'inheritance_shield', name: 'Щит Наследования', description: 'Защита предков. +40 к Выносливости.', price: 7200, icon: <ShieldCheck className="w-6 h-6" />, color: 'from-amber-600 to-amber-900' },
  { id: 'abstraction_orb', name: 'Сфера Абстракции', description: 'Скрывает детали, оставляя суть. +30 к Логике.', price: 8000, icon: <Zap className="w-6 h-6" />, color: 'from-gray-200 to-gray-500' },
  { id: 'polymorphism_staff', name: 'Посох Полиморфизма', description: 'Принимает любую форму. +15 ко всем статам.', price: 9500, icon: <Wind className="w-6 h-6" />, color: 'from-amber-500 to-teal-600' },
  { id: 'encapsulation_box', name: 'Ящик Инкапсуляции', description: 'Надежно хранит ваши секреты. +10 к Защите.', price: 3400, icon: <LockIcon className="w-6 h-6" />, color: 'from-gray-700 to-black' },
  { id: 'pip_container', name: 'Контейнер PIP', description: 'Установка любых зависимостей. +20 к Силе.', price: 4500, icon: <Package className="w-6 h-6" />, color: 'from-teal-400 to-teal-700' },
  { id: 'virtual_env_tent', name: 'Палатка Virtualenv', description: 'Чистое пространство для работы. +15 к Выносливости.', price: 3100, icon: <HomeIcon className="w-6 h-6" />, color: 'from-emerald-400 to-emerald-600' },
  { id: 'git_hook', name: 'Крюк Git', description: 'Цепляется за каждый коммит. +10 к Скорости.', price: 2400, icon: <Swords className="w-6 h-6" />, color: 'from-amber-600 to-red-900' },
  { id: 'docker_whale', name: 'Кит Docker', description: 'Упакует что угодно. +50 к грузоподъемности (визуально).', price: 9000, icon: <Droplets className="w-6 h-6" />, color: 'from-teal-400 to-teal-800' },
  { id: 'k8s_helm', name: 'Шлем Кубернетиса', description: 'Управление целым кластером. +40 к Логике.', price: 12000, icon: <ShieldCheck className="w-6 h-6" />, color: 'from-teal-500 to-teal-600' },
  { id: 'binary_master_crown', name: 'Корона Бинарного Мастера', description: 'Вы достигли совершенства. +50 ко всем статам.', price: 25000, icon: <Trophy className="w-6 h-6" />, color: 'from-amber-400 via-amber-200 to-amber-600 animate-pulse' }
];

/** Historical IDs stay available for inventory; only implemented effects are described. */
export const ALL_ITEMS: ShopItem[] = RAW_ITEMS.map(item => {
  const effect = ITEM_EFFECTS.get(item.id);
  const names: Record<string,string> = {logic:'логика',speed:'скорость',power:'сила',intellect:'интеллект',stamina:'выносливость'};
  const stats = effect?.stats || effect?.petStats;
  const description = !effect ? 'Коллекционный предмет без действующего игрового эффекта.'
    : effect.xp ? 'При использовании начисляет '+effect.xp+' игровых XP. Это не оценка знания Python.'
    : effect.randomPetStat ? 'При использовании добавляет '+effect.randomPetStat.amount+' к случайной игровой характеристике питомца.'
    : 'При использовании: '+Object.entries(stats || {}).map(([key,amount])=>names[key]+' +'+amount).join(', ')+(effect.petStats?' у питомца.':'. Игровые характеристики не оценивают знания.');
  return {...item,description};
});
