import {
  BookOpen, Code2, Coins, Crown, Ghost, Rocket, ShoppingBag, Star, Terminal, Users,
  type LucideIcon,
} from 'lucide-react';

export type AchievementTier = 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'DIAMOND';

/**
 * Every requirement type below must map to a field the user profile actually
 * stores, so progress bars show real numbers.
 *
 * `boss_damage` and `duels_won` achievements used to live here. Nothing in the
 * profile records cumulative boss damage or duel wins, so they could only ever
 * render 0 / 100000 forever — a permanently unreachable goal presented as if
 * it were attainable. They are removed until the underlying counters exist.
 */
export type AchievementRequirement = 'lessons' | 'level' | 'coins' | 'items_owned' | 'social';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  tier: AchievementTier;
  requirementType: AchievementRequirement;
  requirementValue: number;
  reward: { xp: number; coins: number; sp?: number };
}

export const TIER_STYLE: Record<AchievementTier, { label: string; ring: string; text: string }> = {
  BRONZE:   { label: 'Бронза',   ring: 'border-amber-700/40',   text: 'text-amber-600' },
  SILVER:   { label: 'Серебро',  ring: 'border-slate-400/40',   text: 'text-slate-300' },
  GOLD:     { label: 'Золото',   ring: 'border-amber-400/40',   text: 'text-amber-300' },
  PLATINUM: { label: 'Платина',  ring: 'border-teal-300/40',    text: 'text-teal-200' },
  DIAMOND:  { label: 'Алмаз',    ring: 'border-emerald-300/50', text: 'text-emerald-200' },
};

export const ACHIEVEMENTS: Achievement[] = [
  // Progress through the curriculum
  { id: 'prog_1', name: 'Первые шаги', description: 'Завершите 5 уроков.', icon: BookOpen, tier: 'BRONZE', requirementType: 'lessons', requirementValue: 5, reward: { xp: 100, coins: 100 } },
  { id: 'prog_2', name: 'Набираем темп', description: 'Завершите 20 уроков.', icon: Code2, tier: 'SILVER', requirementType: 'lessons', requirementValue: 20, reward: { xp: 500, coins: 500 } },
  { id: 'prog_3', name: 'Половина пути', description: 'Завершите 50 уроков.', icon: Terminal, tier: 'GOLD', requirementType: 'lessons', requirementValue: 50, reward: { xp: 1500, coins: 1500, sp: 5 } },

  // Level
  { id: 'lvl_1', name: 'Разгон', description: 'Достигните 10 уровня.', icon: Rocket, tier: 'BRONZE', requirementType: 'level', requirementValue: 10, reward: { xp: 200, coins: 200 } },
  { id: 'lvl_2', name: 'Ветеран', description: 'Достигните 50 уровня.', icon: Star, tier: 'GOLD', requirementType: 'level', requirementValue: 50, reward: { xp: 2000, coins: 2000, sp: 10 } },
  { id: 'lvl_3', name: 'Вершина', description: 'Достигните 100 уровня.', icon: Crown, tier: 'DIAMOND', requirementType: 'level', requirementValue: 100, reward: { xp: 10000, coins: 10000, sp: 50 } },

  // Economy
  { id: 'coin_1', name: 'Первый капитал', description: 'Накопите 1 000 монет.', icon: Coins, tier: 'BRONZE', requirementType: 'coins', requirementValue: 1000, reward: { xp: 100, coins: 200 } },
  { id: 'coin_2', name: 'Состояние', description: 'Накопите 50 000 монет.', icon: ShoppingBag, tier: 'GOLD', requirementType: 'coins', requirementValue: 50000, reward: { xp: 1000, coins: 5000 } },

  // Collection
  { id: 'item_1', name: 'Коллекционер', description: 'Соберите 10 предметов.', icon: ShoppingBag, tier: 'BRONZE', requirementType: 'items_owned', requirementValue: 10, reward: { xp: 150, coins: 150 } },
  { id: 'item_2', name: 'Хранитель', description: 'Соберите 50 предметов.', icon: Ghost, tier: 'PLATINUM', requirementType: 'items_owned', requirementValue: 50, reward: { xp: 2000, coins: 2000, sp: 10 } },

  // Community
  { id: 'social_1', name: 'Не в одиночку', description: 'Добавьте 3 друзей.', icon: Users, tier: 'BRONZE', requirementType: 'social', requirementValue: 3, reward: { xp: 150, coins: 150 } },
  { id: 'social_2', name: 'Своя команда', description: 'Добавьте 15 друзей.', icon: Users, tier: 'SILVER', requirementType: 'social', requirementValue: 15, reward: { xp: 600, coins: 600, sp: 3 } },
];
