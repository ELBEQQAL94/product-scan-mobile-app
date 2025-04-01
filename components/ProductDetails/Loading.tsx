import { i18n } from "@/i18n";
import { View, Text } from "react-native";

interface LoadingProps {
    textColor: string;
};

const Loading: React.FC<LoadingProps> = ({ textColor }) => {
    return (
        <View>
            <Text style={{ color: textColor }}>{i18n.t('LOADING')}</Text>
        </View>
    );
};

export default Loading;