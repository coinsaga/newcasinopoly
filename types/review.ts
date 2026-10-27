/** Structured review facts only; editorial analysis stays in the MDX document. */
export interface OperatorReviewData {
  logo: {
    src: string;
    width: number;
    height: number;
    background: string;
  };
  category: string;
  /** An attributed legacy value, not a newly calculated editorial score. */
  legacyRating?: {
    value: number;
    max: number;
    sourceId: string;
  };
  payments: readonly {
    method: string;
    deposit: string;
    withdrawal: string;
    note: string;
  }[];
  withdrawalMinimumZar: number | null;
  withdrawalFeeNote: string;
  offer: {
    matchPercent: number;
    maxBonusZar: number;
    qualifyingDepositZar: number;
    validityDays: number;
    termsComplete: boolean;
    sourceId: string;
  };
  support: {
    email: string;
    phone: string;
    liveChat: boolean;
    hours: string | null;
    sourceId: string;
  };
  sources: readonly {
    id: string;
    label: string;
    url: string;
    /** YYYY-MM-DD; for legacy material this records retrieval, not fact verification. */
    checkedAt: string;
    kind: "legacy" | "operator" | "regulator";
  }[];
}
