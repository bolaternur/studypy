async (page) => {
  // Isolate the runtime from React HMR while other work is still being edited.
  await page.route('**/runtime-test.html', (route) => route.fulfill({ contentType: 'text/html', body: '<!doctype html><title>StudyPy runtime tests</title><p>Runtime tests</p>' }));
  await page.goto('http://127.0.0.1:3000/runtime-test.html');
  const result = await page.evaluate(async () => {
    const { runPython, startPythonRun } = await import('/src/runtime/python.ts');
    const checks = [];
    const assert = (condition, name, detail) => {
      if (!condition) throw new Error(name + ': ' + JSON.stringify(detail));
      checks.push(name);
    };
    const syntax = await runPython({ code: 'for range(5)', tests: [{ expectedOutput: '0\n1\n2\n3\n4' }] });
    assert(!syntax.passed && /SyntaxError/.test(syntax.tests[0]?.error ?? ''), 'Pyodide real SyntaxError', syntax);
    const alternatives = await runPython({ code: 'add = lambda x, y: sum((x,y))', tests: [
      { expression: 'add(2, 3)', expectedValue: 5 },
      { expression: 'add(-4, 4)', expectedValue: 0 },
    ] });
    assert(alternatives.passed, 'Alternative Python solution', alternatives);
    const asynchronous = await runPython({ code: 'async def double(n):\n    return n * 2', tests: [{ expression: 'await double(3)', expectedValue: 6 }, { expression: 'await double(0)', expectedValue: 0 }] });
    assert(asynchronous.passed, 'Real async Python function evaluation', asynchronous);
    const noisyFunction = await runPython({ code: 'def add(a,b):\n    print("noise")\n    return a+b', tests: [{ expression: 'add(2,3)', expectedValue: 5, expectedCallOutput: '' }] });
    assert(!noisyFunction.passed && noisyFunction.tests[0].actualCallOutput === 'noise\n' && noisyFunction.output === '', 'Function call stdout is separately checked', noisyFunction);
    const comments = await runPython({ code: '# def return a + b', tests: [{ expectedOutput: '' }] });
    assert(!comments.passed, 'Comment cannot solve a task', comments);
    const setup = await runPython({ code: 'x=1', tests: [{ setup: 'print("correct")', expectedOutput: 'correct' }] });
    assert(!setup.passed && setup.output === '', 'Setup output cannot solve task', setup);
    const input = await runPython({ code: 'print("once")\na=input("A: ")\nb=input("B: ")\nprint(a+b)', stdin: ['x', 'y'] });
    assert(input.output === 'once\nA: B: xy\n', 'Input executes without replay', input);
    let run;
    let beats = 0;
    const heartbeat = setInterval(() => beats++, 20);
    run = startPythonRun({ code: 'while True:\n    pass', onStatus: (status) => {
      if (status === 'running') setTimeout(() => run.cancel(), 180);
    } });
    const stopped = await run.promise;
    clearInterval(heartbeat);
    assert(stopped.status === 'cancelled' && beats > 2, 'Stop infinite Python; UI remains responsive', { stopped, beats });
    const timed = await runPython({ code: 'while True:\n    pass', timeoutMs: 150 });
    assert(timed.status === 'timeout', 'Real worker execution deadline', timed);
    const recovery = await runPython({ code: 'print(42)' });
    assert(recovery.status === 'completed' && recovery.output === '42\n', 'New worker recovers after stop and timeout', recovery);
    const trace = await runPython({ code: 'import json\nitems = [[0]]\nfor n in range(3):\n    items[0].append(n)\nprint(json.dumps(items))', trace: true });
    const snapshots = trace.steps.filter((step) => step.variables.items).map((step) => step.variables.items);
    assert(JSON.stringify(snapshots[0]) === '[[0]]' && JSON.stringify(snapshots.at(-1)) === '[[0,0,1,2]]', 'Trace mutable snapshots are independent', trace);
    assert(trace.steps.every((step) => step.functionName === '<module>' && step.line <= 5), 'Trace contains user frames only', trace);
    const bot = await runPython({ code: 'for _ in range(2):\n    move_right()', setup: 'commands=[]\ndef move_right():\n    commands.append("right")', expression: 'commands' });
    assert(JSON.stringify(bot.value) === '["right","right"]', 'Game Python API returns actual executed commands', bot);
    return { checks, count: checks.length };
  });
  return result;
}
