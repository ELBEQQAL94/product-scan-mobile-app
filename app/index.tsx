import { useEffect, useState } from 'react';
import { useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Href, useRouter } from 'expo-router';
import { Screens } from '@/constants/screens';
import { getItem } from '@/utils';
import { i18n } from '@/i18n';
import MainScreen from '@/components/Home/MainScreen';
import OnBoarding from '@/components/Home/OnBoarding';

const HomeScreen = () => {

  // Hooks
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();

  // States
  const [scanned, setScanned] = useState<boolean>(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(false);

  const handleBarcodeScanned = async (result: BarcodeScanningResult) => {
    setScanned(true);
    const bar_code = result.data;

    if (bar_code) {
      router.push(`${Screens.PRODUCT_DETAILS_SCREEN}?bar_code=${bar_code}` as Href);
    }
  };

  const checkOnboardingStatus = async () => {
    try {
      const hasCompletedOnboarding = await getItem("hasCompletedOnboarding");
      if (hasCompletedOnboarding) {
        const convertToBool = Boolean(hasCompletedOnboarding);
        setHasCompletedOnboarding(convertToBool);
      }
    } catch (error) {
      console.log('checkOnboardingStatus get an error: ', error);
    }
  };

  useEffect(() => {
    checkOnboardingStatus();
  }, []);


  if (!permission) {
    return <View style={styles.container}>
      <Text>{i18n.t('REQUEST_CAMERA_PERMISSION')}</Text>
    </View>;
  }

  if (!permission.granted) {
    Alert.alert(
      i18n.t('CAMERA_PERMISSION_REQUIRED'),
      i18n.t('NEED_CAMERA_PERMISSION'),
      [
        {
          text: i18n.t('CANCEL'),
          style: "cancel"
        },
        {
          text: i18n.t('GRANT_PERMISSION'),
          onPress: requestPermission
        }
      ]
    );
  }

  if (!hasCompletedOnboarding) {
    return <OnBoarding />
  }

  return <MainScreen scanned={scanned} handleBarcodeScanned={handleBarcodeScanned} />;
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});