import { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { readAdRuntimeConfig } from "./runtimeConfig";
import { providerForRoute, selectAdRoute } from "./router";
import { resolveStorefrontCountryCode } from "./storefront";
import type { AdConsent, AdPlacementId, AdProvider, AdRoute } from "./types";

export type AdController = {
  route: AdRoute;
  provider: AdProvider;
  shouldShowAds: boolean;
  initialized: boolean;
};

const defaultConsent: AdConsent = {
  privacyAccepted: false,
  personalizedAdsAllowed: false
};

export function useAdController(showAds: boolean, consent: AdConsent = defaultConsent): AdController {
  const config = useMemo(() => readAdRuntimeConfig(), []);
  const [route, setRoute] = useState<AdRoute>(() => selectAdRoute(config));
  const provider = useMemo(() => providerForRoute(route), [route]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    let mounted = true;
    resolveStorefrontCountryCode(config).then((storefront) => {
      if (mounted) setRoute(selectAdRoute(config, storefront));
    });
    return () => {
      mounted = false;
    };
  }, [config]);

  useEffect(() => {
    let mounted = true;
    if (!showAds) {
      setInitialized(false);
      return;
    }
    if (route.providerId === "gromore" && !consent.privacyAccepted) {
      setInitialized(false);
      return;
    }
    provider
      .setConsent(consent)
      .then(() => provider.initialize(route))
      .then(() => {
        if (mounted) setInitialized(provider.canShowAds());
      })
      .catch(() => {
        if (mounted) setInitialized(false);
      });
    return () => {
      mounted = false;
    };
  }, [consent, provider, route, showAds]);

  return {
    route,
    provider,
    shouldShowAds: showAds && initialized && provider.canShowAds(),
    initialized
  };
}

export function BannerAdSlot({ controller, placement }: { controller: AdController; placement: AdPlacementId }) {
  if (!controller.shouldShowAds) return null;
  const banner = controller.provider.renderBanner(placement);
  if (!banner) return null;
  return (
    <View>
      {banner}
      <Text style={{ color: "#9aa39d", fontSize: 11, textAlign: "center", marginTop: 4 }}>
        {controller.provider.label} · {controller.route.reason}
      </Text>
    </View>
  );
}
