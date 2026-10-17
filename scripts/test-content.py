"""Editorial QA for authored content; never accepts submissions or connects to a database."""
import ast
import asyncio
import contextlib
import io
import json
import os
import sys
import tempfile

bundle = json.load(sys.stdin)
lessons = bundle['lessons']
compiled_harness = compile(bundle['harness'], '<shared StudyPy evaluator>', 'exec', flags=ast.PyCF_ALLOW_TOP_LEVEL_AWAIT)
errors = []
counts = {"examples": 0, "reference_cases": 0, "rejected_starters": 0, "rejected_empty_or_keywords": 0, "alternatives": 0}

def run_case(source, case):
    environment = {'_sp_payload_json': json.dumps({'code': source, 'tests': [case]}, ensure_ascii=False)}
    with tempfile.TemporaryDirectory(prefix='studypy-content-', dir=os.environ.get('CONTENT_QA_TMP')) as folder:
        previous = os.getcwd()
        try:
            os.chdir(folder)
            asyncio.run(eval(compiled_harness, environment))
            result = json.loads(environment['_sp_json_result'])
            return result['passed'], result['tests'][0].get('message', '')
        except Exception as error:
            return False, f'{type(error).__name__}: {error}'
        finally:
            os.chdir(previous)
tasks = {}
for lesson in lessons:
    for section in lesson['sections']:
        if 'code' in section:
            counts['examples'] += 1
            passed, error = run_case(section['code'], {'stdin':section.get('stdin', []), 'expectedOutput':section['expectedOutput']})
            if not passed:
                errors.append(f'{lesson["id"]} example: {error}')
    for task in lesson['challenges']:
        label = f'{lesson["id"]}/{task["id"]}'
        tasks[label] = task
        for case in task['testCases']:
            counts['reference_cases'] += 1
            passed, error = run_case(task['code'], case)
            if not passed:
                errors.append(f'{label} reference: {error}')
        if all(run_case(task['initialCode'], case)[0] for case in task['testCases']):
            errors.append(f'{label}: starter passes before learner action')
        else:
            counts['rejected_starters'] += 1
        for invalid in ['', '# def return a + b breakpoint print(42)', 'pass', '"def return a + b breakpoint"', 'for range(5)']:
            try:
                accepted = all(run_case(invalid, case)[0] for case in task['testCases'])
            except SyntaxError:
                accepted = False
            if accepted:
                errors.append(f'{label}: invalid solution accepted: {invalid!r}')
            else:
                counts['rejected_empty_or_keywords'] += 1

regressions = [
    ('math/remainder', 'gold = 100', False),
    ('math/remainder', 'gold = 100\nprint(gold)', False),
    ('math/remainder', 'gold = 100\nprint(divmod(gold, 3)[1])', True),
    ('debugger/boundary', '', False),
    ('functions/add', 'def add(a, b):\n    return 5', False),
    ('functions/add', 'def add(a, b):\n    print(a + b)', False),
    ('functions/add', 'def add(a, b):\n    print("noise")\n    return a + b', False),
    ('functions/add', 'add = lambda left, right: sum((left, right))', True),
    ('intro/hello', 'import sys\nsys.stdout.write("Hello World")', True),
    ('intro/two-lines', 'print("Line 1\\nLine 2")', True),
    ('intro/hello', 'print("Hello World")\nprint("Hello World")', False),
]
for label, source, expected in regressions:
    actual = all(run_case(source, case)[0] for case in tasks[label]['testCases'])
    if actual != expected:
        errors.append(f'{label}: regression expected {expected}, got {actual}: {source!r}')
    elif expected:
        counts['alternatives'] += 1

print(json.dumps(counts, ensure_ascii=False))
if errors:
    for error in errors:
        print(f'FAIL {error}')
    sys.exit(1)
print('All authored examples/references execute; starters, empty programs and keyword tricks fail; correct alternatives pass.')
