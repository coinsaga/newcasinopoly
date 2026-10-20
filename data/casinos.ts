import type { Casino } from "../types/casino.ts";

// Add operators only after verifying their South African products and licence.
// Commercial terms belong here; editorial copy belongs in content/reviews/.
export const casinos: readonly Casino[] = [];

/** Publication guard for complete, dated evidence; legal review stays manual. */
export function isPublishedCasino(casino: Casino | undefined): casino is Casino {
  if (
    !casino ||
    casino.status !== "published" ||
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(casino.slug) ||
    !casino.name.trim() ||
    !casino.licence.authority.trim() ||
    !casino.licence.number.trim() ||
    !casino.licence.products.length ||
    casino.licence.products.some((product) => !product.trim()) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(casino.licence.verifiedAt)
  ) {
    return false;
  }

  try {
    const source = new URL(casino.licence.sourceUrl);
    const date = new Date(`${casino.licence.verifiedAt}T00:00:00Z`);
    return (
      source.protocol === "https:" &&
      !source.username &&
      !source.password &&
      date.toISOString().slice(0, 10) === casino.licence.verifiedAt &&
      casino.licence.verifiedAt <= new Date().toISOString().slice(0, 10)
    );
  } catch {
    return false;
  }
}

export function getPublishedCasinos(): readonly Casino[] {
  return casinos.filter(isPublishedCasino);
}

export function getCasinoBySlug(slug: string): Casino | undefined {
  return casinos.find((casino) => casino.slug === slug);
}
