import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Gamepad2,
  ShoppingBag,
  Swords,
  TerminalSquare,
  Trophy,
  Users,
} from 'lucide-react';

import { Hero } from '../components/Hero';
import { CURRICULUM_SUMMARY } from '../constants/curriculum-summary';
import { playSound } from '../utils/sounds';

/* ───────────────────────────────────────────────────────────────
   Shared section primitives
   ─────────────────────────────────────────────────────────────── */

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const SectionHeading = ({
  index,
  eyebrow,
  title,
  accent,
  lead,
}: {
  index: string;
  eyebrow: string;
  title: string;
  accent: string;
  lead?: string;
}) => (
  <motion.header
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-15%' }}
    variants={reveal}
    className="mb-16 md:mb-24"
  >
    <div className="mb-7 flex items-center gap-4">
      <span className="font-mono text-xs text-emerald-400">{index}</span>
      <span className="h-px w-12 bg-emerald-400/30" />
      <span className="type-eyebrow">{eyebrow}</span>
    </div>
    <h2 className="type-display max-w-4xl text-[clamp(2.4rem,6vw,5rem)]">
      {title}{' '}
      <span className="editorial text-emerald-300">{accent}</span>
    </h2>
    {lead && (
      <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-50">{lead}</p>
    )}
  </motion.header>
);

/* ───────────────────────────────────────────────────────────────
   02 — How it works. Sticky left rail, scrolling right column.
   ─────────────────────────────────────────────────────────────── */

const STEPS = [
  {
    number: '01',
    title: 'Читаешь короткий урок',
    body:
      'Каждая тема разбита на главы с примерами кода. Без воды и без часовых видео — только то, что нужно, чтобы написать следующую строчку.',
  },
  {
    number: '02',
    title: 'Сразу решаешь задачу',
    body:
      'К уроку идут задачи с автопроверкой. Пишешь решение в редакторе, жмёшь «Запустить» — тесты прогоняются прямо в браузере и показывают, что именно не сошлось.',
  },
  {
    number: '03',
    title: 'Видишь, что происходит внутри',
    body:
      'Визуализатор показывает выполнение шаг за шагом: какие переменные создались, как меняются списки, куда ушёл поток управления. Отладка перестаёт быть угадыванием.',
  },
  {
    number: '04',
    title: 'Закрепляешь практикой',
    body:
      'Ежедневные задачи, мини-игры на скорость и песочница для своих экспериментов. Прогресс, уровни и рейтинг — чтобы возвращаться было незачем заставлять себя.',
  },
];

