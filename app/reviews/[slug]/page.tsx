import { notFound } from "next/navigation";
import { getCasinoBySlug } from "@/data/casinos";
import { getReviewPageBySlug, reviewPages } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import { ReviewLayout } from "@/components/reviews/review-layout";
import { createReviewComponents } from "@/components/reviews/review-content";

interface ReviewPageProps { params: Promise<{ slug: string }>; }

export const dynamicParams = false;
export const dynamic = "force-static";

export function generateStaticParams() {
  return reviewPages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ReviewPageProps) {
  const { slug } = await params;
  const entry = getReviewPageBySlug(slug);
  if (!entry) notFound();
  return createMetadata({
    title: `${entry.title}: payments, offers & key details`,
    description: entry.description,
    path: `/reviews/${entry.slug}`,
    index: entry.status === "published",
  });
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { slug } = await params;
  const entry = getReviewPageBySlug(slug);
  const casino = getCasinoBySlug(slug);
  if (!entry || !casino?.review) notFound();
  const Content = entry.Component;
  return (
    <ReviewLayout entry={entry} casino={casino} profile={casino.review}>
      <Content components={createReviewComponents(casino.review)} />
    </ReviewLayout>
  );
}
