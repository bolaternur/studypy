/** Runs only repository-owned editorial examples in a separate local CPython process.
 * This is not a server endpoint or a sandbox for learner submissions.
 */
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { LESSON_CATALOG } from '../src/constants/lesson-catalog';
import { loadLesson } from '../src/constants/lessons';
import { PYTHON_HARNESS } from '../src/runtime/pythonHarness';

const lessons = await Promise.all(LESSON_CATALOG.map(meta => loadLesson(meta.id)));
const interpreter = process.env.CONTENT_PYTHON ?? process.env.PYTHON_BIN ?? (process.platform === 'win32' ? 'python' : 'python3');
const result = spawnSync(interpreter, [fileURLToPath(new URL('./test-content.py', import.meta.url))], {
  input: JSON.stringify({ lessons, harness: PYTHON_HARNESS }), encoding: 'utf8', timeout: 180_000,
  env: { ...process.env, PYTHONIOENCODING: 'utf-8' },
});
process.stdout.write(result.stdout ?? '');
process.stderr.write(result.stderr ?? '');
if (result.error) {
  console.error(`Could not run content QA: ${result.error.message}. Set CONTENT_PYTHON to an installed Python 3 interpreter.`);
  process.exitCode = 1;
} else {
  process.exitCode = result.status ?? 1;
}
