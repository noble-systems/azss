import { Section, SectionHeader } from "@/components/ui/Section";
import { faq } from "@/content/site";

/**
 * Plain question-and-answer pairs in real headings, not an accordion, so
 * every answer is on the page for crawlers and for people skimming.
 */
export function Faq() {
  return (
    <Section id="faq" tone="bone" size="lg" labelledBy="faq-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeader id="faq-title" title={faq.title} />
        </div>

        <dl className="border-ink/15 border-t lg:col-span-8">
          {faq.items.map((item) => (
            <div key={item.question} className="border-ink/15 border-b py-5">
              <dt>
                <h3 className="text-[1.15rem] leading-snug">{item.question}</h3>
              </dt>
              <dd className="text-ink/75 mt-2 max-w-2xl text-[0.9375rem] leading-relaxed">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
