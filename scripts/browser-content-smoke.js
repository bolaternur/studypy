async page => {
  await page.route('**/content-test.html', route => route.fulfill({ contentType: 'text/html', body: '<!doctype html><title>StudyPy content tests</title><p>Authored content QA in Pyodide</p>' }));
  await page.route('https://firestore.googleapis.com/**', route => route.abort());
  await page.route('**/api/**', route => route.request().method() === 'GET' ? route.continue() : route.fulfill({ status: 503, body: 'Local read-only content QA' }));
  await page.goto('http://127.0.0.1:3000/content-test.html');
  return await page.evaluate(async () => {
    const [{ startPythonRun }, { PYTHON_HARNESS }, { LESSON_CATALOG }, { loadLesson }] = await Promise.all([
      import('/src/runtime/python.ts'), import('/src/runtime/pythonHarness.ts'), import('/src/constants/lesson-catalog.ts'), import('/src/constants/lessons.ts'),
    ]);
    const lessons = await Promise.all(LESSON_CATALOG.map(meta => loadLesson(meta.id)));
    if (lessons.some(lesson => !lesson)) throw new Error('Lesson module missing');
    const source = `import json as _qa_json
import os as _qa_os
import tempfile as _qa_tempfile
import sqlite3 as _qa_sqlite3
_sp_payload_json = _qa_json.dumps({"code": "pass"})
${PYTHON_HARNESS}
_qa_lessons = _qa_json.loads(${JSON.stringify(JSON.stringify(lessons))})
_qa_errors = []
_qa_counts = {"lessons": len(_qa_lessons), "examples": 0, "references": 0, "reference_cases": 0, "rejected_starters": 0, "rejected_empty_or_keywords": 0}
async def _qa_run(source, case):
    global _sp_payload
    _sp_payload = {"code": source}
    previous = _qa_os.getcwd()
    with _qa_tempfile.TemporaryDirectory(prefix="studypy-qa-") as folder:
        try:
            _qa_os.chdir(folder)
            return await _sp_run_case(case, True)
        finally:
            _qa_os.chdir(previous)
for _qa_lesson in _qa_lessons:
    for _qa_section in _qa_lesson.get("sections", []):
        if "code" not in _qa_section:
            continue
        _qa_counts["examples"] += 1
        _qa_result = await _qa_run(_qa_section["code"], {"stdin": _qa_section.get("stdin", []), "expectedOutput": _qa_section["expectedOutput"]})
        if not _qa_result["passed"]:
            _qa_errors.append({"lesson": _qa_lesson["id"], "kind": "example", "message": _qa_result["message"]})
    for _qa_task in _qa_lesson.get("challenges", []):
        _qa_counts["references"] += 1
        _qa_label = _qa_lesson["id"] + "/" + _qa_task["id"]
        for _qa_case in _qa_task["testCases"]:
            _qa_counts["reference_cases"] += 1
            _qa_result = await _qa_run(_qa_task["code"], _qa_case)
            if not _qa_result["passed"]:
                _qa_errors.append({"lesson": _qa_label, "kind": "reference", "message": _qa_result["message"]})
        _qa_starter_results = [await _qa_run(_qa_task["initialCode"], case) for case in _qa_task["testCases"]]
        if all(result["passed"] for result in _qa_starter_results):
            _qa_errors.append({"lesson": _qa_label, "kind": "starter", "message": "Starter passed before learner action"})
        else:
            _qa_counts["rejected_starters"] += 1
        for _qa_bad in ["", "# def return a + b breakpoint print(42)", "pass", "'def return a + b breakpoint'", "for range(5)"]:
            _qa_bad_results = [await _qa_run(_qa_bad, case) for case in _qa_task["testCases"]]
            if all(result["passed"] for result in _qa_bad_results):
                _qa_errors.append({"lesson": _qa_label, "kind": "invalid", "message": "Invalid solution accepted: " + repr(_qa_bad)})
            else:
                _qa_counts["rejected_empty_or_keywords"] += 1
print(_qa_json.dumps({"counts": _qa_counts, "failures": len(_qa_errors), "errors": _qa_errors[:60]}, ensure_ascii=False))`;
    const execution = startPythonRun({ code: source, timeoutMs: 30000, outputLimit: 100000 });
    const result = await execution.promise;
    if (result.status !== 'completed') throw new Error('Batch Pyodide failed: ' + JSON.stringify(result));
    let summary;
    try { summary = JSON.parse(result.output); } catch { throw new Error('Batch output is not JSON: ' + result.output); }
    if (summary.failures) throw new Error('Authored content failed in Pyodide: ' + JSON.stringify(summary));
    return { runtime: 'Pyodide 0.26.4, actual browser worker', ...summary };
  });
}
