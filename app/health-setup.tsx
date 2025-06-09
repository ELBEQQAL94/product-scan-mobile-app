import HealthSetupCard from "@/components/HealthSetup/HealthSetupCard";
import { FC, useEffect, useState, useCallback, useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import diseases from "@/data/diseases.json";
import allergies from "@/data/allergies.json";
import { Disease } from "@/types/health-setup";
import { Colors } from "@/themes/colors";
import ActionButton from "@/components/shared/ActionButton";
import { Href, useRouter } from "expo-router";
import { Screens } from "@/constants/screens";
import { Step } from "@/enums/step";

const HealthSetup: FC = () => {
  // States
  const [currentStep, setCurrentStep] = useState<Step>(Step.DISEASES);
  const [selectedDiseases, setSelectedDiseases] = useState<Set<string>>(
    new Set()
  );
  const [selectedAllergies, setSelectedAllergies] = useState<Set<string>>(
    new Set()
  );

  // Hooks
  const router = useRouter();

  const handleNext = useCallback(() => {
    if (currentStep === Step.DISEASES) {
      setCurrentStep(Step.ALERGIES);
      return;
    }
    router.push(Screens.HOME_SCREEN as Href);
  }, [currentStep, router]);

  const handleSkip = useCallback(() => {
    if (currentStep === Step.DISEASES) {
      setCurrentStep(Step.ALERGIES);
      return;
    }
    router.push(Screens.HOME_SCREEN as Href);
  }, [currentStep, router]);

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

  return (
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
      <View>
        <ActionButton label={"CONTINUE"} icon="⟶" onPress={handleNext} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.GLOVO_YELLOW,
  },
  scrollview_container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 2,
  },
});

export default HealthSetup;
