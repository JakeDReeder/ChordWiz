// This component will serve as the gateway to the Chord Recognition feature

import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

interface Chord {
  chord: string;
}

const ChordDisplay: React.FC<Chord> = ({ chord }) => {
  const colorScheme = useColorScheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: Colors[colorScheme ?? "light"].background,
      alignItems: "flex-start",
      padding: 20,
    },
    text: {
      fontSize: 30,
    },
  });
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="defaultBold" style={styles.text}>
        {chord}
      </ThemedText>
    </ThemedView>
  );
};

export default ChordDisplay;
