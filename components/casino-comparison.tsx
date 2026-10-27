"use client";

import { useId, useState } from "react";
import {
  comparisonFeatureLabels,
  comparisonPaymentLabels,
  comparisonPreviewOperators,
  type ComparisonFeature,
  type ComparisonPaymentCategory,
} from "../data/comparison-preview";
import styles from "./casino-comparison.module.css";

type PaymentFilter = "all" | ComparisonPaymentCategory;
type FeatureFilter = "all" | "saved" | ComparisonFeature;
type SortOrder = "score" | "deposit" | "name";
type IconName = "cards" | "instant-eft" | "e-wallets" | "eft" | "grid" | "deposit" | "filter" | "chart" | "chevron" | "arrow" | "bookmark" | "check" | "star" | "trophy";

const paymentChips: readonly { label: string; value: PaymentFilter; icon: IconName }[] = [
  { label: "All methods", value: "all", icon: "grid" },
  { label: "Cards", value: "cards", icon: "cards" },
  { label: "Instant EFT", value: "instant-eft", icon: "instant-eft" },
  { label: "E-wallets", value: "e-wallets", icon: "e-wallets" },
];

function Icon({ name, filled = false }: { name: IconName; filled?: boolean }) {
  const paths = {
    cards: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M7 15h4" /></>,
    "instant-eft": <path d="m13 2-8 12h6l-1 8 9-13h-6l1-7Z" />,
    "e-wallets": <><path d="M19 8V6a2 2 0 0 0-2-2H6a3 3 0 0 0-3 3v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8H6a1 1 0 0 1 0-2h10" /><path d="M21 12h-5v4h5" /><path d="M18 14h.01" /></>,
    eft: <><path d="m3 8 9-5 9 5H3Zm0 13h18M5 18V11m5 7V11m4 7V11m5 7V11" /></>,
    grid: <><rect x="3" y="3" width="6" height="6" rx=".5" /><rect x="15" y="3" width="6" height="6" rx=".5" /><rect x="3" y="15" width="6" height="6" rx=".5" /><rect x="15" y="15" width="6" height="6" rx=".5" /></>,
    deposit: <><ellipse cx="12" cy="5" rx="7" ry="3" /><path d="M5 5v5c0 4 14 4 14 0V5M5 10v5c0 4 14 4 14 0v-5M5 15v4c0 4 14 4 14 0v-4" /></>,
    filter: <path d="M3 5h18M6 11h12M10 17h4" />,
    chart: <><path d="M5 20V12m7 8V7m7 13V3" /></>,
    chevron: <path d="m7 10 5 5 5-5" />,
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    bookmark: <path d="M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17l-6-4-6 4Z" />,
    check: <path d="m5 12 4 4L19 6" />,
    star: <path d="m12 2 3 6.4 7 .9-5.1 4.9 1.3 7-6.2-3.4-6.2 3.4 1.3-7L2 9.3l7-.9L12 2Z" />,
    trophy: <><path d="M7 3h10v5a5 5 0 0 1-10 0V3Zm5 10v7m-4 1h8M7 5H3v3a4 4 0 0 0 5 4m9-7h4v3a4 4 0 0 1-5 4" /></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill={name === "star" || name === "instant-eft" || filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

export function CasinoComparison() {
  const id = useId();
  const [payment, setPayment] = useState<PaymentFilter>("all");
  const [deposit, setDeposit] = useState("all");
  const [feature, setFeature] = useState<FeatureFilter>("all");
  const [sort, setSort] = useState<SortOrder>("score");
  const [saved, setSaved] = useState<readonly string[]>([]);
  const [expanded, setExpanded] = useState<{ slug: string; mode: "operator" | "review" } | null>(null);

  const operators = comparisonPreviewOperators
    .filter((operator) =>
      (payment === "all" || operator.payments.includes(payment)) &&
      (deposit === "all" || operator.minDepositZar <= Number(deposit)) &&
      (feature === "all" || (feature === "saved" ? saved.includes(operator.slug) : operator.features.includes(feature))),
    )
    .sort((a, b) => sort === "deposit"
      ? a.minDepositZar - b.minDepositZar || b.score - a.score
      : sort === "name" ? a.name.localeCompare(b.name, "en-ZA") : b.score - a.score,
    );
  const hasFilters = payment !== "all" || deposit !== "all" || feature !== "all";

  function reset() {
    setPayment("all");
    setDeposit("all");
    setFeature("all");
    setSort("score");
    setExpanded(null);
  }

  function toggleSaved(slug: string) {
    setSaved((current) => current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]);
  }

  function toggleDetails(slug: string, mode: "operator" | "review") {
    setExpanded((current) => current?.slug === slug && current.mode === mode ? null : { slug, mode });
  }

  return (
    <section id="compare" aria-labelledby={`${id}-heading`} className={styles.section}>
      <header className={styles.headingBlock}>
        <h2 id={`${id}-heading`} className={styles.heading}>Find an operator that fits</h2>
        <span className={styles.goldUnderline} aria-hidden="true" />
        <p className={styles.disclosure}>Advertising disclosure: We may earn a commission from featured links.</p>
      </header>

      <p id={`${id}-notice`} className={styles.notice}>
        <span className={styles.noticeIcon} aria-hidden="true">i</span>
        <span><strong>DEMO PREVIEW</strong> — Operator names, scores and licence fields are placeholders.</span>
      </p>

      <div id="payment-methods" className={styles.toolbar} aria-describedby={`${id}-notice`}>
        <div className={styles.dropdowns}>
          <div className={styles.selectWrap}>
            <Icon name="cards" />
            <label className={styles.srOnly} htmlFor={`${id}-payment`}>Payment method</label>
            <select id={`${id}-payment`} value={payment} onChange={(event) => setPayment(event.target.value as PaymentFilter)}>
              <option value="all">Payment method</option>
              <option value="cards">Cards</option>
              <option value="instant-eft">Instant EFT</option>
              <option value="e-wallets">E-wallets</option>
              <option value="eft">EFT</option>
            </select>
            <span className={styles.chevron}><Icon name="chevron" /></span>
          </div>
          <div className={styles.selectWrap}>
            <Icon name="deposit" />
            <label className={styles.srOnly} htmlFor={`${id}-deposit`}>Minimum deposit</label>
            <select id={`${id}-deposit`} value={deposit} onChange={(event) => setDeposit(event.target.value)}>
              <option value="all">Minimum deposit</option>
              <option value="50">R50 or less</option>
              <option value="100">R100 or less</option>
              <option value="200">R200 or less</option>
            </select>
            <span className={styles.chevron}><Icon name="chevron" /></span>
          </div>
          <div className={styles.selectWrap}>
            <Icon name="filter" />
            <label className={styles.srOnly} htmlFor={`${id}-features`}>Features</label>
            <select id={`${id}-features`} value={feature} onChange={(event) => setFeature(event.target.value as FeatureFilter)}>
              <option value="all">Features</option>
              <option value="mobile">Mobile-friendly</option>
              <option value="multiple-payments">Multiple payment options</option>
              <option value="account-tools">Account tools</option>
              <option value="saved">Saved operators</option>
            </select>
            <span className={styles.chevron}><Icon name="chevron" /></span>
          </div>
          <div className={styles.sortGroup}>
            <label htmlFor={`${id}-sort`}>Sort by:</label>
            <div className={styles.selectWrap}>
              <Icon name="chart" />
              <select id={`${id}-sort`} value={sort} onChange={(event) => setSort(event.target.value as SortOrder)}>
                <option value="score">Editorial score</option>
                <option value="deposit">Lowest deposit</option>
                <option value="name">Operator name</option>
              </select>
              <span className={styles.chevron}><Icon name="chevron" /></span>
            </div>
          </div>
        </div>
        <div className={styles.chipRow}>
          <fieldset className={styles.chips}>
            <legend className={styles.srOnly}>Filter by payment method</legend>
            {paymentChips.map((chip) => (
              <button key={chip.value} type="button" aria-pressed={payment === chip.value} onClick={() => setPayment(chip.value)} className={`${styles.chip} ${payment === chip.value ? styles.activeChip : ""}`}>
                <Icon name={chip.icon} />{chip.label}
              </button>
            ))}
          </fieldset>
          {hasFilters && <button type="button" onClick={reset} className={styles.resetLink}>Reset filters</button>}
        </div>
      </div>
      <p className={styles.srOnly} role="status" aria-live="polite" aria-atomic="true">{operators.length} demo operators shown.</p>

      {operators.length ? (
        <>
          <div className={styles.columnHeadings} aria-hidden="true"><span>#</span><span>Operator</span><span>Our score</span><span>Why consider it</span><span>Payments</span><span>Explore</span></div>
          <div className={styles.list}>
            {operators.map((operator, index) => {
              const open = expanded?.slug === operator.slug;
              const detailsId = `${id}-${operator.slug}-details`;
              const isSaved = saved.includes(operator.slug);
              return (
                <article key={operator.slug} className={`${styles.card} ${operator.featuredLayout ? styles.featuredCard : ""}`} aria-labelledby={`${id}-${operator.slug}-name`}>
                  {operator.featuredLayout && <span className={styles.featuredBadge}><Icon name="trophy" />Top editorial score · demo</span>}
                  <div className={styles.row}>
                    <span className={styles.rank} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <div className={styles.identity}>
                      <span className={styles.wordmark} style={{ backgroundColor: operator.logoColor }} aria-hidden="true">{operator.wordmark}</span>
                      <div className={styles.identityText}>
                        <h3 id={`${id}-${operator.slug}-name`}>Demo<br />Operator {operator.wordmark}</h3>
                        <p>Licence details: placeholder</p>
                      </div>
                      <button type="button" className={styles.bookmark} aria-label={`${isSaved ? "Unsave" : "Save"} ${operator.name}`} aria-pressed={isSaved} onClick={() => toggleSaved(operator.slug)}><Icon name="bookmark" filled={isSaved} /></button>
                    </div>
                    <div className={styles.scoreBox}>
                      <p className={styles.score}><strong>{operator.score.toFixed(1)}</strong><span>/ 10</span><span className={styles.srOnly}> demo editorial score</span></p>
                      <div className={styles.readerBlock}><p className={styles.readerScore}><Icon name="star" /><span>{operator.readerRating.toFixed(1)} / 5</span></p><p className={styles.readerLabel}>Reader rating · demo</p></div>
                    </div>
                    <div className={styles.features}>
                      <ul>{operator.features.map((item) => <li key={item}><Icon name="check" /><span>{comparisonFeatureLabels[item]}</span></li>)}</ul>
                      <p>Illustrative features.</p>
                    </div>
                    <div className={styles.payments}>
                      <p className={styles.mobileLabel}>Example payments</p>
                      <ul aria-label={`${operator.name} illustrative payment methods`}>{operator.payments.map((method) => <li key={method}><Icon name={method} /><span>{comparisonPaymentLabels[method]}</span></li>)}</ul>
                    </div>
                    <div className={styles.actions}>
                      <button type="button" className={styles.exploreButton} aria-label={`Explore ${operator.name} sample details`} aria-expanded={open} aria-controls={detailsId} onClick={() => toggleDetails(operator.slug, "operator")}>Explore operator <span className={styles.diagonalArrow}><Icon name="arrow" /></span></button>
                      <button type="button" className={styles.reviewButton} aria-label={`Read the ${operator.name} illustrative review preview`} aria-expanded={open} aria-controls={detailsId} onClick={() => toggleDetails(operator.slug, "review")}>Read our review <Icon name="arrow" /></button>
                    </div>
                  </div>
                  <div id={detailsId} hidden={!open} className={styles.detailsPanel} role="region" aria-label={`${operator.name} illustrative preview`}>
                    <h4>{expanded?.mode === "review" ? "Illustrative review preview" : "Sample operator details"}</h4>
                    <p>This is a design placeholder, not a published review or a live recommendation. Scores, reader ratings, licence fields, features and payment methods are illustrative. No account or external offer opens from this preview.</p>
                    <dl><div><dt>Demo editorial score</dt><dd>{operator.score.toFixed(1)} / 10</dd></div><div><dt>Demo reader rating</dt><dd>{operator.readerRating.toFixed(1)} / 5</dd></div><div><dt>Illustrative minimum deposit</dt><dd>R{operator.minDepositZar}</dd></div><div><dt>Licence information</dt><dd>Placeholder — not verified</dd></div></dl>
                  </div>
                </article>
              );
            })}
          </div>
        </>
      ) : (
        <div className={styles.emptyState}><h3>No demo operators match these filters.</h3><p>Try a different payment method, deposit amount or feature.</p><button type="button" onClick={reset}>Reset filters <Icon name="arrow" /></button></div>
      )}
      <p className={styles.footnote}>Live listings will include verified licence and regulator details.</p>
    </section>
  );
}
