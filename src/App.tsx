import React, { Suspense, useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
import { Toaster } from 'sonner';
import { Loader2, Terminal, X } from 'lucide-react';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Navbar } from './components/Layout';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ServiceNotice } from './components/ServiceNotice';
import { MentorCompanion } from './components/MentorCompanion';
import { PetCompanion } from './components/PetCompanion';
import { QuestSidebar } from './components/QuestSidebar';
import { GlowingCursor } from './components/GlowingCursor';
import { LEGAL_DOCUMENTS, type LegalDocumentId } from './constants/legal';

const Pathways = React.lazy(() => import('./pages/Pathways').then(m => ({ default: m.Pathways })));
const LessonDetail = React.lazy(() => import('./pages/LessonDetail').then(m => ({ default: m.LessonDetail })));
const PythonGenesis = React.lazy(() => import('./pages/lessons/PythonGenesis').then(m => ({ default: m.PythonGenesis })));
const DataVessels = React.lazy(() => import('./pages/lessons/DataVessels').then(m => ({ default: m.DataVessels })));
const TheCollection = React.lazy(() => import('./pages/lessons/TheCollection').then(m => ({ default: m.TheCollection })));
const TemporalLoops = React.lazy(() => import('./pages/lessons/TemporalLoops').then(m => ({ default: m.TemporalLoops })));
const Community = React.lazy(() => import('./pages/Community').then(m => ({ default: m.Community })));
const Arcade = React.lazy(() => import('./pages/Arcade').then(m => ({ default: m.Arcade })));
const Sandbox = React.lazy(() => import('./pages/Sandbox').then(m => ({ default: m.Sandbox })));
const Leaderboard = React.lazy(() => import('./pages/Leaderboard').then(m => ({ default: m.Leaderboard })));
const Shop = React.lazy(() => import('./pages/Shop').then(m => ({ default: m.Shop })));
const Inventory = React.lazy(() => import('./pages/Inventory').then(m => ({ default: m.Inventory })));
const Admin = React.lazy(() => import('./pages/Admin').then(m => ({ default: m.Admin })));
const Friends = React.lazy(() => import('./pages/Friends').then(m => ({ default: m.Friends })));
const Tournaments = React.lazy(() => import('./pages/Tournaments').then(m => ({ default: m.Tournaments })));
const TournamentArena = React.lazy(() => import('./pages/TournamentArena').then(m => ({ default: m.TournamentArena })));
const Duel = React.lazy(() => import('./pages/Duel').then(m => ({ default: m.Duel })));
const BossArena = React.lazy(() => import('./pages/BossArena').then(m => ({ default: m.BossArena })));
const CommunityGallery = React.lazy(() => import('./pages/CommunityGallery').then(m => ({ default: m.CommunityGallery })));
const DailyChallenges = React.lazy(() => import('./pages/DailyChallenges').then(m => ({ default: m.DailyChallenges })));
const Guilds = React.lazy(() => import('./pages/Guilds').then(m => ({ default: m.Guilds })));
const SkillTree = React.lazy(() => import('./pages/SkillTree').then(m => ({ default: m.SkillTree })));
const Achievements = React.lazy(() => import('./pages/Achievements').then(m => ({ default: m.Achievements })));
const UserProfilePublic = React.lazy(() => import('./pages/UserProfilePublic').then(m => ({ default: m.UserProfilePublic })));

/* ───────────────────────────────────────────────────────────────
   Route chrome
   ─────────────────────────────────────────────────────────────── */

const PageLoading = () => (
  <div
    role="status"
    aria-live="polite"
    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-dark/85 backdrop-blur-md"
  >
    <Loader2 className="h-9 w-9 animate-spin text-emerald-400" aria-hidden="true" />
    <p className="type-eyebrow mt-6">загружаем раздел</p>
  </div>
);

/** Per-route document titles — the app previously shipped one title for every screen. */
const ROUTE_TITLES: Record<string, string> = {
  '/': 'StudyPy — Python с нуля, прямо в браузере',
  '/pathways': 'Программа обучения — StudyPy',
  '/sandbox': 'Песочница — StudyPy',
  '/arcade': 'Аркада — StudyPy',
  '/daily': 'Задача дня — StudyPy',
  '/leaderboard': 'Рейтинг — StudyPy',
  '/shop': 'Магазин — StudyPy',
  '/inventory': 'Инвентарь — StudyPy',
  '/friends': 'Друзья — StudyPy',
  '/guilds': 'Гильдии — StudyPy',
  '/tournaments': 'Турниры — StudyPy',
  '/duels': 'Дуэли — StudyPy',
  '/boss-arena': 'Испытания — StudyPy',
  '/community': 'Сообщество — StudyPy',
  '/gallery': 'Галерея решений — StudyPy',
  '/skill-tree': 'Древо навыков — StudyPy',
  '/achievements': 'Достижения — StudyPy',
  '/admin': 'Администрирование — StudyPy',
};

function RouteEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = ROUTE_TITLES[pathname] ?? 'StudyPy — учись писать на Python';
  }, [pathname]);

  return null;
}

/**
 * Inertial scrolling. Disabled outright when the visitor prefers reduced
 * motion — hijacking the scroll wheel is exactly the kind of thing that
 * preference is asking us not to do.
 */
function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}

/* ───────────────────────────────────────────────────────────────
   Legal dialog
   ─────────────────────────────────────────────────────────────── */

