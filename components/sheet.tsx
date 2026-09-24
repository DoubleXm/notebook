'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
import { DUR, EASE, VIEWPORT } from '@/lib/motion';

/**
 * A hairline that draws itself from its left end once it is in view.
 *
 * This is the site's one structural gesture: every band on every page opens
 * with one of these instead of a static border, so the sheet reads as drawn
 * rather than printed.
 */
export function Rule({
  className = '',
  delay = 0,
  weight = 'thin',
}: {
  className?: string;
  delay?: number;
  weight?: 'thin' | 'accent';
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none block h-px origin-left ${className}`}
      style={{
        background:
          weight === 'accent'
            ? 'var(--color-fd-primary)'
            : 'var(--color-fd-border)',
        height: '1px',
      }}
      initial={reduceMotion ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.7 }}
      transition={{ duration: DUR.draw, delay, ease: EASE }}
    />
  );
}

/** A short translate on the block's own axis, once, when it comes into view. */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { y: 14, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: DUR.slow, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Band({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="relative" aria-label={title}>
      <div>
        <h2 className="text-[22px] leading-none font-semibold tracking-[-0.035em]">
          {title}
        </h2>
        {description ? (
          <p className="mt-3.5 max-w-[52rem] text-[12.5px] leading-6 text-fd-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
