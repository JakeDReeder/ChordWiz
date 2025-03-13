import { Stack } from "expo-router";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

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
            <View style={styles.logoContainer}>
              <Image source={require(logo)} style={styles.logo} />
            </View>
          ),
          headerTitleAlign: "left",
          headerStyle: { backgroundColor: "#252525" },
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: "100%",
    resizeMode: "contain",
  },
});
