import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MyTeam from "../pages/MyTeam";
import CreateTeamPage from "../pages/CreateTeamPage";

export type TeamStackParamList = {
  MyTeam: undefined;
  CreateTeam: undefined; // 👈 CreateTeamPage route
};

const Stack = createNativeStackNavigator<TeamStackParamList>();

export default function TeamStack() {
  return (
    <Stack.Navigator initialRouteName="MyTeam" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyTeam" component={MyTeam} />
      <Stack.Screen name="CreateTeam" component={CreateTeamPage} />
    </Stack.Navigator>
  );
}
