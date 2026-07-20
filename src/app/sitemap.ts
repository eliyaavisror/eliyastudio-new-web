import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/architecture", "/visualizations", "/about", "/contact", "/accessibility", "/privacy"];
  const now = new Date();

  return paths.flatMap((path) =>
    routing.locales.map((locale) => {
      const url =
        locale === routing.defaultLocale
          ? `${siteConfig.url}${path}`
          : `${siteConfig.url}/${locale}${path}`;
      return {
        url,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: path === "" ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [
              l,
              l === routing.defaultLocale ? `${siteConfig.url}${path}` : `${siteConfig.url}/${l}${path}`,
            ])
          ),
        },
      };
    })
  );
}
