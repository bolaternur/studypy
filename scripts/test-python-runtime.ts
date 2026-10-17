import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { PYTHON_HARNESS } from '../src/runtime/pythonHarness';
import { startPythonRun } from '../src/runtime/python';
import { readDraft, writeDraft } from '../src/runtime/drafts';
import type { PythonRunResult, WorkerRequest, WorkerResponse } from '../src/runtime/protocol';

const python = process.env.PYTHON_BIN ?? (process.platform === 'win32' ? 'py' : 'python3');
let checks = 0;
function check(name: string, action: () => void) { action(); checks++; console.log(`PASS ${name}`); }

function evaluate(payload: WorkerRequest): PythonRunResult {
  const harness = `import sys\n_sp_payload_json = sys.stdin.read()\n${PYTHON_HARNESS}\nsys.stdout.write(_sp_json_result)`;
  const source = `import asyncio\nasync def run_harness():\n${harness.split('\n').map((line) => '    ' + line).join('\n')}\nasyncio.run(run_harness())`;
  const processResult = spawnSync(python, ['-c', source], {
    input: JSON.stringify(payload), encoding: 'utf8', timeout: 15000,
    env: { ...process.env, PYTHONUTF8: '1', PYTHONIOENCODING: 'utf-8' },
  });
  if (processResult.error) throw new Error(`Python is required for evaluator tests. Set PYTHON_BIN. ${processResult.error.message}`);
  assert.equal(processResult.status, 0, processResult.stderr);
  return JSON.parse(processResult.stdout);
}

check('invalid loop raises real SyntaxError', () => {
  const result = evaluate({ code: 'for range(5)', tests: [{ expectedOutput: '0\n1\n2\n3\n4' }] });
  assert.equal(result.passed, false);
  assert.match(result.tests[0].error!, /SyntaxError/);
});
check('empty, comments, string literals and pass do not solve a task', () => {
  for (const code of ['', '# def return a + b', '"def return a + b"', 'def add(a, b):\n    pass']) {
    assert.equal(evaluate({ code, tests: [{ expectedOutput: '' }] }).passed, false);
  }
});
check('correct alternative loop and function implementations pass', () => {
  assert.equal(evaluate({ code: 'i = 0\nwhile i < 5:\n    print(i)\n    i += 1', tests: [{ expectedOutput: '0\n1\n2\n3\n4' }] }).passed, true);
  for (const code of ['def add(a,b):\n    return sum((a,b))', 'add = lambda x, y: x - (-y)']) {
    const result = evaluate({ code, tests: [
      { expression: 'add(2,3)', expectedValue: 5 },
      { expression: 'add(-4,4)', expectedValue: 0 },
      { expression: 'add(0,-5)', expectedValue: -5 },
    ] });
    assert.equal(result.passed, true);
  }
});
check('constant function fails varied arguments', () => {
  const result = evaluate({ code: 'def add(a,b):\n    return 5', tests: [{ expression: 'add(2,3)', expectedValue: 5 }, { expression: 'add(-1,1)', expectedValue: 0 }] });
  assert.equal(result.passed, false);
});
check('async functions are actually awaited by function tests and in learner code', () => {
  const result = evaluate({ code: 'async def double(n):\n    return n * 2', tests: [{ expression: 'await double(4)', expectedValue: 8 }, { expression: 'await double(0)', expectedValue: 0 }] });
  assert.equal(result.passed, true);
  assert.equal(evaluate({ code: 'async def value():\n    return 42\nprint(await value())' }).output, '42\n');
});
check('bool and number results stay distinct, also inside nested structures', () => {
  for (const [expression, expectedValue] of [['1', true], ['True', 1], ['[1]', [true]], ['{"ok": 1}', { ok: true }]] as const) {
    assert.equal(evaluate({ code: 'x=1', tests: [{ expression, expectedValue }] }).passed, false);
  }
  assert.equal(evaluate({ code: 'x=1', tests: [{ expression: '[True, {"value": 2}]', expectedValue: [true, { value: 2 }] }] }).passed, true);
});
check('setup and expression cannot print the expected output for a learner', () => {
  const result = evaluate({ code: 'x = 1', tests: [{ setup: 'print("breakpoint")', expression: 'print("breakpoint")', expectedOutput: 'breakpoint' }] });
  assert.equal(result.passed, false);
  assert.equal(result.tests[0].actualOutput, '');
});
check('remainder checks actual remainder, not gold alone', () => {
  const tests = [{ expression: 'remainder', expectedValue: 1 }];
  assert.equal(evaluate({ code: 'gold = 100', tests }).passed, false);
  assert.equal(evaluate({ code: 'gold = 100\nremainder = gold % 3', tests }).passed, true);
});
check('a test function call does not add a second print to learner output', () => {
  const result = evaluate({ code: 'def add(a,b):\n    print(a+b)\n    return a+b\nprint("Готово")', tests: [{ expression: 'add(2,3)', expectedOutput: 'Готово', expectedValue: 5 }] });
  assert.equal(result.passed, true);
  assert.equal(result.output, 'Готово\n');
});
check('function call output is checked separately when the task forbids print', () => {
  const tests = [{ expression: 'add(2,3)', expectedValue: 5, expectedCallOutput: '' }];
  for (const printed of ['print("noise")', 'print()']) {
    const result = evaluate({ code: `def add(a,b):\n    ${printed}\n    return a+b`, tests });
    assert.equal(result.passed, false);
    assert.equal(result.output, '');
    assert.match(result.tests[0].message, /Вывод функции/);
  }
  assert.equal(evaluate({ code: 'def add(a,b):\n    return a+b', tests }).passed, true);
});
check('stdin runs once and missing stdin gives actionable EOFError', () => {
  const result = evaluate({ code: 'print("один раз")\nname = input("Имя: ")\nprint(name)', stdin: ['Ада'] });
  assert.equal(result.output, 'один раз\nИмя: Ада\n');
  const missing = evaluate({ code: 'print("один раз")\ninput()' });
  assert.equal(missing.output, 'один раз\n');
  assert.match(missing.error!, /EOFError.*входных строк/);
});
check('input prompt remains part of stdout during task verification', () => {
  const code='name = input("Имя: ")\nprint(name)';
  assert.equal(evaluate({code,tests:[{stdin:['Ада'],expectedOutput:'Ада'}]}).passed,false);
  assert.equal(evaluate({code,tests:[{stdin:['Ада'],expectedOutput:'Имя: Ада'}]}).passed,true);
});
check('different test cases get fresh namespaces', () => {
  const result = evaluate({ code: 'counter = globals().get("counter", 0) + 1\nprint(counter)', tests: [{ expectedOutput: '1' }, { expectedOutput: '1' }] });
  assert.equal(result.passed, true);
});
check('trace filters imported code and preserves nested mutable snapshots', () => {
  const result = evaluate({ code: 'import json\nitems = [[0]]\nfor n in range(3):\n    items[0].append(n)\nprint(json.dumps(items))', trace: true });
  assert.equal(result.status, 'completed');
  const snapshots = result.steps!.filter((step) => step.variables.items).map((step) => step.variables.items);
  assert.deepEqual(snapshots[0], [[0]]);
  assert.deepEqual(snapshots[snapshots.length - 1], [[0, 0, 1, 2]]);
  assert.ok(result.steps!.every((step) => step.line >= 1 && step.line <= 5));
  assert.ok(result.steps!.every((step) => step.functionName === '<module>'));
});
check('trace and output have real size limits', () => {
  const trace = evaluate({ code: 'for i in range(500):\n    x = i', trace: true });
  assert.equal(trace.steps!.length, 250);
  assert.equal(trace.traceTruncated, true);
  const output = evaluate({ code: 'print("x" * 1000000)', outputLimit: 1000 });
  assert.equal(output.status, 'error');
  assert.equal(output.output.length, 1000);
});
check('trace handles cycles and non-finite floats without invalid JSON', () => {
  const result = evaluate({ code: 'items=[]\nitems.append(items)\nx=float("nan")\nprint("ok")', trace: true });
  assert.equal(result.status, 'completed');
  assert.equal(result.output, 'ok\n');
  assert.ok(result.steps!.some((step) => step.variables.x === 'nan'));
});
check('legacy executable input is rejected instead of producing false progress', () => {
  const result = evaluate({ code: 'x=1', tests: [{ input: 'print("correct")', expectedOutput: 'correct' } as any] });
  assert.equal(result.passed, false);
  assert.match(result.tests[0].error!, /устаревший формат/);
});

