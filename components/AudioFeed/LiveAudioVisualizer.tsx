import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { Audio } from "expo-av";

const FFT_SIZE = 32; // Reduced from 128 for better performance

interface LiveAudioVisualizerProps {
  isRecording: boolean;
  recording?: Audio.Recording;
}

const LiveAudioVisualizer: React.FC<LiveAudioVisualizerProps> = ({
  isRecording,
  recording,
}) => {
  const [bars] = useState<Animated.Value[]>(
    Array(FFT_SIZE)
      .fill(0)
      .map(() => new Animated.Value(0))
  );

  const analyzeAudio = async (status: Audio.RecordingStatus) => {
    if (status.isRecording) {
      // Get metering info from status
      const dB = status.metering ?? -160; // Metering ranges from -160 to 0
      const normalized = (dB + 160) / 160; // Normalize to 0-1 range

      // Animate bars with random variations for visual effect
      bars.forEach((animatedValue, index) => {
        const variation = 0.7 + Math.random() * 0.3;
        Animated.timing(animatedValue, {
          toValue: normalized * variation,
          duration: 50,
          useNativeDriver: false,
        }).start();
      });
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRecording && recording) {
      interval = setInterval(async () => {
        const status = await recording.getStatusAsync();
        analyzeAudio(status);
      }, 50);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRecording, recording]);

  return (
    <View style={styles.visualizer}>
      {bars.map((animatedValue, index) => (
        <Animated.View
          key={index}
          style={[
            styles.bar,
            {
              height: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  visualizer: {
    flexDirection: "row",
    height: "100%",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  bar: {
    width: 4,
    backgroundColor: "#4CAF50",
    marginHorizontal: 1,
    borderRadius: 2,
  },
});

export default LiveAudioVisualizer;
