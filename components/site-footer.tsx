import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-inner">
        <Link href="/" className="footer-brand" aria-label="Casinopoly home">
          <Image src="/brand/casinopoly-logo.svg" width={911} height={201} alt="Casinopoly" className="brand-logo" />
        </Link>
        <Link href="/responsible-gambling" className="footer-responsible">
          <span className="age-mark">18+</span>
          <span>Play responsibly.<br />Gambling involves risk. Terms and conditions apply.</span>
        </Link>
        <nav aria-label="Footer navigation">
          <Link href="/privacy">Privacy</Link>
          <Link href="/about">About</Link>
          <Link href="/about#affiliate-disclosure">Affiliate disclosure</Link>
        </nav>
      </div>
    </footer>
  );
}
