import { i18n } from "@/i18n";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface CommonButtonProps {
    label: string;
    action: () => void;
};

const CommonButton: React.FC<CommonButtonProps> = ({ action, label }) => (
    <View style={styles.scan_button_container}>
        <TouchableOpacity
            style={styles.scan_button}
            onPress={action}
        >
            <Text style={[styles.scan_button_text]}>{label}</Text>
        </TouchableOpacity>
    </View>
);

export default CommonButton;

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