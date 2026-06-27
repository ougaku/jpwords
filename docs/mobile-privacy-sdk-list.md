# Mobile Privacy And SDK List

本文件用于发布前整理隐私政策、第三方 SDK 清单和商店后台披露内容。

## Current Integrated SDKs

| SDK | Purpose | Platforms | Data Notes |
| --- | --- | --- | --- |
| Expo | App runtime | Android / iOS | 基础运行时能力，按 Expo 实际模块声明补充。 |
| expo-sqlite | Local storage | Android / iOS | 本地保存词库、学习进度、生词本、收藏本，不上传服务器。 |
| react-native-iap | In-app purchase | Android global / iOS | 用于购买与恢复购买；交易数据由应用商店处理。 |
| react-native-nitro-modules | Native module support | Android / iOS | IAP 依赖组件。 |
| JpWordsStorefront native module | Storefront routing | iOS | 仅读取 App Store storefront 国家码，用于广告 Provider 路由。 |
| JpWordsTrackingTransparency native module | ATT prompt | iOS | 仅请求并读取 ATT 授权状态。 |

## Planned Advertising SDKs

| SDK | Target Build | Purpose | Initialization Rule |
| --- | --- | --- | --- |
| AdMob | `android-global`, iOS non-`CN` storefront | 海外广告 | 默认非个性化；个性化需 ATT/地区同意。 |
| GroMore | Future optional | 中国大陆广告 | 取得平台资质后再评估接入。 |

## Store Disclosure Checklist

- Apple App Privacy:
  - AdMob 数据行为。
  - IAP 数据行为。
  - 是否使用 IDFA。
  - 是否追踪用户。
- Google Play Data Safety:
  - 广告 SDK 数据收集。
  - 购买数据由 Google Play 处理。
  - 本地学习数据不上传服务器。
- 国内 Android 商店:
  - 隐私政策 URL。
  - 第三方 SDK 清单。
  - 第一版国内包不展示广告、不接广告 SDK 的说明。

## Required Before Production

- 填写正式广告位 ID。
- 确认 AdMob SDK 版本和隐私清单。
- 准备线上隐私政策页面。
- 准备第三方 SDK 清单页面。
- 使用真机验证同意前 SDK 不初始化。
