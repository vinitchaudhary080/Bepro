import React from "react";
import { View, Text, StyleSheet, Image, ImageSourcePropType } from "react-native";

type TeamRow = { name: string; score: string; logo?: ImageSourcePropType };

export default function Result({ t1, t2, note }: { t1: TeamRow; t2: TeamRow; note: string }) {
  return (
    <View style={styles.card}>
      <Row {...t1} />
      <Row {...t2} dim />
      <Text style={styles.note}>{note}</Text>
    </View>
  );
}

function Row({ name, score, logo, dim }: TeamRow & { dim?: boolean }) {
  return (
    <View style={[styles.row, dim && { opacity: 0.85 }]}>
      {logo ? <Image source={logo} style={styles.logo} /> : <View style={styles.logo} />}
      <Text style={styles.team}>{name}</Text>
      <View style={{ flex: 1 }} />
      <Text style={styles.score}>{score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    gap: 8,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    marginTop: 8,
  },
  row: { flexDirection: "row", alignItems: "center", paddingVertical: 4 },
  logo: { width: 22, height: 22, borderRadius: 6, backgroundColor: "#EDF1FF", marginRight: 8 },
  team: { fontSize: 14, fontWeight: "600", color: "#1A2B3C" },
  score: { fontSize: 14, fontWeight: "700", color: "#1A2B3C" },
  note: { fontSize: 12, color: "#6C7A91", marginTop: 2 },
});
