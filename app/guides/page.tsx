import Link from "next/link";

import { guides } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Guides for South African readers",
  description:
    "Practical guides to checking operators, understanding offer terms and making informed decisions in South Africa.",
  path: "/guides",
});

export default function GuidesPage() {
  return (
    <main id="main-content" className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-6 sm:py-16">
      <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
        Learn before you decide
      </p>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
        Guides for South African readers
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        Start with the checks that matter: who runs an operator, what its licence
        covers and what an offer actually requires.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {guides.map((guide) => (
          <article key={guide.slug} className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="text-xl font-semibold leading-snug">
              <Link href={`/guides/${guide.slug}`} className="hover:text-primary hover:underline">
                {guide.title}
              </Link>
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{guide.description}</p>
            <Link
              href={`/guides/${guide.slug}`}
              aria-label={`Read: ${guide.title}`}
              className="mt-5 inline-flex min-h-11 items-center font-medium text-primary underline underline-offset-4"
            >
              Read guide <span aria-hidden="true" className="ml-2">→</span>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
