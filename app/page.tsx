import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { guides } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Independent gambling guides for South Africa",
  description:
    "Clear, practical guides for South African adults. Understand operator checks, payment terms and responsible gambling before making a decision.",
  path: "/",
});

const principles = [
  {
    number: "01",
    title: "Check the operator",
    description:
      "Understand who runs the site, which authority licenses it and which products that licence covers.",
  },
  {
    number: "02",
    title: "Understand the terms",
    description:
      "Look beyond the headline. Read the payment rules, withdrawal conditions and any offer requirements.",
  },
  {
    number: "03",
    title: "Stay in control",
    description:
      "Set limits for your time and spending. Know when to stop and where to find support.",
  },
];

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "size-4"}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main id="main-content">
      <section
        aria-labelledby="home-heading"
        className="mx-auto max-w-6xl px-5 pb-14 pt-12 sm:px-8 sm:pb-20 sm:pt-20"
      >
        <p className="flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground sm:text-xs">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-foreground" />
          Independent guides · South Africa · 18+
        </p>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_16rem] lg:items-end lg:gap-12">
          <div>
            <h1
              id="home-heading"
              className="max-w-3xl text-[clamp(2.75rem,7vw,5.25rem)] font-medium leading-[1.04] tracking-[-0.055em]"
            >
              A clearer view.
              <br />
              A better-informed choice.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Gambling comes with questions worth asking. We help South African
              adults make sense of operator checks, payment terms and the details
              that matter.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/guides" className={buttonVariants()}>
                Browse the guides
                <Arrow />
              </Link>
              <Link
                href="/about"
                className={buttonVariants({ variant: "outline" })}
              >
                How we work
              </Link>
            </div>
          </div>

          <aside className="rounded-2xl border border-border bg-card p-6 lg:mb-0.5 lg:p-7">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              A local perspective
            </p>
            <p className="mt-5 text-2xl font-medium leading-tight tracking-tight">
              The details deserve your attention.
            </p>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              South African rules, rand payments and clear terms. Start with
              context before making a choice.
            </p>
            <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
              <span>Read. Check. Decide.</span>
              <span aria-hidden="true" className="text-lg font-medium text-foreground">
                ZA
              </span>
            </div>
          </aside>
        </div>
      </section>

      <section
        aria-label="Three things to consider before choosing an operator"
        className="border-y border-border"
      >
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-9 sm:px-8 sm:py-10 md:grid-cols-3 md:gap-8">
          {principles.map((principle) => (
            <div key={principle.number}>
              <p className="text-xs font-medium tabular-nums text-muted-foreground">
                {principle.number}
              </p>
              <h2 className="mt-3 text-lg font-medium tracking-tight">
                {principle.title}
              </h2>
              <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="guides-heading"
        className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20"
      >
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Build your understanding
            </p>
            <h2
              id="guides-heading"
              className="mt-3 text-3xl font-medium tracking-[-0.035em] sm:text-4xl"
            >
              A good place to start.
            </h2>
          </div>
          <Link
            href="/guides"
            className="inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            All guides <Arrow />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {guides.slice(0, 3).map((guide, index) => (
            <article key={guide.slug}>
              <Link
                href={`/guides/${guide.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:p-7"
              >
              <p className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                <span>Essential reading</span>
                <span aria-hidden="true" className="tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </p>
              <h3 className="mt-8 text-xl font-medium leading-snug tracking-tight underline-offset-4 group-hover:underline">
                {guide.title}
              </h3>
              <p className="mb-6 mt-3 text-sm leading-6 text-muted-foreground">
                {guide.description}
              </p>
              <span
                aria-hidden="true"
                className="mt-auto inline-flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
              >
                <Arrow />
              </span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="reviews-heading"
        className="mx-auto max-w-6xl px-5 pb-14 sm:px-8 sm:pb-20"
      >
        <div className="flex flex-col justify-between gap-6 rounded-2xl border border-border px-6 py-7 sm:flex-row sm:items-center sm:px-8 sm:py-8">
          <div className="max-w-xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Operator reviews
            </p>
            <h2
              id="reviews-heading"
              className="mt-3 text-xl font-medium tracking-tight sm:text-2xl"
            >
              Operator reviews are being prepared.
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              We are building a focused selection with clear criteria and
              information relevant to South Africa. No operator recommendations
              are published yet.
            </p>
          </div>
          <Link
            href="/reviews"
            className={buttonVariants({
              variant: "outline",
              className: "self-start sm:shrink-0",
            })}
          >
            About our reviews
            <Arrow />
          </Link>
        </div>
      </section>
    </main>
  );
}
