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
        setUser(user);
      });

      // Try to restore Google session
      try {
        const signInResult = await GoogleSignin.signInSilently();
        const idToken = signInResult.data?.idToken || null;

        if (idToken) {
          const googleCredential = auth.GoogleAuthProvider.credential(idToken);
          await auth().signInWithCredential(googleCredential);
        }
      } catch (error: any) {
        console.log("No existing Google session found:", error.message);
      }

      // Give it a bit more time for auth state to settle, then stop loading
      timeoutId = setTimeout(() => {
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
