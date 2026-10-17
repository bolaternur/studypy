import { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, ChevronDown, Clock3, Keyboard, RotateCcw } from 'lucide-react';
import { TYPING_LEVELS, type TypingLevel } from '../games/typing-levels';
import { applyTypingInput, keyHint, LEGACY_TYPING_SETTINGS_KEY, newTypingSession, nextUnfinishedTypingLevel, recordTypingCompletion, restoreTypingDraft, sanitizeTypingProgress, sanitizeTypingSettings, typingDraft, typingMetrics, TYPING_DRAFT_PREFIX, TYPING_PROGRESS_KEY, TYPING_SETTINGS_KEY, type TypingProgress, type TypingSession, type TypingSettings } from '../games/typing';
import { playSound } from '../utils/sounds';
import './TypingTrainer.css';

function stored(key: string): unknown { try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; } }
function readSettings(): TypingSettings { return sanitizeTypingSettings(stored(TYPING_SETTINGS_KEY) ?? stored(LEGACY_TYPING_SETTINGS_KEY)); }
const LEVEL_IDS = TYPING_LEVELS.map(level => level.id);
const TOPICS = [...new Set(TYPING_LEVELS.map(level => level.topic))];
const sessionId = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
const printable = (character: string) => character === ' ' ? 'пробел' : character === '\n' ? 'перенос строки' : character || 'конец кода';
const elapsed = (milliseconds: number) => `${Math.floor(milliseconds / 60000)}:${String(Math.floor(milliseconds / 1000) % 60).padStart(2, '0')}`;

export function TypingTrainer() {
  const [settings, setSettings] = useState(readSettings);
  const [progress, setProgress] = useState<TypingProgress>(() => sanitizeTypingProgress(stored(TYPING_PROGRESS_KEY)));
  const [catalogOpen, setCatalogOpen] = useState(() => window.matchMedia('(min-width: 960px)').matches);
  const [saved, setSaved] = useState(true);
  const selectedId = LEVEL_IDS.includes(progress.selectedId) ? progress.selectedId : nextUnfinishedTypingLevel(LEVEL_IDS, progress) ?? LEVEL_IDS[0];
  const selected = TYPING_LEVELS.find(level => level.id === selectedId)!;
  const completed = TYPING_LEVELS.filter(level => progress.levels[level.id]?.completed).length;
  const nextId = nextUnfinishedTypingLevel(LEVEL_IDS, progress, selectedId);
  useEffect(() => {
    try { localStorage.setItem(TYPING_SETTINGS_KEY, JSON.stringify(settings)); localStorage.setItem(TYPING_PROGRESS_KEY, JSON.stringify(progress)); setSaved(true); }
    catch { setSaved(false); }
  }, [settings, progress]);
  const selectLevel = (id: string) => {
    setProgress(previous => ({ ...previous, selectedId: id }));
    if (!window.matchMedia('(min-width: 960px)').matches) setCatalogOpen(false);
  };
  return <div className="typing-trainer">
    <header className="typing-heading"><Link to="/arcade" className="typing-back"><ArrowLeft size={16} /> Учебные игры</Link><h1>Набор кода Python</h1><p>Привыкай к синтаксису и отступам, набирая настоящие программы. Без ограничения времени.</p></header>
    <div className="typing-course-progress"><span><strong>{completed}</strong> из {TYPING_LEVELS.length} уровней набрано</span><span>Прогресс на этом устройстве</span></div>
    <div className="typing-layout">
      <details className="typing-catalog" open={catalogOpen} onToggle={event => setCatalogOpen(event.currentTarget.open)}>
        <summary><span>Все уровни <small>{TYPING_LEVELS.length}</small></span><ChevronDown size={18} aria-hidden="true" /></summary>
        <nav aria-label="Уровни набора Python" className="typing-level-list">
          {nextId && <button type="button" className="typing-next-unsolved" onClick={() => selectLevel(nextId)}>Следующий непройденный <ArrowRight size={15}/></button>}
          {TOPICS.map((topic, topicIndex) => <details key={topic} className="typing-topic" open={topic === selected.topic}>
            <summary><span>{topicIndex + 1}. {topic}</span><small>{TYPING_LEVELS.filter(level => level.topic === topic && progress.levels[level.id]?.completed).length}/8</small></summary>
            <ol>{TYPING_LEVELS.filter(level => level.topic === topic).map(level => <li key={level.id}><button type="button" onClick={() => selectLevel(level.id)} aria-current={selectedId === level.id ? 'step' : undefined} aria-label={`Уровень ${LEVEL_IDS.indexOf(level.id) + 1}. ${level.title}${progress.levels[level.id]?.completed ? '. Пройден' : ''}`}><span className="typing-level-number">{String(LEVEL_IDS.indexOf(level.id) + 1).padStart(2, '0')}</span><span>{level.title}</span>{progress.levels[level.id]?.completed && <Check size={15} aria-label="Пройден" />}</button></li>)}</ol>
          </details>)}
        </nav>
      </details>
      <LevelPractice key={selectedId} level={selected} settings={settings} record={progress.levels[selectedId]} onToggleKeyboard={() => setSettings(previous => ({ ...previous, keyboard: !previous.keyboard }))} onComplete={session => setProgress(previous => recordTypingCompletion(previous, selectedId, session, new Date().toISOString()))} onNext={nextId ? () => selectLevel(nextId) : undefined} />
    </div>
    {!saved && <p className="typing-storage-error" role="status">Браузер не сохранил прогресс. Набор продолжает работать; проверь доступ к хранилищу сайта.</p>}
    <p className="typing-code-note">Это упражнение на набор, а не проверка знания Python. Код здесь не выполняется. Чтобы писать решения самостоятельно, переходи в <Link to="/pathways">программу обучения</Link>.</p>
    <details className="typing-explanation"><summary>Как сохраняется прогресс и считается точность</summary><p>Уровень пройден, когда код совпадает с образцом целиком, включая отступы. Все уровни доступны сразу. Завершённые уровни, лучший результат, настройки и черновик каждого уровня сохраняются только в этом браузере.</p><p>Точность — доля верно введённых символов за попытку. Исправленная ошибка остаётся в расчёте. Скорость WPM — верные символы в тексте, делённые на время в минутах и на 5. Пробелы и переносы тоже считаются. Для попытки короче секунды скорость не показывается.</p><p>Вставка и перетаскивание отключены. Ввод через экранную клавиатуру учитывается после подтверждения символов. Результат не приносит XP и не участвует в рейтинге.</p></details>
  </div>;
}

