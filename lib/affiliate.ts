import type { Casino } from "../types/casino.ts";
import { isPublishedCasino } from "../data/casinos.ts";

/** Resolve a curated operator record. Request query parameters are never inputs. */
export function resolveAffiliateDestination(
  casino: Casino | undefined,
): URL | null {
  if (!isPublishedCasino(casino) || !casino.affiliate.enabled) {
    return null;
  }

  try {
    const destination = new URL(casino.affiliate.url);
    const allowed = casino.affiliate.allowedHosts.some(
      (hostname) => hostname.toLowerCase() === destination.hostname,
    );

    if (
      destination.protocol !== "https:" ||
      destination.username ||
      destination.password ||
      destination.port ||
      !allowed
    ) {
      return null;
    }

    return destination;
  } catch {
    return null;
  }
}

/** Suppress speculative browser/Next.js requests before redirecting or logging. */
export function isPrefetchRequest(headers: Headers): boolean {
  const purpose = [
    headers.get("purpose"),
    headers.get("sec-purpose"),
    headers.get("x-purpose"),
    headers.get("x-moz"),
  ].join(" ");

  return (
    /(?:^|[\s,;])(?:prefetch|prerender)(?:$|[\s,;])/i.test(purpose) ||
    headers.has("next-router-prefetch") ||
    headers.has("next-router-segment-prefetch")
  );
}
