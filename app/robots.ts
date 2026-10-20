import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (!site.indexable) return { rules: { userAgent: "*", disallow: "/" } };
  // /go responses carry X-Robots-Tag: noindex. Do not block crawlers from seeing it.
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
