import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { CodeEditor } from '../components/CodeEditor';
import { BOSS_TASKS } from '../games/bosses';

export function BossArena() {
  const [activeId, setActiveId] = useState(BOSS_TASKS[0].id);
  const [completed, setCompleted] = useState<string[]>([]);
  const active = BOSS_TASKS.find(task => task.id === activeId)!;
  const done = completed.includes(active.id);
  return <div className="mx-auto max-w-5xl px-4 pb-12 pt-24 sm:px-6"><Link to="/arcade" className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm text-emerald-300"><ArrowLeft size={16} /> Все игры</Link><h1 className="text-3xl font-bold tracking-tight text-white">Испытания с функциями</h1><p className="mt-4 max-w-3xl leading-relaxed text-slate-300">Реши задачу настоящим Python и проверь разные входы. Ошибка — повод исправить код: штрафов нет. Проверка в браузере служит личной практике, поэтому XP, монеты и урон общему боссу не начисляются.</p><div className="mb-6 mt-6 flex flex-wrap gap-3">{BOSS_TASKS.map(task => <button key={task.id} onClick={() => setActiveId(task.id)} aria-pressed={task.id === activeId} className={`inline-flex min-h-11 items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold ${task.id === activeId ? 'border-emerald-300 text-emerald-200' : 'border-white/20 text-slate-200 hover:border-emerald-300'}`}>{task.title}{completed.includes(task.id) && <Check size={16} />}</button>)}</div><section><p className="text-sm text-slate-400">{active.level} · 10–15 минут</p><h2 className="mb-3 mt-2 text-2xl font-semibold text-white">{active.title}</h2><p className="mb-5 max-w-3xl leading-relaxed text-slate-200">{active.description}</p><CodeEditor key={active.id} initialCode={active.initialCode} testCases={active.tests} draftKey={`boss:${active.id}`} onSuccess={() => setCompleted(previous => previous.includes(active.id) ? previous : [...previous, active.id])} />{done && <div className="mt-5 rounded-xl border border-emerald-400/30 bg-[#101b19] p-5" role="status"><h3 className="inline-flex items-center gap-2 font-bold text-emerald-200"><Check size={18} /> Проверки пройдены</h3><p className="mt-2 leading-relaxed text-slate-300">{active.nextStep}</p></div>}<details className="mt-5 max-w-3xl text-sm text-slate-300"><summary className="min-h-11 cursor-pointer py-3 font-medium text-emerald-300">Подсказка к задаче</summary><p className="leading-relaxed">{active.hint}</p></details></section></div>;
}
