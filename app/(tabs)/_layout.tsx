import { Tabs } from "expo-router";
import React from "react";
import { Image } from "react-native";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { RouteProp } from "@react-navigation/native";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      {/* Chord Recognition */}
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: () => (
            <Image
              source={require("@/assets/images/ChordWiz_transparent-.png")}
              style={{ width: 150 }}
              resizeMode="contain"
            />
          ),
          tabBarIcon: (
            { focused }: { focused: boolean } // Explicitly type `focused`
          ) => (
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
          headerTitle: () => (
            <Image
              source={require("@/assets/images/ChordWiz_transparent-.png")}
              style={{ width: 150 }}
              resizeMode="contain"
            />
          ),
          tabBarIcon: (
            { focused }: { focused: boolean } // Explicitly type `focused`
          ) => (
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
