import assert from 'node:assert/strict';
import { answerQuiz, newQuiz, nextQuizQuestion, quizResult, QUIZZES, ROBOT_LEVELS, ROBOT_EXPRESSION, robotSetup, robotSolved } from '../src/games/arcade';
import { advanceSnake, newSnake } from '../src/games/snake';
import { spawnSync } from 'node:child_process';
import { PYTHON_HARNESS } from '../src/runtime/pythonHarness';
import { BOSS_TASKS } from '../src/games/bosses';
import { TASKS_BY_TYPE } from '../src/games/training';
import type { PythonRunResult, PythonTest } from '../src/runtime/python';

const python = process.env.PYTHON_BIN ?? (process.platform === 'win32' ? 'py' : 'python3');
function evaluate(code: string, tests: PythonTest[]): PythonRunResult {
  const harness = `import sys\n_sp_payload_json = sys.stdin.read()\n${PYTHON_HARNESS}\nsys.stdout.write(_sp_json_result)`;
  const source = `import asyncio\nasync def run_harness():\n${harness.split('\n').map(line => '    ' + line).join('\n')}\nasyncio.run(run_harness())`;
  const result = spawnSync(python, ['-c', source], { input: JSON.stringify({ code, tests }), encoding: 'utf8', timeout: 10000, env: { ...process.env, PYTHONUTF8: '1', PYTHONIOENCODING: 'utf-8' } });
  assert.equal(result.error, undefined, 'Set PYTHON_BIN to an installed Python executable');
  assert.equal(result.status, 0, result.stderr);
  return JSON.parse(result.stdout);
}

const questions = QUIZZES.regexracer.questions;
let state = newQuiz();
for (const question of questions) {
  const wrong = (question.correct + 1) % question.options.length;
  const answered = answerQuiz(state, questions, wrong);
  assert.equal(answerQuiz(answered, questions, question.correct), answered, 'A repeat click cannot overwrite the first answer');
  state = nextQuizQuestion(answered, questions);
}
assert.equal(state.finished, true);
assert.equal(quizResult(state, questions).correct, 0);
assert.equal(quizResult(state, questions).mistakes.length, questions.length);
assert.equal(quizResult(state, questions).title, 'Серия завершена', 'All wrong answers must never produce a mastery title');
assert.equal(nextQuizQuestion(newQuiz(), questions).index, 0, 'Cannot skip an unanswered question');
let correctState = newQuiz();
for (const question of questions) correctState = nextQuizQuestion(answerQuiz(correctState, questions, question.correct), questions);
assert.equal(quizResult(correctState, questions).correct, questions.length);

for (const [id, quiz] of Object.entries(QUIZZES)) {
  assert.ok(quiz.questions.length >= 6, `${id} has enough varied exercises for a short series`);
  assert.equal(new Set(quiz.questions.map(q => q.id)).size, quiz.questions.length, `${id} question IDs must be unique`);
  for (const q of quiz.questions) {
    assert.ok(q.options[q.correct] !== undefined);
    assert.ok(q.explanation.trim().length > 30, `${id}/${q.id} explains its answer`);
  }
}

const initial = newSnake();
assert.equal(initial.moves, 0);
let snake = advanceSnake(initial, 'right', 3);
assert.deepEqual(initial.body, [[0, 0]], 'Each step preserves previous snapshots');
assert.deepEqual(snake.body[0], [3, 0]);
assert.equal(snake.gems.length, 2);
snake = advanceSnake(snake, 'down', 3);
snake = advanceSnake(snake, 'left', 3);
assert.equal(snake.gems.length, 0);
assert.equal(snake.moves, 9);
assert.equal(advanceSnake(snake, 'right', 1), snake, 'A completed route cannot be scored again');
const failed = advanceSnake(newSnake(), 'left', 1);
assert.equal(failed.failed, true);
assert.equal(failed.gems.length, 3, 'A failed game does not claim a win');
assert.equal(advanceSnake(failed, 'right', 1), failed);
assert.equal(advanceSnake(newSnake(), 'right', 0).moves, 0);

