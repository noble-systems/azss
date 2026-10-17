import type { MetadataRoute } from "next";
import { brand, serviceList } from "@/content/site";

/**
 * Hand-written, since there are only a few pages. lastModified is the build
 * time: every page is static, and a rebuild is the only way one changes.
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
    ...serviceList.map((page) => ({
      url: `${brand.domain}/${page.slug}`,
      lastModified: built,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${brand.domain}/privacy`,
      lastModified: built,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