function LevelPractice({ level, settings, record, onToggleKeyboard, onComplete, onNext }: { level: TypingLevel; settings: TypingSettings; record: TypingProgress['levels'][string] | undefined; onToggleKeyboard: () => void; onComplete: (session: TypingSession) => void; onNext?: () => void }) {
  const [session, setSession] = useState(() => restoreTypingDraft(level.code, stored(TYPING_DRAFT_PREFIX + level.id), sessionId()));
  const [inputValue, setInputValue] = useState(session.typed);
  const [caretIndex, setCaretIndex] = useState(Array.from(session.typed).length);
  const [clock, setClock] = useState(0);
  const [focused, setFocused] = useState(false);
  const [notice, setNotice] = useState('');
  const [pressed, setPressed] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const composing = useRef(false);
  const sessionRef = useRef(session);
  const edited = useRef(Boolean(session.typed));
  const lastSound = useRef(-Infinity);
  sessionRef.current = session;
  useLayoutEffect(() => {
    const input = inputRef.current;
    // Restore the native caret as well as the rendered one, without taking focus.
    if (input) input.setSelectionRange(input.value.length, input.value.length);
  }, []);
  const saveDraft = (value: TypingSession, now: number) => {
    try { localStorage.setItem(TYPING_DRAFT_PREFIX + level.id, JSON.stringify(typingDraft(value, now))); }
    catch { setNotice('Черновик не удалось сохранить в браузере. Не закрывай страницу, если хочешь продолжить эту попытку.'); }
  };
  useEffect(() => {
    const save = () => { if (edited.current) try { localStorage.setItem(TYPING_DRAFT_PREFIX + level.id, JSON.stringify(typingDraft(sessionRef.current, performance.now()))); } catch { /* The active view reports storage failures on input. */ } };
    window.addEventListener('pagehide', save);
    return () => { save(); window.removeEventListener('pagehide', save); };
  }, [level.id]);
  useEffect(() => {
    if (session.phase !== 'running') return;
    const timer = window.setInterval(() => setClock(performance.now()), 1000);
    return () => window.clearInterval(timer);
  }, [session.phase]);
  const characters = useMemo(() => Array.from(level.code), [level.code]);
  const typed = Array.from(session.typed);
  const metrics = typingMetrics(session, clock);
  const firstError = typed.findIndex((character, index) => character !== characters[index]);
  const finished = session.phase === 'finished' && session.reason === 'text';
  const currentCharacter = characters[caretIndex] ?? '';
  const keyboardLanguage = /[а-яё]/i.test(currentCharacter) ? 'ru' : 'python';
  const nextKey = keyHint(currentCharacter, keyboardLanguage);
  const percentage = finished ? 100 : Math.min(99, Math.floor(metrics.correct / characters.length * 100));
  const syncCaret = (element: HTMLTextAreaElement) => setCaretIndex(Array.from(element.value.slice(0, element.selectionStart)).length);
  const commit = (value: string, element: HTMLTextAreaElement) => {
    const previous = sessionRef.current;
    const now = performance.now();
    const next = applyTypingInput(previous, value, now);
    sessionRef.current = next; setSession(next); setInputValue(next.typed); setClock(now); syncCaret(element);
    if (previous === next) return;
    edited.current = true; setNotice(''); saveDraft(next, now);
    if (next.attempts > previous.attempts && now - lastSound.current >= 80) { playSound('typing'); lastSound.current = now; }
    if (next.phase === 'finished' && previous.phase !== 'finished') { setFocused(false); inputRef.current?.blur(); onComplete(next); }
  };
  const reset = () => {
    const fresh = newTypingSession(level.code, sessionId());
    sessionRef.current = fresh; setSession(fresh); setInputValue(''); setCaretIndex(0); setClock(0); setNotice(''); setPressed(''); composing.current = false; edited.current = true; saveDraft(fresh, 0);
    window.requestAnimationFrame(() => inputRef.current?.focus());
  };
  const preventPaste = () => setNotice('Вставка отключена. Набери код самостоятельно: исправлять ошибки можно в любом месте.');
  const number = LEVEL_IDS.indexOf(level.id) + 1;
  return <section className="typing-workspace" aria-labelledby="typing-level-heading">
    <header className="typing-level-heading"><div className="typing-level-meta"><span>Уровень {number} из {TYPING_LEVELS.length} · {level.topic}</span><span>{level.difficulty}</span></div><h2 id="typing-level-heading">{level.title}</h2><p>{level.goal}</p></header>
    <div className="typing-live-metrics" aria-label="Показатели набора"><strong>{metrics.correct}<span> / {characters.length} символов</span></strong><span><Clock3 size={15} aria-hidden="true" /> {elapsed(metrics.elapsedMs)}</span><span>{session.attempts ? `${metrics.accuracy}%` : '—'} <small>точность</small></span><span className="typing-wpm">{metrics.elapsedMs >= 1000 ? metrics.wpm : '—'} <small>WPM</small></span></div>
    <div className="typing-progress" role="progressbar" aria-label="Код набран верно" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentage}><span style={{ width: `${percentage}%` }}/></div>
    <div className={`typing-stage ${focused ? 'is-focused' : ''} ${finished ? 'is-finished' : ''}`} onClick={() => { if (!finished) inputRef.current?.focus(); }}>
      <TypingPassage target={level.code} typed={session.typed} caretIndex={caretIndex} focused={focused && !finished}/>
      {!finished && <textarea ref={inputRef} className="typing-input" wrap="off" aria-label="Ввод кода уровня" aria-describedby="typing-instructions typing-accessible-text" value={inputValue} maxLength={100000} onChange={event => { setInputValue(event.target.value); if (!composing.current && !(event.nativeEvent as InputEvent).isComposing) commit(event.target.value, event.currentTarget); }} onSelect={event => syncCaret(event.currentTarget)} onCompositionStart={() => { composing.current = true; }} onCompositionEnd={event => { composing.current = false; commit(event.currentTarget.value, event.currentTarget); }} onFocus={() => setFocused(true)} onBlur={() => { setFocused(false); setPressed(''); }} onKeyDown={event => { setPressed(event.code); if (event.key === 'Escape') event.currentTarget.blur(); }} onKeyUp={() => setPressed('')} onPaste={event => { event.preventDefault(); preventPaste(); }} onDrop={event => { event.preventDefault(); preventPaste(); }} spellCheck={false} autoCorrect="off" autoCapitalize="off" autoComplete="off" enterKeyHint="enter" />}
    </div>
    <p id="typing-accessible-text" className="typing-sr-only">Образец кода: {level.code}</p>
    {!finished && <>
      <div className="typing-input-status"><p id="typing-instructions">{!focused ? 'Нажми на код или перейди к нему клавишей Tab.' : session.phase === 'ready' ? 'Начни набор — время пойдёт с первого символа.' : `Дальше: ${printable(currentCharacter)}. Esc — убрать фокус.`}</p><span>{metrics.incorrect ? `Исправь различия: ${metrics.incorrect}` : 'Отступ — 4 пробела. Tab — следующий элемент.'}</span></div>
      {firstError >= 0 && <p className="typing-error-text" role="status">Первое различие — символ {firstError + 1}: ожидалось «{printable(characters[firstError])}», введено «{printable(typed[firstError])}». Исправь его стрелками и Backspace.</p>}
    </>}
    {finished && <section className="typing-results" aria-labelledby="typing-result-title"><h3 id="typing-result-title"><Check size={21} aria-hidden="true" /> Код набран точно</h3><p>Уровень {number} пройден. Результат этой попытки:</p><div className="typing-result-metrics"><div><strong>{metrics.accuracy}%</strong><span>точность</span></div><div><strong>{metrics.errors}</strong><span>ошибок при наборе</span></div><div><strong>{(metrics.elapsedMs / 1000).toFixed(1)} с</strong><span>время</span></div></div><p className="typing-result-detail">В коде не осталось различий. {metrics.errors ? 'Исправления учтены в точности — они помогают увидеть свой прогресс.' : 'Все символы введены верно с первого раза.'}</p>{onNext ? <button type="button" className="typing-action-primary" onClick={onNext}>Следующий непройденный <ArrowRight size={17}/></button> : <p>Все уровни набраны. Повтори любой пример или <Link to="/pathways">решай задачи самостоятельно</Link>.</p>}</section>}
    <div className="typing-session-actions"><button type="button" className="typing-action-secondary" onClick={reset} aria-label="Начать уровень заново"><RotateCcw size={16}/> Заново</button>{!finished && <button type="button" className="typing-keyboard-toggle" aria-pressed={settings.keyboard} onClick={onToggleKeyboard}><Keyboard size={17}/> Клавиатура</button>}{record?.best && <span className="typing-personal-best">Лучший точный набор: {record.best.accuracy}% · {(record.best.elapsedMs / 1000).toFixed(1)} с</span>}</div>
    <p className="typing-notice" role="status">{notice}</p>
    {!finished && settings.keyboard && <VirtualKeyboard language={keyboardLanguage} nextCode={nextKey.code} shift={nextKey.shift} pressed={pressed}/>}
    <details className="typing-example" open={finished}><summary>{finished ? 'Ожидаемый вывод этой программы' : 'Подсказка и ожидаемый вывод'}</summary><p>{level.hint}</p><pre aria-label="Ожидаемый вывод">{level.expectedOutput || '(нет вывода)'}</pre><p className="typing-example-caption">Это результат программы из образца, а не запуск набранного текста.</p></details>
  </section>;
}

