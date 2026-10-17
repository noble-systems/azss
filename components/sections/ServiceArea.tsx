import { Section, SectionHeader } from "@/components/ui/Section";
import { serviceArea } from "@/content/site";

export function ServiceArea() {
  return (
    <Section id="area" size="md" labelledBy="area-title">
      <SectionHeader
        id="area-title"
        title={serviceArea.title}
        intro={serviceArea.intro}
      />
    </Section>
  );
}
