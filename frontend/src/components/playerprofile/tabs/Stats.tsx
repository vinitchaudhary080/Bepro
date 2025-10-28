import React from "react";
import { View, Text, StyleSheet } from "react-native";

const metrics = [
  "MTS", "INNS", "RUNS", "AVG.", "HIGHEST", "SR",
  "30S", "50S", "100S", "4S", "6S", "Net OUTS"
];

export default function Stats() {
  return (
    <View style={styles.grid}>
      {metrics.map((label) => (
        <View key={label} style={styles.card}>
          <Text style={styles.value}>0</Text>
          <Text style={styles.label}>{label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 16,
  },
  card: {
    width: "30%",
    aspectRatio: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  value: { fontSize: 18, fontWeight: "700", color: "#111" },
  label: { fontSize: 12, color: "#666", marginTop: 4 },
});
