import type { MetadataRoute } from "next";
import { guides, reviews } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.indexable) return [];
  const staticPaths = ["/", "/guides", "/about", "/responsible-gambling"];
  if (reviews.length) staticPaths.push("/reviews");
  return [
    ...staticPaths.map((path) => ({ url: absoluteUrl(path) })),
    ...guides.map((entry) => ({ url: absoluteUrl(`/guides/${entry.slug}`), lastModified: entry.updatedAt })),
    ...reviews.map((entry) => ({ url: absoluteUrl(`/reviews/${entry.slug}`), lastModified: entry.updatedAt })),
  ];
}
