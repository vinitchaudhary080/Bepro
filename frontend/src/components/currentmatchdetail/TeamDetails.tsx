import React from "react";
import { View, Text, StyleSheet, Image, ImageSourcePropType } from "react-native";

type T = { code: string; logo?: ImageSourcePropType; score?: string; overs?: string };

export default function TeamDetails({ t1, t2 }: { t1: T; t2: T }) {
  return (
    <View style={styles.card}>
      <TeamMini {...t1} />
      <View style={styles.sep} />
      <TeamMini {...t2} right />
    </View>
  );
}

function TeamMini({ code, logo, score, overs, right }: T & { right?: boolean }) {
  return (
    <View style={[styles.side, right && { alignItems: "flex-end" }]}>
      <Image source={logo!} style={styles.logo} />
      <Text style={styles.code}>{code}</Text>
      {score && <Text style={styles.s}>{score}</Text>}
      {overs && <Text style={styles.o}>({overs})</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  side: { alignItems: "flex-start", gap: 2 },
  sep: { width: 1, height: 36, backgroundColor: "#EEF0F5" },
  logo: { width: 28, height: 28, borderRadius: 8, backgroundColor: "#EEF2FF" },
  code: { marginTop: 4, fontSize: 12, fontWeight: "700", color: "#0D1B2A" },
  s: { fontSize: 12, color: "#3E4A5E" },
  o: { fontSize: 11, color: "#8DA0B8" },
});
