/**
 * One easing family and one duration scale for the whole site.
 *
 * Everything the sheet does is either an arrival (EASE, decelerating) or a
 * departure (EASE_IN, accelerating); nothing springs and nothing overshoots, so
 * the linework keeps its drafted feel. The same four values are exposed to CSS
 * as `--ease-*` in `app/global.css`, so a hover can be written in either
 * language without the two drifting apart.
 */

/** Decelerating arrival — the default for anything entering the page. */
export const EASE = [0.16, 1, 0.3, 1] as const;
/** Accelerating departure — for anything leaving. */
export const EASE_IN = [0.4, 0, 1, 1] as const;
/** Symmetric, for sweeps that both start and end on screen. */
export const EASE_DRAW = [0.65, 0, 0.35, 1] as const;

export const DUR = {
  /** Hover and press feedback. */
  fast: 0.16,
  /** Entrances, small reveals, list items. */
  base: 0.32,
  /** Panels and blocks. */
  slow: 0.54,
  /** A rule or a stroke drawing itself end to end. */
  draw: 0.9,
} as const;

/** Step between siblings that enter together. */
export const STAGGER = 0.045;

/** Reveal triggers fire once, a little before the block is fully in view. */
export const VIEWPORT = { once: true, amount: 0.2 } as const;
/** For tall blocks whose top edge matters more than their height. */
export const VIEWPORT_TOP = { once: true, amount: 0.05 } as const;
