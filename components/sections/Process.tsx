import Link from "next/link";
import { H2_CLASS, LINK_CLASS, Section } from "@/components/ui/Section";
import { events, process, services } from "@/content/site";

/** Booking steps on the left, the kinds of events we do on the right. */
export function Process() {
  return (
    <Section id="process" labelledBy="process-title">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 id="process-title" className={H2_CLASS}>
            {process.title}
          </h2>
          <ol className="mt-6">
            {process.steps.map((step, index) => (
              <li
                key={step.title}
                className="border-line relative border-t py-5 pl-14"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-sun absolute top-3.5 left-0 text-[2.2rem] leading-none font-bold"
                >
                  {index + 1}
                </span>
                <h3 className="font-sans text-[1.125rem] font-semibold tracking-normal normal-case">
                  {step.title}
                </h3>
                <p className="text-bone/65 mt-1 text-base leading-relaxed">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h2 className={H2_CLASS}>{events.title}</h2>
          <p className="text-bone/65 mt-6 text-[1.0625rem] leading-relaxed">
            {events.body}
          </p>
          <Link
            href={`/${services.dj.slug}`}
            className={`${LINK_CLASS} mt-5 inline-block`}
          >
            {services.dj.linkLabel}
          </Link>
        </div>
      </div>
    </Section>
  );
}
