async page => {
  await page.route('**/course-content-qa.html', route=>route.fulfill({contentType:'text/html',body:'<!doctype html><title>Course content QA</title><p>Repository authored examples only</p>'}));
  await page.route('https://firestore.googleapis.com/**', route=>route.abort());
  await page.route('**/api/**', route=>route.request().method()==='GET'?route.continue():route.fulfill({status:503,body:'Read-only QA'}));
  await page.goto('http://127.0.0.1:3000/course-content-qa.html');
  return await page.evaluate(async()=>{
    const [{startPythonRun},{PYTHON_HARNESS},{COURSE_INDEX},{loadCourseModule}]=await Promise.all([import('/src/runtime/python.ts'),import('/src/runtime/pythonHarness.ts'),import('/src/course/index.generated.ts'),import('/src/course/load.ts')]);
    const summaries=[];
    for(const meta of COURSE_INDEX){
      const module=await loadCourseModule(meta.id);
      const source=(module.id==='sql-python'?'import sqlite3\n':'')+`import json as qjson, ast as qast, os as qos, tempfile as qtemp, asyncio as qasyncio
qharness=qjson.loads(${JSON.stringify(JSON.stringify(PYTHON_HARNESS))})
qharness=qharness.replace("        if _sp_payload.get('trace'):\\n            _sp_sys.settrace(trace)","        _sp_sys.settrace(_qa_guard)").replace("            value = eval(compile(test['expression']", "            _sp_sys.settrace(_qa_guard)\\n            value = eval(compile(test['expression']")
qcompiled=compile(qharness,'<editorial harness>','exec',flags=qast.PyCF_ALLOW_TOP_LEVEL_AWAIT)
qmodule=qjson.loads(${JSON.stringify(JSON.stringify(module))})
qerrors=[]
qcounts={'examples':0,'externalExamples':0,'referenceCases':0,'alternatives':0,'startersRejected':0,'wrongRejected':0,'emptyRejected':0,'predictions':0}
async def qrun(code,cases):
    budget=[500000]
    def guard(frame,event,arg):
        if frame.f_code.co_filename not in ('main.py','<проверка результата>'):return None
        if event=='line':
            budget[0]-=1
            if budget[0]<=0:raise RuntimeError('Editorial instruction limit')
        return guard
    env={'_sp_payload_json':qjson.dumps({'code':code,'tests':cases},ensure_ascii=False),'_qa_guard':guard}
    previous=qos.getcwd()
    with qtemp.TemporaryDirectory(prefix='course-qa-') as folder:
        try:
            qos.chdir(folder)
            await qasyncio.wait_for(eval(qcompiled,env),timeout=2)
            return qjson.loads(env['_sp_json_result'])
        finally:qos.chdir(previous)
async def qverify(code,cases,label,want=True):
    try:
        result=await qrun(code,cases)
        if result['passed']!=want:qerrors.append({'id':label,'tests':result['tests']})
    except BaseException as exc:qerrors.append({'id':label,'error':str(exc)})
for lesson in qmodule['lessons']:
    for step in lesson['steps']:
        for example in step['examples']:
            if example.get('language','python')!='python':
                qcounts['externalExamples']+=1
                continue
            await qverify(example['code'],[{'stdin':example.get('stdin',[]),'expectedOutput':example['output']}],example['id'])
            qcounts['examples']+=1
    for task in lesson['exercises']:
        label=task['id']
        if task['kind'] in ('code','modify','debug','gap'):
            cases=task['tests']
            await qverify(task['reference'],cases,label+' reference');qcounts['referenceCases']+=len(cases)
            await qverify(task['alternative'],cases,label+' alternative');qcounts['alternatives']+=1
            await qverify(task.get('initialCode',''),cases,label+' starter',False);qcounts['startersRejected']+=1
            for wrong in task['wrongSolutions']:
                await qverify(wrong['code'],cases,label+' wrong '+wrong['why'],False);qcounts['wrongRejected']+=1
            for bad in ('','# def return print input','"return print"','_unrelated = 123'):
                await qverify(bad,cases,label+' empty/keywords',False);qcounts['emptyRejected']+=1
        elif task['kind']=='predict' and isinstance(task.get('answer'),str):
            await qverify(task['initialCode'],[{'stdin':task.get('stdin',[]),'expectedOutput':task['answer']}],label+' predict');qcounts['predictions']+=1
print(qjson.dumps({'module':qmodule['id'],'counts':qcounts,'failures':len(qerrors),'errors':qerrors[:30]},ensure_ascii=False))`;
      const result=await startPythonRun({code:source,timeoutMs:30000,outputLimit:100000}).promise;
      if(result.status!=='completed')throw new Error(meta.id+' batch failed: '+JSON.stringify(result));
      const lines=result.output.split('\n'),jsonLine=lines.findLast(line=>line.startsWith('{'));
      let summary;try{summary=JSON.parse(jsonLine??'');}catch{throw new Error(meta.id+' invalid QA output: '+result.output);}
      const warnings=lines.filter(line=>line.trim()&&line!==jsonLine);if(warnings.length)summary.editorialWarnings=warnings;
      summaries.push(summary);
    }
    const failures=summaries.reduce((n,s)=>n+s.failures,0);
    if(failures)throw new Error('Course content differs in actual Pyodide: '+JSON.stringify(summaries.filter(s=>s.failures)));
    return {runtime:'Actual browser Pyodide 0.26.4 / Python 3.12',failures,summaries};
  });
}
