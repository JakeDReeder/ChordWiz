import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Text,
  NativeEventEmitter,
  NativeModules,
} from "react-native";

const { MyAudioModule } = NativeModules;
const audioModuleEmitter = new NativeEventEmitter(MyAudioModule);

const FFT_SIZE = 128; // Number of bars in the visualizer
const MAX_RMS = 1.0; // Maximum RMS value (normalized)
const MIN_RMS = 0.0; // Minimum RMS value (normalized)

const LiveAudioVisualizer: React.FC = () => {
  const [bars] = useState(() =>
    Array(FFT_SIZE)
      .fill(0)
      .map(() => new Animated.Value(0))
  );
  const [isActive, setIsActive] = useState(true);

  const updateVisualization = useCallback(
    (rms: number) => {
      // Normalize RMS to fit the bar visualization
      const normalizedValue = (rms - MIN_RMS) / (MAX_RMS - MIN_RMS);

      // Update all bars to reflect the current RMS value
      bars.forEach((animatedValue) => {
        Animated.spring(animatedValue, {
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

    // Start recording when the component mounts
    MyAudioModule.startRecording();

    // Listen for RMS data from the native audio module
    const subscription = audioModuleEmitter.addListener(
      "onAudioData",
      (event) => {
        const rms = event.rms || 0; // Use the RMS value from the event
        updateVisualization(rms);
      }
    );

    return () => {
      // Clean up: stop recording and remove the event listener
      MyAudioModule.stopRecording();
      subscription.remove();
    };
  }, [isActive, updateVisualization]);

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
