// components/myteamdetail/BestPerfor.tsx
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Svg, { Circle } from "react-native-svg";

type Item = { id: string; name: string; image: any; label: string; percent: number; sub: string };

export default function BestPerfor({ items }: { items: Item[] }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Best Performances • Batters</Text>
      {items.map((it) => (
        <View key={it.id} style={styles.card}>
          <Image source={it.image} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{it.name}</Text>
            <Text style={styles.meta}>{it.sub}</Text>
          </View>
          <Donut percent={it.percent} />
        </View>
      ))}
    </View>
  );
}

function Donut({ percent }: { percent: number }) {
  const size = 64;
  const stroke = 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (percent / 100) * c;

  return (
    <View style={styles.donutWrap}>
      <Svg width={size} height={size}>
        <Circle cx={size/2} cy={size/2} r={r} stroke="#EEF2F7" strokeWidth={stroke} fill="none" />
        <Circle
          cx={size/2}
          cy={size/2}
          r={r}
          stroke="#00CBA8"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash}, ${c - dash}`}
          rotation="-90"
          origin={`${size/2}, ${size/2}`}
          fill="none"
        />
      </Svg>
      <Text style={styles.donutLabel}>{percent}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    gap: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  title: { fontSize: 13, fontWeight: "700", color: "#0D1B2A" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7FAFF",
    borderRadius: 14,
    padding: 10,
    gap: 10,
  },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  name: { fontSize: 13, fontWeight: "700", color: "#0D1B2A" },
  meta: { fontSize: 11, color: "#6C7A91", marginTop: 2 },
  donutWrap: { width: 64, height: 64, alignItems: "center", justifyContent: "center" },
  donutLabel: { position: "absolute", fontSize: 12, fontWeight: "700", color: "#0D1B2A" },
});
