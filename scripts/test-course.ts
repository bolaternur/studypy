import assert from 'node:assert/strict';
import {mkdir,readdir,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';import {pathToFileURL} from 'node:url';import {spawnSync} from 'node:child_process';
import {PYTHON_HARNESS} from '../src/runtime/pythonHarness';
import {isCodeExercise,type CourseModule} from '../src/course/types';
const filter=process.argv.find(s=>s.startsWith('--module='))?.slice(9);
const structureOnly=process.argv.includes('--structure');
const files=(await readdir('src/course/modules')).filter(f=>f.endsWith('.ts')&&!f.startsWith('_')&&(!filter||f===filter+'.ts'));
assert(files.length,'No authored modules found');
const modules:CourseModule[]=await Promise.all(files.map(async file=>(await import(pathToFileURL(resolve('src/course/modules',file)).href)).default));
const ids=new Set<string>();const known=new Set(modules.flatMap(m=>[m.id,...m.lessons.flatMap(l=>[l.id,...l.steps.map(s=>s.id)])]));let assertions=0;
const dependencies=new Map<string,string[]>();
const check=(value:unknown,label:string)=>{assert.ok(value,label);assertions++;};
const unique=(id:string)=>{check(typeof id==='string'&&/^[a-z][a-z0-9-]+$/.test(id),'Stable ID: '+id);check(!ids.has(id),'Duplicate ID: '+id);ids.add(id);};
for(const m of modules){unique(m.id);dependencies.set(m.id,m.prerequisites);check(m.title&&m.goal&&m.sources.length,'Module contract: '+m.id);check(m.lessons.length>=3,'Not a single-card module: '+m.id);check(m.sources.every(s=>s.startsWith('https://docs.python.org/3.12/')||s.startsWith('https://git-scm.com/')||s.startsWith('https://docs.pytest.org/')||s.startsWith('https://pyodide.org/')||s.startsWith('https://packaging.python.org/')||s.startsWith('https://peps.python.org/')),'Primary sources: '+m.id);
 for(const l of m.lessons){unique(l.id);check(l.title&&l.goal&&l.steps.length>0&&l.exercises.length>0,'Complete lesson: '+l.id);if(!filter)for(const id of l.prerequisites)check(known.has(id),'Unknown prerequisite '+l.id+' -> '+id);
  dependencies.set(l.id,l.prerequisites);
  for(const s of l.steps){unique(s.id);check(s.title&&s.goal&&Array.isArray(s.prerequisites)&&s.paragraphs.length>0&&s.paragraphs.every(p=>p.trim().length>15),'Written teaching step with goal and prerequisites: '+s.id);dependencies.set(s.id,s.prerequisites??[]);if(!filter)for(const id of s.prerequisites??[])check(known.has(id),'Unknown step prerequisite '+s.id+' -> '+id);for(const e of s.examples){unique(e.id);check(e.code&&typeof e.output==='string'&&e.explanation&&e.title,'Worked example: '+e.id);if(e.trace)check(e.trace.headers.length>1&&e.trace.rows.length>0&&e.trace.rows.every(r=>r.length===e.trace!.headers.length),'Rectangular trace table: '+e.id);}}
  for(const t of l.exercises){unique(t.id);check(t.title&&t.goal&&t.prompt&&t.inputFormat&&t.outputFormat&&t.constraints,'Task contract: '+t.id);check(t.examples.length>0&&t.examples.every(e=>typeof e.output==='string'&&e.explanation),'Explained task examples: '+t.id);check(t.hints.length>=3&&t.hints.every(h=>h.trim().length>5),'Graduated hints: '+t.id);check(t.solutionExplanation.length>0,'Solution rationale: '+t.id);if(!filter)for(const id of t.prerequisites)check(known.has(id),'Unknown task prerequisite '+t.id+' -> '+id);
   if(isCodeExercise(t)){check(t.reference&&t.alternative&&t.reference!==t.alternative,'Reference and alternative: '+t.id);check(t.tests?.length&&t.tests.every(c=>c.expectedOutput!==undefined||Object.hasOwn(c,'expectedValue')||c.expectedCallOutput!==undefined),'Observable tests: '+t.id);check((t.wrongSolutions?.length??0)>=2,'Characteristic wrong solutions: '+t.id);check(!t.hints[0].includes(t.reference!),'First hint must not reveal entire solution: '+t.id);}
   else if(t.kind==='order'){check(t.blocks?.length&&Array.isArray(t.answer)&&t.answer.length===t.blocks.length&&t.answer.every(id=>t.blocks!.some(b=>b.id===id)),'Ordered block contract: '+t.id);}
   else if(t.choices){check(t.choices.length>=2&&Array.isArray(t.answer)&&t.answer.length>0&&t.answer.every(id=>t.choices!.some(c=>c.id===id)),'Choice contract: '+t.id);}
   else check(t.kind==='predict'&&typeof t.answer==='string'&&t.initialCode,'Prediction contract: '+t.id);
  }
 }
 if(!filter)for(const id of m.prerequisites)check(known.has(id),'Unknown module prerequisite '+m.id+' -> '+id);
 if(m.track==='base'){check(m.lessons.some(l=>l.role==='review'),'Mixed review: '+m.id);check(m.lessons.some(l=>['assessment','final'].includes(l.role)),'Independent assessment: '+m.id);check(m.lessons.some(l=>l.role==='project'),'Applied project: '+m.id);}
}
const summaries=modules.map(m=>({id:m.id,title:m.title,track:m.track,lessons:m.lessons.length,steps:m.lessons.reduce((n,l)=>n+l.steps.length,0),examples:m.lessons.reduce((n,l)=>n+l.steps.reduce((n,s)=>n+s.examples.length,0),0),tasks:m.lessons.reduce((n,l)=>n+l.exercises.length,0),independent:m.lessons.reduce((n,l)=>n+l.exercises.filter(t=>t.kind==='code').length,0),types:Object.fromEntries(['code','modify','debug','gap','predict','choice','order','explain'].map(k=>[k,m.lessons.reduce((n,l)=>n+l.exercises.filter(t=>t.kind===k).length,0)])),review:m.lessons.filter(l=>l.role==='review').length,assessments:m.lessons.filter(l=>['assessment','final'].includes(l.role)).length,projects:m.lessons.filter(l=>l.role==='project').length,finals:m.lessons.filter(l=>l.role==='final').length}));
if(!filter){const base=summaries.filter(m=>m.track==='base');check(base.length===12,'All twelve base modules');const tasks=base.reduce((n,m)=>n+m.tasks,0);check(tasks>=400&&tasks<=600,'Base has 400–600 substantive exercises, got '+tasks);check(base.reduce((n,m)=>n+m.independent,0)>=250,'250 independent coding tasks');check(base.reduce((n,m)=>n+m.projects,0)>=10,'Ten small projects');check(base.reduce((n,m)=>n+m.finals,0)>=2,'Two separate final assessments');}
if(!filter){
 const visiting=new Set<string>(),visited=new Set<string>();
 const visit=(id:string)=>{check(!visiting.has(id),'Prerequisite cycle at '+id);if(visited.has(id))return;visiting.add(id);for(const next of dependencies.get(id)??[])visit(next);visiting.delete(id);visited.add(id);};
 for(const id of dependencies.keys())visit(id);
 const {COURSE_INDEX}=await import('../src/course/index.generated');
 check(COURSE_INDEX.length===modules.length,'Generated module index is current; run npm run course:index');
 for(const module of modules){const entry=COURSE_INDEX.find(m=>m.id===module.id);check(entry?.lessons.length===module.lessons.length,'Generated lessons: '+module.id);for(const lesson of module.lessons){const indexed=entry?.lessons.find(l=>l.id===lesson.id);check(indexed?.tasks.length===lesson.exercises.length&&indexed?.steps.length===lesson.steps.length&&indexed.examples===lesson.steps.reduce((n,s)=>n+s.examples.length,0),'Generated lesson counts: '+lesson.id);check(lesson.exercises.every(t=>indexed?.tasks.some(i=>i.id===t.id&&i.kind===t.kind)),'Generated stable task links: '+lesson.id);}}
 const {LEGACY_COURSE_MODULE}=await import('../src/course/legacy-links');for(const id of Object.values(LEGACY_COURSE_MODULE))check(modules.some(m=>m.id===id),'Legacy target exists: '+id);
 const {TYPING_LEVELS}=await import('../src/games/typing-levels');const {TYPING_COURSE_LINKS}=await import('../src/course/typing-links');
 check(TYPING_LEVELS.length===80&&Object.keys(TYPING_COURSE_LINKS).length===80,'Preserve all eighty typing levels and explicit links');
 for(const level of TYPING_LEVELS){const link=TYPING_COURSE_LINKS[level.id];const module=modules.find(m=>m.id===link?.moduleId);const lesson=module?.lessons.find(l=>l.id===link?.lessonId);check(link?.misconception&&lesson?.exercises.some(t=>t.kind==='code'),'Typing has reviewed explanation and real independent exercise: '+level.id);if(link?.practiceTaskId)check(lesson?.exercises.some(t=>t.id===link.practiceTaskId&&t.kind==='code'),'Specific typing practice task: '+level.id);}
}
let behavior:Record<string,number>|undefined;
if(!structureOnly){const python=process.env.PYTHON_BIN??(process.platform==='win32'?'py':'python3');
const result=spawnSync(python,['scripts/test-course.py'],{input:JSON.stringify({modules,harness:PYTHON_HARNESS}),encoding:'utf8',timeout:300000,maxBuffer:10*1024*1024,env:{...process.env,PYTHONUTF8:'1',PYTHONIOENCODING:'utf-8'}});
if(result.error)throw result.error;process.stdout.write(result.stdout);process.stderr.write(result.stderr);assert.equal(result.status,0,'Authored Python behavior checks failed');behavior=JSON.parse(result.stdout.split('\n').find(line=>line.startsWith('{'))!);}
await mkdir('test-results',{recursive:true});
await writeFile('test-results/course-readiness'+(filter?'-'+filter:'')+(structureOnly?'-structure':'')+'.json',JSON.stringify({assertions,behavior,modules:summaries},null,2));
console.log('Course structure:',assertions,'checks PASS;',JSON.stringify(summaries));
