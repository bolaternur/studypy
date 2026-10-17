import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLearningProgress } from '../hooks/useLearningProgress';
import { LESSON_CATALOG } from '../constants/lesson-catalog';
import { CURRICULUM_SUMMARY } from '../constants/curriculum-summary';

export function Home() {
  const { completed, resume, hasVisited } = useLearningProgress();
  const started = hasVisited || completed.length > 0 || (resume && resume.id !== LESSON_CATALOG[0]?.id);
  return <div className="home-page page-container">
    <section className="home-hero">
      <div><h1>Изучай Python<br/><span className="text-emerald-300">на практике</span></h1>
        <p className="home-lead">Короткое объяснение, твой код и понятная проверка результата. Начни с первой программы прямо в браузере.</p>
        <Link className="primary-button" to={resume?'/lesson/'+resume.id:'/sandbox'}>{!resume?'Открыть песочницу':started?'Продолжить обучение':'Начать первый урок'}<ArrowRight size={18} aria-hidden="true"/></Link>
        {started&&resume&&<p className="muted mt-3">Следующий шаг: {resume.title}</p>}
        <p className="muted mt-5 text-sm">Бесплатно. Первый урок доступен без аккаунта.</p>
      </div>
      <figure className="example-panel"><figcaption>Пример: программа и её результат</figcaption><pre><code><span className="text-ink-70"># Твоя первая программа</span>{'\n'}print(<span className="text-emerald-300">"Привет, Python!"</span>)</code></pre><div className="example-output"><span>Ожидаемый вывод</span><pre>Привет, Python!</pre></div></figure>
    </section>
    <section className="home-curriculum" aria-labelledby="home-program"><div><h2 id="home-program">От первой строки<br/>к своим программам</h2><p className="muted">{CURRICULUM_SUMMARY.lessons} {plural(CURRICULUM_SUMMARY.lessons,'урок','урока','уроков')} и {CURRICULUM_SUMMARY.challenges} {plural(CURRICULUM_SUMMARY.challenges,'задача','задачи','задач')}. Программа следует зависимостям тем; к пройденному можно вернуться.</p><Link className="text-link" to="/pathways">Вся программа <ArrowRight size={16}/></Link></div>
      <ol className="learning-outline"><li><strong>Основы</strong><p>Вывод → переменные → типы → арифметика → ввод.</p></li><li><strong>Управление программой</strong><p>Сравнения, условия, циклы и коллекции.</p></li><li><strong>Свои решения</strong><p>Функции, модули, файлы и дальнейшая практика.</p></li></ol>
    </section>
    <section className="home-practice"><h2>Закрепи то, что изучил</h2><div className="practice-links"><Link to="/sandbox"><strong>Песочница <ArrowRight size={17}/></strong><span>Проверь идею в редакторе Python. Код сохраняется на устройстве.</span></Link><Link to="/arcade"><strong>Учебные игры <ArrowRight size={17}/></strong><span>Найди ошибку, предскажи вывод или проведи бота к цели.</span></Link></div></section>
  </div>;
}
export function plural(n:number,one:string,few:string,many:string) { return n%100>=11&&n%100<=14?many:n%10===1?one:n%10>=2&&n%10<=4?few:many; }
