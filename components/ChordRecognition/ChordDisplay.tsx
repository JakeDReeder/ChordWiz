import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ChordDisplayProps {
  chord: string | null;
}

const ChordDisplay: React.FC<ChordDisplayProps> = ({ chord }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recognized Chord</Text>
      <Text style={styles.chord}>{chord || "Listening..."}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  chord: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
  },
});

export default ChordDisplay;
