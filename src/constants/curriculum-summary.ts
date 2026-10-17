import { LESSON_CATALOG } from './lesson-catalog';

/** Derived from lightweight metadata; no lesson text enters the landing chunk. */
export const CURRICULUM_SUMMARY = {
  lessons: LESSON_CATALOG.length,
  challenges: LESSON_CATALOG.reduce((sum, lesson) => sum + lesson.challengeCount, 0),
  tracks: new Set(LESSON_CATALOG.map(lesson => lesson.level)).size,
} as const;
