import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { contact, hero } from "@/content/site";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="bg-night text-bone relative isolate flex min-h-[92svh] flex-col justify-end overflow-hidden"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 -z-10">
        <Media
          tone="ember"
          src={hero.image}
          alt={hero.imageAlt}
          hideNote
          priority
          sizes="100vw"
          overlay="strong"
          className="h-full w-full"
        />
      </div>

      <div className="shell w-full pt-32 pb-14 sm:pt-36 lg:pb-20">
        <div className="max-w-4xl">
          <p
            className="animate-rise label-sm text-sun-soft"
            style={{ ["--rise-delay" as string]: "80ms" }}
          >
            {hero.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="animate-rise font-display mt-6 leading-[0.92] font-bold tracking-[-0.035em] uppercase"
            style={{
              fontSize: "clamp(2.9rem, 9.5vw, 7.5rem)",
              ["--rise-delay" as string]: "160ms",
            }}
          >
            {hero.title}
          </h1>

          <p
            className="animate-rise font-display text-bone/90 mt-7 text-[1.35rem] leading-tight sm:text-[1.9rem]"
            style={{ ["--rise-delay" as string]: "260ms" }}
          >
            {hero.tagline}
          </p>

          <p
            className="animate-rise text-bone/70 mt-6 max-w-xl text-[1.0625rem] leading-relaxed"
            style={{ ["--rise-delay" as string]: "340ms" }}
          >
            {hero.body}
          </p>

          <div
            className="animate-rise mt-10 flex flex-wrap items-center gap-3"
            style={{ ["--rise-delay" as string]: "420ms" }}
          >
            <ButtonLink href={hero.primaryCta.href} variant="sun" size="lg">
              {hero.primaryCta.label}
              <ArrowIcon />
            </ButtonLink>
            <ButtonLink
              href={hero.secondaryCta.href}
              variant="outline"
              size="lg"
              className="text-bone"
            >
              {hero.secondaryCta.label}
            </ButtonLink>
            <ButtonLink
              href={contact.phoneHref}
              variant="ghost"
              size="lg"
              className="text-bone/80 hover:text-bone"
            >
              Call {contact.phone}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
