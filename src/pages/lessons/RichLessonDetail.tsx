import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Lesson } from '../../constants/lessons';
import { LESSON_CATALOG } from '../../constants/lesson-catalog';
import { PythonGame } from '../../components/PythonGame';
import { useLearningProgress } from '../../hooks/useLearningProgress';
import { useAuth } from '../../contexts/AuthContext';
import { LEGACY_COURSE_MODULE } from '../../course/legacy-links';
import '../../course/course.css';
export function RichLessonDetail({lesson}:{lesson:Lesson}) {
  const {currentUser,completeLesson}=useAuth();
  const {completed,completeLocal,remember}=useLearningProgress();
  const [sync,setSync]=useState<'idle'|'saving'|'saved'|'failed'>('idle');
  const busy=useRef(false);
  const [finished,setFinished]=useState(false);
  const [localSaved,setLocalSaved]=useState(true);
  useEffect(()=>{remember(lesson.id);document.title=lesson.title+' — StudyPy';},[lesson.id,lesson.title,remember]);
  const next=LESSON_CATALOG[LESSON_CATALOG.findIndex(l=>l.id===lesson.id)+1];
  const finish=async()=>{
    if(busy.current)return;busy.current=true;
    setLocalSaved(completeLocal(lesson.id));setFinished(true);
    if(!currentUser){busy.current=false;return;}
    setSync('saving');
    try{const saved=await completeLesson(lesson.id,0);setSync(saved?'saved':'failed');}catch{setSync('failed');}finally{busy.current=false;}
  };
  return <article className="page-container lesson-page">
    <div className="course-legacy-note"><p>Это прежнее вводное знакомство с темой. Его отметка не означает прохождение нового модуля и не засчитывает новые задачи.</p><Link className="text-link" to={LEGACY_COURSE_MODULE[lesson.id]?'/learn/'+LEGACY_COURSE_MODULE[lesson.id]:'/pathways?view=advanced'}>Открыть подробную программу по теме →</Link></div>
    <Link className="back-link" to="/pathways"><ArrowLeft size={17}/> Программа обучения</Link>
    <header className="lesson-heading"><p className="muted text-sm">{lesson.topic} · {lesson.estimatedMinutes} мин{completed.includes(lesson.id)?' · Пройдено':''}</p><h1>{lesson.title}</h1><p>{lesson.description}</p><a className="text-link" href="#practice">Перейти к практике ↓</a></header>
    <div className="lesson-layout"><div className="lesson-content">
      {lesson.sections?.length?lesson.sections.map(section=><section className="lesson-section" key={section.id} id={section.id}><h2>{section.title}</h2>{section.content.map((paragraph,i)=><p key={i}>{paragraph}</p>)}{section.stdin?.length ? <div className="example-stdin"><p className="muted text-sm">Ввод для примера</p><pre>{section.stdin.join("\n")}</pre></div> : null}{section.code&&<pre className="code-example"><code>{section.code}</code></pre>}{section.expectedOutput!==undefined&&<div className="example-output"><p className="muted text-sm">Ожидаемый вывод</p><pre className="whitespace-pre-wrap break-words">{section.expectedOutput || "Программа завершится без вывода."}</pre></div>}</section>):<p>{lesson.content}</p>}
      <PythonGame lesson={lesson} onComplete={()=>void finish()}/>
      {finished&&<section className="lesson-complete" aria-live="polite"><h2>Урок пройден</h2><p>{!currentUser?(localSaved?'Результат сохранён в этом браузере.':'Не удалось сохранить результат на устройстве. Скопируй свой код перед выходом.'):sync==='saving'?'Сохраняем отметку в аккаунте…':sync==='saved'?'Отметка сохранена в аккаунте.':'На устройстве результат сохранён. Синхронизация пока недоступна.'}</p><p className="muted text-sm">Это учебный прогресс по проверке в браузере; он не влияет на соревновательный рейтинг.</p>{sync==='failed'&&<button className="secondary-button" onClick={()=>void finish()}>Повторить синхронизацию</button>}{next?<Link className="primary-button mt-4" to={'/lesson/'+next.id}>Далее: {next.title}<ArrowRight size={17}/></Link>:<Link className="primary-button mt-4" to="/sandbox">Перейти к своим программам</Link>}</section>}
      {!!lesson.notes?.length&&<details className="lesson-sources"><summary>Подробнее о теме</summary>{lesson.notes?.map(note=><p key={note} className="mb-3">{note}</p>)}</details>}
      {!!lesson.sources?.length&&<details className="lesson-sources"><summary>Документация по теме</summary><ul>{lesson.sources?.map((source:string)=><li key={source}><a href={source} target="_blank" rel="noreferrer">{source.replace('https://','')}</a></li>)}</ul></details>}
    </div><aside className="lesson-contents"><h2>В этом уроке</h2><nav aria-label="Содержание урока">{lesson.sections?.map(section=><a key={section.id} href={'#'+section.id}>{section.title}</a>)}<a href="#practice">Практика</a></nav><p className="muted text-sm mt-6">Черновик сохраняется отдельно для каждой задачи. К нему можно вернуться после обновления страницы.</p></aside></div>
  </article>;
}
