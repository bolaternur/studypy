import {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import type {TypingLevel} from '../games/typing-levels';
import {COURSE_INDEX} from './index.generated';
import {loadCourseModule,lessonUrl} from './load';
import {StudyContent} from './CoursePages';
import {TYPING_COURSE_LINKS} from './typing-links';
import type {CourseModule} from './types';
import './course.css';
const GROUP_INTRO=[
 'print получает значения и отправляет их в вывод. Разделитель sep вставляется между аргументами, а end — после последнего аргумента. Кавычки, запятые и скобки принадлежат записи программы; сначала найди границы строк и аргументов, затем предскажи видимый текст.',
 'Присваивание сначала вычисляет правую часть, затем связывает результат с именем слева. Поэтому обновление переменной использует её прежнее значение. Разделяй числовые вычисления и соединение текста; / даёт обычное деление, // — целочисленное с округлением вниз, % — остаток.',
 'У строки есть последовательность символов с индексами от нуля. Срез задаёт границы части строки, не включая правую. Методы строк создают новые значения: исходная строка не меняется сама. Перед набором проследи, какая именно строка передаётся в print после каждого преобразования.',
 'Условие выбирает выполняемый блок. Сначала вычисляется сравнение, затем Python проверяет ветви сверху вниз; в цепочке if/elif/else выбирается первая подходящая. Отступ связывает строки с ветвью, а == сравнивает значения. Проверь равенство граничному значению отдельно.',
 'Цикл повторяет блок, а переменная цикла получает очередное значение. До запуска отдели начальное состояние, диапазон повторений и обновление накопителя. В while условие проверяется перед каждой итерацией, поэтому изменение состояния должно приближать остановку. Таблицы трассировки в курсе помогают видеть это по шагам.',
 'Индекс сообщает позицию, а элемент — значение на этой позиции. Изменение списка видно через все ссылки на тот же объект; копирование создаёт другой внешний список. При фильтрации безопаснее построить новый результат, чем удалять элементы из списка, который сейчас перебирается.',
 'Словарь сопоставляет ключ со значением, множество хранит уникальные элементы. Для частоты нужно инициализировать отсутствующий ключ и обновлять прежний счётчик. Порядок элементов множества не является форматом отчёта: для предсказуемого вывода используй явно описанную сортировку.',
 'Определение функции сохраняет команды для будущего вызова. Аргументы передают конкретные значения параметрам. return отдаёт результат вызывающему коду, print только пишет в вывод; функция без явного return возвращает None. Для каждого вызова подставь аргументы и проследи путь до возврата.',
 'Ошибки и обработка данных требуют явного контракта: какие строки допустимы, что считать пустым набором, какой результат возвращается при неудаче. StringIO хранит текстовый поток в памяти браузера. JSON и CSV разбираются соответствующими библиотеками; это не поиск подстрок в сериализованном тексте.',
 'Небольшая программа объединяет несколько навыков. Сначала отдели входные данные, преобразование и формат результата. Затем проследи состояние между шагами и проверь пустой ввод, повторения и границы. Перепечатывание помогает узнавать синтаксис, а самостоятельная прикладная задача проверяет, можешь ли ты выбрать эти шаги сам.',
];
export function TypingLearning({level}:{level:TypingLevel}){
 const number=Number(level.id.slice(-3))-1;const group=Math.floor(number/8);const connection=TYPING_COURSE_LINKS[level.id];const moduleId=connection.moduleId;
 const [module,setModule]=useState<CourseModule>();const [error,setError]=useState(false);const [retry,setRetry]=useState(0);const [prediction,setPrediction]=useState('');const [feedback,setFeedback]=useState('');
 useEffect(()=>{let active=true;setModule(undefined);setError(false);void loadCourseModule(moduleId).then(m=>{if(active)setModule(m);}).catch(()=>{if(active)setError(true);});return()=>{active=false;};},[moduleId,retry]);
 const lesson=module?.lessons.find(l=>l.id===connection.lessonId);
 const modifyTask=lesson?.exercises.find(t=>['modify','debug','gap'].includes(t.kind))??lesson?.exercises.find(t=>t.kind==='code');
 const independent=lesson?.exercises.find(t=>t.id===connection.practiceTaskId)??lesson?.exercises.find(t=>t.kind==='code'&&t.id!==modifyTask?.id)??lesson?.exercises.find(t=>t.kind==='code');
 const misconception=connection.misconception;
 return <div className="course-learning-panel"><h3>{level.topic}: от разбора к самостоятельному решению</h3><p>{GROUP_INTRO[group]}</p><h4>1. Разбери программу</h4><p>{level.hint} Проследи выполнение до каждого вывода; сравни объяснение ниже с конструкциями образца.</p><p><strong>Типичная ошибка этого приёма.</strong> {misconception}</p>
 {error&&<p role="alert">Связанный материал не загрузился. <button className="secondary-button" onClick={()=>setRetry(n=>n+1)}>Повторить загрузку</button></p>}
 {!module&&!error&&<p role="status">Загружаем связанное объяснение…</p>}
 {lesson&&<details><summary>Объяснение и примеры из курса: {lesson.title}</summary>{lesson.steps.map(step=><StudyContent key={step.id} step={step}/>)}<Link to={lessonUrl(moduleId,lesson.id)}>Все шаги и задания этой подтемы →</Link></details>}
 <h4>2. Предскажи результат</h4><pre aria-label="Код для прогноза">{level.code}</pre><label>Что выведет образец?<textarea aria-label="Прогноз вывода образца" value={prediction} onChange={e=>{setPrediction(e.target.value);setFeedback('');}} rows={3}/></label><button className="secondary-button" onClick={()=>setFeedback(prediction.replace(/\r\n?/g,'\n').trimEnd()===level.expectedOutput.trimEnd()?'Прогноз совпал с ожидаемым результатом. Это отдельная проверка рассуждения, не завершение темы.':'Прогноз отличается. Проследи изменения значений и моменты вывода; ожидаемый результат можно раскрыть в образце.')}>Проверить прогноз</button>{feedback&&<p role="status">{feedback}</p>}
 <h4>3. Набери образец</h4><p>Обычный тренажёр остаётся ниже. Ты можешь свернуть этот блок и сразу тренировать клавиатуру. Совпадение символов отмечает только уровень набора.</p><p><a href="#typing-level-heading">К набору образца ↓</a></p>
 <h4>4. Примени приём к другому условию</h4>{modifyTask&&lesson?<p>Перейди к упражнению <Link to={lessonUrl(moduleId,lesson.id,modifyTask.id)}>{modifyTask.title} →</Link>. {['modify','debug','gap'].includes(modifyTask.kind)?'Измени или исправь заготовку.':'Переработай знакомый приём под новый контракт.'} {modifyTask.goal} Проверка запускает настоящий Python.</p>:<p><Link to={'/learn/'+moduleId}>Открой практику модуля →</Link></p>}
 <h4>5. Реши без готового образца</h4>{independent&&lesson?<p><Link to={lessonUrl(moduleId,lesson.id,independent.id)}>{independent.title} →</Link> — {independent.goal}</p>:<p><Link to={'/learn/'+moduleId}>Самостоятельные задачи модуля →</Link></p>}
 <p>Прогноз и набор не добавляют решённые задания курса. Самостоятельное упражнение проверяется Python-раннером на странице задачи; прогресс хранится отдельно от WPM и точности.</p><p><Link to={'/learn/'+moduleId}>Весь модуль «{COURSE_INDEX.find(m=>m.id===moduleId)?.title??level.topic}» →</Link></p></div>;
}
