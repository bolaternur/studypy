import type { RequestHandler } from 'express';

/** Browser Python is useful feedback, never proof for money or competitive results. */
export const rejectUnverifiedResult: RequestHandler = (_req, res) => {
  res.status(422).json({
    code: 'TRUSTED_EXECUTION_UNAVAILABLE',
    error: 'Соревновательный результат и награда недоступны: сервер пока не проверяет выполнение Python. Учебная практика работает в браузере.',
  });
};

export function personalProgress(profile: {completedLessons?: unknown}, lessonId: string) {
  const previous = Array.isArray(profile.completedLessons)
    ? profile.completedLessons.filter((id: unknown): id is string => typeof id === 'string') : [];
  return {
    completedLessons: [...new Set([...previous, lessonId])],
    trust: 'self_reported' as const,
    reward: {xp: 0, coins: 0},
  };
}
