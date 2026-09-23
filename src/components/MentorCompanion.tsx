import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight, BookOpen, BrainCircuit, GraduationCap, Loader2, Send, Sparkles, X, Zap,
} from 'lucide-react';
import { toast } from 'sonner';

import { useAuth } from '../contexts/AuthContext';
import { playSound } from '../utils/sounds';
import { askMentorAnonymously, getMentorChat, getMentorHint, type MentorSource } from '../services/gemini';
import { SUGGESTED_QUESTIONS } from '../constants/mentor-knowledge';

interface Turn {
  id: string;
  role: 'user' | 'mentor';
  content: string;
  source?: MentorSource;
  lessonId?: string;
}

const WELCOME =
  'Привет! Я помогу разобраться с Python. Спросите про списки, циклы, функции или вставьте текст ошибки — ' +
  'я объясню, что она значит.';

/**
 * Renders the small subset of Markdown the mentor actually produces:
 * fenced code blocks, `inline code` and **bold**.
 *
 * A full Markdown renderer would be a dependency and an XSS surface for a
 * handful of constructs; this builds React nodes directly, so nothing is ever
 * injected as HTML.
 */
const RichText = ({ text }: { text: string }) => {
  const segments = text.split(/```(?:python)?\n?/);

  return (
    <div className="space-y-3">
      {segments.map((segment, index) => {
        if (!segment) return null;

        // Odd indices sit between fences, so they are code.
        if (index % 2 === 1) {
          return (
            <pre
              key={index}
              className="overflow-x-auto rounded-xl border border-hairline bg-black/50 p-3 font-mono text-[11px] leading-relaxed text-emerald-200"
            >
              <code>{segment.replace(/\n$/, '')}</code>
            </pre>
          );
        }

        return (
          <p key={index} className="whitespace-pre-wrap text-sm leading-relaxed text-ink-70">
            {segment.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, partIndex) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return (
                  <strong key={partIndex} className="font-semibold text-ink-100">
                    {part.slice(2, -2)}
                  </strong>
                );
              }
              if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
                return (
                  <code
                    key={partIndex}
                    className="rounded bg-white/[0.07] px-1.5 py-0.5 font-mono text-[12px] text-emerald-200"
                  >
                    {part.slice(1, -1)}
                  </code>
                );
              }
              return <React.Fragment key={partIndex}>{part}</React.Fragment>;
            })}
          </p>
        );
      })}
    </div>
  );
};

const SourceTag = ({ source }: { source: MentorSource }) =>
  source === 'ai' ? (
    <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-widest text-teal-300/70">
      <Sparkles className="h-3 w-3" aria-hidden="true" /> ИИ
    </span>
  ) : (
    <span
      className="inline-flex items-center gap-1 text-[11px] uppercase tracking-widest text-ink-30"
      title="Ответ собран из встроенной базы знаний, без обращения к ИИ"
    >
      <BookOpen className="h-3 w-3" aria-hidden="true" /> База знаний
    </span>
  );

export const MentorCompanion = React.memo(() => {
  const { currentUser, userProfile, lastCodeResult, currentCode, currentChallenge } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState('');
  const [isBusy, setIsBusy] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const nextId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [turns, isBusy]);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Other screens (a stuck lesson, for instance) can summon the mentor.
  useEffect(() => {
    const open = () => setIsOpen(true);
    window.addEventListener('open-mentor', open);
    return () => window.removeEventListener('open-mentor', open);
  }, []);

  // Escape closes the panel wherever focus is.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  // A finished code run is the one moment the mentor has something unprompted
  // to say, so that is the only time the badge appears.
  useEffect(() => {
    if (lastCodeResult && !isOpen) setHasUnread(true);
  }, [lastCodeResult, isOpen]);

  const requireLogin = (): boolean => {
    if (currentUser) return false;
    toast.error('Войдите в аккаунт, чтобы спросить ментора.');
    window.dispatchEvent(new CustomEvent('open-auth-modal'));
    return true;
  };

  const pushMentorTurn = (reply: { text: string; source: MentorSource; lessonId?: string }) => {
    setTurns((prev) => [
      ...prev,
      { id: nextId(), role: 'mentor', content: reply.text, source: reply.source, lessonId: reply.lessonId },
    ]);
  };

  const ask = async (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || isBusy) return;

    const history = [...turns, { id: nextId(), role: 'user' as const, content: trimmed }];
    setTurns(history);
    setDraft('');
    setIsBusy(true);

    try {
      // Without an account the question goes to the public knowledge-base
      // route: no model call, nothing to authorise, so there is no reason to
      // make someone register before asking what a list is.
      const reply = currentUser
        ? await getMentorChat(
            history
              .filter((turn): turn is Turn => turn.role === 'user' || turn.role === 'mentor')
              .map((turn) => ({
                role: turn.role === 'user' ? ('user' as const) : ('assistant' as const),
                content: turn.content,
              })),
            { username: userProfile?.username, level: userProfile?.level },
          )
        : await askMentorAnonymously(trimmed);
      pushMentorTurn(reply);
      playSound('message');
    } catch (error) {
      pushMentorTurn({
        text:
          'Не удалось связаться с сервером. Проверьте соединение и попробуйте ещё раз — ' +
          'ваш вопрос никуда не делся.',
        source: 'offline',
      });
      console.error('Mentor chat failed:', error);
    } finally {
      setIsBusy(false);
    }
  };

  /** Asks for a hint about the challenge the editor currently holds. */
  const requestHint = async () => {
    if (isBusy) return;
    if (!currentChallenge) {
      toast.error('Откройте задачу — тогда я смогу подсказать по ней.');
      return;
    }
    if (requireLogin()) return;

    setTurns((prev) => [...prev, { id: nextId(), role: 'user', content: 'Дай подсказку по задаче' }]);
    setIsBusy(true);
    try {
      const reply = await getMentorHint(
        currentCode,
        currentChallenge,
        lastCodeResult?.success === false ? lastCodeResult.message : undefined,
      );
      pushMentorTurn(reply);
      playSound('success');
    } catch (error) {
      pushMentorTurn({ text: 'Не получилось получить подсказку. Попробуйте ещё раз.', source: 'offline' });
      console.error('Mentor hint failed:', error);
    } finally {
      setIsBusy(false);
    }
  };

  /**
   * Asks for a review of whatever is in the editor.
   *
   * `challenge` is a plain sentence, not an object — the previous version
   * passed `{ title, description }` here, which the server rejected with 400,
   * so this action never once worked.
   */
  const reviewCode = async () => {
    if (isBusy) return;
    if (!currentCode || currentCode.trim().length < 5) {
      toast.error('Напишите немного кода, и я его разберу.');
      return;
    }
    if (requireLogin()) return;

    setTurns((prev) => [...prev, { id: nextId(), role: 'user', content: 'Разбери мой код' }]);
    setIsBusy(true);
    try {
      const reply = await getMentorHint(
        currentCode,
        'Разбери этот код: читаемость, имена переменных, соответствие PEP 8 и возможные улучшения.',
      );
      pushMentorTurn(reply);
      playSound('success');
    } catch (error) {
      pushMentorTurn({ text: 'Не получилось разобрать код. Попробуйте ещё раз.', source: 'offline' });
      console.error('Mentor review failed:', error);
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-label="ИИ-ментор"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="glass glass-lit absolute bottom-24 right-0 flex max-h-[min(640px,80vh)] w-[min(440px,calc(100vw-4rem))] flex-col overflow-hidden rounded-[28px] shadow-[0_30px_100px_-30px_rgba(0,0,0,0.9)]"
          >
            <header className="flex items-center justify-between border-b border-hairline px-6 py-5">
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-400/15">
                  <GraduationCap className="h-5 w-5 text-emerald-300" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-base font-semibold tracking-tight">Ментор</h2>
                  <p className="text-[11px] text-ink-30">Помощь по Python</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Закрыть ментора"
                className="rounded-xl p-2 text-ink-30 transition-colors hover:bg-white/5 hover:text-ink-100"
              >
                <X className="h-4.5 w-4.5" aria-hidden="true" />
              </button>
            </header>

            <div ref={scrollRef} className="flex-grow space-y-5 overflow-y-auto px-6 py-5">
              {turns.length === 0 && (
                <>
                  <div className="rounded-2xl border border-hairline bg-white/[0.03] p-4">
                    <p className="text-sm leading-relaxed text-ink-70">{WELCOME}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="type-eyebrow">попробуйте спросить</p>
                    {SUGGESTED_QUESTIONS.map((question) => (
                      <button
                        key={question}
                        type="button"
                        onClick={() => void ask(question)}
                        className="block w-full rounded-xl border border-hairline px-3.5 py-2.5 text-left text-[13px] text-ink-50 transition-colors hover:border-emerald-400/40 hover:text-ink-100"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {turns.map((turn) =>
                turn.role === 'user' ? (
                  <div key={turn.id} className="flex justify-end">
                    <p className="max-w-[85%] rounded-2xl rounded-br-md bg-emerald-400/15 px-4 py-2.5 text-sm text-ink-100">
                      {turn.content}
                    </p>
                  </div>
                ) : (
                  <div key={turn.id} className="rounded-2xl border border-hairline bg-white/[0.03] p-4">
                    <div className="mb-2.5">
                      <SourceTag source={turn.source ?? 'offline'} />
                    </div>
                    <RichText text={turn.content} />
                    {turn.lessonId && (
                      <Link
                        to={`/lesson/${turn.lessonId}`}
                        onClick={() => setIsOpen(false)}
                        className="mt-3.5 inline-flex items-center gap-1.5 text-[13px] font-medium text-emerald-300 hover:text-emerald-200"
                      >
                        Открыть урок
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                ),
              )}

              {isBusy && (
                <div className="flex items-center gap-2.5 text-ink-30" role="status">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                  <span className="text-xs">Думаю…</span>
                </div>
              )}
            </div>

            <div className="border-t border-hairline px-6 py-4">
              <div className="mb-3 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => void requestHint()}
                  disabled={isBusy}
                  className="flex items-center justify-center gap-2 rounded-xl border border-hairline py-2.5 text-xs font-medium text-ink-70 transition-colors hover:border-emerald-400/40 hover:text-ink-100 disabled:opacity-40"
                >
                  <Zap className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                  Подсказка
                </button>
                <button
                  type="button"
                  onClick={() => void reviewCode()}
                  disabled={isBusy}
                  className="flex items-center justify-center gap-2 rounded-xl border border-hairline py-2.5 text-xs font-medium text-ink-70 transition-colors hover:border-emerald-400/40 hover:text-ink-100 disabled:opacity-40"
                >
                  <BrainCircuit className="h-3.5 w-3.5 text-teal-300" aria-hidden="true" />
                  Разбор кода
                </button>
              </div>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  void ask(draft);
                }}
                className="relative"
              >
                <label htmlFor="mentor-question" className="sr-only">
                  Вопрос ментору
                </label>
                <input
                  id="mentor-question"
                  ref={inputRef}
                  type="text"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  disabled={isBusy}
                  placeholder="Спросите что-нибудь про Python…"
                  className="w-full rounded-2xl border border-hairline bg-white/[0.04] py-3.5 pl-4 pr-12 text-sm transition-colors focus:border-emerald-400/50 focus:outline-none disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isBusy || draft.trim().length === 0}
                  aria-label="Отправить вопрос"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl p-2.5 text-emerald-300 transition-colors hover:bg-emerald-400/10 disabled:opacity-30"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => {
          setIsOpen((open) => !open);
          playSound('click');
        }}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Закрыть ментора' : 'Открыть ментора'}
        className={`relative flex h-14 w-14 items-center justify-center rounded-full border transition-colors ${
          isOpen
            ? 'border-emerald-400/60 bg-emerald-400/20'
            : 'border-hairline bg-surface-2/80 backdrop-blur-md hover:border-emerald-400/40'
        }`}
      >
        <GraduationCap
          className={`h-6 w-6 transition-colors ${isOpen ? 'text-emerald-300' : 'text-ink-50'}`}
          aria-hidden="true"
        />
        {hasUnread && (
          <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-bg-dark bg-emerald-400" />
        )}
      </motion.button>
    </div>
  );
});

MentorCompanion.displayName = 'MentorCompanion';
