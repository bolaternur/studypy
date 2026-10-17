/** Check learner-visible task examples against the actual shared Python evaluator.
 * This complements reference tests: an incorrect public example can disagree
 * with a perfectly passing grading fixture. Browser-delivered checks are
 * inspectable; this validation makes no secrecy claim. No server is involved.
 */
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
import type { CourseModule } from '../src/course/types';
import { PYTHON_HARNESS } from '../src/runtime/pythonHarness';

const filter = process.argv.find(value => value.startsWith('--module='))?.slice(9);
const files = (await readdir('src/course/modules')).filter(file => file.endsWith('.ts') && !file.startsWith('_') && (!filter || file === filter + '.ts'));
const modules: CourseModule[] = await Promise.all(files.map(async file => (await import(pathToFileURL(resolve('src/course/modules', file)).href)).default));
assert(modules.length, 'No course modules found');
const source = String.raw`
import ast, asyncio, json, os, sys, tempfile
bundle=json.load(sys.stdin)
compiled=compile(bundle['harness'],'<shared StudyPy evaluator>','exec',flags=ast.PyCF_ALLOW_TOP_LEVEL_AWAIT)
report={'checked':0,'stdout':0,'values':0,'callOutput':0,'conceptual':0,'unmatched':[],'ambiguousContext':[],'errors':[]}
def canonical(expression):
    try:return ast.dump(ast.parse(expression,mode='eval'),include_attributes=False)
    except SyntaxError:return expression
def read_value(text):
    try:return ast.literal_eval(text)
    except (ValueError,SyntaxError):return json.loads(text)
def run(code,test):
    env={'_sp_payload_json':json.dumps({'code':code,'tests':[test]},ensure_ascii=False)}
    with tempfile.TemporaryDirectory(prefix='studypy-public-',dir=os.environ.get('CONTENT_QA_TMP')) as folder:
        previous=os.getcwd()
        try:
            os.chdir(folder)
            asyncio.run(eval(compiled,env))
            return json.loads(env['_sp_json_result'])
        finally:os.chdir(previous)
for module in bundle['modules']:
    for lesson in module['lessons']:
        for task in lesson['exercises']:
            if task['kind'] not in ['code','modify','debug','gap']:
                report['conceptual']+=len(task['examples'])
                continue
            for number,example in enumerate(task['examples'],1):
                label=task['id']+' example '+str(number)
                inputs=example.get('input',[])
                cases=task.get('tests',[])
                expression=inputs[-1] if inputs else None
                candidates=[test for test in cases if expression and test.get('expression') and canonical(test['expression'])==canonical(expression)]
                if candidates and len(inputs)>1:
                    published_setup='\n'.join(inputs[:-1])
                    def normalize_setup(value):
                        try:return ast.dump(ast.parse(value),include_attributes=False)
                        except SyntaxError:return value
                    candidates=[test for test in candidates if normalize_setup(test.get('setup',''))==normalize_setup(published_setup)]
                stdout_example=False
                if not candidates:
                    candidates=[test for test in cases if test.get('stdin',[])==inputs and 'expectedOutput' in test and (not test.get('expression') or test['expectedOutput']!='')]
                    stdout_example=bool(candidates)
                if not candidates:
                    report['unmatched'].append({'id':label,'input':inputs,'reason':'No matching published fixture; requires editorial review rather than guessed execution.'})
                    continue
                if len(candidates)>1 and len({test.get('setup','') for test in candidates})>1 and len(inputs)==1:
                    report['ambiguousContext'].append({'id':label,'input':inputs,'reason':'Same expression has different data preparations; example omits the preparation. Check all authored fixtures without inventing a fixture.'})
                result=None
                descriptive=False
                for candidate in candidates:
                    test=dict(candidate)
                    if stdout_example:
                        test['expectedOutput']=example['output']
                        category='stdout'
                    elif 'expectedValue' in test:
                        try:test['expectedValue']=read_value(example['output'])
                        except (ValueError,SyntaxError,json.JSONDecodeError):
                            descriptive=True
                            break
                        category='values'
                    elif 'expectedCallOutput' in test:
                        test['expectedCallOutput']=example['output']
                        category='callOutput'
                    else:
                        test['expectedOutput']=example['output']
                        category='stdout'
                    result=run(task['reference'],test)
                    if result['passed']:break
                if descriptive:
                    report['unmatched'].append({'id':label,'input':inputs,'reason':'Published value is descriptive rather than a Python/JSON value.'})
                    continue
                report['checked']+=1
                report[category]+=1
                if not result['passed']:
                    report['errors'].append({'id':label,'input':inputs,'published':example['output'],'actual':result['tests']})
print(json.dumps(report,ensure_ascii=False))
`;
const python = process.env.PYTHON_BIN ?? (process.platform === 'win32' ? 'py' : 'python3');
const result = spawnSync(python, ['-c', source], {
  input: JSON.stringify({ modules, harness: PYTHON_HARNESS }), encoding: 'utf8', timeout: 180000,
  maxBuffer: 10 * 1024 * 1024, env: { ...process.env, PYTHONUTF8: '1', PYTHONIOENCODING: 'utf-8' },
});
if (result.error) throw result.error;
if (result.stderr) process.stderr.write(result.stderr);
assert.equal(result.status, 0, 'Public-example Python execution failed');
const report = JSON.parse(result.stdout);
await mkdir('test-results', { recursive: true });
await writeFile(`test-results/course-public-examples${filter ? '-' + filter : ''}.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report));
assert.equal(report.errors.length, 0, 'Learner-visible examples contradict actual Python execution');
assert.equal(report.unmatched.length, 0, 'Every public coding example must have a reproducible matching fixture');
assert.equal(report.ambiguousContext.length, 0, 'Examples must show their data preparation when it changes the result');
console.log(`Public task examples: ${report.checked} executed; ${report.unmatched.length} unmatched; ${report.ambiguousContext.length} omit distinct data preparations; no contradictions.`);
