import type { ReactNode } from "react";

export type AppVariant = "development" | "android-cn" | "android-global" | "ios-universal";
export type AdProviderId = "mock" | "admob" | "gromore" | "none";
export type AdPlacementId = "home_bottom" | "study_bottom";
export type AdEnvironment = "mock" | "test" | "production";
export type AdPlatform = "android" | "ios" | "generic";

export type AdConsent = {
  privacyAccepted: boolean;
  personalizedAdsAllowed: boolean;
};

export type AdRuntimeConfig = {
  variant: AppVariant;
  environment: AdEnvironment;
  requestedProvider: AdProviderId | "auto";
  storefrontCountryCode: string;
};

export type AdRoute = {
  providerId: AdProviderId;
  reason: string;
  environment: AdEnvironment;
  adPlatform: AdPlatform;
  storefrontCountryCode?: string;
  storefrontSource?: "config" | "native" | "unavailable";
};

export type AdPlacementConfig = {
  placement: AdPlacementId;
  format: "banner" | "interstitial";
  unitId: string;
  enabled: boolean;
};

export type AdProvider = {
  id: AdProviderId;
  label: string;
  initialize: (route: AdRoute) => Promise<void>;
  setConsent: (consent: AdConsent) => Promise<void>;
  canShowAds: () => boolean;
  renderBanner: (placement: AdPlacementId) => ReactNode;
};
