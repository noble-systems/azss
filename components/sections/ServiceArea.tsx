import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeader } from "@/components/ui/Section";
import { serviceArea } from "@/content/site";

/**
 * The cities a search engine should associate with the business. Also fed to
 * areaServed in the structured data, from the same list.
 */
export function ServiceArea() {
  return (
    <Section id="area" tone="night" size="md" labelledBy="area-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionHeader
            id="area-title"
            eyebrow={serviceArea.eyebrow}
            title={serviceArea.title}
            intro={serviceArea.intro}
          />
        </div>

        <Reveal delay={120} className="lg:col-span-5 lg:col-start-8">
          <ul className="flex flex-wrap gap-2.5 lg:pt-14">
            {serviceArea.cities.map((city) => (
              <li
                key={city}
                className="border-bone/20 text-bone/85 rounded-full border px-4 py-2 text-[0.9rem]"
              >
                {city}
              </li>
            ))}
            <li className="text-bone/55 rounded-full px-2 py-2 text-[0.9rem]">
              and anywhere between
            </li>
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
