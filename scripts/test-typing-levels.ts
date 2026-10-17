import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { TYPING_LEVELS } from '../src/games/typing-levels';
import { PYTHON_HARNESS } from '../src/runtime/pythonHarness';
let checks=0;
function check(value:unknown,message:string):asserts value {assert.ok(value,message);checks++;}
check(TYPING_LEVELS.length===80,'Exactly80 reviewed levels');
const topics=[...new Set(TYPING_LEVELS.map(level=>level.topic))];
check(topics.length===10,'Ten coherent topics');
check(new Set(TYPING_LEVELS.map(level=>level.id)).size===80,'Unique stable IDs');
check(new Set(TYPING_LEVELS.map(level=>level.code.trim())).size===80,'No duplicate programs');
check(new Set(TYPING_LEVELS.map(level=>level.title)).size===80,'Distinct titles');
for(const [index,level] of TYPING_LEVELS.entries()){
 check(level.id==='typing-'+String(index+1).padStart(3,'0'),'Sequential stable ID: '+level.id);
 check(level.topic===topics[Math.floor(index/8)],'Topic sequence: '+level.id);
 check(level.difficulty===(index<32?'Начальный':index<64?'Средний':'Продвинутый'),'Difficulty sequence: '+level.id);
 check(Boolean(level.title.trim()&&level.goal.trim()&&level.hint.trim()),'Meaningful copy: '+level.id);
 check(!level.code.includes('\t'),'Four-space indentation: '+level.id);
 check(!/(?:TODO|FIXME|Ваш код|ваш код|your code|^\s*pass\s*$)/mi.test(level.code),'No stub: '+level.id);
 check(level.expectedOutput.length>0,'Observable stdout: '+level.id);
}
for(const topic of topics)check(TYPING_LEVELS.filter(level=>level.topic===topic).length===8,'Eight levels per topic');
const lineCount=(code:string)=>code.split('\n').filter(line=>line.trim()).length;
check(TYPING_LEVELS.slice(0,8).every(level=>lineCount(level.code)<=3),'First group fits one to three lines');
check(TYPING_LEVELS.slice(-8).every(level=>level.code.split('\n').length>=10&&level.code.split('\n').length<=18),'Final mini-programs have10–18lines');
const mean=(difficulty:string)=>{const group=TYPING_LEVELS.filter(level=>level.difficulty===difficulty);return group.reduce((sum,level)=>sum+lineCount(level.code),0)/group.length;};
check(mean('Начальный')<mean('Средний')&&mean('Средний')<mean('Продвинутый'),'Growing program size across difficulty tiers');
const boundaryOutputs:Record<string,string>={
 'typing-004':'Готово: 100',
 'typing-012':'33 1',
 'typing-025':'Взрослый',
 'typing-026':'Не положительное',
 'typing-031':'Ноль\nГотово',
 'typing-035':'0\nПустой диапазон',
 'typing-040':'Не найдено\nПоиск завершён',
 'typing-050':'0\n9\nFalse',
 'typing-059':'3.0\nNone\n0.0',
 'typing-060':'6\n0\n0',
 'typing-063':'1\n2\n1',
 'typing-064':'[3, 2, 1]\n[]\n6',
 'typing-066':'4.0\nNone',
 'typing-068':'2\nПервая\nВторая\nTrue',
 'typing-072':'[1, 2]\n2\n[]\n0\n[]\n0',
 'typing-077':"чай True\nчай False\nхлеб False\nчай True\n1\n['чай']",
 'typing-078':'[90, 0, 100]\n2',
 'typing-080':'A: 5\nB: 0\nВсего: 5',
};
for(const [id,output]of Object.entries(boundaryOutputs)){
 assert.equal(TYPING_LEVELS.find(level=>level.id===id)?.expectedOutput,output,'Boundary contract: '+id);checks++;
}
const python=process.env.PYTHON_BIN??process.env.CONTENT_PYTHON??(process.platform==='win32'?'py':'python3');
const source="import ast, asyncio, json, os, sys, tempfile\nbundle=json.load(sys.stdin)\ncompiled=compile(bundle['harness'],'<shared evaluator>','exec',flags=ast.PyCF_ALLOW_TOP_LEVEL_AWAIT)\nfailures=[]\ncompound=0\nfunctions=0\nsingle_prints=0\nfor level in bundle['levels']:\n    tree=ast.parse(level['code'])\n    nodes=list(ast.walk(tree))\n    if any(isinstance(node,ast.Pass) for node in nodes):\n        failures.append(level['id']+': contains a pass stub')\n    if any(isinstance(node,(ast.If,ast.For,ast.While,ast.FunctionDef,ast.Try,ast.With)) for node in nodes):\n        compound+=1\n    if any(isinstance(node,ast.FunctionDef) for node in nodes):\n        functions+=1\n    if len(tree.body)==1 and isinstance(tree.body[0],ast.Expr) and isinstance(tree.body[0].value,ast.Call) and isinstance(tree.body[0].value.func,ast.Name) and tree.body[0].value.func.id=='print':\n        single_prints+=1\n    for node in nodes:\n        if isinstance(node,(ast.Import,ast.ImportFrom)):\n            modules=[alias.name.split('.')[0] for alias in node.names] if isinstance(node,ast.Import) else [node.module.split('.')[0]]\n            if any(module not in {'io','json','csv'} for module in modules):\n                failures.append(level['id']+': non-deterministic or external module')\n        if isinstance(node,ast.Call) and isinstance(node.func,ast.Name) and node.func.id in {'input','open','eval','exec','compile','__import__'}:\n            failures.append(level['id']+': external input, filesystem or dynamic execution')\n    environment={'_sp_payload_json':json.dumps({'code':level['code'],'tests':[{'expectedOutput':level['expectedOutput']}]},ensure_ascii=False)}\n    with tempfile.TemporaryDirectory(prefix='studypy-typing-',dir=os.environ.get('CONTENT_QA_TMP')) as folder:\n        previous=os.getcwd()\n        try:\n            os.chdir(folder)\n            asyncio.run(eval(compiled,environment))\n            result=json.loads(environment['_sp_json_result'])\n            if not result['passed']:\n                failures.append(level['id']+': '+str(result['tests']))\n        finally:\n            os.chdir(previous)\nif compound<35 or functions<12 or single_prints>8:\n    failures.append('Insufficient syntax variety: '+str((compound,functions,single_prints)))\nprint(json.dumps({'levels':len(bundle['levels']),'compoundPrograms':compound,'functionPrograms':functions,'singlePrintPrograms':single_prints,'failures':failures},ensure_ascii=False))\nsys.exit(1 if failures else 0)";
const result=spawnSync(python,['-c',source],{input:JSON.stringify({levels:TYPING_LEVELS,harness:PYTHON_HARNESS}),encoding:'utf8',timeout:120000,env:{...process.env,PYTHONUTF8:'1',PYTHONIOENCODING:'utf-8'}});
if(result.error)throw new Error('Set PYTHON_BIN to an installed Python3 interpreter: '+result.error.message);
assert.equal(result.status,0,result.stderr+'\n'+result.stdout);
const summary=JSON.parse(result.stdout);
check(summary.levels===80&&!summary.failures.length,'All80 programs execute in the exact shared evaluator');
console.log('Typing levels: '+TYPING_LEVELS.length+' programs / '+topics.length+' topics; '+checks+' content checks; '+summary.compoundPrograms+' compound programs, '+summary.functionPrograms+' function programs; all80 executed; PASS');
