import { Text, View } from "react-native";
import ChromaticTuner from "@/components/Tuning/ChromaticTuner";
import LiveAudioVisualizer from "@/components/AudioFeed/LiveAudioVisualizer";
import React, { useState } from "react";

// This is the home page of the App where AI Chord Recognition takes place
export default function tuning() {
  const [isRecording, setIsRecording] = useState(true);

  return (
    <View
      style={{
        flexDirection: "column",
        flex: 1,
      }}
    >
      <ChromaticTuner />
      <LiveAudioVisualizer isRecording={isRecording} />
    </View>
  );
}
