import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedView } from "../ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { AudioVisualizer } from "@siteed/expo-audio-ui";
import { useSharedAudioRecorder } from "@siteed/expo-audio-studio";

const AudioVisual: React.FC = () => {
  const colorScheme = useColorScheme();
  const styles = StyleSheet.create({
    container: {
      flex: 3,
      backgroundColor: Colors[colorScheme ?? "light"].background3,
    },
  });
  const { analysisData, isRecording } = useSharedAudioRecorder();
  return (
    <ThemedView style={styles.container}>
      {analysisData && (
        <AudioVisualizer
          candleSpace={1}
          candleWidth={3}
          canvasHeight={200}
          mode={isRecording ? "live" : "static"}
          disableTapSelection={true}
          audioData={analysisData}
          amplitudeScaling="normalized"
        />
      )}
    </ThemedView>
  );
};

export default AudioVisual;
