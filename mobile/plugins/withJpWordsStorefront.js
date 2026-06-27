const { withBuildSourceFile } = require("@expo/config-plugins/build/ios/XcodeProjectFile");

const swiftSource = `import Foundation
import StoreKit

@objc(JpWordsStorefront)
class JpWordsStorefront: NSObject {
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }

  @objc(getStorefrontCountryCode:rejecter:)
  func getStorefrontCountryCode(
    resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    if #available(iOS 15.0, *) {
      Task {
        if let countryCode = await Storefront.current?.countryCode {
          resolve(countryCode)
        } else {
          resolve(nil)
        }
      }
      return
    }

    if #available(iOS 13.0, *) {
      resolve(SKPaymentQueue.default().storefront?.countryCode)
      return
    }

    resolve(nil)
  }
}
`;

const bridgeSource = `#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(JpWordsStorefront, NSObject)
RCT_EXTERN_METHOD(getStorefrontCountryCode:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
@end
`;

const trackingTransparencySwiftSource = `import AppTrackingTransparency
import Foundation

@objc(JpWordsTrackingTransparency)
class JpWordsTrackingTransparency: NSObject {
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }

  @objc(getTrackingStatus:rejecter:)
  func getTrackingStatus(
    resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    if #available(iOS 14.0, *) {
      resolve(statusName(ATTrackingManager.trackingAuthorizationStatus))
      return
    }
    resolve("unavailable")
  }

  @objc(requestTrackingAuthorization:rejecter:)
  func requestTrackingAuthorization(
    resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    if #available(iOS 14.0, *) {
      ATTrackingManager.requestTrackingAuthorization { status in
        resolve(self.statusName(status))
      }
      return
    }
    resolve("unavailable")
  }

  private func statusName(_ status: ATTrackingManager.AuthorizationStatus) -> String {
    switch status {
    case .authorized:
      return "authorized"
    case .denied:
      return "denied"
    case .restricted:
      return "restricted"
    case .notDetermined:
      return "not_determined"
    @unknown default:
      return "unknown"
    }
  }
}
`;

const trackingTransparencyBridgeSource = `#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(JpWordsTrackingTransparency, NSObject)
RCT_EXTERN_METHOD(getTrackingStatus:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(requestTrackingAuthorization:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
@end
`;

function withJpWordsStorefront(config) {
  config = withBuildSourceFile(config, {
    filePath: "JpWordsStorefront.swift",
    contents: swiftSource,
    overwrite: true
  });

  config = withBuildSourceFile(config, {
    filePath: "JpWordsStorefrontBridge.m",
    contents: bridgeSource,
    overwrite: true
  });

  config = withBuildSourceFile(config, {
    filePath: "JpWordsTrackingTransparency.swift",
    contents: trackingTransparencySwiftSource,
    overwrite: true
  });

  config = withBuildSourceFile(config, {
    filePath: "JpWordsTrackingTransparencyBridge.m",
    contents: trackingTransparencyBridgeSource,
    overwrite: true
  });

  return config;
}

module.exports = withJpWordsStorefront;
