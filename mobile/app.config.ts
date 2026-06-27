type ExpoConfigContext = {
  config: Record<string, any>;
};

declare const process: {
  env: Record<string, string | undefined>;
};

const variant = process.env.EXPO_PUBLIC_APP_VARIANT || process.env.APP_VARIANT || "development";
const adProvider = process.env.EXPO_PUBLIC_AD_PROVIDER || process.env.AD_PROVIDER || "mock";
const adEnvironment = process.env.EXPO_PUBLIC_AD_ENV || process.env.AD_ENV || "mock";
const storefrontCountryCode = process.env.EXPO_PUBLIC_STOREFRONT_COUNTRY_CODE || "";
const admobAndroidAppId = process.env.EXPO_PUBLIC_ADMOB_ANDROID_APP_ID || "";
const admobIosAppId = process.env.EXPO_PUBLIC_ADMOB_IOS_APP_ID || "";

function androidPackageForVariant() {
  if (variant === "android-cn") return "jp.itasca.jpwords.cn";
  if (variant === "android-global") return "jp.itasca.jpwords.global";
  return "jp.itasca.jpwords.dev";
}

function appNameForVariant() {
  if (variant === "android-cn") return "JpWords CN";
  if (variant === "android-global") return "JpWords";
  if (variant === "ios-universal") return "JpWords";
  return "JpWords Dev";
}

export default ({ config }: ExpoConfigContext) => ({
  ...config,
  name: appNameForVariant(),
  slug: "jpwords",
  version: "0.1.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  plugins: ["react-native-iap", "./plugins/withJpWordsStorefront"],
  userInterfaceStyle: "light",
  assetBundlePatterns: ["**/*"],
  splash: {
    image: "./assets/icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "jp.itasca.jpwords",
    infoPlist: {
      NSUserTrackingUsageDescription: "This identifier may be used to deliver and measure ads when you allow tracking."
    }
  },
  android: {
    package: androidPackageForVariant(),
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff"
    }
  },
  web: {
    favicon: "./assets/favicon.png"
  },
  extra: {
    edition: "standalone-free",
    appVariant: variant,
    adProvider,
    adEnvironment,
    storefrontCountryCode,
    admobAppIds: {
      android: admobAndroidAppId,
      ios: admobIosAppId
    },
    adPlacements: {
      homeBottom: "home_bottom",
      studyBottom: "study_bottom",
    }
  }
});
