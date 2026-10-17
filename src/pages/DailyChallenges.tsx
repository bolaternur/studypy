import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { TOURNAMENTS } from './Tournaments';

export function DailyChallenges() {
  const date = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Qyzylorda', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  const day = Math.floor(Date.parse(`${date}T00:00:00Z`) / 86400000);
  const series = TOURNAMENTS[day % TOURNAMENTS.length];
  return <div className="mx-auto max-w-3xl px-4 pb-12 pt-24 sm:px-6"><h1 className="text-3xl font-bold tracking-tight text-white">Практика на сегодня</h1><p className="mt-4 leading-relaxed text-slate-300">Одна из готовых серий для короткого занятия. Если тема ещё незнакома, сначала пройди уроки о функциях.</p><section className="mt-6 rounded-xl border border-white/15 bg-[#101b19] p-5 sm:p-6"><h2 className="text-xl font-semibold text-white">{series.title}</h2><p className="mt-3 leading-relaxed text-slate-300">{series.description}</p><p className="mt-3 text-sm text-slate-400">3 задачи · 10–15 минут · Без ограничения времени</p><Link to={`/tournaments/${series.id}`} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-[#08130e] hover:bg-emerald-300">Открыть серию <ArrowRight size={16} /></Link></section><p className="mt-5 text-sm leading-relaxed text-slate-400">Черновики и решённые задачи сохраняются в браузере. За эту личную практику нет рейтинга и наград.</p><div className="mt-5 flex flex-wrap gap-5"><Link to="/tournaments" className="inline-flex min-h-11 items-center text-sm text-emerald-300 underline underline-offset-4">Выбрать другую серию</Link><Link to="/pathways" className="inline-flex min-h-11 items-center text-sm text-emerald-300 underline underline-offset-4">Программа обучения</Link></div></div>;
}
