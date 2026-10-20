import Link from "next/link";

import { reviews } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Operator reviews",
  description:
    "Operator reviews for South African readers, with licensing, terms and payment information checked before publication.",
  path: "/reviews",
  index: reviews.length > 0,
});

export default function ReviewsPage() {
  return (
    <main id="main-content" className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-6 sm:py-16">
      <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
        Make an informed choice
      </p>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">Operator reviews</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        A clear look at licensing, account terms and payments for South African readers.
      </p>

      {reviews.length > 0 ? (
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {reviews.map((review) => (
            <article key={review.slug} className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <h2 className="text-xl font-semibold leading-snug">
                <Link href={`/reviews/${review.slug}`} className="hover:text-primary hover:underline">
                  {review.title}
                </Link>
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{review.description}</p>
              <Link
                href={`/reviews/${review.slug}`}
                aria-label={`Read: ${review.title}`}
                className="mt-5 inline-flex min-h-11 items-center font-medium text-primary underline underline-offset-4"
              >
                Read review <span aria-hidden="true" className="ml-2">→</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h2 className="text-xl font-semibold">No operator reviews published yet</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
            Each review needs an operator and product check before publication. In
            the meantime, our guides explain what to look for before opening an account.
          </p>
          <Link
            href="/guides/check-an-operator"
            className="mt-5 inline-flex min-h-11 items-center font-medium text-primary underline underline-offset-4"
          >
            Learn how to check an operator
          </Link>
        </div>
      )}
    </main>
  );
}
