/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#fff";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    primary: "#22437d",
    secondary: "#42829d",
    text: "#11181C",
    background3: "#EDEFF4",
    background2: "#fff",
    background: "#E2E7EE",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    primary: "#80ffdb",
    secondary: "#131213",
    text: "#ECEDEE",
    background: "#151718",
    background2: "#3C495A",
    background3: "#262B31",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};
