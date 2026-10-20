import { getCasinoBySlug } from "../data/casinos.ts";
import {
  isPrefetchRequest,
  resolveAffiliateDestination,
} from "./affiliate.ts";

const responseHeaders = {
  "Cache-Control": "private, no-store, max-age=0",
  "X-Robots-Tag": "noindex, nofollow",
};

/** Runtime-independent handler shared by Pages Functions and future adapters. */
export async function handleAffiliateRequest(
  request: Request,
  slug: string,
  options: { recordEvent: boolean },
): Promise<Response> {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response(null, {
      status: 405,
      headers: { ...responseHeaders, Allow: "GET, HEAD" },
    });
  }

  if (isPrefetchRequest(request.headers)) {
    return new Response(null, { status: 204, headers: responseHeaders });
  }

  const destination = resolveAffiliateDestination(getCasinoBySlug(slug));

  if (!destination) {
    return new Response(null, { status: 404, headers: responseHeaders });
  }

  if (options.recordEvent && request.method === "GET") {
    // Temporary structured log hook: a redirect request is neither a unique
    // human click nor a conversion. Logs may be sampled or unavailable, and
    // bots/retries can inflate counts. No GA4 event or personal data is sent.
    try {
      console.info(
        JSON.stringify({
          event: "affiliate_redirect",
          casino_slug: slug,
          measurement: "redirect_request",
        }),
      );
    } catch {
      // Measurement failures must never block the affiliate destination.
    }
  }

  return new Response(null, {
    status: 302,
    headers: { ...responseHeaders, Location: destination.href },
  });
}
