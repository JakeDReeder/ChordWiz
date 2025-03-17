import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { Waveform, CandleData } from "@siteed/expo-audio-ui";

interface WaveformVisualProps {
  activePoints: CandleData[];
}

const WaveformVisual: React.FC<WaveformVisualProps> = ({ activePoints }) => {
  const colorScheme = useColorScheme();
  const styles = StyleSheet.create({
    container: {
      flex: 3,
    },
  });
  return (
    <ThemedView style={styles.container}>
      <Waveform
        activePoints={activePoints}
        canvasHeight={50}
        canvasWidth={100}
        minAmplitude={0}
        maxAmplitude={1} // Adjust based on your data
        theme={{
          color: Colors[colorScheme ?? "light"].primary,
          strokeWidth: 2,
          opacity: 1,
        }}
        smoothing={true}
      />
    </ThemedView>
  );
};

export default WaveformVisual;
