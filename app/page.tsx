import Image from "next/image";
import Link from "next/link";
import { CasinoComparison } from "@/components/casino-comparison";
import { ArrowIcon, BookIcon, CardIcon, ClipboardIcon, ScaleIcon, ShieldIcon } from "@/components/icons";
import { createMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata = createMetadata({
  title: "Compare operators in South Africa",
  description: "Compare payment options, features and reviews with Casinopoly. Explore our South African operator comparison design preview.",
  path: "/",
  index: false,
});

const promises = [
  { title: "Licensing information", text: "Clear information about operator licensing and regulation.", icon: ShieldIcon, href: "/guides/check-an-operator" },
  { title: "Clear comparisons", text: "Unbiased reviews and side-by-side comparisons.", icon: ScaleIcon, href: "/about" },
  { title: "Responsible play", text: "Tools and information for a safer gambling experience.", icon: BookIcon, href: "/responsible-gambling" },
];
const information = [
  { title: "Licence information", text: "Clear information about operator licensing and regulation.", icon: ShieldIcon, href: "/guides/check-an-operator" },
  { title: "Transparent scoring", text: "Understand our approach to reviews and comparisons.", icon: ClipboardIcon, href: "/about" },
  { title: "Payment comparisons", text: "Compare payment methods available to South African players.", icon: CardIcon, href: "#payment-methods" },
];

export default function HomePage() {
  return (
    <main id="main-content" className={styles.home}>
      <section className={styles.hero} aria-labelledby="home-heading">
        <div className={`site-container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <span className={styles.goldLine} aria-hidden="true" />
            <h1 id="home-heading">Compare licensed operators<br />in South Africa</h1>
            <p>Compare payment options, features and reviews in one place.</p>
            <Link href="#compare" className={styles.heroButton}>View operator comparison <ArrowIcon /></Link>
          </div>
          <div className={styles.heroArt} aria-hidden="true">
            <svg className={styles.boardPattern} viewBox="0 0 500 360" fill="none">
              <path d="M490 54h-81c-50 0-70 35-70 70v64c0 46-40 51-88 51h-28c-56 0-80 29-80 64s29 61 82 61h160" stroke="currentColor" strokeWidth="44" />
              <path d="M452 22v65M404 22v65M360 75l42 36M307 130h65M307 183h65M276 210v65M218 210v65M141 245l55 28M111 302h66M164 331l-29 49M225 331v57M279 331v57M333 331v57" stroke="#073f76" strokeWidth="4" />
              <g transform="translate(190 12) rotate(43)"><rect width="68" height="68" rx="8" fill="currentColor" /><g fill="#073f76"><circle cx="18" cy="18" r="6" /><circle cx="50" cy="18" r="6" /><circle cx="34" cy="34" r="6" /><circle cx="18" cy="50" r="6" /><circle cx="50" cy="50" r="6" /></g></g>
            </svg>
            <Image src="/brand/casinopoly-hero-v2.webp" alt="" width={1254} height={1254} priority sizes="(max-width: 740px) 250px, 380px" className={styles.mascot} />
          </div>
        </div>
      </section>
      <div className="site-container">
        <div className={styles.promiseStrip}>
          {promises.map(({ title, text, icon: Icon, href }) => (
            <Link key={title} href={href} className={styles.promise}>
              <Icon /><div><h2>{title}</h2><p>{text}</p></div>
            </Link>
          ))}
        </div>
        <div className={styles.comparison}><CasinoComparison /></div>
        <aside className={styles.informationStrip} aria-label="More about our comparisons">
          {information.map(({ title, text, icon: Icon, href }) => (
            <Link key={title} href={href} className={styles.information}>
              <span className={styles.informationIcon}><Icon /></span>
              <div><h2>{title}</h2><p>{text}</p></div>
            </Link>
          ))}
        </aside>
      </div>
    </main>
  );
}
