import React from "react";
import { View, Text, StyleSheet } from "react-native";

type RR = { cur: number; minOv: string; rem: number; last10: string; rrPair: string };

export default function CurrentScore({ rr }: { rr: RR }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Current RR</Text>
      <Text style={styles.value}>{rr.cur.toFixed(2)}</Text>
      <Text style={styles.meta}>
        Min. Ov.: {rr.minOv} • Rem: {rr.rem} • Last 10 ov: {rr.last10} {"\n"}(RR): {rr.rrPair}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DBF1E6",
    backgroundColor: "#F4FFFA",
    padding: 12,
    marginTop: 10,
  },
  title: { fontSize: 12, color: "#3C8F6B", fontWeight: "600" },
  value: { fontSize: 18, fontWeight: "800", color: "#165A43", marginTop: 2 },
  meta: { fontSize: 12, color: "#3C8F6B", marginTop: 4, lineHeight: 18 },
});
