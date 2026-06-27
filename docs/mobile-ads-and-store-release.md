# Mobile Ads And Store Release

## Current First-Version Policy

第一版不接 GroMore。

- Android CN: no ads.
- Android Global: AdMob.
- iOS storefront `CN`: no ads.
- iOS non-`CN`: AdMob.
- iOS storefront unavailable: no ads.

这样国内广告平台资质不会阻塞第一版发布。后续如果取得 GroMore 资质，再恢复 `CN -> GroMore` 路由。

## Build Targets

- `android-cn`: 国内 Android 应用商店构建，不展示广告。
- `android-global`: Google Play 构建，使用 AdMob。
- `ios-universal`: 一个 iOS App Store app，覆盖中国大陆和海外目标地区。

Production profiles:

- `android-cn-production`
- `android-global-production`
- `ios-universal-production`

## Runtime Routing

Android:

- `android-cn` -> `none`
- `android-global` -> `admob`

iOS:

- storefront `CN` -> `none`
- storefront non-`CN` -> `admob`
- storefront unavailable -> `none`

Local development:

- default `EXPO_PUBLIC_AD_PROVIDER=mock`
- default `EXPO_PUBLIC_AD_ENV=mock`

## Ad Environments

- `mock`: Expo development only, no real ad SDK.
- `test`: build verification with test placement IDs.
- `production`: release builds. Missing production ad unit IDs disable the affected placement.

Ad placements are centralized in `mobile/src/ads/placements.ts`. Business screens only pass `AdPlacementId`; they do not reference SDK ad unit IDs directly.

First-version ad placements are intentionally limited:

- Home page bottom banner: `home_bottom`
- Study page bottom banner: `study_bottom`

There is no interstitial ad in the first version.

## AdMob IDs

AdMob app IDs are separate from ad unit IDs.

Known current AdMob App IDs:

- Android: `ca-app-pub-2372613416030611~6562970119`
- iOS: `ca-app-pub-2372613416030611~9274717764`

Android and iOS should normally have separate AdMob app records.

App IDs:

- `EXPO_PUBLIC_ADMOB_ANDROID_APP_ID`
- `EXPO_PUBLIC_ADMOB_IOS_APP_ID`

Android ad unit IDs:

- `EXPO_PUBLIC_ADMOB_ANDROID_HOME_BOTTOM_ID`: `ca-app-pub-2372613416030611/2134594340`
- `EXPO_PUBLIC_ADMOB_ANDROID_STUDY_BOTTOM_ID`: `ca-app-pub-2372613416030611/8508431001`

iOS ad unit IDs:

- `EXPO_PUBLIC_ADMOB_IOS_HOME_BOTTOM_ID`: `ca-app-pub-2372613416030611/4209671882`
- `EXPO_PUBLIC_ADMOB_IOS_STUDY_BOTTOM_ID`: `ca-app-pub-2372613416030611/6864176846`

Run normal config validation:

```powershell
npm.cmd run validate:ads-config
```

Run strict production validation after production AdMob ad unit IDs are configured:

```powershell
npm.cmd run validate:ads-production
```

Production build commands:

```powershell
npm.cmd run build:android-cn:production
npm.cmd run build:android-global:production
npm.cmd run build:ios:production
```

## Storefront Resolution

First priority is `EXPO_PUBLIC_STOREFRONT_COUNTRY_CODE`, used for local and build-time testing.

iOS device builds can use `NativeModules.JpWordsStorefront.getStorefrontCountryCode()` to read the App Store storefront country code, such as `CN`, `JP`, or `US`.

If both env and native storefront resolution fail, iOS chooses `none` and hides ads.

`mobile/plugins/withJpWordsStorefront.js` generates these iOS files during Expo prebuild:

- `JpWordsStorefront.swift`
- `JpWordsStorefrontBridge.m`
- `JpWordsTrackingTransparency.swift`
- `JpWordsTrackingTransparencyBridge.m`

## ATT

ATT is exposed through `NativeModules.JpWordsTrackingTransparency`:

- `getTrackingStatus()`
- `requestTrackingAuthorization()`

AdMob defaults to non-personalized behavior. The app requests ATT only when the user explicitly taps the personalized ads option.

## Consent Flow

Ad consent is stored locally in SQLite `settings`, key `ad_consent_v1`.

- `privacyAccepted`: whether the user accepted the ads/privacy prompt.
- `personalizedAdsAllowed`: whether personalized ads are allowed.

First-version behavior:

- Domestic builds and iOS `CN` storefront do not show ads.
- Overseas AdMob defaults to non-personalized configuration.
- Remove-ads entitlement sets `Entitlement.showAds=false`, so providers do not initialize or show ads.

## Entitlements

- All ad display is controlled by `Entitlement.showAds`.
- Remove-ads or paid unlock hides every ad placement.
- iOS and global Android use `react-native-iap`.
- Domestic Android payment remains future work; `cn_store` entitlement source is reserved.

## Compliance Notes

- First version App Privacy / Data Safety should disclose AdMob and IAP, not GroMore.
- If AdMob uses IDFA or cross-app tracking, ATT is required.
- China mainland first version shows no ads.
- Overseas regions may require GDPR/UMP consent before full personalized ads.

## SDK Adapter Boundary

Real ad SDK integration is isolated behind `mobile/src/ads/sdkAdapters.ts` and provider internals.

Current first version:

- `mock` / `test` use placeholder ads.
- `production` requires AdMob ad unit IDs for enabled overseas placements.
- Only home page and study page bottom banners are enabled.
- GroMore remains a future optional provider.
