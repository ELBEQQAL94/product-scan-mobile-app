import { useEffect, useState } from 'react';
import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { chat, Product, product_details } from '@/services';
import { useRouter } from 'expo-router';

export default function App() {
  
  // States
  const [scanned, setScanned] = useState<boolean>(false);
  
  // Hooks
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => router.push('/product-details'), 500)
  }, []);

  if (!permission) {
    return <View style={styles.container}>
      <Text>Requesting camera permission...</Text>
    </View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const handleBarcodeScanned = async (result: BarcodeScanningResult) => {
    console.log('callback scan again')
    setScanned(true);
    const bar_code = result.data;

    if (bar_code) {
        const response = await product_details(bar_code) as Product;
        const answer = await chat(response);
        alert(`Score: ${answer}/100`);
    }
  };

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
          <View style={styles.scanWindow} />
        </View>
        
        <View style={styles.buttonContainer}>
          {scanned && (
            <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
              <Text style={styles.text}>Tap to Scan Again</Text>
            </TouchableOpacity>
          )}
        </View>
      </CameraView>
    </View>
  );
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
  scanWindow: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#FFF',
    backgroundColor: 'transparent',
  },
});