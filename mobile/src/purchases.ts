import { Platform } from "react-native";
import {
  endConnection,
  fetchProducts,
  finishTransaction,
  getAvailablePurchases,
  initConnection,
  purchaseErrorListener,
  purchaseUpdatedListener,
  requestPurchase,
  restorePurchases as restoreStorePurchases,
  type EventSubscription,
  type Product,
  type ProductOrSubscription,
  type Purchase,
  type PurchaseError
} from "react-native-iap";
import { lexiconForProduct, lexiconProducts } from "./entitlement";
import type { EntitlementRecord } from "./db/localRepository";

export type PurchaseSyncResult = {
  entitlements: EntitlementRecord[];
  message: string;
};

const productIds = lexiconProducts.map((item) => item.productId);

export async function loadProducts(): Promise<Product[]> {
  await connectStore();
  const products = await fetchProducts({
    skus: productIds,
    type: "in-app"
  });
  return (products || []).filter(isProduct);
}

export async function buyLexicon(productId: string): Promise<PurchaseSyncResult> {
  if (!productIds.includes(productId)) {
    throw new Error(`未配置的商品：${productId}`);
  }
  await connectStore();
  const result = await requestPurchase({
    request: {
      apple: { sku: productId },
      google: { skus: [productId] }
    },
    type: "in-app"
  });
  const purchases = normalizePurchases(result);
  return buildSyncResult(purchases, "购买成功，词库已解锁。", "购买请求已提交，等待商店确认。");
}

export async function restorePurchases(): Promise<PurchaseSyncResult> {
  await connectStore();
  await restoreStorePurchases();
  const restoredPurchases: Purchase[] = [];
  const available = await getAvailablePurchases();
  const purchases = restoredPurchases.length ? restoredPurchases : available;
  return buildSyncResult(purchases, "已恢复购买。", "没有可恢复的购买。");
}

export async function syncOwnedPurchases(): Promise<PurchaseSyncResult> {
  await connectStore();
  const purchases = await getAvailablePurchases();
  return buildSyncResult(purchases, "已同步商店购买。", "没有可同步的购买。");
}

export function subscribeToPurchaseUpdates(
  onPurchase: (record: EntitlementRecord) => void | Promise<void>,
  onError: (message: string) => void
): () => void {
  const updated = purchaseUpdatedListener(async (purchase) => {
    const record = entitlementFromPurchase(purchase);
    if (!record) return;
    try {
      await onPurchase(record);
      await finishTransaction({ purchase, isConsumable: false });
    } catch (error) {
      onError(readErrorMessage(error));
    }
  });
  const failed = purchaseErrorListener((error: PurchaseError) => {
    onError(error.message || "购买未完成。");
  });
  return () => {
    removeSubscription(updated);
    removeSubscription(failed);
  };
}

export async function closePurchaseConnection(): Promise<void> {
  try {
    await endConnection();
  } catch {
    // Closing is best-effort; the next operation will reconnect if needed.
  }
}

export function readErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "商店内购暂不可用，请稍后再试。";
}

let connectionPromise: Promise<boolean> | null = null;

async function connectStore(): Promise<boolean> {
  if (Platform.OS !== "ios" && Platform.OS !== "android") {
    throw new Error("当前平台不支持商店内购。请在 iOS 或 Android 真机/商店测试环境中使用。");
  }
  connectionPromise = connectionPromise || initConnection().catch((error) => {
    connectionPromise = null;
    throw new Error(`商店内购不可用：${readErrorMessage(error)}`);
  });
  return connectionPromise;
}

function buildSyncResult(purchases: Purchase[], successMessage: string, emptyMessage: string): PurchaseSyncResult {
  const entitlements = purchases
    .map(entitlementFromPurchase)
    .filter((record): record is EntitlementRecord => !!record);
  return {
    entitlements,
    message: entitlements.length ? successMessage : emptyMessage
  };
}

function entitlementFromPurchase(purchase: Purchase): EntitlementRecord | null {
  const product = lexiconForProduct(purchase.productId);
  if (!product) return null;
  return {
    productId: product.productId,
    lexiconId: product.lexiconId,
    source: purchase.store === "apple" ? "app_store" : "google_play",
    transactionId: purchase.transactionId || purchase.purchaseToken || purchase.id,
    unlockedAt: new Date(purchase.transactionDate || Date.now()).toISOString()
  };
}

function normalizePurchases(value: Purchase | Purchase[] | null | undefined): Purchase[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function isProduct(value: ProductOrSubscription): value is Product {
  return value.type === "in-app";
}

function removeSubscription(subscription: EventSubscription): void {
  subscription.remove();
}
