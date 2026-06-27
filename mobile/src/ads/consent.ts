import type { AdConsent } from "./types";

export const adConsentSettingKey = "ad_consent_v1";

export type StoredAdConsent = AdConsent & {
  updatedAt: string;
};

export const defaultAdConsent: StoredAdConsent = {
  privacyAccepted: false,
  personalizedAdsAllowed: false,
  updatedAt: ""
};

export function parseStoredAdConsent(value: string | null): StoredAdConsent {
  if (!value) return defaultAdConsent;
  try {
    const parsed = JSON.parse(value) as Partial<StoredAdConsent>;
    return {
      privacyAccepted: parsed.privacyAccepted === true,
      personalizedAdsAllowed: parsed.personalizedAdsAllowed === true,
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : ""
    };
  } catch {
    return defaultAdConsent;
  }
}

export function serializeStoredAdConsent(consent: AdConsent): string {
  return JSON.stringify({
    privacyAccepted: consent.privacyAccepted,
    personalizedAdsAllowed: consent.personalizedAdsAllowed,
    updatedAt: new Date().toISOString()
  });
}
