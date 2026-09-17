import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { ArrowIcon } from "@/components/ui/Button";
import { brand, contact } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What Arizona Sound System collects through this website, why, who processes it, and how to get it removed.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

type LegalSection = {
  heading: string;
  body: readonly string[];
  list?: readonly string[];
};

/**
 * Every statement here is checked against the code. If you change what the
 * app collects, stores, or sends, change this page in the same commit.
 */
const sections: readonly LegalSection[] = [
  {
    heading: "Who is responsible",
    body: [
      `${brand.name}, a sound rental company based in ${brand.city}, decides what is collected on this site and why.`,
      `To ask anything about this policy, or to exercise any of the rights below, email ${contact.email} or call ${contact.phone}.`,
    ],
  },
  {
    heading: "What you give us",
    body: [
      "This site has one form, the quote request. We keep what you type into it.",
    ],
    list: [
      "Your name",
      "Your email address",
      "Your phone number, if you choose to provide it",
      "The type, date and location of your event, if you provide them",
      "Anything you write in the message field",
    ],
  },
  {
    heading: "What we record automatically",
    body: [
      "When you submit the form we also record technical details of that request. They let us tell a real inquiry from an automated one, and tell us which link brought you here. None of this is collected while you are simply reading the site.",
    ],
    list: [
      "Your IP address",
      "Your browser, operating system and device type, worked out from the information your browser sends with every request",
      "The page you submitted the form from, including any campaign tags in the link you followed",
      "The site that referred you, if any",
      "The country your request came from, as reported by our content network",
    ],
  },
  {
    heading: "Why we hold it",
    body: [
      "You asked us for a quote. We use what you send to reply to that request and to run the event if you book us, which is a step taken at your request before any agreement.",
      "The technical details of a submission are kept because we have a genuine interest in keeping the form free of spam. We think that interest is reasonable and does not override your rights, and you can object to it.",
      "We do not add you to a mailing list. The only email you get from this form is an acknowledgement and then our reply.",
    ],
  },
  {
    heading: "Who else touches it",
    body: [
      "Amazon Web Services hosts this site and stores the data on our behalf, in the United States. Records live in Amazon DynamoDB, the site is served through AWS Amplify and CloudFront, and email is sent through Amazon Simple Email Service. AWS acts on our instructions and does not use your information for its own purposes.",
      "We do not sell, rent, share or trade your information, and we do not disclose it for anyone else's advertising. We would hand something over if the law required it, and we would tell you unless we were forbidden from doing so.",
    ],
  },
  {
    heading: "Cookies and tracking",
    body: [
      "This site sets no cookies. There are no advertising cookies, no analytics cookies, and no third-party scripts. We do not track you across other websites.",
    ],
  },
  {
    heading: "How long we keep it",
    body: [
      "Quote requests are kept while they are useful for planning and for following up on the event, and are reviewed periodically so that stale records are deleted. Ask and we will delete yours sooner.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "Wherever you live, you can ask us to do any of the following, and we will not treat you differently for asking.",
    ],
    list: [
      "Tell you what we hold about you and give you a copy",
      "Correct anything that is wrong",
      "Delete it",
      "Stop using it for a particular purpose, or object to our use of the technical details described above",
      "Provide it in a portable, machine-readable format",
    ],
  },
  {
    heading: "Security",
    body: [
      "The site is served over HTTPS. Records are stored in access-controlled AWS services. Form submissions are rate limited and screened for automated abuse.",
      "No system is perfectly secure, and we do not claim otherwise. If a breach affected your information we would notify you and the relevant authority as the law requires.",
    ],
  },
  {
    heading: "Children",
    body: [
      "This site is not directed at children and we do not knowingly collect information from anyone under 13. If you believe a child has given us their details, contact us and we will delete the record.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "If this policy changes, the updated version is posted here with a new last-updated date at the top.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader overlay={false} />

      <main id="main" className="on-light bg-bone text-ink pt-[4.5rem] lg:pt-20">
        <div className="shell py-16 md:py-24">
          <div className="max-w-2xl">
            <Link
              href="/"
              className="group label-xs text-ink/65 hover:text-ink inline-flex items-center gap-2 transition-colors duration-200"
            >
              <span aria-hidden="true" className="rotate-180">
                <ArrowIcon />
              </span>
              Back to {brand.shortName}
            </Link>

            <h1 className="mt-8 text-[2.4rem] leading-[1.05] sm:text-5xl">
              Privacy policy
            </h1>

            <p className="label-xs text-ink/65 mt-5">
              Last updated 14 September 2026
            </p>

            <p className="text-ink/70 mt-8 text-[1.0625rem] leading-relaxed">
              This page explains what this website collects, why, who else touches
              it, and how to get it removed. It is written to match the code rather
              than to sound impressive.
            </p>

            <div className="mt-12 space-y-10">
              {sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-2xl leading-tight">{section.heading}</h2>
                  {section.body.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-ink/70 mt-4 text-[0.9375rem] leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.list ? (
                    <ul className="mt-4 space-y-2">
                      {section.list.map((item) => (
                        <li
                          key={item}
                          className="text-ink/70 flex items-start gap-3 text-[0.9375rem] leading-relaxed"
                        >
                          <span
                            aria-hidden="true"
                            className="bg-ink/35 mt-[0.6em] h-1 w-1 shrink-0 rounded-full"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
