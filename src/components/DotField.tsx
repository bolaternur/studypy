import { useEffect, useRef } from 'react';

interface DotFieldProps {
  /** Skips the render entirely — used by the in-app low performance mode. */
  disabled?: boolean;
  className?: string;
}

const SPACING = 34;          // px between dots at 1x
const DOT_RADIUS = 1.1;
const POINTER_RADIUS = 190;  // px of influence around the cursor
const MAX_LIFT = 13;         // px a dot can be pushed away from the pointer

/**
 * The ambient backdrop for the hero: a dot matrix that breathes on a slow
 * diagonal wave and parts around the pointer.
 *
 * Canvas 2D rather than WebGL on purpose — this replaced a hosted Spline
 * scene that pulled ~1.5 MB of runtime over the network before the page
 * could settle. The whole effect below is a few hundred lines of arithmetic
 * per frame and needs no third-party runtime at all.
 *
 * It stops itself when off-screen, when the tab is hidden, and when the
 * visitor prefers reduced motion (in which case it paints one static frame
 * so the composition still reads).
 */
export const DotField = ({ disabled = false, className = '' }: DotFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || disabled) return;

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Pointer is tracked in CSS pixels relative to the canvas; -1 means "away".
    const pointer = { x: -1, y: -1 };
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let running = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      if (width === 0 || height === 0) return;

      const t = time / 4200;
      const columns = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;

      for (let column = 0; column < columns; column += 1) {
        for (let row = 0; row < rows; row += 1) {
          const baseX = column * SPACING;
          const baseY = row * SPACING;

          // Slow diagonal wave keeps the field alive without a cursor.
          const wave = Math.sin(t + (baseX + baseY) / 220);
          let x = baseX;
          let y = baseY;
          let intensity = 0.1 + Math.max(0, wave) * 0.16;
          let radius = DOT_RADIUS;

          if (pointer.x >= 0) {
            const dx = baseX - pointer.x;
            const dy = baseY - pointer.y;
            const distance = Math.hypot(dx, dy);

            if (distance < POINTER_RADIUS) {
              // Cosine falloff — no hard edge where the influence ends.
              const falloff = 0.5 + 0.5 * Math.cos((distance / POINTER_RADIUS) * Math.PI);
              const lift = falloff * MAX_LIFT;
              const angle = Math.atan2(dy, dx);
              x += Math.cos(angle) * lift;
              y += Math.sin(angle) * lift;
              intensity += falloff * 0.75;
              radius += falloff * 1.5;
            }
          }

          // Emerald core fading to teal as dots get brighter.
          const hue = 160 + intensity * 14;
          context.fillStyle = `hsla(${hue}, 72%, ${52 + intensity * 20}%, ${intensity})`;
          context.beginPath();
          context.arc(x, y, radius, 0, Math.PI * 2);
          context.fill();
        }
      }
    };

    const loop = (time: number) => {
      if (!running) return;
      draw(time);
      frame = window.requestAnimationFrame(loop);
    };

    const start = () => {
      if (running && frame) return;
      running = true;
      frame = window.requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };

    const handlePointerLeave = () => {
      pointer.x = -1;
      pointer.y = -1;
    };

    resize();

    if (reduceMotion) {
      // One static frame: the texture is part of the layout, the motion is not.
      draw(0);
      const handleResize = () => {
        resize();
        draw(0);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }

    start();

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    observer.observe(canvas);

    const handleVisibility = () => (document.hidden ? stop() : start());

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [disabled]);

  if (disabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
};
