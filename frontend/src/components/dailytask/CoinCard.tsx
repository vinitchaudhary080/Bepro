// components/dailytask/CoinCard.tsx
import React from "react";
import { View, Text, Image, StyleSheet, ImageSourcePropType, Platform } from "react-native";

type Props = {
  title?: string;               // e.g. "Total Coin"
  amount: number | string;      // e.g. 5756
  desc?: string;                // optional paragraph
  icon: ImageSourcePropType;    // coin image
};

export default function CoinCard({
  title = "Total Coin",
  amount,
  desc = "Lorem ipsum dolor sit amet consectetur. Enim varius pharetra et in arcu.",
  icon,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image source={icon} style={styles.icon} resizeMode="contain" />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.amount}>{Intl.NumberFormat().format(Number(amount))}</Text>
          {!!desc && <Text style={styles.desc}>{desc}</Text>}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
      },
      android: { elevation: 4 },
    }),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 84,
    height: 84,
    marginRight: 14,
  },
  title: {
    fontSize: 13,
    color: "#4B5563", // subtle slate-ish
    marginBottom: 4,
  },
  amount: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 6,
  },
  desc: {
    fontSize: 12,
    lineHeight: 18,
    color: "#6B7280",
  },
});
