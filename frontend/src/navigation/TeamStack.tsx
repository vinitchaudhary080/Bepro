import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MyTeam from "../pages/MyTeam";
import CreateTeamPage from "../pages/CreateTeamPage";
import CreateTeamDetailPage from "../pages/CreateTeamDetailPage";
import MyTeamDetailPage from "../pages/MyTeamDetailPage";


export type TeamStackParamList = {
  MyTeam: undefined;
  CreateTeam: undefined; 
  CreateTeamDetail: undefined;  
MyTeamDetail: { teamId: string; teamName: string }; // 👈 new
};

const Stack = createNativeStackNavigator<TeamStackParamList>();

export default function TeamStack() {
  return (
    <Stack.Navigator initialRouteName="MyTeam" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyTeam" component={MyTeam} />
      <Stack.Screen name="CreateTeam" component={CreateTeamPage} />
      <Stack.Screen name="CreateTeamDetail" component={CreateTeamDetailPage} /> 
      <Stack.Screen name="MyTeamDetail" component={MyTeamDetailPage} />
      <Stack.Screen
        name="CreateTeamPage"
        component={CreateTeamPage}
        options={{ title: "Create Team" }}
      />
    </Stack.Navigator>
  );
}
