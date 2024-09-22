import { Text, View } from "react-native";
import ChordRecognition from "@/components/ChordRecognition/ChordRecognition";
import Audio from "@/components/AudioFeed/Audio";

// This is the home page of the App where AI Chord Recognition takes place
export default function Index() {
  return (
    <View
      style={{
        flexDirection: "column",
        flex: 1,
      }}
    >
      <ChordRecognition />
      <Audio />
    </View>
  );
}
