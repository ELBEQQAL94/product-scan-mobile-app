import { View, Text } from "react-native";
import CommonButton from "./CommonButton";
import { i18n } from "@/i18n";
import { useRouter } from "expo-router";

interface ConnectionErrorProps {
    error: string | null;
}

const ConnectionError: React.FC<ConnectionErrorProps> = ({ error }) => {
    // Hooks
    const router = useRouter();

    const refresh_screen = () => router.reload();

    return (
        <View>
            <Text>{error}</Text>
            <CommonButton label={i18n.t('CONNECTION_ERROR')} action={refresh_screen} />
        </View>
    );
};

export default ConnectionError;