import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { useSharedAudioRecorder } from "@siteed/expo-audio-studio";
import * as PitchFinder from "pitchfinder";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import TuningMeter from "./TuningMeter";

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const ChromaticTuner: React.FC = () => {
  const colorScheme = useColorScheme();
  const [frequency, setFrequency] = useState<number | null>(null);
  const [currentNote, setCurrentNote] = useState<string>("-");
  const [cents, setCents] = useState<number>(0);
  const pitchDetector = PitchFinder.YIN();
  const { startRecording, isRecording, isPaused } = useSharedAudioRecorder();

  useEffect(() => {
    if (!isRecording && !isPaused) {
      startRecording({
        sampleRate: 44100,
        channels: 1,
        encoding: "pcm_16bit",
        interval: 100,
        onAudioStream: async (event) => {
          let floatBuffer;
          if (typeof event.data === "string") {
            const binaryString = atob(event.data);
            const buffer = new ArrayBuffer(binaryString.length);
            const view = new Uint8Array(buffer);
            for (let i = 0; i < binaryString.length; i++) {
              view[i] = binaryString.charCodeAt(i);
            }
            floatBuffer = new Float32Array(buffer);
          } else {
            floatBuffer = new Float32Array(event.data);
          }

          const detectedFreq = pitchDetector(floatBuffer);
          if (detectedFreq) {
            setFrequency(detectedFreq);
            const midiNumber = Math.round(
              12 * (Math.log2(detectedFreq / 440) + 4.75)
            );
            setCurrentNote(notes[midiNumber % 12]);
            setCents(
              Math.round(
                (12 * (Math.log2(detectedFreq / 440) + 4.75) - midiNumber) * 100
              )
            );
          }
        },
      });
    }
  }, [isRecording, isPaused]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme ?? "light"].background2 },
      ]}
    >
      <ThemedText style={styles.note}>{currentNote}</ThemedText>
      <TuningMeter cents={cents} note={currentNote} />
      <ThemedText style={styles.cents}>
        {frequency
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
    flex: 6,
    justifyContent: "center",
    alignItems: "center",
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
