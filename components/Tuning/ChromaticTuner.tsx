import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
// import LiveAudioStream from "react-native-live-audio-stream"; // Commented out
import PitchFinder from "pitchfinder";

const SAMPLE_RATE = 44100;
const BUFFER_SIZE = 2048;

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

interface NoteInfo {
  note: string;
  cents: number;
}

const ChromaticTuner: React.FC = () => {
  const [currentNote, setCurrentNote] = useState<string>("A4");
  const [frequency, setFrequency] = useState<number>(440);
  const [cents, setCents] = useState<number>(0);
  const [isInTune, setIsInTune] = useState<boolean>(true);

  // Function to convert frequency to note name and cents deviation
  const frequencyToNote = (freq: number): NoteInfo => {
    const midiNumber = 12 * (Math.log2(freq / 440) + 4.75);
    const roundedMidi = Math.round(midiNumber);
    const cents = Math.round((midiNumber - roundedMidi) * 100);
    const noteName = notes[roundedMidi % 12];
    const octave = Math.floor(roundedMidi / 12);
    return { note: `${noteName}${octave}`, cents };
  };

  useEffect(() => {
    // Simulate frequency oscillation
    const interval = setInterval(() => {
      const simulatedFrequency = 440 + Math.sin(Date.now() / 1000) * 10; // Oscillate between 430 and 450 Hz
      setFrequency(simulatedFrequency);

      // Calculate note info based on the simulated frequency
      const noteInfo = frequencyToNote(simulatedFrequency);
      setCurrentNote(noteInfo.note);
      setCents(noteInfo.cents);
      setIsInTune(Math.abs(noteInfo.cents) < 5);
    }, 100);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.frequency}>{frequency.toFixed(1)} Hz</Text>
      <Text style={styles.note}>{currentNote}</Text>
      <View style={styles.tuningIndicator}>
        <View
          style={[
            styles.indicator,
            { backgroundColor: isInTune ? "#4CAF50" : "#FF5722" },
          ]}
        />
      </View>
      <Text style={styles.cents}>{cents > 0 ? `+${cents}` : cents} cents</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  frequency: {
    fontSize: 24,
    marginBottom: 10,
  },
  note: {
    fontSize: 48,
    fontWeight: "bold",
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
});

export default ChromaticTuner;
