import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "../ThemedText";
import { AMDF } from "pitchfinder";

const ChromaticTuner: React.FC = () => {
  const [pitch, setPitch] = useState<number | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const detectPitch = AMDF();

  useEffect(() => {
    const startPitchDetection = async () => {
      try {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== "granted") {
          console.error("Audio permission not granted");
          return;
        }

        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        // Create an audio recording instance
        const newRecording = new Audio.Recording();
        await newRecording.prepareToRecordAsync({
          isMeteringEnabled: true, // Enable metering for pitch detection
          android: {
            extension: ".m4a",
            outputFormat: Audio.AndroidOutputFormat.MPEG_4,
            audioEncoder: Audio.AndroidAudioEncoder.AAC,
            sampleRate: 44100,
            numberOfChannels: 1,
            bitRate: 128000,
          },
          ios: {
            extension: ".m4a",
            audioQuality: Audio.IOSAudioQuality.MAX,
            sampleRate: 44100,
            numberOfChannels: 1,
            bitRate: 128000,
          },
          web: {},
        });

        await newRecording.startAsync();
        setRecording(newRecording);

        // Start an interval to analyze the audio data
        const interval = setInterval(async () => {
          const status = await newRecording.getStatusAsync();

          if (status.isRecording) {
            // Check if recording is active
            const audioData = await newRecording.getAudioDataAsync();
            const frequency = detectPitch(audioData); // Use pitchfinder or similar library

            if (frequency) {
              setPitch(frequency);
              setNote(getNoteFromPitch(frequency));
            }
          }
        }, 100); // Adjust interval as needed

        return () => {
          clearInterval(interval);
          if (newRecording) {
            newRecording.stopAndUnloadAsync();
          }
        };
      } catch (err) {
        console.error("Error starting pitch detection:", err);
      }
    };

    startPitchDetection();

    return () => {
      if (recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, []);

  const getNoteFromPitch = (frequency: number): string => {
    const noteStrings = [
      "C",
      "C#",
      "D",
      "D#",
      "E",
      "F",
      "F#",
      "G",
      "G#",
      "A",
      "A#",
      "B",
    ];
    const noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
    const roundedNoteNum = Math.round(noteNum) + 69;
    return noteStrings[roundedNoteNum % 12];
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.note}>{note || "N/A"}</ThemedText>
      <ThemedText style={styles.pitch}>
        Pitch: {pitch ? `${pitch.toFixed(2)} Hz` : "N/A"}
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.dark.primary,
    height: 440,
  },
  pitch: {
    marginTop: 20,
    fontSize: 16,
    marginBottom: 5,
  },
  note: {
    fontSize: 120,
  },
});

export default ChromaticTuner;
