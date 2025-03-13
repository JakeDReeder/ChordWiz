import { Stack } from "expo-router";
import React from "react";
import { Image, StyleSheet } from "react-native";

import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const logo = "@/assets/images/ChordWiz_transparent.png";

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => (
            <Image
              source={require(logo)}
              style={{ width: 150 }}
              resizeMode="contain"
            />
          ),
          headerTitleAlign: "left",
          headerStyle: { backgroundColor: "#252525" },
        }}
      />
    </Stack>
  );
}
