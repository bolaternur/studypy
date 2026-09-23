import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, BookOpen, TerminalSquare } from 'lucide-react';

const SUGGESTIONS = [
  { to: '/pathways', label: 'Программа обучения', icon: BookOpen },
  { to: '/sandbox', label: 'Песочница', icon: TerminalSquare },
];

/**
 * A real 404. The previous catch-all route silently rendered the homepage,
 * which made a typo'd or dead link indistinguishable from a working one.
 */
export const NotFound = () => {
  const { pathname } = useLocation();

  return (
    <>
      <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="type-eyebrow mb-6">ошибка 404</p>
          <h1 className="type-display text-[clamp(3rem,12vw,9rem)] text-emerald-300">
            404
          </h1>
          <p className="mt-6 text-2xl font-semibold tracking-tight">
            Такой страницы нет
          </p>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-ink-50">
            Адрес{' '}
            <code className="rounded bg-white/5 px-2 py-0.5 font-mono text-sm text-ink-70">
              {pathname}
            </code>{' '}
            не ведёт ни к одному разделу. Возможно, ссылка устарела.
          </p>

          <div className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-emerald-400 px-7 py-3.5 font-semibold text-[#04070a] transition-transform hover:scale-[1.03]"
            >
              <ArrowLeft className="h-4 w-4" />
              На главную
            </Link>
            {SUGGESTIONS.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-hairline px-7 py-3.5 font-medium text-ink-70 transition-colors hover:border-emerald-400/40 hover:text-ink-100"
              >
                <Icon className="h-4 w-4 text-emerald-400" />
                {label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
};
