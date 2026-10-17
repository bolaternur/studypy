const prefix = 'studypy:draft:v2:';

export function readDraft(key: string | undefined, initialCode: string): string {
  if (!key) return initialCode;
  try { return localStorage.getItem(prefix + key) ?? initialCode; }
  catch { return initialCode; }
}

/** Synchronous write keeps the last keystroke even when immediately navigating away. */
export function writeDraft(key: string | undefined, code: string): boolean {
  if (!key) return true;
  try { localStorage.setItem(prefix + key, code); return true; }
  catch { return false; }
}
