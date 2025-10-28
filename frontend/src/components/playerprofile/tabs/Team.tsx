import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";

const teams = [
  {
    id: "1",
    name: "Mumbai Fighters",
    role: "Member",
    players: 15,
    wins: 5,
    logo: require("../../../assets/myteam/team1.png"),
  },
];

export default function Team() {
  return (
    <FlatList
      data={teams}
      keyExtractor={(i) => i.id}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.row}>
            <Image source={item.logo} style={styles.logo} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.sub}>{item.role}</Text>
              <Text style={styles.sub}>{item.players} Players</Text>
              <Text style={styles.sub}>Winning Match: {item.wins}</Text>
            </View>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  row: { flexDirection: "row", alignItems: "center" },
  logo: { width: 44, height: 44, borderRadius: 22, marginRight: 12 },
  name: { fontWeight: "700", color: "#111" },
  sub: { color: "#888", fontSize: 13 },
});
