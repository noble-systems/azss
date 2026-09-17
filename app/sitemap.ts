import type { MetadataRoute } from "next";
import { brand } from "@/content/site";

/**
 * Two pages, so a hand-written list. lastModified is the build time: the
 * page is static, and a rebuild is the only way it changes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const built = new Date();
  return [
    {
      url: brand.domain,
      lastModified: built,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${brand.domain}/privacy`,
      lastModified: built,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
