import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { contact, hero } from "@/content/site";

/** Full-width photo of the rig with the heading and quote buttons at the bottom. */
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="bg-night text-bone relative isolate flex min-h-[640px] flex-col justify-end overflow-hidden pt-[4.5rem] lg:min-h-[700px] lg:pt-20"
    >
      <div className="absolute inset-0 -z-10">
        <Media
          tone="night"
          src={hero.image}
          alt={hero.imageAlt}
          hideNote
          priority
          sizes="100vw"
          overlay="strong"
          className="h-full w-full"
        />
      </div>

      <div className="shell w-full pt-24 pb-12 lg:pb-14">
        <h1 id="hero-title" className="max-w-4xl text-[3rem] sm:text-[4.75rem]">
          {hero.title}
        </h1>
        <div className="max-w-2xl">
          {hero.body.map((paragraph) => (
            <p
              key={paragraph}
              className="text-bone/85 mt-4 text-[1.0625rem] leading-relaxed sm:text-[1.1875rem]"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
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
    </section>
  );
}
