// pages/CurrentMatchDetailPage.tsx
import React, { useMemo, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Header from "../components/currentmatchdetail/Header";
import Result from "../components/currentmatchdetail/Result";
import TeamDetails from "../components/currentmatchdetail/TeamDetails";
import CurrentScore from "../components/currentmatchdetail/CurrentScore";
import ChipTabs, { TabKey } from "../components/common/ChipTabs";
import Live from "../components/currentmatchdetail/tabs/Live";
import Players from "../components/currentmatchdetail/tabs/Players";
import Statistics from "../components/currentmatchdetail/tabs/Statistics";
import PastMatches from "../components/currentmatchdetail/tabs/PastMatches";

const TABS: TabKey[] = ["Live", "Players", "Statistics", "Past Matches"];

export default function CurrentMatchDetailPage() {
  const [tab, setTab] = useState<TabKey>("Live");

  // 👉 yahan real data aayega; abhi mock for layout
  const match = useMemo(
    () => ({
      id: "M-001",
      title: "DHL  vs  MUM",
      subtitle: "Unofficial Test, Gate 1 • June 10, 2025 • Mumbai Lions tour of Kolkata",
      team1: { code: "DHL", score: "120/5", overs: "18.2", logo: require("../assets/teams/dhl.png") },
      team2: { code: "MUB", score: "122/4", overs: "19.0", logo: require("../assets/teams/mum.png") },
      resultNote: "Day 2 • DHL Lions lead by 169 runs.",
      rr: { cur: 5.40, minOv: "—", rem: 7.4, last10: "6.8", rrPair: "5.8/2 (6.80)" },
    }),
    []
  );

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Header title={match.title} subtitle={match.subtitle} />
        <Result
          t1={{ name: match.team1.code, score: match.team1.score, logo: match.team1.logo }}
          t2={{ name: match.team2.code, score: match.team2.score, logo: match.team2.logo }}
          note={match.resultNote}
        />
        <CurrentScore rr={match.rr} />
        <TeamDetails t1={match.team1} t2={match.team2} />

        <ChipTabs tabs={TABS} active={tab} onChange={setTab} style={{ marginTop: 12 }} />

        {tab === "Live" && <Live />}
        {tab === "Players" && <Players teamA="DHL" teamB="MUB" />}
        {tab === "Statistics" && <Statistics />}
        {tab === "Past Matches" && <PastMatches teamA="DHL" teamB="MUB" />}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F7F8FC" },
  scroll: { padding: 16, paddingBottom: 40 },
});
