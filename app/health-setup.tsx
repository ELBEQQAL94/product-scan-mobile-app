import HealthSetupCard from "@/components/HealthSetupScreen/HealthSetupCard";
import { FC, useState, useCallback, useMemo } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import diseases from "@/data/diseases.json";
import allergies from "@/data/allergies.json";
import { Colors } from "@/themes/colors";
import ActionButton from "@/components/shared/ActionButton";
import { Href, useRouter } from "expo-router";
import { Screens } from "@/constants/screens";
import { Step } from "@/enums/step";
import { LanguageKey } from "@/constants/keys";
import { FontAwesome6 } from "@expo/vector-icons";
import { useSelectedLanguage } from "@/hooks/useSelectedLanguage";
import { update_user_health_data } from "@/external-services/firebase-config";
import { useAuth } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";

const HealthSetup: FC = () => {
  // Hooks
  const router = useRouter();
  const { user } = useAuth();
  const {
    is_arabic,
    modalVisible,
    setModalVisible,
    currentLanguage,
    change_language,
  } = useSelectedLanguage();

  // States
  const [currentStep, setCurrentStep] = useState<Step>(Step.DISEASES);
  const [selectedDiseases, setSelectedDiseases] = useState<Set<string>>(
    new Set()
  );
  const [selectedAllergies, setSelectedAllergies] = useState<Set<string>>(
    new Set()
  );

  const handleNext = useCallback(async () => {
    if (currentStep === Step.DISEASES) {
      setCurrentStep(Step.ALERGIES);
      return;
    } else {
      const userId = user?.uid;
      if (userId)
        await update_user_health_data(
          userId,
          selectedDiseases,
          selectedAllergies
        );
      router.push(Screens.HOME_SCREEN as Href);
    }
  }, [currentStep, router, selectedAllergies, selectedDiseases, user?.uid]);

  const handleBack = useCallback(() => {
    if (currentStep === Step.ALERGIES) {
      setCurrentStep(Step.DISEASES);
    }
  }, [currentStep]);

  const toggleSelection = useCallback(
    (id: string) => {
      if (currentStep === Step.DISEASES) {
        setSelectedDiseases((prev) => {
          const newSet = new Set(prev);
          if (newSet.has(id)) {
            newSet.delete(id);
          } else {
            newSet.add(id);
          }
          return newSet;
        });
        return;
      }
      setSelectedAllergies((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(id)) {
          newSet.delete(id);
        } else {
          newSet.add(id);
        }
        return newSet;
      });
    },
    [currentStep]
  );

  const currentData = useMemo(() => {
    const rawData = currentStep === Step.DISEASES ? diseases : allergies;
    const selectedSet =
      currentStep === Step.DISEASES ? selectedDiseases : selectedAllergies;

    return rawData.map((item) => ({
      ...item,
      isSelected: selectedSet.has(item.id),
    }));
  }, [currentStep, selectedDiseases, selectedAllergies]);

  const isAllergiesStep = currentStep === Step.ALERGIES;

  return (
    <ProtectedRoute>
      <LanguageSwitcher
        modalVisible={modalVisible}
        currentLanguage={currentLanguage}
        setModalVisible={setModalVisible}
        changeLanguage={change_language}
      />
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollview_container}
          bounces={true}
          scrollEventThrottle={16}
        >
          {currentData.slice(0, 7).map((disease) => (
            <HealthSetupCard
              key={disease.id}
              item={disease}
              onPress={toggleSelection}
            />
          ))}
        </ScrollView>

        <View style={styles.buttonContainer}>
          {/* Show back button only on allergies step */}
          {isAllergiesStep && (
            <ActionButton
              label={LanguageKey.BACK} // You'll need to add this to your language keys
              icon={FontAwesome6}
              iconProps={{
                name: "arrow-left-long",
                size: 24,
              }}
              onPress={handleBack}
              isArabic={is_arabic()}
              containerStyles={styles.backButton}
            />
          )}

          {/* Next button appears on both steps */}
          <ActionButton
            label={LanguageKey.CONTINUE}
            icon={FontAwesome6}
            iconProps={{
              name: "arrow-right-long",
              size: 24,
            }}
            onPress={handleNext}
            isArabic={is_arabic()}
            containerStyles={
              isAllergiesStep ? styles.nextButtonWithBack : styles.nextButton
            }
          />
        </View>
      </View>
    </ProtectedRoute>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  scrollview_container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  backButton: {
    flex: 1,
    padding: 15, // Reduced padding since buttons share space
  },
  nextButton: {
    width: "100%",
    padding: 30, // Full padding when alone
  },
  nextButtonWithBack: {
    flex: 1,
    padding: 15, // Reduced padding when sharing space
  },
});

export default HealthSetup;
