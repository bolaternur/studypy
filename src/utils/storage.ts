/**
 * Safe localStorage access.
 *
 * Every accessor here can throw in the real world — Safari private mode, a
 * blocked-cookies profile, a full quota — and a corrupt value must never take
 * a React tree down with it. Reads return the fallback and drop the bad entry;
 * writes fail silently.
 *
 * Keys were prefixed `pyquest_` before the StudyPy rename. `readJson` and
 * `readString` fall back to the legacy key once and rewrite under the new one,
 * so returning users keep their settings and progress.
 */

const LEGACY_PREFIX = 'pyquest_';
const PREFIX = 'studypy_';

const legacyKeyFor = (key: string): string | null => (
  key.startsWith(PREFIX) ? LEGACY_PREFIX + key.slice(PREFIX.length) : null
);

const getRaw = (key: string): string | null => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const setRaw = (key: string, value: string): void => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* quota exceeded or storage disabled — the app works without persistence */
  }
};

const removeRaw = (key: string): void => {
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* nothing to do */
  }
};

/** Reads `key`, migrating a legacy `pyquest_`-prefixed value if one exists. */
const readWithMigration = (key: string): string | null => {
  const current = getRaw(key);
  if (current !== null) return current;

  const legacyKey = legacyKeyFor(key);
  if (!legacyKey) return null;

  const legacy = getRaw(legacyKey);
  if (legacy === null) return null;

  setRaw(key, legacy);
  removeRaw(legacyKey);
  return legacy;
};

export const readString = (key: string, fallback: string | null = null): string | null => (
  readWithMigration(key) ?? fallback
);

export const writeString = (key: string, value: string): void => setRaw(key, value);

/**
 * Reads JSON and validates it before handing it back. A value that fails
 * `isValid` is treated as corrupt and removed, so a bad write can only ever
 * cost the user that one setting.
 */
export const readJson = <T>(
  key: string,
  isValid: (value: unknown) => value is T,
  fallback: T,
): T => {
  const raw = readWithMigration(key);
  if (raw === null) return fallback;

  try {
    const parsed: unknown = JSON.parse(raw);
    if (isValid(parsed)) return parsed;
  } catch {
    /* fall through to cleanup */
  }

  removeRaw(key);
  return fallback;
};

export const writeJson = (key: string, value: unknown): void => {
  try {
    setRaw(key, JSON.stringify(value));
  } catch {
    /* value was not serialisable — skip persistence rather than throw */
  }
};

export const isStringArray = (value: unknown): value is string[] => (
  Array.isArray(value) && value.every((entry) => typeof entry === 'string')
);

export const STORAGE_KEYS = {
  perfSettings: `${PREFIX}perf_settings`,
  muted: `${PREFIX}muted`,
  lessonProgress: `${PREFIX}progress`,
} as const;
