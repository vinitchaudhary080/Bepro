// pages/HomePage.tsx
import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Hero from "../components/home/Hero";
import TopPlayers, { PlayerItem } from "../components/home/TopPlayers";
import TasksSection from "../components/home/Tasks";
import OneOnOne, { OneOnOneItem } from "../components/home/OneOnOne";
import UpcomingFixtures, { FixtureHero, FixtureInfo } from "../components/home/UpcomingFixtures";
import LatestResults, { MatchItem } from "../components/home/LatestResults";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "../navigation/HomeStack";
import { colors } from "../theme/colors";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const players: PlayerItem[] = [
    { id: 1, name: "Rahul Joshi", role: "Captain of team", image: require("../assets/players/p1.jpg") },
    { id: 2, name: "Varun Kumar", role: "Player of team", image: require("../assets/players/p2.jpg") },
    { id: 3, name: "Manish Yadav", role: "Captain of team", image: require("../assets/players/p3.jpg") },
  ];

  const oneOnOneData: OneOnOneItem[] = [
    { id: 1, title: "Quick Match", icon: require("../assets/oneonone/quick.png") },
    { id: 2, title: "Search", icon: require("../assets/oneonone/search.png") },
    { id: 3, title: "Challenge", icon: require("../assets/oneonone/challenge.png") },
    { id: 4, title: "Triangular Series", icon: require("../assets/oneonone/triangular.png") },
    { id: 5, title: "Tournaments", icon: require("../assets/oneonone/tournaments.png") },
    { id: 6, title: "Series", icon: require("../assets/oneonone/series.png") },
  ];

  const heroData: FixtureHero = {
    bg: require("../assets/fixtures/stadium.jpg"),
    left: { name: "DELHI", score: "155 - 8", ov: "18.5 ov", avatar: require("../assets/fixtures/delhi.png") },
    right: { name: "Mumbai", score: "00 - 0", ov: "00.0 ov", avatar: require("../assets/fixtures/mumbai.png") },
    status: "DHL is playing their inning",
    meta: "T20 | Match",
  };

  const infoCards: FixtureInfo[] = [
    {
      thumb: require("../assets/fixtures/mum_thumb.png"),
      title: "MUM vs DHL",
      venue: "T20 | Cricko International Stadium",
      players: [
        require("../assets/fixtures/p1.jpg"),
        require("../assets/fixtures/p2.jpg"),
        require("../assets/fixtures/p3.jpg"),
        require("../assets/fixtures/p4.jpg"),
        require("../assets/fixtures/p5.jpg"),
        require("../assets/fixtures/p6.jpg"),
      ],
      captains: [require("../assets/fixtures/c1.jpg"), require("../assets/fixtures/c2.jpg")],
      metaIcon: require("../assets/icons/ball.png"),
      metaText: "6 Over | Leather Ball",
    },
  ];

  // ✅ Latest Results restored
  const results: MatchItem[] = [
    {
      id: "r1",
      title: "DELHI vs MUMBAI",
      subtitle: "Men’s T20 • Tri-Series East India",
      team1: { name: "DELHI", score: "155/8", logo: require("../assets/fixtures/delhi.png") },
      team2: { name: "MUMBAI", score: "156/6", logo: require("../assets/fixtures/mumbai.png") },
      result: "Mumbai won by 4 wickets",
      resultText: "Mumbai won by 4 wickets",
      highlight: "R. Sharma 77(45) • R. Jaisal 3/22",
      time: "Yesterday",
    },
    {
      id: "r2",
      title: "MUMBAI vs DELHI",
      subtitle: "Men’s T20 • Friendly",
      team1: { name: "MUMBAI", score: "142/7", logo: require("../assets/fixtures/mumbai.png") },
      team2: { name: "DELHI", score: "139/9", logo: require("../assets/fixtures/delhi.png") },
      result: "Mumbai won by 3 runs",
      resultText: "Mumbai won by 3 runs",
      highlight: "K. Bhowmick 41(28) • Ravi Dev 2/19",
      time: "2d ago",
    },
    {
      id: "r3",
      title: "DELHI vs MUMBAI",
      subtitle: "Men’s T20 • League",
      team1: { name: "DELHI", score: "171/5", logo: require("../assets/fixtures/delhi.png") },
      team2: { name: "MUMBAI", score: "164/9", logo: require("../assets/fixtures/mumbai.png") },
      result: "Delhi won by 7 runs",
      resultText: "Delhi won by 7 runs",
      highlight: "Tom Reo 24(11) • Sagar Tiw 1/18",
      time: "3d ago",
    },
    {
      id: "r4",
      title: "MUMBAI vs DELHI",
      subtitle: "Men’s T20 • Night Match",
      team1: { name: "MUMBAI", score: "188/4", logo: require("../assets/fixtures/mumbai.png") },
      team2: { name: "DELHI", score: "171/8", logo: require("../assets/fixtures/delhi.png") },
      result: "Mumbai won by 17 runs",
      resultText: "Mumbai won by 17 runs",
      highlight: "R. Jaisal 3/22 • R. Sharma 62(38)",
      time: "Last week",
    },
    {
      id: "r5",
      title: "DELHI vs MUMBAI",
      subtitle: "Men’s T20 • Day Match",
      team1: { name: "DELHI", score: "129/10", logo: require("../assets/fixtures/delhi.png") },
      team2: { name: "MUMBAI", score: "130/5", logo: require("../assets/fixtures/mumbai.png") },
      result: "Mumbai won by 5 wickets",
      resultText: "Mumbai won by 5 wickets",
      highlight: "K. Bhowmick 3 dismissals • Ravi Dev 136 km/h",
      time: "Last week",
    },
  ];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingBottom: 24 }}
      keyboardShouldPersistTaps="handled"
    >
      {/* HERO SECTION */}
      <Hero
        bgImage={require("../assets/home/hero-bg.png")}
        secondaryBg={require("../assets/home/hero-b.png")}
        searchIcon={require("../assets/icons/search.png")}
        bellIcon={require("../assets/icons/bell.png")}
        coinIcon={require("../assets/icons/coin.png")}
        name="Rahul"
        walletAmount="5000"
        searchValue={query}
        onChangeSearch={setQuery}
        onPressBell={() => navigation.navigate("NotificationPanel")}
        onPressWallet={() => navigation.getParent()?.navigate("Profile", { screen: "Wallet" })}
        containerPaddingTop={66}
      />

      {/* TOP PLAYERS */}
      <View style={styles.section}>
        <TopPlayers
          title="Top Players"
          data={players}
          onPressItem={(it) => navigation.navigate("PlayerProfilePage", { playerId: it.id })}
        />
      </View>

      {/* TASKS */}
      <View style={styles.section}>
        <TasksSection />
      </View>

      {/* ONE-ON-ONE */}
      <View style={{ paddingTop: 16 }}>
        <OneOnOne data={oneOnOneData} onPressItem={(it) => console.log("go to", it.title)} />
      </View>

      {/* UPCOMING FIXTURES */}
      <View style={{ paddingTop: 16 }}>
        <UpcomingFixtures
          title="Upcoming Match Fixtures"
          hero={heroData}
          infoCards={infoCards}
          onPressToss={() =>
            navigation.getParent()?.navigate("Profile", { screen: "TossPage" })
          }
          onPressCard={(card) =>
            navigation.navigate("CurrentMatchDetail", { matchId: `fix-${card.title}` })
          }
        />
      </View>

      {/* LATEST RESULTS */}
      <View style={{ paddingTop: 16 }}>
        <LatestResults
          title="Latest Results"
          data={results}
          onPressShowMore={() => console.log("Show more results")}
          onPressItem={(m) => console.log("open match", m.id)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  section: { paddingTop: 16 },
});
