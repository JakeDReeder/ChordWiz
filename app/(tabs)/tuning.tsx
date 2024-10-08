import { Text, View, StyleSheet } from "react-native";
import ChromaticTuner from "@/components/Tuning/ChromaticTuner";
import LiveAudioVisualizer from "@/components/AudioFeed/LiveAudioVisualizer";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";

// This is the home page of the App where AI Chord Recognition takes place
export default function tuning() {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <View
      style={{
        flexDirection: "column",
        flex: 1,
      }}
    >
      <ChromaticTuner />
      <LiveAudioVisualizer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    height: "100%"
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

