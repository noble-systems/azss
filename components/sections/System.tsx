import Link from "next/link";
import { Media } from "@/components/ui/Media";
import { LINK_CLASS, Section, SectionHeader } from "@/components/ui/Section";
import { gear, system } from "@/content/site";

/**
 * Three gear panels butted together with a 2px seam, an orange line under
 * each product shot.
 */
export function System() {
  return (
    <Section id="system" labelledBy="system-title">
      <SectionHeader id="system-title" title={system.title} intro={system.intro} />

      <div className="bg-line mt-10 grid gap-[2px] md:grid-cols-3">
        {gear.map((item) => (
          <article key={item.id} className="bg-char flex flex-col">
            <Media
              tone={item.tone}
              src={item.image}
              alt={item.imageAlt}
              fit="contain"
              imageClassName="p-8"
              sizes="(max-width: 768px) 100vw, 33vw"
              hideNote
              className="border-sun aspect-[16/10] w-full border-b-[3px]"
            />
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-[1.65rem]">{item.title}</h3>
              <p className="text-bone/65 mt-2 text-base leading-relaxed">
                {item.body}
              </p>
              {item.link ? (
                <Link
                  href={item.link.href}
                  className={`${LINK_CLASS} mt-4 text-[0.9375rem]`}
                >
                  {item.link.label}
                </Link>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
