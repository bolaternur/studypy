import { useEffect, useRef, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { acquireBodyScrollLock } from '../utils/scrollLock';

export function useDialogFocus(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef(close);
  closeRef.current = close;
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const panel = ref.current;
    const releaseScroll = acquireBodyScrollLock();
    panel?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeRef.current();
      if (event.key !== 'Tab' || !panel) return;
      const controls = [...panel.querySelectorAll<HTMLElement>('button:not(:disabled),a[href],input,textarea,select,[tabindex="0"]')].filter(el => el.getClientRects().length);
      if (!controls.length) { event.preventDefault(); return; }
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || document.activeElement === panel)) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      releaseScroll();
      document.removeEventListener('keydown', onKey);
      if (previous?.isConnected) previous.focus();
    };
  }, [open]);
  return ref;
}

export function Dialog({ title, close, children, id }: { title: string; close: () => void; children: ReactNode; id?: string }) {
  const ref = useDialogFocus(true, close);
  const reduced = useReducedMotion();
  return <motion.div className="dialog-backdrop"
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    transition={{ duration: reduced ? .08 : .16 }}
    onClick={event => { if (event.target === event.currentTarget) close(); }}>
    <motion.div ref={ref} id={id} role="dialog" aria-modal="true" aria-label={title} tabIndex={-1} className="dialog-panel"
      initial={{ opacity: 0, scale: reduced ? 1 : .975, y: reduced ? 0 : 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: reduced ? 1 : .99, y: reduced ? 0 : 4 }}
      transition={{ duration: reduced ? .08 : .22, ease: [.16, 1, .3, 1] }}>
      <div className="flex items-center justify-between gap-4 mb-5"><h2 className="text-2xl font-semibold">{title}</h2><button className="icon-button" onClick={close} aria-label="Закрыть диалог">×</button></div>
      {children}
    </motion.div>
  </motion.div>;
}
