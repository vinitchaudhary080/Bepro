import React from "react";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { TeamStackParamList } from "../navigation/TeamStack";

import MyTeamHero, { TeamTypeItem } from "../components/myteam/Hero";
import YourTeam, { TeamCardItem } from "../components/myteam/YourTeam";
import MatchesSection from "../components/myteam/MatchesSection";

export default function MyTeam() {
  const navigation = useNavigation<NativeStackNavigationProp<TeamStackParamList>>();

  const items: TeamTypeItem[] = [
    { id: "create", title: "", icon: require("../assets/myteam/create-badge.png"), isCreate: true },
    { id: 1, title: "T20 League", icon: require("../assets/myteam/pill.png") },
    { id: 2, title: "ODI Match", icon: require("../assets/myteam/cross.png") },
    { id: 3, title: "Test Series", icon: require("../assets/myteam/ribbon.png") },
  ];

  const yourTeamItems: TeamCardItem[] = [
    {
      id: "t1",
      title: "Dehli Knight Fighters",
      subtitle: "You are Captain on this team",
      image: require("../assets/myteam/sample-team-1.jpg"),
      onPress: () => console.log("Open team t1"),
    },
    {
      id: "t2",
      title: "Mumbai Strikers",
      subtitle: "You are Player on this team",
      image: require("../assets/myteam/sample-team-2.jpg"),
      onPress: () => console.log("Open team t2"),
    },
  ];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <MyTeamHero
        bgImage={require("../assets/myteam/hero-gradient.png")}
        items={items}
        onPressCreate={() => navigation.navigate("CreateTeam")} // 👈 Go to CreateTeamPage
        onPressItem={(it) => console.log("Type tapped:", it.title)}
      />

      <YourTeam items={yourTeamItems} />
      <MatchesSection />
    </ScrollView>
  );
}
