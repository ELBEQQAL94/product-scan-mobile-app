import { useEffect, useState, useCallback } from "react";
import {
  get_user_subscription,
  update_user_subscription,
} from "@/external-services/firebase-config";
import { useAuth } from "@/hooks/useAuth";
import { VerifyPurchaseRequestBody } from "@/types/requests";
import { verify_google_purchase_func } from "@/services";

export const useSubscription = () => {
  // Hooks
  const { user, loading: userLoading } = useAuth();

  // States
  const [isPro, setIsPro] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  /**
   * Load subscription info from Firestore
   */
  const loadUserSubscription = useCallback(async () => {
    if (!user) {
      setIsPro(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const userData = await get_user_subscription(user.uid);

      if (userData?.is_subscribed) {
        const expired =
          userData.subscription_expiry_date &&
          userData.subscription_expiry_date < Date.now();

        if (expired) {
          // Expired → update DB
          await update_user_subscription(user.uid, false);
          setIsPro(false);
        } else {
          setIsPro(true);
        }
      } else {
        setIsPro(false);
      }
    } catch (error) {
      console.error("❌ Failed to load subscription:", error);
      setIsPro(false);
    } finally {
      setLoading(false);
    }
  }, [user]);

  /**
   * Verify purchase token with server
   */
  const verify = useCallback(async () => {
    if (!user) return false;

    try {
      const userData = await get_user_subscription(user.uid);
      if (!userData?.purchase_token || !userData?.subscription_product_id) {
        return false;
      }

      const body: VerifyPurchaseRequestBody = {
        subscription_product_id: userData.subscription_product_id,
        purchase_token: userData.purchase_token,
      };

      const res = await verify_google_purchase_func(body);
      if (res?.valid) {
        setIsPro(true);
        return true;
      } else {
        setIsPro(false);
        return false;
      }
    } catch (error) {
      console.error("❌ Failed to verify purchase:", error);
      setIsPro(false);
      return false;
    }
  }, [user]);

  useEffect(() => {
    if (user && !userLoading) {
      loadUserSubscription();
    }
  }, [user, userLoading, loadUserSubscription]);

  return {
    isPro,
    loading,
    verify,
  };
};
