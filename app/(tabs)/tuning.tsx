import { View, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import ChromaticTuner from "@/components/InstrumentTuning/ChromaticTuner";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { AudioRecorderProvider } from "@siteed/expo-audio-studio";

export default function Index() {
  return (
    <ThemedView style={styles.container}>
      <ChromaticTuner />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
