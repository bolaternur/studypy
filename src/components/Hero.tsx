import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { CURRICULUM_SUMMARY } from '../constants/curriculum-summary';
import { playSound } from '../utils/sounds';
import { DotField } from './DotField';

const TOPICS = [
  'переменные', 'списки', 'циклы', 'функции', 'словари', 'классы',
  'генераторы', 'декораторы', 'исключения', 'файлы', 'asyncio', 'типизация',
];

/* ───────────────────────────────────────────────────────────────
   Live terminal
   Types a real snippet and prints the output that snippet actually
   produces. Nothing here claims a capability the product lacks.
   ─────────────────────────────────────────────────────────────── */

interface Token {
  text: string;
  tone: 'kw' | 'fn' | 'str' | 'num' | 'comment' | 'plain';
}

const SCRIPT: Token[][] = [
  [{ text: '# ваш первый разбор данных', tone: 'comment' }],
  [
    { text: 'grades', tone: 'plain' }, { text: ' = ', tone: 'plain' },
    { text: '{', tone: 'plain' }, { text: '"Аня"', tone: 'str' }, { text: ': ', tone: 'plain' },
    { text: '92', tone: 'num' }, { text: ', ', tone: 'plain' },
    { text: '"Ержан"', tone: 'str' }, { text: ': ', tone: 'plain' },
    { text: '78', tone: 'num' }, { text: ', ', tone: 'plain' },
    { text: '"Лиза"', tone: 'str' }, { text: ': ', tone: 'plain' },
    { text: '95', tone: 'num' }, { text: '}', tone: 'plain' },
  ],
  [],
  [
    { text: 'best', tone: 'plain' }, { text: ' = ', tone: 'plain' },
    { text: 'max', tone: 'fn' }, { text: '(grades, key=grades.', tone: 'plain' },
    { text: 'get', tone: 'fn' }, { text: ')', tone: 'plain' },
  ],
  [
    { text: 'print', tone: 'fn' }, { text: '(', tone: 'plain' },
    { text: 'f"{best} — {grades[best]} баллов"', tone: 'str' },
    { text: ')', tone: 'plain' },
  ],
];

const OUTPUT = 'Лиза — 95 баллов';

const TONE_CLASS: Record<Token['tone'], string> = {
  kw: 'text-emerald-300',
  fn: 'text-teal-300',
  str: 'text-amber-200/90',
  num: 'text-emerald-200',
  comment: 'text-ink-30 italic',
  plain: 'text-ink-70',
};

const TOTAL_CHARS = SCRIPT.reduce(
  (sum, line) => sum + line.reduce((lineSum, token) => lineSum + token.text.length, 0),
  0,
);

