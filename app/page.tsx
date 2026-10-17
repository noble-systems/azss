import { BUSINESS_ID, JsonLd, WEBSITE_ID } from "@/components/JsonLd";
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
import { brand, contact, faq, seo, serviceArea, serviceList } from "@/content/site";

/**
 * Structured data. Only facts we have: no ratings, prices or opening hours,
 * because making any of those up is how a site gets a manual action instead
 * of a rich result. The address is city-level on purpose; we're a
 * service-area business and Google says to hide the street address.
 */
function StructuredData() {
  const business = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": BUSINESS_ID,
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
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Event sound",
      itemListElement: serviceList.map((page) => ({
        "@type": "Offer",
        itemOffered: { "@id": `${brand.domain}/${page.slug}#service` },
      })),
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: brand.domain,
    name: brand.name,
    description: seo.description,
    publisher: { "@id": BUSINESS_ID },
    inLanguage: "en-US",
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${brand.domain}/#faq`,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return <JsonLd data={[business, website, faqPage]} />;
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
