/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import { setGlobalOptions } from "firebase-functions";
import { onRequest } from "firebase-functions/https";
import * as logger from "firebase-functions/logger";
import { google } from "googleapis";

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

export const helloWorld = onRequest((_request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

// eslint-disable-next-line max-len
export const verifyGooglePlayPurchase = onRequest(
  async (request): Promise<any> => {
    // eslint-disable-next-line indent
    const data = request.rawBody;
    logger.info("validate purchase for user");
    logger.info(data, { structuredData: true });
    const auth = new google.auth.GoogleAuth({
      keyFile: "./admin.json",
      scopes: ["https://www.googleapis.com/auth/androidpublisher"],
    });
    try {
      const res = await google
        .androidpublisher("v3")
        .purchases.subscriptions.get({
          packageName: "com.myscan.appmyscan",
          subscriptionId: JSON.parse(data.toString())["productId"],
          token: JSON.parse(data.toString())["purchaseToken"],
          auth: auth,
        });
      logger.info(res, {
        structuredData: true,
      });
      if (res.status == 200) {
        logger.info(res.data.paymentState === 1, {
          structuredData: true,
        });
        return { isActiveSubscription: res.data.paymentState === 1 };
      }
      return { error: -1 };
    } catch (error) {
      logger.error(error, {
        structuredData: true,
      });
      return { error: -1 };
    }
  }
);
