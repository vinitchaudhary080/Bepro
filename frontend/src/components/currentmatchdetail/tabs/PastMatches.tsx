import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import MatchSmallCard, { MatchSmall } from "../../shared/MatchSmallCard";

export default function PastMatches({ teamA, teamB }: { teamA: string; teamB: string }) {
  const [sel, setSel] = useState<"A" | "B">("A");

  const data = useMemo<MatchSmall[]>(
    () => [
      { id: "pm1", title: `${teamA} vs CHN`, subtitle: "MEN’S T20 • Tri Series East", result: "Mumbai won by 6 wkts" },
      { id: "pm2", title: `${teamA} vs MUM`, subtitle: "ODI • Wankhede", result: "DHL won by 12 runs" },
      { id: "pm3", title: `${teamA} vs RJS`, subtitle: "TEST • Jaipur", result: "Drawn" },
    ],
    [teamA]
  );
  const dataB = useMemo(
    () => data.map((d, i) => ({ ...d, id: `b${i}`, title: `${teamB}${d.title.slice(teamA.length)}` })),
    [data, teamA, teamB]
  );

  const list = sel === "A" ? data : dataB;

  return (
    <View style={{ marginTop: 12 }}>
      <View style={styles.switchRow}>
        <Toggle label={teamA} active={sel === "A"} onPress={() => setSel("A")} />
        <Toggle label={teamB} active={sel === "B"} onPress={() => setSel("B")} />
      </View>

      <FlatList
        data={list}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ gap: 10, marginTop: 10 }}
        renderItem={({ item }) => <MatchSmallCard data={item} />}
        scrollEnabled={false}
      />
    </View>
  );
}

function Toggle({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.tgl, active && styles.tglOn]}>
      <Text style={[styles.tglTxt, active && styles.tglTxtOn]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  switchRow: { flexDirection: "row", gap: 8 },
  tgl: { flex: 1, paddingVertical: 10, borderRadius: 12, backgroundColor: "#EEF2FF", alignItems: "center" },
  tglOn: { backgroundColor: "#E5ECFF", borderWidth: 1, borderColor: "#5E76EC55" },
  tglTxt: { fontSize: 12, color: "#6B7A96", fontWeight: "700" },
  tglTxtOn: { color: "#4F62D9" },
});
