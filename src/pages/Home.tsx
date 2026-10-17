import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useCourseProgress } from '../course/useCourseProgress';
import {plural} from '../utils/russian';
import { COURSE_SUMMARY } from '../course/summary.generated';

export function Home() {
  const { progress } = useCourseProgress();
  const place=progress.location;
  const started=Boolean(place);
  const resume=place?`/learn/${place.moduleId}/${place.lessonId}${place.item?'?'+(place.isTask?'task':'step')+'='+encodeURIComponent(place.item):''}`:COURSE_SUMMARY.firstLessonUrl;
  return <div className="home-page page-container">
    <section className="home-hero">
      <div><h1>Изучай Python<br/><span className="text-emerald-300">на практике</span></h1>
        <p className="home-lead">Понятные объяснения по шагам, разобранные примеры и самостоятельные задачи с проверкой. От первой команды до своих программ.</p>
        <Link className="primary-button" to={resume}>{started?'Продолжить обучение':'Начать первый урок'}<ArrowRight size={18} aria-hidden="true"/></Link>
        {started&&<p className="muted mt-3">Сохранённый шаг: {place?.title??'Твой урок'}</p>}
        <p className="muted mt-5 text-sm">Материалы и практика доступны без аккаунта. Прогресс нового курса сохраняется на устройстве.</p>
      </div>
      <figure className="example-panel"><figcaption>Пример: программа и её результат</figcaption><pre><code><span className="text-ink-70"># Твоя первая программа</span>{'\n'}print(<span className="text-emerald-300">"Привет, Python!"</span>)</code></pre><div className="example-output"><span>Ожидаемый вывод</span><pre>Привет, Python!</pre></div></figure>
    </section>
    <section className="home-curriculum" aria-labelledby="home-program"><div><h2 id="home-program">От первой строки<br/>к своим программам</h2><p className="muted">В базовом курсе {COURSE_SUMMARY.baseLessons} {plural(COURSE_SUMMARY.baseLessons,'урок','урока','уроков')} и {COURSE_SUMMARY.baseExercises} {plural(COURSE_SUMMARY.baseExercises,'задание','задания','заданий')}, включая {COURSE_SUMMARY.baseProjects} {plural(COURSE_SUMMARY.baseProjects,'мини-проект','мини-проекта','мини-проектов')}. Программа следует зависимостям тем; к пройденному можно вернуться.</p><Link className="text-link" to="/pathways">Вся программа <ArrowRight size={16}/></Link></div>
      <ol className="learning-outline"><li><strong>Основы</strong><p>Вывод → переменные → типы → арифметика → ввод.</p></li><li><strong>Управление программой</strong><p>Сравнения, условия, циклы и коллекции.</p></li><li><strong>Свои решения</strong><p>Функции, модули, файлы и дальнейшая практика.</p></li></ol>
    </section>
    <section className="home-practice"><h2>Закрепи то, что изучил</h2><div className="practice-links"><Link to="/sandbox"><strong>Песочница <ArrowRight size={17}/></strong><span>Проверь идею в редакторе Python. Код сохраняется на устройстве.</span></Link><Link to="/arcade"><strong>Учебные игры <ArrowRight size={17}/></strong><span>Найди ошибку, предскажи вывод или проведи бота к цели.</span></Link></div></section>
  </div>;
}
