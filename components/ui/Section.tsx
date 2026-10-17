import type { ReactNode } from "react";

/**
 * The site is dark by default, so "night" and "char" are the resting tones and
 * the light ones are the alternation. Light sections carry `.on-light`, which
 * flips the focus ring and the logo cutout colour (see globals.css).
 */
export type SectionTone = "night" | "char" | "bone" | "sand";

const TONE_CLASS: Record<SectionTone, string> = {
  night: "bg-night text-bone",
  char: "bg-char text-bone",
  bone: "on-light bg-bone text-ink",
  sand: "on-light bg-sand text-ink",
};

const PADDING = {
  sm: "py-14 md:py-16",
  md: "py-16 md:py-20",
  lg: "py-16 md:py-24",
} as const;

export function Section({
  id,
  tone = "night",
  size = "md",
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
      data-tone={tone}
      className={`relative isolate ${TONE_CLASS[tone]} ${PADDING[size]} ${className}`}
    >
      <div className={`shell ${innerClassName}`}>{children}</div>
    </section>
  );
}

/**
 * A plain h2 and an optional paragraph. It used to carry a small uppercase
 * label above every heading and fade each line in on scroll; Daniel said the
 * site looked AI-made, and those two things were a big part of why.
 */
export function SectionHeader({
  title,
  intro,
  id,
  className = "",
  children,
}: {
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <header className={`max-w-3xl ${className}`}>
      <h2 id={id} className="text-[1.85rem] leading-tight sm:text-[2.4rem]">
        {title}
      </h2>
      {intro ? (
        <p className="mt-4 max-w-2xl text-base leading-relaxed opacity-80 sm:text-[1.0625rem]">
          {intro}
        </p>
      ) : null}
      {children}
    </header>
  );
}
