import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';

type LineCardsProps = {
  children?: ReactNode;
  className?: string;
};

type LineCardProps = {
  title?: ReactNode;
  description?: ReactNode;
  href?: string;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function LineCards({ children, className = '' }: LineCardsProps) {
  return (
    <div
      data-line-cards
      className={`not-prose @container grid grid-cols-2 @max-lg:grid-cols-1 ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * The in-article card: a cell of one shared ruled block rather than a box of
 * its own. The cell carries only the rules it shares — one above, one to the
 * inline start — so a run of cards reads as a single table and an odd last
 * cell is never left as an empty grey hole the way a `gap-px` grid leaves one.
 *
 * The top-left corner draws itself on hover, and the title steps along the
 * reading axis rather than the whole cell lifting.
 */
export function LineCard({
  title,
  description,
  href,
  icon,
  children,
  className = '',
}: LineCardProps) {
  const content = (
    <>
      {/* Hover linework: one segment along the top-left corner, drawn from its
          outer end, so the card reads the same way the index rows do. It sits
          on the shared rule rather than inside the padding. */}
      <span
        data-line-card-mark
        aria-hidden="true"
        className="pointer-events-none absolute top-[-1px] left-[-1px] h-px w-12 origin-left scale-x-0 bg-fd-primary transition-transform duration-[260ms] ease-out-expo group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />

      {icon ? (
        <div className="mb-3.5 w-fit border border-dashed border-fd-border p-1.5 text-fd-muted-foreground [&_svg]:size-4">
          {icon}
        </div>
      ) : null}

      {title ? (
        <h3 className="flex items-baseline gap-2 text-[13px] leading-5 font-medium text-fd-card-foreground transition-transform duration-200 ease-out-expo group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5">
          {title}
          {href ? (
            <ArrowUpRight
              className="size-3 shrink-0 text-fd-muted-foreground transition-[color,transform] duration-200 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fd-primary"
              aria-hidden="true"
            />
          ) : null}
        </h3>
      ) : null}

      {description ? (
        <p className="mt-1.5 text-[12px] leading-6 text-fd-muted-foreground">
          {description}
        </p>
      ) : null}

      {children ? (
        <div className="prose-no-margin mt-2 text-[12px] leading-6 text-fd-muted-foreground empty:hidden">
          {children}
        </div>
      ) : null}
    </>
  );

  const classes = `group relative block h-full bg-fd-background p-4 text-fd-card-foreground transition-colors duration-200 ease-out-expo hover:bg-[color-mix(in_srgb,var(--color-fd-primary)_4%,var(--color-fd-background))] focus-visible:bg-[color-mix(in_srgb,var(--color-fd-primary)_4%,var(--color-fd-background))] focus-visible:outline-1 focus-visible:outline-offset-[-2px] focus-visible:outline-fd-ring ${className}`;

  if (href) {
    return (
      <Link data-line-card href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <div data-line-card className={classes}>
      {content}
    </div>
  );
}
