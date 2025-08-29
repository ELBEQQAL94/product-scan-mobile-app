import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/themes/colors";
import { useIAP } from "expo-iap";
import { ActionTypeEnum, UserAction } from "@/enums/logs";
import {
  create_log,
  update_user_subscription,
  get_user_subscription,
  save_subscription_record,
} from "@/external-services/firebase-config";
import { format_date_to_custom_string } from "@/utils";
import auth from "@react-native-firebase/auth";
import { send_hello_world_func } from "@/services";

// Android product IDs - match your Google Play Console
const androidProductIds = ["premuim"]; // Fix this typo or update in Google Play

interface PlanConfig {
  id: string;
  name: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonStyle: "outline" | "primary";
  popular: boolean;
  isFree: boolean;
}

interface UserSubscriptionState {
  productId: string;
  isActive: boolean;
  platform: "android" | "ios";
  transactionDate?: number;
  expiryDate?: number;
  purchaseToken?: string;
}

const PricingScreen = () => {
  const [billingCycle, setBillingCycle] = useState<string>("monthly");
  const [userSubscription, setUserSubscription] =
    useState<UserSubscriptionState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [loadingSubscription, setLoadingSubscription] = useState(true);

  // IAP Hook
  const { connected, subscriptions, requestProducts, requestPurchase } = useIAP(
    {
      onPurchaseSuccess: async (purchase) => {
        const user_action: UserAction = {
          action_type: ActionTypeEnum.USER_PURCHASE_SUCCESS,
          action_description: `subscription purchase successful`,
          action_data: JSON.stringify(purchase),
          date_format: format_date_to_custom_string(),
        };
        await create_log(user_action);

        // Update user subscription state
        await handleSubscriptionUpdate(purchase);

        Alert.alert(
          "Success!",
          "Your subscription is now active. Enjoy premium features!"
        );
      },
      onPurchaseError: async (error) => {
        const user_action: UserAction = {
          action_type: ActionTypeEnum.USER_PURCHASE_ERROR,
          action_description: `subscription purchase failed`,
          action_data: JSON.stringify(error),
          date_format: format_date_to_custom_string(),
        };
        await create_log(user_action);

        setIsLoading(false);
        Alert.alert(
          "Purchase Failed",
          error.message || "Something went wrong. Please try again."
        );
      },
    }
  );

  // Plan configurations
  const planConfigs: PlanConfig[] = [
    {
      id: "free",
      name: "Free",
      description: "Perfect for trying out our service",
      features: [
        "Basic barcode scanning (camera)",
        "Product search",
        "Health score analysis",
        "Manual barcode entry",
      ],
      buttonText: "Current Plan",
      buttonStyle: "outline",
      popular: false,
      isFree: true,
    },
    {
      id: "premuim", // Match your Google Play product ID
      name: "Pro",
      description: "Best for regular users",
      features: [
        "Unlimited scans",
        "Detailed nutrition analysis",
        "Ingredient breakdown",
        "Personalized recommendations",
        "Halal/Haram detection",
        "Priority support",
        "Export features",
      ],
      buttonText: "Start Free Trial",
      buttonStyle: "primary",
      popular: true,
      isFree: false,
    },
  ];

  // Initialize IAP
  useEffect(() => {
    const initializeIAP = async () => {
      if (connected && !isInitialized) {
        try {
          await requestProducts({
            skus: androidProductIds,
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

  // Load user subscription status on mount
  useEffect(() => {
    loadUserSubscription();
  }, []);

  const loadUserSubscription = async () => {
    try {
      setLoadingSubscription(true);
      const currentUser = auth().currentUser;
      if (!currentUser) {
        setLoadingSubscription(false);
        return;
      }

      const userData = await get_user_subscription(currentUser.uid);
      if (userData?.is_subscribed) {
        // Check if subscription is still valid (not expired)
        const isExpired =
          userData.subscription_expiry_date &&
          userData.subscription_expiry_date < Date.now();

        if (isExpired) {
          // Subscription expired, update database
          await update_user_subscription(currentUser.uid, false);
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

  const handleSubscriptionUpdate = async (purchase: any) => {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        throw new Error("No authenticated user");
      }

      // Update user subscription in database
      await update_user_subscription(currentUser.uid, true, {
        productId: purchase.productId,
        purchaseToken: purchase.purchaseToken,
        platform: "android",
        transactionDate: purchase.transactionDate,
        billingCycle: billingCycle,
      });

      // Save detailed subscription record for history
      await save_subscription_record({
        userId: currentUser.uid,
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
    } catch (error) {
      console.error("Failed to save subscription:", error);
      setIsLoading(false);
      Alert.alert(
        "Warning",
        "Purchase successful but failed to save subscription data. Please restart the app."
      );
    }
  };

  const handlePurchase = async (planConfig: PlanConfig) => {
    const result = await send_hello_world_func();
    const user_action: UserAction = {
      action_type: ActionTypeEnum.CHECK_HELLO_WORLD_FUNCTION,
      action_description: `test hello world function`,
      action_data: JSON.stringify(result),
      date_format: format_date_to_custom_string(),
    };
    await create_log(user_action);
    if (planConfig.isFree) {
      // Handle downgrade to free plan
      await handleDowngradeToFree();
      return;
    }

    if (!connected) {
      Alert.alert(
        "Connection Error",
        "Not connected to store. Please try again."
      );
      return;
    }

    const currentUser = auth().currentUser;
    if (!currentUser) {
      Alert.alert("Authentication Error", "Please log in to continue.");
      return;
    }

    if (
      userSubscription?.isActive &&
      userSubscription?.productId === planConfig.id
    ) {
      Alert.alert("Already Subscribed", "You already have this subscription!");
      return;
    }

    // Find the subscription product
    const subscription = subscriptions.find((sub) => sub.id === planConfig.id);
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
      Alert.alert("Purchase Failed", "Something went wrong. Please try again.");
    }
  };

  const handleDowngradeToFree = async () => {
    const currentUser = auth().currentUser;
    if (!currentUser) return;

    Alert.alert(
      "Downgrade to Free",
      "Are you sure you want to cancel your subscription? You'll lose access to premium features.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          style: "destructive",
          onPress: async () => {
            try {
              setIsLoading(true);

              // Update subscription status in database
              await update_user_subscription(currentUser.uid, false);

              // Update local state
              setUserSubscription(null);

              Alert.alert(
                "Subscription Cancelled",
                "You've been downgraded to the free plan."
              );
            } catch (error) {
              console.error("Failed to cancel subscription:", error);
              Alert.alert(
                "Error",
                "Failed to cancel subscription. Please try again."
              );
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  const getSubscriptionPrice = (planConfig: PlanConfig) => {
    if (planConfig.isFree) return { price: "0", period: "" };

    const subscription = subscriptions.find((sub) => sub.id === planConfig.id);
    if (!subscription) return { price: "N/A", period: "" };

    // Extract price from displayPrice
    const price = subscription.displayPrice.replace(/[^0-9.,]/g, "");
    const period = billingCycle === "monthly" ? "month" : "year";
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
    if (isCurrentPlan(planConfig)) return "Current Plan";
    if (planConfig.isFree && userSubscription?.isActive)
      return "Cancel Subscription";
    if (planConfig.isFree) return "Current Plan";
    if (userSubscription?.isActive) return "Switch Plan";
    return planConfig.buttonText;
  };

  const getButtonDisabled = (planConfig: PlanConfig) => {
    if (isLoading) return true;
    if (isCurrentPlan(planConfig) && planConfig.isFree) return true;
    return false;
  };

  // Show loading state while checking subscription
  if (loadingSubscription) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={Colors.LIGHT_GREEN} />
        <Text style={{ marginTop: 10, color: Colors.MEDIUM_GRAY }}>
          Loading subscription...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Choose Your Plan</Text>
        <Text style={styles.headerSubtitle}>
          Unlock the full potential of healthy eating with our premium features
        </Text>
      </View>

      {/* Connection Status */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          Store: {connected ? "✅ Connected" : "❌ Disconnected"}
        </Text>
        <Text style={styles.statusText}>
          Products: {subscriptions.length} available
        </Text>
        {userSubscription?.isActive && (
          <Text style={styles.statusText}>Status: ✅ Premium Active</Text>
        )}
      </View>

      {/* Billing Toggle - only show if not subscribed */}
      {!userSubscription?.isActive && (
        <View style={styles.billingToggleContainer}>
          <View style={styles.billingToggle}>
            <TouchableOpacity
              onPress={() => setBillingCycle("monthly")}
              style={[
                styles.toggleButton,
                billingCycle === "monthly" && styles.toggleButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  billingCycle === "monthly" && styles.toggleButtonTextActive,
                ]}
              >
                Monthly
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setBillingCycle("yearly")}
              style={[
                styles.toggleButton,
                billingCycle === "yearly" && styles.toggleButtonActive,
                { position: "relative" },
              ]}
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  billingCycle === "yearly" && styles.toggleButtonTextActive,
                ]}
              >
                Yearly
              </Text>
              <View style={styles.saveBadge}>
                <Text style={styles.saveBadgeText}>30% OFF</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Pricing Cards */}
      <View style={styles.cardsContainer}>
        {planConfigs.map((planConfig, index) => {
          const { price, period, currency } = getSubscriptionPrice(planConfig);
          const isCurrent = isCurrentPlan(planConfig);

          return (
            <View
              key={planConfig.id}
              style={[
                styles.card,
                planConfig.popular && styles.cardPopular,
                isCurrent && styles.cardCurrent,
              ]}
            >
              {/* Popular Badge */}
              {planConfig.popular && !isCurrent && (
                <View style={styles.popularBadge}>
                  <Ionicons name="star" size={12} color={Colors.WHITE} />
                  <Text style={styles.popularBadgeText}>MOST POPULAR</Text>
                </View>
              )}

              {/* Current Plan Badge */}
              {isCurrent && (
                <View style={styles.currentBadge}>
                  <Ionicons
                    name="checkmark-circle"
                    size={12}
                    color={Colors.WHITE}
                  />
                  <Text style={styles.currentBadgeText}>CURRENT PLAN</Text>
                </View>
              )}

              {/* Plan Header */}
              <View style={styles.planHeader}>
                <Text style={styles.planName}>{planConfig.name}</Text>
                <Text style={styles.planDescription}>
                  {planConfig.description}
                </Text>

                {/* Price */}
                <View style={styles.priceContainer}>
                  <Text style={styles.priceSymbol}>{currency}</Text>
                  <Text style={styles.priceAmount}>{price}</Text>
                  {period && <Text style={styles.pricePeriod}>/{period}</Text>}
                </View>
              </View>

              {/* Features */}
              <View style={styles.featuresContainer}>
                {planConfig.features.map((feature, idx) => (
                  <View key={idx} style={styles.featureRow}>
                    <View style={styles.checkIcon}>
                      <Ionicons
                        name="checkmark"
                        size={12}
                        color={Colors.WHITE}
                      />
                    </View>
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>

              {/* CTA Button */}
              <TouchableOpacity
                style={[
                  styles.ctaButton,
                  isCurrent
                    ? styles.ctaButtonCurrent
                    : planConfig.buttonStyle === "outline"
                    ? styles.ctaButtonOutline
                    : styles.ctaButtonPrimary,
                ]}
                onPress={() => handlePurchase(planConfig)}
                disabled={getButtonDisabled(planConfig)}
                activeOpacity={0.8}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color={Colors.WHITE} />
                ) : (
                  <Text
                    style={[
                      styles.ctaButtonText,
                      isCurrent
                        ? styles.ctaButtonTextCurrent
                        : planConfig.buttonStyle === "outline"
                        ? styles.ctaButtonTextOutline
                        : styles.ctaButtonTextPrimary,
                    ]}
                  >
                    {getButtonText(planConfig)}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      {/* Current Subscription Info */}
      {userSubscription?.isActive && (
        <View style={styles.subscriptionInfo}>
          <Text style={styles.subscriptionTitle}>Current Subscription</Text>
          <Text style={styles.subscriptionDetails}>
            Plan:{" "}
            {planConfigs.find((p) => p.id === userSubscription.productId)
              ?.name || "Pro"}
          </Text>
          {userSubscription.transactionDate && (
            <Text style={styles.subscriptionDetails}>
              Started:{" "}
              {new Date(userSubscription.transactionDate).toLocaleDateString()}
            </Text>
          )}
          {userSubscription.expiryDate && (
            <Text style={styles.subscriptionDetails}>
              {userSubscription.expiryDate > Date.now()
                ? `Expires: ${new Date(
                    userSubscription.expiryDate
                  ).toLocaleDateString()}`
                : "Status: Expired"}
            </Text>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.VERY_LIGHT_GRAY,
  },
  header: {
    backgroundColor: Colors.LIGHT_GREEN,
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.WHITE,
    textAlign: "center",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.WHITE,
    textAlign: "center",
    opacity: 0.9,
    lineHeight: 22,
  },
  statusContainer: {
    backgroundColor: Colors.WHITE,
    margin: 20,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  statusText: {
    fontSize: 12,
    color: Colors.MEDIUM_GRAY,
    marginBottom: 2,
  },
  billingToggleContainer: {
    alignItems: "center",
    paddingVertical: 30,
  },
  billingToggle: {
    flexDirection: "row",
    backgroundColor: Colors.WHITE,
    borderRadius: 25,
    padding: 4,
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  toggleButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 21,
    minWidth: 80,
    alignItems: "center",
  },
  toggleButtonActive: {
    backgroundColor: Colors.LIGHT_GREEN,
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.CHARCOAL,
  },
  toggleButtonTextActive: {
    color: Colors.WHITE,
  },
  saveBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: Colors.GLOVO_YELLOW,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  saveBadgeText: {
    fontSize: 9,
    fontWeight: "700",
    color: Colors.CHARCOAL,
  },
  cardsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: Colors.WHITE,
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
  },
  cardPopular: {
    borderColor: Colors.LIGHT_GREEN,
    borderWidth: 2,
    transform: [{ scale: 1.02 }],
  },
  cardCurrent: {
    borderColor: Colors.GLOVO_YELLOW,
    borderWidth: 2,
    backgroundColor: "#FFFEF7",
  },
  popularBadge: {
    position: "absolute",
    top: -12,
    left: "50%",
    transform: [{ translateX: -60 }],
    backgroundColor: Colors.LIGHT_GREEN,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  popularBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.WHITE,
  },
  currentBadge: {
    position: "absolute",
    top: -12,
    right: 20,
    backgroundColor: Colors.GLOVO_YELLOW,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  currentBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.CHARCOAL,
  },
  planHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  planName: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.CHARCOAL,
    marginBottom: 4,
  },
  planDescription: {
    fontSize: 14,
    color: Colors.MEDIUM_GRAY,
    textAlign: "center",
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  priceSymbol: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.CHARCOAL,
    marginTop: 8,
  },
  priceAmount: {
    fontSize: 42,
    fontWeight: "700",
    color: Colors.CHARCOAL,
  },
  pricePeriod: {
    fontSize: 16,
    color: Colors.MEDIUM_GRAY,
    fontWeight: "500",
    marginTop: 20,
  },
  featuresContainer: {
    marginBottom: 24,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  checkIcon: {
    backgroundColor: Colors.LIGHT_GREEN,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  featureText: {
    flex: 1,
    fontSize: 14,
    color: Colors.CHARCOAL,
    lineHeight: 20,
  },
  ctaButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  ctaButtonPrimary: {
    backgroundColor: Colors.LIGHT_GREEN,
  },
  ctaButtonOutline: {
    backgroundColor: Colors.WHITE,
    borderWidth: 2,
    borderColor: Colors.LIGHT_GREEN,
  },
  ctaButtonCurrent: {
    backgroundColor: Colors.MEDIUM_GRAY,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  ctaButtonTextPrimary: {
    color: Colors.WHITE,
  },
  ctaButtonTextOutline: {
    color: Colors.LIGHT_GREEN,
  },
  ctaButtonTextCurrent: {
    color: Colors.WHITE,
  },
  subscriptionInfo: {
    backgroundColor: Colors.WHITE,
    margin: 20,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GREEN,
  },
  subscriptionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.CHARCOAL,
    marginBottom: 8,
  },
  subscriptionDetails: {
    fontSize: 14,
    color: Colors.MEDIUM_GRAY,
    marginBottom: 4,
  },
});

export default PricingScreen;
