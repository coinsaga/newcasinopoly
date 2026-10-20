import { handleAffiliateRequest } from "../../lib/affiliate-handler.ts";

/** The subset of Cloudflare Pages' EventContext used by this function. */
type AffiliateFunctionContext = {
  request: Request;
  params: { casino: string | string[] };
};

function getSlug(context: AffiliateFunctionContext): string {
  // This single-segment route must never resolve a catch-all parameter array.
  return typeof context.params.casino === "string" ? context.params.casino : "";
}

// Pages serves the exported Next.js files; only /go/* needs a server function.
export async function onRequestGet(context: AffiliateFunctionContext) {
  return handleAffiliateRequest(context.request, getSlug(context), {
    recordEvent: true,
  });
}

export async function onRequestHead(context: AffiliateFunctionContext) {
  return handleAffiliateRequest(context.request, getSlug(context), {
    recordEvent: false,
  });
}

// Pages otherwise falls through to static assets for unsupported HTTP methods.
export async function onRequest(context: AffiliateFunctionContext) {
  return handleAffiliateRequest(context.request, getSlug(context), {
    recordEvent: context.request.method === "GET",
  });
}
