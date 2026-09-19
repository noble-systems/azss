import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, Section } from "@/components/ui/Section";
import { power } from "@/content/site";

export function Power() {
  return (
    <Section
      id="power"
      tone="night"
      size="lg"
      labelledBy="power-title"
      className="overflow-hidden"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Reveal>
            <Eyebrow>{power.eyebrow}</Eyebrow>
          </Reveal>

          <Reveal delay={60}>
            <h2
              id="power-title"
              className="mt-5 text-[2.1rem] leading-[1.02] sm:text-5xl lg:text-[3.5rem]"
            >
              {power.title}
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="text-bone/70 mt-6 text-[1.0625rem] leading-relaxed">
              {power.intro}
            </p>
          </Reveal>

          <Reveal delay={180}>
            <dl className="border-bone/15 mt-10 border-t">
              {power.points.map((point) => (
                <div
                  key={point.title}
                  className="border-bone/15 flex flex-col gap-1.5 border-b py-4 sm:flex-row sm:items-baseline sm:gap-6"
                >
                  <dt className="text-bone w-48 shrink-0 text-[0.9375rem] font-medium">
                    {point.title}
                  </dt>
                  <dd className="text-bone/65 text-[0.9rem] leading-relaxed">
                    {point.body}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal delay={100}>
            <Media
              tone="ember"
              src={power.image}
              alt={power.imageAlt}
              shotNote="Battery station beside the stage, cabling to the amps"
              // The card carries its own copy at the bottom, so the shot note
              // would print on top of it. Shot to get: the battery station
              // beside the stage, cabling to the amps.
              hideNote
              fit="contain"
              // Product sits in the upper part of the card; the copy owns the
              // bottom. Bottom padding is a percentage so it scales with the
              // card rather than the text.
              imageClassName="object-top p-8 pb-[38%]"
              className="aspect-[4/5] w-full rounded-3xl"
              sizes="(max-width: 1024px) 100vw, 40vw"
            >
              <div className="flex h-full flex-col justify-between p-6 sm:p-8">
                <span className="label-xs text-bone/70">Battery power</span>
                <div>
                  <p className="font-display text-bone text-[2.2rem] leading-[0.95] font-bold tracking-[-0.03em] uppercase sm:text-[2.8rem]">
                    Silent power
                    <br />
                    for the whole event.
                  </p>
                  <p className="text-bone/70 mt-3 max-w-xs text-[0.9rem] leading-relaxed">
                    Battery powered, so there is no generator noise or exhaust, and
                    it goes wherever the system goes.
                  </p>
                </div>
              </div>
            </Media>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
