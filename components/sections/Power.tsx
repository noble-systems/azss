import Link from "next/link";
import { Media } from "@/components/ui/Media";
import { H2_CLASS, LINK_CLASS, Section } from "@/components/ui/Section";
import { power } from "@/content/site";

export function Power() {
  return (
    <Section id="power" labelledBy="power-title">
      <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-14">
        <div>
          <h2 id="power-title" className={H2_CLASS}>
            {power.title}
          </h2>
          {power.body.map((paragraph) => (
            <p
              key={paragraph}
              className="text-bone/65 mt-4 text-[1.0625rem] leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
          <Link
            href={power.link.href}
            className={`${LINK_CLASS} mt-5 inline-block`}
          >
            {power.link.label}
          </Link>
        </div>

        <Media
          tone="night"
          src={power.image}
          alt={power.imageAlt}
          hideNote
          fit="contain"
          imageClassName="p-10"
          className="aspect-[4/3] w-full"
          sizes="(max-width: 768px) 100vw, 45vw"
        />
      </div>
    </Section>
  );
}
