import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function Badges() {
  return (
    <View style={styles.wrap}>
      <View style={styles.card}>
        <Image source={require("../../../assets/awards/badge.png")} style={styles.icon} />
        <Text style={styles.title}>Badges</Text>
        <Text style={styles.desc}>
          Lorem ipsum dolor sit amet consectetur. Enim varius pharetra ac ut arcu.
        </Text>
      </View>

      <View style={styles.stats}>
        {["Daily", "Weekly", "Monthly"].map((label, i) => (
          <View key={label} style={styles.statCard}>
            <Text style={styles.value}>{i === 0 ? "99" : i === 1 ? "4" : "6"}</Text>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.rating}>Rating: {i + 1}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  icon: { width: 40, height: 40, marginBottom: 8 },
  title: { fontWeight: "700", color: "#111", fontSize: 16 },
  desc: { color: "#888", textAlign: "center", fontSize: 13, marginTop: 6 },
  stats: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  statCard: {
    width: "30%",
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  value: { fontWeight: "700", fontSize: 18, color: "#111" },
  label: { color: "#666", fontSize: 13 },
  rating: { color: "#999", fontSize: 12, marginTop: 4 },
});
