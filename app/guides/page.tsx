import { GuideCards } from "@/components/guide-cards";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Guides for South African readers",
  description:
    "Practical guides to checking operators, understanding offer terms and making informed decisions in South Africa.",
  path: "/guides",
});

export default function GuidesPage() {
  return (
    <main id="main-content" className="flex-1">
      <header className="site-container page-intro">
        <p className="eyebrow">Guides for South African readers</p>
        <h1>A little knowledge. A better decision.</h1>
        <p>
          Start with the checks that matter: who runs an operator, what its
          licence covers and what an offer actually requires.
        </p>
      </header>

      <section
        aria-labelledby="guide-list-heading"
        className="site-container interior-guides"
      >
        <h2 id="guide-list-heading" className="sr-only">
          Practical guides
        </h2>
        <GuideCards />
      </section>
    </main>
  );
}
