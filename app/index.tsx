import { useEffect, useState } from 'react';
import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Href, useRouter } from 'expo-router';
import { Screens } from '@/constants/screens';
import OnBoarding from '@/components/OnBoarding';
import { getItem } from '@/utils';

const MainScreen: React.FC<{ scanned: boolean, handleBarcodeScanned: (result: BarcodeScanningResult) => Promise<void> }> = ({ scanned, handleBarcodeScanned }) => {
  return (
    <View style={styles.container}>
    <CameraView 
      style={styles.camera} 
      facing="back"
      onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
      barcodeScannerSettings={{
        barcodeTypes: ["qr", "pdf417", "ean13", "ean8", "code39", "code128", "itf14", "datamatrix", "aztec"],
      }}
    >
      <View style={styles.overlay}>
      <View style={styles.scan_window_container}>
          <View style={styles.corner_tl} />
          <View style={styles.corner_tr} />
          <View style={styles.corner_bl} />
          <View style={styles.corner_br} />
        </View>
      </View>
    </CameraView>
  </View>
  )
}

export default function App() {
  
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
      <Text>Requesting camera permission...</Text>
    </View>;
  }

  if (!permission.granted) {
    Alert.alert(
      "Camera Permission Required",
      "We need your permission to show the camera",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Grant Permission", 
          onPress: requestPermission 
        }
      ]
    );
  }

  return !hasCompletedOnboarding ? 
          <OnBoarding /> : 
          <MainScreen 
            scanned={scanned} 
            handleBarcodeScanned={handleBarcodeScanned} 
          />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 20,
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(0,122,255,0.8)',
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scan_window_container: {
    width: 250,
    height: 250,
    backgroundColor: 'transparent',
    position: 'relative',
  },
  corner_tl: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#90EE90',
    borderTopLeftRadius: 10,
  },
  corner_tr: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: '#90EE90',
    borderTopRightRadius: 10,
  },
  corner_bl: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#90EE90',
    borderBottomLeftRadius: 10,
  },
  corner_br: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: '#90EE90',
    borderBottomRightRadius: 10,
  },
});