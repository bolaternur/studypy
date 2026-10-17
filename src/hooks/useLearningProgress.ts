import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LESSON_CATALOG, normalizeLessonProgress } from '../constants/lesson-catalog';
import { isStringArray, readJson, readString, STORAGE_KEYS, writeJson, writeString } from '../utils/storage';

export function useLearningProgress() {
  const { currentUser, userProfile } = useAuth();
  const key = currentUser ? `studypy_progress_${currentUser.uid}` : STORAGE_KEYS.lessonProgress;
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    const update = () => setRevision(value => value + 1);
    window.addEventListener('studypy-progress', update);
    window.addEventListener('storage', update);
    return () => { window.removeEventListener('studypy-progress', update); window.removeEventListener('storage', update); };
  }, []);
  const completed = useMemo(() => normalizeLessonProgress([
    ...readJson(key, isStringArray, []), ...(userProfile?.completedLessons || []),
  ]), [key, userProfile?.completedLessons, revision]);
  const remember = useCallback((lessonId: string) => {
    const id = normalizeLessonProgress([lessonId])[0];
    if (id) writeString(`${key}_last`, id);
  }, [key]);
  const completeLocal = useCallback((lessonId: string) => {
    const id = normalizeLessonProgress([lessonId])[0];
    if (!id) return false;
    const saved = writeJson(key, [...new Set([...readJson(key, isStringArray, []), id])]);
    window.dispatchEvent(new Event('studypy-progress'));
    return saved;
  }, [key]);
  const last = normalizeLessonProgress([readString(`${key}_last`) || ''])[0];
  const next = LESSON_CATALOG.find(lesson => !completed.includes(lesson.id));
  const resume = last && !completed.includes(last) ? LESSON_CATALOG.find(lesson => lesson.id === last) : next;
  return { completed, resume, next, hasVisited: Boolean(last), remember, completeLocal, accountKey: currentUser?.uid || 'guest' };
}
