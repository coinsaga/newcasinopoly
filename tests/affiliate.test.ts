import assert from "node:assert/strict";
import test from "node:test";
import { onRequest, onRequestGet, onRequestHead } from "../functions/go/[casino].ts";
import { casinos, isPublishedCasino } from "../data/casinos.ts";
import { handleAffiliateRequest } from "../lib/affiliate-handler.ts";
import { isPrefetchRequest, resolveAffiliateDestination } from "../lib/affiliate.ts";
import type { Casino } from "../types/casino.ts";

function operator(overrides: Partial<Casino> = {}): Casino {
  return {
    slug: "test-operator",
    name: "Test fixture",
    status: "published",
    currency: "ZAR",
    paymentMethods: [],
    licence: {
      authority: "Test fixture",
      number: "TEST",
      products: ["Licensed test product"],
      sourceUrl: "https://regulator.example/licence",
      verifiedAt: "2020-01-01",
    },
    affiliate: {
      enabled: true,
      url: "https://affiliate.example/join?campaign=za",
      allowedHosts: ["affiliate.example"],
    },
    ...overrides,
  };
}

test("only a published operator with an enabled affiliate link can resolve", () => {
  assert.equal(resolveAffiliateDestination(undefined), null);
  assert.equal(resolveAffiliateDestination(operator({ status: "draft" })), null);
  const disabled = operator();
  disabled.affiliate.enabled = false;
  assert.equal(resolveAffiliateDestination(disabled), null);
  assert.equal(
    resolveAffiliateDestination(operator())?.href,
    "https://affiliate.example/join?campaign=za",
  );
});

test("publication requires valid dated licensing evidence and identified products", () => {
  assert.equal(isPublishedCasino(operator()), true);

  for (const licence of [
    { ...operator().licence, authority: " " },
    { ...operator().licence, number: "" },
    { ...operator().licence, products: [] },
    { ...operator().licence, sourceUrl: "http://regulator.example/licence" },
    { ...operator().licence, sourceUrl: "" },
    { ...operator().licence, verifiedAt: "2026-02-30" },
    { ...operator().licence, verifiedAt: "2999-01-01" },
  ]) {
    const candidate = operator({ licence });
    assert.equal(isPublishedCasino(candidate), false);
    assert.equal(resolveAffiliateDestination(candidate), null);
  }
});

test("destinations require HTTPS, exact allowed hosts and no credentials or custom port", () => {
  for (const url of [
    "http://affiliate.example/join",
    "javascript:alert(1)",
    "/relative-url",
    "https://affiliate.example.evil.example/join",
    "https://sub.affiliate.example/join",
    "https://affiliate.example@evil.example/join",
    "https://user:secret@affiliate.example/join",
    "https://affiliate.example:8443/join",
  ]) {
    const candidate = operator();
    candidate.affiliate.url = url;
    assert.equal(resolveAffiliateDestination(candidate), null, url);
  }

  const noAllowlist = operator();
  noAllowlist.affiliate.allowedHosts = [];
  assert.equal(resolveAffiliateDestination(noAllowlist), null);
});

test("prefetch and prerender requests are recognised without flagging normal navigation", () => {
  const samples: HeadersInit[] = [
    { purpose: "prefetch" },
    { "sec-purpose": "prefetch;prerender" },
    { "x-moz": "prefetch" },
    { "next-router-prefetch": "1" },
    { "next-router-segment-prefetch": "/_tree" },
  ];
  for (const headers of samples) {
    assert.equal(isPrefetchRequest(new Headers(headers)), true);
  }
  assert.equal(isPrefetchRequest(new Headers()), false);
  assert.equal(isPrefetchRequest(new Headers({ purpose: "navigate" })), false);
});

test("unknown slugs cannot redirect through untrusted URL query parameters", async () => {
  const request = new Request(
    "https://site.example/go/unknown?url=https://evil.example&redirect=https://evil.example",
  );
  const context = { request, params: { casino: "unknown" } };
  for (const handler of [onRequestGet, onRequestHead]) {
    const response = await handler(context);
    assert.equal(response.status, 404);
    assert.equal(response.headers.get("location"), null);
    assert.match(response.headers.get("cache-control") ?? "", /no-store/);
    assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow");
  }
});

test("prefetch stops before redirect lookup and does not emit an event", async (t) => {
  const log = t.mock.method(console, "info", () => {});
  const request = new Request("https://site.example/go/unknown", {
    headers: { "sec-purpose": "prefetch" },
  });
  const response = await onRequestGet({
    request,
    params: { casino: "unknown" },
  });
  assert.equal(response.status, 204);
  assert.equal(response.headers.get("location"), null);
  assert.match(response.headers.get("cache-control") ?? "", /no-store/);
  assert.equal(log.mock.callCount(), 0);
});

test("unsupported HTTP methods return an uncached, non-indexable 405 without tracking", async (t) => {
  const log = t.mock.method(console, "info", () => {});
  for (const method of ["POST", "PUT", "OPTIONS"]) {
    const response = await onRequest({
      request: new Request("https://site.example/go/unknown?url=https://evil.example", {
        method,
        headers: { purpose: "prefetch" },
      }),
      params: { casino: "unknown" },
    });
    assert.equal(response.status, 405);
    assert.equal(response.headers.get("allow"), "GET, HEAD");
    assert.equal(response.headers.get("location"), null);
    assert.match(response.headers.get("cache-control") ?? "", /no-store/);
    assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow");
  }
  assert.equal(log.mock.callCount(), 0);
});

test("GET uses only the configured destination; HEAD and prefetch emit no event", async (t) => {
  // Temporary in-memory fixture exercises the Pages wrapper without a live operator.
  const fixture = operator();
  const registry = casinos as Casino[];
  registry.push(fixture);
  t.after(() => {
    registry.splice(registry.indexOf(fixture), 1);
  });
  const log = t.mock.method(console, "info", () => {});
  const request = new Request(
    "https://site.example/go/test-operator?url=https://evil.example&redirect=https://evil.example",
  );
  const context = { request, params: { casino: fixture.slug } };

  const get = await onRequestGet(context);
  assert.equal(get.status, 302);
  assert.equal(get.headers.get("location"), fixture.affiliate.url);
  assert.match(get.headers.get("cache-control") ?? "", /no-store/);
  assert.equal(get.headers.get("x-robots-tag"), "noindex, nofollow");
  assert.equal(log.mock.callCount(), 1);
  assert.deepEqual(JSON.parse(log.mock.calls[0].arguments[0]), {
    event: "affiliate_redirect",
    casino_slug: fixture.slug,
    measurement: "redirect_request",
  });

  const head = await onRequestHead({
    ...context,
    request: new Request(request, { method: "HEAD" }),
  });
  assert.equal(head.status, 302);
  assert.equal(head.headers.get("location"), fixture.affiliate.url);
  const prefetch = await onRequestGet({
    ...context,
    request: new Request(request, { headers: { purpose: "prefetch" } }),
  });
  assert.equal(prefetch.status, 204);

  // The shared handler also suppresses HEAD events if an adapter misconfigures it.
  await handleAffiliateRequest(
    new Request(request, { method: "HEAD" }),
    fixture.slug,
    { recordEvent: true },
  );
  const invalidParameter = await onRequestGet({
    ...context,
    params: { casino: [fixture.slug] },
  });
  assert.equal(invalidParameter.status, 404);
  assert.equal(log.mock.callCount(), 1);

  log.mock.mockImplementation(() => {
    throw new Error("Measurement unavailable");
  });
  assert.equal((await onRequestGet(context)).status, 302);
});
