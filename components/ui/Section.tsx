import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

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
  sm: "py-16 md:py-20",
  md: "py-20 md:py-28",
  lg: "py-24 md:py-36",
} as const;

export function Section({
  id,
  tone = "night",
  size = "md",
  className = "",
  innerClassName = "",
  labelledBy,
  /** Full-bleed decoration rendered behind the content, outside the shell. */
  backdrop,
  children,
}: {
  id?: string;
  tone?: SectionTone;
  size?: keyof typeof PADDING;
  className?: string;
  innerClassName?: string;
  labelledBy?: string;
  backdrop?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-tone={tone}
      className={`relative isolate ${TONE_CLASS[tone]} ${PADDING[size]} ${className}`}
    >
      {backdrop ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          {backdrop}
        </div>
      ) : null}
      <div className={`shell ${innerClassName}`}>{children}</div>
    </section>
  );
}

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`label-sm flex items-center gap-3 opacity-70 ${className}`}>
      <span aria-hidden="true" className="h-px w-6 bg-current opacity-60" />
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  id,
  align = "left",
  className = "",
  titleClassName = "",
  children,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  children?: ReactNode;
}) {
  return (
    <header
      className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}
    >
      {eyebrow ? (
        <Reveal>
          <Eyebrow className={align === "center" ? "justify-center" : ""}>
            {eyebrow}
          </Eyebrow>
        </Reveal>
      ) : null}

      <Reveal delay={60}>
        <h2
          id={id}
          className={`mt-5 text-[2.1rem] leading-[1.02] sm:text-5xl lg:text-[3.6rem] ${titleClassName}`}
        >
          {title}
        </h2>
      </Reveal>

      {intro ? (
        <Reveal delay={120}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed opacity-75 sm:text-lg">
            {intro}
          </p>
        </Reveal>
      ) : null}

      {children}
    </header>
  );
}
