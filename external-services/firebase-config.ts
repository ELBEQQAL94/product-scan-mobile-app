import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  GoogleAuthUserResponse,
  UserCredentials,
  UserSchema,
} from "@/types/auth";
import {
  format_date_to_custom_string,
  format_date_to_timestamp,
} from "@/utils";
import { ActionTypeEnum, UserAction } from "@/enums/logs";
import { FirebaseErrorMessages } from "@/enums/firebase-errors-messages";

const NOW_DATE = format_date_to_custom_string();
const NOW_DATE_TIMESTAMP = format_date_to_timestamp();

// Configure Google Sign-In
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
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // Get the users ID token
    const signInResult = await GoogleSignin.signIn();

    // Get idToken from userInfo
    const idToken = signInResult.data?.idToken;

    if (!idToken) {
      throw new Error("No ID token received");
    }

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const res = await auth().signInWithCredential(googleCredential);
    const user = res.user as unknown as GoogleAuthUserResponse;

    const is_user_exists = await check_user_exists(user);

    if (!is_user_exists) {
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
  } catch (error: unknown) {
    user_action.action_description = "register with google get en error";
    user_action.action_data = JSON.stringify(error);
    await create_log(user_action);
  }
};

const check_user_exists = async (user: GoogleAuthUserResponse) => {
  const user_action: UserAction = {
    action_type: ActionTypeEnum.CHECK_USER_EXISTS,
    action_description: "check if user exists before add it to database",
    action_data: JSON.stringify(user),
    date_format: NOW_DATE,
  };

  try {
    const querySnapshot = await firestore()
      .collection("users")
      .where("uid", "==", user.uid)
      .get();

    if (!querySnapshot.empty) {
      const current_user = querySnapshot.docs[0].data();
      return current_user;
    }
    return null;
  } catch (error: unknown) {
    user_action.action_description = "user check if exists get en error";
    user_action.action_data = JSON.stringify(error);
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
    user_action.action_data = JSON.stringify(error);
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
    user_action.action_data = JSON.stringify(error);

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
  } catch (error) {
    user_action.action_description = "User logged out get an error.";
    user_action.action_data = JSON.stringify(error);
    await create_log(user_action);
  }
};

export const get_products = async (): Promise<unknown> => {
  try {
    const querySnapshot = await firestore().collection("products").get();

    if (!querySnapshot.empty) {
      const user = querySnapshot.docs[0].data();
      console.log("data: ", user);
      return user;
    }
    return null;
  } catch (error) {
    console.log("error: ", error);
    throw new Error(`get products got an error: ${error}`);
  }
};

export const create_log = async (userAction: UserAction): Promise<void> => {
  try {
    await firestore().collection("logs").add(userAction);
  } catch (error: unknown) {
    console.log("create new log get an error: ", error);
  }
};

// Export auth and storage instances for use in other parts of the app
export { auth, firestore };
