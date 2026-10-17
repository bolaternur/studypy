import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { answerFromKnowledge, hintFromKnowledge, MENTOR_ENTRIES } from '../src/constants/mentor-knowledge';
import { LESSON_CATALOG } from '../src/constants/lesson-catalog';
import { SUGGESTED_QUESTIONS } from '../src/constants/mentor-suggestions';
import { PYTHON_HARNESS } from '../src/runtime/pythonHarness';
let checks=0;
const fence=String.fromCharCode(96).repeat(3);
function check(condition:unknown,message:string):asserts condition { assert.ok(condition,message); checks++; }
const lessons=new Set(LESSON_CATALOG.map(lesson=>lesson.id));
check(MENTOR_ENTRIES.length>=90 && MENTOR_ENTRIES.length<=120,'Reviewed corpus scope');
check(new Set(MENTOR_ENTRIES.map(entry=>entry.id)).size===MENTOR_ENTRIES.length,'Unique IDs');
for(const entry of MENTOR_ENTRIES){
 check(Boolean(entry.lessonId && lessons.has(entry.lessonId)),entry.id+': canonical lesson link');
 check(Boolean(entry.sources?.length && entry.sources.every(url=>/^https:\/\//.test(url))),entry.id+': primary sources');
 check(Boolean(entry.hint && entry.hint.length<600 && !entry.hint.includes(fence)),entry.id+': concise hint');
 check(Boolean(entry.check && entry.next && entry.answer.includes('Что проверить')),entry.id+': diagnostic and next action');
 check(!/(?:^|\s)(?:Войдите|Обратите|Используйте|Проверьте|Попробуйте|Смотрите|Добавьте|Учтите)(?:\s|[.,:])/u.test(entry.answer),entry.id+': informal voice');
 check(answerFromKnowledge(entry.triggers[0]).entryId===entry.id,entry.id+': direct topic is retrievable');
 const hint=hintFromKnowledge(entry.triggers[0]);
 check(!hint.text.includes(fence),entry.id+': hint cannot reveal reference block');
}
check(new Set(MENTOR_ENTRIES.map(entry=>entry.lessonId)).size===lessons.size,'All lesson topics covered');
for(const question of SUGGESTED_QUESTIONS)check(answerFromKnowledge(question).matched,'Suggestion has answer: '+question);
const cases:[string,string][]=[
 ['Чем return отличается от print?','return-print'],
 ['int int int int str str: чем return отличается от print?','return-print'],
 ['Почему функция возвращает None? AttributeError: NoneType has no attribute append','err-none-attribute'],
 ['Почему append возвращает None?','list-method-none'],
 ['Почему sort возвращает None?','list-method-none'],
 ['Почему b = a меняет оба списка?','list-alias'],
 ['Как сделать копию списка?','list-alias'],
 ['Как работать со словарями?','topic-dictionaries'],
 ['Как обращаться к переменным?','topic-variables'],
 ['Как работают списковые включения?','topic-list-comp'],
 ['Почему bool("False") возвращает True?','truth-strings'],
 ['Почему 0.1 + 0.2 не равно 0.3?','float-precision'],
 ['Что выбрать: is или ==?','identity-equality'],
 ['Чем None отличается от False и 0?','identity-equality'],
 ['Почему data.get("count", 9) возвращает 0?','dict-get'],
 ['Как get ведёт себя для отсутствующего ключа словаря?','dict-get'],
 ['Как выполнить HTTP GET запрос requests?','topic-requests'],
 ['Как работает requests.get(url)?','topic-requests'],
 ['Как получить несколько чисел одной строкой input split?','input-split'],
 ['Почему range не включает правую границу?','range-boundary'],
 ['Что делает else у цикла for?','loop-control'],
 ['Почему итератор пустой второй раз?','iterator-exhausted'],
 ['Зачем zip strict при разной длине?','zip-strict'],
 ['Как проверить регуляркой всю строку fullmatch?','regex-fullmatch'],
 ['Что значит aware и naive datetime?','timezone'],
 ['Как работают SQL параметры sqlite?','sql-parameters'],
 ['Как обработать requests timeout?','requests-timeout'],
 ['Почему нельзя eval(input())? eval безопасность','unsafe-eval'],
 ['Что значит TypeError: int object is not callable?','err-callable'],
 ['TypeError: NoneType object is not subscriptable','err-subscript'],
 ["TypeError: unsupported operand type(s) for +: 'int' and 'str'",'err-operand'],
 ["AttributeError: 'NoneType' object has no attribute 'append'",'err-none-attribute'],
 ['TypeError: unhashable type: list','err-unhashable'],
 ['ValueError: too many values to unpack (expected 2)','err-unpack'],
 ['ValueError: invalid literal for int() with base 10: "-x"','err-value'],
 ['TypeError: missing required positional argument: name','err-arguments'],
 ['UnboundLocalError: cannot access local variable count','err-unbound'],
 ['SyntaxError: invalid syntax','err-syntax'],
 ['IndentationError: expected an indented block','err-indent'],
 ['TabError: inconsistent use of tabs and spaces in indentation','err-tab'],
 ['RecursionError: maximum recursion depth exceeded','err-recursion'],
 ['JSONDecodeError: Expecting property name enclosed in double quotes','err-json'],
 ['RuntimeError: dictionary changed size during iteration','err-dict-size'],
 ['EOFError: EOF when reading a line','err-eof'],
 ['Как остановить бесконечный цикл?','platform-stop'],
 ['Почему не проходит автопроверка?','platform-tests'],
 ['С чего начать в StudyPy?','platform-start'],
 ['Какая версия Python и доступен ли copy.replace?','platform-version'],
 ['Как работает asyncio?','topic-async'],
 ['Что такое ctypes?','topic-ctypes'],
 ['Зачем нужны метаклассы?','topic-metaclasses'],
];
const misses:string[]=[]; for(const [question,id] of cases){const actual=answerFromKnowledge(question,LESSON_CATALOG).entryId;if(actual!==id)misses.push(question+" -> "+actual+" expected "+id);}
checks+=cases.length;
for(const question of [
 'Составь список покупок на завтра','Какой ключ от двери потерян?','Наш класс едет на экскурсию',
 'Какая погода сегодня?','Сколько стоит билет на поезд?','Покажи расписание поездов',
 'Как приготовить рецепт супа?','Как настроить React useState?','Как исправить TypeError в JavaScript?',
 'Переведи слово get на русский','What type of guitar should I buy?','What is a list of shops?',
 'What is global warming?','Какой курс валют сегодня?','Что такое абсолютно неизвестная штука?','Python неизвестный API frobnicate',
 'printable stringify integral getter setting offset',
]){const actual=answerFromKnowledge(question,LESSON_CATALOG);if(actual.matched)misses.push('UNRELATED '+question+' -> '+actual.entryId);else checks++;}
check(!answerFromKnowledge('get').matched,'Bare get needs clarification');
check(!answerFromKnowledge('   ').matched,'Empty question');
check(!answerFromKnowledge('???').matched,'Punctuation');
for(const id of ['conditions','oop'])check(!MENTOR_ENTRIES.some(entry=>entry.lessonId===id),'No broken link '+id);
assert.deepEqual(misses,[],misses.join('\n'));
const examples=MENTOR_ENTRIES.filter(entry=>entry.example).map(entry=>({id:entry.id,...entry.example!}));
const python=process.env.PYTHON_BIN??process.env.CONTENT_PYTHON??(process.platform==='win32'?'py':'python3');
const script="import ast, asyncio, json, os, sys, tempfile\nbundle=json.load(sys.stdin)\ncompiled=compile(bundle['harness'],'<shared evaluator>','exec',flags=ast.PyCF_ALLOW_TOP_LEVEL_AWAIT)\nfailures=[]\nfor example in bundle['examples']:\n    payload={'code':example['code'],'tests':[{'stdin':example.get('stdin',[]),'expectedOutput':example['output']}]}\n    environment={'_sp_payload_json':json.dumps(payload,ensure_ascii=False)}\n    with tempfile.TemporaryDirectory(prefix='studypy-mentor-',dir=os.environ.get('CONTENT_QA_TMP')) as folder:\n        previous=os.getcwd()\n        try:\n            os.chdir(folder)\n            asyncio.run(eval(compiled,environment))\n            result=json.loads(environment['_sp_json_result'])\n            if not result['passed']:\n                failures.append(example['id']+': '+str(result['tests']))\n        finally:\n            os.chdir(previous)\nprint(json.dumps({'examples':len(bundle['examples']),'failures':failures},ensure_ascii=False))\nsys.exit(1 if failures else 0)";
const run=spawnSync(python,['-c',script],{input:JSON.stringify({examples,harness:PYTHON_HARNESS}),encoding:'utf8',timeout:120000,env:{...process.env,PYTHONIOENCODING:'utf-8',PYTHONUTF8:'1'}});
if(run.error)throw new Error('Set PYTHON_BIN to a local Python3 interpreter: '+run.error.message);
assert.equal(run.status,0,run.stderr+'\n'+run.stdout);
const result=JSON.parse(run.stdout);
check(result.examples===examples.length && !result.failures.length,'Every snippet executes with advertised output');
console.log('Mentor knowledge: '+MENTOR_ENTRIES.length+' entries, '+lessons.size+' topics, '+examples.length+' executed examples, '+checks+' content/retrieval checks; PASS');
