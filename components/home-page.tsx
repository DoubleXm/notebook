'use client';

import Link from 'next/link';
import { ArrowRight, ArrowUpRight, BookOpen } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef, type PointerEvent, type ReactNode } from 'react';
import { DUR, EASE, VIEWPORT } from '@/lib/motion';
import { frame, label } from '@/lib/ui';
import { useIntroComplete, useIntroDelay } from './chrome/intro';
import { Band, Reveal, Rule } from './sheet';

const MotionLink = motion.create(Link);

export type Entry = {
  id: string;
  title: string;
  href: string;
  icon?: ReactNode;
  description?: ReactNode;
};

export function HomePage({
  sections,
  deepDives,
}: {
  sections: Entry[];
  deepDives: Entry[];
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const introDelay = useIntroDelay();
  const introComplete = useIntroComplete();

  return (
    <div data-home-frame className="mx-auto w-full max-w-[1240px]">
      <Hero reduceMotion={reduceMotion} introDelay={introDelay} />

      <div className={`${frame} pb-20`}>
        <Band
          title="技术目录"
          description="选择一个技术方向，从对应笔记开始阅读。"
        >
          <Ledger sections={sections} reduceMotion={reduceMotion} introComplete={introComplete} />
        </Band>
      </div>

      {deepDives.length > 0 ? (
        <div className={`${frame} pb-20`}>
          <Band
            title="深入阅读"
            description="按具体主题阅读，直接找到相关知识点。"
          >
            <Branches entries={deepDives} reduceMotion={reduceMotion} introComplete={introComplete} />
          </Band>
        </div>
      ) : null}

      <Closing />
    </div>
  );
}

function Hero({
  reduceMotion,
  introDelay,
}: {
  reduceMotion: boolean;
  introDelay: number;
}) {
  return (
    <section className={`${frame} relative`}>
      <div data-home-grid aria-hidden="true" />

      <div className="relative grid gap-14 py-14 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center lg:gap-20 lg:py-20">
        <div className="min-w-0">
          <motion.div
            className="flex items-center gap-3"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: DUR.slow, delay: introDelay, ease: EASE }}
          >
            <span
              className="block size-1.5 bg-fd-primary"
              aria-hidden="true"
            />
            <span className={label}>知识库 / KNOWLEDGE BASE</span>
          </motion.div>

          <h1 className="mt-7 text-[clamp(3.25rem,8vw,6rem)] leading-[0.94] font-semibold tracking-[-0.05em]">
            <Marked delay={introDelay + 0.06}>栈</Marked>
            <Marked delay={introDelay + 0.13}>记</Marked>
          </h1>

          <span aria-hidden="true" className="relative mt-5 block h-px w-full bg-fd-border">
            <motion.span
              className="absolute inset-y-0 left-0 w-full origin-left bg-fd-primary"
              initial={reduceMotion ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.25, delay: introDelay + 0.7, ease: EASE }}
            />
          </span>

          <motion.p
            className="mt-6 max-w-[38rem] text-[13px] leading-7 text-fd-muted-foreground"
            initial={reduceMotion ? false : { y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: DUR.slow, delay: introDelay + 0.24, ease: EASE }}
          >
            这里收录前端、后端、数据库、运维与 AI 等方向的开发笔记。按方向浏览，从具体主题开始阅读。
          </motion.p>

          <motion.div
            className="mt-11 flex flex-wrap gap-3"
            initial={reduceMotion ? false : { y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: DUR.slow, delay: introDelay + 0.34, ease: EASE }}
          >
            <MotionLink
              href="/docs"
              className="group inline-flex h-11 items-center gap-3 border border-fd-primary px-5 text-[12.5px] text-fd-primary transition-colors duration-200 ease-out-expo hover:bg-[color-mix(in_srgb,var(--color-fd-primary)_7%,transparent)]"
              whileTap={reduceMotion ? undefined : { x: 1 }}
            >
              浏览全部笔记
              <ArrowRight
                className="size-3.5 transition-transform duration-200 ease-out-expo group-hover:translate-x-1"
                aria-hidden="true"
              />
            </MotionLink>
            <MotionLink
              href="/docs/ai/langchain/model-and-prompt"
              className="group inline-flex h-11 items-center gap-3 border border-dashed border-fd-border px-5 text-[12.5px] transition-[color,border-color] duration-200 ease-out-expo hover:border-fd-primary hover:text-fd-primary"
              whileTap={reduceMotion ? undefined : { x: 1 }}
            >
              查看 AI 与 Agent 笔记
              <ArrowUpRight
                className="size-3.5 transition-transform duration-200 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </MotionLink>
          </motion.div>
        </div>

        <motion.div
          data-hero-mark
          className="relative flex items-center justify-center"
          initial={reduceMotion ? false : { y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: DUR.slow, delay: introDelay + 0.16, ease: EASE }}
        >
          <svg
            viewBox="0 0 320 320"
            className="h-auto w-full max-w-[320px]"
            role="img"
            aria-label="栈记标志：从笔记条目延伸的交叉索引与定位刻度"
          >
            <motion.path
              data-mark-outline
              d="M 40 58 H 208 L 250 100 V 262 H 40 Z"
              fill="var(--color-fd-background)"
              stroke="var(--color-fd-primary)"
              strokeWidth="2"
              initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: DUR.draw, delay: introDelay + 0.35, ease: EASE }}
            />
            <motion.path
              d="M 208 58 V 100 H 250 M 24 82 H 58 M 24 238 H 58 M 232 278 H 266 M 82 42 V 76 M 208 244 V 278"
              fill="none"
              stroke="var(--color-fd-primary)"
              strokeWidth="1.5"
              initial={reduceMotion ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: DUR.draw, delay: introDelay + 0.58, ease: EASE }}
            />
            {[
              'M 78 110 H 192',
              'M 78 132 H 158',
              'M 78 154 H 182',
              'M 78 176 H 138',
            ].map((d, index) => (
              <motion.path
                key={d}
                d={d}
                fill="none"
                stroke="var(--color-fd-border)"
                strokeWidth="2"
                initial={reduceMotion ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.46, delay: introDelay + 0.75 + index * 0.14, ease: EASE }}
              />
            ))}
            <motion.path
              d="M 78 218 H 122 L 166 186 L 208 218 M 122 218 H 208 M 166 186 V 218"
              fill="none"
              stroke="var(--color-fd-primary)"
              strokeWidth="2"
              strokeLinejoin="miter"
              initial={reduceMotion ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: DUR.draw, delay: introDelay + 1.35, ease: EASE }}
            />
            <motion.path
              d="M 273 116 V 228 M 266 116 H 280 M 266 228 H 280"
              fill="none"
              stroke="var(--color-fd-muted-foreground)"
              strokeWidth="1"
              initial={reduceMotion ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: DUR.draw, delay: introDelay + 1.55, ease: EASE }}
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}

