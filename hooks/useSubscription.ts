import { useEffect, useState } from "react";
import { get_user_subscription } from "@/external-services/firebase-config";
import { useAuth } from "@/hooks/useAuth";
import { VerifyPurchaseRequestBody } from "@/types/requests";
import { verify_google_play_purchase_func } from "@/services";

export const useSubscription = () => {
  // Hooks
  const { user, loading: userLoading } = useAuth();

  // States
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // load user subscription
  // verify token if exists
  // if not valid update user subscription data

  useEffect(() => {
    const verify = async () => {
      // user not auth or account not exists
      if (!user && !userLoading) {
        setIsSubscribed(false);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      if (user?.uid) {
        try {
          const userData = await get_user_subscription(user.uid);

          if (!userData?.is_subscribed) {
            setIsSubscribed(false);
            setIsLoading(false);
            return;
          }

          if (userData.subscription_product_id && userData.purchase_token) {
            const body: VerifyPurchaseRequestBody = {
              subscription_product_id: userData.subscription_product_id,
              purchase_token: userData.purchase_token,
            };
            const response = await verify_google_play_purchase_func(body);

            if (response) {
              setIsSubscribed(response.valid);
              setIsLoading(false);
            }
          }
        } catch (error: unknown) {
          console.log("error: verify token", error);
          setIsLoading(false);
          setIsSubscribed(false);
        }
      }
    };

    if (user && !userLoading) {
      verify();
    }
  }, [user, userLoading]);

  return {
    isSubscribed,
    isLoading,
  };
};
