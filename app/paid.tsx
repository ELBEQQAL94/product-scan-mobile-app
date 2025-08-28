import { ActionTypeEnum, UserAction } from "@/enums/logs";
import { create_log } from "@/external-services/firebase-config";
import { format_date_to_custom_string } from "@/utils";
import { useIAP, SubscriptionProduct } from "expo-iap";
import { useEffect, useState } from "react";
import { View, Text, Button, Alert } from "react-native";

// Fix 1: Use the exact product ID from Google Play Console
const androidProductIds = ["premuim"]; // Match your Google Play Console ID exactly

const Paid = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  const {
    connected,
    products,
    subscriptions,
    requestProducts,
    requestPurchase,
  } = useIAP({
    onPurchaseSuccess: async (purchase) => {
      const user_action: UserAction = {
        action_type: ActionTypeEnum.USER_PURCHASE_SUCCESS,
        action_description: `user purchase success`,
        action_data: JSON.stringify(purchase),
        date_format: format_date_to_custom_string(),
      };
      await create_log(user_action);
      console.log("Purchase successful:", purchase);
      Alert.alert("Success", "Purchase completed successfully!");
    },
    onPurchaseError: async (error) => {
      const user_action: UserAction = {
        action_type: ActionTypeEnum.USER_PURCHASE_ERROR,
        action_description: `user purchase error`,
        action_data: JSON.stringify(error),
        date_format: format_date_to_custom_string(),
      };
      await create_log(user_action);
      console.error("Purchase failed:", error);
      Alert.alert("Error", `Purchase failed: ${error.message || error}`);
    },
  });

  // Fix 2: Better connection handling
  useEffect(() => {
    const logConnection = async () => {
      const user_action: UserAction = {
        action_type: ActionTypeEnum.USER_PURCHASE_CONNECTED,
        action_description: `user purchase connected ${connected}`,
        action_data: JSON.stringify({ connected, timestamp: Date.now() }),
        date_format: format_date_to_custom_string(),
      };
      await create_log(user_action);
    };

    logConnection();

    // Fix 3: Only request products once when stable connection is established
    if (connected && !isInitialized) {
      console.log("Connected, requesting products...");
      console.log("Android Product IDs:", androidProductIds);

      requestProducts({
        skus: androidProductIds,
        type: "subs", // Correct for subscriptions
      })
        .then(() => {
          setIsInitialized(true);
          console.log("Products requested successfully");
        })
        .catch((error) => {
          console.error("Failed to request products:", error);
        });
    }
  }, [connected, requestProducts, isInitialized]);

  // Fix 4: Add debugging info
  console.log("IAP Connection status:", connected);
  console.log("Is initialized:", isInitialized);
  console.log("Current products:", products);
  console.log("Current subscriptions:", subscriptions);

  // Android-only purchase handler with proper typing
  const handlePurchase = (subscription: SubscriptionProduct) => {
    if (!connected) {
      Alert.alert("Error", "Not connected to store");
      return;
    }

    console.log("Attempting Android subscription purchase:", subscription);
    console.log("Subscription ID:", subscription.id);

    if (!subscription.id) {
      console.error("No subscription ID found:", subscription);
      Alert.alert("Error", "Subscription ID not found");
      return;
    }

    // Check if this is an Android subscription and has offer details
    const isAndroidSubscription = subscription.platform === "android";
    const hasOfferDetails =
      isAndroidSubscription &&
      "subscriptionOfferDetailsAndroid" in subscription &&
      subscription.subscriptionOfferDetailsAndroid;

    // Android-specific subscription request
    requestPurchase({
      request: {
        android: {
          skus: [subscription.id],
          // Include subscription offers if available
          subscriptionOffers: hasOfferDetails
            ? subscription.subscriptionOfferDetailsAndroid.map((offer) => ({
                sku: subscription.id,
                offerToken: offer.offerToken || "",
              }))
            : [
                // Fallback: basic offer without token
                {
                  sku: subscription.id,
                  offerToken: "",
                },
              ],
        },
      },
      type: "subs",
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{ marginBottom: 20, fontSize: 18, fontWeight: "bold" }}>
        Payment Test
      </Text>

      <Text style={{ marginBottom: 10 }}>
        Connection: {connected ? "✅ Connected" : "❌ Disconnected"}
      </Text>

      <Text style={{ marginBottom: 10 }}>
        Initialized: {isInitialized ? "✅ Yes" : "❌ No"}
      </Text>

      <Text style={{ marginBottom: 10 }}>
        Subscriptions found: {subscriptions.length}
      </Text>

      {/* Android-only subscription display */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>
          Android Subscriptions:
        </Text>
        {subscriptions.length > 0 ? (
          subscriptions.map((subscription, index) => {
            // Type-safe check for Android subscription
            const isAndroidSubscription = subscription.platform === "android";
            const hasOfferDetails =
              isAndroidSubscription &&
              "subscriptionOfferDetailsAndroid" in subscription &&
              subscription.subscriptionOfferDetailsAndroid;

            return (
              <View
                key={index}
                style={{
                  marginBottom: 15,
                  padding: 10,
                  backgroundColor: "#e0f0ff",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>
                  ID: {subscription.id}
                </Text>
                <Text>Title: {subscription.title}</Text>
                <Text>Description: {subscription.description}</Text>
                <Text>Display Price: {subscription.displayPrice}</Text>
                <Text>Currency: {subscription.currency}</Text>
                <Text>Platform: {subscription.platform || "Unknown"}</Text>

                {/* Android subscription offer details - with type checking */}
                {hasOfferDetails && (
                  <View style={{ marginTop: 5 }}>
                    <Text style={{ fontWeight: "bold" }}>
                      Available Offers:
                    </Text>
                    {subscription.subscriptionOfferDetailsAndroid.map(
                      (offer, i) => (
                        <View key={i} style={{ marginLeft: 10, marginTop: 2 }}>
                          <Text style={{ fontSize: 10, color: "#666" }}>
                            Token: {offer.offerToken || "None"}
                          </Text>
                          {/* Show pricing phase details if available */}
                        </View>
                      )
                    )}
                  </View>
                )}

                {/* Show message if no offers available */}
                {isAndroidSubscription && !hasOfferDetails && (
                  <Text style={{ fontSize: 12, color: "#666", marginTop: 5 }}>
                    No subscription offers available
                  </Text>
                )}

                <Button
                  title="Subscribe Now"
                  onPress={() => handlePurchase(subscription)}
                />

                {/* Debug info */}
                <Text style={{ fontSize: 8, marginTop: 5, color: "#999" }}>
                  Type: {subscription.type} | Platform:{" "}
                  {subscription.platform || "Unknown"}
                </Text>
              </View>
            );
          })
        ) : (
          <Text>No Android subscriptions found</Text>
        )}
      </View>

      {/* Debug button */}
      <View style={{ marginTop: 20 }}>
        <Button
          title="Retry Connection"
          onPress={() => {
            setIsInitialized(false);
            console.log("Retrying connection...");
          }}
        />
      </View>
    </View>
  );
};

export default Paid;
