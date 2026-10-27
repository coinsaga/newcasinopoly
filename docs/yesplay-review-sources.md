# YesPlay review: sources and editorial decisions

Checked on **22 October 2026**. This is a draft for the review template, without
an affiliate destination, current editorial rating or claim of firsthand testing.
Metadata, licensing identifiers, payments and changing offer details belong to
the structured data maintained by the root implementation.

## Source ledger

| Source | Use and limits |
| --- | --- |
| [Earlier Casinopoly review](https://casinopoly.io/casino/yesplay/) | User-owned starting material. Successfully retrieved directly with curl in the root research pass; indexed text was also available. Supplies legacy context and the attributed 4.3/5 score, not evidence of current terms. |
| [Original YesPlay logo](https://casinopoly.io/wp-content/uploads/2026/01/Yesplay.webp) | Retrieved from the existing Casinopoly site and stored locally as `public/operators/yesplay.webp` (public URL `/operators/yesplay.webp`), 205 × 88 px. No remote image request is needed when the review renders. |
| [NGB verified operators](https://www.ngb.org.za/verified-operators/) | Regulator check for SA Sportsbook (Pty) Ltd t/a YesPlay, Western Cape bookmaker. Root/research verification records the current identifier in structured data. The listing does not establish authorisation of every title. |
| [YesPlay homepage](https://yesplay.bet/) | Current navigation and visible listings: Sports, Slots, Lucky Numbers, Casino Games and BetGames; examples of sports and suppliers. Observed listings do not prove game fairness or regulatory approval. |
| [YesPlay terms](https://yesplay.bet/terms) | Bookmaker identity, verification, withdrawal conditions and official support channels. Revision 2.10, dated 16 February 2026. Terms describe email and website live chat as the authorised support routes. |
| [YesPlay contact page](https://yesplay.bet/contact-us) | Confirms live chat and support email. The page also lists a phone number and mentions social media; these are not repeated because the current terms define a narrower authorised-channel list. |
| [YesPlay mobile page](https://yesplay.bet/mobile) | Operator-published Android and Apple installation instructions. No independent app-store, download, device or performance test was carried out. |
| [YesPlay promotions](https://yesplay.bet/promotions) | Research verified the current welcome announcement, but not complete promotion-specific terms. A qualifying promotional deposit must not become the general minimum deposit. Do not infer wagering, contribution percentages or a cashable bonus from the banner. |
| [YesPlay responsible gambling policy](https://yesplay.bet/responsible-gambling-policy) | Operator procedure for exclusion, national self-exclusion and account history. Body marked last updated 24 October 2022: do not convert its wording into a guarantee that tools have been tested. No helpline numbers reproduced. |
| [NGB enforcement guidance](https://www.ngb.org.za/industry-regulation/enforcement/) | Context for the distinction between prohibited online gambling and licensed online betting. Avoid treating the marketing category “casino” as a regulatory classification. |

## Legacy claims not carried forward as current facts

- The previous 4.3/5 rating is historical context only. No new score, user rating
  or Review/AggregateRating schema is justified by this rewrite.
- “Trusted”, “safe”, “reliable” and “fully licensed casino” are not retained as
  conclusions. Use the verified bookmaker identity and explain its limits.
- The earlier instant-payout threshold, withdrawal windows, cashback percentage,
  welcome amount and other banking limits are not repeated in MDX. Current
  numbers require a dated primary source and remain in the data components.
- “24/7” support, tested performance, verified fairness, audited RTP and claims
  about missing games or payment methods are not inferred from the old review.
- No provider or game is described as authorised solely because it appears in
  navigation or is covered by the operator's fixed-odds wording.

## Content contract

`content/reviews/yesplay.mdx` supplies the narrative and numbered sections.
`PaymentTable`, `OfferDetails` and `ReviewSources` render current structured
facts without duplicating amounts, licence numbers or source dates in the prose.
`ReviewVerdict` uses `positives` and `considerations`; `ReviewFaq` uses question
and answer strings. Components are passed through MDX props; the MDX file imports
no application files. Publication and operator-verification gates remain outside
the editorial file.

The real route is `app/reviews/[slug]/page.tsx`. `reviewPages` admits this draft
only while `site.designPreview` is enabled; `reviews` contains published entries
whose operator also passes publication checks. The draft has no affiliate CTA,
stays noindex and is excluded from the sitemap. It emits BreadcrumbList only;
Article markup is reserved for published reviews. The attributed legacy score
does not produce Review or AggregateRating markup.

## Before publication

Recheck the source ledger, obtain product-specific licence clarification where
needed, and resolve any inconsistent payment, promotion or support statements.
Record the actual checks performed. Keep this page a draft/noindex until the
root publication gate is deliberately enabled; the template preview is not an
affiliate recommendation.

The research pass confirmed the NGB bookmaker match and current operator terms.
It left withdrawal speed, a general deposit minimum, method-specific minimums,
wallets and full welcome-offer wagering conditions unconfirmed. The NGB and
operator contact pages use different street addresses; no street address is
included in this review. No registration, deposit, support contact or affiliate
click was performed.
