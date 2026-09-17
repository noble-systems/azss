import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter_Tight } from "next/font/google";
import { brand, contact, seo } from "@/content/site";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const sans = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

/**
 * Icons, the share card, the sitemap, robots and the manifest all come from
 * file conventions in this folder (icon.svg, icon.png, apple-icon.png,
 * favicon.ico, opengraph-image.tsx, sitemap.ts, robots.ts, manifest.ts), so
 * nothing here points at them by hand.
 */
export const metadata: Metadata = {
  metadataBase: new URL(brand.domain),
  title: {
    default: seo.title,
    template: `%s | ${brand.name}`,
  },
  description: seo.description,
  applicationName: brand.name,
  keywords: [...seo.keywords],
  authors: [{ name: brand.name, url: brand.domain }],
  creator: brand.name,
  publisher: brand.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: brand.domain,
    siteName: brand.name,
    title: seo.title,
    description: seo.description,
    phoneNumbers: [contact.phoneHref.replace("tel:", "")],
    emails: [contact.email],
    countryName: "United States",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "events",
  classification: "Sound system rental",
  // Phone numbers are already links where they should be; stop iOS turning
  // every other run of digits into one.
  formatDetection: { telephone: false, email: false, address: false },
  other: {
    // Old-school local signals. Harmless, and a few directories still read
    // them. Coordinates are the city centre, not a street address.
    "geo.region": "US-AZ",
    "geo.placename": "Phoenix",
    "geo.position": "33.4484;-112.0740",
    ICBM: "33.4484, -112.0740",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0a09",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="antialiased">
        <a
          href="#main"
          className="bg-sun text-ink sr-only rounded-full px-5 py-3 focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
