import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import type { AdConsent, AdPlacementId, AdProvider, AdProviderId, AdRoute } from "./types";
import { getAdPlacementConfig } from "./placements";

function BannerPlaceholder({ label, placement, unitId }: { label: string; placement: AdPlacementId; unitId: string }) {
  return (
    <View style={styles.adBox}>
      <Text style={styles.adText}>{label} test ad</Text>
      <Text style={styles.adMeta}>{placement} · {unitId}</Text>
    </View>
  );
}

function createPlaceholderProvider(id: AdProviderId, label: string, available: boolean): AdProvider {
  let initialized = false;
  let consent: AdConsent = { privacyAccepted: false, personalizedAdsAllowed: false };
  let activeRoute: AdRoute = { providerId: id, reason: "not initialized", environment: "mock", adPlatform: "generic" };
  return {
    id,
    label,
    async initialize(route: AdRoute) {
      activeRoute = route;
      initialized = available;
    },
    async setConsent(nextConsent: AdConsent) {
      consent = nextConsent;
    },
    canShowAds() {
      return initialized && available && (id !== "gromore" || consent.privacyAccepted);
    },
    renderBanner(placement: AdPlacementId): ReactNode {
      if (!initialized || !available) return null;
      const placementConfig = getAdPlacementConfig(id, activeRoute.environment, placement, activeRoute.adPlatform);
      if (!placementConfig.enabled || placementConfig.format !== "banner") return null;
      return <BannerPlaceholder label={label} placement={placement} unitId={placementConfig.unitId} />;
    }
  };
}

export const adProviders: Record<AdProviderId, AdProvider> = {
  mock: createPlaceholderProvider("mock", "Mock", true),
  admob: createPlaceholderProvider("admob", "AdMob", true),
  gromore: createPlaceholderProvider("gromore", "GroMore", true),
  none: createPlaceholderProvider("none", "No ads", false)
};

const styles = StyleSheet.create({
  adBox: {
    minHeight: 58,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#c9d2cc",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    gap: 3
  },
  adText: { color: "#6d766f", fontWeight: "800" },
  adMeta: { color: "#9aa39d", fontSize: 11, fontWeight: "700" }
});
