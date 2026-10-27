export type ComparisonPaymentCategory = "cards" | "instant-eft" | "e-wallets" | "eft";
export type ComparisonFeature =
  | "clear-payments"
  | "mobile"
  | "simple-navigation"
  | "multiple-payments"
  | "account-tools"
  | "account-controls";

export type ComparisonPreviewOperator = {
  slug: string;
  name: string;
  wordmark: string;
  logoColor: string;
  score: number;
  readerRating: number;
  minDepositZar: number;
  payments: readonly ComparisonPaymentCategory[];
  features: readonly ComparisonFeature[];
  featuredLayout: boolean;
};

export const comparisonPaymentLabels: Record<ComparisonPaymentCategory, string> = {
  cards: "Cards",
  "instant-eft": "Instant EFT",
  "e-wallets": "E-wallets",
  eft: "EFT",
};

export const comparisonFeatureLabels: Record<ComparisonFeature, string> = {
  "clear-payments": "Clear payment options",
  mobile: "Mobile-friendly experience",
  "simple-navigation": "Simple navigation",
  "multiple-payments": "Multiple payment options",
  "account-tools": "Helpful account tools",
  "account-controls": "Clear account controls",
};

// Design placeholders only: these scores, ratings and details describe no real operator.
// Keep this dataset separate from the published operator and editorial registries.
export const comparisonPreviewOperators: readonly ComparisonPreviewOperator[] = [
  {
    slug: "demo-operator-a",
    name: "Demo Operator A",
    wordmark: "A",
    logoColor: "#073e70",
    score: 9.4,
    readerRating: 4.7,
    minDepositZar: 50,
    payments: ["cards", "eft"],
    features: ["clear-payments", "mobile"],
    featuredLayout: true,
  },
  {
    slug: "demo-operator-b",
    name: "Demo Operator B",
    wordmark: "B",
    logoColor: "#efa51c",
    score: 9.2,
    readerRating: 4.6,
    minDepositZar: 100,
    payments: ["instant-eft", "e-wallets"],
    features: ["simple-navigation", "multiple-payments"],
    featuredLayout: false,
  },
  {
    slug: "demo-operator-c",
    name: "Demo Operator C",
    wordmark: "C",
    logoColor: "#45ad5b",
    score: 8.9,
    readerRating: 4.4,
    minDepositZar: 20,
    payments: ["cards", "e-wallets"],
    features: ["account-tools", "multiple-payments"],
    featuredLayout: false,
  },
  {
    slug: "demo-operator-d",
    name: "Demo Operator D",
    wordmark: "D",
    logoColor: "#3d4042",
    score: 8.7,
    readerRating: 4.3,
    minDepositZar: 200,
    payments: ["eft", "instant-eft"],
    features: ["account-controls", "mobile"],
    featuredLayout: false,
  },
];
