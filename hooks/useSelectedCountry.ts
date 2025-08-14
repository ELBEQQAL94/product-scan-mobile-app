import { AsyncStorageKey } from "@/constants/keys";
import { get_country } from "@/services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import * as Location from "expo-location";

export const useSelectedCountry = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const should_refresh_location = async (): Promise<boolean> => {
    const last_update = await AsyncStorage.getItem(
      AsyncStorageKey.LOCATION_TIMESTAMP
    );
    const REFRESH_TIME_INTERVAL =
      process.env.EXPO_PUBLIC_REFRESH_USER_LOCATION_INTERVALS;
    const now = Date.now();

    if (!last_update || now - parseInt(last_update) > REFRESH_TIME_INTERVAL) {
      return true;
    }
    return false;
  };

  const refresh_location = async (location: Location.LocationObject) => {
    try {
      const lat = location?.coords.latitude;
      const long = location?.coords.longitude;
      const now = Date.now();
      if (lat && long) {
        const response = await get_country(lat, long);
        const country_code = response?.address.country_code;
        if (country_code) {
          await AsyncStorage.setItem(
            AsyncStorageKey.LOCATION_TIMESTAMP,
            now.toString()
          );

          await AsyncStorage.setItem(
            AsyncStorageKey.USER_COUNTRY,
            country_code
          );
        }
      }
    } catch (error: unknown) {
      console.log("refresh_location get an error: ", error);
    }
  };

  const getCurrentLocation = async () => {
    const is_refresh = await should_refresh_location();

    if (!is_refresh) return;

    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setErrorMessage("Permission to access location was denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Low, // Faster, less battery
    });
    await refresh_location(location);
  };

  return { getCurrentLocation, errorMessage };
};
