import React, { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Bot, Bug, Check, Circle, Code2, Eye, Gamepad2, Gem, Keyboard, Play, RotateCcw, Square, X } from 'lucide-react';
import { startPythonRun } from '../runtime/python';
import { QUIZZES, ROBOT_LEVELS, answerQuiz, isRobotSnapshot, newQuiz, nextQuizQuestion, quizResult, robotSetup, robotSolved, validRobotPath, ROBOT_EXPRESSION, type QuizState, type RobotSnapshot } from '../games/arcade';
import { advanceSnake, newSnake, type Direction } from '../games/snake';

const buttonBase = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50';
const button = `${buttonBase} border-white/20 text-white hover:border-emerald-400 hover:bg-emerald-400/10`;
const primaryButton = `${buttonBase} border-emerald-400 bg-emerald-400 text-[#08130e] hover:bg-emerald-300`;
const panel = 'rounded-xl border border-white/15 bg-[#101b19] p-4 sm:p-6';

function readSaved<T>(key: string, fallback: T, valid: (value: unknown) => value is T): T {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(key) || 'null');
    return valid(raw) ? raw : fallback;
  } catch { return fallback; }
}
function save(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; }
}
function useDraft(key: string, initial: string) {
  const [code, setCode] = useState(() => readSaved(key, initial, (value): value is string => typeof value === 'string'));
  const [saved, setSaved] = useState(true);
  const changeCode = (value: string) => {
    setCode(value);
    try { localStorage.setItem(key, JSON.stringify(value)); setSaved(true); } catch { setSaved(false); }
  };
  return { code, setCode: changeCode, saved };
}

const games = [
  { id: 'debugrush', title: 'Найди ошибку', skill: 'Чтение ошибок', level: 'Начальный', duration: '4–6 минут', icon: Bug, description: 'Распознай причину ошибки и узнай, как её исправить.' },
  { id: 'predictor', title: 'Что выведет код?', skill: 'Чтение кода', level: 'Начальный → средний', duration: '4–6 минут', icon: Eye, description: 'Проследи за значениями переменных и порядком действий.' },
  { id: 'logicgates', title: 'Проверь условие', skill: 'Логика', level: 'Начальный', duration: '3–5 минут', icon: Code2, description: 'Разберись с and, or, not и сравнениями.' },
  { id: 'pyarcade', title: 'Бот-кодер', skill: 'Настоящий Python', level: 'Начальный → средний', duration: '5–10 минут', icon: Bot, description: 'Напиши маршрут: команды, циклы и функции управляют ботом.' },
  { id: 'syntaxmatch', title: 'Найди пару', skill: 'Синтаксис', level: 'Начальный', duration: '2–4 минуты', icon: Code2, description: 'Соедини понятие с примером Python.' },
  { id: 'snake', title: 'Змейка: команды', skill: 'Последовательность', level: 'Начальный', duration: '3–5 минут', icon: Gamepad2, description: 'Планируй движение по шагам с ограниченным набором команд.' },
  { id: 'regexracer', title: 'Регулярные выражения', skill: 'Поиск в строках', level: 'Средний', duration: '4–6 минут', icon: Code2, description: 'Подбери шаблон и проверь границы совпадения.' },
  { id: 'algoascent', title: 'Сколько шагов?', skill: 'Алгоритмы', level: 'Средний', duration: '4–6 минут', icon: Code2, description: 'Сравни рост количества итераций.' },
  { id: 'speedtyper', title: 'Набор кода Python', skill: 'Синтаксис и точность набора', level: 'Три уровня сложности', duration: '80 упражнений', icon: Keyboard, description: 'Набирай Python-код: от print() до небольших программ. 10 тем с сохранением прогресса.' },
  { id: 'triviachase', title: 'Факты о Python', skill: 'Дополнительная разминка', level: 'Начальный', duration: '2–3 минуты', icon: Code2, description: 'Повтори термины и историю языка.' },
];

