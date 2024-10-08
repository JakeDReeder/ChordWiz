import { ThemedView } from "@/components/ThemedView";
import ChordRecognition from "@/components/ChordRecognition/ChordRecognition";
import LiveAudioVisualizer from "@/components/AudioFeed/LiveAudioVisualizer";
// This is the home page of the App where AI Chord Recognition takes place
export default function Index() {
  return (
    <ThemedView
      style={{
        flexDirection: "column",
        flex: 1,
      }}
    >
      <ChordRecognition />
      <LiveAudioVisualizer />
    </ThemedView>
  );
}
