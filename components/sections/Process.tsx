import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeader } from "@/components/ui/Section";
import { audience, process } from "@/content/site";

export function Process() {
  return (
    <Section id="process" tone="sand" size="lg" labelledBy="process-title">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeader
            id="process-title"
            eyebrow={process.eyebrow}
            title={process.title}
            intro={process.intro}
          />

          <ol className="border-ink/15 mt-12 border-t">
            {process.steps.map((step, index) => (
              <Reveal
                key={step.index}
                as="li"
                delay={index * 80}
                className="border-ink/15 grid gap-3 border-b py-7 sm:grid-cols-[5rem_1fr] sm:gap-8"
              >
                <span className="font-display text-sunset text-[2.4rem] leading-none font-bold tracking-[-0.04em]">
                  {step.index}
                </span>
                <div>
                  <h3 className="text-[1.4rem] leading-tight">{step.title}</h3>
                  <p className="text-ink/70 mt-2.5 max-w-lg text-[0.9375rem] leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <Reveal delay={120}>
            <div className="bg-night text-bone rounded-3xl p-7 sm:p-9">
              <p className="label-xs text-sun-soft">{audience.eyebrow}</p>
              <h3 className="mt-4 text-[1.7rem] leading-[1.06]">
                {audience.title}
              </h3>
              <p className="text-bone/65 mt-4 text-[0.9375rem] leading-relaxed">
                {audience.intro}
              </p>
              <ul className="border-bone/15 mt-6 grid gap-2.5 border-t pt-5">
                {audience.uses.map((use) => (
                  <li
                    key={use}
                    className="text-bone/80 flex items-start gap-3 text-[0.9rem]"
                  >
                    <span
                      aria-hidden="true"
                      className="bg-sun mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full"
                    />
                    {use}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </aside>
      </div>
    </Section>
  );
}
