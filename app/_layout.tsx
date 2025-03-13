import { Tabs } from "expo-router";
import React from "react";
import { Image } from "react-native";
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
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: () => (
            <Image
              source={require("@/assets/images/ChordWiz_transparent.png")}
              style={{ width: 150 }}
              resizeMode="contain"
            />
          ),
          headerStyle: { backgroundColor: "#252525" },
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={"white"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
