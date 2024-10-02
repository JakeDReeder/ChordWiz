import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Audio } from "expo-av";

export default function AudioStream() {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [audioLevel, setAudioLevel] = useState(0);

  useEffect(() => {
    const startRecording = async () => {
      try {
        const { status } = await Audio.requestPermissionsAsync();
        if (status === "granted") {
          const recordingInstance = new Audio.Recording();
          await recordingInstance.prepareToRecordAsync(
            Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
          );
          await recordingInstance.startAsync();
          setRecording(recordingInstance);
          setIsRecording(true);
          monitorAudio();
        } else {
          console.error("Permission not granted for audio recording");
        }
      } catch (error) {
        console.error("Error starting recording:", error);
      }
    };

    const monitorAudio = async () => {
      if (recording) {
        const audioData = await recording.getAudioRecording();
        // Use audioData to calculate the audio level or use an audio analyzer
        const level = Math.abs(audioData.value); // Simplified audio level extraction
        setAudioLevel(level);
      }
    };

    if (isRecording) {
      monitorAudio();
    }

    return () => {
      if (recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, [isRecording]);

  const startAudioFeed = () => {
    if (!isRecording) {
      startRecording();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Live Audio Feed</Text>
      <Text style={styles.audioLevel}>
        Audio Level: {audioLevel.toFixed(2)}
      </Text>
      <View style={styles.visualizationContainer}>
        {/* Visualization goes here based on audioLevel */}
      </View>
      <Text onPress={startAudioFeed} style={styles.startButton}>
        Start Audio Feed
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#282c34",
    padding: 20,
  },
  text: {
    color: "white",
    fontSize: 24,
  },
  audioLevel: {
    color: "white",
    fontSize: 18,
    marginTop: 10,
  },
  visualizationContainer: {
    height: 100,
    width: "100%",
    backgroundColor: "#444",
    marginTop: 20,
  },
  startButton: {
    color: "blue",
    marginTop: 20,
    fontSize: 18,
  },
});
