// src/navigation/AppNavigator.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RootTabs from "./RootTabs";
import CreateMatchPage from "../pages/CreateMatchPage";

export type RootStackParamList = {
  Root: undefined;
  CreateMatch: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Root" component={RootTabs} />
        <Stack.Screen name="CreateMatch" component={CreateMatchPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
