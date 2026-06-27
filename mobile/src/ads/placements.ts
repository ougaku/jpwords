import type { AdEnvironment, AdPlacementConfig, AdPlacementId, AdPlatform, AdProviderId } from "./types";

type ProviderPlacementConfig = Partial<Record<AdPlacementId, AdPlacementConfig>>;
type ProviderEnvironmentConfig = Partial<Record<AdEnvironment, ProviderPlacementConfig>>;

declare const process: {
  env?: Record<string, string | undefined>;
};

const env = typeof process === "undefined" ? {} : process.env || {};

const disabledPlacement = (placement: AdPlacementId, format: AdPlacementConfig["format"]): AdPlacementConfig => ({
  placement,
  format,
  unitId: "",
  enabled: false
});

const placementConfig = (
  placement: AdPlacementId,
  format: AdPlacementConfig["format"],
  unitId: string,
  enabled = true
): AdPlacementConfig => ({
  placement,
  format,
  unitId,
  enabled
});

const mockPlacements: ProviderPlacementConfig = {
  home_bottom: placementConfig("home_bottom", "banner", "mock-home-bottom"),
  study_bottom: placementConfig("study_bottom", "banner", "mock-study-bottom")
};

const admobTestPlacements: ProviderPlacementConfig = {
  home_bottom: placementConfig("home_bottom", "banner", "admob-test-banner-home-bottom"),
  study_bottom: placementConfig("study_bottom", "banner", "admob-test-banner-study-bottom")
};

const gromoreTestPlacements: ProviderPlacementConfig = {
  home_bottom: placementConfig("home_bottom", "banner", "gromore-test-banner-home-bottom"),
  study_bottom: placementConfig("study_bottom", "banner", "gromore-test-banner-study-bottom")
};

function envPlacement(
  envKey: string,
  placement: AdPlacementId,
  format: AdPlacementConfig["format"]
): AdPlacementConfig {
  const unitId = String(env[envKey] || "").trim();
  return unitId ? placementConfig(placement, format, unitId) : disabledPlacement(placement, format);
}

function productionPlacements(prefix: "ADMOB" | "GROMORE", platform?: "ANDROID" | "IOS"): ProviderPlacementConfig {
  const envPrefix = platform ? `${prefix}_${platform}` : prefix;
  return {
    home_bottom: envPlacement(`EXPO_PUBLIC_${envPrefix}_HOME_BOTTOM_ID`, "home_bottom", "banner"),
    study_bottom: envPlacement(`EXPO_PUBLIC_${envPrefix}_STUDY_BOTTOM_ID`, "study_bottom", "banner")
  };
}

const admobAndroidProductionPlacements = productionPlacements("ADMOB", "ANDROID");
const admobIosProductionPlacements = productionPlacements("ADMOB", "IOS");
const gromoreProductionPlacements = productionPlacements("GROMORE");

export const adUnitEnvKeys = {
  admob: {
    android: {
      home_bottom: "EXPO_PUBLIC_ADMOB_ANDROID_HOME_BOTTOM_ID",
      study_bottom: "EXPO_PUBLIC_ADMOB_ANDROID_STUDY_BOTTOM_ID"
    },
    ios: {
      home_bottom: "EXPO_PUBLIC_ADMOB_IOS_HOME_BOTTOM_ID",
      study_bottom: "EXPO_PUBLIC_ADMOB_IOS_STUDY_BOTTOM_ID"
    }
  },
  gromore: {
    home_bottom: "EXPO_PUBLIC_GROMORE_HOME_BOTTOM_ID",
    study_bottom: "EXPO_PUBLIC_GROMORE_STUDY_BOTTOM_ID"
  }
};

const placementsByProvider: Record<Exclude<AdProviderId, "none">, ProviderEnvironmentConfig> = {
  mock: {
    mock: mockPlacements,
    test: mockPlacements,
    production: mockPlacements
  },
  admob: {
    mock: mockPlacements,
    test: admobTestPlacements,
    production: {}
  },
  gromore: {
    mock: mockPlacements,
    test: gromoreTestPlacements,
    production: gromoreProductionPlacements
  }
};

function providerProductionPlacements(providerId: Exclude<AdProviderId, "none">, platform: AdPlatform) {
  if (providerId === "admob") {
    if (platform === "ios") return admobIosProductionPlacements;
    return admobAndroidProductionPlacements;
  }
  return gromoreProductionPlacements;
}

export function getAdPlacementConfig(providerId: AdProviderId, environment: AdEnvironment, placement: AdPlacementId, platform: AdPlatform = "generic") {
  if (providerId === "none") return disabledPlacement(placement, "banner");
  if (environment === "production") {
    return providerProductionPlacements(providerId, platform)[placement] || disabledPlacement(placement, "banner");
  }
  return placementsByProvider[providerId][environment]?.[placement] || disabledPlacement(placement, "banner");
}
