import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// 📄 Pages import
import HomePage from "../pages/HomePage";
import NotificationPanel from "../pages/NotificationPanelPage";
import PlayerProfilePage from "../pages/PlayerProfilePage";
import CurrentMatchDetailPage from "../pages/CurrentMatchDetailPage"; // ✅ yahi missing tha!

export type HomeStackParamList = {
  Home: undefined;
  NotificationPanel: undefined;
  PlayerProfilePage: { playerId: number };
  CurrentMatchDetail: { matchId?: string }; // ✅ navigation param for match detail
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      {/* 🏠 Main Home Screen */}
      <Stack.Screen name="Home" component={HomePage} />

      {/* 🔔 Notifications Panel */}
      <Stack.Screen name="NotificationPanel" component={NotificationPanel} />

      {/* 👤 Player Profile */}
      <Stack.Screen name="PlayerProfilePage" component={PlayerProfilePage} />

      {/* 🏏 Current Match Detail Page */}
      <Stack.Screen
        name="CurrentMatchDetail"
        component={CurrentMatchDetailPage}
      />
    </Stack.Navigator>
  );
}
