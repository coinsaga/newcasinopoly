import Link from "next/link";
import type { ReactNode } from "react";

import { absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site";
import type { EditorialEntry } from "@/types/content";

interface EditorialLayoutProps {
  entry: EditorialEntry;
  section: "guides" | "reviews";
  children: ReactNode;
}

export function EditorialLayout({
  entry,
  section,
  children,
}: EditorialLayoutProps) {
  const sectionName = section === "guides" ? "Guides" : "Reviews";
  const path = `/${section}/${entry.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${absoluteUrl(path)}#article`,
        headline: entry.title,
        description: entry.description,
        dateModified: entry.updatedAt,
        inLanguage: "en-ZA",
        mainEntityOfPage: absoluteUrl(path),
        publisher: {
          "@type": "Organization",
          name: site.name,
          url: site.url,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          {
            "@type": "ListItem",
            position: 2,
            name: sectionName,
            item: absoluteUrl(`/${section}`),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: entry.title,
            item: absoluteUrl(path),
          },
        ],
      },
    ],
  };
  const updatedDate = new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${entry.updatedAt}T00:00:00Z`));

  return (
    <main id="main-content" className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-6 sm:py-16">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <li>
            <Link href="/" className="hover:text-foreground hover:underline">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={`/${section}`} className="hover:text-foreground hover:underline">
              {sectionName}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">
            {entry.title}
          </li>
        </ol>
      </nav>

      <article>
        <header className="mb-10 border-b border-border pb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            {sectionName === "Guides" ? "Practical guide" : "Operator review"}
          </p>
          <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {entry.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {entry.description}
          </p>
          <p className="mt-5 text-sm text-muted-foreground">
            Updated <time dateTime={entry.updatedAt}>{updatedDate}</time>
          </p>
        </header>
        <div className="prose">{children}</div>
      </article>

      <div className="mt-12 border-t border-border pt-6">
        <Link
          href={`/${section}`}
          className="inline-flex min-h-11 items-center font-medium text-primary underline underline-offset-4"
        >
          Browse all {section}
        </Link>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </main>
  );
}
