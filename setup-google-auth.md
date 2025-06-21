
# Setup Google Auth for android and IOS

## Setup Google Authentication in React Native along with expo and firebase (android only)

- create an account in firebase
- create project in firebase and setup web and android
- make sure your andorid package name has the same name as your project
- add google auth as method of authentication
- download google-services.json and place it in root directory of your project
- install `@react-native-google-signin/google-signin` and `@react-native-google-signin/google-signin`
- update `app.json` to `app.config.js`
- example of `app.config.js`

`export default {
  expo: {
    plugins: [
      [
        "@react-native-google-signin/google-signin",
        {
          iosUrlScheme:
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
    ],
    extra: {
      eas: {
        projectId: "653568ff-44a8-4a6b-8edd-a3c1f3dc14b8",
      },
    },
    android: {
      package: "com.myscan.appmyscan",
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON, // Use environment variable
    },
    newArchEnabled: true,
  },
};
`

- Note: Use the WEB client ID (client_type: 3)
- Note: the ANDROID client ID (client_type: 1)
- run `npx expo prebuild --clean`
- run `npm run android`
- cd `./android` and run `./gradlew signingReport` and will display a list of SHA1 and pick first one.
- Go to firbase config project and select andorid project then add your SHA1
- After that re-run `npm run android` again and make sure you run app on real device to make it works