import { slides } from "@/constants/on-boarding-slides";
import { Screens } from "@/constants/screens";
import { setItem } from "@/utils";
import { Href, useRouter } from "expo-router";
import { useRef, useState } from "react";
import { 
    View, 
    Text, 
    TouchableOpacity, 
    FlatList, 
    StyleSheet, 
    Dimensions, 
    useColorScheme 
} from "react-native";
import SelectLanguage from "./SelectLanguage";
import { i18n } from "@/i18n";

const { width } = Dimensions.get("window");

const Onboarding: React.FC = () => {
    // Hooks
    const colorScheme = useColorScheme();
    const flatListRef = useRef<FlatList>(null);
    const router = useRouter();

    // States
    const [currentIndex, setCurrentIndex] = useState(0);

    const colors = {
        background: colorScheme === 'dark' ? '#121212' : 'white',
        text: colorScheme === 'dark' ? 'white' : 'black',
        border: colorScheme === 'dark' ? '#333333' : 'black',
        card: colorScheme === 'dark' ? '#1E1E1E' : 'white',
    };

    const handleNext = () => {
        if (currentIndex < slides.length - 1) {
            const newIndex = currentIndex + 1;
            setCurrentIndex(newIndex);
            flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
        } else {
            setItem("hasCompletedOnboarding", "true");
        }
    };

    const skip = async () => {
        await setItem("hasCompletedOnboarding", "true");
        router.push(Screens.HOME_SCREEN as Href);
    };

    return (
        <View style={styles.mainContainer}>
        {/* Header area for language selector */}
        <View style={styles.header}>
            <View style={styles.headerRight}>
                <SelectLanguage />
            </View>
        </View>
        
        <View style={[styles.container, { backgroundColor: "green" }]}>
            <FlatList
                ref={flatListRef}
                data={slides}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                renderItem={({ item }) => (
                    <View style={styles.slide}>
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.description}>{item.subtitle}</Text>
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.id}
                extraData={currentIndex}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, { backgroundColor: "#CC8033" }]} onPress={handleNext}>
                    <Text style={styles.buttonText}>{currentIndex < slides.length - 1 ? i18n.t('NEXT') : i18n.t('DONE')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: colors.background }]} onPress={skip}>
                    <Text style={[styles.buttonText, { color: colors.text }]}>{i18n.t('SKIP')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 40, // Adjust based on your safe area needs
        paddingBottom: 10,
        backgroundColor: 'transparent', // or whatever color you want for header
    },
    headerRight: {
        // Additional styling for the right side of header if needed
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    slide: {
        width,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    textContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white"
    },
    description: {
        fontSize: 16,
        textAlign: "center",
        marginVertical: 10,
        color: "white"
    },
    buttonContainer: {
        position: "absolute",
        bottom: 40,
        width: width * 0.8,
    },
    button: {
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginVertical: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "bold",
        textTransform: 'capitalize'
    },
});

export default Onboarding;
