import Link from "next/link";
import { Media } from "@/components/ui/Media";
import { Section, SectionHeader } from "@/components/ui/Section";
import { gear, system } from "@/content/site";

export function System() {
  return (
    <Section id="system" tone="bone" size="lg" labelledBy="system-title">
      <SectionHeader id="system-title" title={system.title} intro={system.intro} />

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {gear.map((item) => (
          <article
            key={item.id}
            className="border-ink/12 bg-bone-soft flex flex-col overflow-hidden rounded-lg border"
          >
            <Media
              tone={item.tone}
              src={item.image}
              alt={item.imageAlt}
              fit="contain"
              imageClassName="p-6"
              sizes="(max-width: 768px) 100vw, 33vw"
              hideNote
              className="aspect-[16/10] w-full"
            />
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-[1.3rem] leading-tight">{item.title}</h3>
              <p className="text-ink/75 mt-3 text-[0.9375rem] leading-relaxed">
                {item.body}
              </p>
              {item.link ? (
                <Link
                  href={item.link.href}
                  className="text-terracotta-deep mt-4 text-[0.9375rem] font-medium underline underline-offset-4 hover:no-underline"
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
