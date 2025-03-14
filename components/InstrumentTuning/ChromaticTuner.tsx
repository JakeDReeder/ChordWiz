import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

const ChromaticTuner: React.FC = () => {
  const colorScheme = useColorScheme();
  const styles = StyleSheet.create({
    container: {
      flex: 6,
      justifyContent: "center",
      backgroundColor: Colors[colorScheme ?? "light"].background2,
      alignItems: "center",
    },
    text: {
      fontSize: 18,
    },
  });
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="defaultBold" style={styles.text}>
        Chromatic Tuner
      </ThemedText>
    </ThemedView>
  );
};

export default ChromaticTuner;
