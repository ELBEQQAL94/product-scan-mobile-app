/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import { setGlobalOptions } from "firebase-functions";
import { error } from "console";
import { onRequest } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
// setGlobalOptions({ maxInstances: 10 });

// Some notes
// Try to remove permissions from google play service and tets again
// generate a new token and test it again with the function locally
export const helloWorld = onRequest((_request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

import path from "path";

interface isActiveSubscription {
  startTimeMillis: string;
  expiryTimeMillis: string;
  autoRenewing: boolean;
  priceCurrencyCode: string;
  priceAmountMicros: string;
  countryCode: string;
  developerPayload: string;
  cancelReason: number;
  orderId: string;
  purchaseType: number;
  acknowledgementState: number;
  kind: string;
  paymentState?: number;
  gracePeriodEndTimeMillis?: string;
}

export const verifyGooglePlayPurchase = onRequest(
  async (request, response): Promise<any> => {
    const data = request.body as {
      subscription_product_id: string;
      purchase_token: string;
    };

    if (!data.subscription_product_id && !data.purchase_token) {
      return response.status(400).send({
        valid: false,
        error: "Missing required parameters.",
      });
    }

    logger.info("validate purchase for user");
    logger.info(data, { structuredData: true });
    // Import inside the function
    const { google } = await import("googleapis");
    const fileName = path.join(__dirname, "..", "admin.json");
    logger.info(fileName);
    const auth = new google.auth.GoogleAuth({
      keyFile: fileName,
      scopes: ["https://www.googleapis.com/auth/androidpublisher"],
    });

    try {
      const res = await google
        .androidpublisher("v3")
        .purchases.subscriptions.get({
          packageName: "com.myscan.appmyscan",
          subscriptionId: data.subscription_product_id,
          token: data.purchase_token,
          auth: auth,
        });

      if (res.status == 200) {
        const subscription = res.data as isActiveSubscription;
        logger.info(`subscription: ${JSON.stringify(subscription)}`);

        // Check if subscription hasn't expired
        const now = Date.now();
        const expiryTime = parseInt(subscription.expiryTimeMillis || "0");
        const hasValidPayment = [0, 1, 2].includes(
          subscription.paymentState || 1
        );
        const gracePeriodEndTime = parseInt(
          subscription.gracePeriodEndTimeMillis || "0"
        );
        const isNotExpired = expiryTime > now || gracePeriodEndTime > now;
        const isValid = hasValidPayment && isNotExpired;

        logger.info(`Subscription valid: ${isValid}`, {
          paymentState: subscription.paymentState,
          expiryTime: new Date(expiryTime).toISOString(),
          structuredData: true,
        });
        return response.send({
          statusCode: 200,
          valid: isValid,
        });
      }
      return response.send({ status: res.status });
    } catch (error) {
      logger.error(error, {
        structuredData: true,
      });
      response.send({ error });
    }
  }
);
