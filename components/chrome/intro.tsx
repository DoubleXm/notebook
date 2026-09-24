'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';
import { EASE } from '@/lib/motion';
import { appName } from '@/lib/shared';

/**
 * The first-load curtain, in seconds.
 *
 * Two opaque halves sit over the sheet with a single accent seam between them.
 * The seam label draws itself, then the halves translate off-screen along
 * their own axis, uncovering a page that has already begun to arrive. Nothing
 * fades in from a blur and nothing scales: the sheet is simply uncovered.
 */
const HOLD = 0.48;
const OPEN = 0.62;
/**
 * When the page underneath starts arriving — during the hold, so the reveal
 * lands mid-motion instead of after it.
 */
const SYNC = 0.4;

const STORAGE_KEY = 'stacknote:intro';

/**
 * Delay to add to a page's first entrance, so the hero arrives as the curtain
 * parts rather than behind it. Read once, at mount: the value only reaches
 * motion's `transition`, never the markup, so the server render and the
 * hydration pass still agree.
 */
export function useIntroDelay(): number {
  const [delay] = useState(() =>
    typeof document !== 'undefined' &&
    document.documentElement.dataset.intro === 'play'
      ? SYNC
      : 0,
  );

  return delay;
}

export function useIntroComplete(): boolean {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const update = () => setComplete(document.documentElement.dataset.intro !== 'play');
    window.addEventListener('stacknote:intro-complete', update);
    update();
    return () => window.removeEventListener('stacknote:intro-complete', update);
  }, []);

  return complete;
}

type Phase = 'pending' | 'playing' | 'off';

export function Intro() {
  const reduceMotion = useReducedMotion();
  /**
   * `pending` covers both the server render and the hydration pass, so the
   * curtain is in the HTML from the first byte and never flashes in late.
   * Whether it actually plays is decided by `html[data-intro]`, set by the
   * entry script in `app/layout.tsx` before the body is parsed.
   */
  const [phase, setPhase] = useState<Phase>('pending');
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    setPhase(
      document.documentElement.dataset.intro === 'play' ? 'playing' : 'off',
    );
  }, []);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, 'done');
    } catch {
      // Private mode or storage disabled — the curtain simply plays again.
    }
    document.documentElement.dataset.intro = 'done';
    window.dispatchEvent(new Event('stacknote:intro-complete'));
    setPhase('off');
  }, []);

  // A pointer or key press cuts the hold short rather than cancelling it: the
  // curtain still opens the way it was drawn, just immediately.
  useEffect(() => {
    if (phase !== 'playing') return;

    if (reduceMotion) {
      finish();
      return;
    }

    const timer = window.setTimeout(
      finish,
      (skipped ? OPEN : HOLD + OPEN) * 1000 + 90,
    );
    const skip = () => setSkipped(true);
    window.addEventListener('pointerdown', skip);
    window.addEventListener('keydown', skip);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('pointerdown', skip);
      window.removeEventListener('keydown', skip);
    };
  }, [phase, skipped, reduceMotion, finish]);

  // Hold the document still while the curtain is down.
  useEffect(() => {
    if (phase !== 'playing') return;

    const { documentElement } = document;
    const previous = documentElement.style.overflow;
    documentElement.style.overflow = 'hidden';

    return () => {
      documentElement.style.overflow = previous;
    };
  }, [phase]);

  if (phase === 'off') return null;

  const hold = skipped ? 0 : HOLD;

  return (
    <div
      data-intro-overlay
      aria-hidden="true"
      className="fixed inset-0 z-[140] overflow-hidden"
    >
      <Pane from="top" delay={hold} />
      <Pane from="bottom" delay={hold} />

      <motion.div
        key={skipped ? 'cut' : 'full'}
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
        initial={{ y: 0, opacity: 1 }}
        animate={phase === 'playing' ? { y: -14, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.28, delay: hold + 0.06, ease: EASE }}
      >
        <span className="text-[26px] leading-none font-semibold tracking-[-0.04em]">
          {appName}
        </span>

        <motion.span
          className="my-4 block h-px w-[220px] origin-left bg-fd-primary"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: phase === 'playing' ? 1 : 0 }}
          transition={{ duration: 0.44, ease: EASE }}
        />

        <span className="text-[10.5px] tracking-[0.24em] text-fd-muted-foreground uppercase">
          全栈开发笔记
        </span>
      </motion.div>
    </div>
  );
}

/**
 * One half of the curtain. It leaves along the axis it was drawn on, and the
 * hairline it carries is the accent seam that splits when the sheet opens.
 */
function Pane({ from, delay }: { from: 'top' | 'bottom'; delay: number }) {
  const isTop = from === 'top';

  return (
    <motion.div
      className={`absolute inset-x-0 h-[calc(50%+0.5px)] bg-fd-background ${
        isTop
          ? 'top-0 border-b border-fd-primary'
          : 'bottom-0 border-t border-fd-primary'
      }`}
      initial={{ y: 0 }}
      animate={{ y: isTop ? '-100%' : '100%' }}
      transition={{ duration: OPEN, delay, ease: EASE }}
    />
  );
}
