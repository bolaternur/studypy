import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play, RotateCcw, Square, X } from 'lucide-react';
import { startPythonRun, type ExecutionStep } from '../runtime/python';

interface CodeVisualizerProps {
  code: string;
  stdin?: string[];
  isOpen: boolean;
  onClose: () => void;
}

export const CodeVisualizer: React.FC<CodeVisualizerProps> = ({ code, stdin = [], isOpen, onClose }) => {
  const [steps, setSteps] = useState<ExecutionStep[]>([]);
  const [index, setIndex] = useState(0);
  const [busy, setBusy] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState('');
  const [truncated, setTruncated] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const runRef = useRef<ReturnType<typeof startPythonRun> | null>(null);
  const stdinJson = JSON.stringify(stdin);

  const run = async () => {
    if (runRef.current) return;
    setBusy(true);
    setPlaying(false);
    setError('');
    setSteps([]);
    setIndex(0);
    const execution = startPythonRun({ code, stdin: JSON.parse(stdinJson), trace: true });
    runRef.current = execution;
    const result = await execution.promise;
    if (runRef.current !== execution) return;
    runRef.current = null;
    setBusy(false);
    setSteps(result.steps ?? []);
    setTruncated(result.traceTruncated ?? false);
    if (result.error) setError(result.error);
  };

  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    dialogRef.current?.showModal();
    closeRef.current?.focus();
    void run();
    return () => {
      runRef.current?.cancel();
      runRef.current = null;
      setBusy(false);
      setPlaying(false);
      dialogRef.current?.close();
      previousFocus?.focus();
    };
  }, [isOpen, code, stdinJson]);

  useEffect(() => {
    if (!playing || index >= steps.length - 1) { if (playing) setPlaying(false); return; }
    const timer = setTimeout(() => setIndex((value) => value + 1), 900);
    return () => clearTimeout(timer);
  }, [playing, index, steps.length]);

  if (!isOpen) return null;
  const step = steps[index];

  return (
    <dialog ref={dialogRef} aria-labelledby="trace-title" onCancel={(event) => { event.preventDefault(); onClose(); }}
      onKeyDown={(event) => { if (event.key === 'Escape') event.stopPropagation(); }}
      className="m-auto w-[calc(100%_-_1rem)] max-w-5xl max-h-[92dvh] p-0 rounded-xl border border-white/20 bg-[#10191c] text-gray-100 backdrop:bg-black/80">
      <div className="flex flex-wrap justify-between items-center gap-2 p-4 border-b border-white/15">
        <div><h2 id="trace-title" className="font-semibold text-xl">Код по шагам</h2><p className="text-sm text-gray-300 mt-1">Состояние перед строкой; событие «Возврат» показывает итог функции.</p></div>
        <button ref={closeRef} onClick={onClose} aria-label="Закрыть пошаговый просмотр" className="min-w-11 min-h-11 flex items-center justify-center rounded hover:bg-white/10"><X size={20} /></button>
      </div>
      <div className="p-4 flex flex-wrap items-center gap-2 border-b border-white/10">
        <button onClick={run} disabled={busy} className="flex gap-2 items-center min-h-11 px-3 border border-white/20 rounded disabled:opacity-50"><RotateCcw size={16} />Повторить</button>
        {busy ? <button onClick={() => runRef.current?.cancel()} className="flex gap-2 items-center min-h-11 px-3 border border-red-500 rounded text-red-200"><Square size={16} />Остановить</button> : <>
          <button onClick={() => { setIndex(Math.max(0, index - 1)); setPlaying(false); }} disabled={!steps.length || index === 0} className="min-h-11 px-3 border border-white/20 rounded disabled:opacity-40">Назад</button>
          <button onClick={() => setPlaying(!playing)} disabled={!steps.length || index === steps.length - 1} className="flex gap-2 items-center min-h-11 px-3 border border-teal-700 rounded text-teal-200 disabled:opacity-40">{playing ? <Pause size={16} /> : <Play size={16} />}{playing ? 'Пауза' : 'Авто'}</button>
          <button onClick={() => { setIndex(Math.min(steps.length - 1, index + 1)); setPlaying(false); }} disabled={!steps.length || index === steps.length - 1} className="min-h-11 px-3 bg-brand-primary text-black rounded disabled:opacity-40">Дальше</button>
        </>}
        <span className="text-sm text-gray-300 ml-auto" aria-live="polite">Шаг {steps.length ? index + 1 : 0} из {steps.length}</span>
      </div>
      {busy && <p role="status" className="p-4">Подготовка шагов Python…</p>}
      {error && <p role="alert" className="p-4 text-red-200 whitespace-pre-wrap break-words">{error}</p>}
      {truncated && <p className="px-4 py-2 text-amber-200 text-sm">Достигнут лимит шагов или объёма снимков. Для длинной программы выбери меньший пример.</p>}
      <div className="grid md:grid-cols-2 min-h-0">
        <div className="p-3 overflow-auto max-h-[42dvh] md:max-h-[50dvh] bg-black/20">
          {code.split('\n').map((line, lineIndex) => <div key={lineIndex} aria-current={step?.line === lineIndex + 1 ? 'step' : undefined}
            className={`flex gap-3 px-2 py-1 font-mono text-sm ${step?.line === lineIndex + 1 ? 'bg-emerald-900 text-white' : 'text-gray-300'}`}>
            <span className="w-6 shrink-0 text-right text-gray-400">{lineIndex + 1}</span><pre className="whitespace-pre-wrap break-words min-w-0">{line || ' '}</pre>
          </div>)}
        </div>
        <div className="p-4 overflow-auto max-h-[42dvh] md:max-h-[50dvh]">
          <h3 className="font-semibold mb-2">Переменные</h3>
          {step && <p className="text-xs text-gray-300 mb-3">{step.event === 'return' ? 'Возврат' : step.event === 'exception' ? 'Ошибка' : 'Перед выполнением строки'} · {step.functionName === '<module>' ? 'Основная программа' : step.functionName} · строка {step.line}</p>}
          <dl className="space-y-2">{Object.entries(step?.variables ?? {}).map(([name, value]) => <div key={name} className="border-b border-white/10 pb-2">
            <dt className="font-mono text-sm text-teal-200">{name}</dt><dd className="font-mono text-sm whitespace-pre-wrap break-words mt-1">{JSON.stringify(value)}</dd>
          </div>)}</dl>
          {!Object.keys(step?.variables ?? {}).length && <p className="text-sm text-gray-300">Переменные ещё не созданы.</p>}
          <h3 className="font-semibold mt-5 mb-2">Вывод к этому шагу</h3><pre className="font-mono text-sm whitespace-pre-wrap break-words">{step?.output || 'Пока нет вывода.'}</pre>
        </div>
      </div>
      <div className="p-4 border-t border-white/10"><input aria-label="Шаг выполнения" type="range" min={0} max={Math.max(0, steps.length - 1)} value={index} disabled={!steps.length} onChange={(event) => { setIndex(Number(event.target.value)); setPlaying(false); }} className="w-full accent-emerald-400 min-h-8" /></div>
    </dialog>
  );
};
