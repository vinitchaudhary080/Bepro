// src/navigation/AuthStack.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginStack from "./LoginStack";
import RootTabs from "./RootTabs";

export type AuthStackParamList = {
  Auth: undefined;      // Login stack (Login → LoginDetails)
  RootTabs: undefined;  // Main app tabs (Home, Team, Play, Rankings, Profile)
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={LoginStack} />
      <Stack.Screen name="RootTabs" component={RootTabs} />
    </Stack.Navigator>
  );
}
