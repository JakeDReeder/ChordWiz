import React from "react";
import { View, StyleSheet, Text } from "react-native";

const ChromaticTuner: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chromatic Tuner</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 5.5, // 55% of the total 10 flex units
    backgroundColor: "lightgreen",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default ChromaticTuner;
