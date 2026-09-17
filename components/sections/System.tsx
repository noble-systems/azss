import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeader } from "@/components/ui/Section";
import { gear, system } from "@/content/site";

export function System() {
  return (
    <Section id="system" tone="bone" size="lg" labelledBy="system-title">
      <SectionHeader
        id="system-title"
        eyebrow={system.eyebrow}
        title={system.title}
        intro={system.intro}
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {gear.map((item, index) => (
          <Reveal key={item.id} delay={index * 80} className="h-full">
            <article className="border-ink/12 bg-bone-soft flex h-full flex-col overflow-hidden rounded-3xl border">
              <Media
                tone={item.tone}
                src={item.image}
                alt={item.imageAlt}
                fit="contain"
                imageClassName="p-6 sm:p-7"
                sizes="(max-width: 1024px) 100vw, 33vw"
                hideNote
                className="aspect-[16/9] w-full"
              >
                <div className="flex h-full items-end p-5">
                  <span
                    className={`font-display text-[2.75rem] leading-none font-bold tracking-[-0.04em] ${
                      item.tone === "sand" ? "text-ink/80" : "text-bone/90"
                    }`}
                  >
                    {item.index}
                  </span>
                </div>
              </Media>

              <div className="flex flex-1 flex-col p-7 sm:p-8">
                <h3 className="text-[1.5rem] leading-[1.1]">{item.title}</h3>
                <p className="text-ink mt-4 text-[1.0625rem] leading-snug font-medium">
                  {item.lead}
                </p>
                <p className="text-ink/70 mt-3 text-[0.9375rem] leading-relaxed">
                  {item.body}
                </p>

                <ul className="border-ink/12 mt-6 space-y-2.5 border-t pt-5">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="text-ink/75 flex items-start gap-3 text-[0.9rem] leading-relaxed"
                    >
                      <span
                        aria-hidden="true"
                        className="bg-terracotta mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
