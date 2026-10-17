import { Link } from 'react-router-dom';
import { useState } from 'react';
import { CheckCircle2, ArrowRight, Circle } from 'lucide-react';
import { LESSON_CATALOG } from '../constants/lesson-catalog';
import { useLearningProgress } from '../hooks/useLearningProgress';
import { useAuth } from '../contexts/AuthContext';
export function Pathways() {
  const { completed, resume } = useLearningProgress();
  const { currentUser } = useAuth();
  const [query,setQuery] = useState('');
  const topics = [...new Set(LESSON_CATALOG.map(lesson=>lesson.topic))];
  return <div className="page-container program-page">
    <header className="page-heading"><h1>Программа обучения</h1><p className="muted">Начни с основ и двигайся по порядку. Открыть любой урок можно в своём темпе.</p></header>
    <section className="continue-panel" aria-label="Твой следующий шаг"><div><p className="muted text-sm">Пройдено {completed.length} из {LESSON_CATALOG.length}</p><h2>{resume?resume.title:'Все уроки пройдены'}</h2><p className="muted text-sm">{currentUser?'Отметки из аккаунта и этого браузера объединены.':'Прогресс хранится в этом браузере. Аккаунт нужен для синхронизации новых прохождений.'}</p></div><Link className="primary-button" to={resume?'/lesson/'+resume.id:'/sandbox'}>{resume?(completed.length?'Продолжить обучение':'Начать первый урок'):'Открыть песочницу'}<ArrowRight size={18}/></Link></section>
    <label className="search-label">Найти урок<input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Например, списки или функции"/></label>
    <div className="program-topics">{topics.map(topic=>{
      const lessons = LESSON_CATALOG.filter(lesson=>lesson.topic===topic&& (lesson.title+' '+lesson.description).toLocaleLowerCase('ru').includes(query.toLocaleLowerCase('ru')));
      if(!lessons.length)return null;
      return <section key={topic} className="topic-section"><h2>{topic}</h2><ol>{lessons.map(lesson=>{const done=completed.includes(lesson.id), current=resume?.id===lesson.id;return <li key={lesson.id}><Link className={'lesson-row '+(current?'current':'')} to={'/lesson/'+lesson.id} aria-current={current?'step':undefined}><span className="lesson-status">{done?<CheckCircle2 size={21} aria-label="Пройдено"/>:<Circle size={20} aria-hidden="true"/>}</span><div className="min-w-0"><h3>{lesson.title}{current&&<span className="current-label">Следующий шаг</span>}</h3><p>{lesson.description}</p></div><span className="lesson-time">{lesson.estimatedMinutes} мин<ArrowRight size={17}/></span></Link></li>})}</ol></section>;
    })}</div>
    {query&&!LESSON_CATALOG.some(l=>(l.title+' '+l.description).toLocaleLowerCase('ru').includes(query.toLocaleLowerCase('ru')))&&<p role="status">Такой темы нет. Попробуй другое слово.</p>}
  </div>;
}
