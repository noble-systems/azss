import { brand } from "@/content/site";

/** The @id every page's structured data points back at for the business. */
export const BUSINESS_ID = `${brand.domain}/#business`;
export const WEBSITE_ID = `${brand.domain}/#website`;

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        // JSON.stringify doesn't escape "<". Everything here is written in
        // this repo, but escaping it costs nothing.
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
