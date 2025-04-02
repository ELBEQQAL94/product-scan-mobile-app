import { View, Text, StyleSheet } from "react-native";
import { i18n } from "@/i18n";
import ScanAgainButton from "./CommonButton";

interface ProductNotFoundProps {
    textColor: string;
    retryScan: () => void;
};

const ProductNotFound: React.FC<ProductNotFoundProps> = ({ textColor, retryScan }) => (
    <View style={styles.product_not_found_container}>
        <Text style={[styles.product_not_found_text, { color: textColor }]}>{i18n.t('PRODUCT_NOT_FOUND')}</Text>
        <ScanAgainButton retryScan={retryScan} />
    </View>
);

export default ProductNotFound;

const styles = StyleSheet.create({
    product_not_found_container: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15
    },
    product_not_found_text: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    }
});