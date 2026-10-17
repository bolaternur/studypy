import { PYTHON_HARNESS } from './pythonHarness';
import type { WorkerRequest, WorkerResponse } from './protocol';

const scope = self as unknown as {
  onmessage: ((event: MessageEvent<WorkerRequest>) => void) | null;
  postMessage: (message: WorkerResponse) => void;
};

scope.onmessage = async ({ data }) => {
  try {
    const indexURL = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/';
    const loaderUrl = `${indexURL}pyodide.mjs`;
    const { loadPyodide } = await import(/* @vite-ignore */ loaderUrl);
    const pyodide = await loadPyodide({ indexURL });
    // Pyodide ships some stdlib extensions (including sqlite3) as optional packages.
    // Inspect only syntax here. Invalid student code must reach the evaluator's real
    // SyntaxError feedback instead of being reported as a failed package download.
    const sources = [data.code, data.setup ?? '', ...(data.tests ?? []).map((test) => test.setup ?? '')].join('\n');
    pyodide.globals.set('_sp_source_for_imports', sources);
    const syntaxValid = pyodide.runPython(`
import ast
try:
    ast.parse(_sp_source_for_imports)
    _sp_can_load_imports = True
except (SyntaxError, ValueError):
    _sp_can_load_imports = False
_sp_can_load_imports
`);
    if (syntaxValid) await pyodide.loadPackagesFromImports(sources);
    scope.postMessage({ type: 'ready' });
    pyodide.globals.set('_sp_payload_json', JSON.stringify(data));
    const json = await pyodide.runPythonAsync(`${PYTHON_HARNESS}\n_sp_json_result`);
    scope.postMessage({ type: 'result', result: JSON.parse(json) });
  } catch (error) {
    console.error('Python worker initialization failed', error);
    scope.postMessage({
      type: 'result',
      result: {
        status: 'error', passed: false, tests: [], output: '',
        error: 'Не удалось запустить Python. Проверь подключение и повтори запуск.',
      },
    });
  }
};