const level = ROBOT_LEVELS[0];
assert.equal(robotSolved(level, { position: [0, 0], gems: level.gems, path: [[0, 0]] }), false);
assert.equal(robotSolved(level, { position: [...level.goal], gems: [], path: [[0, 0], [1, 0], [2, 0], [...level.goal]] }), true);
assert.equal(robotSolved(level, { position: [...level.goal], gems: [], path: [[0, 0], [...level.goal]] }), false, 'Forging only a final coordinate cannot win');
assert.equal(robotSolved(level, { position: [...level.goal], gems: [], path: [[0, 0], [0, 1], [1, 1], [...level.goal]] }), false, 'A fabricated path through a wall cannot win');
// Exercise exactly the Python setup shipped to the worker. No JavaScript parser.
const snippets = [
  { code: 'move_right()\nmove_right()\nmove_down()', success: true },
  { code: 'for _ in range(2):\n    move_right()\nmove_down()', success: true },
  { code: 'def route():\n    for _ in range(2):\n        move_right()\n    move_down()\nroute()', success: true },
  { code: 'for range(5)', success: false },
  { code: '# move_right() move_down()', success: false },
  { code: '"move_right() move_down()"', success: false },
  { code: '', success: false },
  { code: 'pass', success: false },
  { code: `_robot = {"position": ${JSON.stringify(level.goal)}, "gems": [], "path": [[0, 0], ${JSON.stringify(level.goal)}]}`, success: false },
  { code: 'move_down()\nmove_right()', success: false },
];
for (const snippet of snippets) {
  const script = `${robotSetup(level)}\n${snippet.code}\n_state = ${ROBOT_EXPRESSION}\nassert _state['position'] == ${JSON.stringify(level.goal)} and not _state['gems']`;
  const result = spawnSync(python, ['-c', script], { encoding: 'utf8', env: { ...process.env, PYTHONUTF8: '1', PYTHONIOENCODING: 'utf-8' } });
  assert.equal(result.error, undefined, 'Python must be available for game runtime regression checks');
  assert.equal(result.status === 0, snippet.success, `Robot: ${JSON.stringify(snippet.code)}\n${result.stderr}`);
}
for (const [index, solution] of [
  'for _ in range(2):\n    move_right()\nmove_down()',
  'for _ in range(5):\n    move_right()\nfor _ in range(4):\n    move_down()',
  'for _ in range(4):\n    move_down()\nfor _ in range(4):\n    move_right()\nmove_up()\nmove_right()\nmove_down()\nmove_down()',
].entries()) {
  const task = ROBOT_LEVELS[index];
  const outcome = evaluate(`${solution}\n_state = ${ROBOT_EXPRESSION}`, [{ setup: robotSetup(task), expression: `_state['position'] == ${JSON.stringify(task.goal)} and not _state['gems']`, expectedValue: true }]);
  assert.equal(outcome.passed, true, `Robot level ${task.id} has a working route with genuine Python`);
}
for (const question of QUIZZES.predictor.questions) {
  assert.equal(evaluate(question.code!, [{ expectedOutput: question.options[question.correct] }]).passed, true, `Predictor ${question.id} agrees with real Python`);
}
for (const question of QUIZZES.logicgates.questions) {
  assert.equal(evaluate(`print(${question.code})`, [{ expectedOutput: question.options[question.correct] }]).passed, true, `Logic ${question.id} agrees with real Python`);
}
const solutions: Record<string, string> = {
  sum: 'sum_numbers = lambda a,b: sum((a,b))', square: 'def square(n):\n    return n ** 2', greet: 'def greet(name):\n    return f"Hello {name}"',
  even: 'def is_even(n):\n    return not n % 2', positive: 'def is_positive(n):\n    return n > 0', max: 'def max_value(a,b):\n    return max((a,b))',
  reverse: 'def reverse_text(value):\n    return "".join(reversed(value))', length: 'def text_length(value):\n    return len(value)', upper: 'to_upper = lambda value: value.upper()',
};
for (const task of Object.values(TASKS_BY_TYPE).flat()) {
  assert.equal(evaluate(solutions[task.id], task.testCases).passed, true, `Training alternative ${task.id}`);
  assert.equal(evaluate(task.initialCode, task.testCases).passed, false, `Training starter ${task.id} must not pass`);
  assert.equal(evaluate('# ' + solutions[task.id].replaceAll('\n', '\n# '), task.testCases).passed, false, `Training comment ${task.id} must not pass`);
}
const factorial = BOSS_TASKS[0], decorator = BOSS_TASKS[1];
for (const implementation of ['def factorial(n):\n    result = 1\n    for value in range(1, n + 1):\n        result *= value\n    return result', 'def factorial(n):\n    return 1 if n < 2 else n * factorial(n - 1)']) assert.equal(evaluate(implementation, factorial.tests).passed, true);
assert.equal(evaluate('def factorial(n):\n    return 120', factorial.tests).passed, false, 'A single hard-coded factorial is rejected');
assert.equal(evaluate('def log_call(func):\n    def wrapper(*args, **kwargs):\n        print("Calling function")\n        return func(*args, **kwargs)\n    return wrapper', decorator.tests).passed, true);
assert.equal(evaluate('def log_call(func):\n    print("Calling function")\n    return func', decorator.tests).passed, false, 'Printing during decoration instead of each invocation is rejected');
assert.equal(evaluate('def log_call(func):\n    def wrapper(*args, **kwargs):\n        print("Calling function")\n        func(*args, **kwargs)\n    return wrapper', decorator.tests).passed, false, 'A decorator must return the wrapped result');
console.log('Game regressions passed: single answer, honest summaries, stepped snake, real Python robot alternatives, 18 quiz code examples, all 9 training tasks, factorial and decorators.');
