import { ThemedView } from "@/components/ThemedView";
import ChordRecognition from "@/components/ChordRecognition/ChordRecognition";
import Audio from "@/components/AudioFeed/Audio";

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
      <Audio />
    </ThemedView>
  );
}
