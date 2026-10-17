import { InquiryForm } from "@/components/forms/InquiryForm";
import { Section } from "@/components/ui/Section";
import { contact, inquiry } from "@/content/site";

export function Contact() {
  return (
    <Section id="contact" tone="sand" size="lg" labelledBy="contact-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2
            id="contact-title"
            className="text-[1.85rem] leading-tight sm:text-[2.4rem]"
          >
            {inquiry.title}
          </h2>
          <p className="text-ink/75 mt-4 text-[1.0625rem] leading-relaxed">
            {inquiry.intro}
          </p>

          <dl className="mt-8 space-y-4 text-[1.0625rem]">
            <div>
              <dt className="text-ink/60 text-[0.875rem]">Phone</dt>
              <dd>
                <a
                  href={contact.phoneHref}
                  className="text-ink hover:text-terracotta-deep text-[1.4rem] font-semibold transition-colors duration-200"
                >
                  {contact.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-ink/60 text-[0.875rem]">Email</dt>
              <dd>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-ink hover:text-terracotta-deep underline-offset-4 transition-colors duration-200 hover:underline"
                >
                  {contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-ink/60 text-[0.875rem]">Based in</dt>
              <dd className="text-ink/85">Phoenix, Arizona</dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-7">
          <div className="border-ink/12 bg-bone-soft rounded-lg border p-6 sm:p-8">
            <InquiryForm />
          </div>
        </div>
      </div>
    </Section>
  );
}
