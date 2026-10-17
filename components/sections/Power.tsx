import Link from "next/link";
import { Media } from "@/components/ui/Media";
import { Section } from "@/components/ui/Section";
import { power } from "@/content/site";

export function Power() {
  return (
    <Section id="power" tone="night" size="lg" labelledBy="power-title">
      <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-16">
        <div>
          <h2
            id="power-title"
            className="text-[1.85rem] leading-tight sm:text-[2.4rem]"
          >
            {power.title}
          </h2>
          {power.body.map((paragraph) => (
            <p
              key={paragraph}
              className="text-bone/80 mt-4 text-[1.0625rem] leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
          <Link
            href={power.link.href}
            className="text-sun-soft mt-6 inline-block text-[0.9375rem] font-medium underline underline-offset-4 hover:no-underline"
          >
            {power.link.label}
          </Link>
        </div>

        <Media
          tone="ember"
          src={power.image}
          alt={power.imageAlt}
          hideNote
          fit="contain"
          imageClassName="p-8"
          className="aspect-[4/3] w-full rounded-lg"
          sizes="(max-width: 768px) 100vw, 45vw"
        />
      </div>
    </Section>
  );
}