const TypingPassage = memo(function TypingPassage({ target, typed, caretIndex, focused }: { target: string; typed: string; caretIndex: number; focused: boolean }) {
  const targetCharacters = useMemo(() => Array.from(target), [target]);
  const characters = useMemo(() => Array.from(typed), [typed]);
  const container = useRef<HTMLDivElement>(null);
  const caret = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    if (!focused || !container.current || !caret.current) return;
    const lineHeight = parseFloat(getComputedStyle(container.current).lineHeight);
    const top = caret.current.offsetTop;
    if (top < container.current.scrollTop || top > container.current.scrollTop + container.current.clientHeight - lineHeight) container.current.scrollTop = Math.max(0, top - container.current.clientHeight / 2);
    const left = caret.current.offsetLeft;
    if (left < container.current.scrollLeft + 12 || left > container.current.scrollLeft + container.current.clientWidth - 24) container.current.scrollLeft = Math.max(0, left - container.current.clientWidth / 2);
  }, [caretIndex, focused]);
  return <div ref={container} className={`typing-passage ${focused ? 'is-focused' : ''}`} aria-hidden="true">{targetCharacters.map((character, index) => <span key={index} ref={index === caretIndex ? caret : undefined} className={`typing-character ${index < characters.length ? characters[index] === character ? 'is-correct' : 'is-wrong' : ''} ${index === caretIndex ? 'is-current' : ''}`} data-newline={character === '\n' || undefined}>{character === '\n' ? <><span className="typing-newline">↵</span>{'\n'}</> : character}</span>)}{characters.slice(targetCharacters.length).map((character, index) => <span key={`extra-${index}`} ref={caretIndex === targetCharacters.length + index ? caret : undefined} className={`typing-character is-wrong ${caretIndex === targetCharacters.length + index ? 'is-current' : ''}`}>{character}</span>)}{caretIndex >= Math.max(targetCharacters.length, characters.length) && <span ref={caret} className="typing-character is-current"> </span>}</div>;
});
const KEY_ROWS = [
  [['Backquote','`','ё'], ...'1234567890'.split('').map(number => [`Digit${number}`,number,number]), ['Minus','-','-'], ['Equal','=','=' ], ['Backspace','⌫','⌫']],
  [['Tab','Tab','Tab'], ...'qwertyuiop'.split('').map((letter,index) => [`Key${letter.toUpperCase()}`,letter,'йцукенгшщз'[index]]), ['BracketLeft','[','х'], ['BracketRight',']','ъ'], ['Backslash','\\','\\']],
  [['CapsLock','Caps','Caps'], ...'asdfghjkl'.split('').map((letter,index) => [`Key${letter.toUpperCase()}`,letter,'фывапролд'[index]]), ['Semicolon',';','ж'], ['Quote',"'",'э'], ['Enter','Enter','Enter']],
  [['ShiftLeft','Shift','Shift'], ...'zxcvbnm'.split('').map((letter,index) => [`Key${letter.toUpperCase()}`,letter,'ячсмить'[index]]), ['Comma',',','б'], ['Period','.','ю'], ['Slash','/','.'], ['ShiftRight','Shift','Shift']],
];
const VirtualKeyboard = memo(function VirtualKeyboard({ language, nextCode, shift, pressed }: { language: 'ru' | 'python'; nextCode: string; shift: boolean; pressed: string }) {
  return <div className="typing-keyboard" aria-label="Подсказка клавиш"><div className="typing-keyboard-keys" aria-hidden="true">{KEY_ROWS.map((row,index) => <div className="typing-keyboard-row" key={index}>{row.map(([code,en,ru]) => <kbd key={code} className={`${code === nextCode || shift && code.startsWith('Shift') ? 'is-next' : ''} ${code === pressed ? 'is-pressed' : ''} ${['Backspace','Tab','CapsLock','Enter','ShiftLeft','ShiftRight'].includes(code) ? 'is-wide' : ''}`}>{language === 'ru' ? ru : en}</kbd>)}</div>)}<div className="typing-keyboard-row typing-keyboard-bottom"><kbd>Ctrl</kbd><kbd>Alt</kbd><kbd className={`typing-space ${nextCode === 'Space' ? 'is-next' : ''} ${pressed === 'Space' ? 'is-pressed' : ''}`}>Пробел</kbd><kbd>Alt</kbd><kbd>Ctrl</kbd></div></div><p>Следующая клавиша подсвечена · {language === 'ru' ? 'русская' : 'английская'} раскладка. На телефоне используй экранную клавиатуру.</p></div>;
});
