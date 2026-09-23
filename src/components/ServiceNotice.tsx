import { useEffect, useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface HealthResponse {
  status: 'ok' | 'degraded';
  capabilities?: {
    rewards?: boolean;
    mentorAi?: boolean;
    realtime?: boolean;
  };
}

/**
 * Says once, plainly, when part of the backend is not configured.
 *
 * Around thirty endpoints answer 503 without a Firebase Admin credential —
 * completing a lesson, buying an item, feeding the pet, joining a guild. From
 * the browser that reads as "buttons randomly do nothing". One honest notice
 * beats thirty silent failures.
 *
 * Nothing renders when everything is wired, which is the normal case in a
 * correctly deployed instance.
 */
export const ServiceNotice = () => {
  const [missing, setMissing] = useState<string[]>([]);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const check = async () => {
      try {
        const response = await fetch('/api/health', { signal: controller.signal });
        if (!response.ok) return;

        const health = (await response.json()) as HealthResponse;
        if (health.status !== 'degraded') return;

        const gaps: string[] = [];
        // A missing Gemini key is deliberately not listed: the mentor still
        // answers from its local knowledge base, so nothing is broken.
        if (health.capabilities?.rewards === false) {
          gaps.push(
            'Начисление опыта, монет и предметов сейчас недоступно — на сервере не настроен ' +
            'сервисный аккаунт Firebase. Уроки, задачи и песочница работают как обычно.',
          );
        }
        setMissing(gaps);
      } catch {
        // A failed health check is not itself worth interrupting anyone over.
      }
    };

    void check();
    return () => controller.abort();
  }, []);

  if (dismissed || missing.length === 0) return null;

  return (
    <div
      role="status"
      className="fixed inset-x-4 bottom-4 z-[120] mx-auto max-w-2xl rounded-2xl border border-amber-400/30 bg-amber-950/80 p-4 backdrop-blur-md md:inset-x-auto md:left-1/2 md:-translate-x-1/2"
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
        <div className="flex-grow space-y-1">
          {missing.map((message) => (
            <p key={message} className="text-sm leading-relaxed text-amber-100/90">
              {message}
            </p>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Скрыть уведомление"
          className="shrink-0 rounded-lg p-1 text-amber-200/60 transition-colors hover:bg-white/10 hover:text-amber-100"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
