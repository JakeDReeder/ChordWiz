import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";

export default function ChordRecognition() {
  return (
    <ThemedView>
      <ThemedView style={{ padding: 20, height: 80 }}>
        <ThemedText style={{ fontSize: 25 }}>A Major 7th, 9th Chord</ThemedText>
      </ThemedView>
      <ThemedView
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: Colors.dark.primary,
          height: 360,
        }}
      >
        <ThemedView
          style={{ flexDirection: "row", backgroundColor: Colors.dark.primary }}
        >
          <ThemedText
            style={{ marginLeft: 150, fontSize: 130, alignSelf: "flex-start" }}
          >
            A
          </ThemedText>
          <ThemedText style={{ fontSize: 30, alignSelf: "flex-start" }}>
            M7(9)
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}
