import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { events, process, services } from "@/content/site";

/** Booking steps on the left, the kinds of events we do on the right. */
export function Process() {
  return (
    <Section id="process" tone="sand" size="lg" labelledBy="process-title">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2
            id="process-title"
            className="text-[1.85rem] leading-tight sm:text-[2.4rem]"
          >
            {process.title}
          </h2>
          <ol className="mt-6 space-y-6">
            {process.steps.map((step, index) => (
              <li key={step.title}>
                <h3 className="text-[1.2rem] leading-tight">
                  {index + 1}. {step.title}
                </h3>
                <p className="text-ink/75 mt-2 text-[0.9375rem] leading-relaxed">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h2 className="text-[1.85rem] leading-tight sm:text-[2.4rem]">
            {events.title}
          </h2>
          <p className="text-ink/75 mt-6 text-[1.0625rem] leading-relaxed">
            {events.body}
          </p>
          <Link
            href={`/${services.dj.slug}`}
            className="text-terracotta-deep mt-5 inline-block text-[0.9375rem] font-medium underline underline-offset-4 hover:no-underline"
          >
            {services.dj.linkLabel}
          </Link>
        </div>
      </div>
    </Section>
  );
}
