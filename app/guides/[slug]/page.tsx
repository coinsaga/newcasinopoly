import { notFound } from "next/navigation";

import { EditorialLayout } from "@/components/editorial-layout";
import { getGuideBySlug, guides } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) notFound();

  return createMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
  });
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) notFound();

  const Content = guide.Component;

  return (
    <EditorialLayout entry={guide} section="guides">
      <Content />
    </EditorialLayout>
  );
}
