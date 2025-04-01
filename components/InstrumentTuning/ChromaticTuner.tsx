import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import LiveAudioStream from "react-native-live-audio-stream";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import TuningMeter from "./TuningMeter";
import { Buffer } from "buffer";
import { getPitchedNote, ACCIDENTAL_MODE } from "@/services/pitch.service";

const ChromaticTuner: React.FC = () => {
  const colorScheme = useColorScheme();
  const [frequency, setFrequency] = useState<number | null>(null);
  const [currentNote, setCurrentNote] = useState<string>("-");
  const [cents, setCents] = useState<number>(0);
  const [octave, setOctave] = useState<number>(4); // Track the octave of the note
  const pitchDetector = new (require("pitchfinder").YIN)(); // Assuming you are using YIN for pitch detection

  // Store previous frequency to minimize unnecessary updates
  const lastFrequencyRef = useRef<number | null>(null);
  const lastNoteRef = useRef<string>("-");

  useEffect(() => {
    LiveAudioStream.init({
      sampleRate: 44100,
      channels: 1,
      bitsPerSample: 8,
      audioSource: 9,
      bufferSize: 4096,
      wavFile: "",
    });

    const handleAudioData = (data: string) => {
      const floatBuffer = new Float32Array(Buffer.from(data, "base64"));
      const detectedFreq = pitchDetector(floatBuffer);

      if (detectedFreq && detectedFreq !== lastFrequencyRef.current) {
        const pitchedNote = getPitchedNote(detectedFreq, ACCIDENTAL_MODE.SHARP); // Use the service function

        // Only update if there's a change in note or frequency
        if (
          pitchedNote.note !== lastNoteRef.current ||
          detectedFreq !== lastFrequencyRef.current
        ) {
          setFrequency(pitchedNote.frequency);
          setCurrentNote(
            pitchedNote.note + (pitchedNote.accidental === "sharp" ? "#" : "")
          );
          setCents(pitchedNote.cents);
          setOctave(pitchedNote.octave);

          // Store the last values to avoid redundant updates
          lastFrequencyRef.current = detectedFreq;
          lastNoteRef.current = pitchedNote.note;
        }
      }
    };

    LiveAudioStream.on("data", handleAudioData);
    LiveAudioStream.start();

    return () => {
      LiveAudioStream.stop();
    };
  }, []);

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
