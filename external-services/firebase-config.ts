import auth from "@react-native-firebase/auth";
import firestore, {
  addDoc,
  collection,
} from "@react-native-firebase/firestore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  GoogleAuthUserResponse,
  UserCredentials,
  UserSchema,
} from "@/types/auth";
import {
  format_date_to_custom_string,
  format_date_to_timestamp,
  remove_product_from_cache,
} from "@/utils";
import { ActionTypeEnum, UserAction } from "@/enums/logs";
import { FirebaseErrorMessages } from "@/enums/firebase-errors-messages";
import { ProductTypeFromDB } from "@/types/products";
import { NOW_DATE, NOW_DATE_TIMESTAMP } from "@/constants/constants";

// const db = firestore();

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
});

// register/create user account with google
export const auth_with_google = async () => {
  const user_action: UserAction = {
    action_type: ActionTypeEnum.REGISTER_ACCOUNT_WITH_GOOGLE,
    action_description: "user create new account with google.",
    action_data: null,
    date_format: NOW_DATE,
  };

  try {
    const hasPlayServices = await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    user_action.action_data = `${hasPlayServices}`;
    user_action.action_description = "hasPlayServices";
    await create_log(user_action);
    // Get the users ID token
    const signInResult = await GoogleSignin.signIn();

    user_action.action_data = `${JSON.stringify(signInResult)}`;
    user_action.action_description = "signInResult";
    await create_log(user_action);

    // Get idToken from userInfo
    const idToken = signInResult.data?.idToken || null;

    // Get access token
    const tokens = await GoogleSignin.getTokens();
    user_action.action_data = `${tokens}`;
    user_action.action_description = "tokens";
    await create_log(user_action);

    user_action.action_data = `${idToken}`;
    user_action.action_description = "idToken";
    await create_log(user_action);
    if (!idToken) {
      throw new Error("No ID token received");
    }

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    user_action.action_data = `${googleCredential}`;
    user_action.action_description = "googleCredential";
    await create_log(user_action);

    // Sign-in the user with the credential
    const res = await auth().signInWithCredential(googleCredential);
    const user = res.user as unknown as GoogleAuthUserResponse;
    const is_user_exists = await check_user_exists(user.uid);

    if (!is_user_exists) {
      console.log("user not exists");
      if (user.email) {
        const userData: UserSchema = {
          uid: user.uid,
          username: user.displayName,
          auth_provider: "google",
          email: user?.email?.trim().toLowerCase() || "",
          last_login: NOW_DATE_TIMESTAMP,
          is_email_verified: true,
          is_subscribed: false,
          created_at: NOW_DATE_TIMESTAMP,
          date_format: NOW_DATE,
        };

        await firestore().collection("users").add(userData);
        user_action.action_data = JSON.stringify(userData);
      }
    } else {
      user_action.action_type = ActionTypeEnum.LOGIN_ACCOUNT_WITH_GOOGLE;
      user_action.action_data = JSON.stringify(user);
      user_action.action_description = "user logged in with google";
    }
    await create_log(user_action);
    return user;
  } catch (error: any) {
    user_action.action_description = "register with google get en error";
    user_action.action_data = JSON.stringify({
      error_code: error.code,
      error_message: error.message,
    });
    await create_log(user_action);
  }
};

export const check_user_exists = async (user_id: string) => {
  const user_action: UserAction = {
    action_type: ActionTypeEnum.CHECK_USER_EXISTS,
    action_description: "check if user exists before add it to database",
    action_data: JSON.stringify(user_id),
    date_format: NOW_DATE,
  };

  try {
    const querySnapshot = await firestore()
      .collection("users")
      .where("uid", "==", user_id)
      .get();

    if (!querySnapshot.empty) {
      const current_user = querySnapshot.docs[0].data() as UserSchema;
      return current_user;
    }
    return null;
  } catch (error: any) {
    user_action.action_description = "user check if exists get en error";
    user_action.action_data = JSON.stringify({
      code: error.code,
      error_message: error.message,
    });
    await create_log(user_action);
  }
};

