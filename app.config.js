export default {
  expo: {
    plugins: [
      [
        "@react-native-google-signin/google-signin",
        {
          iosUrlScheme:
            process.env.EXPO_PUBLIC_IOSURLSCHEME ||
            "com.googleusercontent.apps.238005376912-nnvq5ki8h0qqagmjfg6g1qsbfq71hb33",
          // Use the ANDROID client ID (client_type: 1)
          androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
          // Use the WEB client ID (client_type: 3)
          webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
        },
      ],
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission:
            "Allow $(PRODUCT_NAME) to use your location.",
        },
      ],
      [
        "expo-camera",
        {
          cameraPermission: "Allow $(PRODUCT_NAME) to access your camera",
          microphonePermission:
            "Allow $(PRODUCT_NAME) to access your microphone",
          recordAudioAndroid: true,
        },
      ],
      "@react-native-firebase/app",
      "@react-native-firebase/auth",
      "@react-native-firebase/crashlytics",
      [
        "expo-build-properties",
        {
          ios: {
            useFrameworks: "static",
          },
        },
      ],
    ],
    extra: {
      eas: {
        projectId: "653568ff-44a8-4a6b-8edd-a3c1f3dc14b8",
      },
    },
    android: {
      package: "com.myscan.appmyscan",
      versionCode: 3,
      googleServicesFile:
        process.env.GOOGLE_SERVICES_JSON || "./google-services.json",
    },
    ios: {
      googleServicesFile: process.env.GOOGLE_SERVICES_PLIST,
    },
    newArchEnabled: true,
  },
};
