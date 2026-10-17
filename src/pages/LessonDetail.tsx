import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { loadLesson, type Lesson } from '../constants/lessons';
import { LESSON_CATALOG, resolveLessonId } from '../constants/lesson-catalog';
import { RichLessonDetail } from './lessons/RichLessonDetail';
export function LessonDetail() {
  const { id = '' } = useParams();
  const resolved = resolveLessonId(id);
  const canonical = LESSON_CATALOG.some(lesson => lesson.id === resolved) ? resolved : undefined;
  const [lesson,setLesson] = useState<Lesson>();
  const [error,setError] = useState(false);
  const [retry,setRetry] = useState(0);
  useEffect(()=>{
    let active=true;setLesson(undefined);setError(false);
    if(canonical) void loadLesson(canonical).then(value=>{if(active)setLesson(value);}).catch(()=>{if(active)setError(true);});
    return ()=>{active=false;};
  },[canonical,retry]);
  if(canonical&&canonical!==id)return <Navigate to={'/lesson/'+canonical} replace/>;
  if(!canonical)return <div className="page-container program-page"><h1>Урок не найден</h1><Link className="text-link" to="/pathways">Открыть программу обучения</Link></div>;
  if(error)return <div className="page-container program-page" role="alert"><p>Не удалось загрузить урок. Твой черновик сохранён в браузере.</p><button className="secondary-button mt-4" onClick={()=>setRetry(v=>v+1)}>Попробовать ещё раз</button></div>;
  if(!lesson)return <p className="page-container program-page" role="status">Загрузка урока…</p>;
  return <RichLessonDetail key={lesson.id} lesson={lesson}/>;
}
