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
} from "@/utils";
import { ActionTypeEnum, UserAction } from "@/enums/logs";
import { FirebaseErrorMessages } from "@/enums/firebase-errors-messages";

const db = firestore();

const NOW_DATE = format_date_to_custom_string();
const NOW_DATE_TIMESTAMP = format_date_to_timestamp();

// Test shas
// Configure Google Sign-In
// working case
GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  offlineAccess: true, // Important for getting idToken
  forceCodeForRefreshToken: true,
  accountName: "",
  iosClientId: "", // Add this even for Android
  hostedDomain: "",
});

// Test this case

// GoogleSignin.configure({
//   webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
//   offlineAccess: true, // Important for getting idToken
//   forceCodeForRefreshToken: true,
//   accountName: "",
//   iosClientId: "", // Add this even for Android
//   hostedDomain: "",
// });

// Test this case
// Not working
// GoogleSignin.configure({
//   webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
//   offlineAccess: true, // Important for getting idToken
// });

// Test this case
// Not working
// GoogleSignin.configure({
//   webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
// });

// register/create user account with google
export const auth_with_google = async () => {
  const user_action: UserAction = {
    action_type: ActionTypeEnum.REGISTER_ACCOUNT_WITH_GOOGLE,
    action_description: "user create new account with google.",
    action_data: null,
    date_format: NOW_DATE,
  };

  user_action.action_data = process.env.EXPO_PUBLIC_WEB_CLIENT_ID;
  user_action.action_description = "web client config id";
  await create_log(user_action);

  try {
    // Configure Google Sign-In INSIDE the function
    // GoogleSignin.configure({
    //   webClientId:
    //     "238005376912-g5mqaghnih33nov4fcjjuce2a7kcd7pd.apps.googleusercontent.com",
    // });
    // Check if your device supports Google Play
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

    // TODO: test this
    // https://github.com/react-native-google-signin/google-signin/issues/836
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
    console.log("current user: ", user.displayName);
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
  } catch (error: any) {
    user_action.action_description = "register with google get en error";
    user_action.action_data = JSON.stringify({
      error_code: error.code,
      error_message: error.message,
      web_client_id: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    });
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
    // await create_log(JSON.stringify(user_action));
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
    // await create_log(JSON.stringify(user_action));
  } catch (error: any) {
    user_action.action_description = "user login get an error";
    user_action.action_data = JSON.stringify(error);
    // await create_log(JSON.stringify(user_action));

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
    // await create_log(JSON.stringify(user_action));
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

    // await create_log(JSON.stringify(user_action));
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
    // await create_log(JSON.stringify(user_action));
  } catch (error) {
    user_action.action_description = "User logged out get an error.";
    user_action.action_data = JSON.stringify(error);
    // await create_log(JSON.stringify(user_action));
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
    await addDoc(collection(db, "logs"), userAction);
  } catch (error: unknown) {
    console.log(
      "create new log get an error from config firebase test: ",
      error
    );
  }
};

// Export auth and storage instances for use in other parts of the app
export { auth, firestore };
