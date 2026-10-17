async page => {
  await page.route('**/typing-content-test.html', route => route.fulfill({
    contentType:'text/html', body:'<!doctype html><title>StudyPy typing programs</title><p>Curated examples in actual Pyodide</p>',
  }));
  await page.route('https://firestore.googleapis.com/**', route => route.abort());
  await page.route('**/api/**', route => route.request().method()==='GET'
    ? route.continue() : route.fulfill({status:503,body:'Read-only typing program QA'}));
  await page.goto('http://127.0.0.1:3000/typing-content-test.html');
  return await page.evaluate(async () => {
    const [{startPythonRun},{PYTHON_HARNESS},{TYPING_LEVELS}] = await Promise.all([
      import('/src/runtime/python.ts'), import('/src/runtime/pythonHarness.ts'),
      import('/src/games/typing-levels.ts'),
    ]);
    const examples=TYPING_LEVELS.map(level=>({id:level.id,code:level.code,output:level.expectedOutput}));
    if(examples.length!==80)throw new Error('Typing program count changed: '+examples.length);
    const source=[
      'import json as _qa_json',
      'import os as _qa_os',
      'import sys as _qa_sys',
      'import tempfile as _qa_tempfile',
      'import csv as _qa_csv',
      'from io import StringIO as _qa_string_io',
      '_sp_payload_json = _qa_json.dumps({"code":"pass"})',
      PYTHON_HARNESS,
      '_qa_examples = _qa_json.loads('+JSON.stringify(JSON.stringify(examples))+')',
      '_qa_errors = []',
      '_qa_passed = 0',
      'async def _qa_run(source, case):',
      '    global _sp_payload',
      '    _sp_payload = {"code":source}',
      '    previous = _qa_os.getcwd()',
      '    with _qa_tempfile.TemporaryDirectory(prefix="studypy-typing-qa-") as folder:',
      '        try:',
      '            _qa_os.chdir(folder)',
      '            return await _sp_run_case(case, True)',
      '        finally:',
      '            _qa_os.chdir(previous)',
      'for _qa_example in _qa_examples:',
      '    _qa_result = await _qa_run(_qa_example["code"], {"stdin":_qa_example.get("stdin", []), "expectedOutput":_qa_example["output"]})',
      '    if _qa_result["passed"]:',
      '        _qa_passed += 1',
      '    else:',
      '        _qa_errors.append({"entry":_qa_example["id"],"message":_qa_result["message"],"output":_qa_result["actualOutput"]})',
      'print(_qa_json.dumps({"python":_qa_sys.version.split()[0],"examples":len(_qa_examples),"passed":_qa_passed,"failures":len(_qa_errors),"errors":_qa_errors},ensure_ascii=False))',
    ].join('\n');
    const result=await startPythonRun({code:source,timeoutMs:30000,outputLimit:100000}).promise;
    if(result.status!=='completed')throw new Error('Actual browser Pyodide batch failed: '+JSON.stringify(result));
    let summary;
    try{summary=JSON.parse(result.output);}catch{throw new Error('Batch did not return JSON: '+result.output);}
    if(summary.failures)throw new Error('Typing programs failed in Pyodide: '+JSON.stringify(summary));
    return {runtime:'Pyodide 0.26.4, actual browser worker',levels:TYPING_LEVELS.length,...summary};
  });
}
