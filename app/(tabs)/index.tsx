import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  ActivityIndicator,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import ChordDisplay from "@/components/ChordRecognition/ChordDisplay";
import ChordDetails from "@/components/ChordRecognition/ChordDetails";
import AudioVisual from "@/components/AudioVisual/LiveAudioVisual";
import {
  AudioRecorderProvider,
  useSharedAudioRecorder,
  RecordingConfig,
} from "@siteed/expo-audio-studio";

export default function Index(): JSX.Element {
  const [chord, setChord] = useState<string>("Chord Display");
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  return (
    <ThemedView style={styles.container}>
      <AudioRecorderProvider>
        <ChordDisplay chord={chord} />
        <ChordDetails chord={chord} />
        <RecordingControls setChord={setChord} setLoading={setLoading} />
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" /> // Display loading indicator when loading
        ) : (
          <AudioVisual />
        )}
      </AudioRecorderProvider>
    </ThemedView>
  );
}

interface RecordingControlsProps {
  setChord: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>; // Add setLoading prop
}

const RecordingControls: React.FC<RecordingControlsProps> = ({
  setChord,
  setLoading,
}) => {
  const { startRecording, stopRecording, isRecording } =
    useSharedAudioRecorder();

  const handleStartRecording = async () => {
    const config: RecordingConfig = {
      sampleRate: 44100,
      channels: 1,
      interval: 500,
      enableProcessing: true,
      outputDirectory: "",
    };

    await startRecording({ interval: 500, enableProcessing: true });
  };

  const handleStopRecording = async () => {
    setLoading(true); // Start loading after stopping the recording
    await stopRecording();
    // Simulate a delay (2 seconds) before updating the chord
    setTimeout(() => {
      setChord((prev) =>
        prev === "Major Chord" ? "Minor Chord" : "Major Chord"
      );
      setLoading(false); // Stop loading after the delay
    }, 2000); // 2-second delay
  };

  return (
    <View>
      {!isRecording ? (
        <Button title="Start Recording" onPress={handleStartRecording} />
      ) : (
        <Button title="Stop Recording" onPress={handleStopRecording} />
      )}
    </View>
  );
};

const RecordingStatus: React.FC = () => {
  const { isRecording, durationMs } = useSharedAudioRecorder();
  return (
    <View>
      <Text>Duration: {durationMs / 1000} seconds</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
