import type { AdConsent, AdPlacementConfig, AdProviderId } from "./types";

export type NativeAdSdkAdapter = {
  initialize: (options: { providerId: AdProviderId; consent: AdConsent }) => Promise<void>;
  renderBanner: (placement: AdPlacementConfig) => null;
};

const notInstalledAdapter: NativeAdSdkAdapter = {
  async initialize() {
    return;
  },
  renderBanner() {
    return null;
  }
};

export function getNativeAdSdkAdapter(_providerId: AdProviderId): NativeAdSdkAdapter {
  return notInstalledAdapter;
}
