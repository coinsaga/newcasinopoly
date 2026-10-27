import type { Casino } from "../types/casino.ts";

// Add operators only after verifying their South African products and licence.
// Commercial terms belong here; editorial copy belongs in content/reviews/.
export const casinos: readonly Casino[] = [
  {
    slug: "yesplay",
    name: "YesPlay",
    legalName: "SA Sportsbook (Pty) Ltd t/a YesPlay",
    status: "draft",
    currency: "ZAR",
    paymentMethods: ["Cards", "Instant EFT", "Bank transfer", "Ozow"],
    licence: {
      authority: "Western Cape Gambling and Racing Board",
      number: "10180204-013",
      products: ["Bookmaking"],
      sourceUrl: "https://www.ngb.org.za/verified-operators/",
      verifiedAt: "2026-10-22",
    },
    affiliate: {
      enabled: false,
      url: "",
      allowedHosts: [],
    },
    review: {
      logo: {
        src: "/operators/yesplay.webp",
        width: 205,
        height: 88,
        background: "#f9fafb",
      },
      category: "South African bookmaker",
      legacyRating: { value: 4.3, max: 5, sourceId: "legacy" },
      payments: [
        {
          method: "Cards",
          deposit: "Available; limits not confirmed",
          withdrawal: "Not confirmed",
          note: "Terms 1.6.13 allow a 5% administration fee on card deposits.",
        },
        {
          method: "Instant EFT",
          deposit: "Available; limits not confirmed",
          withdrawal: "Not confirmed",
          note: "Deposit route listed in operator terms; method-specific limits not confirmed.",
        },
        {
          method: "Bank transfer (EFT)",
          deposit: "Available; limits not confirmed",
          withdrawal: "Available; general minimum R100",
          note: "Own-name bank account required. Method-specific deposit limits not confirmed.",
        },
        {
          method: "Ozow",
          deposit: "Available; limits not confirmed",
          withdrawal: "Not confirmed",
          note: "Own-name deposit account required; method-specific limits not confirmed.",
        },
      ],
      withdrawalMinimumZar: 100,
      withdrawalFeeNote:
        "Two EFT withdrawals free each Monday–Sunday (SAST); R10 per additional request. Unused free withdrawals do not roll over.",
      offer: {
        matchPercent: 100,
        maxBonusZar: 3000,
        qualifyingDepositZar: 20,
        validityDays: 7,
        termsComplete: false,
        sourceId: "promotions",
      },
      support: {
        email: "support@yesplay.bet",
        phone: "0872500575",
        liveChat: true,
        hours: null,
        sourceId: "contact",
      },
      sources: [
        {
          id: "legacy",
          label: "Original Casinopoly review — retrieved, not independently reverified",
          url: "https://casinopoly.io/casino/yesplay/",
          checkedAt: "2026-10-22",
          kind: "legacy",
        },
        {
          id: "ngb",
          label: "National Gambling Board: verified operators",
          url: "https://www.ngb.org.za/verified-operators/",
          checkedAt: "2026-10-22",
          kind: "regulator",
        },
        {
          id: "terms",
          label: "YesPlay terms and conditions",
          url: "https://yesplay.bet/terms",
          checkedAt: "2026-10-22",
          kind: "operator",
        },
        {
          id: "homepage",
          label: "YesPlay website: product navigation and listings",
          url: "https://yesplay.bet/",
          checkedAt: "2026-10-22",
          kind: "operator",
        },
        {
          id: "mobile",
          label: "YesPlay mobile instructions",
          url: "https://yesplay.bet/mobile",
          checkedAt: "2026-10-22",
          kind: "operator",
        },
        {
          id: "regulations",
          label: "YesPlay regulations",
          url: "https://yesplay.bet/regulations",
          checkedAt: "2026-10-22",
          kind: "operator",
        },
        {
          id: "promotions",
          label: "YesPlay promotions — full offer terms not yet confirmed",
          url: "https://yesplay.bet/promotions",
          checkedAt: "2026-10-22",
          kind: "operator",
        },
        {
          id: "contact",
          label: "YesPlay contact details",
          url: "https://yesplay.bet/contact-us",
          checkedAt: "2026-10-22",
          kind: "operator",
        },
        {
          id: "responsible",
          label: "YesPlay responsible gambling policy",
          url: "https://yesplay.bet/responsible-gambling-policy",
          checkedAt: "2026-10-22",
          kind: "operator",
        },
      ],
    },
  },
];

/** Publication guard for complete, dated evidence; legal review stays manual. */
export function isPublishedCasino(casino: Casino | undefined): casino is Casino {
  if (
    !casino ||
    casino.status !== "published" ||
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(casino.slug) ||
    !casino.name.trim() ||
    !casino.licence.authority.trim() ||
    !casino.licence.number.trim() ||
    !casino.licence.products.length ||
    casino.licence.products.some((product) => !product.trim()) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(casino.licence.verifiedAt)
  ) {
    return false;
  }

  try {
    const source = new URL(casino.licence.sourceUrl);
    const date = new Date(`${casino.licence.verifiedAt}T00:00:00Z`);
    return (
      source.protocol === "https:" &&
      !source.username &&
      !source.password &&
      date.toISOString().slice(0, 10) === casino.licence.verifiedAt &&
      casino.licence.verifiedAt <= new Date().toISOString().slice(0, 10)
    );
  } catch {
    return false;
  }
}

export function getPublishedCasinos(): readonly Casino[] {
  return casinos.filter(isPublishedCasino);
}

export function getCasinoBySlug(slug: string): Casino | undefined {
  return casinos.find((casino) => casino.slug === slug);
}
