import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";

import LiveAudioVisualizer from "@/components/AudioFeed/LiveAudioVisualizer";
import ChromaticTuner from "@/components/Tuning/ChromaticTuner";
import ChordDisplay from "@/components/ChordRecognition/ChordDisplay";

export default function ChordRecognitionScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedChord, setRecognizedChord] = useState<string | null>(null);
  const [showTuner, setShowTuner] = useState(false);

  return (
    <ThemedView style={styles.container}>
      <LiveAudioVisualizer />
      <ChordDisplay chord={recognizedChord} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsRecording(!isRecording)}
      >
        <Text style={styles.buttonText}>
          {isRecording ? "Stop Recording" : "Start Recording"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tunerButton}
        onPress={() => setShowTuner(!showTuner)}
      >
        <Text style={styles.buttonText}>
          {showTuner ? "Hide Tuner" : "Show Tuner"}
        </Text>
      </TouchableOpacity>
      {showTuner && <ChromaticTuner />}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  tunerButton: {
    backgroundColor: "#34C759",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
