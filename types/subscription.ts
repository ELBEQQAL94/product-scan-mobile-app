export interface SubscriptionData {
  productId?: string;
  purchaseToken?: string;
  platform?: "android" | "ios";
  transactionDate?: number;
  billingCycle?: string;
}

export interface PlanConfig {
  id: string;
  name: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonStyle: "outline" | "primary";
  popular: boolean;
  isFree: boolean;
}

export interface UserSubscriptionState {
  productId: string;
  isActive: boolean;
  platform: "android" | "ios";
  transactionDate?: number;
  expiryDate?: number;
  purchaseToken?: string;
}