const HowItWorks = () => (
  <section className="relative border-t border-hairline px-6 py-28 md:px-10 md:py-40">
    <div className="mx-auto max-w-[104rem]">
      <SectionHeading
        index="02"
        eyebrow="как это устроено"
        title="Четыре шага, которые"
        accent="реально работают"
        lead="Обучение построено вокруг одного цикла: узнал → применил → увидел результат → повторил на новой задаче."
      />

      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:h-fit">
          <div className="glass glass-lit rounded-[28px] p-8">
            <div className="type-eyebrow mb-4">цикл обучения</div>
            <p className="text-2xl leading-snug text-ink-70">
              Ты не «проходишь курс». Ты пишешь код с первого урока и до
              последнего — а платформа проверяет каждую строчку.
            </p>
            <dl className="mt-10 space-y-5 border-t border-hairline pt-8">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-sm text-ink-30">Уроков</dt>
                <dd className="font-mono text-xl text-emerald-300">
                  {CURRICULUM_SUMMARY.lessons}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-sm text-ink-30">Задач с тестами</dt>
                <dd className="font-mono text-xl text-emerald-300">
                  {CURRICULUM_SUMMARY.challenges}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-sm text-ink-30">Уровней сложности</dt>
                <dd className="font-mono text-xl text-emerald-300">
                  {CURRICULUM_SUMMARY.tracks}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <ol className="space-y-px">
          {STEPS.map((step) => (
            <motion.li
              key={step.number}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-20%' }}
              variants={reveal}
              className="group border-t border-hairline py-10 last:border-b"
            >
              <div className="flex gap-6 md:gap-10">
                <span className="font-mono text-sm text-emerald-400/60 transition-colors group-hover:text-emerald-300">
                  {step.number}
                </span>
                <div>
                  <h3 className="mb-3 text-2xl font-semibold tracking-tight text-ink-100 md:text-3xl">
                    {step.title}
                  </h3>
                  <p className="max-w-xl leading-relaxed text-ink-50">{step.body}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);

/* ───────────────────────────────────────────────────────────────
   03 — Feature bento
   ─────────────────────────────────────────────────────────────── */

interface Feature {
  title: string;
  description: string;
  icon: typeof Trophy;
  to: string;
  span: string;
  tone: 'emerald' | 'teal' | 'amber';
}

const FEATURES: Feature[] = [
  {
    title: 'Песочница',
    description:
      'Полноценный Python в браузере на Pyodide. Пиши что угодно, подключай стандартную библиотеку, делись ссылкой на сессию.',
    icon: TerminalSquare,
    to: '/sandbox',
    span: 'md:col-span-7 md:row-span-2',
    tone: 'emerald',
  },
  {
    title: 'Аркада',
    description: 'Мини-игры на синтаксис, скорость и поиск багов.',
    icon: Gamepad2,
    to: '/arcade',
    span: 'md:col-span-5',
    tone: 'teal',
  },
  {
    title: 'Дуэли',
    description: 'Один на один в реальном времени: кто первым пройдёт тесты.',
    icon: Swords,
    to: '/duels',
    span: 'md:col-span-5',
    tone: 'amber',
  },
  {
    title: 'Турниры',
    description: 'Серии задач на время с общим зачётом и наградами.',
    icon: Trophy,
    to: '/tournaments',
    span: 'md:col-span-4',
    tone: 'amber',
  },
  {
    title: 'Сообщество',
    description: 'Друзья, гильдии и общая галерея решений.',
    icon: Users,
    to: '/friends',
    span: 'md:col-span-4',
    tone: 'teal',
  },
  {
    title: 'Магазин',
    description: 'Монеты за задачи — бусты, предметы и оформление профиля.',
    icon: ShoppingBag,
    to: '/shop',
    span: 'md:col-span-4',
    tone: 'emerald',
  },
];

const TONE: Record<Feature['tone'], { text: string; ring: string; glow: string }> = {
  emerald: {
    text: 'text-emerald-300',
    ring: 'group-hover:border-emerald-400/40',
    glow: 'group-hover:shadow-[0_30px_90px_-40px_rgba(16,185,129,0.6)]',
  },
  teal: {
    text: 'text-teal-300',
    ring: 'group-hover:border-teal-400/40',
    glow: 'group-hover:shadow-[0_30px_90px_-40px_rgba(45,212,191,0.6)]',
  },
  amber: {
    text: 'text-amber-300',
    ring: 'group-hover:border-amber-400/40',
    glow: 'group-hover:shadow-[0_30px_90px_-40px_rgba(251,191,36,0.45)]',
  },
};

const FeatureCard = ({ feature }: { feature: Feature }) => {
  const tone = TONE[feature.tone];
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`${feature.span} group relative`}
    >
      <Link
        to={feature.to}
        onClick={() => playSound('click')}
        className={`flex h-full flex-col rounded-[28px] border border-hairline bg-surface-1/70 p-8 backdrop-blur-sm transition-all duration-500 ${tone.ring} ${tone.glow} md:p-10`}
      >
        <Icon className={`h-7 w-7 ${tone.text}`} aria-hidden="true" />

        <div className="mt-auto pt-16">
          <h3 className="mb-3 text-2xl font-semibold tracking-tight text-ink-100 md:text-3xl">
            {feature.title}
          </h3>
          <p className="max-w-md leading-relaxed text-ink-50">{feature.description}</p>
          <span
            className={`mt-7 inline-flex items-center gap-2 text-sm font-medium ${tone.text}`}
          >
            Открыть
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

const Features = () => (
  <section className="relative border-t border-hairline px-6 py-28 md:px-10 md:py-40">
    <div className="mx-auto max-w-[104rem]">
      <SectionHeading
        index="03"
        eyebrow="что внутри"
        title="Не только уроки, а"
        accent="целая мастерская"
        lead="Всё, что помогает не бросить на второй неделе: практика, соревнование и живое сообщество."
      />
      <div className="grid auto-rows-[minmax(230px,auto)] grid-cols-1 gap-4 md:grid-cols-12">
        {FEATURES.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </div>
    </div>
  </section>
);

/* ───────────────────────────────────────────────────────────────
   04 — Curriculum tracks
   ─────────────────────────────────────────────────────────────── */

const TRACKS = [
  {
    level: 'Новичок',
    title: 'Основы',
    topics: ['Синтаксис и вывод', 'Переменные и типы', 'Условия', 'Списки'],
  },
  {
    level: 'Средний',
    title: 'Логика',
    topics: ['Циклы', 'Функции', 'Словари и множества', 'Модули'],
  },
  {
    level: 'Продвинутый',
    title: 'Архитектура',
    topics: ['ООП', 'Декораторы', 'Генераторы', 'Контекстные менеджеры'],
  },
  {
    level: 'Профи',
    title: 'Мастерство',
    topics: ['asyncio', 'Типизация', 'Тестирование', 'Оптимизация'],
  },
];

const Curriculum = () => (
  <section
    id="curriculum"
    className="relative scroll-mt-24 border-t border-hairline px-6 py-28 md:px-10 md:py-40"
  >
    <div className="mx-auto max-w-[104rem]">
      <div className="mb-16 flex flex-col justify-between gap-10 md:mb-24 md:flex-row md:items-end">
        <SectionHeading
          index="04"
          eyebrow="программа"
          title="От первой строки до"
          accent="production-кода"
        />
        <Link
          to="/pathways"
          onClick={() => playSound('click')}
          className="group mb-2 inline-flex shrink-0 items-center gap-3 rounded-full border border-hairline px-7 py-4 font-medium text-ink-70 transition-colors hover:border-emerald-400/40 hover:text-ink-100"
        >
          Все {CURRICULUM_SUMMARY.lessons} уроков
          <ArrowRight className="h-4 w-4 text-emerald-400 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {TRACKS.map((track, index) => (
          <motion.article
            key={track.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ delay: index * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative overflow-hidden rounded-[28px] border border-hairline bg-surface-1/60 p-9 transition-colors duration-500 hover:border-emerald-400/30"
          >
            {/* Depth cue: the accent wash strengthens as the tier climbs. */}
            <div
              className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-emerald-500/10 blur-[70px] transition-transform duration-700 group-hover:scale-150"
              style={{ opacity: 0.35 + index * 0.18 }}
              aria-hidden="true"
            />
            <div className="relative">
              <span className="type-eyebrow">{track.level}</span>
              <h3 className="mb-8 mt-5 text-3xl font-semibold tracking-tight">
                {track.title}
              </h3>
              <ul className="space-y-3.5">
                {track.topics.map((topic) => (
                  <li key={topic} className="flex items-center gap-3 text-ink-50">
                    <span
                      className="h-1 w-1 shrink-0 rounded-full bg-emerald-400"
                      aria-hidden="true"
                    />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

/* ───────────────────────────────────────────────────────────────
   05 — Closing call to action
   ─────────────────────────────────────────────────────────────── */

const CallToAction = () => {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 1 : 0.94, 1]);

  return (
    <section ref={ref} className="border-t border-hairline px-6 py-28 md:px-10 md:py-40">
      <motion.div
        style={{ scale }}
        className="glass glass-lit relative mx-auto max-w-[104rem] overflow-hidden rounded-[36px] px-8 py-20 text-center md:px-16 md:py-32"
      >
        <div
          className="absolute left-1/2 top-0 h-72 w-[70%] -translate-x-1/2 rounded-full bg-emerald-500/20 blur-[120px]"
          aria-hidden="true"
        />
        <div className="relative">
          <h2 className="type-display mx-auto max-w-4xl text-[clamp(2.2rem,6vw,4.75rem)]">
            Первый урок займёт{' '}
            <span className="editorial text-emerald-300">десять минут</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-ink-50">
            Регистрация не нужна, чтобы открыть песочницу и попробовать. Аккаунт
            понадобится только чтобы сохранять прогресс.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/pathways"
              onClick={() => playSound('click')}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-emerald-400 px-9 py-4 text-base font-semibold text-[#04070a] transition-transform duration-300 hover:scale-[1.03] active:scale-[0.99] glow-shadow"
            >
              Открыть программу
              <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/sandbox"
              onClick={() => playSound('click')}
              className="inline-flex items-center justify-center gap-3 rounded-full border border-hairline px-9 py-4 text-base font-medium text-ink-70 transition-colors hover:border-emerald-400/40 hover:text-ink-100"
            >
              Просто попробовать код
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

/* ───────────────────────────────────────────────────────────────

   ─────────────────────────────────────────────────────────────── */

export const Home = () => {
  const scrollToCurriculum = () => {
    playSound('click');
    document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <Hero onSyllabusClick={scrollToCurriculum} />
      <HowItWorks />
      <Features />
      <Curriculum />
      <CallToAction />
    </div>
  );
};
