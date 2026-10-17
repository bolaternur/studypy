/** Kept independent of Pyodide so the exact evaluator can also be tested with CPython. */
export const PYTHON_HARNESS = String.raw`
import ast as _sp_ast
import builtins as _sp_builtins
import io as _sp_io
import inspect as _sp_inspect
import itertools as _sp_itertools
import json as _sp_json
import math as _sp_math
import sys as _sp_sys
import traceback as _sp_traceback
import types as _sp_types

_sp_payload = _sp_json.loads(_sp_payload_json)

def _sp_snapshot(value, depth=0, budget=None):
    # Produce a new, bounded tree on every event, including nested mutable values.
    if budget is None:
        budget = [250]
    if budget[0] <= 0:
        return '<снимок сокращён>'
    budget[0] -= 1
    if depth > 5:
        return '<глубокая структура>'
    if isinstance(value, float) and not _sp_math.isfinite(value):
        return repr(value)
    if value is None or isinstance(value, (bool, int, float)):
        return value
    if isinstance(value, str):
        return value[:1000] + ('…' if len(value) > 1000 else '')
    if isinstance(value, (list, tuple, set, frozenset)):
        snapshot = []
        for item in _sp_itertools.islice(value, 50):
            snapshot.append(_sp_snapshot(item, depth + 1, budget))
            if budget[0] <= 0:
                break
        return snapshot
    if isinstance(value, dict):
        snapshot = {}
        for key, item in _sp_itertools.islice(value.items(), 50):
            snapshot[str(key)[:100]] = _sp_snapshot(item, depth + 1, budget)
            if budget[0] <= 0:
                break
        return snapshot
    try:
        return repr(value)[:300]
    except BaseException:
        return '<значение недоступно>'

class _SpOutput(_sp_io.StringIO):
    def __init__(self, limit):
        super().__init__()
        self.limit = limit
        self.exceeded = False
    def write(self, text):
        available = max(0, self.limit - self.tell())
        if len(text) > available:
            super().write(text[:available])
            self.exceeded = True
            raise RuntimeError('Достигнут лимит вывода. Уменьши количество print() или проверь цикл.')
        return super().write(text)

def _sp_error(exc):
    summary = ''.join(_sp_traceback.format_exception_only(type(exc), exc)).strip()
    if isinstance(exc, SyntaxError):
        return summary
    frames = _sp_traceback.extract_tb(exc.__traceback__)
    user_frames = [frame for frame in frames if frame.filename == 'main.py']
    if user_frames:
        summary += ' (строка ' + str(user_frames[-1].lineno) + ')'
    return summary

def _sp_meaningful(tree):
    # A comment, literal, ellipsis or unimplemented function is not a solution.
    ignored = (_sp_ast.Module, _sp_ast.FunctionDef, _sp_ast.AsyncFunctionDef,
               _sp_ast.ClassDef, _sp_ast.Pass, _sp_ast.Expr)
    statements = [node for node in _sp_ast.walk(tree) if isinstance(node, _sp_ast.stmt)]
    return any(not isinstance(node, ignored) or
               (isinstance(node, _sp_ast.Expr) and not isinstance(node.value, _sp_ast.Constant))
               for node in statements)

def _sp_equal(actual, expected):
    # Python's True == 1 is useful in arithmetic, but should not pass a boolean task.
    if isinstance(expected, bool):
        return type(actual) is bool and actual == expected
    if isinstance(expected, (int, float)):
        return isinstance(actual, (int, float)) and not isinstance(actual, bool) and actual == expected
    if isinstance(expected, list):
        return isinstance(actual, list) and len(actual) == len(expected) and all(
            _sp_equal(a, b) for a, b in zip(actual, expected))
    if isinstance(expected, dict):
        return isinstance(actual, dict) and actual.keys() == expected.keys() and all(
            _sp_equal(actual[key], expected[key]) for key in expected)
    return type(actual) is type(expected) and actual == expected

async def _sp_run_case(test, testing=False):
    limit = min(100000, max(1000, int(_sp_payload.get('outputLimit', 20000))))
    out = _SpOutput(limit)
    discard = _SpOutput(limit)
    previous_out, previous_err, previous_in = _sp_sys.stdout, _sp_sys.stderr, _sp_sys.stdin
    steps = []
    truncated = False
    trace_chars = 0
    result = {'passed': False, 'actualOutput': '', 'message': ''}
    call_out = None
    env = {'__name__': '__main__', '__builtins__': dict(vars(_sp_builtins))}
    values = iter(test.get('stdin', []))

    def read_input(prompt=''):
        if not testing:
            out.write(str(prompt))
        try:
            return str(next(values))
        except StopIteration:
            raise EOFError('Не хватает входных строк. Добавь данные в поле «Ввод для input()» и запусти программу.') from None

    env['__builtins__']['input'] = read_input

    def trace(frame, event, arg):
        nonlocal truncated, trace_chars
        if frame.f_code.co_filename != 'main.py':
            return None
        if event in ('line', 'return', 'exception'):
            if len(steps) >= 250:
                truncated = True
                return None
            variables = {}
            budget = [250]
            for name, value in _sp_itertools.islice(frame.f_locals.items(), 50):
                if name.startswith('__') or isinstance(value, (_sp_types.ModuleType, _sp_types.FunctionType, type)):
                    continue
                variables[name] = _sp_snapshot(value, budget=budget)
                if budget[0] <= 0:
                    break
            step = {'line': frame.f_lineno, 'variables': variables,
                    'output': out.getvalue()[:4000], 'event': event,
                    'functionName': frame.f_code.co_name}
            trace_chars += len(_sp_json.dumps(step, ensure_ascii=False, default=str))
            if trace_chars > 1000000:
                truncated = True
                return None
            steps.append(step)
        return trace

    try:
        if any(key in test for key in ('input', 'inputValues', 'assertCode')):
            raise ValueError('Эта задача использует устаревший формат проверки. Результат не засчитан.')
        tree = _sp_ast.parse(_sp_payload['code'], filename='main.py', mode='exec')
        if testing and not _sp_meaningful(tree):
            raise ValueError('Напиши решение: пустая программа, комментарий или pass не выполняют задание.')
        _sp_sys.stdout = _sp_sys.stderr = discard
        # Setup is data/API preparation before the student's program; its output is discarded.
        if test.get('setup'):
            prepared = eval(compile(test['setup'], '<подготовка теста>', 'exec', flags=_sp_ast.PyCF_ALLOW_TOP_LEVEL_AWAIT), env)
            if _sp_inspect.isawaitable(prepared):
                await prepared
        _sp_sys.stdout = _sp_sys.stderr = out
        _sp_sys.stdin = _sp_io.StringIO('\n'.join(test.get('stdin', [])))
        if _sp_payload.get('trace'):
            _sp_sys.settrace(trace)
        try:
            execution = eval(compile(tree, 'main.py', 'exec', flags=_sp_ast.PyCF_ALLOW_TOP_LEVEL_AWAIT), env)
            if _sp_inspect.isawaitable(execution):
                await execution
        finally:
            _sp_sys.settrace(None)
        if out.exceeded:
            raise RuntimeError('Достигнут лимит вывода. Проверка остановлена.')
        result['actualOutput'] = out.getvalue()
        has_value = 'expectedValue' in test
        if test.get('expression'):
            call_out = _SpOutput(limit)
            _sp_sys.stdout = _sp_sys.stderr = call_out
            value = eval(compile(test['expression'], '<проверка результата>', 'eval', flags=_sp_ast.PyCF_ALLOW_TOP_LEVEL_AWAIT), env)
            if _sp_inspect.isawaitable(value):
                value = await value
            result['actualValue'] = _sp_snapshot(value)
            result['actualCallOutput'] = call_out.getvalue()
            value_matches = not has_value or _sp_equal(value, test['expectedValue'])
        elif has_value or 'expectedCallOutput' in test:
            raise ValueError('В проверке не задано выражение для получения результата.')
        else:
            value_matches = True
        output_matches = ('expectedOutput' not in test or
                          out.getvalue().rstrip('\n') == str(test['expectedOutput']).rstrip('\n'))
        call_matches = ('expectedCallOutput' not in test or
                        result.get('actualCallOutput', '') == test['expectedCallOutput'])
        if testing and 'expectedOutput' not in test and not has_value and 'expectedCallOutput' not in test:
            raise ValueError('В задаче нет ожидаемого результата. Проверка недоступна.')
        result['passed'] = bool(output_matches and value_matches and call_matches)
        if result['passed']:
            result['message'] = test.get('description') or 'Проверка пройдена'
        elif not output_matches:
            result['message'] = 'Вывод отличается. Ожидалось: ' + repr(test['expectedOutput']) + '; получено: ' + repr(out.getvalue().rstrip('\n'))
        elif not call_matches:
            result['message'] = 'Вывод функции отличается. Ожидалось: ' + repr(test['expectedCallOutput']) + '; получено: ' + repr(result.get('actualCallOutput', ''))
        else:
            result['message'] = 'Результат отличается. Ожидалось: ' + repr(test.get('expectedValue')) + '; получено: ' + repr(result.get('actualValue'))
    except BaseException as exc:
        result['error'] = _sp_error(exc)
        result['message'] = result['error']
        result['actualOutput'] = out.getvalue()
        if call_out is not None:
            result['actualCallOutput'] = call_out.getvalue()
    finally:
        _sp_sys.settrace(None)
        _sp_sys.stdout, _sp_sys.stderr, _sp_sys.stdin = previous_out, previous_err, previous_in
    if _sp_payload.get('trace'):
        result['steps'] = steps
        result['traceTruncated'] = truncated
    return result

_sp_tests = _sp_payload.get('tests') or []
if _sp_tests:
    _sp_cases = [await _sp_run_case(test, True) for test in _sp_tests]
    _sp_result = {'status': 'completed', 'passed': all(case['passed'] for case in _sp_cases),
                  'tests': _sp_cases, 'output': _sp_cases[0]['actualOutput']}
    if _sp_cases[0].get('steps') is not None:
        _sp_result['steps'] = _sp_cases[0]['steps']
        _sp_result['traceTruncated'] = _sp_cases[0]['traceTruncated']
else:
    _sp_case = await _sp_run_case(_sp_payload)
    _sp_result = {'status': 'error' if 'error' in _sp_case else 'completed',
                  'passed': _sp_case['passed'], 'tests': [], 'output': _sp_case['actualOutput']}
    for _sp_key, _sp_target in [('error', 'error'), ('actualValue', 'value'),
                                 ('steps', 'steps'), ('traceTruncated', 'traceTruncated')]:
        if _sp_key in _sp_case:
            _sp_result[_sp_target] = _sp_case[_sp_key]
_sp_json_result = _sp_json.dumps(_sp_result, ensure_ascii=False, default=str)
`;
