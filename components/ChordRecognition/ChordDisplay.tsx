// This component will serve as the gateway to the Chord Recognition feature

import React from "react";
import { View, StyleSheet, Text } from "react-native";

const ChordDisplay: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chord Recognition</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1.5,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default ChordDisplay;