export function Arcade() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const requestedGame = params.get('game');
  const activeGame = games.find(game => game.id === requestedGame);
  const openGame = (id: string) => id === 'speedtyper' ? navigate('/typing') : setParams({ game: id });
  const closeGame = () => setParams({});
  if (requestedGame === 'speedtyper') return <Navigate to="/typing" replace />;
  // Older links to embedded tools now open their existing, single implementation.
  if (requestedGame === 'duel' || requestedGame === 'sandbox') {
    return <div className="mx-auto max-w-3xl px-4 pb-12 pt-28"><h1 className="mb-4 text-3xl font-bold">{requestedGame === 'duel' ? 'Дуэли' : 'Песочница'}</h1><Link className={primaryButton} to={requestedGame === 'duel' ? '/duels' : '/sandbox'}>Открыть раздел <ArrowRight size={18} /></Link><button className={`${button} ml-3`} onClick={closeGame}>Каталог игр</button></div>;
  }
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-12 pt-24 sm:px-6">
      {activeGame ? (
        <>
          <button onClick={closeGame} className={`${button} mb-5`}><ArrowLeft size={18} /> Все игры</button>
          <header className="mb-6 max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{activeGame.title}</h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{activeGame.skill} · {activeGame.level} · {activeGame.duration}</p>
          </header>
          <div key={activeGame.id}>
            {QUIZZES[activeGame.id] && <QuizGame gameId={activeGame.id} />}
            {activeGame.id === 'pyarcade' && <RobotGame />}
            {activeGame.id === 'syntaxmatch' && <MatchGame />}
            {activeGame.id === 'snake' && <SnakeGame />}
          </div>
        </>
      ) : (
        <>
          <header className="mb-8 max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-white">Игры для практики Python</h1>
            <p className="mt-4 text-base leading-relaxed text-slate-300">Выбери навык для короткой тренировки. Ошибки сопровождаются объяснениями. Результаты игр не означают освоение урока и не участвуют в рейтинге.</p>
          </header>
          <GameList items={games.slice(0, 4)} onOpen={openGame} />
          <h2 className="mb-3 mt-10 text-xl font-bold text-white">Дополнительные упражнения</h2>
          <GameList items={games.slice(4)} onOpen={openGame} />
          <div className="mt-8 flex flex-wrap gap-3 border-t border-white/15 pt-6">
            <Link to="/sandbox" className={button}>Песочница <ArrowRight size={16} /></Link>
            <Link to="/tournaments" className={button}>Тренировочные серии <ArrowRight size={16} /></Link>
            <Link to="/duels" className={button}>Дуэли <ArrowRight size={16} /></Link>
          </div>
        </>
      )}
    </div>
  );
}

function GameList({ items, onOpen }: { items: typeof games; onOpen: (id: string) => void }) {
  return <div className="divide-y divide-white/15 border-y border-white/15">{items.map(game => <button key={game.id} onClick={() => onOpen(game.id)} className="group flex min-h-24 w-full items-center gap-4 px-1 py-5 text-left hover:bg-white/5 sm:px-3"><game.icon className="hidden shrink-0 text-emerald-300 sm:block" size={24} aria-hidden="true" /><div className="min-w-0 flex-1"><span className="block text-lg font-semibold text-white group-hover:text-emerald-300">{game.title}</span><span className="mt-1 block text-sm leading-relaxed text-slate-300">{game.description}</span><span className="mt-2 block text-xs leading-relaxed text-slate-400">{game.skill} · {game.level} · {game.duration}</span></div><ArrowRight className="shrink-0 text-emerald-300" size={20} aria-hidden="true" /></button>)}</div>;
}

