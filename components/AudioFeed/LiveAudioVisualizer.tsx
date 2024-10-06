import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Canvas, Path, Skia, useCanvasRef } from "@shopify/react-native-skia";
import { Audio } from "expo-av";

interface LiveAudioVisualizerProps {
  isRecording: boolean;
}

const LiveAudioVisualizer: React.FC<LiveAudioVisualizerProps> = ({
  isRecording,
}) => {
  const canvasRef = useCanvasRef();
  const [waveformPath, setWaveformPath] = useState(Skia.Path.Make()); // Skia Path for waveform
  const animationRef = useRef<number | null>(null);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);

  useEffect(() => {
    const startVisualization = async () => {
      if (!isRecording) return;

      try {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== "granted") {
          console.error("Audio recording permission not granted");
          return;
        }

        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const newRecording = new Audio.Recording();
        await newRecording.prepareToRecordAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        await newRecording.startAsync();
        setRecording(newRecording);

        const drawWaveform = () => {
          const path = Skia.Path.Make();
          const width = 300; // Set your desired width
          const height = 200; // Set your desired height

          // Generate a simple sine wave for demonstration
          path.moveTo(0, height / 2);
          for (let x = 0; x < width; x++) {
            const y = height / 2 + Math.sin(x / 10) * 20; // Sine wave logic
            path.lineTo(x, y);
          }
          setWaveformPath(path); // Update the Skia Path
          animationRef.current = requestAnimationFrame(drawWaveform);
        };

        drawWaveform();
      } catch (error) {
        console.error("Error starting audio recording:", error);
      }
    };

    const stopVisualization = async () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (recording) {
        await recording.stopAndUnloadAsync();
        setRecording(null);
      }
    };

    if (isRecording) {
      startVisualization();
    } else {
      stopVisualization();
    }

    return () => {
      stopVisualization();
    };
  }, [isRecording]);

  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas} ref={canvasRef}>
        <Path path={waveformPath} color="blue" style="stroke" strokeWidth={2} />
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    backgroundColor: "#f0f0f0",
  },
  canvas: {
    flex: 1,
  },
});

export default LiveAudioVisualizer;