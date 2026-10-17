import { Media } from "@/components/ui/Media";
import { Section, SectionHeader } from "@/components/ui/Section";
import { gallery, gallerySlots } from "@/content/site";

export function Gallery() {
  return (
    <Section id="gallery" tone="char" size="md" labelledBy="gallery-title">
      <SectionHeader id="gallery-title" title={gallery.title} />

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {gallerySlots.map((slot) => (
          <Media
            key={slot.id}
            tone={slot.tone}
            src={slot.image}
            alt={slot.imageAlt}
            hideNote
            sizes="(max-width: 640px) 100vw, 50vw"
            className="aspect-[4/5] w-full rounded-lg"
          />
        ))}
      </div>
    </Section>
  );
}
