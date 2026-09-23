import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';

/**
 * A second, trailing cursor ring that grows over interactive elements.
 *
 * Additive only — the native cursor is never hidden, so nothing is lost if
 * this does not render. It stays out of the way entirely on coarse pointers,
 * when the visitor prefers reduced motion, and in low performance mode.
 */
export const GlowingCursor = () => {
  const { performanceSettings } = useAuth();
  const [enabled, setEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isOverTarget, setIsOverTarget] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const dotX = useSpring(mouseX, { stiffness: 1000, damping: 50, mass: 0.2 });
  const dotY = useSpring(mouseY, { stiffness: 1000, damping: 50, mass: 0.2 });
  const ringX = useSpring(mouseX, { stiffness: 320, damping: 28, mass: 0.6 });
  const ringY = useSpring(mouseY, { stiffness: 320, damping: 28, mass: 0.6 });

  // A precise pointer and no reduced-motion preference are both required.
  // Evaluated via media queries rather than touch sniffing so hybrid laptops
  // get the effect while phones and tablets do not.
  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const sync = () => setEnabled(finePointer.matches && !reduceMotion.matches);
    sync();

    finePointer.addEventListener('change', sync);
    reduceMotion.addEventListener('change', sync);
    return () => {
      finePointer.removeEventListener('change', sync);
      reduceMotion.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled || performanceSettings.lowPerfMode) return;

    const handleMove = (event: PointerEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setIsVisible(true);

      const target = event.target as Element | null;
      setIsOverTarget(Boolean(target?.closest('a, button, [role="button"], input, textarea, select')));
    };

    const handleLeave = () => setIsVisible(false);

    window.addEventListener('pointermove', handleMove, { passive: true });
    document.addEventListener('pointerleave', handleLeave);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerleave', handleLeave);
    };
  }, [enabled, performanceSettings.lowPerfMode, mouseX, mouseY]);

  if (!enabled || performanceSettings.lowPerfMode || !isVisible) return null;

  return (
    <div aria-hidden="true">
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 rounded-full border border-emerald-400/50"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: isOverTarget ? 1.6 : 1,
          backgroundColor: isOverTarget ? 'rgba(52,211,153,0.12)' : 'rgba(52,211,153,0)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 26 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[10000] h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.8)]"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
      />
    </div>
  );
};
