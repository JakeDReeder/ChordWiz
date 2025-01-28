import { Text, View, StyleSheet } from "react-native";
import ChromaticTuner from "@/components/Tuning/ChromaticTuner";
import LiveAudioVisualizer from "@/components/AudioFeed/LiveAudioVisualizer";
import { Audio } from "expo-av";
import React, { useState, useEffect } from "react";
import { Colors } from "@/constants/Colors";

export default function Tuning() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initializeAudio = async () => {
      try {
        const permission = await Audio.requestPermissionsAsync();
        if (!permission.granted) {
          throw new Error("Permission not granted");
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

        if (isMounted) {
          setRecording(newRecording);
          setIsInitialized(true);
        }
      } catch (err) {
        console.error("Error initializing audio:", err);
        if (isMounted) {
          setError(err instanceof Error ? err.message : String(err));
        }
      }
    };

    initializeAudio();

    return () => {
      isMounted = false;
      if (recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ChromaticTuner
        isRecording={isInitialized}
        recording={recording ?? undefined}
      />
      <LiveAudioVisualizer
        isRecording={isInitialized}
        recording={recording ?? undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    height: "100%",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    padding: 20,
  },
});
