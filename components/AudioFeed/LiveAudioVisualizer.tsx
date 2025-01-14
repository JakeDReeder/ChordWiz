import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Dimensions, Animated, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import { NativeEventEmitter, NativeModules } from "react-native";

const { MyAudioModule } = NativeModules;
const audioModuleEmitter = new NativeEventEmitter(MyAudioModule);

// Listen for audio data events
audioModuleEmitter.addListener("onAudioData", (event) => {
  console.log("Received RMS:", event.rms);
});

const FFT_SIZE = 128;
const MAX_DB = 0;
const MIN_DB = -100;

const LiveAudioVisualizer: React.FC = () => {
  const [bars] = useState(() =>
    Array(FFT_SIZE)
      .fill(0)
      .map(() => new Animated.Value(0))
  );
  const [isActive, setIsActive] = useState(true);

  // Generates simulated random audio data for visualization
  const generateSimulatedData = useCallback(() => {
    return Array(FFT_SIZE)
      .fill(0)
      .map(() => Math.random() * (MAX_DB - MIN_DB) + MIN_DB);
  }, []);

  const updateVisualization = useCallback(
    (fftResult: number[]) => {
      fftResult.forEach((value, index) => {
        const normalizedValue = (value - MIN_DB) / (MAX_DB - MIN_DB);
        Animated.spring(bars[index], {
          toValue: normalizedValue,
          useNativeDriver: false,
          tension: 40,
          friction: 5,
        }).start();
      });
    },
    [bars]
  );

  useEffect(() => {
    if (!isActive) return;

    // Update the visualization periodically with a slower interval
    const intervalId = setInterval(() => {
      const fftResult = generateSimulatedData();
      updateVisualization(fftResult);
    }, 500); // Slowed down to update every 500ms

    return () => clearInterval(intervalId);
  }, [isActive, generateSimulatedData, updateVisualization]);

  const renderBars = () => {
    const { width: screenWidth } = Dimensions.get("window");
    const barWidth = (screenWidth - 32) / FFT_SIZE;
    const gap = 2;

    return (
      <View style={styles.visualizer}>
        {bars.map((animatedValue, index) => (
          <Animated.View
            key={index}
            style={[
              styles.bar,
              {
                width: barWidth - gap,
                height: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "100%"],
                }),
                backgroundColor: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ["#4CAF50", "#FFC107", "#FF5722"],
                }),
              },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.buttonText}>{isActive ? "Active" : "Inactive"}</Text>
      {renderBars()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    padding: 16,
    height: 300,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },
  visualizer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: "100%",
  },
  bar: {
    marginHorizontal: 1,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
});

export default LiveAudioVisualizer;