// logged in with email and password
export const log_in_with_email_and_password = async (
  userInfo: UserCredentials
) => {
  const NOW_DATE = format_date_to_custom_string();
  const user_action: UserAction = {
    action_type: ActionTypeEnum.LOGIN_ACCOUNT,
    action_description: "user login with email/password.",
    action_data: JSON.stringify(userInfo),
    date_format: NOW_DATE,
  };

  try {
    const { email, password } = userInfo;
    await auth().signInWithEmailAndPassword(email.trim(), password);
    await create_log(user_action);
  } catch (error: any) {
    user_action.action_description = "user login get an error";
    user_action.action_data = JSON.stringify({
      code: error.code,
      error_message: error.message,
    });
    await create_log(user_action);

    if (error.code === FirebaseErrorMessages.INVALID_LOGIN_CREDENTIALS) {
      throw Error(FirebaseErrorMessages.INVALID_LOGIN_CREDENTIALS);
    }
    if (error.code === FirebaseErrorMessages.USER_NOT_FOUND) {
      throw Error(FirebaseErrorMessages.USER_NOT_FOUND);
    }
    if (error.code === FirebaseErrorMessages.WRONG_PASSWORD) {
      throw Error(FirebaseErrorMessages.WRONG_PASSWORD);
    }
    if (error.code === FirebaseErrorMessages.INVALID_CREDENTAILS) {
      throw Error(FirebaseErrorMessages.INVALID_CREDENTAILS);
    }
  }
};

// register with email and password
export const register_with_email_and_password = async (
  userInfo: UserCredentials
) => {
  const NOW_DATE = format_date_to_custom_string();
  const NOW_DATE_TIMESTAMP = format_date_to_timestamp();
  const user_action: UserAction = {
    action_type: ActionTypeEnum.REGISTER_ACCOUNT,
    action_description: "user create new account with email/password.",
    action_data: JSON.stringify(userInfo),
    date_format: NOW_DATE,
  };

  try {
    const { email, password } = userInfo;
    const formatedEmail = email.trim().toLocaleLowerCase();

    const res = await auth().createUserWithEmailAndPassword(
      formatedEmail,
      password
    );
    const user = res.user;

    const userData: UserSchema = {
      uid: user.uid,
      email: formatedEmail,
      date_format: NOW_DATE,
      auth_provider: "email",
      username: user.displayName,
      last_login: NOW_DATE_TIMESTAMP,
      created_at: NOW_DATE_TIMESTAMP,
      is_email_verified: false,
      is_subscribed: false,
    };

    await firestore().collection("users").add(userData);
    await create_log(user_action);
    return user;
  } catch (error: any) {
    user_action.action_description =
      "user try to create an account with email/password but got an error";
    user_action.action_data = JSON.stringify({
      code: error.code,
      error_message: error.message,
    });

    if (error.code === FirebaseErrorMessages.EMAIL_ALREADY_IN_USE) {
      throw Error(FirebaseErrorMessages.EMAIL_ALREADY_IN_USE);
    }

    if (error.code === FirebaseErrorMessages.WEAK_PASSWORD) {
      throw Error(FirebaseErrorMessages.WEAK_PASSWORD);
    }

    await create_log(user_action);
  }
};

// Kill current session
export const logout = async () => {
  const user_action: UserAction = {
    action_type: ActionTypeEnum.LOG_OUT,
    action_description: "User logged out.",
    action_data: null,
    date_format: format_date_to_custom_string(),
  };

  try {
    await auth().signOut();
    user_action.action_description = "User logged out.";
    await create_log(user_action);
  } catch (error: any) {
    user_action.action_description = "User logged out get an error.";
    user_action.action_data = JSON.stringify({
      code: error.code,
      error_message: error.message,
    });
    await create_log(user_action);
  }
};

export const get_products = async (
  user_id: string
): Promise<ProductTypeFromDB[]> => {
  console.log(`🔍 Searching for products with user_id: ${user_id}`);

  const user_action: UserAction = {
    action_type: ActionTypeEnum.GET_PRODUCTS,
    action_description: `User with id: ${user_id} try to get all scanned products.`,
    action_data: null,
    date_format: format_date_to_custom_string(),
  };

  try {
    const querySnapshot = await firestore()
      .collection("products")
      .where("user_id", "==", user_id)
      .get();

    if (!querySnapshot.empty) {
      const products: ProductTypeFromDB[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          ...data,
        } as unknown as ProductTypeFromDB;
      });

      user_action.action_data = JSON.stringify(products);
      await create_log(user_action);
      return products;
    }

    // Return empty array when no products found
    user_action.action_description = `No products found for user: ${user_id}`;
    await create_log(user_action);
    return [];
  } catch (error: any) {
    console.error(`🚨 Error in get_products:`, error);
    user_action.action_description =
      "User try to get all products get an error";
    user_action.action_data = JSON.stringify({
      code: error.code,
      error_message: error.message,
    });
    await create_log(user_action);
    return [];
  }
};

