import HealthSetupCard from "@/components/HealthSetup/HealthSetupCard";
import { FC, useEffect, useState, useCallback, useMemo } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import diseases from "@/data/diseases.json";
import { Disease } from "@/types/health-setup";
import { Colors } from "@/themes/colors";
import { Typography } from "@/themes/typography";
import ActionButton from "@/components/shared/ActionButton";

const HealthSetup: FC = () => {
  const [items, setItems] = useState<Disease[]>([]);

  // Fix the bug and optimize with useCallback
  const toggleSelection = useCallback((id: string) => {
    setItems((prevItems) =>
      prevItems.map(
        (item) =>
          item.id === id ? { ...item, isSelected: !item.isSelected } : item // Return the original item unchanged
      )
    );
  }, []);

  // Memoize the initial data transformation
  const initialItems = useMemo(
    () =>
      diseases.map((disease) => ({
        ...disease,
        isSelected: false,
      })),
    []
  );

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollview_container}
        bounces={true}
        scrollEventThrottle={16}
      >
        {items.slice(0, 7).map((disease) => (
          <HealthSetupCard
            key={disease.id}
            item={disease}
            onPress={toggleSelection}
          />
        ))}
      </ScrollView>
      <View>
        <ActionButton
          containerStyles={{ ...styles.action_button }}
          label={"click me"}
          icon="⟶"
          onPress={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
        <ActionButton
          containerStyles={{ ...styles.action_button }}
          buttonStyles={{ backgroundColor: Colors.GRAY }}
          label={"cancel"}
          onPress={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
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
  action_button: {
    margin: 0,
  },
});

export default HealthSetup;
