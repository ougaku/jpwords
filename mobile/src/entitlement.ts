import type { AccessLevel } from "./data/freeLexicons";

export type Entitlement = {
  paid: boolean;
  showAds: boolean;
  label: string;
};

export function buildEntitlement(paid: boolean): Entitlement {
  return {
    paid,
    showAds: !paid,
    label: paid ? "付费预览" : "免费版"
  };
}

export function canAccessLexicon(access: AccessLevel, entitlement: Entitlement): boolean {
  return access === "free" || entitlement.paid;
}
