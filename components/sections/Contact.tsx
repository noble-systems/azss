import { InquiryForm } from "@/components/forms/InquiryForm";
import { H2_CLASS, Section } from "@/components/ui/Section";
import { contact, inquiry } from "@/content/site";

/** The orange band: contact details on the left, the form on a black panel. */
export function Contact() {
  return (
    <Section id="contact" tone="orange" labelledBy="contact-title">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <h2 id="contact-title" className={H2_CLASS}>
            {inquiry.title}
          </h2>
          <p className="text-ink/85 mt-3 text-[1.0625rem] leading-relaxed">
            {inquiry.intro}
          </p>
          <a
            href={contact.phoneHref}
            className="font-display mt-6 block text-[2.2rem] leading-none font-bold hover:underline"
          >
            {contact.phone}
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="mt-2 inline-block underline-offset-4 hover:underline"
          >
            {contact.email}
          </a>
          <p className="text-ink/80 mt-2">Based in Phoenix, Arizona</p>
        </div>

        <div className="bg-night text-bone p-6 sm:p-8 lg:col-span-7">
          <InquiryForm />
        </div>
      </div>
    </Section>
  );
}
