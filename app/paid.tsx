import { ActionTypeEnum, UserAction } from "@/enums/logs";
import { create_log } from "@/external-services/firebase-config";
import { format_date_to_custom_string } from "@/utils";
import { useIAP } from "expo-iap";
import { useEffect } from "react";
import { View, Text } from "react-native";

const androidProductIds = ["premium:pro"];
const Paid = () => {
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
        action_description: `user purchase success ${purchase}`,
        action_data: null,
        date_format: format_date_to_custom_string(),
      };
      await create_log(user_action);
      console.log("Purchase successful:", purchase);
      //   handleSuccessfulPurchase(purchase);
    },
    onPurchaseError: async (error) => {
      const user_action: UserAction = {
        action_type: ActionTypeEnum.USER_PURCHASE_ERROR,
        action_description: `user purchase error ${error}`,
        action_data: null,
        date_format: format_date_to_custom_string(),
      };
      await create_log(user_action);
      console.error("Purchase failed:", error);
      //   handlePurchaseError(error);
    },
  });
  console.log("IAP Connection status:", connected);
  const user_connected_log = async () => {
    const user_action: UserAction = {
      action_type: ActionTypeEnum.USER_PURCHASE_CONNECTED,
      action_description: `user purchase connected ${connected}`,
      action_data: null,
      date_format: format_date_to_custom_string(),
    };
    await create_log(user_action);
  };
  useEffect(() => {
    user_connected_log();
    if (connected) {
      console.log("Connected, requesting products...");
      console.log("Android Product IDs:", androidProductIds);

      requestProducts({
        skus: androidProductIds,
        type: "subs",
      });
    }
  }, [connected, requestProducts]);

  // Add this to see the current state
  console.log("Current products:", products);
  console.log("Current subscriptions:", subscriptions);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {products.map((product) => (
        <Text>{JSON.stringify(product)}</Text>
      ))}

      {subscriptions.map((subscription) => (
        <Text>{JSON.stringify(subscription)}</Text>
      ))}
    </View>
  );
};

export default Paid;
