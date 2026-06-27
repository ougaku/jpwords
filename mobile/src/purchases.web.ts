import type { EntitlementRecord } from "./db/localRepository";

export type PurchaseSyncResult = {
  entitlements: EntitlementRecord[];
  message: string;
};

export async function loadProducts() {
  return [];
}

export async function buyLexicon(): Promise<PurchaseSyncResult> {
  throw new Error("Web preview does not support in-app purchases.");
}

export async function restorePurchases(): Promise<PurchaseSyncResult> {
  return {
    entitlements: [],
    message: "Web preview has no purchases to restore."
  };
}

export async function syncOwnedPurchases(): Promise<PurchaseSyncResult> {
  return {
    entitlements: [],
    message: "Web preview has no purchases to sync."
  };
}

export function subscribeToPurchaseUpdates(): () => void {
  return () => undefined;
}

export async function closePurchaseConnection(): Promise<void> {
  return;
}

export function readErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "Unknown error.";
}
