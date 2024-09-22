import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      {/* Chord Recoginition */}
      <Tabs.Screen
        name="index"
        options={{
          title: "ChordWiz",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={"white"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tuning"
        options={{
          title: "Tuner",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "musical-note" : "musical-note-outline"}
              color={"white"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
