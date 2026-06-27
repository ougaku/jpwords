import { NativeModules, Platform } from "react-native";
import type { AdRuntimeConfig } from "./types";

type StorefrontNativeModule = {
  getStorefrontCountryCode?: () => Promise<string | null | undefined>;
};

export type StorefrontResolution = {
  countryCode: string;
  source: "config" | "native" | "unavailable";
};

function normalizeCountryCode(value: string | null | undefined) {
  return String(value || "").trim().toUpperCase();
}

export async function resolveStorefrontCountryCode(config: AdRuntimeConfig): Promise<StorefrontResolution> {
  const configured = normalizeCountryCode(config.storefrontCountryCode);
  if (configured) return { countryCode: configured, source: "config" };
  if (Platform.OS !== "ios") return { countryCode: "", source: "unavailable" };

  const nativeModule = NativeModules.JpWordsStorefront as StorefrontNativeModule | undefined;
  if (!nativeModule?.getStorefrontCountryCode) return { countryCode: "", source: "unavailable" };

  try {
    const nativeCountryCode = normalizeCountryCode(await nativeModule.getStorefrontCountryCode());
    return nativeCountryCode
      ? { countryCode: nativeCountryCode, source: "native" }
      : { countryCode: "", source: "unavailable" };
  } catch {
    return { countryCode: "", source: "unavailable" };
  }
}