export const save_product_in_db = async (
  product_from_db: ProductTypeFromDB
) => {
  const user_action: UserAction = {
    action_type: ActionTypeEnum.SAVE_PRODUCT_IN_DB,
    action_description: "create product in db",
    action_data: null,
    date_format: format_date_to_custom_string(),
  };

  try {
    // Check if product already exists by bar_code
    if (product_from_db.bar_code) {
      const querySnapshot = await firestore()
        .collection("products")
        .where("bar_code", "==", product_from_db.bar_code)
        .where("user_id", "==", product_from_db.user_id)
        .limit(1)
        .get();

      if (!querySnapshot.empty) {
        user_action.action_description =
          "Product already exists, skipped creation";
        user_action.action_data = JSON.stringify({
          bar_code: product_from_db.bar_code,
        });
        await create_log(user_action);
        return;
      }
    } else {
      user_action.action_description =
        "Warning: Product created without bar_code duplicate check";
    }

    // Create the product if it doesn't exist
    user_action.action_data = JSON.stringify(product_from_db);
    await firestore().collection("products").add(product_from_db);
    console.log("Product created successfully");
    await create_log(user_action);
  } catch (error: any) {
    user_action.action_description = "Error when create new product";
    user_action.action_data = JSON.stringify({
      code: error.code,
      error_message: error.message,
    });
    await create_log(user_action);
  }
};

export const remove_product_from_db = async (
  bar_code: string,
  user_id: string
): Promise<boolean> => {
  const user_action: UserAction = {
    action_type: ActionTypeEnum.REMOVE_PRODUCT_FROM_DB,
    action_description: "remove product from db",
    action_data: null,
    date_format: format_date_to_custom_string(),
  };

  try {
    // Find the product by bar_code and user_id
    const querySnapshot = await firestore()
      .collection("products")
      .where("bar_code", "==", bar_code)
      .where("user_id", "==", user_id)
      .limit(1)
      .get();

    if (querySnapshot.empty) {
      user_action.action_description = "Product not found, nothing to remove";
      user_action.action_data = JSON.stringify({
        user_id,
        bar_code,
      });
      await create_log(user_action);
      return false;
    }

    // Remove the product
    const productDoc = querySnapshot.docs[0];
    await productDoc.ref.delete();
    await remove_product_from_cache(bar_code);

    user_action.action_description = "Product removed successfully";
    user_action.action_data = JSON.stringify({
      user_id,
      bar_code,
      document_id: productDoc.id,
    });

    console.log("Product removed successfully");
    await create_log(user_action);
    return true;
  } catch (error: any) {
    user_action.action_description = "Error when removing product";
    user_action.action_data = JSON.stringify({
      user_id,
      bar_code,
      code: error.code,
      error_message: error.message,
    });
    await create_log(user_action);
    console.log("product remove error: ", error);
    return false;
  }
};

export const create_log = async (userAction: UserAction): Promise<void> => {
  try {
    await addDoc(collection(firestore(), "logs"), userAction);
  } catch (error: unknown) {
    console.log(
      "create new log get an error from config firebase test: ",
      error
    );
  }
};

export const update_user_health_data = async (
  userId: string,
  selectedDiseases: Set<string>,
  selectedAllergies: Set<string>
): Promise<void> => {
  const NOW_DATE = format_date_to_custom_string();
  const NOW_DATE_TIMESTAMP = format_date_to_timestamp();

  const user_action: UserAction = {
    action_type: ActionTypeEnum.UPDATE_USER_HEALTH_DATA,
    action_description: `User ${userId} updated health profile with diseases and allergies.`,
    action_data: JSON.stringify({
      diseases: Array.from(selectedDiseases),
      allergies: Array.from(selectedAllergies),
      userId,
    }),
    date_format: NOW_DATE,
  };

  try {
    // Find the user document by uid
    const querySnapshot = await firestore()
      .collection("users")
      .where("uid", "==", userId)
      .get();

    if (querySnapshot.empty) {
      throw new Error(`User with uid ${userId} not found`);
    }

    // Get the document reference
    const userDoc = querySnapshot.docs[0];
    const userDocRef = userDoc.ref;

    // Prepare health data update
    const healthData: Partial<UserSchema> = {
      selected_diseases: Array.from(selectedDiseases),
      selected_allergies: Array.from(selectedAllergies),
      is_profile_health_created: true,
      updated_at: NOW_DATE_TIMESTAMP,
    };

    // Update the user document
    await userDocRef.update(healthData);

    user_action.action_description = "User health data updated successfully";
    await create_log(user_action);

    console.log(`✅ Health data updated for user: ${userId}`);
  } catch (error: any) {
    user_action.action_description = "Error updating user health data";
    user_action.action_data = JSON.stringify({
      code: error.code,
      error_message: error.message,
      userId,
      diseases: Array.from(selectedDiseases),
      allergies: Array.from(selectedAllergies),
    });
    await create_log(user_action);
  }
};

// Export auth and storage instances for use in other parts of the app
export { auth, firestore };