const LiveTerminal = () => {
  const reduceMotion = useReducedMotion();
  const [typed, setTyped] = useState(reduceMotion ? TOTAL_CHARS : 0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(Boolean(reduceMotion));

  // Only start once the panel is actually on screen.
  useEffect(() => {
    if (started || !containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setStarted(true),
      { threshold: 0.35 },
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started || reduceMotion || typed >= TOTAL_CHARS) return;
    // Slight jitter reads as typing rather than as a progress bar.
    const delay = 14 + Math.random() * 26;
    const timer = window.setTimeout(() => setTyped((value) => value + 1), delay);
    return () => window.clearTimeout(timer);
  }, [started, typed, reduceMotion]);

  const isComplete = typed >= TOTAL_CHARS;

  // Walk the script and slice it at the current character budget.
  const rendered = useMemo(() => {
    let budget = typed;
    return SCRIPT.map((line) =>
      line.map((token) => {
        if (budget <= 0) return { ...token, text: '' };
        const text = token.text.slice(0, budget);
        budget -= token.text.length;
        return { ...token, text };
      }),
    );
  }, [typed]);

  return (
    <div
      ref={containerRef}
      className="glass glass-lit rounded-[28px] overflow-hidden shadow-[0_40px_120px_-40px_rgba(16,185,129,0.35)]"
    >
      <div className="flex items-center gap-3 border-b border-hairline px-5 py-3.5">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-teal-400/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-30/30" />
        <span className="ml-2 font-mono text-[11px] tracking-widest text-ink-30">
          sandbox.py
        </span>
        <span className="ml-auto font-mono text-[11px] text-ink-30">Pyodide · WebAssembly</span>
      </div>

      <div className="px-5 py-6 font-mono text-[13px] leading-relaxed sm:text-sm">
        {rendered.map((line, lineIndex) => (
          <div key={lineIndex} className="min-h-[1.5em] whitespace-pre-wrap break-words">
            {line.map((token, tokenIndex) => (
              <span key={tokenIndex} className={TONE_CLASS[token.tone]}>
                {token.text}
              </span>
            ))}
          </div>
        ))}

        {!isComplete && (
          <span className="ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.18em] bg-emerald-400" />
        )}

        <motion.div
          initial={false}
          animate={{ opacity: isComplete ? 1 : 0, y: isComplete ? 0 : 8 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 border-t border-hairline pt-4"
          aria-live="polite"
        >
          <div className="type-eyebrow mb-1.5">вывод</div>
          <div className="text-emerald-300">{isComplete ? OUTPUT : ' '}</div>
        </motion.div>
      </div>
    </div>
  );
};

/* ───────────────────────────────────────────────────────────────
   Hero
   ─────────────────────────────────────────────────────────────── */

export const Hero = ({ onSyllabusClick }: { onSyllabusClick?: () => void }) => {
  const { performanceSettings, currentUser } = useAuth();
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  // Headline and panel drift apart slightly as the page scrolls away.
  const headlineY = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '-18%']);
  const panelY = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '-6%']);
  const veil = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const rise = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 26 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.08 * index, duration: 0.85, ease: [0.16, 1, 0.3, 1] as const },
    }),
  };

  const stats = [
    { value: String(CURRICULUM_SUMMARY.lessons), label: 'уроков в программе' },
    { value: String(CURRICULUM_SUMMARY.challenges), label: 'задач с автопроверкой' },
    { value: String(CURRICULUM_SUMMARY.tracks), label: 'уровня сложности' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[88vh] flex-col justify-center overflow-hidden px-6 pb-28 pt-28 md:px-10 lg:pt-32"
    >
      {/* Backdrop */}
      <motion.div style={{ opacity: veil }} className="absolute inset-0 -z-10">
        <DotField disabled={performanceSettings.lowPerfMode} />
        <div className="absolute left-1/2 top-0 h-[60vh] w-[80vw] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[140px] animate-breathe" />
        <div className="absolute bottom-0 right-[-10%] h-[40vh] w-[45vw] rounded-full bg-teal-500/10 blur-[160px]" />
        {/* Vignette keeps the type readable wherever the dots land. */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--color-bg-dark)_92%)]" />
      </motion.div>

      <div className="mx-auto grid w-full max-w-[104rem] grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* ── Left: the pitch ── */}
        <motion.div style={{ y: headlineY }} className="max-w-3xl">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={rise}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-emerald-400/25 bg-emerald-400/[0.07] px-4 py-2"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-200/90">
              Python с нуля · бесплатно
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={rise}
            className="type-display text-[clamp(2.75rem,7.2vw,6rem)] text-ink-100"
          >
            Не смотри курс.
            <br />
            <span className="editorial text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-300">
              Пиши код.
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={rise}
            className="mt-7 max-w-xl text-[17px] leading-relaxed text-ink-50 md:text-lg"
          >
            {CURRICULUM_SUMMARY.lessons} уроков, {CURRICULUM_SUMMARY.challenges} задач
            с автопроверкой и настоящий Python прямо во вкладке браузера.
            Ничего не нужно устанавливать — открыл и начал.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={rise}
            className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Link
              to="/pathways"
              onClick={() => playSound('click')}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-emerald-400 px-8 py-4 text-base font-semibold text-[#04070a] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03] active:scale-[0.99] glow-shadow"
            >
              {currentUser ? 'Продолжить обучение' : 'Начать бесплатно'}
              <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <button
              type="button"
              onClick={onSyllabusClick}
              className="group inline-flex items-center justify-center gap-3 rounded-full border border-hairline bg-white/[0.03] px-8 py-4 text-base font-medium text-ink-70 transition-colors hover:border-emerald-400/40 hover:text-ink-100"
            >
              <Play className="h-4 w-4 text-emerald-400" />
              Посмотреть программу
            </button>
          </motion.div>

          {/* Real numbers, derived from the curriculum dataset. */}
          <motion.dl
            custom={4}
            initial="hidden"
            animate="visible"
            variants={rise}
            className="mt-11 grid max-w-xl grid-cols-3 gap-6 border-t border-hairline pt-7"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="type-display text-[clamp(1.4rem,2.6vw,2.2rem)] text-emerald-300">
                  {stat.value}
                </dd>
                <p aria-hidden="true" className="mt-1.5 text-xs leading-snug text-ink-30">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ── Right: the product, shown rather than described ── */}
        <motion.div
          style={{ y: panelY }}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full"
        >
          <LiveTerminal />
        </motion.div>
      </div>

      {/* Topic ribbon */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden border-t border-hairline py-4"
      >
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
          {[...TOPICS, ...TOPICS].map((topic, index) => (
            <span
              key={`${topic}-${index}`}
              className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-30"
            >
              {topic}
              <span className="ml-10 text-emerald-400/40">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