const LegalModal = ({
  documentId,
  onClose,
}: {
  documentId: LegalDocumentId | null;
  onClose: () => void;
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!documentId) return;

    restoreFocusTo.current = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;

      // Keep Tab inside the dialog while it is open.
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      restoreFocusTo.current?.focus();
    };
  }, [documentId, onClose]);

  const legalDocument = documentId ? LEGAL_DOCUMENTS[documentId] : null;

  return (
    <AnimatePresence>
      {legalDocument && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-dialog-title"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.97, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass glass-lit relative max-h-[82vh] w-full max-w-2xl overflow-y-auto rounded-[32px] p-8 md:p-12"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрыть"
              className="absolute right-6 top-6 rounded-full p-2 text-ink-30 transition-colors hover:bg-white/5 hover:text-ink-100"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <h2 id="legal-dialog-title" className="mb-2 text-3xl font-semibold tracking-tight">
              {legalDocument.title}
            </h2>
            <p className="type-eyebrow mb-8">
              редакция от {legalDocument.effectiveDate}
            </p>

            <div className="space-y-7">
              {legalDocument.sections.map((section) => (
                <section key={section.heading}>
                  <h3 className="mb-2.5 text-base font-semibold text-emerald-300">
                    {section.heading}
                  </h3>
                  <p className="leading-relaxed text-ink-50">{section.body}</p>
                </section>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

/* ───────────────────────────────────────────────────────────────
   Routes
   ─────────────────────────────────────────────────────────────── */

const AppRoutes = () => {
  const location = useLocation();
  return (
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route path="/pathways" element={<Pathways />} />
      <Route path="/lesson/intro" element={<PythonGenesis />} />
      <Route path="/lesson/variables" element={<DataVessels />} />
      <Route path="/lesson/lists" element={<TheCollection />} />
      <Route path="/lesson/loops" element={<TemporalLoops />} />
      <Route path="/lesson/:id" element={<LessonDetail />} />
      <Route path="/community" element={<Community />} />
      <Route path="/arcade" element={<Arcade />} />
      <Route path="/sandbox" element={<Sandbox />} />
      <Route path="/sandbox/:id" element={<Sandbox />} />
      <Route path="/collaborative" element={<Sandbox />} />
      <Route path="/daily" element={<DailyChallenges />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/achievements" element={<Achievements />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/friends" element={<Friends />} />
      <Route path="/tournaments" element={<Tournaments />} />
      <Route path="/tournaments/:id" element={<TournamentArena />} />
      <Route path="/duels" element={<Duel />} />
      <Route path="/boss-arena" element={<BossArena />} />
      <Route path="/gallery" element={<CommunityGallery />} />
      <Route path="/guilds" element={<Guilds />} />
      <Route path="/skill-tree" element={<SkillTree />} />
      <Route path="/u/:username" element={<UserProfilePublic />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

/* ───────────────────────────────────────────────────────────────
   Shell
   ─────────────────────────────────────────────────────────────── */

const Footer = ({ onOpenLegal }: { onOpenLegal: (id: LegalDocumentId) => void }) => (
  <footer className="border-t border-hairline bg-surface-1/50 px-6 py-16 md:px-10">
    <div className="mx-auto max-w-[104rem]">
      <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
        <div className="flex items-center gap-2.5">
          <Terminal className="h-5 w-5 text-emerald-400" aria-hidden="true" />
          <span className="text-lg font-semibold tracking-tight">StudyPy</span>
        </div>

        <nav aria-label="Правовая информация" className="flex flex-wrap gap-7 text-sm">
          {(Object.keys(LEGAL_DOCUMENTS) as LegalDocumentId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => onOpenLegal(id)}
              className="text-ink-30 transition-colors hover:text-ink-100"
            >
              {LEGAL_DOCUMENTS[id].title}
            </button>
          ))}
        </nav>

        <p className="text-sm text-ink-30">
          © {new Date().getFullYear()} StudyPy
        </p>
      </div>
    </div>
  </footer>
);

const AppContent = () => {
  const [legalDocumentId, setLegalDocumentId] = useState<LegalDocumentId | null>(null);
  const { performanceSettings } = useAuth();

  return (
    <Router>
      <RouteEffects />
      <SmoothScroll />
      <GlowingCursor />

      <a href="#main" className="skip-link">
        Перейти к содержимому
      </a>

      <div className="relative min-h-screen bg-bg-dark text-ink-100">
        {/* Ambient wash. Two soft fields only — the old build stacked a node
            graph, a grid and two blurs, which cost more than it added. */}
        {!performanceSettings.lowPerfMode && (
          <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
            <div className="absolute -left-[10%] top-0 h-[45vw] w-[45vw] rounded-full bg-emerald-500/[0.07] blur-[150px]" />
            <div className="absolute -right-[10%] bottom-0 h-[50vw] w-[50vw] rounded-full bg-teal-500/[0.06] blur-[170px]" />
          </div>
        )}

        <div className="relative z-10">
          <Toaster position="top-right" richColors theme="dark" />
          <QuestSidebar />
          <Navbar />

          <main id="main">
            <ErrorBoundary>
              <Suspense fallback={<PageLoading />}>
                <AppRoutes />
              </Suspense>
            </ErrorBoundary>
          </main>

          <MentorCompanion />
          <PetCompanion />

          <Footer onOpenLegal={setLegalDocumentId} />
        </div>
      </div>

      <ServiceNotice />

      {!performanceSettings.lowPerfMode && <div className="grain" aria-hidden="true" />}

      <LegalModal documentId={legalDocumentId} onClose={() => setLegalDocumentId(null)} />
    </Router>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  );
}
