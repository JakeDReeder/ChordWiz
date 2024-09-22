import { Text, View } from "react-native";

export default function DigitalTuner() {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          height: 300,
          alignContent: "flex-end",
          backgroundColor: "blue",
        }}
      >
        <Text
          style={{
            paddingLeft: 150,
            paddingTop: 100,
            fontSize: 100,
            alignSelf: "center",
          }}
        >
          A
        </Text>
      </View>
      <View style={{ backgroundColor: "red", height: 180 }}>
        <Text style={{ fontSize: 25 }}>TUNING METER HERE</Text>
      </View>
    </View>
  );
}
