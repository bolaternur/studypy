/**
 * Headline numbers about the curriculum, shown on the marketing surfaces.
 *
 * These are duplicated from the dataset on purpose: importing `lessons.ts`
 * into the landing page would pull roughly a megabyte of course content into
 * the very first chunk a visitor downloads.
 *
 * They cannot silently drift — `scripts/validate-lessons.ts` recomputes them
 * from `LESSONS` and fails the build on any mismatch. Run `npm run validate`
 * after editing the curriculum and update the values it reports.
 */
export const CURRICULUM_SUMMARY = {
  lessons: 73,
  challenges: 365,
  tracks: 4,
} as const;
