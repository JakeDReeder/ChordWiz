import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import LiveAudioStream from "react-native-live-audio-stream";
import PitchFinder from "pitchfinder";

const SAMPLE_RATE = 44100;
const BUFFER_SIZE = 2048;

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

interface NoteInfo {
  note: string;
  cents: number;
}

const ChromaticTuner: React.FC = () => {
  const [currentNote, setCurrentNote] = useState<string>("--");
  const [frequency, setFrequency] = useState<number>(0);
  const [cents, setCents] = useState<number>(0);
  const [isInTune, setIsInTune] = useState<boolean>(false);

  // Convert frequency to note name and cents deviation
  const frequencyToNote = (freq: number): NoteInfo => {
    const midiNumber = 12 * (Math.log2(freq / 440) + 4.75);
    const roundedMidi = Math.round(midiNumber);
    const cents = Math.round((midiNumber - roundedMidi) * 100);
    const noteName = notes[roundedMidi % 12];
    const octave = Math.floor(roundedMidi / 12);
    return { note: `${noteName}${octave}`, cents };
  };

  useEffect(() => {
    // Initialize pitch detector
    const detector = PitchFinder.YIN({ sampleRate: SAMPLE_RATE });

    // Configure audio stream with 'wavFile' property
    const options = {
      sampleRate: SAMPLE_RATE,
      bufferSize: BUFFER_SIZE,
      channels: 1,
      bitsPerSample: 16,
      wavFile: "path_to_audio_file.wav", // Add path to audio file or empty string if not using a file
    };

    // Start audio stream
    LiveAudioStream.init(options);
    LiveAudioStream.start();

    // @ts-ignore Temporarily ignoring the TypeScript error for this workaround
    const audioStream: any = LiveAudioStream;

    // Process audio data
    audioStream.onAudioData((data: Int16Array) => {
      // Convert audio data to Float32Array
      const buffer = new Float32Array(data.length / 2);
      for (let i = 0; i < data.length; i += 2) {
        buffer[i / 2] = ((data[i] | (data[i + 1] << 8)) << 16) >> 16;
      }

      // Detect pitch
      const pitch = detector(buffer);
      if (pitch) {
        setFrequency(Math.round(pitch));
        const noteInfo = frequencyToNote(pitch);
        setCurrentNote(noteInfo.note);
        setCents(noteInfo.cents);
        setIsInTune(Math.abs(noteInfo.cents) < 5);
      }
    });

    // Cleanup
    return () => {
      LiveAudioStream.stop();
    };
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
