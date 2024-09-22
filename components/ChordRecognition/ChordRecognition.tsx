import { Text, View } from "react-native";

export default function ChordRecognition() {
  return (
    <View>
      <View style={{ backgroundColor: "red", padding: 20, height: 80 }}>
        <Text style={{ fontSize: 25 }}>A Major 7th, 9th Chord</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          height: 400,
          backgroundColor: "blue",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{ marginLeft: 150, fontSize: 100, alignSelf: "flex-start" }}
          >
            A
          </Text>
          <Text style={{ fontSize: 30, alignSelf: "flex-start" }}>M7(9)</Text>
        </View>
      </View>
    </View>
  );
}
