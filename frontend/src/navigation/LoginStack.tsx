// src/navigation/LoginStack.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginPage from "../pages/LoginPage";
import LoginDetailsPage from "../pages/LoginDetailsPage";
import RegistrationPage from "../pages/RegistrationPage";
import OnboardingPage from "../pages/OnboardingPage";

export type LoginStackParamList = {
  Login: undefined;
  LoginDetails: undefined;
  Registration: undefined;
  Onboarding: undefined;
};

const Stack = createNativeStackNavigator<LoginStackParamList>();

export default function LoginStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="LoginDetails" component={LoginDetailsPage} />
      <Stack.Screen name="Registration" component={RegistrationPage} /> 
       <Stack.Screen name="Onboarding" component={OnboardingPage} /> 
    </Stack.Navigator>
  );
}
