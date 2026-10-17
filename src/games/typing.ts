export interface TypingSettings { keyboard: boolean }
export const DEFAULT_TYPING_SETTINGS: TypingSettings = { keyboard: true };
export const TYPING_SETTINGS_KEY = 'studypy:typing:settings:v2';
export const LEGACY_TYPING_SETTINGS_KEY = 'studypy:typing:settings:v1';
export const TYPING_PROGRESS_KEY = 'studypy:typing:levels:v2';
export const TYPING_DRAFT_PREFIX = 'studypy:typing:level-draft:v1:';
/** Legacy time/language fields are ignored; the old stored record is never rewritten. */
export function sanitizeTypingSettings(value: unknown): TypingSettings {
  return { keyboard: value && typeof value === 'object' && typeof (value as TypingSettings).keyboard === 'boolean' ? (value as TypingSettings).keyboard : true };
}
export interface TypingSession {
  id: string;
  target: string;
  typed: string;
  phase: 'ready' | 'running' | 'finished';
  startedAt: number | null;
  finishedAt: number | null;
  elapsedBeforeStart: number;
  reason: 'text' | 'manual' | null;
  attempts: number;
  correctAttempts: number;
  deleted: number;
}
export const newTypingSession = (target: string, id = ''): TypingSession => ({ id, target, typed: '', phase: 'ready', startedAt: null, finishedAt: null, elapsedBeforeStart: 0, reason: null, attempts: 0, correctAttempts: 0, deleted: 0 });
/** A manual stop may produce statistics, but only an exact text can complete a level. */
export function finishTyping(session: TypingSession, now: number, reason: 'text' | 'manual'): TypingSession {
  if (session.phase !== 'running' || reason === 'text' && session.typed !== session.target) return session;
  return { ...session, phase: 'finished', finishedAt: Math.max(session.startedAt!, now), reason };
}
/** The code course has no deadline; kept as a stable pure API for callers. */
export function tickTyping(session: TypingSession, _now: number, _settings?: TypingSettings): TypingSession { return session; }
/** Count committed characters, not keydown events. Corrections retain historical errors. */
export function applyTypingInput(session: TypingSession, nextValue: string, now: number, _settings?: TypingSettings): TypingSession {
  if (session.phase === 'finished') return session;
  const target = Array.from(session.target);
  const before = Array.from(session.typed);
  const after = Array.from(nextValue.replace(/\r\n?/g, '\n').normalize('NFC'));
  if (before.join('') === after.join('')) return session;
  let prefix = 0;
  while (prefix < before.length && prefix < after.length && before[prefix] === after[prefix]) prefix++;
  let suffix = 0;
  while (suffix < before.length - prefix && suffix < after.length - prefix && before[before.length - 1 - suffix] === after[after.length - 1 - suffix]) suffix++;
  const inserted = after.slice(prefix, after.length - suffix);
  const removed = before.length - prefix - suffix;
  const startedAt = session.startedAt ?? (inserted.length ? now : null);
  const next: TypingSession = { ...session, typed: after.join(''), startedAt, phase: startedAt === null ? 'ready' : 'running', attempts: session.attempts + inserted.length, correctAttempts: session.correctAttempts + inserted.filter((character, index) => character === target[prefix + index]).length, deleted: session.deleted + removed };
  return next.typed === next.target && next.target.length > 0 && startedAt !== null ? finishTyping(next, now, 'text') : next;
}
export function typingMetrics(session: TypingSession, now: number) {
  const elapsedMs = session.elapsedBeforeStart + (session.startedAt === null ? 0 : Math.max(0, (session.finishedAt ?? now) - session.startedAt));
  const minutes = elapsedMs / 60000;
  const target = Array.from(session.target), typed = Array.from(session.typed);
  const correct = typed.filter((character, index) => character === target[index]).length;
  return { elapsedMs, correct, incorrect: typed.length - correct, entered: typed.length, attempts: session.attempts, errors: session.attempts - session.correctAttempts, accuracy: session.attempts ? Math.round(session.correctAttempts / session.attempts * 100) : 100, cpm: minutes > 0 ? Math.round(correct / minutes) : 0, wpm: minutes > 0 ? Math.round(correct / 5 / minutes) : 0, rawWpm: minutes > 0 ? Math.round(session.attempts / 5 / minutes) : 0 };
}
export interface TypingBest { accuracy: number; wpm: number; elapsedMs: number; errors: number }
export interface TypingLevelRecord { completed: true; completedAt: string; attempts: number; lastSessionId: string; best: TypingBest | null }
export interface TypingProgress { version: 2; selectedId: string; levels: Record<string, TypingLevelRecord> }
export const newTypingProgress = (): TypingProgress => ({ version: 2, selectedId: '', levels: {} });
const finiteNonnegative = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value) && value >= 0;
export function sanitizeTypingProgress(value: unknown): TypingProgress {
  if (!value || typeof value !== 'object') return newTypingProgress();
  const source = value as Partial<TypingProgress>;
  const levels: Record<string, TypingLevelRecord> = Object.create(null);
  if (source.levels && typeof source.levels === 'object') for (const [id, record] of Object.entries(source.levels)) {
    if (!record || typeof record !== 'object' || record.completed !== true) continue;
    const best = record.best && finiteNonnegative(record.best.accuracy) && record.best.accuracy <= 100 && finiteNonnegative(record.best.wpm) && finiteNonnegative(record.best.elapsedMs) && finiteNonnegative(record.best.errors) ? record.best : null;
    levels[id] = { completed: true, completedAt: typeof record.completedAt === 'string' ? record.completedAt : '', attempts: finiteNonnegative(record.attempts) ? Math.floor(record.attempts) : 1, lastSessionId: typeof record.lastSessionId === 'string' ? record.lastSessionId : '', best };
  }
  return { version: 2, selectedId: typeof source.selectedId === 'string' ? source.selectedId : '', levels };
}
/** Local, personal completion only. It neither proves Python knowledge nor grants a reward. */
export function recordTypingCompletion(progress: TypingProgress, levelId: string, session: TypingSession, timestamp: string): TypingProgress {
  if (session.phase !== 'finished' || session.reason !== 'text' || !session.target || session.typed !== session.target) return progress;
  const previous = progress.levels[levelId];
  const sessionId = session.id || `${session.startedAt}:${session.finishedAt}:${session.target}`;
  if (previous?.lastSessionId === sessionId) return progress;
  const metrics = typingMetrics(session, session.finishedAt ?? 0);
  const candidate: TypingBest | null = metrics.elapsedMs >= 1000 ? { accuracy: metrics.accuracy, wpm: metrics.wpm, elapsedMs: metrics.elapsedMs, errors: metrics.errors } : null;
  const best = candidate && (!previous?.best || candidate.accuracy > previous.best.accuracy || candidate.accuracy === previous.best.accuracy && candidate.elapsedMs < previous.best.elapsedMs) ? candidate : previous?.best ?? null;
  return { ...progress, selectedId: levelId, levels: { ...progress.levels, [levelId]: { completed: true, completedAt: previous?.completedAt || timestamp, attempts: (previous?.attempts ?? 0) + 1, lastSessionId: sessionId, best } } };
}
export function nextUnfinishedTypingLevel(ids: string[], progress: TypingProgress, currentId?: string): string | undefined {
  const start = currentId ? Math.max(0, ids.indexOf(currentId) + 1) : 0;
  return [...ids.slice(start), ...ids.slice(0, start)].find(id => !progress.levels[id]?.completed);
}
export interface TypingDraft { version: 1; target: string; typed: string; attempts: number; correctAttempts: number; deleted: number; elapsedMs: number }
export function typingDraft(session: TypingSession, now: number): TypingDraft {
  return { version: 1, target: session.target, typed: session.typed, attempts: session.attempts, correctAttempts: session.correctAttempts, deleted: session.deleted, elapsedMs: typingMetrics(session, now).elapsedMs };
}
export function restoreTypingDraft(target: string, value: unknown, id = ''): TypingSession {
  const fresh = newTypingSession(target, id);
  if (!value || typeof value !== 'object') return fresh;
  const draft = value as Partial<TypingDraft>;
  if (draft.version !== 1 || draft.target !== target || typeof draft.typed !== 'string' || draft.typed === target || Array.from(draft.typed).length > 100000 || !finiteNonnegative(draft.attempts) || !finiteNonnegative(draft.correctAttempts) || draft.correctAttempts > draft.attempts || draft.attempts < Array.from(draft.typed).length || !finiteNonnegative(draft.deleted) || !finiteNonnegative(draft.elapsedMs)) return fresh;
  return { ...fresh, typed: draft.typed, attempts: Math.floor(draft.attempts), correctAttempts: Math.floor(draft.correctAttempts), deleted: Math.floor(draft.deleted), elapsedBeforeStart: draft.elapsedMs };
}
export function keyHint(character: string, language: 'en' | 'ru' | 'python' = 'python'): { label: string; code: string; shift: boolean } {
  if (!character) return { label: 'Исправь различия', code: 'Backspace', shift: false };
  if (character === ' ') return { label: 'Пробел', code: 'Space', shift: false };
  if (character === '\n') return { label: 'Enter', code: 'Enter', shift: false };
  const letters = language === 'ru' ? 'йцукенгшщзхъфывапролджэячсмитьбюё' : 'qwertyuiop[]asdfghjkl;\'zxcvbnm,./`';
  const codes = ['KeyQ','KeyW','KeyE','KeyR','KeyT','KeyY','KeyU','KeyI','KeyO','KeyP','BracketLeft','BracketRight','KeyA','KeyS','KeyD','KeyF','KeyG','KeyH','KeyJ','KeyK','KeyL','Semicolon','Quote','KeyZ','KeyX','KeyC','KeyV','KeyB','KeyN','KeyM','Comma','Period', ...(language === 'ru' ? ['Backquote'] : ['Slash','Backquote'])];
  const index = letters.indexOf(character.toLowerCase());
  if (index >= 0) return { label: character, code: codes[index], shift: character !== character.toLowerCase() };
  const digits = '1234567890-=';
  if (digits.includes(character)) return { label: character, code: character === '-' ? 'Minus' : character === '=' ? 'Equal' : 'Digit' + character, shift: false };
  if (language === 'ru' && character === '.') return { label: character, code: 'Slash', shift: false };
  if (language === 'ru' && character === ',') return { label: character, code: 'Slash', shift: true };
  const shifted: Record<string, string> = { '!': 'Digit1', '@': 'Digit2', '#': 'Digit3', '$': 'Digit4', '%': 'Digit5', '^': 'Digit6', '&': 'Digit7', '*': 'Digit8', '(': 'Digit9', ')': 'Digit0', '_': 'Minus', '+': 'Equal', '{': 'BracketLeft', '}': 'BracketRight', ':': 'Semicolon', '"': 'Quote', '<': 'Comma', '>': 'Period', '?': 'Slash', '|': 'Backslash', '~': 'Backquote' };
  if (character === '\\') return { label: character, code: 'Backslash', shift: false };
  return { label: character, code: shifted[character] ?? '', shift: Boolean(shifted[character]) };
}
