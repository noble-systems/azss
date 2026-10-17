import type { ReactNode } from "react";

/**
 * Every section is black with a thin line on top, except the quote band,
 * which is orange. That's the layout Daniel picked from the mockups.
 */
export type SectionTone = "night" | "orange";

const TONE_CLASS: Record<SectionTone, string> = {
  night: "bg-night text-bone border-t border-line",
  orange: "on-orange bg-sun text-ink",
};

const PADDING = {
  md: "py-16 md:py-20",
  lg: "py-16 md:py-24",
} as const;

export function Section({
  id,
  tone = "night",
  size = "lg",
  className = "",
  innerClassName = "",
  labelledBy,
  children,
}: {
  id?: string;
  tone?: SectionTone;
  size?: keyof typeof PADDING;
  className?: string;
  innerClassName?: string;
  labelledBy?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative isolate ${TONE_CLASS[tone]} ${PADDING[size]} ${className}`}
    >
      <div className={`shell ${innerClassName}`}>{children}</div>
    </section>
  );
}

export const H2_CLASS = "text-[2.2rem] sm:text-[2.75rem]";

/** A plain h2 and an optional paragraph under it. */
export function SectionHeader({
  title,
  intro,
  id,
  className = "",
}: {
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <header className={`max-w-3xl ${className}`}>
      <h2 id={id} className={H2_CLASS}>
        {title}
      </h2>
      {intro ? (
        <p className="text-bone/65 mt-3 max-w-2xl text-[1.0625rem] leading-relaxed">
          {intro}
        </p>
      ) : null}
    </header>
  );
}

/** Orange text link used under sections and cards. */
export const LINK_CLASS =
  "text-sun font-semibold underline underline-offset-4 hover:no-underline";
