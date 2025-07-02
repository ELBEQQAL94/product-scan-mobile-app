import { FirebaseError, initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleSignin, User } from "@react-native-google-signin/google-signin";
import { GoogleAuthUserResponse, UserSchema } from "@/types/auth";
import {
  format_date_to_custom_string,
  format_date_to_timestamp,
} from "@/utils";
import { ActionTypeEnum, UserAction } from "@/enums/logs";
import { FirebaseErrorMessages } from "@/enums/firebase-errors-messages";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);
export const storage = getStorage(app);

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
});

// register/create user account with google
export const signInWithGoogle = async () => {
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
    const googleCredential = GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const res = await signInWithCredential(auth, googleCredential);
    const user = res.user as unknown as GoogleAuthUserResponse;

    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);

    if (user.email) {
      const userData: UserSchema = {
        uid: user.uid,
        username: user.displayName,
        auth_provider: "google",
        email: user?.email?.trim().toLowerCase() || "",
        last_login: format_date_to_timestamp(),
        is_email_verified: true,
        is_subscribed: false,
        created_at: format_date_to_timestamp(),
        date_format: format_date_to_custom_string(),
      };

      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), userData);
      }
    }

    return user;
  } catch (error: any) {
    console.log("signInWithGoogle error: ", error);
    throw error;
  }
};

// logged in with email and password
// TODO add login values
// LoginValues
export const logInWithEmailAndPassword = async (userInfo: any) => {
  try {
    const { email, password } = userInfo;
    await signInWithEmailAndPassword(auth, email.trim(), password);
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      if (error.code === "auth/invalid-login-credentials") {
        throw Error("auth/invalid-login-credentials");
      }
      if (error.code === "auth/user-not-found") {
        throw Error("auth/user-not-found");
      }
      if (error.code === "auth/wrong-password") {
        throw Error("auth/wrong-password");
      }
      if (error.code === "auth/invalid-credential") {
        throw Error("auth/invalid-credential");
      }
    }
  }
};

// register with email and password
export const registerWithEmailAndPassword = async (userInfo: any) => {
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

    const res = await createUserWithEmailAndPassword(
      auth,
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

    await addDoc(collection(db, "users"), userData);
    await create_log(user_action);
    return user;
  } catch (error: unknown) {
    user_action.action_description =
      "user try to create an account with email/password but got an error";
    user_action.action_data = JSON.stringify(error);

    if (error instanceof FirebaseError) {
      if (error.code === FirebaseErrorMessages.EMAIL_ALREADY_IN_USE) {
        throw Error(FirebaseErrorMessages.EMAIL_ALREADY_IN_USE);
      }

      if (error.code === FirebaseErrorMessages.WEAK_PASSWORD) {
        throw Error(FirebaseErrorMessages.WEAK_PASSWORD);
      }
    }
  }
};

// Kill current session
// export const logout = async () => {
// 	const userAction: UserAction = {
// 		action_type: ActionTypeEnum.LOGGED_IN,
// 		action_description: 'User looged out.',
// 		action_data: null,
// 		created_at: format_date_to_timestamp(),
// 		date_format: format_date_to_custom_string(),
// 	};

// 	try {
// 		await signOut(auth);
// 		userAction.action_description = 'User looged out.';
// 		await createLog(userAction);
// 	} catch (error) {
// 		userAction.action_description = 'User looged out get an error.';
// 		userAction.action_data = JSON.stringify(error);
// 		await createLog(userAction);
// 	}
// };

export const get_products = async (): Promise<unknown> => {
  try {
    const q = query(collection(db, "products"));
    const data = await getDocs(q);
    const user = data.docs[0].data();
    console.log("data: ", user);
    return user;
  } catch (error) {
    console.log("error: ", error);
    throw new Error(`get products got an error: ${error}`);
  }
};

export const create_log = async (userAction: UserAction): Promise<void> => {
  try {
    await addDoc(collection(db, "logs"), userAction);
  } catch (error: unknown) {
    console.log("create new log get an error: ", error);
  }
};
