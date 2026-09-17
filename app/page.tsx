import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Power } from "@/components/sections/Power";
import { Process } from "@/components/sections/Process";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { System } from "@/components/sections/System";
import {
  audience,
  brand,
  contact,
  crowd,
  faq,
  hero,
  seo,
  serviceArea,
} from "@/content/site";

/**
 * Structured data. Only facts we actually have: no ratings, prices or
 * opening hours are asserted, because inventing any of those is how a site
 * gets a manual action rather than a rich result.
 *
 * Three graphs on one page, linked by @id:
 *   LocalBusiness  who we are, where we work, what we offer
 *   WebSite        the site itself, owned by the business
 *   FAQPage        the questions section, word for word
 */
function StructuredData() {
  const businessId = `${brand.domain}/#business`;
  const websiteId = `${brand.domain}/#website`;

  const business = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": businessId,
    name: brand.name,
    alternateName: brand.shortName,
    url: brand.domain,
    description: seo.description,
    telephone: contact.phoneHref.replace("tel:", ""),
    email: contact.email,
    logo: `${brand.domain}/media/logo.png`,
    image: [`${brand.domain}/media/hero.jpg`, `${brand.domain}/opengraph-image`],
    ...(contact.instagramUrl ? { sameAs: [contact.instagramUrl] } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Phoenix",
      addressRegion: "AZ",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 33.4484,
      longitude: -112.074,
    },
    areaServed: [
      { "@type": "State", name: "Arizona" },
      ...serviceArea.cities.map((city) => ({
        "@type": "City",
        name: city,
        containedInPlace: { "@type": "State", name: "Arizona" },
      })),
    ],
    knowsAbout: [
      "Sound system rental",
      "PA system rental",
      "Line array loudspeakers",
      "Live audio engineering",
      "Electronic music events",
      "Battery power for events",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Event sound",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Turn-key sound system rental",
            description: `Line array tops, subwoofers, booth monitors, cabling and an engineer, delivered, set up, run and struck, for crowds up to ${crowd.max}.`,
            areaServed: { "@type": "State", name: "Arizona" },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Silent battery power for events",
            description:
              "Battery power for the whole show where there is no outlet and a generator cannot go.",
            areaServed: { "@type": "State", name: "Arizona" },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Audio engineer on site",
            description:
              "System setup, tuning to the room, sound check and live support for the whole event.",
            areaServed: { "@type": "State", name: "Arizona" },
          },
        },
      ],
    },
    // What the business is for, in the words the page uses.
    slogan: hero.tagline,
    keywords: audience.uses.join(", "),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: brand.domain,
    name: brand.name,
    description: seo.description,
    publisher: { "@id": businessId },
    inLanguage: "en-US",
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${brand.domain}/#faq`,
    isPartOf: { "@id": websiteId },
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        // JSON.stringify does not escape "<". Everything here is authored in
        // this repo, but escaping costs nothing and closes the door.
        __html: JSON.stringify([business, website, faqPage]).replace(
          /</g,
          "\\u003c",
        ),
      }}
    />
  );
}

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <SiteHeader />
      <main id="main">
        <Hero />
        <System />
        <Power />
        <Process />
        <Gallery />
        <Faq />
        <ServiceArea />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
