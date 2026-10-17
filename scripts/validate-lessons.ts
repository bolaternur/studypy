import { LESSON_CATALOG, LESSON_ALIASES, normalizeLessonProgress } from '../src/constants/lesson-catalog';
import { loadLesson } from '../src/constants/lessons';
import { CURRICULUM_SUMMARY } from '../src/constants/curriculum-summary';

const errors: string[] = [];
const ids = LESSON_CATALOG.map(lesson => lesson.id);
if (new Set(ids).size !== ids.length) errors.push('Lesson IDs must be unique');
let tasks = 0;
let cases = 0;
const sectionsSeen = new Set<string>();
for (const meta of LESSON_CATALOG) {
  const lesson = await loadLesson(meta.id);
  if (!lesson) { errors.push(`Missing content: ${meta.id}`); continue; }
  const challenges = lesson.challenges ?? [];
  if (challenges.length !== meta.challengeCount) errors.push(`${meta.id}: wrong challengeCount`);
  if (!lesson.sources?.length || lesson.sources.some(url => !url.startsWith('https://'))) errors.push(`${meta.id}: primary sources required`);
  if (!lesson.content.trim() || !lesson.description.trim()) errors.push(`${meta.id}: learning outcome required`);
  if (!lesson.sections?.some(section => section.code && section.expectedOutput !== undefined)) errors.push(`${meta.id}: executable example and expected output required`);
  for (const section of lesson.sections ?? []) {
    if (sectionsSeen.has(section.id)) errors.push(`Duplicate section ID: ${section.id}`);
    sectionsSeen.add(section.id);
    if (!section.content.length || section.content.some(text => !text.trim())) errors.push(`${meta.id}: empty paragraph`);
  }
  const challengeIds = new Set<string>();
  for (const challenge of challenges) {
    const label = `${meta.id}/${challenge.id ?? challenge.question}`;
    tasks++;
    if (!challenge.id || challengeIds.has(challenge.id)) errors.push(`${label}: stable unique task ID required`);
    challengeIds.add(challenge.id ?? '');
    if (!challenge.question.trim() || !challenge.description.trim() || !challenge.initialCode.trim() || !challenge.code?.trim() || !challenge.hint?.trim()) errors.push(`${label}: missing question, condition, starter, reference or hint`);
    if (!challenge.testCases.length) errors.push(`${label}: no tests`);
    for (const test of challenge.testCases) {
      cases++;
      for (const legacy of ['input', 'inputValues', 'assertCode', 'isHidden']) {
        if (legacy in test) errors.push(`${label}: removed test field ${legacy}`);
      }
      const hasValue = Object.hasOwn(test, 'expectedValue');
      if (hasValue !== Boolean(test.expression)) errors.push(`${label}: expression and expectedValue must be paired`);
      if (test.expectedOutput === undefined && !hasValue) errors.push(`${label}: no observable assertion`);
      if (test.stdin?.some(line => typeof line !== 'string')) errors.push(`${label}: stdin must contain strings`);
      if (test.setup && /\bprint\s*\(/.test(test.setup)) errors.push(`${label}: test setup must not print the answer`);
      if (test.expression && /^\s*(?:print|exec)\s*\(/.test(test.expression)) errors.push(`${label}: expression must inspect a result, not execute or print a solution`);
    }
  }
}
for (const [oldId, id] of Object.entries(LESSON_ALIASES)) {
  if (ids.includes(oldId) || !ids.includes(id)) errors.push(`Invalid alias: ${oldId} -> ${id}`);
  if ((await loadLesson(oldId))?.id !== id) errors.push(`Alias does not load: ${oldId}`);
  if (normalizeLessonProgress([oldId,id,oldId]).join() !== id) errors.push(`Progress alias does not deduplicate: ${oldId}`);
}
const requiredStart = ['intro','variables','type-conversion','math','input','booleans','if-else','loops','lists'];
if (ids.slice(0, requiredStart.length).join() !== requiredStart.join()) errors.push('Fundamentals must follow prerequisite order');
if (CURRICULUM_SUMMARY.lessons !== ids.length || CURRICULUM_SUMMARY.challenges !== tasks) errors.push('Summary does not match curriculum');
console.log(`${ids.length} lessons; ${tasks} tasks; ${cases} meaningful cases; ${Object.keys(LESSON_ALIASES).length} legacy aliases`);
if (errors.length) { errors.forEach(error => console.error(`error ${error}`)); process.exitCode = 1; }
else console.log('Content structure OK. Run test:content to execute examples, references and negative regressions.');
