import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIcon, BookIcon, CardIcon, ChevronIcon, ShieldIcon } from "@/components/icons";
import { AffiliateLink } from "@/components/affiliate-link";
import { resolveAffiliateDestination } from "@/lib/affiliate";
import { absoluteUrl, jsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import type { Casino } from "@/types/casino";
import type { ReviewEntry } from "@/types/content";
import type { OperatorReviewData } from "@/types/review";
import { formatRand, formatReviewDate } from "./review-content";
import styles from "./review.module.css";

const navigation = [
  ["overview", "Overview"], ["payments", "Payments"], ["bonuses", "Offers & terms"],
  ["games", "Games & betting"], ["mobile", "Mobile & support"],
  ["safer-gambling", "Safer gambling"], ["faq", "FAQ"], ["sources", "Sources"],
] as const;

export function ReviewLayout({ entry, casino, profile, children }: {
  entry: ReviewEntry; casino: Casino; profile: OperatorReviewData; children: ReactNode;
}) {
  const draft = entry.status === "draft";
  const affiliateAvailable = !draft && Boolean(resolveAffiliateDestination(casino));
  const legacySource = profile.sources.find((source) => source.id === profile.legacyRating?.sourceId);
  const path = `/reviews/${entry.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Reviews", item: absoluteUrl("/reviews") },
          { "@type": "ListItem", position: 3, name: entry.title, item: absoluteUrl(path) },
        ],
      },
      ...(!draft ? [{
        "@type": "Article", headline: entry.title, description: entry.description,
        dateModified: entry.updatedAt, inLanguage: "en-ZA", mainEntityOfPage: absoluteUrl(path),
        author: { "@type": "Organization", name: entry.author },
        publisher: { "@type": "Organization", name: site.name, url: site.url },
      }] : []),
    ],
  };

  return (
    <main id="main-content" className={styles.page}>
      <div className={styles.hero}>
        <div className="site-container">
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <ol><li><Link href="/">Home</Link></li><li aria-hidden="true"><ChevronIcon /></li><li><Link href="/reviews">Operator reviews</Link></li><li aria-hidden="true"><ChevronIcon /></li><li aria-current="page">{casino.name}</li></ol>
          </nav>
          <div className={styles.heroInner}>
            <div className={styles.operatorLogo} style={{ background: profile.logo.background }}>
              <Image src={profile.logo.src} alt={`${casino.name} logo`} width={profile.logo.width} height={profile.logo.height} priority />
            </div>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>{profile.category}</p>
              <h1>{entry.title}</h1>
              <p className={styles.description}>{entry.description}</p>
              <div className={styles.byline}><span>{entry.author}</span><span aria-hidden="true">·</span><span>Updated <time dateTime={entry.updatedAt}>{formatReviewDate(entry.updatedAt)}</time></span></div>
            </div>
            {profile.legacyRating && legacySource && (
              <div className={styles.rating}>
                <span className={styles.ratingLabel}>Previous Casinopoly score</span>
                <div><strong>{profile.legacyRating.value.toFixed(1)}</strong><span> / {profile.legacyRating.max}</span><span className={styles.star} aria-hidden="true">★</span></div>
                <a href={legacySource.url}>From the earlier review <ArrowIcon /></a>
                <small>Not a new assessment</small>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="site-container">
        <div className={styles.factStrip}>
          <div><span className={styles.randIcon}>R</span><p><span>Account currency</span><strong>South African rand</strong></p></div>
          <div><ShieldIcon /><p><span>Register category</span><strong>{casino.licence.products.join(", ")}</strong></p></div>
          <div><CardIcon /><p><span>Payment options</span><strong>{casino.paymentMethods.length} listed methods</strong></p></div>
          <div><BookIcon /><p><span>Review approach</span><strong>Published sources</strong></p></div>
        </div>
        {draft && <p className={styles.draftNotice}><span aria-hidden="true">i</span><span><strong>REVIEW PREVIEW</strong> — Adapted from our earlier review. Editorial checks are in progress; affiliate offers are not active.</span></p>}
        <p className={styles.disclosure}>Advertising disclosure: We may earn a commission from featured links. <Link href="/about#affiliate-disclosure">How we work</Link></p>
      </div>
      <div className={styles.sectionNavWrap}>
        <nav aria-label="On this page" className={`site-container ${styles.sectionNav}`}>
          {navigation.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>
      </div>
      <div className={`site-container ${styles.contentGrid}`}>
        <section className={styles.offerCard} aria-labelledby="offer-card-heading">
          <p className={styles.offerEyebrow}>Advertised welcome offer</p>
          <h2 id="offer-card-heading"><span>{profile.offer.matchPercent}%</span> up to <strong>{formatRand(profile.offer.maxBonusZar)}</strong></h2>
          <p className={styles.offerSubtitle}>Qualifying deposit from {formatRand(profile.offer.qualifyingDepositZar)}</p>
          <p className={styles.termsBadge}>{profile.offer.termsComplete ? "Read the offer-specific terms" : "Full offer terms under review"}</p>
          {affiliateAvailable ? <AffiliateLink slug={casino.slug} className={styles.goldButton}>Visit {casino.name}<ArrowIcon /></AffiliateLink> : <a href="#bonuses" className={styles.goldButton}>Read offer conditions<ArrowIcon /></a>}
          <p className={styles.offerFinePrint}>18+ · Eligibility and wagering conditions apply.<br />An advertised offer is not a recommendation.</p>
        </section>
        <article className={styles.article} aria-label={`${casino.name} review`}>{children}</article>
        <aside className={styles.sidebar} aria-label={`${casino.name} key details`}>
          <div className={styles.sidebarStack}>
            <section className={styles.sidebarCard} aria-labelledby="operator-details-heading">
              <h2 id="operator-details-heading"><ShieldIcon />Operator details</h2>
              <dl>
                {casino.legalName && <div><dt>Registered business</dt><dd>{casino.legalName}</dd></div>}
                <div><dt>Licensing authority</dt><dd>{casino.licence.authority}</dd></div>
                <div><dt>Licence number</dt><dd>{casino.licence.number}</dd></div>
                <div><dt>Listed activity</dt><dd>{casino.licence.products.join(", ")}</dd></div>
              </dl>
              <a href={casino.licence.sourceUrl} className={styles.sourceLink}>View the licence source <ArrowIcon /></a>
              <p className={styles.sidebarNote}>Register checked {formatReviewDate(casino.licence.verifiedAt)}. Product scope must be checked separately.</p>
            </section>
            <section className={styles.sidebarCard} aria-labelledby="support-heading">
              <h2 id="support-heading"><BookIcon />Contact & support</h2>
              <dl><div><dt>Email</dt><dd><a href={`mailto:${profile.support.email}`}>{profile.support.email}</a></dd></div><div><dt>Live chat</dt><dd>{profile.support.liveChat ? "Listed on the operator’s website" : "Not confirmed"}</dd></div></dl>
              <p className={styles.sidebarNote}>{profile.support.hours || "Support hours and response times have not been verified."}</p>
            </section>
            <Link href="/guides/check-an-operator" className={styles.guideLink}><ShieldIcon /><span>Before you sign up<strong>Your operator checklist <ArrowIcon /></strong></span></Link>
          </div>
        </aside>
      </div>
      <div className={`site-container ${styles.reviewEnd}`}><span className="age-mark">18+</span><p><strong>Keep gambling within your limits.</strong><br />Set a budget, take breaks and never chase losses.</p><Link href="/responsible-gambling">Responsible gambling <ArrowIcon /></Link></div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
    </main>
  );
}
