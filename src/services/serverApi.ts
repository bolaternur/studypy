import { auth } from '../firebase';

const API_BASE = '/api';

export const postAuthenticated = async <T>(path: string, body: unknown = {}): Promise<T> => {
  const user = auth.currentUser;
  if (!user) throw new Error('Authentication is required');

  const token = await user.getIdToken();
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    const payload: unknown = await response.json().catch(() => null);
    const message = response.status === 503 ? 'Действие сейчас недоступно. Попробуй позже; твои данные на устройстве сохранены.' : typeof payload === 'object' && payload !== null && 'error' in payload
      ? String(payload.error)
      : `Backend request failed: ${response.status}`;
    throw new Error(message);
  }

  return response.json() as Promise<T>;
};
