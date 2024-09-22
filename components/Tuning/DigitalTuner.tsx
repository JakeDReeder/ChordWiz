import { Text, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";

export default function DigitalTuner() {
  return (
    <ThemedView>
      <ThemedView
        style={{
          flexDirection: "row",
          height: 300,
          alignContent: "flex-end",
          backgroundColor: Colors.dark.primary,
        }}
      >
        <ThemedText
          style={{
            paddingLeft: 150,
            paddingTop: 100,
            fontSize: 120,
            alignSelf: "center",
          }}
        >
          A
        </ThemedText>
      </ThemedView>
      <View style={{ backgroundColor: Colors.dark.primary, height: 180 }}>
        <ThemedText style={{ fontSize: 25 }}>TUNING METER HERE</ThemedText>
      </View>
    </ThemedView>
  );
}
