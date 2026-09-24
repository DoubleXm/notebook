'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
import { EASE } from '@/lib/motion';
import { useIntroDelay } from './intro';

/**
 * The page transition.
 *
 * The caller gives this a `key` that changes per route, so a navigation — even
 * between two pages of the same dynamic route — remounts it and replays the
 * entrance. Nothing about the navigation itself is intercepted: links keep
 * their normal browser behaviour and no render is deferred, which is what
 * keeps the transition from being felt as a delay.
 *
 * The entrance is a short translate on the content's own axis with the
 * opacity catching up, plus one accent line that sweeps the viewport to draw
 * the new page in.
 */
export function PageEnter({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const introDelay = useIntroDelay();

  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <>
      <motion.span
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[130] h-px origin-left bg-fd-primary"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: [1, 1, 0] }}
        transition={{
          duration: 0.7,
          delay: introDelay * 0.5,
          ease: EASE,
          opacity: { duration: 0.7, delay: introDelay * 0.5, ease: 'linear' },
        }}
      />
      <motion.div
        className={className}
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.46, delay: introDelay, ease: EASE }}
      >
        {children}
      </motion.div>
    </>
  );
}
