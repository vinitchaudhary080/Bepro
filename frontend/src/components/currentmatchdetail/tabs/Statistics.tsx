import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Kpi = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.kpi}>
    <Text style={styles.kv}>{value}</Text>
    <Text style={styles.kl}>{label}</Text>
  </View>
);

const Block = ({ title, children }: React.PropsWithChildren<{ title: string }>) => (
  <View style={styles.block}>
    <Text style={styles.blockTitle}>{title}</Text>
    {children}
  </View>
);

export default function Statistics() {
  return (
    <View style={{ gap: 12, marginTop: 12 }}>
      <View style={styles.kpiRow}>
        <Kpi label="Run Rate (Inns)" value="5.4" />
        <Kpi label="Boundary %" value="52%" />
        <Kpi label="Dot Ball %" value="38%" />
      </View>

      <Block title="Batting Summary">
        <Tile label="Powerplay" value="45/1 (6)" />
        <Tile label="Middle Overs" value="64/2 (7–15)" />
        <Tile label="Death Overs" value="31/2 (16–20)" />
      </Block>

      <Block title="Bowling Summary">
        <Tile label="Top Bowler" value="R. Sharma – 4/32" />
        <Tile label="Avg. Length" value="Good (62%)" />
        <Tile label="Yorker Accuracy" value="18%" />
      </Block>

      <Block title="Wagon Wheel (ghost)">
        <View style={styles.wagon} />
      </Block>

      <Block title="Ball Length Map (ghost)">
        <View style={styles.length} />
      </Block>
    </View>
  );
}

function Tile({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.tile}>
      <Text style={styles.tileL}>{label}</Text>
      <Text style={styles.tileV}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  kpiRow: { flexDirection: "row", gap: 10 },
  kpi: { flex: 1, backgroundColor: "#FFFFFF", borderRadius: 14, padding: 12, alignItems: "center", elevation: 2, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 8 },
  kv: { fontSize: 18, fontWeight: "800", color: "#1A2B3C" },
  kl: { fontSize: 11, color: "#6E7F97", marginTop: 4 },

  block: { backgroundColor: "#fff", borderRadius: 16, padding: 12, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  blockTitle: { fontSize: 13, fontWeight: "800", color: "#0E1A2B", marginBottom: 8 },

  tile: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "#F0F2F7" },
  tileL: { fontSize: 12, color: "#6B7A96" },
  tileV: { fontSize: 12, color: "#1A2B3C", fontWeight: "700" },

  wagon: { height: 160, borderRadius: 12, backgroundColor: "#F3F6FF" },
  length: { height: 140, borderRadius: 12, backgroundColor: "#F6F7FB" },
});
