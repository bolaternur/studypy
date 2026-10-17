"""Runs repository-authored material only. Never imported by the server."""
import ast, asyncio, json, os, sys, tempfile
bundle=json.load(sys.stdin)
# Editorial negative solutions can contain a non-terminating loop. Add only an
# instruction guard around the same grading harness; this code is never shipped
# as a server executor. Browser runs continue to use Worker termination.
guarded=bundle['harness'].replace("        if _sp_payload.get('trace'):\n            _sp_sys.settrace(trace)","        _sp_sys.settrace(_qa_guard)")
guarded=guarded.replace("            value = eval(compile(test['expression']", "            _sp_sys.settrace(_qa_guard)\n            value = eval(compile(test['expression']")
compiled=compile(guarded,'<shared StudyPy evaluator, editorial instruction guard>','exec',flags=ast.PyCF_ALLOW_TOP_LEVEL_AWAIT)
errors=[]
counts=dict(examples=0,externalExamples=0,references=0,alternatives=0,startersRejected=0,wrongRejected=0,predictions=0)
def run(source,cases):
    budget=[500000]
    def guard(frame,event,arg):
        if frame.f_code.co_filename not in ('main.py','<проверка результата>'):return None
        if event=='line':
            budget[0]-=1
            if budget[0]<=0:raise RuntimeError('Editorial instruction limit: non-terminating or unexpectedly expensive authored code')
        return guard
    env={'_sp_payload_json':json.dumps({'code':source,'tests':cases},ensure_ascii=False),'_qa_guard':guard}
    with tempfile.TemporaryDirectory(prefix='studypy-course-',dir=os.environ.get('CONTENT_QA_TMP')) as folder:
        previous=os.getcwd()
        try:
            os.chdir(folder)
            asyncio.run(asyncio.wait_for(eval(compiled,env),timeout=2))
            return json.loads(env['_sp_json_result'])
        finally:os.chdir(previous)
def verify(source,cases,label,want=True):
    try:
        result=run(source,cases)
        okay=result['passed']
        if okay!=want:
            errors.append(label+': '+str(result.get('tests',result)))
    except BaseException as exc:
        errors.append(label+': harness execution '+str(exc))
for module in bundle['modules']:
    for lesson in module['lessons']:
        for step in lesson['steps']:
            for ex in step['examples']:
                if ex.get('language','python')!='python':
                    counts['externalExamples']+=1
                    continue
                verify(ex['code'],[{'stdin':ex.get('stdin',[]),'expectedOutput':ex['output']}],ex['id'])
                counts['examples']+=1
        for task in lesson['exercises']:
            label=task['id']
            if task['kind'] in ['code','modify','debug','gap']:
                cases=task['tests']
                verify(task['reference'],cases,label+' reference');counts['references']+=len(cases)
                verify(task['alternative'],cases,label+' alternative');counts['alternatives']+=1
                verify(task.get('initialCode',''),cases,label+' starter must fail',False);counts['startersRejected']+=1
                for wrong in task['wrongSolutions']:
                    verify(wrong['code'],cases,label+' wrong: '+wrong['why'],False);counts['wrongRejected']+=1
                for empty in ['', '# def return print input', '"return print"', '_unrelated = 123']:
                    verify(empty,cases,label+' empty/keywords must fail',False)
            elif task['kind']=='predict' and isinstance(task.get('answer'),str):
                verify(task['initialCode'],[{'stdin':task.get('stdin',[]),'expectedOutput':task['answer']}],label+' prediction');counts['predictions']+=1
print(json.dumps(counts,ensure_ascii=False))
if errors:
    for error in errors:print('FAIL',error)
    sys.exit(1)
print('Shared Python evaluator: all examples, predictions, references and alternatives PASS; starters and characteristic errors rejected.')
