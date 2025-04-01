import { Tabs } from "expo-router";
import React from "react";
import { Image } from "react-native";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { requestPermissions } from "@/constants/requestPermissions";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  requestPermissions();

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
          lazy: true,
          headerTitle: () => (
            <Image
              source={require("@/assets/images/ChordWiz_transparent.png")}
              style={{ width: 150 }}
              resizeMode="contain"
            />
          ),
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? "light"].secondary,
          },
          tabBarStyle: {
            backgroundColor: Colors[colorScheme ?? "light"].secondary,
          },
          tabBarIcon: ({ focused }: { focused: boolean }) => (
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
          lazy: true,
          headerTitle: () => (
            <Image
              source={require("@/assets/images/ChordWiz_transparent.png")}
              style={{ width: 150 }}
              resizeMode="contain"
            />
          ),
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? "light"].secondary,
          },
          tabBarStyle: {
            backgroundColor: Colors[colorScheme ?? "light"].secondary,
          },
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
