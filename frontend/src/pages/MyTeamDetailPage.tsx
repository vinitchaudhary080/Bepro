// pages/MyTeamDetailPage.tsx
import React from "react";
import { ScrollView, View, StyleSheet, StatusBar } from "react-native";
import Hero from "../components/myteamdetail/Hero";
import Heading from "../components/myteamdetail/Heading";
import PlayersList from "../components/myteamdetail/PlayersList";
import BestPerfor from "../components/myteamdetail/BestPerfor";
import Awards from "../components/myteamdetail/Awards";
import News from "../components/myteamdetail/News";
import { RouteProp, useRoute } from "@react-navigation/native";
import type { TeamStackParamList } from "../navigation/TeamStack";

const COVER = require("../assets/myteamdetail/cover.jpg");

export default function MyTeamDetailPage() {
  // ✅ Params + safe fallback
  const route = useRoute<RouteProp<TeamStackParamList, "MyTeamDetail">>();
  const defaultTeamName = "Delhi Knight Fighters";
  const { teamId, teamName: paramTeamName } =
    (route.params as { teamId?: string; teamName?: string }) ?? {};
  const teamName = paramTeamName ?? defaultTeamName;

  const players = [
    {
      id: "p1",
      name: "Rohal Sharma",
      role: "Opener • RHB",
      image: require("../assets/players/p1.jpg"),
      stat: "Strike Rate 147",
      tag: "Runs 77 • 7x4 • 3x6",
    },
    {
      id: "p2",
      name: "Rahul Jaisal",
      role: "All-rounder",
      image: require("../assets/players/p2.jpg"),
      stat: "Economy 6.1",
      tag: "3/22 • 4 overs",
    },
    {
      id: "p3",
      name: "Ketan Bhowmick",
      role: "WK-Batsman",
      image: require("../assets/players/p3.jpg"),
      stat: "Dismissals 3",
      tag: "41(28) • 5×4",
    },
    {
      id: "p4",
      name: "Ravi Dev",
      role: "Seam Bowler",
      image: require("../assets/players/p4.jpg"),
      stat: "Speed 136 km/h",
      tag: "2/19 • 4 overs",
    },
    {
      id: "p5",
      name: "Sagar Tiw",
      role: "Spinner",
      image: require("../assets/players/p5.jpg"),
      stat: "Dot% 58",
      tag: "1/18 • 4 overs",
    },
    {
      id: "p6",
      name: "Tom Reo",
      role: "Finisher • RHB",
      image: require("../assets/players/p6.jpg"),
      stat: "Finisher",
      tag: "24(11) • 2x6",
    },
  ];

  const topPerformers = [
    {
      id: "tp1",
      name: "Rohal Sharma",
      image: require("../assets/players/p1.jpg"),
      label: "Game Impact",
      percent: 68,
      sub: "SR 147 • Avg 41",
    },
    {
      id: "tp2",
      name: "Rahul Jaisal",
      image: require("../assets/players/p2.jpg"),
      label: "Bowling Impact",
      percent: 61,
      sub: "3/22 • Econ 6.1",
    },
  ];

  const awards = [
    {
      id: "a1",
      name: "Rohal Javis",
      image: require("../assets/players/p1.jpg"),
      award: "Player of the Match",
    },
    {
      id: "a2",
      name: "Rahul Jaisal",
      image: require("../assets/players/p2.jpg"),
      award: "Best Bowler",
    },
    {
      id: "a3",
      name: "Rohal Javis",
      image: require("../assets/players/p1.jpg"),
      award: "Most Fours",
    },
  ];

  const news = [
    {
      id: "n1",
      image: require("../assets/myteamdetail/news1.jpg"),
      title:
        "Rohit Sharma: 'Proud of the way the team came back & grabbed opportunities'",
      time: "Just now",
      excerpt:
        "A solid comeback, smart use of powerplay, aur field placements on point...",
    },
    {
      id: "n2",
      image: require("../assets/myteamdetail/news2.jpg"),
      title:
        "Vossi’s ex-intl. coach Arthur set to be Naveen’s new bowling coach",
      time: "10 min ago",
      excerpt: "New bowling plans likely to improve death-over execution...",
    },
  ];

  return (
    <View style={styles.root}>
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 28 }}
        showsVerticalScrollIndicator={false}
      >
        <Hero cover={COVER} teamName={teamName} />
        <View style={styles.body}>
          <Heading />
          <PlayersList players={players} />
          <BestPerfor items={topPerformers} />
          <Awards items={awards} />
          <News items={news} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F6F7FB" },
  body: { paddingHorizontal: 16, gap: 16, marginTop: 12 },
});
