import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export interface Tournament {
  id: string;
  title: string;
  description: string;
  type: 'speed' | 'logic' | 'boss';
}

// Retain old IDs in URLs; obsolete series names resolve to their shared content.
export const TRAINING_ALIASES: Record<string, string> = { t_4: 't_2', t_5: 't_1' };
export const TOURNAMENTS: Tournament[] = [
  { id: 't_1', title: 'Аргументы и возвращаемые значения', description: 'Сумма, квадрат и приветствие: три функции с проверкой разных аргументов.', type: 'speed' },
  { id: 't_2', title: 'Условия в функциях', description: 'Чётность, положительное число и максимум. Учти ноль и отрицательные значения.', type: 'logic' },
  { id: 't_3', title: 'Обработка строк', description: 'Переверни строку, найди её длину и измени регистр. Проверь пустую строку.', type: 'boss' },
];

export function Tournaments() {
  return <div className="mx-auto max-w-5xl px-4 pb-12 pt-24 sm:px-6">
    <header className="mb-8 max-w-2xl"><h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Тренировочные серии</h1><p className="mt-4 leading-relaxed text-slate-300">Три связанные задачи в каждой серии. Пиши настоящий Python, проверяй функции на разных входах и разбирай ошибки. Можно заниматься без спешки и без аккаунта.</p><p className="mt-3 text-sm leading-relaxed text-slate-400">Это личная практика. Результаты проверяются в браузере, не участвуют в рейтинге и не приносят XP или монеты.</p></header>
    <div className="divide-y divide-white/15 border-y border-white/15">{TOURNAMENTS.map(series => <article key={series.id} className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-xl font-semibold text-white">{series.title}</h2><p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-300">{series.description}</p><p className="mt-2 text-xs text-slate-400">Функции · Начальный → средний · 10–15 минут</p></div><Link to={`/tournaments/${series.id}`} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-[#08130e] hover:bg-emerald-300">Открыть серию <ArrowRight size={16} /></Link></article>)}</div>
    <Link to="/arcade" className="mt-6 inline-flex min-h-11 items-center text-sm text-emerald-300 underline underline-offset-4">Вернуться к играм</Link>
  </div>;
}
