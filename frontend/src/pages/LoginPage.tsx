import React from "react";
import Login, { LoginSlide } from "../components/login/Login";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const slides: LoginSlide[] = [
  { image: require("../assets/login/slide-1.png"), title: "lorem Ipsum donor dummy",
    description: "Lorem ipsum dolor sit amet consectetur. Enim varius pharetra ac ut in arcu. Quisque nibh a porttitor aliquam." },
  { image: require("../assets/login/slide-2.png"), title: "Track live matches",
    description: "Get ball-by-ball events, quick summaries and highlights." },
  { image: require("../assets/login/slide-3.png"), title: "Build your team",
    description: "Create squads, manage players and share invites easily." },
];

export default function LoginPage({ navigation }: Props) {
  return (
    <Login
      slides={slides}
      accent="#E94A5A"
      onContinue={() => navigation.navigate("LoginDetails")}
    />
  );
}
