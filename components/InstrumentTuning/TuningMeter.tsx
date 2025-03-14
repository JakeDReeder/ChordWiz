import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { Colors } from "@/constants/Colors";

const DEVIATION_BARS = [
  { threshold: 30, color: "#FF5252" }, // Red
  { threshold: 20, color: "#FF7B39" }, // Orange
  { threshold: 15, color: "#FFB039" }, // Light Orange
  { threshold: 10, color: "#FFE339" }, // Yellow
  { threshold: 5, color: "#B4FF39" }, // Light Green
  { threshold: 0, color: "#4CAF50" }, // Green
  { threshold: -5, color: "#B4FF39" }, // Light Green
  { threshold: -10, color: "#FFE339" }, // Yellow
  { threshold: -15, color: "#FFB039" }, // Light Orange
  { threshold: -20, color: "#FF7B39" }, // Orange
  { threshold: -30, color: "#FF5252" }, // Red
];

interface NoteInfo {
  note: string;
  cents: number;
}

const TuningMeter: React.FC<NoteInfo> = ({ cents }) => {
  return (
    <View style={styles.meterContainer}>
      {DEVIATION_BARS.map((bar, index) => (
        <Animated.View
          key={bar.threshold}
          style={[
            styles.bar,
            {
              backgroundColor: bar.color,
              opacity: Math.abs(cents - bar.threshold) < 5 ? 1 : 0.2,
              height: 80 - Math.abs(bar.threshold) * 2,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tuningIndicator: {
    width: "80%",
    height: 40,
    backgroundColor: "#E0E0E0",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 10,
  },
  indicator: {
    width: 20,
    height: "100%",
    borderRadius: 10,
    transform: [{ translateX: 0 }],
  },
  meterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    marginBottom: 20,
    width: "90%",
  },
  bar: {
    width: 5,
    marginHorizontal: 12,
    borderRadius: 2,
  },
});

export default TuningMeter;
