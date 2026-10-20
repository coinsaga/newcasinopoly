import CheckAnOperator from "@/content/guides/check-an-operator.mdx";
import UnderstandOfferTerms from "@/content/guides/understand-offer-terms.mdx";
import { getPublishedCasinos } from "@/data/casinos";
import type { EditorialEntry } from "@/types/content";

/** Explicit imports are compiled at build time; no filesystem or MDX evaluation at runtime. */
export const guides = [
  {
    slug: "check-an-operator",
    title: "Check an operator before you sign up",
    description:
      "Check the legal entity, South African licensing information, payment terms and account safeguards before registering.",
    updatedAt: "2026-10-20",
    Component: CheckAnOperator,
  },
  {
    slug: "understand-offer-terms",
    title: "Read the terms before you claim an offer",
    description:
      "Understand eligibility, rand amounts, wagering requirements and withdrawal conditions before accepting a betting offer.",
    updatedAt: "2026-10-20",
    Component: UnderstandOfferTerms,
  },
] as const satisfies readonly EditorialEntry[];

// Add a static MDX import and an entry only after editorial and operator checks.
// Review slugs must match the stable operator slug in data/casinos.ts.
// content/reviews/_template.mdx is deliberately absent from this registry.
const reviewEntries: readonly EditorialEntry[] = [];

const publishedOperatorSlugs = new Set(
  getPublishedCasinos().map((casino) => casino.slug),
);

/** Both editorial publication and the operator's verification gate must pass. */
export const reviews: readonly EditorialEntry[] = reviewEntries.filter((review) =>
  publishedOperatorSlugs.has(review.slug),
);

export function getGuideBySlug(slug: string): EditorialEntry | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export function getReviewBySlug(slug: string): EditorialEntry | undefined {
  return reviews.find((review) => review.slug === slug);
}
