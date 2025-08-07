import { slides } from "@/constants/on-boarding-slides";
import { set_item } from "@/utils";
import { FC, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  useColorScheme,
} from "react-native";
import { useSelectedLanguage } from "@/hooks/useSelectedLanguage";
import { AsyncStorageKey, LanguageKey } from "@/constants/keys";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import { Colors } from "@/themes/colors";
import { useRouter } from "expo-router";
import { Screens } from "@/constants/screens";
import { useTranslation } from "@/hooks/useTranslation";

const { width } = Dimensions.get("window");

const OnboardingScreen: FC = () => {
  // Hooks
  const colorScheme = useColorScheme();
  const flatListRef = useRef<FlatList>(null);
  const { modalVisible, currentLanguage, setModalVisible, change_language } =
    useSelectedLanguage();
  const router = useRouter();
  const { t } = useTranslation();

  // States
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const colors = {
    background: colorScheme === "dark" ? "#121212" : "white",
    text: colorScheme === "dark" ? "white" : "black",
    border: colorScheme === "dark" ? "#333333" : "black",
    card: colorScheme === "dark" ? "#1E1E1E" : "white",
  };

  const handleNext = async () => {
    if (currentIndex < slides.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
    } else {
      await set_item(AsyncStorageKey.HAS_COMPLETED_ONBOARDING, "true");
      router.push(Screens.REGISTER_SCREEN);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
    }
  };

  const skip = async () => {
    await set_item(AsyncStorageKey.HAS_COMPLETED_ONBOARDING, "true");
    router.push(Screens.REGISTER_SCREEN);
  };

  return (
    <>
      <LanguageSwitcher
        modalVisible={modalVisible}
        currentLanguage={currentLanguage}
        setModalVisible={setModalVisible}
        changeLanguage={change_language}
      />
      <View style={styles.main_container}>
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
                <View style={styles.text_container}>
                  <Text style={styles.title}>{t(item.title)}</Text>
                  <Text style={styles.description}>{t(item.subtitle)}</Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
            extraData={currentIndex}
          />
          <View style={styles.button_container}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: Colors.GLOVO_GREEN }]}
              onPress={handleNext}
            >
              <Text style={styles.button_text}>
                {currentIndex < slides.length - 1
                  ? t(LanguageKey.NEXT)
                  : t(LanguageKey.CREATE_ACCOUNT)}
              </Text>
            </TouchableOpacity>
            {currentIndex === slides.length - 1 ? (
              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.background }]}
                onPress={handleBack}
              >
                <Text style={[styles.button_text, { color: colors.text }]}>
                  {t(LanguageKey.BACK)}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.background }]}
                onPress={skip}
              >
                <Text style={[styles.button_text, { color: colors.text }]}>
                  {t(LanguageKey.SKIP)}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: "transparent",
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
  text_container: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
    color: "white",
  },
  button_container: {
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
  button_text: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});

export default OnboardingScreen;
