import type { ReactNode } from "react";
import { getCasinoBySlug } from "@/data/casinos";
import { resolveAffiliateDestination } from "@/lib/affiliate";

/** A normal anchor prevents Next.js from prefetching a tracked redirect. */
export function AffiliateLink({ slug, children, className }: {
  slug: string;
  children: ReactNode;
  className?: string;
}) {
  if (!resolveAffiliateDestination(getCasinoBySlug(slug))) return null;
  return <a href={`/go/${encodeURIComponent(slug)}`} rel="sponsored nofollow" className={className}>{children}</a>;
}
