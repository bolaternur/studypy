/**
 * Content lint for the StudyPy curriculum.
 * Fails the build when the lesson dataset loses structural integrity:
 * duplicate ids break routing and React keys, missing tests break grading.
 */
import { LESSONS } from '../src/constants/lessons';
import { CURRICULUM_SUMMARY } from '../src/constants/curriculum-summary';

const errors: string[] = [];
const warnings: string[] = [];

const ids = LESSONS.map((lesson) => lesson.id);
const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
if (duplicateIds.length > 0) {
  errors.push(`Duplicate lesson ids: ${duplicateIds.join(', ')}`);
}

let challengeCount = 0;
let challengesWithoutTests = 0;

for (const lesson of LESSONS) {
  if (!lesson.title?.trim()) errors.push(`Lesson "${lesson.id}" has no title`);
  if (!lesson.description?.trim()) errors.push(`Lesson "${lesson.id}" has no description`);

  const sectionIds = (lesson.sections ?? []).map((section) => section.id);
  const duplicateSections = [...new Set(sectionIds.filter((id, i) => sectionIds.indexOf(id) !== i))];
  if (duplicateSections.length > 0) {
    errors.push(`Lesson "${lesson.id}" has duplicate section ids: ${duplicateSections.join(', ')}`);
  }

  const challenges = lesson.challenges ?? (lesson.challenge ? [lesson.challenge] : []);
  challengeCount += challenges.length;
  for (const [index, challenge] of challenges.entries()) {
    if (!challenge.testCases || challenge.testCases.length === 0) {
      challengesWithoutTests += 1;
      errors.push(`Lesson "${lesson.id}" challenge #${index + 1} has no test cases`);
    }
    if (!challenge.initialCode?.trim()) {
      warnings.push(`Lesson "${lesson.id}" challenge #${index + 1} has no starter code`);
    }
  }

  const quiz = lesson.quiz;
  if (quiz) {
    if (!Array.isArray(quiz.options) || quiz.options.length < 2) {
      errors.push(`Lesson "${lesson.id}" quiz needs at least two options`);
    } else if (quiz.answer < 0 || quiz.answer >= quiz.options.length) {
      errors.push(`Lesson "${lesson.id}" quiz answer points at a missing option`);
    }
  }
}

// The landing page quotes these numbers without importing the dataset.
// Keep the claim and the data in lockstep.
if (CURRICULUM_SUMMARY.lessons !== LESSONS.length) {
  errors.push(
    `CURRICULUM_SUMMARY.lessons says ${CURRICULUM_SUMMARY.lessons} but the dataset has ${LESSONS.length}`,
  );
}
if (CURRICULUM_SUMMARY.challenges !== challengeCount) {
  errors.push(
    `CURRICULUM_SUMMARY.challenges says ${CURRICULUM_SUMMARY.challenges} but the dataset has ${challengeCount}`,
  );
}

console.log(`lessons: ${LESSONS.length} (${new Set(ids).size} unique ids)`);
console.log(`challenges: ${challengeCount} (${challengesWithoutTests} without tests)`);

for (const warning of warnings.slice(0, 20)) console.warn(`warn  ${warning}`);
if (warnings.length > 20) console.warn(`warn  ...and ${warnings.length - 20} more warnings`);

if (errors.length > 0) {
  for (const error of errors.slice(0, 40)) console.error(`error ${error}`);
  if (errors.length > 40) console.error(`error ...and ${errors.length - 40} more errors`);
  process.exit(1);
}

console.log('curriculum OK');
