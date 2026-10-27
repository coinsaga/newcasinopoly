import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { getCasinoBySlug } from "@/data/casinos";
import { reviewPages, reviews } from "@/lib/content";
import { createMetadata } from "@/lib/seo";
import styles from "@/components/reviews/review.module.css";

export const metadata = createMetadata({
  title: "Operator reviews",
  description: "Explore Casinopoly’s operator reviews for South African readers: payment options, licensing information and offer conditions.",
  path: "/reviews",
  index: reviews.length > 0,
});

export default function ReviewsPage() {
  return (
    <main id="main-content" className={`flex-1 ${styles.page}`}>
      <header className={`site-container ${styles.indexHeader}`}>
        <p className="eyebrow">The details behind the comparison</p>
        <h1>Operator reviews</h1>
        <p>Take a closer look at payments, offer conditions and the information that matters before opening an account.</p>
      </header>
      <section className={`site-container ${styles.reviewList}`} aria-label="Available reviews">
        {reviewPages.map((entry) => {
          const casino = getCasinoBySlug(entry.slug);
          if (!casino?.review) return null;
          return <article key={entry.slug} className={styles.reviewCard}>
            <div className={styles.reviewCardTop}><Image src={casino.review.logo.src} alt={`${casino.name} logo`} width={casino.review.logo.width} height={casino.review.logo.height} />{entry.status === "draft" && <span className={styles.previewBadge}>Review preview</span>}</div>
            <div><h2><Link href={`/reviews/${entry.slug}`}>{entry.title}</Link></h2><p>{entry.description}</p></div>
            <Link href={`/reviews/${entry.slug}`} className={styles.goldButton}>{entry.status === "draft" ? "Explore the review preview" : "Read the review"}<ArrowIcon /></Link>
          </article>;
        })}
        {reviewPages.length === 0 && <p>Our operator reviews are in preparation.</p>}
      </section>
    </main>
  );
}
