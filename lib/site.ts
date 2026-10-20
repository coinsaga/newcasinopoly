const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
const parsedUrl = new URL(configuredUrl || "https://casinopoly.io");

if (!["http:", "https:"].includes(parsedUrl.protocol) || parsedUrl.username || parsedUrl.password) {
  throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTP(S) origin without credentials.");
}

if (parsedUrl.pathname !== "/" || parsedUrl.search || parsedUrl.hash) {
  throw new Error("NEXT_PUBLIC_SITE_URL must contain an origin only, without a path, query or fragment.");
}

const reservedHost = /(^|\.)(localhost|example\.(com|org|net))$|\.(test|invalid|example|local)$/.test(parsedUrl.hostname)
  || ["127.0.0.1", "0.0.0.0", "[::1]"].includes(parsedUrl.hostname);
const requestedIndexing = process.env.SITE_INDEXABLE === "true";

if (requestedIndexing && (parsedUrl.protocol !== "https:" || reservedHost)) {
  throw new Error("Indexing requires a real HTTPS production domain in NEXT_PUBLIC_SITE_URL.");
}

export const site = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Casinopoly",
  description: "Clear, independent guides to checking operators, understanding offers and making informed choices in South Africa.",
  url: parsedUrl.origin,
  indexable: requestedIndexing,
  locale: "en_ZA",
} as const;
