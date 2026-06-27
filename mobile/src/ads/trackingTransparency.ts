import { NativeModules, Platform } from "react-native";

export type TrackingAuthorizationStatus =
  | "authorized"
  | "denied"
  | "restricted"
  | "not_determined"
  | "unavailable"
  | "unknown";

type TrackingTransparencyNativeModule = {
  getTrackingStatus?: () => Promise<TrackingAuthorizationStatus>;
  requestTrackingAuthorization?: () => Promise<TrackingAuthorizationStatus>;
};

function nativeModule() {
  if (Platform.OS !== "ios") return null;
  return NativeModules.JpWordsTrackingTransparency as TrackingTransparencyNativeModule | undefined;
}

export async function getTrackingAuthorizationStatus(): Promise<TrackingAuthorizationStatus> {
  const module = nativeModule();
  if (!module?.getTrackingStatus) return "unavailable";
  try {
    return await module.getTrackingStatus();
  } catch {
    return "unknown";
  }
}

export async function requestTrackingAuthorization(): Promise<TrackingAuthorizationStatus> {
  const module = nativeModule();
  if (!module?.requestTrackingAuthorization) return "unavailable";
  try {
    return await module.requestTrackingAuthorization();
  } catch {
    return "unknown";
  }
}
