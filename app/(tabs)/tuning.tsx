import { Text, View } from "react-native";
import DigitalTuner from "@/components/Tuning/DigitalTuner";
import Audio from "@/components/AudioFeed/Audio";

// This is the home page of the App where AI Chord Recognition takes place
export default function tuning() {
  return (
    <View
      style={{
        flexDirection: "column",
        flex: 1,
      }}
    >
      <DigitalTuner />
      <Audio />
    </View>
  );
}
