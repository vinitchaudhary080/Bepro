// src/components/myteam/MatchesSection.tsx
import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Platform,
} from "react-native";
import { fonts } from "../../theme/type";

const H_PADDING = 16;
const CARD_RADIUS = 16;
const CARD_GAP = 12;

// 🎯 Mock data per tab
const allMatches = {
  "Quick Match": [
    {
      id: "1",
      title: "DELHI VS MUMBAI",
      subtitle: "MEN’S T20 TRI – Series East India",
      team1: { name: "DHL", score: "120/5", logo: require("../../assets/myteam/team1.png") },
      team2: { name: "MUB", score: "122/4", logo: require("../../assets/myteam/team2.png") },
      result: "Mumbai won by 6 wickets",
      highlight: "Manoj Tiwari: 99 runs, 8 Fours, 4 Six (45 Balls)",
    },
    {
      id: "2",
      title: "DELHI VS CHENNAI",
      subtitle: "MEN’S T20 TRI – Series East India",
      team1: { name: "DEL", score: "165/6", logo: require("../../assets/myteam/team1.png") },
      team2: { name: "CHE", score: "158/9", logo: require("../../assets/myteam/team2.png") },
      result: "Delhi won by 7 runs",
      highlight: "Rohit Sharma: 72 runs, 6 Fours, 3 Six (50 Balls)",
    },
  ],
  Tournaments: [
    {
      id: "3",
      title: "KOLKATA VS PUNJAB",
      subtitle: "IPL 2024 - Match 18",
      team1: { name: "KOL", score: "178/7", logo: require("../../assets/myteam/team1.png") },
      team2: { name: "PUN", score: "180/6", logo: require("../../assets/myteam/team2.png") },
      result: "Punjab won by 4 wickets",
      highlight: "Shubman Gill: 88 runs (60 Balls)",
    },
  ],
  Series: [
    {
      id: "4",
      title: "INDIA VS AUSTRALIA",
      subtitle: "BORDER-GAVASKAR TROPHY",
      team1: { name: "IND", score: "550/8d", logo: require("../../assets/myteam/team1.png") },
      team2: { name: "AUS", score: "320 & 220", logo: require("../../assets/myteam/team2.png") },
      result: "India won by an innings and 10 runs",
      highlight: "Ashwin: 10 wickets in match",
    },
  ],
  "Match Stats": [
    {
      id: "5",
      title: "DELHI VS MUMBAI",
      subtitle: "Performance Breakdown",
      team1: { name: "DHL", score: "120/5", logo: require("../../assets/myteam/team1.png") },
      team2: { name: "MUB", score: "122/4", logo: require("../../assets/myteam/team2.png") },
      result: "Strike Rate: 145.5 • Avg 52.0",
      highlight: "Best Player: Manoj Tiwari",
    },
  ],
} as const;

export default function MatchesSection() {
  const [tab, setTab] = useState<keyof typeof allMatches>("Quick Match");
  const tabs = Object.keys(allMatches) as (keyof typeof allMatches)[];
  const list = useMemo(() => allMatches[tab] || [], [tab]);

  return (
    <View style={styles.wrap}>
      {/* Heading row */}
      <View style={styles.headerRow}>
        <Text style={styles.heading}>Matches Played by This Team</Text>
        <Pressable>
          <Text style={styles.showMore}>Show More</Text>
        </Pressable>
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        {tabs.map((t) => {
          const active = tab === t;
          return (
            <Pressable
              key={t}
              onPress={() => setTab(t)}
              style={[
                styles.tabBase,
                active ? styles.tabActive : styles.tabInactive,
              ]}
            >
              <Text
                style={[
                  styles.tabTextBase,
                  active ? styles.tabTextActive : styles.tabTextInactive,
                ]}
              >
                {t}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Static list (no FlatList) to avoid nested VirtualizedList warning */}
      <View style={{ paddingHorizontal: H_PADDING, paddingBottom: 24 }}>
        {list.map((item: any, idx: number) => (
          <View
            key={item.id}
            style={{ marginBottom: idx === list.length - 1 ? 0 : CARD_GAP }}
          >
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.matchTitle}>{item.title}</Text>
                <Text style={styles.matchSubtitle}>{item.subtitle}</Text>
              </View>

              <View style={styles.teamRow}>
                <View style={styles.teamLeft}>
                  <Image source={item.team1.logo} style={styles.logo} />
                  <Text style={styles.teamName}>{item.team1.name}</Text>
                </View>
                <Text style={styles.score}>{item.team1.score}</Text>
              </View>

              <View style={styles.separator} />

              <View style={styles.teamRow}>
                <View style={styles.teamLeft}>
                  <Image source={item.team2.logo} style={styles.logo} />
                  <Text style={styles.teamName}>{item.team2.name}</Text>
                </View>
                <Text style={styles.score}>{item.team2.score}</Text>
              </View>

              <Text style={styles.resultText}>{item.result}</Text>
              <Text style={styles.highlight}>{item.highlight}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

/* ---------------- styles ---------------- */
const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: "#fff" },
  headerRow: {
    paddingHorizontal: H_PADDING,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    marginTop: 24,
  },
  heading: {
    fontSize: 22,
    color: "#0E1628",
    fontFamily: fonts.semibold,
  },
  showMore: {
    fontSize: 12,
    color: "#9AA6C0",
    fontFamily: fonts.semibold,
  },

  /* Tabs */
  tabsRow: {
    paddingHorizontal: H_PADDING,
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
    paddingTop: 12,
  },
  tabBase: {
    minHeight: 34,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabInactive: {
    backgroundColor: "#F3F5F8",
    borderColor: "#E2E7EE",
  },
  tabActive: {
    backgroundColor: "#FFE7EC",
    borderColor: "#FF3A57",
    shadowColor: "#FF3A57",
    shadowOpacity: Platform.select({ ios: 0.12, android: 0 }),
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  tabTextBase: { fontSize: 13, fontFamily: fonts.semibold },
  tabTextInactive: { color: "#6677A1" },
  tabTextActive: { color: "#FF3A57" },

  /* Cards */
  card: {
    borderRadius: CARD_RADIUS,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
      },
      android: { elevation: 2 },
    }),
  },
  cardHeader: { marginBottom: 6 },
  matchTitle: {
    fontSize: 13,
    color: "#1D2B48",
    fontFamily: fonts.semibold,
  },
  matchSubtitle: {
    fontSize: 11,
    color: "#9AA6C0",
    fontFamily: fonts.semibold,
  },

  teamRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  teamLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  logo: { width: 30, height: 30, borderRadius: 15 },
  teamName: {
    fontSize: 14,
    color: "#1D2B48",
    fontFamily: fonts.semibold,
  },
  score: {
    fontSize: 15,
    color: "#1D2B48",
    fontFamily: fonts.semibold,
  },
  separator: {
    height: 1,
    backgroundColor: "#EEF2F7",
    marginVertical: 2,
  },
  resultText: {
    marginTop: 8,
    fontSize: 12,
    color: "#1D2B48",
    fontFamily: fonts.semibold,
  },
  highlight: {
    fontSize: 12,
    color: "#6A748F",
    marginTop: 4,
    fontFamily: fonts.medium,
  },
});
