import React, { useMemo } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import PlayerCard from "../../shared/PlayerCard";

type P = { id: string; name: string; role: "BAT" | "BOWL" | "AR" | "WK"; rating: number };

export default function Players({ teamA, teamB }: { teamA: string; teamB: string }) {
  const squadA = useMemo<P[]>(
    () => [
      { id: "1", name: "R. Sharma", role: "BAT", rating: 92 },
      { id: "2", name: "M. Tiwari", role: "BAT", rating: 88 },
      { id: "3", name: "K. Iyer", role: "AR", rating: 85 },
      { id: "4", name: "P. Kumar", role: "BOWL", rating: 84 },
      { id: "5", name: "S. Pant", role: "WK", rating: 83 },
      { id: "6", name: "A. Singh", role: "BOWL", rating: 80 },
      { id: "7", name: "V. Chauhan", role: "BAT", rating: 78 },
      { id: "8", name: "H. Patel", role: "AR", rating: 77 },
      { id: "9", name: "T. Gill", role: "BAT", rating: 76 },
      { id: "10", name: "D. Yadav", role: "BOWL", rating: 74 },
      { id: "11", name: "J. Bose", role: "BOWL", rating: 72 },
    ],
    []
  );
  const squadB = useMemo(() => squadA.map((p, i) => ({ ...p, id: `b${i}`, name: p.name.replace(".", ". M") })), [squadA]);

  const renderTeam = (title: string, data: P[]) => (
    <View style={{ marginTop: 12 }}>
      <Text style={styles.teamTitle}>{title}</Text>
      <FlatList
        data={data}
        keyExtractor={(it) => it.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 10 }}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => <PlayerCard name={item.name} role={item.role} rating={item.rating} />}
        scrollEnabled={false}
      />
    </View>
  );

  return (
    <View style={{ marginTop: 12 }}>
      {renderTeam(teamA, squadA)}
      {renderTeam(teamB, squadB)}
    </View>
  );
}

const styles = StyleSheet.create({
  teamTitle: { fontSize: 14, fontWeight: "800", color: "#0D1B2A", marginBottom: 8 },
});
