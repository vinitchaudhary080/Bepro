import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PlayerCard({ name, role, rating }: { name: string; role: "BAT"|"BOWL"|"AR"|"WK"; rating: number }) {
  return (
    <View style={styles.card}>
      <View style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <Text style={styles.role}>{role}</Text>
      </View>
      <View style={styles.rating}><Text style={styles.ratingTxt}>{rating}</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 72,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: { width: 38, height: 38, borderRadius: 10, backgroundColor: "#EAF1FF" },
  name: { fontSize: 13, fontWeight: "700", color: "#1A2B3C" },
  role: { fontSize: 11, color: "#6E7F97", fontWeight: "700", marginTop: 2 },
  rating: { backgroundColor: "#E8F6F1", paddingHorizontal: 8, paddingVertical: 6, borderRadius: 10 },
  ratingTxt: { fontSize: 12, color: "#0F8A67", fontWeight: "800" },
});
