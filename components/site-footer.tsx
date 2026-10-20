import Link from "next/link";

import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-12">
        <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-start">
          <div className="max-w-md">
            <Link
              href="/"
              className="rounded-sm text-lg font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              {site.name}
            </Link>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              An independent perspective for South African adults. Understand
              the details before you decide.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {[
                { href: "/about", label: "About & editorial policy" },
                { href: "/responsible-gambling", label: "Responsible gambling" },
                { href: "/privacy", label: "Privacy" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-10 items-center rounded-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-5 border-t border-border pt-6 sm:flex-row sm:items-start sm:gap-10">
          <p className="max-w-2xl text-xs leading-5 text-muted-foreground">
            We may earn a commission if you use an affiliate link on this site.
            Gambling involves risk and is not a way to make money. Only gamble
            with money you can afford to lose.
          </p>
          <p className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex size-9 items-center justify-center rounded-full border border-current font-semibold text-foreground">
              18+
            </span>
            South Africa
          </p>
        </div>
      </div>
    </footer>
  );
}
