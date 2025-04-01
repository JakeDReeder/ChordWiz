import { View, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import ChordDisplay from "@/components/ChordRecognition/ChordDisplay";
import ChromaticTuner from "@/components/InstrumentTuning/ChromaticTuner";
import AudioVisual from "@/components/AudioVisual/LiveAudioVisual";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { AudioRecorderProvider } from "@siteed/expo-audio-studio";

export default function Index() {
  return (
    <ThemedView style={styles.container}>
      <ChordDisplay />
      <AudioRecorderProvider
        config={{
          logger: console,
        }}
      >
        <ChromaticTuner />
        <AudioVisual />
      </AudioRecorderProvider>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
