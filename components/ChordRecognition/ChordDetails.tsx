import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

interface Chord {
  chord: string;
}

const ChordDetails: React.FC<Chord> = ({ chord }) => {
  const colorScheme = useColorScheme();
  const styles = StyleSheet.create({
    container: {
      flex: 6,
      justifyContent: "center",
      backgroundColor: Colors[colorScheme ?? "light"].background2,
      alignItems: "flex-start",
      padding: 20,
    },
    text: {
      fontSize: 18,
      marginVertical: 5,
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 10,
    },
    listItem: {
      fontSize: 18,
      marginVertical: 5,
      paddingLeft: 10,
    },
  });

  const renderChordDetails = () => {
    switch (chord) {
      case "Chord Display":
        return (
          <>
            <ThemedText type="defaultSemiBold" style={styles.title}>
              Instructions:
            </ThemedText>
            <ThemedText style={styles.text}>
              1. Press the "Start Recording" button to begin recording.
            </ThemedText>
            <ThemedText style={styles.text}>
              2. Play a chord on your instrument and let it ring for a few
              seconds.
            </ThemedText>
            <ThemedText style={styles.text}>
              3. Press the "Stop Recording" button to stop and classify the
              chord.
            </ThemedText>
          </>
        );
      case "Major Chord":
        return (
          <>
            <ThemedText style={styles.text}>
              A major chord consists of three notes: the root, major third, and
              perfect fifth. Here are some key characteristics:
            </ThemedText>
            <ThemedText style={styles.listItem}>
              - The root note is the starting note of the chord.
            </ThemedText>
            <ThemedText style={styles.listItem}>
              - The major third is a note that is four semitones above the root
              note.
            </ThemedText>
            <ThemedText style={styles.listItem}>
              - The perfect fifth is a note that is seven semitones above the
              root note.
            </ThemedText>
            <ThemedText style={styles.listItem}>
              - Major chords sound happy, bright, and uplifting.
            </ThemedText>
            <ThemedText style={styles.text}>
              Example: C - E - G (C Major Chord). Here, C is the root, E is the
              major third, and G is the perfect fifth.
            </ThemedText>
          </>
        );
      case "Minor Chord":
        return (
          <>
            <ThemedText style={styles.text}>
              A minor chord consists of three notes: the root, minor third, and
              perfect fifth. Here are some key characteristics:
            </ThemedText>
            <ThemedText style={styles.listItem}>
              - The root note is the starting note of the chord.
            </ThemedText>
            <ThemedText style={styles.listItem}>
              - The minor third is a note that is three semitones above the root
              note.
            </ThemedText>
            <ThemedText style={styles.listItem}>
              - The perfect fifth is a note that is seven semitones above the
              root note.
            </ThemedText>
            <ThemedText style={styles.listItem}>
              - Minor chords sound sad, somber, and melancholic.
            </ThemedText>
            <ThemedText style={styles.text}>
              Example: C - E♭ - G (C Minor Chord). Here, C is the root, E♭ is
              the minor third, and G is the perfect fifth.
            </ThemedText>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <ThemedView style={styles.container}>{renderChordDetails()}</ThemedView>
  );
};

export default ChordDetails;
