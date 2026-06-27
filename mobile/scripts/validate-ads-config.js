const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const easPath = path.join(root, "eas.json");
const appConfigPath = path.join(root, "app.config.ts");
const strictProduction = process.argv.includes("--strict-production") || process.env.STRICT_PRODUCTION_ADS === "1";

const placementEnvKeys = {
  "android-global-production": [
    "EXPO_PUBLIC_ADMOB_ANDROID_HOME_BOTTOM_ID",
    "EXPO_PUBLIC_ADMOB_ANDROID_STUDY_BOTTOM_ID",
  ],
  "ios-universal-production": [
    "EXPO_PUBLIC_ADMOB_IOS_HOME_BOTTOM_ID",
    "EXPO_PUBLIC_ADMOB_IOS_STUDY_BOTTOM_ID",
  ]
};

const appIdEnvKeys = {
  "android-global-production": ["EXPO_PUBLIC_ADMOB_ANDROID_APP_ID"],
  "ios-universal-production": ["EXPO_PUBLIC_ADMOB_IOS_APP_ID"]
};

function fail(message) {
  console.error(`Ads config validation failed: ${message}`);
  process.exit(1);
}

function assertProfile(eas, profileName, expected) {
  const profile = eas.build?.[profileName];
  if (!profile) fail(`missing EAS profile ${profileName}`);
  const env = profile.env || {};
  for (const [key, value] of Object.entries(expected)) {
    if (env[key] !== value) fail(`${profileName} expected ${key}=${value}, got ${env[key] || "<empty>"}`);
  }

  if (strictProduction && env.EXPO_PUBLIC_AD_ENV === "production") {
    for (const key of appIdEnvKeys[profileName] || []) {
      if (!env[key] && !process.env[key]) fail(`${profileName} production missing ${key}`);
    }

    for (const key of placementEnvKeys[profileName] || []) {
      if (!env[key] && !process.env[key]) fail(`${profileName} production missing ${key}`);
    }
  }
}

const eas = JSON.parse(fs.readFileSync(easPath, "utf8"));
const appConfig = fs.readFileSync(appConfigPath, "utf8");

assertProfile(eas, "development", {
  EXPO_PUBLIC_APP_VARIANT: "development",
  EXPO_PUBLIC_AD_ENV: "mock",
  EXPO_PUBLIC_AD_PROVIDER: "mock"
});

assertProfile(eas, "android-cn", {
  EXPO_PUBLIC_APP_VARIANT: "android-cn",
  EXPO_PUBLIC_AD_PROVIDER: "none"
});

assertProfile(eas, "android-global", {
  EXPO_PUBLIC_APP_VARIANT: "android-global",
  EXPO_PUBLIC_AD_PROVIDER: "admob"
});

assertProfile(eas, "ios-universal", {
  EXPO_PUBLIC_APP_VARIANT: "ios-universal",
  EXPO_PUBLIC_AD_PROVIDER: "auto"
});

assertProfile(eas, "android-cn-production", {
  EXPO_PUBLIC_APP_VARIANT: "android-cn",
  EXPO_PUBLIC_AD_ENV: "production",
  EXPO_PUBLIC_AD_PROVIDER: "none"
});

assertProfile(eas, "android-global-production", {
  EXPO_PUBLIC_APP_VARIANT: "android-global",
  EXPO_PUBLIC_AD_ENV: "production",
  EXPO_PUBLIC_AD_PROVIDER: "admob"
});

assertProfile(eas, "ios-universal-production", {
  EXPO_PUBLIC_APP_VARIANT: "ios-universal",
  EXPO_PUBLIC_AD_ENV: "production",
  EXPO_PUBLIC_AD_PROVIDER: "auto"
});

if (!appConfig.includes("./plugins/withJpWordsStorefront")) {
  fail("app.config.ts must include ./plugins/withJpWordsStorefront");
}

console.log("Ads config validation passed.");
