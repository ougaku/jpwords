# Mobile Store Submission Checklist

## Common

- App name, icon, splash, screenshots are final.
- Built-in lexicons are bundled and work offline.
- Free and paid entitlements use the same local unlock logic.
- Remove ads entitlement hides all ad placements.
- `npm.cmd run typecheck` passes.
- `npm.cmd run validate:ads-config` passes.
- `npm.cmd run validate:ads-production` passes after production ad IDs are configured.
- Privacy policy URL is live.
- Third-party SDK list URL is live.

## Android CN

- Build profile: `android-cn-production`.
- Package: `jp.itasca.jpwords.cn`.
- Ad provider: none.
- Confirm AdMob SDK is not packaged in this build.
- Confirm no advertising SDK is packaged in this build.
- Prepare domestic app store materials:
  - APK/AAB as required by store.
  - 隐私政策.
  - 第三方 SDK 清单.
  - 软件著作权 or store-specific materials if required.

## Android Global

- Build profile: `android-global-production`.
- Package: `jp.itasca.jpwords.global`.
- Ad provider: AdMob only.
- Confirm GroMore SDK is not packaged in this build.
- Google Play Console:
  - App content declarations.
  - Data Safety.
  - Ads declaration.
  - Target audience.
  - Closed testing if required.

## iOS Universal

- Build profile: `ios-universal-production`.
- Bundle ID: `jp.itasca.jpwords`.
- Same App Store app covers China mainland and overseas regions.
- First version includes AdMob only.
- Storefront routing:
  - `CN` -> no ads.
  - non-`CN` -> AdMob.
  - unavailable -> no ads.
- Apple App Store Connect:
  - App Privacy includes both ad SDKs.
  - ATT purpose string is final.
  - In-app purchases configured.
  - TestFlight verification done in target regions.

## Release Smoke Test

- Fresh install with no purchase:
  - Overseas ads visible only after required consent on the home page and study page.
  - Settings and chapter completion do not show ads.
  - China mainland route shows no ads.
  - Learning modes work without network.
  - Storefront diagnostic shows expected provider.
- Purchase / restore purchase:
  - Paid lexicon unlocked.
  - Ads hidden.
  - Local learning progress is preserved.
- Offline:
  - Built-in lexicons work.
  - Local progress persists.
  - Ads fail silently without breaking study.
