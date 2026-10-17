import { Section, SectionHeader } from "@/components/ui/Section";
import { faq } from "@/content/site";

/**
 * Questions in two columns, all open. No accordion, so every answer is on
 * the page for crawlers and for people skimming.
 */
export function Faq() {
  return (
    <Section id="faq" labelledBy="faq-title">
      <SectionHeader id="faq-title" title={faq.title} />

      <dl className="mt-8 grid gap-x-12 md:grid-cols-2">
        {faq.items.map((item) => (
          <div key={item.question} className="border-line border-t py-5">
            <dt>
              <h3 className="font-sans text-[1.125rem] font-semibold tracking-normal normal-case">
                {item.question}
              </h3>
            </dt>
            <dd className="text-bone/65 mt-1.5 text-base leading-relaxed">
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
