import type { AccessLevel } from "./data/freeLexicons";

export type ProductPlatform = "ios" | "android" | "all";

export type LexiconProduct = {
  productId: string;
  lexiconId: string;
  platform: ProductPlatform;
};

export type Entitlement = {
  unlockedLexiconIds: Set<string>;
  showAds: boolean;
};

export const lexiconProducts: LexiconProduct[] = [
  {
    productId: "jpwords.jlpt_n4",
    lexiconId: "jlpt-n4",
    platform: "all"
  }
];

export function buildEntitlement(unlockedLexiconIds: Iterable<string>): Entitlement {
  const unlocked = new Set(unlockedLexiconIds);
  return {
    unlockedLexiconIds: unlocked,
    showAds: unlocked.size === 0
  };
}

export function canAccessLexicon(access: AccessLevel, lexiconId: string, entitlement: Entitlement): boolean {
  return access === "free" || entitlement.unlockedLexiconIds.has(lexiconId);
}

export function productForLexicon(lexiconId: string): LexiconProduct | undefined {
  return lexiconProducts.find((item) => item.lexiconId === lexiconId);
}

export function lexiconForProduct(productId: string): LexiconProduct | undefined {
  return lexiconProducts.find((item) => item.productId === productId);
}
