// navigation/HomeStack.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type HomeStackParamList = {
  Home: undefined;
  NotificationPanel: undefined;
  // Only one canonical route for player profile:
  PlayerProfilePage: { playerId: number } | undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Home"
        getComponent={() => require("../pages/HomePage").default}
      />
      <Stack.Screen
        name="NotificationPanel"
        getComponent={() => require("../pages/NotificationPanelPage").default}
      />
      <Stack.Screen
        name="PlayerProfilePage"
        getComponent={() => require("../pages/PlayerProfilePage").default}
      />
    </Stack.Navigator>
  );
}
