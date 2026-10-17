import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function Duel() {
  return <div className="mx-auto max-w-3xl px-4 pb-12 pt-24 sm:px-6"><h1 className="text-3xl font-bold tracking-tight text-white">Дуэли</h1><p className="mt-4 leading-relaxed text-slate-200">Соревновательные дуэли временно недоступны. Для честного сравнения результатов нужна независимая проверка решений на сервере.</p><p className="mt-3 leading-relaxed text-slate-300">Пока можно решать те же задачи самостоятельно в тренировочных сериях или писать код вместе в совместном редакторе.</p><div className="mt-6 flex flex-wrap gap-3"><Link to="/tournaments" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-[#08130e] hover:bg-emerald-300">Тренировочные серии <ArrowRight size={16} /></Link><Link to="/sandbox" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:border-emerald-300">Открыть песочницу</Link></div><Link to="/arcade" className="mt-5 inline-flex min-h-11 items-center text-sm text-emerald-300 underline underline-offset-4">Все игры</Link></div>;
}
