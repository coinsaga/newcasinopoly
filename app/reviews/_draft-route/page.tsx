import { notFound } from "next/navigation";

import { EditorialLayout } from "@/components/editorial-layout";
import { getReviewBySlug, reviews } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

// Next ignores this private folder. Rename it to [slug] only after adding the
// first published review; static export requires at least one generated slug.
interface ReviewPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;
export const dynamic = "force-static";

export function generateStaticParams() {
  return reviews.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ReviewPageProps) {
  const { slug } = await params;
  const review = getReviewBySlug(slug);

  if (!review) notFound();

  return createMetadata({
    title: review.title,
    description: review.description,
    path: `/reviews/${review.slug}`,
  });
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { slug } = await params;
  const review = getReviewBySlug(slug);

  if (!review) notFound();

  const Content = review.Component;

  return (
    <EditorialLayout entry={review} section="reviews">
      <Content />
    </EditorialLayout>
  );
}
