import { useEffect, useRef, useState } from 'react';
import { CodeEditor } from './CodeEditor';
import type { Lesson } from '../constants/lessons';
import { useAuth } from '../contexts/AuthContext';
import { isStringArray, readJson, readString, writeJson, writeString } from '../utils/storage';
export function PythonGame({lesson,onComplete,onMistake}:{lesson:Lesson;onComplete:()=>void;onMistake?:()=>void}) {
  const {currentUser,setCurrentCode,setCurrentChallenge} = useAuth();
  const challenges=lesson.challenges || (lesson.challenge?[lesson.challenge]:[]);
  const progressKey='studypy_tasks_v2_'+(currentUser?.uid || 'guest')+'_'+lesson.id;
  const [index,setIndex]=useState(()=>Math.min(challenges.length-1,Math.max(0,Number(readString(progressKey+'_position','0')) || 0)));
  const [passed,setPassed]=useState(()=>readJson(progressKey,isStringArray,[]));
  const [hint,setHint]=useState(false);
  const challenge=challenges[index];
  const lock=useRef(false);
  useEffect(()=>{ lock.current=false;setHint(false);writeString(progressKey+'_position',String(index)); },[index,progressKey]);
  useEffect(()=>{if(challenge)setCurrentChallenge(challenge.question+': '+challenge.description);return ()=>{setCurrentChallenge('');};},[challenge,setCurrentChallenge]);
  if(!challenge)return <p>У этого урока пока нет практики.</p>;
  const success=()=>{
    if(lock.current)return;lock.current=true;
    setPassed(previous=>{const next=[...new Set([...previous,challenge.id || String(index)])];writeJson(progressKey,next);return next;});
  };
  const allPassed=challenges.every((_,i)=>passed.includes(challenges[i].id || String(i)));
  return <section className="lesson-practice" id="practice" aria-labelledby="practice-heading">
    <div className="flex flex-wrap items-center justify-between gap-3 mb-5"><h2 id="practice-heading">Практика</h2><span className="muted text-sm">Задача {index+1} из {challenges.length}</span></div>
    {challenges.length>1&&<nav className="task-nav" aria-label="Задачи урока">{challenges.map((_,i)=><button key={i} aria-current={index===i?'step':undefined} className={index===i?'selected':''} onClick={()=>setIndex(i)}>{i+1}{passed.includes(challenges[i].id || String(i))?' ✓':''}</button>)}</nav>}
    <h3 className="text-xl font-semibold mb-2">{challenge.question}</h3><p className="task-description">{challenge.description}</p>
    {challenge.example&&challenge.example!=='Нет примера'&&<pre className="task-example">{challenge.example}</pre>}
    <CodeEditor key={progressKey+':'+(challenge.id || index)} draftKey={'lesson:'+progressKey+':'+(challenge.id || index)} lessonId={lesson.id} initialCode={challenge.initialCode} testCases={challenge.testCases} onSuccess={success} onFailure={()=>{lock.current=false;onMistake?.();}} onCodeChange={setCurrentCode}/>
    {challenge.hint&&<div className="mt-4"><button className="quiet-button" aria-expanded={hint} onClick={()=>setHint(v=>!v)}>{hint?'Скрыть подсказку':'Показать подсказку'}</button>{hint&&<p className="muted mt-2">{challenge.hint}</p>}</div>}
    {passed.includes(challenge.id || String(index))&&<div className="practice-result" role="status"><p>✓ Задача решена. Проверка выполнена в твоём браузере.</p>{index<challenges.length-1&&<button className="secondary-button" onClick={()=>setIndex(i=>i+1)}>Следующая задача</button>}</div>}
    {allPassed&&<button className="primary-button mt-5" onClick={onComplete}>Завершить урок</button>}
  </section>;
}
