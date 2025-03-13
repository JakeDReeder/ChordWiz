import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Waveform: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Audio Waveform</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3, // 30% of the total 10 flex units
    backgroundColor: "lightcoral",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default Waveform;
