import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import TuningMeter from "./TuningMeter";

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
  const colorScheme = useColorScheme();

  const componentStyles = StyleSheet.create({
    container: {
      flex: 6,
      justifyContent: "center",
      backgroundColor: Colors[colorScheme ?? "light"].background2,
      alignItems: "center",
    },
  });

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
    <View style={componentStyles.container}>
      <ThemedText style={styles.note}>{currentNote}</ThemedText>
      <TuningMeter cents={cents} note={currentNote} />
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
  },
  frequency: {
    fontSize: 24,
    marginBottom: 10,
  },
  note: {
    fontSize: 130,
    marginBottom: 20,
  },
  cents: {
    fontSize: 20,
  },
});

export default ChromaticTuner;
