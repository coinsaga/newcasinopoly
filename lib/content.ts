import CheckAnOperator from "@/content/guides/check-an-operator.mdx";
import UnderstandOfferTerms from "@/content/guides/understand-offer-terms.mdx";
import YesPlayReview from "@/content/reviews/yesplay.mdx";
import { getPublishedCasinos } from "@/data/casinos";
import { site } from "@/lib/site";
import type { EditorialEntry, ReviewEntry } from "@/types/content";

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

// Drafts are rendered only while the site's explicit design-preview mode is on.
// Publication still requires both editorial approval and the operator gate.
const reviewEntries: readonly ReviewEntry[] = [
  {
    slug: "yesplay",
    title: "YesPlay review",
    description: "A closer look at YesPlay’s rand payments, betting options and welcome-offer terms for South African readers.",
    updatedAt: "2026-10-22",
    status: "draft",
    author: "Casinopoly editorial team",
    Component: YesPlayReview,
  },
];

const publishedOperatorSlugs = new Set(
  getPublishedCasinos().map((casino) => casino.slug),
);

/** Both editorial publication and the operator's verification gate must pass. */
export const reviews: readonly ReviewEntry[] = reviewEntries.filter((review) =>
  review.status === "published" && publishedOperatorSlugs.has(review.slug),
);

export const reviewPages: readonly ReviewEntry[] = reviewEntries.filter((review) =>
  reviews.includes(review) || (site.designPreview && review.status === "draft"),
);

export function getReviewPageBySlug(slug: string): ReviewEntry | undefined {
  return reviewPages.find((review) => review.slug === slug);
}

export function getGuideBySlug(slug: string): EditorialEntry | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export function getReviewBySlug(slug: string): EditorialEntry | undefined {
  return reviews.find((review) => review.slug === slug);
}
