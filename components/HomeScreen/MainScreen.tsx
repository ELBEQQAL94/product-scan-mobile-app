import { i18n } from "@/i18n";
import { BarcodeScanningResult, CameraView, useCameraPermissions } from "expo-camera"
import { View, StyleSheet, Text, Alert } from "react-native"

const MainScreen: React.FC<{ scanned: boolean, handleBarcodeScanned: (result: BarcodeScanningResult) => Promise<void> }> = ({ scanned, handleBarcodeScanned }) => {
 
  // Hooks
  const [permission, requestPermission] = useCameraPermissions();

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
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
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