function QuizGame({ gameId }: { gameId: string }) {
  const game = QUIZZES[gameId];
  const key = `studypy:quiz:v2:${gameId}`;
  const [state, setState] = useState<QuizState>(() => readSaved(key, newQuiz(), (value): value is QuizState => {
    if (!value || typeof value !== 'object') return false;
    const item = value as QuizState;
    return Number.isInteger(item.index) && item.index >= 0 && item.index < game.questions.length && typeof item.finished === 'boolean' && !!item.answers && typeof item.answers === 'object' && Object.entries(item.answers).every(([id, answer]) => game.questions.some(q => q.id === id && Number.isInteger(answer) && answer >= 0 && answer < q.options.length));
  }));
  const [saved, setSaved] = useState(true);
  const question = game.questions[state.index];
  const answer = state.answers[question.id];
  const answerLock = useRef(answer !== undefined);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const result = quizResult(state, game.questions);
  useEffect(() => { setSaved(save(key, state)); answerLock.current = state.answers[game.questions[state.index].id] !== undefined; }, [key, state, game]);
  const submit = (option: number) => {
    if (answerLock.current) return;
    answerLock.current = true;
    setState(previous => answerQuiz(previous, game.questions, option));
    window.requestAnimationFrame(() => feedbackRef.current?.focus());
  };
  return <section className="max-w-4xl">
    <p className="mb-5 max-w-3xl leading-relaxed text-slate-300">{game.goal} Выбери один ответ, прочитай объяснение и переходи дальше. Ограничения времени нет.</p>
    {state.finished ? <div className={panel}>
      <h2 className="text-2xl font-bold text-white">{result.title}</h2>
      <p className="mt-3 text-lg text-emerald-300">Правильных ответов: {result.correct} из {result.total}. Ошибок: {result.mistakes.length}.</p>
      {result.mistakes.length > 0 && <div className="mt-6 space-y-5"><h3 className="font-bold text-white">Разбор ошибок</h3>{result.mistakes.map(q => <article key={q.id} className="border-t border-white/15 pt-4"><p className="font-medium text-white">{q.prompt}</p>{q.code && <pre className="mt-2 overflow-x-auto text-sm text-slate-300">{q.code}</pre>}<p className="mt-2 text-sm text-rose-200">Твой ответ: {q.options[state.answers[q.id]]}</p><p className="mt-1 text-sm text-emerald-200">Верный ответ: {q.options[q.correct]}</p><p className="mt-2 text-sm leading-relaxed text-slate-300">{q.explanation}</p></article>)}</div>}
      <p className="mt-6 leading-relaxed text-slate-300">{game.recommendation}</p>
      <p className="mt-3 text-sm text-slate-400">{saved ? 'Результат этой тренировки сохранён в этом браузере.' : 'Браузер не разрешил сохранить результат. Он будет доступен до выхода с этой страницы.'}</p>
      <div className="mt-6 flex flex-wrap gap-3"><button className={primaryButton} onClick={() => { answerLock.current = false; setState(newQuiz()); }}><RotateCcw size={16} /> Повторить серию</button><Link className={button} to="/sandbox">Открыть песочницу</Link></div>
    </div> : <div className={panel}>
      <p className="mb-4 text-sm text-slate-300">Вопрос {state.index + 1} из {game.questions.length}</p>
      <h2 className="text-xl font-semibold text-white">{question.prompt}</h2>
      {question.code && <pre className="my-5 overflow-x-auto rounded-lg bg-[#080f0d] p-4 text-sm leading-relaxed text-emerald-100"><code>{question.code}</code></pre>}
      <div className="mt-5 grid gap-3 sm:grid-cols-2">{question.options.map((option, index) => <button key={index} disabled={answer !== undefined} onClick={() => submit(index)} className={`${button} justify-start whitespace-pre-wrap text-left ${answer === index ? 'border-emerald-300 bg-emerald-400/10' : ''}`} aria-pressed={answer === index}>{answer !== undefined && index === question.correct ? <Check size={18} aria-hidden="true" /> : answer === index ? <X size={18} aria-hidden="true" /> : null}<span>{option}</span></button>)}</div>
      {answer !== undefined && <div ref={feedbackRef} tabIndex={-1} className="mt-6 rounded-lg bg-[#080f0d] p-4 outline-none" role="status"><p className={`font-bold ${answer === question.correct ? 'text-emerald-300' : 'text-rose-200'}`}>{answer === question.correct ? 'Верно' : 'Пока неверно'}</p><p className="mt-2 leading-relaxed text-slate-200">{question.explanation}</p><button className={`${primaryButton} mt-4`} onClick={() => setState(previous => nextQuizQuestion(previous, game.questions))}>{state.index === game.questions.length - 1 ? 'Посмотреть итог' : 'Следующий вопрос'} <ArrowRight size={16} /></button></div>}
    </div>}
    <a className="mt-5 inline-block text-sm text-emerald-300 underline underline-offset-4" href={game.source} target="_blank" rel="noreferrer">Справка Python по теме</a>
  </section>;
}

