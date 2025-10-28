import React from "react";
import { View, Text, StyleSheet } from "react-native";

function Card({ title, children }: React.PropsWithChildren<{ title: string }>) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </View>
  );
}

export default function Live() {
  return (
    <View style={{ gap: 12, marginTop: 12 }}>
      <View style={styles.tabHeadRow}>
        <View style={styles.liveDot} />
        <Text style={styles.tabHead}>Live</Text>
      </View>

      <Card title="Best Performances – Batters">
        <View style={{ gap: 10 }}>
          <PerfRow name="Rahul Sharma" team="DHL-Hin" runs="89 (39)" control="80%" />
          <PieGhost />
          <Text style={styles.note}>Best shot: Cover • Average shot: Square</Text>
          <Text style={styles.noteDim}>35 Runs, 4 Fours, 5 Six</Text>
        </View>
      </Card>

      <Card title="Best Performances – Bowling">
        <View style={{ gap: 10 }}>
          <PerfRow name="Rahul Sharma" team="DHL-Hin" runs="35.4 Ov (4 wickets)" control="—" />
          <ScatterGhost />
          <View style={styles.columns}>
            <Text style={styles.col}>O 7</Text>
            <Text style={styles.col}>M 2</Text>
            <Text style={styles.col}>W 4</Text>
            <Text style={styles.col}>Econ 4.86</Text>
          </View>
        </View>
      </Card>

      <Card title="Team Analytics">
        <View style={{ flexDirection: "row", gap: 12 }}>
          <MiniTrophy label="Delhi Ranking" sub="Top team" />
          <MiniTrophy label="Mumbai Ranking" sub="Top 3" />
        </View>
        <View style={{ marginTop: 10, flexDirection: "row", gap: 8 }}>
          <Pill text="ODI 3rd DHL • 5th MUM" />
          <Pill text="Test 2nd DHL • 3rd MUM" />
          <Pill text="T20 4th DHL • 2nd MUM" />
        </View>
      </Card>
    </View>
  );
}

function PerfRow({ name, team, runs, control }: { name: string; team: string; runs: string; control: string }) {
  return (
    <View style={styles.perfRow}>
      <View style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{name} <Text style={styles.dim}>{team}</Text></Text>
        <Text style={styles.bold}>{runs}</Text>
        <View style={styles.barBack}>
          <View style={[styles.barFill, { width: control === "—" ? "0%" : control }]} />
        </View>
        <Text style={styles.meta}>Control {control}</Text>
      </View>
    </View>
  );
}

function PieGhost() {
  return <View style={styles.pie} />;
}
function ScatterGhost() {
  return <View style={styles.scatter} />;
}
function MiniTrophy({ label, sub }: { label: string; sub: string }) {
  return (
    <View style={styles.trophy}>
      <View style={styles.trophyIcon} />
      <Text style={styles.trophyLabel}>{label}</Text>
      <Text style={styles.trophySub}>{sub}</Text>
    </View>
  );
}
function Pill({ text }: { text: string }) {
  return <View style={styles.pill}><Text style={styles.pillTxt}>{text}</Text></View>;
}

const styles = StyleSheet.create({
  tabHeadRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  liveDot: { width: 8, height: 8, borderRadius: 8, backgroundColor: "#F04438" },
  tabHead: { fontSize: 12, fontWeight: "700", color: "#F04438" },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: { fontSize: 13, fontWeight: "700", color: "#1A2B3C", marginBottom: 8 },

  perfRow: { flexDirection: "row", gap: 10, alignItems: "center" },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#FFEBD5" },
  name: { fontSize: 13, color: "#1A2B3C", fontWeight: "700" },
  dim: { color: "#7B8CA6", fontWeight: "600" },
  bold: { fontSize: 12, color: "#334155", fontWeight: "700", marginTop: 2 },
  barBack: { height: 8, backgroundColor: "#EAF1FF", borderRadius: 6, overflow: "hidden", marginTop: 6 },
  barFill: { height: 8, backgroundColor: "#6078EC", borderRadius: 6 },
  meta: { fontSize: 11, color: "#72809A", marginTop: 4 },

  pie: { alignSelf: "flex-end", width: 72, height: 72, borderRadius: 36, backgroundColor: "#F2F5FF" },
  scatter: { height: 120, borderRadius: 12, backgroundColor: "#F6F7FB" },

  columns: { flexDirection: "row", gap: 16, marginTop: 6 },
  col: { fontSize: 11, color: "#55657E", fontWeight: "700" },

  trophy: { width: 140, borderRadius: 14, padding: 10, backgroundColor: "#FFF7E7" },
  trophyIcon: { width: 30, height: 30, borderRadius: 8, backgroundColor: "#FFD38A", marginBottom: 6 },
  trophyLabel: { fontSize: 12, fontWeight: "700", color: "#724E11" },
  trophySub: { fontSize: 11, color: "#906D2D" },

  pill: { backgroundColor: "#EFF4FF", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20 },
  pillTxt: { fontSize: 11, color: "#5166D8", fontWeight: "700" },
});
