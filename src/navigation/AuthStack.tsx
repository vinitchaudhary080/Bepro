import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "../pages/LoginPage";
import LoginDetailsPage from "../pages/LoginDetailsPage";
import OnboardingPage from "../pages/OnboardingPage";
import HomePage from "../pages/HomePage"; 
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="LoginDetails" component={LoginDetailsPage} />
      <Stack.Screen name="Onboarding" component={OnboardingPage} />
      <Stack.Screen name="Home" component={HomePage} /> 
    </Stack.Navigator>
  );
}
