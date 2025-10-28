import React from "react";
import { ScrollView } from "react-native";
import CreateMatchHero from "../components/creatematch/Hero";

import RecommendedTeams, { TeamItem } from "../components/creatematch/RecommendedTeams";
import NextButton from "../components/creatematch/NextButton";

export default function CreateMatchPage() {
  const teams: TeamItem[] = [
    {
      id: "1",
      name: "Dehli Knight Fighters",
      roleLine: "You are Captain on this team",
      image: require("../assets/teams/delhi-knight.png"), // 👈 replace with your image
    },
    {
      id: "2",
      name: "Mumbai Blasters",
      roleLine: "You are Player on this team",
      image: require("../assets/teams/mumbai-blasters.png"),
    },
    {
      id: "3",
      name: "Chennai Kings",
      roleLine: "You are Captain on this team",
      image: require("../assets/teams/chennai-kings.png"),
    },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }} contentContainerStyle={{ paddingBottom: 500 }}>
      <CreateMatchHero />
      
      <RecommendedTeams
        data={teams}
        initialSelectedId="1"
        onChange={(t) => console.log("Selected team:", t)}
      />
      {/* ✅ Bottom Floating Button */}
      <NextButton onPress={() => console.log("Next pressed")} />
    </ScrollView>
  );
}
