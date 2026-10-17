import React, { useCallback, useEffect, useRef, useState } from 'react';
import Editor, { loader } from '@monaco-editor/react';
import { CheckCircle, Eye, Loader2, Play, Square, XCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { CodeVisualizer } from './CodeVisualizer';
import { startPythonRun, type PythonRunResult, type PythonTest } from '../runtime/python';
import { readDraft, writeDraft } from '../runtime/drafts';

export interface CodeEditorProps {
  initialCode: string;
  testCases?: PythonTest[];
  onSuccess?: () => void;
  onFailure?: () => void;
  onError?: (message: string) => void;
  onChange?: (code: string) => void;
  onCodeChange?: (code: string) => void;
  hideControls?: boolean;
  readOnly?: boolean;
  lessonId?: string;
  draftKey?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = React.memo(({
  initialCode, testCases = [], onSuccess, onFailure, onError, onChange, onCodeChange,
  hideControls = false, readOnly = false, lessonId, draftKey,
}) => {
  const fallbackKey = useRef(lessonId ? `${lessonId}:${initialCode.slice(0, 80)}:${testCases[0]?.description ?? ''}` : undefined);
  const storageKey = readOnly ? undefined : draftKey ?? fallbackKey.current;
  const [code, setCode] = useState(() => readDraft(storageKey, initialCode));
  const [stdin, setStdin] = useState('');
  const [result, setResult] = useState<PythonRunResult | null>(null);
  const [phase, setPhase] = useState<'idle' | 'loading' | 'running'>('idle');
  const [activeTab, setActiveTab] = useState<'output' | 'tests' | 'history'>('output');
  const [isVisualizerOpen, setIsVisualizerOpen] = useState(false);
  const [plainEditor, setPlainEditor] = useState(false);
  const [storageError, setStorageError] = useState('');
  const [history, setHistory] = useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const { currentUser, setLastCodeResult, saveSubmission, getSubmissions } = useAuth();
  const runRef = useRef<ReturnType<typeof startPythonRun> | null>(null);
  const identityRef = useRef(storageKey);
  const initialRef = useRef(initialCode);
  const codeRef = useRef(code);
  const aliveRef = useRef(true);
  const isRunning = phase !== 'idle';

  useEffect(() => {
    aliveRef.current = true;
    return () => { aliveRef.current = false; runRef.current?.cancel(); runRef.current = null; };
  }, []);

  useEffect(() => {
    if (identityRef.current !== storageKey) {
      runRef.current?.cancel();
      runRef.current = null;
      const restored = readDraft(storageKey, initialCode);
      codeRef.current = restored;
      setCode(restored);
      setResult(null);
      setPhase('idle');
    } else if (initialRef.current !== initialCode && initialCode !== codeRef.current) {
      codeRef.current = initialCode;
      setCode(initialCode);
      writeDraft(storageKey, initialCode);
      setResult(null);
    }
    identityRef.current = storageKey;
    initialRef.current = initialCode;
  }, [storageKey, initialCode]);

  useEffect(() => {
    let mounted = true;
    const timer = setTimeout(() => { if (mounted) setPlainEditor(true); }, 12000);
    void loader.init().then(() => clearTimeout(timer)).catch(() => {
      if (mounted) setPlainEditor(true);
    });
    return () => { mounted = false; clearTimeout(timer); };
  }, []);

  const handleCodeChange = useCallback((value: string | undefined) => {
    const next = value ?? '';
    codeRef.current = next;
    setCode(next);
    if (!writeDraft(storageKey, next)) setStorageError('Не удалось сохранить черновик на устройстве. Скопируй код перед выходом.');
    onChange?.(next);
    onCodeChange?.(next);
  }, [storageKey, onChange, onCodeChange]);

  useEffect(() => {
    if (activeTab !== 'history') return;
    let active = true;
    setHistoryLoading(true);
    void getSubmissions(lessonId ?? 'sandbox').then((items) => {
      if (active) setHistory(items);
    }).catch(() => {
      if (active) setStorageError('История аккаунта сейчас недоступна. Черновик остаётся на устройстве.');
    }).finally(() => { if (active) setHistoryLoading(false); });
    return () => { active = false; };
  }, [activeTab, lessonId, getSubmissions]);

  const runCode = async () => {
    if (runRef.current) return;
    setResult(null);
    setPhase('loading');
    setActiveTab(testCases.length ? 'tests' : 'output');
    const submittedCode = codeRef.current;
    const run = startPythonRun({
      code: submittedCode, tests: testCases,
      stdin: stdin === '' ? [] : stdin.replace(/\r/g, '').split('\n'),
      onStatus: (next) => { if (aliveRef.current) setPhase(next); },
    });
    runRef.current = run;
    const next = await run.promise;
    if (!aliveRef.current || runRef.current !== run) return;
    runRef.current = null;
    setPhase('idle');
    setResult(next);
    const passed = next.status === 'completed' && next.passed;
    setLastCodeResult({ success: passed, message: passed ? (testCases.length ? 'Программа прошла проверку.' : 'Программа завершена.') : next.error ?? 'Проверь результат и исправь код.', timestamp: Date.now() });
    if (next.status === 'cancelled' || next.status === 'timeout') {
      setActiveTab('output');
      onError?.(next.error ?? 'Выполнение остановлено.');
      return;
    }
    if (testCases.length && next.tests.length && currentUser) {
      void saveSubmission(lessonId ?? 'sandbox', submittedCode, next.tests).catch(() => {
        if (aliveRef.current) setStorageError('Не удалось сохранить попытку в аккаунте. Код остаётся на устройстве.');
      });
    }
    if (passed) onSuccess?.();
    else { onFailure?.(); if (next.error) onError?.(next.error); }
  };

  const editor = plainEditor ? (
    <textarea aria-label="Код Python" value={code} readOnly={readOnly}
      onChange={(event) => handleCodeChange(event.target.value)} spellCheck={false}
      className="w-full h-full min-h-[200px] resize-y bg-[#12191d] text-gray-100 p-4 font-mono text-sm leading-6 outline-offset-[-3px]" />
  ) : (
    <Editor height="100%" defaultLanguage="python" theme="vs-dark" value={code} onChange={handleCodeChange}
      loading={<div className="p-4 text-sm text-gray-300">Загрузка редактора… <button type="button" className="underline ml-2 min-h-11" onClick={() => setPlainEditor(true)}>Открыть простой редактор</button></div>}
      options={{ minimap: { enabled: false }, fontSize: 14, fontFamily: 'Consolas, "Courier New", monospace', padding: { top: 16, bottom: 16 }, scrollBeyondLastLine: false, automaticLayout: true, readOnly, fixedOverflowWidgets: true, tabSize: 4 }} />
  );

  if (hideControls) return <div className="border border-white/15 rounded-lg overflow-hidden">
    <div className="h-[300px]">{editor}</div>
    <button type="button" onClick={() => setPlainEditor(!plainEditor)} className="min-h-11 px-3 text-sm text-gray-200 underline">{plainEditor ? 'Редактор с подсветкой' : 'Простой редактор'}</button>
    {storageError && <p role="status" className="px-3 pb-3 text-xs text-amber-200">{storageError}</p>}
  </div>;

  return (
    <div className="flex flex-col gap-3 w-full min-w-0">
      <CodeVisualizer code={code} stdin={stdin === '' ? [] : stdin.split('\n')} isOpen={isVisualizerOpen} onClose={() => setIsVisualizerOpen(false)} />
      <div className="border border-white/15 rounded-lg overflow-hidden bg-[#12191d]">
        <div className="flex flex-wrap justify-between items-center gap-2 px-3 py-2 border-b border-white/10">
          <span className="text-sm text-gray-300 font-mono">main.py</span>
          <div className="flex gap-2">
            <button type="button" onClick={() => setIsVisualizerOpen(true)} disabled={isRunning} className="flex items-center gap-2 min-h-11 px-3 text-sm text-teal-300 border border-teal-700 rounded-md disabled:opacity-50"><Eye size={16} aria-hidden="true" />По шагам</button>
            {isRunning ? (
              <button type="button" onClick={() => runRef.current?.cancel()} className="flex items-center gap-2 min-h-11 px-3 rounded-md border border-red-400 text-red-200"><Square size={16} aria-hidden="true" />Остановить</button>
            ) : (
              <button type="button" onClick={runCode} className="flex items-center gap-2 min-h-11 px-4 rounded-md bg-brand-primary text-black font-semibold"><Play size={16} aria-hidden="true" />{testCases.length ? 'Проверить' : 'Запустить'}</button>
            )}
          </div>
        </div>
        <div className="h-[260px] md:h-[320px] relative">{editor}</div>
        <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 border-t border-white/10 text-xs text-gray-400">
          <span>{storageKey ? 'Черновик сохраняется на этом устройстве' : 'Код Python'}</span>
          <button type="button" onClick={() => setPlainEditor(!plainEditor)} className="underline min-h-8">{plainEditor ? 'Редактор с подсветкой' : 'Простой редактор'}</button>
        </div>
        {plainEditor && <p className="px-3 pb-3 text-xs text-gray-300">Простой редактор работает, даже если подсветка кода недоступна.</p>}
      </div>
      {!testCases.length && <details className="border border-white/10 rounded-lg px-3 py-2">
        <summary className="cursor-pointer min-h-8 text-sm text-gray-200">Ввод для input()</summary>
        <p className="text-xs text-gray-300 mb-2">Введи значения до запуска: по одному на строку. Программа выполнится один раз.</p>
        <textarea aria-label="Ввод для input()" value={stdin} onChange={(event) => setStdin(event.target.value)} rows={3} className="w-full bg-black/30 border border-white/20 rounded p-2 font-mono text-sm" />
      </details>}
      {storageError && <p role="status" className="text-sm text-amber-200">{storageError}</p>}
      <section className="border border-white/15 rounded-lg overflow-hidden bg-[#080d10]" aria-label="Результат выполнения">
        <div className="flex flex-wrap border-b border-white/10">
          {(['output', ...(testCases.length ? ['tests'] : []), 'history'] as const).map((tab) => (
            <button type="button" key={tab} onClick={() => setActiveTab(tab as typeof activeTab)} aria-pressed={activeTab === tab}
              className={`min-h-11 px-4 text-sm border-b-2 ${activeTab === tab ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-300'}`}>
              {tab === 'output' ? 'Вывод' : tab === 'tests' ? 'Проверки' : 'История'}
            </button>
          ))}
        </div>
        <div className="min-h-[150px] max-h-[360px] overflow-auto p-4 text-sm" aria-live="polite" aria-busy={isRunning}>
          {isRunning && <p className="flex items-center gap-2 text-gray-200"><Loader2 size={16} className="animate-spin" />{phase === 'loading' ? 'Загрузка Python…' : 'Программа выполняется…'}</p>}
          {activeTab === 'output' && <>
            <pre className="font-mono whitespace-pre-wrap break-words text-gray-100">{result?.output ?? (!isRunning ? 'Запусти программу, чтобы увидеть результат.' : '')}</pre>
            {result?.error && <p role="alert" className="mt-3 text-red-200 whitespace-pre-wrap break-words">{result.error}</p>}
            {result?.status === 'completed' && !result.output && !testCases.length && <p className="text-gray-300">Программа завершена без вывода.</p>}
          </>}
          {activeTab === 'tests' && <>
            {result?.tests.map((test, index) => <div key={index} className={`flex gap-3 p-3 mb-2 rounded-md border ${test.passed ? 'border-emerald-800 text-emerald-200' : 'border-red-800 text-red-200'}`}>
              {test.passed ? <CheckCircle size={18} className="shrink-0" aria-hidden="true" /> : <XCircle size={18} className="shrink-0" aria-hidden="true" />}
              <div className="min-w-0"><p className="font-semibold">Проверка {index + 1}: {test.passed ? 'пройдена' : 'не пройдена'}</p><p className="whitespace-pre-wrap break-words mt-1">{test.message}</p></div>
            </div>)}
            {result?.error && <p role="alert" className="text-red-200">{result.error}</p>}
            {!result && !isRunning && <p className="text-gray-300">Нажми «Проверить», чтобы сравнить результат с условием.</p>}
            {result?.passed && <p className="text-emerald-200">Все проверки пройдены.</p>}
          </>}
          {activeTab === 'history' && (historyLoading ? <p>Загрузка истории…</p> : history.length ? history.map((item, index) => (
            <button type="button" key={index} onClick={() => handleCodeChange(item.code)} className="w-full p-3 mb-2 border border-white/15 rounded text-left min-h-11">
              <span className="block text-gray-300">{new Date(item.timestamp?.toMillis?.() ?? Date.now()).toLocaleString('ru-RU')}</span><code className="block truncate">{item.code}</code>
            </button>
          )) : <p className="text-gray-300">{currentUser ? 'Сохранённых попыток пока нет.' : 'История попыток доступна после входа. Текущий черновик сохранён на устройстве.'}</p>)}
        </div>
      </section>
    </div>
  );
});
