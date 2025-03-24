import { View, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import ChordDisplay from "@/components/ChordRecognition/ChordDisplay";
import ChromaticTuner from "@/components/InstrumentTuning/ChromaticTuner";
import AudioVisual from "@/components/AudioVisual/LiveAudioVisual";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import {
  AudioRecorderProvider,
  useSharedAudioRecorder,
  RecordingConfig,
} from "@siteed/expo-audio-studio";

export default function Index() {
  return (
    <AudioRecorderProvider
      config={{
        logger: console,
      }}
    >
      <ThemedView style={styles.container}>
        <ChordDisplay />
        <ChromaticTuner />
        <AudioVisual />
      </ThemedView>
    </AudioRecorderProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function AutoStartRecording() {
  const { startRecording, isRecording } = useSharedAudioRecorder();

  useEffect(() => {
    const start = async () => {
      if (!isRecording) {
        const config: RecordingConfig = {
          interval: 500,
          enableProcessing: true,
        };
        await startRecording(config);
      }
    };

    start();
  }, []); // Runs only once when the component mounts

  return null; // This component does not render anything
}
