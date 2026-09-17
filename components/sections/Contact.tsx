import { InquiryForm } from "@/components/forms/InquiryForm";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, Section } from "@/components/ui/Section";
import { contact, inquiry } from "@/content/site";

export function Contact() {
  return (
    <Section id="contact" tone="bone" size="lg" labelledBy="contact-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow>{inquiry.eyebrow}</Eyebrow>
          </Reveal>

          <Reveal delay={60}>
            <h2
              id="contact-title"
              className="mt-5 text-[2.1rem] leading-[1.02] sm:text-5xl lg:text-[3.5rem]"
            >
              {inquiry.title}
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="text-ink/70 mt-6 text-[1.0625rem] leading-relaxed">
              {inquiry.intro}
            </p>
          </Reveal>

          <Reveal delay={180}>
            <dl className="border-ink/15 mt-10 border-t">
              <div className="border-ink/15 flex flex-col gap-1 border-b py-4 sm:flex-row sm:items-baseline sm:gap-6">
                <dt className="label-xs text-ink/60 w-24 shrink-0">Phone</dt>
                <dd>
                  <a
                    href={contact.phoneHref}
                    className="font-display text-ink hover:text-terracotta-deep text-[1.5rem] leading-none font-semibold tracking-[-0.02em] transition-colors duration-200"
                  >
                    {contact.phone}
                  </a>
                </dd>
              </div>
              <div className="border-ink/15 flex flex-col gap-1 border-b py-4 sm:flex-row sm:items-baseline sm:gap-6">
                <dt className="label-xs text-ink/60 w-24 shrink-0">Email</dt>
                <dd>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-ink hover:text-terracotta-deep text-[1.0625rem] underline-offset-4 transition-colors duration-200 hover:underline"
                  >
                    {contact.email}
                  </a>
                </dd>
              </div>
              <div className="border-ink/15 flex flex-col gap-1 border-b py-4 sm:flex-row sm:items-baseline sm:gap-6">
                <dt className="label-xs text-ink/60 w-24 shrink-0">Based in</dt>
                <dd className="text-ink/80 text-[1.0625rem]">
                  Phoenix, serving all of Arizona
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal delay={100}>
            <div className="border-ink/12 bg-bone-soft/60 rounded-3xl border p-6 sm:p-8">
              <InquiryForm />
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
