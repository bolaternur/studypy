import React, { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { CodeEditor } from '../components/CodeEditor';
import { TOURNAMENTS, TRAINING_ALIASES } from './Tournaments';

import { TASKS_BY_TYPE } from '../games/training';

const button = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:border-emerald-300';
function TrainingSeries({ seriesId }: { seriesId: string }) {
  const series = TOURNAMENTS.find(item => item.id === seriesId)!;
  const tasks = TASKS_BY_TYPE[series.type];
  const storageKey = `studypy:training:v2:${seriesId}`;
  const [completed, setCompleted] = useState<string[]>(() => {
    try { const stored = JSON.parse(localStorage.getItem(storageKey) || '[]'); return Array.isArray(stored) ? stored.filter(id => tasks.some(task => task.id === id)) : []; } catch { return []; }
  });
  const [index, setIndex] = useState(() => Math.min(tasks.findIndex(task => !completed.includes(task.id)) < 0 ? tasks.length - 1 : tasks.findIndex(task => !completed.includes(task.id)), tasks.length - 1));
  const [finished, setFinished] = useState(false);
  const [saved, setSaved] = useState(true);
  const task = tasks[index];
  const solved = completed.includes(task.id);
  const accepted = useRef(new Set(completed));
  useEffect(() => { try { localStorage.setItem(storageKey, JSON.stringify(completed)); setSaved(true); } catch { setSaved(false); } }, [storageKey, completed]);
  const complete = () => {
    if (accepted.current.has(task.id)) return;
    accepted.current.add(task.id);
    setCompleted(previous => [...previous, task.id]);
  };
  return <div className="mx-auto max-w-5xl px-4 pb-12 pt-24 sm:px-6"><Link className={`${button} mb-6`} to="/tournaments"><ArrowLeft size={16} /> Все серии</Link><h1 className="text-3xl font-bold text-white">{series.title}</h1><p className="mt-3 text-sm leading-relaxed text-slate-300">Личная практика без ограничения времени. Проверка в браузере не подтверждает соревновательный результат.</p>{finished ? <section className="mt-6 rounded-xl border border-white/15 bg-[#101b19] p-6"><h2 className="text-2xl font-bold text-white">Серия завершена</h2><p className="mt-3 text-lg text-emerald-200">Решено задач: {completed.length} из {tasks.length}.</p><ul className="mt-5 space-y-2 text-slate-200">{tasks.map(item => <li key={item.id}>{completed.includes(item.id) ? 'Решено' : 'Осталось решить'}: {item.description.split('.')[0]}.</li>)}</ul><p className="mt-5 text-slate-300">{completed.length === tasks.length ? 'Попробуй изменить входные данные и объяснить, почему функция возвращает такой результат.' : 'Вернись к незавершённым задачам. Для функции полезно проверить обычный случай, ноль и пустое значение, если они допустимы по условию.'}</p><p className="mt-3 text-sm text-slate-400">{saved ? 'Пройденные задачи и черновики сохранены в этом браузере.' : 'Браузер не разрешил сохранить прогресс. Скопируй код перед уходом.'}</p><div className="mt-6 flex flex-wrap gap-3"><button className={button} onClick={() => { setFinished(false); setIndex(Math.max(0, tasks.findIndex(item => !completed.includes(item.id)))); }}>Вернуться к задачам</button><Link className={button} to="/tournaments">Другая серия <ArrowRight size={16} /></Link></div></section> : <section className="mt-6"><div className="mb-4 flex flex-wrap gap-3">{tasks.map((item, taskIndex) => <button key={item.id} className={`${button} ${index === taskIndex ? 'border-emerald-300 text-emerald-200' : ''}`} onClick={() => setIndex(taskIndex)} aria-pressed={index === taskIndex}>Задача {taskIndex + 1}{completed.includes(item.id) && <Check size={16} aria-label="Решено" />}</button>)}</div><p className="mb-5 max-w-3xl text-lg leading-relaxed text-white">{task.description}</p><CodeEditor key={task.id} initialCode={task.initialCode} testCases={task.testCases} lessonId={`training_${series.id}_${task.id}`} onSuccess={complete} /><div className="mt-5 flex flex-wrap items-center gap-3">{solved && <p role="status" className="inline-flex items-center gap-2 font-medium text-emerald-200"><Check size={18} /> Задача решена</p>}{solved && index < tasks.length - 1 && <button onClick={() => setIndex(previous => previous + 1)} className={button}>Следующая задача <ArrowRight size={16} /></button>}<button onClick={() => setFinished(true)} className={button}>{completed.length === tasks.length ? 'Посмотреть итог' : 'Завершить серию'}</button></div><p className="mt-4 text-sm text-slate-400">{saved ? 'Прогресс хранится на этом устройстве.' : 'Сохранение на устройстве недоступно.'}</p></section>}</div>;
}

export function TournamentArena() {
  const { id = '' } = useParams();
  if (TRAINING_ALIASES[id]) return <Navigate replace to={`/tournaments/${TRAINING_ALIASES[id]}`} />;
  if (!TOURNAMENTS.some(series => series.id === id)) return <div className="mx-auto max-w-3xl px-4 pb-12 pt-24"><h1 className="text-3xl font-bold text-white">Серия не найдена</h1><Link className={`${button} mt-6`} to="/tournaments">Все серии</Link></div>;
  return <TrainingSeries key={id} seriesId={id} />;
}
