import type { OperatorReviewData } from "./review.ts";

export type Casino = {
  /** Stable lowercase URL identifier shared with the MDX review. */
  slug: string;
  name: string;
  legalName?: string;
  status: "draft" | "published";
  currency: "ZAR";
  /** Include only payment methods verified for South African customers. */
  paymentMethods: readonly string[];
  licence: {
    authority: string;
    number: string;
    /** Products explicitly covered by the verified local authorisation. */
    products: readonly string[];
    sourceUrl: string;
    /** Verification date in YYYY-MM-DD format. */
    verifiedAt: string;
  };
  affiliate: {
    enabled: boolean;
    /** Full HTTPS destination; never take this URL from request parameters. */
    url: string;
    /** Exact hostnames only, without schemes, ports or wildcard patterns. */
    allowedHosts: readonly string[];
  };
  review?: OperatorReviewData;
};
