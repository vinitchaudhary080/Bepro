import React from "react";
import { ScrollView } from "react-native";
import UpcomingMatchHero from "../components/match/UpcomingMatch";
import FloatingButton from "../components/match/FloatingButton";

export default function MatchPage() {
  const left = {
    name: "DELHI",
    score: "155 - 8",
    ov: "18.5 ov",
    avatar: require("../assets/myteam/team1.png"),
  };
  const right = {
    name: "MUMBAI",
    score: "00 - 0",
    ov: "0.0 ov",
    avatar: require("../assets/myteam/team2.png"),
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 24 }}>
      <UpcomingMatchHero
        bg={require("../assets/match/hero-bg.png")}
        left={left}
        right={right}
        status="DELHI is playing their inning"
        meta="T20 | Match"
      />

       {/* ✅ Floating button */}
      <FloatingButton onPress={() => console.log("Create Match Pressed")} />
    </ScrollView>
  );
}
