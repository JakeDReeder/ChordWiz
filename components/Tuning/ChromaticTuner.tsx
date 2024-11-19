import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { ThemedText } from "../ThemedText";
import { Colors } from "@/constants/Colors";
// import LiveAudioStream from "react-native-live-audio-stream"; // Commented out
import PitchFinder from "pitchfinder";

const SAMPLE_RATE = 44100;
const BUFFER_SIZE = 2048;

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const DEVIATION_BARS = [
  { threshold: 30, color: "#FF5252" }, // Red
  { threshold: 20, color: "#FF7B39" }, // Orange
  { threshold: 15, color: "#FFB039" }, // Light Orange
  { threshold: 10, color: "#FFE339" }, // Yellow
  { threshold: 5, color: "#B4FF39" }, // Light Green
  { threshold: 0, color: "#4CAF50" }, // Green
  { threshold: -5, color: "#B4FF39" }, // Light Green
  { threshold: -10, color: "#FFE339" }, // Yellow
  { threshold: -15, color: "#FFB039" }, // Light Orange
  { threshold: -20, color: "#FF7B39" }, // Orange
  { threshold: -30, color: "#FF5252" }, // Red
];

interface NoteInfo {
  note: string;
  cents: number;
}

const ChromaticTuner: React.FC = () => {
  const [currentNote, setCurrentNote] = useState<string>("A");
  const [frequency, setFrequency] = useState<number>(440);
  const [cents, setCents] = useState<number>(0);
  const [isInTune, setIsInTune] = useState<boolean>(true);

  // Function to convert frequency to note name and cents deviation
  const frequencyToNote = (freq: number): NoteInfo => {
    const midiNumber = 12 * (Math.log2(freq / 440) + 4.75);
    const roundedMidi = Math.round(midiNumber);
    const cents = Math.round((midiNumber - roundedMidi) * 100);
    const noteName = notes[roundedMidi % 12];
    return { note: noteName, cents };
  };

  useEffect(() => {
    // Simulate frequency oscillation with a slower interval
    const interval = setInterval(() => {
      const simulatedFrequency = 440 + Math.sin(Date.now() / 1500) * 10; // Oscillate between 430 and 450 Hz
      setFrequency(simulatedFrequency);

      // Calculate note info based on the simulated frequency
      const noteInfo = frequencyToNote(simulatedFrequency);
      setCurrentNote(noteInfo.note);
      setCents(noteInfo.cents);
      setIsInTune(Math.abs(noteInfo.cents) < 5);
    }, 200); // Slowed down to update every 200ms

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <View style={styles.container}>
      <ThemedText style={styles.note}>{currentNote}</ThemedText>
      <View style={styles.meterContainer}>
        {DEVIATION_BARS.map((bar, index) => (
          <Animated.View
            key={bar.threshold}
            style={[
              styles.bar,
              {
                backgroundColor: bar.color,
                opacity: Math.abs(cents - bar.threshold) < 5 ? 1 : 0.2,
                height: 40 + Math.abs(bar.threshold) * 0.8,
              },
            ]}
          />
        ))}
      </View>
      <ThemedText style={styles.cents}>
        {frequency.toFixed(1)} Hz | {cents > 0 ? `+${cents}` : cents} cents
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.dark.secondary,
  },
  frequency: {
    fontSize: 24,
    marginBottom: 10,
  },
  note: {
    fontSize: 130,
    marginBottom: 20,
  },
  tuningIndicator: {
    width: "80%",
    height: 40,
    backgroundColor: "#E0E0E0",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 10,
  },
  indicator: {
    width: 20,
    height: "100%",
    borderRadius: 10,
    transform: [{ translateX: 0 }],
  },
  cents: {
    fontSize: 20,
  },
  meterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    marginBottom: 20,
    width: "90%",
  },
  bar: {
    width: 15,
    marginHorizontal: 4,
    borderRadius: 8,
  },
});

export default ChromaticTuner;
