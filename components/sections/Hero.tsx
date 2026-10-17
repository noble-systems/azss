import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { contact, hero } from "@/content/site";

/**
 * The H1 used to be "BIG SOUND. ANYWHERE IN ARIZONA." in seven-rem capitals
 * with a label above it and every line fading in. Now it says what the
 * business is, at a size a local business site would use.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="bg-night text-bone relative isolate flex min-h-[78svh] flex-col justify-end overflow-hidden"
    >
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

      <div className="shell w-full pt-32 pb-12 sm:pt-36 lg:pb-16">
        <div className="max-w-2xl">
          <h1
            id="hero-title"
            className="text-[2.3rem] leading-[1.08] font-bold sm:text-[3.2rem]"
          >
            {hero.title}
          </h1>

          {hero.body.map((paragraph) => (
            <p
              key={paragraph}
              className="text-bone/85 mt-5 text-[1.0625rem] leading-relaxed sm:text-lg"
            >
              {paragraph}
            </p>
          ))}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href={hero.primaryCta.href} variant="sun" size="lg">
              {hero.primaryCta.label}
              <ArrowIcon />
            </ButtonLink>
            <ButtonLink
              href={contact.phoneHref}
              variant="outline"
              size="lg"
              className="text-bone"
            >
              Call {contact.phone}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