/** One character of the wordmark, rising onto its baseline. */
function Marked({ children, delay }: { children: ReactNode; delay: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      className="inline-block"
      initial={reduceMotion ? false : { y: '0.3em', opacity: 0 }}
      animate={{ y: '0em', opacity: 1 }}
      transition={{ duration: 0.95, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  );
}

function moveSelection(event: PointerEvent<HTMLLIElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--scan-x', `${Math.min(Math.max(event.clientX - rect.left - 24, 0), Math.max(rect.width - 48, 0))}px`);
}

function Ledger({
  sections,
  reduceMotion,
  introComplete,
}: {
  sections: Entry[];
  reduceMotion: boolean;
  introComplete: boolean;
}) {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, VIEWPORT);
  const blanks = (4 - (sections.length % 4)) % 4;

  return (
    <motion.ol
      ref={ref}
      data-ledger
      className="mt-9 grid border-t border-fd-border sm:grid-cols-2 lg:grid-cols-4"
      initial={reduceMotion ? false : 'hidden'}
      animate={introComplete && inView ? 'show' : 'hidden'}
      transition={{ staggerChildren: 0.05 }}
      variants={{ hidden: {}, show: {} }}
    >
      {sections.map((section) => (
        <motion.li
          key={section.id}
          data-ledger-item
          className="group relative border-b border-fd-border sm:border-e"
          onPointerMove={moveSelection}
          variants={
            reduceMotion
              ? undefined
              : { hidden: { y: 16, opacity: 0 }, show: { y: 0, opacity: 1 } }
          }
          transition={{ duration: 0.5, ease: EASE }}
        >
          <span data-ledger-selection aria-hidden="true" />
          <Link href={section.href} data-ledger-row title={typeof section.description === 'string' ? section.description : section.title}>
            <span data-cell="heading">
              <span data-cell="icon" aria-hidden="true">{section.icon ?? <BookOpen />}</span>
              <span data-cell="title">{section.title}</span>
            </span>
            <span data-cell="description">{section.description ?? section.title}</span>
          </Link>
        </motion.li>
      ))}

      {blanks > 0
        ? Array.from({ length: blanks }, (_, i) => (
            <li
              key={`blank-${i}`}
              data-ledger-blank
              aria-hidden="true"
              className="border-b border-fd-border sm:border-e"
            />
          ))
        : null}
    </motion.ol>
  );
}

function Branches({
  entries,
  reduceMotion,
  introComplete,
}: {
  entries: Entry[];
  reduceMotion: boolean;
  introComplete: boolean;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, VIEWPORT);

  return (
    <motion.ul
      ref={ref}
      data-branches
      className="mt-9 lg:grid lg:grid-cols-2 lg:gap-x-12"
      initial={reduceMotion ? false : 'hidden'}
      animate={introComplete && inView ? 'show' : 'hidden'}
      transition={{ staggerChildren: 0.035 }}
      variants={{ hidden: {}, show: {} }}
    >
      {entries.map((entry) => (
        <motion.li
          key={entry.id}
          data-branch
          className="group relative border-b border-fd-border"
          variants={
            reduceMotion
              ? undefined
              : { hidden: { y: 10, opacity: 0 }, show: { y: 0, opacity: 1 } }
          }
          transition={{ duration: DUR.base, ease: EASE }}
        >
          <span data-branch-mark aria-hidden="true" />

          <Link href={entry.href} data-branch-link>
            <span data-branch-title>{entry.title}</span>
            <ArrowUpRight
              data-branch-arrow
              className="size-4 text-fd-muted-foreground"
              aria-hidden="true"
            />
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  );
}

function Closing() {
  const reduceMotion = useReducedMotion();

  return (
    <div className={frame}>
      <Rule />
      <Reveal className="flex flex-col gap-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-[17px] font-medium tracking-[-0.02em]">
            在文档中搜索
          </h2>
          <p className="mt-2.5 text-[12.5px] leading-6 text-fd-muted-foreground">
            已有具体问题？进入文档后搜索主题，或按侧边栏继续浏览。
          </p>
        </div>
        <MotionLink
          href="/docs"
          className="group inline-flex h-11 shrink-0 items-center gap-3 border border-dashed border-fd-primary px-5 text-[12.5px] text-fd-primary transition-colors duration-200 ease-out-expo hover:bg-[color-mix(in_srgb,var(--color-fd-primary)_7%,transparent)]"
          whileTap={reduceMotion ? undefined : { x: 1 }}
        >
          进入文档
          <ArrowUpRight
            className="size-3.5 transition-transform duration-200 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </MotionLink>
      </Reveal>
    </div>
  );
}
