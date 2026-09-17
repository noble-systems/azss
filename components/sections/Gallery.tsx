import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeader } from "@/components/ui/Section";
import { gallery, gallerySlots } from "@/content/site";

const ASPECT = {
  wide: "aspect-[16/10]",
  tall: "aspect-[4/5]",
} as const;

export function Gallery() {
  return (
    <Section id="gallery" tone="char" size="md" labelledBy="gallery-title">
      <SectionHeader
        id="gallery-title"
        eyebrow={gallery.eyebrow}
        title={gallery.title}
      />

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        {gallerySlots.map((slot, index) => (
          <Reveal key={slot.id} delay={index * 80}>
            <Media
              tone={slot.tone}
              src={slot.image}
              alt={slot.imageAlt}
              shotNote={slot.shotNote}
              sizes="(max-width: 640px) 100vw, 50vw"
              className={`w-full rounded-2xl ${ASPECT[slot.span]}`}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
