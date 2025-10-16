import React from "react";
import LoginDetails from "../components/login/LoginDetails";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "LoginDetails">;

const slides = [
  { image: require("../assets/login/character-1.png") },
  { image: require("../assets/login/character-2.png") },
  { image: require("../assets/login/character-3.png") },
];

export default function LoginDetailsPage({ navigation }: Props) {
  return (
    <LoginDetails
      slides={slides}
      accent="#E94A5A"
      onSubmit={(phone) => {
        // phone is guaranteed 10 digits per your component’s validation
        navigation.navigate("Onboarding");   // ⬅️ go to onboarding
      }}
      onTermsPress={() => navigation.navigate("Onboarding")} // (optional)
    />
  );
}
