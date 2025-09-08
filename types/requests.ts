import { SubscriptionData } from "./subscription";

export interface VerifyPurchaseRequestBody {
  subscription_product_id: string;
  purchase_token: string;
}

export interface UpdateUserSubscriptionRequest {
  userId: string;
  isSubscribed: boolean;
  subscriptionData?: SubscriptionData;
}
