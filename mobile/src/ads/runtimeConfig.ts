import type { AdEnvironment, AdProviderId, AdRuntimeConfig, AppVariant } from "./types";

declare const process: {
  env?: Record<string, string | undefined>;
};

const env = typeof process === "undefined" ? {} : process.env || {};

function normalizeVariant(value: string | undefined): AppVariant {
  if (value === "android-cn" || value === "android-global" || value === "ios-universal") return value;
  return "development";
}

function normalizeProvider(value: string | undefined): AdProviderId | "auto" {
  if (value === "admob" || value === "gromore" || value === "mock" || value === "none" || value === "auto") return value;
  return "mock";
}

function normalizeEnvironment(value: string | undefined): AdEnvironment {
  if (value === "test" || value === "production") return value;
  return "mock";
}

export function readAdRuntimeConfig(): AdRuntimeConfig {
  return {
    variant: normalizeVariant(env.EXPO_PUBLIC_APP_VARIANT || env.APP_VARIANT),
    environment: normalizeEnvironment(env.EXPO_PUBLIC_AD_ENV || env.AD_ENV),
    requestedProvider: normalizeProvider(env.EXPO_PUBLIC_AD_PROVIDER || env.AD_PROVIDER),
    storefrontCountryCode: String(env.EXPO_PUBLIC_STOREFRONT_COUNTRY_CODE || "").trim().toUpperCase()
  };
}
