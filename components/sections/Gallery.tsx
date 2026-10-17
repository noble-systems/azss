import Image from "next/image";
import { hero, gallerySlots } from "@/content/site";

/**
 * Edge-to-edge strip of the three event photos, the wide one first. No
 * heading: the photos are the point, and the alt text says what's in them.
 */
export function Gallery() {
  const photos = [
    ...(hero.image
      ? [{ id: "hero", image: hero.image, imageAlt: hero.imageAlt }]
      : []),
    ...gallerySlots,
  ].filter((photo) => photo.image);

  return (
    <section
      id="gallery"
      aria-label="Photos from our events"
      className="grid gap-1 sm:grid-cols-[1.5fr_1fr_1fr]"
    >
      {photos.map((photo) => (
        <div key={photo.id} className="relative h-[360px] sm:h-[520px]">
          <Image
            src={photo.image as string}
            alt={photo.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, 40vw"
            className="object-cover"
          />
        </div>
      ))}
    </section>
  );
}
