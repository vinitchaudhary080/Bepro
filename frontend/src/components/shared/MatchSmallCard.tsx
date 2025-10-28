import React from "react";
import { View, Text, StyleSheet } from "react-native";

export type MatchSmall = { id: string; title: string; subtitle: string; result: string };

export default function MatchSmallCard({ data }: { data: MatchSmall }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title} numberOfLines={1}>{data.title}</Text>
      <Text style={styles.sub} numberOfLines={1}>{data.subtitle}</Text>
      <Text style={styles.result} numberOfLines={1}>{data.result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    gap: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  title: { fontSize: 13, fontWeight: "800", color: "#131E2E" },
  sub: { fontSize: 11, color: "#7A8CA6" },
  result: { fontSize: 12, color: "#2C7A4B", fontWeight: "700" },
});
