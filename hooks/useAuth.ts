import { useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export const useAuth = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let unsubscribe: () => void;
    let timeoutId: NodeJS.Timeout;

    const initializeAuth = async () => {
      // Set up Firebase auth listener
      unsubscribe = auth().onAuthStateChanged((user) => {
        console.log("Firebase auth state changed:", !!user);
        if (user) {
          console.log("user from useAuth:", user.toJSON());
        } else {
          console.log("user from useAuth:", null);
        }
        setUser(user);
      });

      // Try to restore Google session
      try {
        console.log("Checking for existing Google session...");

        const signInResult = await GoogleSignin.signInSilently();
        const idToken = signInResult.data?.idToken || null;
        console.log(
          "Found existing Google session for:",
          signInResult.data?.user.email
        );

        if (idToken) {
          const googleCredential = auth.GoogleAuthProvider.credential(idToken);
          await auth().signInWithCredential(googleCredential);
          console.log("Restored Firebase session from Google");
        }
      } catch (error: any) {
        console.log("No existing Google session found:", error.message);
      }

      // Give it a bit more time for auth state to settle, then stop loading
      timeoutId = setTimeout(() => {
        console.log("Auth initialization timeout reached, stopping loading");
        setLoading(false);
      }, 100); // 2 second timeout
    };

    initializeAuth();

    return () => {
      if (unsubscribe) unsubscribe();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return {
    user,
    loading,
    isAuthenticated: !!user,
  };
};
