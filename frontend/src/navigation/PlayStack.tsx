// src/navigation/PlayStack.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// 🧩 Screens
import MatchPage from "../pages/MatchPage";
import CreateMatchPage from "../pages/CreateMatchPage";
import SetGameRulesPage from "../pages/SetGameRulesPage";
import FixTimingPage from "../pages/FixTimingPage";

// ✅ type-safe route names
export type PlayStackParamList = {
  MatchPage: undefined;
  CreateMatch: undefined;
  SetGameRules: undefined;
  FixTiming: undefined;
};

const Stack = createNativeStackNavigator<PlayStackParamList>();

export default function PlayStack() {
  return (
    <Stack.Navigator
      initialRouteName="MatchPage" // 👈 always start from MatchPage
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MatchPage" component={MatchPage} />
      <Stack.Screen name="CreateMatch" component={CreateMatchPage} />
      <Stack.Screen name="SetGameRules" component={SetGameRulesPage} />
      <Stack.Screen name="FixTiming" component={FixTimingPage} />
    </Stack.Navigator>
  );
}
