import { Text, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";

export default function Audio() {
  return (
    <ThemedView style={{ backgroundColor: Colors.dark.secondary, height: 200 }}>
      <ThemedText>AUDIO FEED HERE</ThemedText>
    </ThemedView>
  );
}
