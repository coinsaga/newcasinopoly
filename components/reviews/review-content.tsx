import type { ReactNode } from "react";
import type { MDXComponents } from "mdx/types";
import { ArrowIcon, CheckIcon, ChevronIcon } from "@/components/icons";
import type { OperatorReviewData } from "@/types/review";
import styles from "./review.module.css";

export function formatRand(amount: number): string {
  return `R${new Intl.NumberFormat("en-ZA", { useGrouping: true }).format(amount).replace(/\s/g, ",")}`;
}

export function formatReviewDate(value: string): string {
  return new Intl.DateTimeFormat("en-ZA", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));
}

export function ReviewSection({ id, number, title, children }: { id: string; number: string; title: string; children: ReactNode }) {
  return <section id={id} className={styles.section} aria-labelledby={`${id}-heading`}><header className={styles.sectionHeading}><span>{number}</span><h2 id={`${id}-heading`}>{title}</h2></header><div className={styles.prose}>{children}</div></section>;
}

function ReviewVerdict({ positives, considerations }: { positives: readonly string[]; considerations: readonly string[] }) {
  return <div className={styles.verdict}><div><h3>What stands out</h3><ul>{positives.map((item) => <li key={item}><CheckIcon /><span>{item}</span></li>)}</ul></div><div><h3>Keep in mind</h3><ul>{considerations.map((item) => <li key={item}><span className={styles.cautionDot} aria-hidden="true">−</span><span>{item}</span></li>)}</ul></div></div>;
}

function PaymentTable({ profile }: { profile: OperatorReviewData }) {
  const source = profile.sources.find((item) => item.id === "terms");
  return <div>
    <div className={styles.tableScroll} tabIndex={0} role="region" aria-label="Deposit and withdrawal methods">
      <table><caption>Methods named in the operator’s payment terms</caption><thead><tr><th scope="col">Method</th><th scope="col">Deposits</th><th scope="col">Withdrawals</th></tr></thead><tbody>{profile.payments.map((payment) => <tr key={payment.method}><th scope="row">{payment.method}</th><td>{payment.deposit}</td><td>{payment.withdrawal}</td></tr>)}</tbody></table>
    </div>
    <div className={styles.paymentSummary}><div><span>Minimum withdrawal</span><strong>{profile.withdrawalMinimumZar === null ? "Not confirmed" : formatRand(profile.withdrawalMinimumZar)}</strong></div><p>{profile.withdrawalFeeNote}</p></div>
    <ul className={styles.paymentNotes}>{profile.payments.map((payment) => <li key={payment.method}><strong>{payment.method}:</strong> {payment.note}</li>)}</ul>
    {source && <a href={source.url} className={styles.sourceLink}>Payment terms · checked {formatReviewDate(source.checkedAt)} <ArrowIcon /></a>}
  </div>;
}

function OfferDetails({ profile }: { profile: OperatorReviewData }) {
  const source = profile.sources.find((item) => item.id === profile.offer.sourceId);
  return <div className={styles.offerDetails}><dl><div><dt>Advertised match</dt><dd>{profile.offer.matchPercent}%</dd></div><div><dt>Maximum bonus</dt><dd>{formatRand(profile.offer.maxBonusZar)}</dd></div><div><dt>Qualifying deposit</dt><dd>From {formatRand(profile.offer.qualifyingDepositZar)}</dd></div><div><dt>Advertised duration</dt><dd>{profile.offer.validityDays} days</dd></div></dl>
    {!profile.offer.termsComplete && <p className={styles.offerWarning}>The headline is listed on the operator’s promotions page. Full wagering, game-contribution and withdrawal conditions still need verification.</p>}
    {source && <a href={source.url} className={styles.sourceLink}>View the operator’s promotion page <ArrowIcon /></a>}
  </div>;
}

function ReviewFaq({ items }: { items: readonly { question: string; answer: string }[] }) {
  return <div className={styles.faq}>{items.map((item) => <details key={item.question}><summary>{item.question}<ChevronIcon /></summary><p>{item.answer}</p></details>)}</div>;
}

function ReviewSources({ profile }: { profile: OperatorReviewData }) {
  return <ol className={styles.sources}>{profile.sources.map((source) => <li key={source.id}><div><span className={styles.sourceKind}>{source.kind === "legacy" ? "Earlier review" : source.kind === "regulator" ? "Regulator" : "Operator"}</span><a href={source.url}>{source.label}<ArrowIcon /></a></div><span>{source.kind === "legacy" ? "Retrieved" : "Checked"} <time dateTime={source.checkedAt}>{formatReviewDate(source.checkedAt)}</time></span></li>)}</ol>;
}

/** Data-bound blocks keep changing commercial facts out of the editorial MDX. */
export function createReviewComponents(profile: OperatorReviewData): MDXComponents {
  return {
    ReviewSection,
    ReviewVerdict,
    ReviewFaq,
    PaymentTable: () => <PaymentTable profile={profile} />,
    OfferDetails: () => <OfferDetails profile={profile} />,
    ReviewSources: () => <ReviewSources profile={profile} />,
  };
}
