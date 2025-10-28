// src/pages/LoginDetailsPage.tsx
import React from "react";
import { Alert } from "react-native";
import LoginDetails from "../components/login/LoginDetails";
import { useNavigation, StackActions } from "@react-navigation/native";

const slides = [
  { image: require("../assets/login/character-1.png") },
  { image: require("../assets/login/character-2.png") },
  { image: require("../assets/login/character-3.png") },
];

export default function LoginDetailsPage() {
  const navigation = useNavigation<any>();

  const handleLoginPress = () => {
    try {
      // 👇 Login success → go to RootTabs (Home)
      let nav: any = navigation;
      while (nav?.getParent && nav.getParent()) nav = nav.getParent();
      nav.dispatch(StackActions.replace("RootTabs"));
    } catch (e) {
      Alert.alert("Navigation Error", "Unable to open Home");
    }
  };

  const handleRegisterPress = () => {
    // 👇 simple push to RegistrationPage
    navigation.navigate("Registration");
  };

  return (
    <LoginDetails
      slides={slides}
      accent="#E94A5A"
      onLoginSuccess={handleLoginPress}
      onPressRegister={handleRegisterPress} // 👈 NEW
    />
  );
}
