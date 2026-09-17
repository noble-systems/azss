import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeader } from "@/components/ui/Section";
import { faq } from "@/content/site";

/**
 * Plain question-and-answer pairs in real headings, not an accordion. Crawlers
 * index every answer, and a reader can scan the questions without clicking.
 * The same pairs are published as FAQPage structured data from app/page.tsx.
 */
export function Faq() {
  return (
    <Section id="faq" tone="sand" size="lg" labelledBy="faq-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeader id="faq-title" eyebrow={faq.eyebrow} title={faq.title} />
        </div>

        <dl className="border-ink/15 border-t lg:col-span-7 lg:col-start-6">
          {faq.items.map((item, index) => (
            <Reveal
              key={item.question}
              as="div"
              delay={Math.min(index, 4) * 60}
              className="border-ink/15 border-b py-6"
            >
              <dt>
                <h3 className="text-[1.25rem] leading-snug">{item.question}</h3>
              </dt>
              <dd className="text-ink/70 mt-3 max-w-xl text-[0.9375rem] leading-relaxed">
                {item.answer}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </Section>
  );
}
