import { Section, SectionHeader } from "@/components/ui/Section";
import { serviceArea } from "@/content/site";

/** One sentence of cities. It was a cloud of pill tags before. */
export function ServiceArea() {
  return (
    <Section id="area" tone="night" size="md" labelledBy="area-title">
      <SectionHeader
        id="area-title"
        title={serviceArea.title}
        intro={serviceArea.intro}
      />
    </Section>
  );
}