class FakeWorker {
  static instances: FakeWorker[] = [];
  static complete = true;
  onmessage: ((event: MessageEvent<WorkerResponse>) => void) | null = null;
  onerror: ((event: ErrorEvent) => void) | null = null;
  terminated = false;
  constructor() { FakeWorker.instances.push(this); }
  postMessage() {
    queueMicrotask(() => {
      this.onmessage?.(new MessageEvent('message', { data: { type: 'ready' } }));
      if (FakeWorker.complete) this.onmessage?.(new MessageEvent('message', { data: { type: 'result', result: { status: 'completed', output: 'ok', passed: true, tests: [] } } }));
    });
  }
  terminate() { this.terminated = true; }
}

Object.defineProperty(globalThis, 'Worker', { configurable: true, value: FakeWorker });
FakeWorker.complete = false;
const cancelledRun = startPythonRun({ code: 'while True: pass' });
cancelledRun.cancel();
cancelledRun.cancel();
assert.equal((await cancelledRun.promise).status, 'cancelled');
assert.equal(FakeWorker.instances.at(-1)!.terminated, true);
checks++; console.log('PASS stopping terminates the worker exactly once and settles');
const timedRun = await startPythonRun({ code: 'while True: pass', timeoutMs: 100 }).promise;
assert.equal(timedRun.status, 'timeout');
assert.equal(FakeWorker.instances.at(-1)!.terminated, true);
checks++; console.log('PASS timeout terminates worker');
FakeWorker.complete = true;
const recovered = await startPythonRun({ code: 'print("ok")' }).promise;
assert.equal(recovered.status, 'completed');
assert.equal(recovered.output, 'ok');
assert.equal(FakeWorker.instances.at(-1)!.terminated, true);
checks++; console.log('PASS a new run recovers after stop and timeout');

const memory = new Map<string, string>();
Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: { getItem: (key: string) => memory.get(key) ?? null, setItem: (key: string, value: string) => memory.set(key, value) } });
check('drafts survive reload and stay scoped to a task', () => {
  assert.equal(writeDraft('lesson:one:0', 'print(1)'), true);
  assert.equal(writeDraft('lesson:one:1', 'print(2)'), true);
  assert.equal(readDraft('lesson:one:0', '# template'), 'print(1)');
  assert.equal(readDraft('lesson:one:1', '# template'), 'print(2)');
  assert.equal(readDraft('lesson:two:0', '# template'), '# template');
  writeDraft('lesson:one:0', '');
  assert.equal(readDraft('lesson:one:0', '# template'), '');
});
console.log(`${checks} runtime behavioral checks passed. CPython evaluator + worker lifecycle mocks; real Pyodide must also be checked in-browser.`);
