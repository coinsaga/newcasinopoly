import assert from "node:assert/strict";
import test from "node:test";
import { getCasinoBySlug, getPublishedCasinos } from "../data/casinos.ts";
import { resolveAffiliateDestination } from "../lib/affiliate.ts";

test("the YesPlay review draft stays outside published listings and affiliate redirects", () => {
  const casino = getCasinoBySlug("yesplay");
  assert.ok(casino?.review);
  assert.equal(casino.status, "draft");
  assert.equal(getPublishedCasinos().some((entry) => entry.slug === "yesplay"), false);
  assert.equal(casino.affiliate.enabled, false);
  assert.equal(resolveAffiliateDestination(casino), null);
});

test("attributed review facts resolve to distinct legacy and primary sources", () => {
  const review = getCasinoBySlug("yesplay")?.review;
  assert.ok(review?.legacyRating);
  const findSource = (id: string) => review.sources.find((source) => source.id === id);

  assert.equal(findSource(review.legacyRating.sourceId)?.kind, "legacy");
  assert.equal(findSource(review.offer.sourceId)?.kind, "operator");
  assert.equal(findSource(review.support.sourceId)?.kind, "operator");
  assert.equal(review.offer.termsComplete, false);
  assert.equal(review.support.hours, null);
});
