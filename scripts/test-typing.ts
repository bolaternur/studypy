import assert from 'node:assert/strict';
import { applyTypingInput, DEFAULT_TYPING_SETTINGS, finishTyping, keyHint, newTypingProgress, newTypingSession, nextUnfinishedTypingLevel, recordTypingCompletion, restoreTypingDraft, sanitizeTypingProgress, sanitizeTypingSettings, tickTyping, typingDraft, typingMetrics, type TypingSession } from '../src/games/typing';
import { TYPING_LEVELS } from '../src/games/typing-levels';
let checks = 0;
function check(name: string, run: () => void) { run(); checks++; console.log(`PASS ${name}`); }
function complete(target: string, id = 'session', duration = 2000): TypingSession { const start = applyTypingInput(newTypingSession(target, id), target.slice(0, 1), 100); return applyTypingInput(start, target, 100 + duration); }
check('legacy settings cannot restore removed random/language/time modes', () => {
  assert.deepEqual(sanitizeTypingSettings(null), DEFAULT_TYPING_SETTINGS);
  assert.deepEqual(sanitizeTypingSettings({ mode: 'words', language: 'ru', duration: 15, keyboard: false }), { keyboard: false });
  assert.deepEqual(sanitizeTypingSettings({ keyboard: 'false' }), { keyboard: true });
});
check('all 80 levels are unique full Python programs in 10 ordered topics', () => {
  assert.equal(TYPING_LEVELS.length, 80);
  assert.equal(new Set(TYPING_LEVELS.map(level => level.topic)).size, 10);
  for (const [index, level] of TYPING_LEVELS.entries()) {
    assert.equal(level.id, `typing-${String(index + 1).padStart(3, '0')}`);
    assert.ok(level.code && level.title && level.goal && level.hint);
    assert.ok(!level.code.includes('\t'));
    assert.equal(level.code, level.code.trimEnd());
    assert.ok(!level.code.includes('\r'));
  }
});
check('clock starts on committed input and has no deadline', () => {
  const ready = newTypingSession('print(1)');
  assert.equal(applyTypingInput(ready, '', 1000), ready);
  const started = applyTypingInput(ready, 'p', 2000);
  assert.equal(started.startedAt, 2000);
  assert.equal(tickTyping(started, 999999), started);
  assert.equal(typingMetrics(started, 122000).elapsedMs, 120000);
  assert.equal(started.phase, 'running');
});
check('wrong final character does not pass; correcting it preserves error history', () => {
  let session = applyTypingInput(newTypingSession('print(1)', 'last-wrong'), 'print(1x', 1000);
  assert.equal(session.phase, 'running');
  assert.equal(recordTypingCompletion(newTypingProgress(), 'typing-001', session, 'today').levels['typing-001'], undefined);
  session = applyTypingInput(session, 'print(1', 2000);
  session = applyTypingInput(session, 'print(1)', 3000);
  assert.equal(session.phase, 'finished');
  assert.equal(session.reason, 'text');
  assert.equal(typingMetrics(session, 9000).errors, 1);
  assert.equal(typingMetrics(session, 9000).accuracy, 89);
  assert.equal(typingMetrics(session, 9000).elapsedMs, 2000);
});
check('inserting before an erroneous tail never truncates it into a pass', () => {
  let session = applyTypingInput(newTypingSession('print(1)', 'tail'), 'print(1x', 1000);
  session = applyTypingInput(session, 'print(1)x', 2000);
  assert.equal(session.typed, 'print(1)x');
  assert.equal(session.phase, 'running');
  assert.equal(typingMetrics(session, 2000).incorrect, 1);
  session = applyTypingInput(session, 'print(1)', 3000);
  assert.equal(session.phase, 'finished');
  assert.ok(typingMetrics(session, 3000).accuracy < 100);
});
check('equal length wrong interior code and missing indentation cannot pass', () => {
  assert.equal(applyTypingInput(newTypingSession('print(1)'), 'prinx(1)', 100).phase, 'running');
  assert.equal(applyTypingInput(newTypingSession('for x in [1]:\n    print(x)'), 'for x in [1]:\n  print(x)', 100).phase, 'running');
  const target = 'for x in [1]:\n    print(x)';
  assert.equal(complete(target).phase, 'finished');
});
check('empty input never finishes and manual finish cannot complete a level', () => {
  assert.equal(applyTypingInput(newTypingSession(''), '', 100).phase, 'ready');
  const partial = applyTypingInput(newTypingSession('print(1)'), 'print', 100);
  assert.equal(finishTyping(partial, 200, 'text'), partial);
  const stopped = finishTyping(partial, 200, 'manual');
  const progress = newTypingProgress();
  assert.equal(recordTypingCompletion(progress, 'typing-001', stopped, 'today'), progress);
});
check('WPM is current correct characters divided by minutes and five', () => {
  const start = applyTypingInput(newTypingSession('abcdef'), 'abcde', 0);
  const metrics = typingMetrics(start, 60000);
  assert.equal(metrics.cpm, 5); assert.equal(metrics.wpm, 1);
  assert.ok(Number.isFinite(typingMetrics(start, 0).wpm));
});
check('duplicate composition commits and finished changes do not double count', () => {
  let session = applyTypingInput(newTypingSession('имя = 1'), 'имя', 100);
  assert.equal(session.attempts, 3);
  assert.equal(applyTypingInput(session, 'имя', 200), session);
  session = applyTypingInput(session, 'имя = 1', 1000);
  assert.equal(applyTypingInput(session, 'wrong', 2000), session);
  assert.equal(session.attempts, 7);
});
check('CRLF is normalized while spaces and source escape sequences remain literal', () => {
  const target = 'print("\\t")\nprint(1)';
  assert.equal(applyTypingInput(newTypingSession(target), target.replace('\n', '\r\n'), 1).phase, 'finished');
  assert.equal(applyTypingInput(newTypingSession('    x'), '\tx', 1).phase, 'running');
});
check('personal progress is exact only, idempotent and retains unknown records', () => {
  let progress = sanitizeTypingProgress({ selectedId: 'retired-level', levels: { 'retired-level': { completed: true, attempts: 4, completedAt: 'old', best: null } } });
  const session = complete('print(1)', 'unique');
  progress = recordTypingCompletion(progress, 'typing-001', session, 'today');
  assert.equal(progress.levels['retired-level'].attempts, 4);
  assert.equal(progress.levels['typing-001'].attempts, 1);
  assert.equal(recordTypingCompletion(progress, 'typing-001', session, 'tomorrow'), progress);
  assert.equal(progress.levels['typing-001'].best?.accuracy, 100);
});
check('best result prioritizes accuracy then elapsed time, not faster errors', () => {
  let progress = recordTypingCompletion(newTypingProgress(), 'typing-001', complete('print(1)', 'slow', 4000), 'first');
  let wrong = applyTypingInput(newTypingSession('print(1)', 'fast-errors'), 'x', 0);
  wrong = applyTypingInput(wrong, '', 100);
  wrong = applyTypingInput(wrong, 'print(1)', 1500);
  progress = recordTypingCompletion(progress, 'typing-001', wrong, 'second');
  assert.equal(progress.levels['typing-001'].best?.elapsedMs, 4000);
  progress = recordTypingCompletion(progress, 'typing-001', complete('print(1)', 'fast', 2000), 'third');
  assert.equal(progress.levels['typing-001'].best?.elapsedMs, 2000);
  assert.equal(progress.levels['typing-001'].completedAt, 'first');
  assert.equal(progress.levels['typing-001'].attempts, 3);
  assert.equal(recordTypingCompletion(newTypingProgress(), 'one', complete('ab', 'instant', 0), 'today').levels.one.best, null);
});
check('next unfinished wraps, ignores removed IDs and ends when all levels complete', () => {
  const ids = ['a','b','c']; let progress = newTypingProgress();
  assert.equal(nextUnfinishedTypingLevel(ids, progress), 'a');
  progress = recordTypingCompletion(progress, 'b', complete('ab', 'b'), 'now');
  assert.equal(nextUnfinishedTypingLevel(ids, progress, 'a'), 'c');
  assert.equal(nextUnfinishedTypingLevel(ids, progress, 'c'), 'a');
  progress = recordTypingCompletion(progress, 'a', complete('ab', 'a'), 'now');
  progress = recordTypingCompletion(progress, 'c', complete('ab', 'c'), 'now');
  assert.equal(nextUnfinishedTypingLevel(ids, progress), undefined);
});
check('partial drafts restore history and active time, excluding time away', () => {
  let original = applyTypingInput(newTypingSession('print(1)'), 'x', 1000);
  original = applyTypingInput(original, 'p', 2000);
  const restored = restoreTypingDraft('print(1)', typingDraft(original, 3000), 'resumed');
  assert.equal(restored.phase, 'ready'); assert.equal(restored.startedAt, null);
  assert.equal(restored.typed, 'p'); assert.equal(restored.attempts, 2);
  assert.equal(typingMetrics(restored, 2000000).elapsedMs, 2000);
  const active = applyTypingInput(restored, 'pr', 9000000);
  assert.equal(typingMetrics(active, 9001000).elapsedMs, 3000);
  assert.equal(typingMetrics(active, 9001000).errors, 1);
});
check('complete or incompatible cached text never grants completion', () => {
  const completedDraft = typingDraft(complete('print(1)'), 9000);
  assert.equal(restoreTypingDraft('print(1)', completedDraft).typed, '');
  assert.equal(restoreTypingDraft('print(2)', completedDraft).typed, '');
  const malformed = { ...completedDraft, typed: 'p', correctAttempts: -1 };
  assert.equal(restoreTypingDraft('print(1)', malformed).typed, '');
  const extra = applyTypingInput(newTypingSession('print(1)'), 'print(1)x', 1);
  assert.equal(restoreTypingDraft('print(1)', typingDraft(extra, 2)).typed, 'print(1)x');
});
check('malformed progress is ignored without removing unknown valid records', () => {
  const progress = sanitizeTypingProgress({ selectedId: 123, levels: { bad: { completed: false }, old: { completed: true, best: {accuracy:200}, attempts:-1 } } });
  assert.equal(progress.selectedId, ''); assert.equal(progress.levels.bad, undefined);
  assert.equal(progress.levels.old.completed, true); assert.equal(progress.levels.old.best, null);
  assert.equal(Object.keys(sanitizeTypingProgress(null).levels).length, 0);
  const prototype = sanitizeTypingProgress(JSON.parse('{"levels":{"__proto__":{"completed":true}}}'));
  assert.equal(Object.getPrototypeOf(prototype.levels), null);
});
check('physical keyboard hints cover spaces, indentation, Cyrillic and Python punctuation', () => {
  assert.equal(keyHint(' ').code, 'Space'); assert.equal(keyHint('\n').code, 'Enter');
  assert.equal(keyHint('П', 'ru').code, 'KeyG'); assert.equal(keyHint('П', 'ru').shift, true);
  assert.equal(keyHint('(', 'python').code, 'Digit9'); assert.equal(keyHint('"').shift, true);
  assert.equal(keyHint('').code, 'Backspace');
});
console.log(`${checks} typing model checks passed`);
