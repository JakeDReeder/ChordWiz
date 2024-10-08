import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "../ThemedText";

const ChromaticTuner: React.FC = () => {
  const [pitch, setPitch] = useState<number | null>(null);
  const [note, setNote] = useState<string | null>(null);

  useEffect(() => {
    let recording: Audio.Recording | null = null;
    let pitchDetector: NodeJS.Timeout | null = null;

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

        recording = new Audio.Recording();
        try {
          await recording.prepareToRecordAsync({
            isMeteringEnabled: true,
            android: {
              extension: ".m4a",
              outputFormat: Audio.AndroidOutputFormat.MPEG_4,
              audioEncoder: Audio.AndroidAudioEncoder.AAC,
              sampleRate: 44100,
              numberOfChannels: 2,
              bitRate: 128000,
            },
            ios: {
              extension: ".m4a",
              outputFormat: Audio.IOSOutputFormat.MPEG4AAC,
              audioQuality: Audio.IOSAudioQuality.MAX,
              sampleRate: 44100,
              numberOfChannels: 2,
              bitRate: 128000,
              linearPCMBitDepth: 16,
              linearPCMIsBigEndian: false,
              linearPCMIsFloat: false,
            },
            web: {
              mimeType: "audio/webm",
              bitsPerSecond: 128000,
            },
          });
          await recording.startAsync();
        } catch (err) {
          console.error("Failed to start recording", err);
        }

        // This is a placeholder for actual pitch detection logic
        // You would typically use a pitch detection algorithm here
        pitchDetector = setInterval(() => {
          const detectedPitch = Math.random() * 880 + 220; // Random pitch between 220Hz and 1100Hz
          setPitch(detectedPitch);
          setNote(getNoteFromPitch(detectedPitch));
        }, 100);
      } catch (err) {
        console.error("Error in startPitchDetection:", err);
      }
    };

    startPitchDetection();

    return () => {
      if (pitchDetector) clearInterval(pitchDetector);
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
    height: 480,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  pitch: {
    marginTop: 20,
    fontSize: 16,
    marginBottom: 5,
  },
  note: {
    fontSize: 120,
    fontWeight: "bold",
  },
});

export default ChromaticTuner;
