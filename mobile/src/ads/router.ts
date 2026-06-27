import { Platform } from "react-native";
import { adProviders } from "./providers";
import type { AdProvider, AdRoute, AdRuntimeConfig } from "./types";
import type { StorefrontResolution } from "./storefront";

export function selectAdRoute(config: AdRuntimeConfig, storefront?: StorefrontResolution): AdRoute {
  if (config.requestedProvider === "none") {
    return { providerId: "none", reason: "ads disabled by build config", environment: config.environment, adPlatform: "generic" };
  }

  if (Platform.OS === "android") {
    if (config.variant === "android-cn") return { providerId: "none", reason: "android-cn build has no ad provider", environment: config.environment, adPlatform: "android" };
    if (config.variant === "android-global") return { providerId: "admob", reason: "android-global build", environment: config.environment, adPlatform: "android" };
    if (config.requestedProvider === "admob" || config.requestedProvider === "gromore") {
      return { providerId: config.requestedProvider, reason: "android explicit provider", environment: config.environment, adPlatform: "android" };
    }
    return { providerId: "mock", reason: "android development build", environment: config.environment, adPlatform: "android" };
  }

  if (Platform.OS === "ios") {
    const storefrontCountryCode = storefront?.countryCode || "";
    const storefrontSource = storefront?.source || "unavailable";
    if (config.variant === "development" && config.requestedProvider === "mock") {
      return { providerId: "mock", reason: "ios development build", environment: config.environment, adPlatform: "ios", storefrontCountryCode, storefrontSource };
    }
    if (storefrontCountryCode === "CN") {
      return { providerId: "none", reason: "ios China storefront has no ad provider", environment: config.environment, adPlatform: "ios", storefrontCountryCode, storefrontSource };
    }
    if (storefrontCountryCode) {
      return { providerId: "admob", reason: "ios non-China storefront", environment: config.environment, adPlatform: "ios", storefrontCountryCode, storefrontSource };
    }
    return { providerId: "none", reason: "ios storefront unavailable", environment: config.environment, adPlatform: "ios", storefrontSource };
  }

  return { providerId: "mock", reason: "unsupported platform development fallback", environment: config.environment, adPlatform: "generic" };
}

export function providerForRoute(route: AdRoute): AdProvider {
  return adProviders[route.providerId];
}
