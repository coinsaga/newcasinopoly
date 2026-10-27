const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
const parsedUrl = new URL(configuredUrl || "https://casinopoly.io");

if (
  !["http:", "https:"].includes(parsedUrl.protocol) ||
  parsedUrl.username ||
  parsedUrl.password
) {
  throw new Error(
    "NEXT_PUBLIC_SITE_URL must be an HTTP(S) origin without credentials.",
  );
}

if (parsedUrl.pathname !== "/" || parsedUrl.search || parsedUrl.hash) {
  throw new Error(
    "NEXT_PUBLIC_SITE_URL must contain an origin only, without a path, query or fragment.",
  );
}

const reservedHost =
  /(^|\.)(localhost|example\.(com|org|net))$|\.(test|invalid|example|local)$/.test(
    parsedUrl.hostname,
  ) || ["127.0.0.1", "0.0.0.0", "[::1]"].includes(parsedUrl.hostname);
const requestedIndexing = process.env.SITE_INDEXABLE === "true";
// Remove this gate together with the fictional comparison before the public launch.
const designPreview = true;

if (requestedIndexing && designPreview) {
  throw new Error(
    "Replace the fictional comparison preview before enabling SITE_INDEXABLE. See docs/design-review.md.",
  );
}

if (requestedIndexing && (parsedUrl.protocol !== "https:" || reservedHost)) {
  throw new Error(
    "Indexing requires a real HTTPS production domain in NEXT_PUBLIC_SITE_URL.",
  );
}

export const site = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Casinopoly",
  description:
    "Clear, independent guides to checking operators, understanding offers and making informed choices in South Africa.",
  url: parsedUrl.origin,
  indexable: requestedIndexing,
  designPreview,
  locale: "en_ZA",
} as const;
