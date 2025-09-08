export interface SubscriptionData {
  productId?: string;
  purchaseToken?: string;
  platform?: "android" | "ios";
  transactionDate?: number;
  billingCycle?: string;
}
