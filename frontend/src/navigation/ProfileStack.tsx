// navigation/ProfileStack.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


export type ProfileStackParamList = {
  ProfileHome: undefined;
  ProfileDetail: undefined;
  EditProfile: undefined;
  Wallet: undefined;
  DailyTask: undefined;
  Permission: undefined;
  TeamSetting: undefined; 
  Notifications: undefined; 
  Faqs: undefined;
  AboutApp: undefined;
  LoginDetails: undefined;
  Onboarding: undefined;
  TossPage: undefined;  // ✅ NEW
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ProfileHome"
        getComponent={() => require("../pages/ProfilePage").default}
      />
      <Stack.Screen
        name="ProfileDetail"
        getComponent={() => require("../pages/ProfileDetailPage").default}
      />
      <Stack.Screen
        name="EditProfile"
        getComponent={() => require("../pages/EditProfilePage").default}
      />
      <Stack.Screen
        name="Wallet"
        getComponent={() => require("../pages/WalletPage").default}
      />
      <Stack.Screen
        name="DailyTask"
        getComponent={() => require("../pages/DailyTaskPage").default}
      />
      <Stack.Screen
        name="Permission"
        getComponent={() => require("../pages/PermissionPage").default}
      />
      <Stack.Screen
        name="TeamSetting" // ✅ register TeamSetting page
        getComponent={() => require("../pages/TeamSettingPage").default}
      />
      <Stack.Screen
  name="Notifications"
  getComponent={() => require("../pages/NotificationPage").default}
/>
       <Stack.Screen
  name="Faqs"
  getComponent={() => require("../pages/FAQPage").default}
/>

   <Stack.Screen
  name="AboutApp"
  getComponent={() => require("../pages/AboutAppPage").default}
/>

<Stack.Screen
  name="TossPage"
  getComponent={() => require("../pages/TossPage").default}
  options={{ headerShown: false }}
/>


 <Stack.Screen
        name="LoginDetails"
        getComponent={() => require("../pages/LoginDetailsPage").default}
      />

      <Stack.Screen name="Onboarding"   getComponent={() => require("../pages/OnboardingPage").default} />

    </Stack.Navigator>
  );
}
