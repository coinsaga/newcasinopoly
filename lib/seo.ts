import type { Metadata } from "next";
import { site } from "@/lib/site";

export function absoluteUrl(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) {
    throw new Error("SEO paths must be site-relative and start with a single slash.");
  }
  return new URL(path, `${site.url}/`).toString();
}

export function createMetadata({ title, description, path, index = true }: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
}): Metadata {
  const canonical = absoluteUrl(path);
  const indexable = site.indexable && index;
  return {
    title: { absolute: `${title} | ${site.name}` },
    description,
    alternates: { canonical },
    robots: { index: indexable, follow: indexable },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      title: `${title} | ${site.name}`,
      description,
      url: canonical,
    },
    twitter: { card: "summary", title, description },
  };
}

export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
