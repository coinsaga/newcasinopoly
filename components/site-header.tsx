import Image from "next/image";
import Link from "next/link";
import { ChevronIcon, FlagZA } from "@/components/icons";
import { NavigationDropdown } from "@/components/navigation-dropdown";

const navigation = [
  { label: "Compare operators", links: [
    { label: "Operator comparison", href: "/#compare" },
    { label: "Operator reviews", href: "/reviews" },
    { label: "How we compare", href: "/about" },
  ] },
  { label: "Payment methods", links: [
    { label: "Compare payment methods", href: "/#payment-methods" },
    { label: "What to check before depositing", href: "/guides/check-an-operator" },
  ] },
  { label: "Guides", links: [
    { label: "All player guides", href: "/guides" },
    { label: "Check an operator", href: "/guides/check-an-operator" },
    { label: "Understand offer terms", href: "/guides/understand-offer-terms" },
  ] },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-container navigation">
        <Link href="/" className="brand-link" aria-label="Casinopoly home">
          <Image src="/brand/casinopoly-logo.svg" alt="Casinopoly" width={911} height={201} priority className="brand-logo" />
        </Link>
        <nav aria-label="Main navigation" className="main-nav">
          {navigation.map(({ label, links }) => (
            <NavigationDropdown key={label} className="nav-dropdown" name="desktop-navigation">
              <summary>{label}<ChevronIcon /></summary>
              <div className="nav-menu">
                {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
              </div>
            </NavigationDropdown>
          ))}
          <Link href="/responsible-gambling">Responsible gambling</Link>
        </nav>
        <span className="country-label" aria-label="South Africa, English">
          <FlagZA /><span>South Africa <span aria-hidden="true">|</span> EN</span>
        </span>
        <NavigationDropdown className="mobile-navigation">
          <summary aria-label="Open navigation"><span /><span /><span /></summary>
          <nav aria-label="Mobile navigation">
            <Link href="/#compare">Compare operators</Link>
            <Link href="/#payment-methods">Payment methods</Link>
            <Link href="/guides">Guides</Link>
            <Link href="/reviews">Operator reviews</Link>
            <Link href="/responsible-gambling">Responsible gambling</Link>
            <Link href="/about">About Casinopoly</Link>
          </nav>
        </NavigationDropdown>
      </div>
    </header>
  );
}
