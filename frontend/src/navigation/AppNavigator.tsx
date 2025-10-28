// src/navigation/AppNavigator.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthStack from "./AuthStack";
import RootTabs from "./RootTabs";           // <-- your bottom tabs component
import CreateMatchPage from "../pages/CreateMatchPage";

import type { RootStackParamList } from "./types";

const Root = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
   <Root.Navigator screenOptions={{ headerShown: false }} initialRouteName="Auth">
  <Root.Screen name="Auth" component={AuthStack} />
  <Root.Screen name="MainTabs" component={RootTabs} />   // 👈 ye line hogi
  <Root.Screen name="CreateMatch" component={CreateMatchPage} />
</Root.Navigator>

  );
}
