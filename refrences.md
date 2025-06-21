## Build App
```ssh
eas build --platform android --profile production
````

## Build APK

```ssh
npx eas build --profile development --platform android
```

## Generate keystore locally

### Windows

```ssh
& "C:\Program Files\Android\Android Studio\jbr\bin\keytool.exe" -genkey -v -keystore "$env:USERPROFILE\.android\debug.keystore" -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000
```

```ssh
./gradlew signingReport
```

```ssh
./gradlew signingReport
```

## Submit app on play store

- https://docs.expo.dev/submit/android/