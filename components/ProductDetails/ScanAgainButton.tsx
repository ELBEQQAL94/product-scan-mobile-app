import { i18n } from "@/i18n";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface ScanAgainButtonProps {
    retryScan: () => void;
};

const ScanAgainButton: React.FC<ScanAgainButtonProps> = ({ retryScan }) => (
    <View style={styles.scan_button_container}>
        <TouchableOpacity
            style={styles.scan_button}
            onPress={retryScan}
        >
            <Text style={[styles.scan_button_text]}>{i18n.t('SCAN_AGAIN')}</Text>
        </TouchableOpacity>
    </View>
);

export default ScanAgainButton;

const styles = StyleSheet.create({
    scan_button_container: {
        paddingLeft: 40,
        paddingRight: 40
    },
    scan_button: {
        backgroundColor: 'green',
        padding: 15,
        borderRadius: 5,
    },
    scan_button_text: {
        textAlign: 'center',
        color: "white",
        fontWeight: 'bold',
        fontSize: 16,
    }
});