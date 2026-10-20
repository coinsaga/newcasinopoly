import Link from "next/link";

import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-5 px-5 py-5 sm:px-8 sm:py-6">
        <Link
          href="/"
          aria-label={`${site.name} home`}
          className="inline-flex items-center gap-2.5 rounded-sm text-lg font-semibold tracking-tight transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          <span
            aria-hidden="true"
            className="grid size-7 grid-cols-2 gap-1"
          >
            <span className="rounded-[2px] bg-foreground" />
            <span className="rounded-[2px] bg-primary" />
            <span className="rounded-[2px] bg-foreground" />
            <span className="rounded-[2px] bg-foreground" />
          </span>
          {site.name}
        </Link>

        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-6 text-sm sm:gap-8">
            {[
              { href: "/guides", label: "Guides" },
              { href: "/reviews", label: "Reviews" },
              { href: "/about", label: "About" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-10 items-center rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
