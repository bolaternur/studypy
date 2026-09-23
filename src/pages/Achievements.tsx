import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Check, Coins, Lock, Sparkles, Zap } from 'lucide-react';

import { useAuth } from '../contexts/AuthContext';
import {
  ACHIEVEMENTS,
  TIER_STYLE,
  type Achievement,
  type AchievementRequirement,
} from '../constants/achievements';

type FilterId = 'all' | 'unlocked' | 'locked';

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'Все' },
  { id: 'unlocked', label: 'Получены' },
  { id: 'locked', label: 'В процессе' },
];

const REQUIREMENT_LABEL: Record<AchievementRequirement, string> = {
  lessons: 'уроков',
  level: 'уровень',
  coins: 'монет',
  items_owned: 'предметов',
  social: 'друзей',
};

const AchievementCard = ({
  achievement,
  current,
}: {
  achievement: Achievement;
  current: number;
}) => {
  const tier = TIER_STYLE[achievement.tier];
  const Icon = achievement.icon;
  const target = achievement.requirementValue;
  const isUnlocked = current >= target;
  const percent = Math.min(100, Math.round((current / target) * 100));

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden rounded-[26px] border bg-surface-1/60 p-7 transition-colors ${
        isUnlocked ? 'border-emerald-400/30' : 'border-hairline'
      }`}
    >
      {isUnlocked && (
        <div
          className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-emerald-500/15 blur-[60px]"
          aria-hidden="true"
        />
      )}

      <div className="relative">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div
            className={`rounded-2xl border p-3 ${tier.ring} ${
              isUnlocked ? 'bg-emerald-400/10' : 'bg-white/[0.02]'
            }`}
          >
            <Icon
              className={`h-6 w-6 ${isUnlocked ? 'text-emerald-300' : 'text-ink-30'}`}
              aria-hidden="true"
            />
          </div>

          <span className={`type-eyebrow ${tier.text}`}>{tier.label}</span>
        </div>

        <h3 className="mb-2 flex items-center gap-2 text-xl font-semibold tracking-tight">
          {achievement.name}
          {isUnlocked ? (
            <Check className="h-4 w-4 text-emerald-400" aria-label="получено" />
          ) : (
            <Lock className="h-3.5 w-3.5 text-ink-30" aria-label="не получено" />
          )}
        </h3>
        <p className="mb-7 text-sm leading-relaxed text-ink-50">{achievement.description}</p>

        <div className="mb-2.5 flex items-baseline justify-between font-mono text-xs">
          <span className={isUnlocked ? 'text-emerald-300' : 'text-ink-30'}>
            {Math.min(current, target).toLocaleString('ru-RU')} /{' '}
            {target.toLocaleString('ru-RU')}{' '}
            {REQUIREMENT_LABEL[achievement.requirementType]}
          </span>
          <span className="text-ink-30">{percent}%</span>
        </div>

        <div
          className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Прогресс: ${achievement.name}`}
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${percent}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className={`h-full rounded-full ${
              isUnlocked
                ? 'bg-gradient-to-r from-emerald-400 to-teal-300'
                : 'bg-gradient-to-r from-teal-600 to-emerald-600'
            }`}
          />
        </div>

        <div className="mt-6 flex items-center gap-5 border-t border-hairline pt-5 text-xs text-ink-30">
          <span className="flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
            {achievement.reward.xp.toLocaleString('ru-RU')} XP
          </span>
          <span className="flex items-center gap-1.5">
            <Coins className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
            {achievement.reward.coins.toLocaleString('ru-RU')}
          </span>
          {achievement.reward.sp !== undefined && (
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-teal-300" aria-hidden="true" />
              {achievement.reward.sp} SP
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export const Achievements = () => {
  const { userProfile } = useAuth();
  const [filter, setFilter] = useState<FilterId>('all');

  /** Progress is derived from the profile, so every bar reflects real data. */
  const progressFor = useMemo(() => {
    const counters: Record<AchievementRequirement, number> = {
      lessons: userProfile?.completedLessons?.length ?? 0,
      level: userProfile?.level ?? 0,
      coins: userProfile?.coins ?? 0,
      items_owned: userProfile?.inventory?.length ?? 0,
      social: userProfile?.friends?.length ?? 0,
    };
    return (requirement: AchievementRequirement) => counters[requirement];
  }, [userProfile]);

  const unlockedCount = ACHIEVEMENTS.filter(
    (achievement) => progressFor(achievement.requirementType) >= achievement.requirementValue,
  ).length;

  const visible = ACHIEVEMENTS.filter((achievement) => {
    if (filter === 'all') return true;
    const isUnlocked = progressFor(achievement.requirementType) >= achievement.requirementValue;
    return filter === 'unlocked' ? isUnlocked : !isUnlocked;
  });

  return (
    <>
      <div className="px-6 pb-32 pt-32 md:px-10">
        <div className="mx-auto max-w-[104rem]">
          <header className="mb-16">
            <p className="type-eyebrow mb-6">достижения</p>
            <h1 className="type-display max-w-3xl text-[clamp(2.4rem,6vw,4.5rem)]">
              Что уже{' '}
              <span className="editorial text-emerald-300">получилось</span>
            </h1>

            {userProfile ? (
              <p className="mt-7 text-lg text-ink-50">
                Открыто{' '}
                <span className="font-mono text-emerald-300">{unlockedCount}</span> из{' '}
                <span className="font-mono text-ink-70">{ACHIEVEMENTS.length}</span>
              </p>
            ) : (
              <div className="mt-7 flex flex-col items-start gap-4">
                <p className="text-lg text-ink-50">
                  Войдите в аккаунт, чтобы видеть свой прогресс — сейчас показаны
                  только условия.
                </p>
                <Link
                  to="/pathways"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-[#04070a] transition-transform hover:scale-[1.03]"
                >
                  Начать обучение
                </Link>
              </div>
            )}
          </header>

          <div
            role="tablist"
            aria-label="Фильтр достижений"
            className="mb-12 inline-flex gap-1.5 rounded-full border border-hairline p-1.5"
          >
            {FILTERS.map((option) => (
              <button
                key={option.id}
                type="button"
                role="tab"
                aria-selected={filter === option.id}
                onClick={() => setFilter(option.id)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  filter === option.id
                    ? 'bg-emerald-400 text-[#04070a]'
                    : 'text-ink-50 hover:text-ink-100'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {visible.length === 0 ? (
            <p className="text-ink-30">В этой категории пока ничего нет.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((achievement) => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                  current={progressFor(achievement.requirementType)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
