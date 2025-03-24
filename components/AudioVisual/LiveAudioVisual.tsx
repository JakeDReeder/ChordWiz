import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { ThemedText } from "../ThemedText";
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
    },
  });
  const { analysisData } = useSharedAudioRecorder();
  return (
    <ThemedView style={styles.container}>
      {analysisData && (
        <AudioVisualizer
          candleSpace={1}
          candleWidth={2}
          canvasHeight={150}
          mode="live"
          disableTapSelection={true}
          audioData={analysisData}
          amplitudeScaling="normalized"
        />
      )}
    </ThemedView>
  );
};

export default AudioVisual;
