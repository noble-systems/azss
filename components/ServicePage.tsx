import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS_ID, JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Contact } from "@/components/sections/Contact";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { LINK_CLASS } from "@/components/ui/Section";
import { brand, contact, serviceList, type ServicePage } from "@/content/site";

export function serviceMetadata(page: ServicePage): Metadata {
  const url = `/${page.slug}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: brand.name,
      title: `${page.metaTitle} | ${brand.name}`,
      description: page.metaDescription,
      images: [{ url: page.image }],
    },
  };
}

/**
 * Layout shared by the three service pages: the heading and a photo, the
 * sections from content/site.ts, links to the other two pages, then the
 * quote form so nobody has to go back to the home page to ask.
 */
export function ServicePageView({ page }: { page: ServicePage }) {
  const url = `${brand.domain}/${page.slug}`;
  const others = serviceList.filter((other) => other.slug !== page.slug);

  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}#service`,
      name: page.serviceName,
      description: page.metaDescription,
      url,
      provider: { "@id": BUSINESS_ID },
      areaServed: { "@type": "State", name: "Arizona" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: brand.domain },
        { "@type": "ListItem", position: 2, name: page.linkLabel, item: url },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={structured} />
      <SiteHeader overlay={false} ownContact />
      <main id="main" className="pt-[4.5rem] lg:pt-20">
        <section
          aria-labelledby="page-title"
          className="bg-night text-bone py-12 md:py-16"
        >
          <div className="shell grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <nav aria-label="Breadcrumb" className="text-bone/60 text-[0.875rem]">
                <Link
                  href="/"
                  className="hover:text-bone underline-offset-4 hover:underline"
                >
                  Home
                </Link>
                <span aria-hidden="true"> / </span>
                <span>{page.linkLabel}</span>
              </nav>
              <h1 id="page-title" className="mt-4 text-[2.6rem] sm:text-[3.5rem]">
                {page.h1}
              </h1>
              {page.intro.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-bone/85 mt-5 text-[1.0625rem] leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ButtonLink href="#contact" variant="sun" size="lg">
                  Get a quote
                  <ArrowIcon />
                </ButtonLink>
                <ButtonLink
                  href={contact.phoneHref}
                  variant="outline"
                  size="lg"
                  className="text-bone"
                >
                  Call {contact.phone}
                </ButtonLink>
              </div>
            </div>

            <Media
              tone="night"
              src={page.image}
              alt={page.imageAlt}
              hideNote
              priority
              fit={page.imageFit}
              imageClassName={page.imageFit === "contain" ? "p-10" : ""}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-[4/3] w-full"
            />
          </div>
        </section>

        <section className="bg-night text-bone border-line border-t py-14 md:py-20">
          <div className="shell">
            <div className="max-w-3xl space-y-10">
              {page.sections.map((section) => (
                <div key={section.heading}>
                  <h2 className="text-[1.9rem] sm:text-[2.3rem]">
                    {section.heading}
                  </h2>
                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-bone/70 mt-3 text-[1.0625rem] leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            <div className="border-line mt-14 max-w-3xl border-t pt-8">
              <h2 className="text-[1.5rem]">Also from us</h2>
              <ul className="mt-3 space-y-2">
                {others.map((other) => (
                  <li key={other.slug}>
                    <Link
                      href={`/${other.slug}`}
                      className={`${LINK_CLASS} text-[1.0625rem]`}
                    >
                      {other.linkLabel}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/#faq" className={`${LINK_CLASS} text-[1.0625rem]`}>
                    Questions people ask
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
