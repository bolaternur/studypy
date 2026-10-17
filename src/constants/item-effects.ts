type StatName = "logic" | "speed" | "power" | "intellect" | "stamina";
interface ItemEffect {
  message: string;
  xp?: number;
  stats?: Partial<Record<StatName, number>>;
  petStats?: Partial<Record<StatName, number>>;
  randomPetStat?: { amount: number; stats: StatName[] };
}
export const ITEM_EFFECTS = new Map<string, ItemEffect>([
  ["logic_booster", { message: "Логика повышена на 5!", stats: { logic: 5 } }],
  ["speed_serum", { message: "Скорость повышена на 5!", stats: { speed: 5 } }],
  ["power_gloves", { message: "Сила повышена на 5!", stats: { power: 5 } }],
  ["intellect_chip", { message: "Интеллект повышен на 5!", stats: { intellect: 5 } }],
  ["stamina_drink", { message: "Выносливость повышена на 5!", stats: { stamina: 5 } }],
  ["apple_red", { message: "Логика питомца повышена на 5!", petStats: { logic: 5 } }],
  ["coffee_cup", { message: "Скорость питомца повышена на 5!", petStats: { speed: 5 } }],
  ["burger_king", { message: "Сила питомца повышена на 5!", petStats: { power: 5 } }],
  ["brain_boost", { message: "Интеллект питомца повышен на 8!", petStats: { intellect: 8 } }],
  ["energy_drink", { message: "Скорость питомца повышена на 8!", petStats: { speed: 8 } }],
  ["pizza_slice", { message: "Логика и сила питомца повышены!", petStats: { logic: 2, power: 3 } }],
  ["bit_bot_food", { message: "Бит-Бот накормлен! +10 к случайной характеристике питомца.", randomPetStat: { amount: 10, stats: ["logic", "speed", "power", "intellect"] } }],
  ["data_crystal", { message: "Вы получили 100 XP!", xp: 100 }],
  ["coding_manual", { message: "Вы получили 50 XP и массу знаний!", xp: 50 }],
  ["xp_boost_1", { message: "Использован XP Буст! +250 XP!", xp: 250 }],
  ["xp_boost_2", { message: "Использован Супер XP Буст! +600 XP!", xp: 600 }],
  ["scroll_logic", { message: "Свиток логики: +10!", stats: { logic: 10 } }],
  ["scroll_speed", { message: "Свиток скорости: +10!", stats: { speed: 10 } }],
  ["scroll_power", { message: "Свиток силы: +10!", stats: { power: 10 } }],
  ["scroll_intellect", { message: "Свиток интеллекта: +10!", stats: { intellect: 10 } }],
  ["scroll_stamina", { message: "Свиток выносливости: +10!", stats: { stamina: 10 } }],
  ["ancient_scroll", { message: "Древний манускрипт: все характеристики +5!", stats: { logic: 5, speed: 5, power: 5, intellect: 5, stamina: 5 } }],
  ["guido_wisdom", { message: "Мудрость Гвидо: +1000 XP!", xp: 1000 }],
  ["quantum_core", { message: "Квантовое ядро: все характеристики +10!", stats: { logic: 10, speed: 10, power: 10, intellect: 10, stamina: 10 } }],
]);