function RobotGame() {
  const [levelIndex, setLevelIndex] = useState(0);
  return <section><p className="mb-4 max-w-3xl leading-relaxed text-slate-300">Цель — составить программу и проверить маршрут. Код выполняется настоящим Python. Собери все кристаллы и дойди до финиша. На один запуск отведено до 40 перемещений. Для остановки есть отдельная кнопка.</p><div className="mb-5 flex flex-wrap gap-2" aria-label="Задания бота">{ROBOT_LEVELS.map((level, index) => <button key={level.id} className={`${button} ${levelIndex === index ? 'border-emerald-300 text-emerald-300' : ''}`} onClick={() => setLevelIndex(index)} aria-pressed={levelIndex === index}>{index + 1}. {level.title}</button>)}</div><RobotLevelGame key={ROBOT_LEVELS[levelIndex].id} levelIndex={levelIndex} onNext={() => setLevelIndex(index => Math.min(index + 1, ROBOT_LEVELS.length - 1))} /></section>;
}

function RobotLevelGame({ levelIndex, onNext }: { levelIndex: number; onNext: () => void }) {
  const level = ROBOT_LEVELS[levelIndex];
  const { code, setCode, saved } = useDraft(`studypy:robot:draft:${level.id}`, level.initialCode);
  const initialState: RobotSnapshot = { position: [...level.start], gems: level.gems.map(point => [...point]), path: [[...level.start]] };
  const [snapshot, setSnapshot] = useState<RobotSnapshot>(initialState);
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const [feedback, setFeedback] = useState('Напиши маршрут и нажми «Запустить Python».');
  const [output, setOutput] = useState('');
  const [solved, setSolved] = useState(false);
  const runRef = useRef<ReturnType<typeof startPythonRun> | null>(null);
  useEffect(() => () => { runRef.current?.cancel(); runRef.current = null; }, []);
  const run = async () => {
    if (runRef.current) return;
    setRunning(true); setSolved(false); setOutput(''); setSnapshot(initialState); setStep(0);
    setFeedback('Загружаем и запускаем Python… Первый запуск требует загрузки среды.');
    const execution = startPythonRun({ code, setup: robotSetup(level), expression: ROBOT_EXPRESSION, timeoutMs: 8000, onStatus: status => {
      setFeedback(status === 'running' ? 'Python выполняет программу…' : 'Загружаем среду Python…');
    } });
    runRef.current = execution;
    try {
      const result = await execution.promise;
      if (runRef.current !== execution) return;
      setOutput(result.output);
      if (result.status === 'completed' && isRobotSnapshot(result.value) && validRobotPath(level, result.value)) {
        setSnapshot(result.value); setStep(result.value.path.length - 1);
        const passed = robotSolved(level, result.value);
        setSolved(passed);
        setFeedback(passed ? `Маршрут выполнен. Перемещений: ${result.value.path.length - 1}. Все кристаллы собраны, бот на финише.` : `Программа завершилась. Осталось кристаллов: ${result.value.gems.length}. ${result.value.position[0] === level.goal[0] && result.value.position[1] === level.goal[1] ? 'Финиш достигнут.' : 'Бот ещё не на финише.'} Проверь маршрут.`);
      } else {
        setFeedback(result.error || (result.status === 'cancelled' ? 'Вычисление остановлено. Код сохранён.' : result.status === 'timeout' ? 'Время выполнения истекло. Проверь цикл и запусти снова.' : 'Не удалось выполнить маршрут. Попробуй запустить ещё раз.'));
      }
    } catch (error) { if (runRef.current === execution) setFeedback(error instanceof Error ? error.message : 'Не удалось загрузить Python. Проверь сеть и повтори запуск.'); }
    finally { if (runRef.current === execution) { runRef.current = null; setRunning(false); } }
  };
  const position = snapshot.path[step] || level.start;
  const collected = snapshot.path.slice(0, step + 1);
  return <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,1fr)]">
    <div className={panel}><h2 className="text-xl font-bold text-white">{level.title}</h2><p className="mt-2 leading-relaxed text-slate-300">{level.description}</p><label htmlFor="robot-code" className="mb-2 mt-5 block text-sm font-medium text-slate-200">Код Python</label><textarea id="robot-code" value={code} onChange={event => { setCode(event.target.value); setSolved(false); setFeedback('Код изменён. Запусти его, чтобы проверить новый маршрут.'); }} spellCheck={false} className="min-h-64 w-full resize-y rounded-lg border border-white/20 bg-[#080f0d] p-3 font-mono text-sm leading-relaxed text-emerald-100 focus:border-emerald-300 focus:outline-none" autoCapitalize="off" autoComplete="off" autoCorrect="off" /><p className="mt-2 text-xs text-slate-400">{saved ? 'Черновик этого задания сохранён в браузере.' : 'Браузер не разрешил сохранить черновик. Скопируй код перед уходом.'}</p><div className="mt-4 flex flex-wrap gap-3"><button onClick={() => void run()} disabled={running} className={primaryButton}><Play size={16} /> {running ? 'Выполняется…' : 'Запустить Python'}</button>{running && <button className={button} onClick={() => runRef.current?.cancel()}><Square size={16} /> Остановить</button>}<button className={button} disabled={running} onClick={() => { setSnapshot(initialState); setStep(0); setSolved(false); setFeedback('Поле сброшено. Код сохранён.'); }}><RotateCcw size={16} /> Сбросить поле</button></div><div role="status" className="mt-5 border-t border-white/15 pt-4"><p className={solved ? 'text-emerald-200' : 'whitespace-pre-wrap text-slate-200'}>{feedback}</p>{output && <><h3 className="mb-2 mt-4 text-sm font-bold text-white">Вывод программы</h3><pre className="max-h-48 overflow-auto whitespace-pre-wrap text-sm text-slate-300">{output}</pre></>}{solved && levelIndex < ROBOT_LEVELS.length - 1 && <button onClick={onNext} className={`${primaryButton} mt-4`}>Следующий маршрут <ArrowRight size={16} /></button>}</div></div>
    <div className={panel}><p className="mb-4 text-sm text-slate-300">Старт ({level.start.join(', ')}), финиш ({level.goal.join(', ')}). Бот: ({position.join(', ')}).</p><div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${level.size}, minmax(0, 1fr))` }} role="img" aria-label={`Поле ${level.size} на ${level.size}, бот в ${position.join(', ')}, стены: ${level.walls.map(p => p.join(',')).join('; ')}, кристаллы: ${level.gems.map(p => p.join(',')).join('; ')}, финиш: ${level.goal.join(', ')}`}>{Array.from({ length: level.size ** 2 }, (_, index) => { const x = index % level.size, y = Math.floor(index / level.size); const wall = level.walls.some(p => p[0] === x && p[1] === y); const bot = position[0] === x && position[1] === y; const gem = level.gems.some(p => p[0] === x && p[1] === y) && !collected.some(p => p[0] === x && p[1] === y); const goal = level.goal[0] === x && level.goal[1] === y; return <div key={index} className={`flex aspect-square items-center justify-center rounded ${wall ? 'bg-slate-500' : goal ? 'border-2 border-emerald-300 bg-emerald-400/10' : 'bg-[#080f0d]'}`} aria-hidden="true">{bot ? <Bot className="text-emerald-200" size={24} /> : gem ? <Gem className="text-amber-200" size={20} /> : goal ? <Circle size={18} className="text-emerald-300" /> : null}</div>; })}</div><div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-300"><span className="inline-flex items-center gap-1"><Bot size={16} /> Бот</span><span className="inline-flex items-center gap-1"><Gem size={16} /> Кристалл</span><span className="inline-flex items-center gap-1"><Circle size={16} /> Финиш</span><span>Серый квадрат — стена</span></div>{snapshot.path.length > 1 && <div className="mt-5"><label htmlFor="robot-step" className="text-sm text-slate-200">По шагам: {step} из {snapshot.path.length - 1}</label><input id="robot-step" type="range" min={0} max={snapshot.path.length - 1} value={step} onChange={event => setStep(Number(event.target.value))} className="mt-2 min-h-11 w-full accent-emerald-400" /><p className="text-xs leading-relaxed text-slate-400">Передвинь ползунок или используй стрелки, чтобы проверить путь.</p></div>}<details className="mt-5 text-sm text-slate-300"><summary className="min-h-11 cursor-pointer py-3 font-medium text-emerald-300">Подсказка</summary><p className="leading-relaxed">Один вызов move_right() сдвигает на одну клетку вправо; остальные команды работают так же. Сначала посчитай клетки. Повторяющиеся команды можно поместить в for. Координата y растёт вниз.</p></details></div>
  </div>;
}

const PAIRS = [['Список', '[1, 2, 3]'], ['Словарь', '{"name": "Ada"}'], ['Определение функции', 'def greet():\n    return 1'], ['Строка', '"Hello"'], ['Целое число', '42'], ['Булево значение', 'True']];
function shuffledCards() { return PAIRS.flatMap((pair, pairId) => pair.map((text, side) => ({ id: pairId * 2 + side, pairId, text }))).map(card => ({ card, order: Math.random() })).sort((a, b) => a.order - b.order).map(item => item.card); }
function MatchGame() {
  const [cards, setCards] = useState(shuffledCards);
  const [open, setOpen] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState('Открой две карточки. Найди понятие и соответствующий пример.');
  const lock = useRef(false);
  const choose = (id: number) => {
    if (lock.current || open.includes(id) || matched.includes(id)) return;
    const next = [...open, id];
    setOpen(next);
    if (next.length < 2) return;
    lock.current = true; setAttempts(count => count + 1);
    const first = cards.find(card => card.id === next[0])!, second = cards.find(card => card.id === id)!;
    if (first.pairId === second.pairId) { setMatched(previous => [...previous, ...next]); setFeedback(`Верно: ${PAIRS[first.pairId][0]} — ${PAIRS[first.pairId][1]}.`); }
    else setFeedback('Это разные понятия. Запомни карточки и попробуй другую пару.');
  };
  const done = matched.length === cards.length;
  return <section className="max-w-3xl"><p className="mb-5 leading-relaxed text-slate-300">Цель — узнавать синтаксис основных значений. Открывай две карточки и соединяй понятие с примером. Время не ограничено.</p><div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{cards.map((card, index) => { const visible = open.includes(card.id) || matched.includes(card.id); return <button key={card.id} onClick={() => choose(card.id)} disabled={matched.includes(card.id) || (lock.current && !visible)} aria-label={visible ? card.text : `Открыть карточку ${index + 1}`} className={`${button} min-h-24 break-words ${visible ? 'border-emerald-300 bg-emerald-400/10' : ''}`}>{visible ? card.text : index + 1}{matched.includes(card.id) && <Check size={16} className="shrink-0" />}</button>; })}</div><div role="status" className={`${panel} mt-5`}><p className="text-slate-200">{feedback}</p><p className="mt-3 text-sm text-slate-300">Найдено пар: {matched.length / 2} из {PAIRS.length}. Попыток: {attempts}.</p>{done ? <><h2 className="mt-4 text-xl font-bold text-emerald-200">Все пары найдены</h2><p className="mt-2 text-slate-300">Теперь создай свои список и словарь в песочнице.</p><button className={`${button} mt-4`} onClick={() => { lock.current = false; setCards(shuffledCards()); setOpen([]); setMatched([]); setAttempts(0); setFeedback('Открой две карточки.'); }}>Повторить</button></> : open.length === 2 && <button className={`${primaryButton} mt-4`} onClick={() => { lock.current = false; setOpen([]); setFeedback('Выбери следующую пару.'); }}>Продолжить</button>}</div></section>;
}

function SnakeGame() {
  const [state, setState] = useState(newSnake);
  const [direction, setDirection] = useState<Direction>('right');
  const [steps, setSteps] = useState(1);
  const move = (selectedDirection: Direction, count = 1) => setState(previous => advanceSnake(previous, selectedDirection, count));
  const won = state.gems.length === 0;
  return <section className="max-w-4xl"><p className="mb-5 max-w-3xl leading-relaxed text-slate-300">Цель — спланировать последовательность действий. Это пошаговая игра с четырьмя командами направления, а не интерпретатор Python. Выбери направление и число шагов. Собери три кристалла, избегая границы и собственного хвоста. Без таймера.</p><div className="grid items-start gap-5 md:grid-cols-2"><div className={panel}><div className="grid grid-cols-6 gap-1" role="img" aria-label={`Поле 6 на 6, голова змейки в ${state.body[0].join(', ')}, кристаллов осталось ${state.gems.length}`}>{Array.from({ length: 36 }, (_, index) => { const x = index % 6, y = Math.floor(index / 6); const head = state.body[0][0] === x && state.body[0][1] === y; const body = state.body.some(p => p[0] === x && p[1] === y); const gem = state.gems.some(p => p[0] === x && p[1] === y); return <div key={index} aria-hidden="true" className={`flex aspect-square items-center justify-center rounded ${head ? 'bg-emerald-300 text-[#08130e]' : body ? 'bg-emerald-700' : 'bg-[#080f0d]'}`}>{head ? <Bot size={22} /> : gem ? <Gem size={20} className="text-amber-200" /> : null}</div>; })}</div><p className="mt-4 text-sm text-slate-300">Выполнено перемещений: {state.moves}. Собрано: {3 - state.gems.length} из 3.</p></div><div className={panel}><label className="block text-sm text-slate-200" htmlFor="snake-direction">Направление</label><select id="snake-direction" value={direction} onChange={event => setDirection(event.target.value as Direction)} className="mt-2 min-h-11 w-full rounded-lg border border-white/20 bg-[#080f0d] px-3 text-white"><option value="right">Вправо</option><option value="down">Вниз</option><option value="left">Влево</option><option value="up">Вверх</option></select><label className="mb-2 mt-4 block text-sm text-slate-200" htmlFor="snake-steps">Сколько шагов: {steps}</label><input id="snake-steps" type="range" min={1} max={5} value={steps} onChange={event => setSteps(Number(event.target.value))} className="min-h-11 w-full accent-emerald-400" /><button disabled={state.failed || won} onClick={() => move(direction, steps)} className={`${primaryButton} mt-3 w-full`}>Выполнить команду</button><div className="mt-5 grid grid-cols-3 gap-2" aria-label="Один шаг"><span /><button className={button} onClick={() => move('up')} disabled={state.failed || won} aria-label="Один шаг вверх"><ArrowUp size={20} /></button><span /><button className={button} onClick={() => move('left')} disabled={state.failed || won} aria-label="Один шаг влево"><ArrowLeft size={20} /></button><button className={button} onClick={() => move('down')} disabled={state.failed || won} aria-label="Один шаг вниз"><ArrowDown size={20} /></button><button className={button} onClick={() => move('right')} disabled={state.failed || won} aria-label="Один шаг вправо"><ArrowRight size={20} /></button></div><p className={`mt-5 leading-relaxed ${won ? 'text-emerald-200' : state.failed ? 'text-rose-200' : 'text-slate-300'}`} role="status">{won ? 'Все кристаллы собраны. Маршрут завершён. Попробуй записать повторяющиеся команды циклом в игре «Бот-кодер».' : state.failed ? `${state.message} Проверь клетку перед головой и повтори маршрут с начала.` : 'Змейка ждёт команды. Игра движется только после твоего действия.'}</p><button className={`${button} mt-4`} onClick={() => setState(newSnake())}><RotateCcw size={16} /> Начать заново</button></div></div></section>;
}
