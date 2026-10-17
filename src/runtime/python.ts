import type { PythonRunOptions, PythonRunResult, WorkerResponse } from './protocol';
export type { PythonRunOptions, PythonRunResult, PythonTest, PythonTestResult, ExecutionStep } from './protocol';

export interface PythonRun {
  promise: Promise<PythonRunResult>;
  cancel: () => void;
}

/** A disposable worker isolates every run. Stop/timeout terminates Python, including native loops. */
export function startPythonRun(options: PythonRunOptions): PythonRun {
  let cancel = () => {};
  const promise = new Promise<PythonRunResult>((resolve) => {
    let worker: Worker | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let settled = false;
    const finish = (result: PythonRunResult) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      options.signal?.removeEventListener('abort', cancel);
      worker?.terminate();
      resolve(result);
    };
    cancel = () => finish({ status: 'cancelled', passed: false, tests: [], output: '', error: 'Выполнение остановлено.' });
    if (options.signal?.aborted) { cancel(); return; }
    options.signal?.addEventListener('abort', cancel, { once: true });
    try {
      options.onStatus?.('loading');
      worker = new Worker(new URL('./python.worker.ts', import.meta.url), { type: 'module' });
      // Loading has its own deadline; execution gets the full allowance after ready.
      timer = setTimeout(() => finish({ status: 'error', passed: false, tests: [], output: '', error: 'Среда Python не загрузилась за 45 секунд. Проверь сеть и повтори запуск.' }), 45000);
      worker.onmessage = ({ data }: MessageEvent<WorkerResponse>) => {
        if (data.type === 'ready') {
          if (settled) return;
          clearTimeout(timer);
          options.onStatus?.('running');
          const timeout = Math.min(30000, Math.max(100, options.timeoutMs ?? 5000));
          timer = setTimeout(() => finish({ status: 'timeout', passed: false, tests: [], output: '', error: `Программа остановлена по лимиту времени (${timeout / 1000} с). Проверь условие цикла.` }), timeout);
        } else finish(data.result);
      };
      worker.onerror = (event) => {
        event.preventDefault();
        finish({ status: 'error', passed: false, tests: [], output: '', error: 'Не удалось загрузить среду Python. Проверь подключение и повтори запуск.' });
      };
      const { signal: _signal, onStatus: _onStatus, ...payload } = options;
      worker.postMessage(payload);
    } catch (error) {
      finish({ status: 'error', passed: false, tests: [], output: '', error: error instanceof Error ? error.message : 'Среда Python недоступна. Повтори запуск.' });
    }
  });
  return { promise, cancel: () => cancel() };
}

export const runPython = (options: PythonRunOptions): Promise<PythonRunResult> => startPythonRun(options).promise;
