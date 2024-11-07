import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Pressable,
  Text,
} from "react-native";
import LiveAudioStream from "react-native-live-audio-stream";

const SAMPLE_RATE = 44100;
const FFT_SIZE = 128;
const MAX_DB = 0;
const MIN_DB = -100;

const VisualizationType = {
  BARS: "BARS",
  CIRCLE: "CIRCLE",
  WAVE: "WAVE",
};

type LiveAudioVisualizerProps = {};

const LiveAudioVisualizer: React.FC<LiveAudioVisualizerProps> = () => {
  const [visualizationType, setVisualizationType] = useState(
    VisualizationType.BARS
  );
  const [bars] = useState(() =>
    Array(FFT_SIZE)
      .fill(0)
      .map(() => new Animated.Value(0))
  );
  const [isActive, setIsActive] = useState(true);

  const analyzeAudio = useCallback((buffer: Float32Array) => {
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
    const config = {
      sampleRate: SAMPLE_RATE,
      channels: 1,
      bitsPerSample: 16,
      audioSource: 6, // Voice Recognition audio source
      bufferSize: 2048,
      wavFile: "", // Provide a placeholder or file path if needed
    };

    const initAudioStream = async () => {
      try {
        await LiveAudioStream.init(config);

        LiveAudioStream.on("data", (data: string) => {
          if (!isActive) return;

          const buffer = new Float32Array(data.length / 2);
          for (let i = 0; i < data.length; i += 2) {
            buffer[i / 2] =
              ((data.charCodeAt(i) | (data.charCodeAt(i + 1) << 8)) << 16) >>
              16;
          }

          const fftResult = analyzeAudio(buffer);
          updateVisualization(fftResult);
        });

        await LiveAudioStream.start();
      } catch (error) {
        console.error("Error initializing audio stream:", error);
      }
    };

    initAudioStream();

    return () => {
      LiveAudioStream.stop();
    };
  }, [isActive, analyzeAudio, updateVisualization]);

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

  const renderCircle = () => {
    const { width: screenWidth } = Dimensions.get("window");
    const radius = (screenWidth - 64) / 2;

    return (
      <View style={[styles.visualizer, styles.circleContainer]}>
        {bars.map((animatedValue, index) => {
          const rotation = (index * 360) / FFT_SIZE;
          return (
            <Animated.View
              key={index}
              style={[
                styles.circleBar,
                {
                  height: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [10, radius],
                  }),
                  transform: [
                    { rotate: `${rotation}deg` },
                    { translateY: radius / 2 },
                  ],
                  backgroundColor: animatedValue.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: ["#4CAF50", "#FFC107", "#FF5722"],
                  }),
                },
              ]}
            />
          );
        })}
      </View>
    );
  };

  const renderWave = () => {
    return (
      <View style={styles.visualizer}>
        <Animated.View style={styles.waveContainer}>
          {bars.map((animatedValue, index) => (
            <Animated.View
              key={index}
              style={[
                styles.waveLine,
                {
                  height: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [2, 100],
                  }),
                  backgroundColor: animatedValue.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: ["#4CAF50", "#FFC107", "#FF5722"],
                  }),
                },
              ]}
            />
          ))}
        </Animated.View>
      </View>
    );
  };

  const renderVisualization = () => {
    switch (visualizationType) {
      case VisualizationType.CIRCLE:
        return renderCircle();
      case VisualizationType.WAVE:
        return renderWave();
      default:
        return renderBars();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <Pressable style={styles.button} onPress={() => setIsActive(!isActive)}>
          <Text style={styles.buttonText}>{isActive ? "Pause" : "Resume"}</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            const types = Object.values(VisualizationType);
            const currentIndex = types.indexOf(visualizationType);
            const nextIndex = (currentIndex + 1) % types.length;
            setVisualizationType(types[nextIndex]);
          }}
        >
          <Text style={styles.buttonText}>Change Style</Text>
        </Pressable>
      </View>
      {renderVisualization()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 16,
    height: 300,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#333",
    padding: 8,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  visualizer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  bar: {
    marginHorizontal: 1,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  circleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  circleBar: {
    position: "absolute",
    width: 3,
    borderRadius: 2,
  },
  waveContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
  },
  waveLine: {
    flex: 1,
    marginHorizontal: 1,
    borderRadius: 2,
  },
});

export default LiveAudioVisualizer;
