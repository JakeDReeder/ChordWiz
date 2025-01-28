import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { Audio } from "expo-av";
import { Colors } from "@/constants/Colors";

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

interface ChromaticTunerProps {
  isRecording: boolean;
  recording?: Audio.Recording;
}

const ChromaticTuner: React.FC<ChromaticTunerProps> = ({
  isRecording,
  recording,
}) => {
  const [currentNote, setCurrentNote] = useState<string>("--");
  const [frequency, setFrequency] = useState<number>(0);
  const [cents, setCents] = useState<number>(0);

  const frequencyFromPitch = (dB: number): number => {
    // This is a simplified approximation. In a real tuner, you'd need
    // more sophisticated pitch detection algorithms
    const normalizedDB = (dB + 160) / 160; // Normalize -160...0 to 0...1
    return 440 * Math.pow(2, (normalizedDB - 0.5) * 2);
  };

  const analyzeAudio = async (status: Audio.RecordingStatus) => {
    if (status.isRecording) {
      const dB = status.metering ?? -160;
      const detectedFreq = frequencyFromPitch(dB);

      if (detectedFreq > 20) {
        // Only process if we detect a reasonable frequency
        setFrequency(detectedFreq);

        // Convert frequency to note and cents
        const midiNumber = 12 * (Math.log2(detectedFreq / 440) + 4.75);
        const roundedMidi = Math.round(midiNumber);
        const noteName = notes[roundedMidi % 12];
        const centsDeviation = Math.round((midiNumber - roundedMidi) * 100);

        setCurrentNote(noteName || "--");
        setCents(centsDeviation);
      }
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRecording && recording) {
      interval = setInterval(async () => {
        const status = await recording.getStatusAsync();
        analyzeAudio(status);
      }, 100);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRecording, recording]);

  return (
    <View style={styles.container}>
      <ThemedText style={styles.note}>{currentNote}</ThemedText>
      <ThemedText style={styles.frequency}>
        {frequency > 20
          ? `${frequency.toFixed(1)} Hz | ${
              cents > 0 ? `+${cents}` : cents
            } cents`
          : "Listening..."}
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
  note: {
    fontSize: 130,
    fontWeight: "bold",
  },
  frequency: {
    fontSize: 20,
    marginTop: 10,
  },
});

export default ChromaticTuner;
