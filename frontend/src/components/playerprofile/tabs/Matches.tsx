// components/playerprofile/tabs/Matches.tsx
import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";

type TeamSide = { name: string; score: string; logo: any };
type MatchRow = {
  id: string;
  title: string;
  subtitle: string;
  team1: TeamSide;
  team2: TeamSide;
  result: string;
  highlight: string;
};

const matches: MatchRow[] = [
  {
    id: "1",
    title: "DELHI VS MUMBAI",
    subtitle: "MEN’S T20 TRI – Series East India",
    team1: {
      name: "DHL",
      score: "120/5",
      logo: require("../../../assets/myteam/team1.png"),
    },
    team2: {
      name: "MUB",
      score: "122/4",
      logo: require("../../../assets/myteam/team2.png"),
    },
    result: "Mumbai won by 6 wickets",
    highlight: "Manoj Tiwari create: 99 runs, 8 Fours 4 Six (45 Balls)",
  },
  {
    id: "2",
    title: "DELHI VS CHENNAI",
    subtitle: "MEN’S T20 TRI – Series East India",
    team1: {
      name: "DHL",
      score: "178/6",
      logo: require("../../../assets/myteam/team1.png"),
    },
    team2: {
      name: "CSK",
      score: "165/8",
      logo: require("../../../assets/myteam/team2.png"),
    },
    result: "Delhi won by 13 runs",
    highlight: "Manoj Tiwari: 68 (32), 6x4, 4x6",
  },
];

export default function Matches() {
  const renderItem = ({ item }: { item: MatchRow }) => {
    // defensive guards (extra safety)
    const t1 = item.team1;
    const t2 = item.team2;

    return (
      <View style={styles.card}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>

        <View style={styles.row}>
          <View style={styles.team}>
            <Image source={t1.logo} style={styles.logo} />
            <Text style={styles.teamName}>{t1.name}</Text>
          </View>
          <Text style={styles.score}>{t1.score}</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.team}>
            <Image source={t2.logo} style={styles.logo} />
            <Text style={styles.teamName}>{t2.name}</Text>
          </View>
          <Text style={styles.score}>{t2.score}</Text>
        </View>

        <Text style={styles.result}>{item.result}</Text>
        <Text style={styles.highlight}>{item.highlight}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={matches}
      keyExtractor={(it) => it.id}
      contentContainerStyle={{ padding: 16 }}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  title: { fontWeight: "700", fontSize: 14, color: "#111" },
  subtitle: { color: "#9AA3AF", fontSize: 12, marginBottom: 8 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  team: { flexDirection: "row", alignItems: "center" },
  logo: { width: 24, height: 24, borderRadius: 12, marginRight: 6 },
  teamName: { fontWeight: "600", color: "#111" },
  score: { fontWeight: "700", color: "#333" },
  result: { color: "#1D8E4E", marginTop: 6, fontWeight: "600" },
  highlight: { color: "#666", marginTop: 4, fontSize: 12 },
});
