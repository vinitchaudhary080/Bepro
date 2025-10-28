// App.tsx
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { View, Text as RNText } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AuthStack from "./src/navigation/AuthStack";
import { colors } from "./src/theme/colors";

export default function App() {
  const [loaded] = useFonts({
    "SFProRounded-Regular": require("./src/assets/fonts/SFProRounded-Regular.otf"),
    "SFProRounded-Medium": require("./src/assets/fonts/SFProRounded-Medium.otf"),
    "SFProRounded-Semibold": require("./src/assets/fonts/SFProRounded-Semibold.otf"),
    "SFProRounded-Bold": require("./src/assets/fonts/SFProRounded-Bold.otf"),
  });
  if (!loaded) return <View />;

  if (!RNText.defaultProps) RNText.defaultProps = {};
  RNText.defaultProps.style = [
    RNText.defaultProps.style,
    { fontFamily: "SFProRounded-Regular" },
  ];
  RNText.defaultProps.allowFontScaling = false;

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.bg,
      card: colors.bg,
      text: colors.text,
      border: colors.border,
      primary: colors.brand,
    },
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navTheme}>
        <StatusBar style="dark" />
        <AuthStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
