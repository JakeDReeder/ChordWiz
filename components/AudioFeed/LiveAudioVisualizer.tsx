import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Canvas, Path, Skia, useCanvasRef } from "@shopify/react-native-skia";
import { Colors } from "@/constants/Colors";

const LiveAudioVisualizer: React.FC = () => {
  const canvasRef = useCanvasRef();
  const [waveformPath, setWaveformPath] = useState(Skia.Path.Make()); // Skia Path for waveform
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
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
      animationRef.current = requestAnimationFrame(drawWaveform); // Continue animation
    };

    // Start the waveform drawing animation
    drawWaveform();

    return () => {
      // Cleanup animation on unmount
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas} ref={canvasRef}>
        {/* Render the waveform */}
        <Path path={waveformPath} color="green" style="stroke" strokeWidth={2} />
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    backgroundColor: Colors.dark.secondary,
  },
  canvas: {
    flex: 1,
  },
});

export default LiveAudioVisualizer;
