// This is the home page for the application.
// Contains three main features
// 1. Chord Recognition to help musicians identify chords
// 2. Chromatic tuner to help musicians tune instruments like guitar
// 3. Audio waveform visual to signify the device is listening.

import { Text, View, StyleSheet } from "react-native";
import React from "react";

import ChordDisplay from "@/components/ChordRecognition/ChordDisplay";
import ChromaticTuner from "@/components/InstrumentTuning/ChromaticTuner";
import Waveform from "@/components/WaveformVisual/Waveform";
import { ThemedView } from "@/components/ThemedView";

export default function Index() {
  return (
    <ThemedView style={styles.container}>
      <ChordDisplay />
      <ChromaticTuner />
      <Waveform />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
