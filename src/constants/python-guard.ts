/**
 * Runtime guards installed around every piece of learner code.
 *
 * Pyodide runs on the main thread, so `while True: pass` froze the whole tab
 * with no way back except closing it — on a platform whose entire purpose is
 * letting beginners run code that does not work yet.
 *
 * Three guards, all enforced inside Python:
 *
 *   1. A wall-clock watchdog via `sys.settrace`. The trace function fires on
 *      every line event and checks the clock every 1024 ticks, so an infinite
 *      loop raises instead of hanging. Tracing costs a few times normal speed,
 *      which is irrelevant for exercise-sized programs and far better than an
 *      unrecoverable tab.
 *
 *   2. A bounded stdout. `while True: print(x)` would otherwise grow a buffer
 *      until the tab ran out of memory.
 *
 *   3. Traceback capture. Pyodide 0.26 throws a `PythonError` whose `message`
 *      is empty — only `.type` survives the boundary — and asking Python for
 *      `traceback.format_exc()` afterwards returns "NoneType: None" because
 *      the exception is no longer active. So the traceback is recorded into a
 *      global at the moment it is raised, and read back from there.
 *
 * A proper fix for (1) and (2) is a Web Worker that can be terminated
 * outright; that is the right next step, but it means rewriting the
 * input-replay protocol in CodeEditor, so this contains the damage without
 * risking a feature that currently works.
 */

/** Seconds a single run may take before the watchdog stops it. */
export const EXECUTION_TIMEOUT_SECONDS = 10;

/** Characters a single run may print before output is cut off. */
export const OUTPUT_LIMIT_CHARS = 200_000;

/** Python global holding the last formatted traceback, or None. */
export const PYTHON_ERROR_GLOBAL = '_sp_last_error';

/**
 * Defines the guards. Must be evaluated after any `globals().clear()` and
 * before the learner's code runs.
 */
export const PYTHON_GUARD_SETUP = `
import sys, io, time, traceback as _sp_traceback

${PYTHON_ERROR_GLOBAL} = None
_sp_deadline = time.time() + ${EXECUTION_TIMEOUT_SECONDS}
_sp_ticks = 0

def _sp_watchdog(frame, event, arg):
    global _sp_ticks
    _sp_ticks += 1
    # Checking the clock on every line event would dominate the runtime.
    if (_sp_ticks & 1023) == 0 and time.time() > _sp_deadline:
        raise TimeoutError(
            "Программа работала дольше ${EXECUTION_TIMEOUT_SECONDS} секунд и была остановлена. "
            "Скорее всего, где-то бесконечный цикл: проверьте, что условие while когда-нибудь станет ложным."
        )
    return _sp_watchdog


class _SpBoundedOut(io.StringIO):
    """stdout that refuses to grow without bound."""

    def write(self, text):
        if self.tell() > ${OUTPUT_LIMIT_CHARS}:
            raise MemoryError(
                "Программа вывела слишком много текста и была остановлена. "
                "Проверьте, не выводите ли вы что-то в бесконечном цикле."
            )
        return super().write(text)


def _sp_arm():
    global ${PYTHON_ERROR_GLOBAL}
    ${PYTHON_ERROR_GLOBAL} = None
    sys.settrace(_sp_watchdog)


def _sp_disarm():
    sys.settrace(None)


def _sp_record(exc):
    global ${PYTHON_ERROR_GLOBAL}
    ${PYTHON_ERROR_GLOBAL} = "".join(
        _sp_traceback.format_exception(type(exc), exc, exc.__traceback__)
    )
`;

/**
 * Lines the wrapper prepends before the statement it guards.
 *
 * Tracebacks from the guarded block report positions inside the generated
 * source, so this offset maps them back to the line the learner actually
 * wrote. Code executed via `exec()` reports `<string>` frames instead, which
 * already carry the learner's own numbering and need no adjustment.
 */
export const GUARD_LINE_OFFSET = 2; // `_sp_arm()` and `try:`

/**
 * Wraps a statement so the watchdog is armed for it, the traceback is recorded
 * if it raises, and the watchdog is always disarmed afterwards.
 *
 * The exception is re-raised so existing control flow — notably the
 * `_NeedsInput` signal the sandbox uses to pause for `input()` — is unchanged.
 */
export const guarded = (statement: string): string => {
  const body = statement.split('\n').map((line) => `    ${line}`).join('\n');
  return [
    '_sp_arm()',
    'try:',
    body,
    'except BaseException as _sp_exc:',
    '    _sp_record(_sp_exc)',
    '    raise',
    'finally:',
    '    _sp_disarm()',
    '',
  ].join('\n');
};
