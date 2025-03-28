// This is the home page for the application.
// Contains three main features
// 1. Chord Recognition to help musicians identify chords
// 2. Chromatic tuner to help musicians tune instruments like guitar
// 3. Audio waveform visual to signify the device is listening.

import { Button, View, StyleSheet } from "react-native";
import React from "react";
import { requestPermissions } from "@/constants/requestPermissions";
import ChordDisplay from "@/components/ChordRecognition/ChordDisplay";
import ChromaticTuner from "@/components/InstrumentTuning/ChromaticTuner";
import AudioVisual from "@/components/AudioVisual/LiveAudioVisual";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

// Tools for sharing recording among components
import {
  AudioRecorderProvider,
  useSharedAudioRecorder,
  RecordingConfig,
} from "@siteed/expo-audio-studio";
import { CandleData } from "@siteed/expo-audio-ui";

// Requesting permission for microphone
requestPermissions();

export default function Index() {
  return (
    <AudioRecorderProvider
      config={{
        // Optional configuration for the useAudioRecorder hook
        logger: console,
      }}
    >
      <ThemedView style={styles.container}>
        <ChordDisplay />
        <ChromaticTuner />
        <AudioVisual />
        <RecordingControls />
        <RecordingStatus />
      </ThemedView>
    </AudioRecorderProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function RecordingControls() {
  const { startRecording, stopRecording, isRecording, isPaused } =
    useSharedAudioRecorder();

  const handleStartRecording = async () => {
    const config: RecordingConfig = {
      interval: 500,
      enableProcessing: true,
      // add more
    };

    await startRecording(config);
  };

  return (
    <View>
      {!isRecording && !isPaused && (
        <Button title="Start Recording" onPress={handleStartRecording} />
      )}

      {isRecording && (
        <>
          <Button title="Stop Recording" onPress={stopRecording} />
        </>
      )}
    </View>
  );
}

function RecordingStatus() {
  const { isRecording, isPaused, durationMs, size } = useSharedAudioRecorder();

  if (!isRecording && !isPaused) {
    return <ThemedText>Ready to record</ThemedText>;
  }

  return (
    <ThemedView>
      <ThemedText>Status: {isRecording}</ThemedText>
      <ThemedText>Duration: {durationMs / 1000} seconds</ThemedText>
      <ThemedText>Size: {size} bytes</ThemedText>
    </ThemedView>
  );
}
