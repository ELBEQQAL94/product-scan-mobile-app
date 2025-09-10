import { ActionTypeEnum, UserAction } from "@/enums/logs";
import { BillingCycleEnum } from "@/enums/subscriptions";
import {
  create_log,
  get_user_subscription,
  save_subscription_record,
  update_user_subscription,
} from "@/external-services/firebase-config";
import { PlanConfig, UserSubscriptionState } from "@/types/subscription";
import { format_date_to_custom_string } from "@/utils";
import {
  ErrorCode,
  ProductPurchase,
  PurchaseError,
  SubscriptionPurchase,
  useIAP,
} from "expo-iap";
import { useEffect, useState } from "react";
import { Alert, ToastAndroid } from "react-native";
import { useAuth } from "./useAuth";
import { useTranslation } from "./useTranslation";
import { LanguageKey } from "@/constants/keys";

export const useInAppPurchase = () => {
  // States
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [userSubscription, setUserSubscription] =
    useState<UserSubscriptionState | null>(null);
  const [loadingSubscription, setLoadingSubscription] = useState(true);
  const [billingCycle, setBillingCycle] = useState<BillingCycleEnum>(
    BillingCycleEnum.MONTHLY
  );

  // Hooks
  const { user, loading } = useAuth();
  const { t } = useTranslation();
  const { connected, subscriptions, requestProducts, requestPurchase } = useIAP(
    {
      onPurchaseSuccess: () => onPurchaseSuccess,
      onPurchaseError: () => onPurchaseError,
    }
  );

  const onPurchaseSuccess = async (
    purchase: ProductPurchase | SubscriptionPurchase
  ) => {
    const user_action: UserAction = {
      action_type: ActionTypeEnum.USER_PURCHASE_SUCCESS,
      action_description: `subscription purchase successful`,
      action_data: JSON.stringify(purchase),
      date_format: format_date_to_custom_string(),
    };
    await create_log(user_action);

    // Update user subscription state
    await handleSubscriptionUpdate(purchase);

    ToastAndroid.show(
      t(LanguageKey.YOUR_SUBSCRIPTION_IS_NOW_ACTIVE),
      ToastAndroid.SHORT
    );
  };

  const onPurchaseError = async (purchaseError: PurchaseError) => {
    // Error is automatically typed as PurchaseError
    switch (purchaseError.code) {
      case ErrorCode.E_USER_CANCELLED:
        // Don't show error for user cancellation
        break;
      case ErrorCode.E_NETWORK_ERROR:
        Alert.alert(
          t(LanguageKey.NETWORK_ERROR),
          t(LanguageKey.PLEASE_CHECK_YOUR_CONNECTION)
        );

        break;
      case ErrorCode.E_ITEM_UNAVAILABLE:
        Alert.alert(
          t(LanguageKey.ITEM_UNAVAILABLE),
          t(LanguageKey.ITEM_IS_NOT_AVAILABLE_FOR_PURCHASE)
        );
        break;
      default:
        Alert.alert(t(LanguageKey.PURCHASE_FAILED), purchaseError.message);
    }
    const user_action: UserAction = {
      action_type: ActionTypeEnum.USER_PURCHASE_ERROR,
      action_description: `subscription purchase failed`,
      action_data: JSON.stringify(purchaseError),
      date_format: format_date_to_custom_string(),
    };
    await create_log(user_action);

    setIsLoading(false);
    Alert.alert(
      t(LanguageKey.PURCHASE_FAILED),
      purchaseError.message || t(LanguageKey.SOMETHING_WENT_WRONG)
    );
  };

  const handleSubscriptionUpdate = async (purchase: any) => {
    try {
      if (user && !loading) {
        await update_user_subscription(user.uid, true, {
          productId: purchase.productId,
          purchaseToken: purchase.purchaseToken,
          platform: "android",
          transactionDate: purchase.transactionDate,
          billingCycle: billingCycle,
        });

        // Save detailed subscription record for history
        await save_subscription_record({
          userId: user.uid,
          productId: purchase.productId,
          purchaseToken: purchase.purchaseToken,
          platform: "android",
          transactionDate: purchase.transactionDate,
          billingCycle: billingCycle,
          isActive: true,
          purchaseData: purchase,
        });

        // Update local state
        setUserSubscription({
          productId: purchase.productId,
          isActive: true,
          platform: "android",
          transactionDate: purchase.transactionDate,
          purchaseToken: purchase.purchaseToken,
        });

        setIsLoading(false);
      }
    } catch (error) {
      console.error("Failed to save subscription:", error);
      setIsLoading(false);
      Alert.alert(
        t(LanguageKey.WARNING),
        t(LanguageKey.PURCHASE_SUCCESSFUL_BUT_FAILED)
      );
    }
  };

  const handlePurchase = async (planConfig: PlanConfig) => {
    // TODO should remove after finish testing
    if (!connected) {
      Alert.alert(
        t(LanguageKey.CONNECTION_ERROR),
        "Not connected to store. Please try again."
      );
      return;
    }

    // TODO should be removed after finish testing
    if (
      userSubscription?.isActive &&
      userSubscription?.productId === planConfig.id
    ) {
      Alert.alert("Already Subscribed", "You already have this subscription!");
      return;
    }

    // Find the subscription product
    const subscription = subscriptions.find((sub) => sub.id === planConfig.id);
    // TODO should be removed after finish testing
    if (!subscription) {
      Alert.alert(
        "Product Not Found",
        "This subscription is not available right now."
      );
      return;
    }

    setIsLoading(true);

    try {
      // Check if Android subscription and get offer details
      const isAndroidSubscription = subscription.platform === "android";
      const hasOfferDetails =
        isAndroidSubscription &&
        "subscriptionOfferDetailsAndroid" in subscription &&
        subscription.subscriptionOfferDetailsAndroid;

      // Make purchase request
      await requestPurchase({
        request: {
          android: {
            skus: [subscription.id],
            subscriptionOffers: hasOfferDetails
              ? subscription.subscriptionOfferDetailsAndroid.map((offer) => ({
                  sku: subscription.id,
                  offerToken: offer.offerToken || "",
                }))
              : [
                  {
                    sku: subscription.id,
                    offerToken: "",
                  },
                ],
          },
        },
        type: "subs",
      });
    } catch (error) {
      setIsLoading(false);
      console.error("Purchase failed:", error);
      Alert.alert(
        t(LanguageKey.PURCHASE_FAILED),
        t(LanguageKey.SOMETHING_WENT_WRONG)
      );
    }
  };

  const getSubscriptionPrice = (planConfig: PlanConfig) => {
    if (planConfig.isFree) return { price: "0", period: "" };

    const subscription = subscriptions.find((sub) => sub.id === planConfig.id);

    if (!subscription) return { price: "N/A", period: "" };

    // Extract price from displayPrice
    const price = subscription.displayPrice.replace(/[^0-9.,]/g, "");
    const period =
      billingCycle === BillingCycleEnum.MONTHLY
        ? BillingCycleEnum.MONTHLY
        : BillingCycleEnum.YEARLY;
    const currency = subscription.currency;

    return { price, period, currency };
  };

  const isCurrentPlan = (planConfig: PlanConfig) => {
    if (planConfig.isFree && !userSubscription?.isActive) return true;
    if (
      !planConfig.isFree &&
      userSubscription?.productId === planConfig.id &&
      userSubscription?.isActive
    )
      return true;
    return false;
  };

  const getButtonText = (planConfig: PlanConfig) => {
    if (isCurrentPlan(planConfig)) return t(LanguageKey.CURRENT_PLAN);
    if (planConfig.isFree && userSubscription?.isActive) return "";
    if (planConfig.isFree) return t(LanguageKey.CURRENT_PLAN);
    if (userSubscription?.isActive) return t(LanguageKey.SWITCH_PLAN);
    return planConfig.buttonText;
  };

  const getButtonDisabled = (planConfig: PlanConfig) => {
    if (isLoading) return true;
    if (isCurrentPlan(planConfig) && planConfig.isFree) return true;
    return false;
  };

  // Initialize IAP
  useEffect(() => {
    const initializeIAP = async () => {
      if (connected && !isInitialized) {
        try {
          await requestProducts({
            skus: [process.env.EXPO_PUBLIC_SUBSCRIPTION_ID || "premuim"],
            type: "subs",
          });
          setIsInitialized(true);
        } catch (error) {
          console.error("Failed to initialize products:", error);
        }
      }
    };

    initializeIAP();
  }, [connected, requestProducts, isInitialized]);

  useEffect(() => {
    const loadUserSubscription = async () => {
      try {
        setLoadingSubscription(true);
        if (!user) {
          setLoadingSubscription(false);
          return;
        }

        const userData = await get_user_subscription(user.uid);
        if (userData?.is_subscribed) {
          // Check if subscription is still valid (not expired)
          const isExpired =
            userData.subscription_expiry_date &&
            userData.subscription_expiry_date < Date.now();

          if (isExpired) {
            // Subscription expired, update database
            await update_user_subscription(user.uid, false);
            setUserSubscription(null);
          } else {
            // Active subscription
            setUserSubscription({
              productId: userData.subscription_product_id || "premuim",
              isActive: userData.is_subscribed,
              platform: userData.subscription_platform || "android",
              transactionDate: userData.subscription_start_date,
              expiryDate: userData.subscription_expiry_date,
              purchaseToken: userData.purchase_token,
            });
          }
        } else {
          setUserSubscription(null);
        }
      } catch (error) {
        console.error("Failed to load user subscription:", error);
        setUserSubscription(null);
      } finally {
        setLoadingSubscription(false);
      }
    };

    loadUserSubscription();
  }, [user]);

  return {
    isLoading,
    loadingSubscription,
    userSubscription,
    billingCycle,
    setBillingCycle,
    handlePurchase,
    getSubscriptionPrice,
    getButtonText,
    getButtonDisabled,
    isCurrentPlan,
  };
};
