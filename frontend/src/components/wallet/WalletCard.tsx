// Components/wallet/WalletCard.tsx
import React from "react";
import { View, Text, Image, StyleSheet, ImageSourcePropType, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  totalLabel?: string;          // e.g. "Total Coin"
  amount: string | number;      // e.g. 5756
  ownerName?: string;           // e.g. "Manoj Tiwari"
  coinIcon: ImageSourcePropType;// e.g. require("../../assets/wallet/coin.png")
  onPress?: () => void;         // optional
  // optional custom gradient
  gradientColors?: string[];    // e.g. ["#7B4397", "#DC2430"]
  gradientStart?: { x: number; y: number };
  gradientEnd?: { x: number; y: number };
};

export default function WalletCard({
  totalLabel = "Total Coin",
  amount,
  ownerName,
  coinIcon,
  onPress,
  gradientColors = ["#F21D52",  "#0096FF"], // 🔥 nice pink→indigo→teal blend
  gradientStart = { x: 0, y: 0 },
  gradientEnd = { x: 1, y: 1 },
}: Props) {
  const content = (
    <LinearGradient
      colors={gradientColors}
      start={gradientStart}
      end={gradientEnd}
      style={styles.card}
    >
      <View style={styles.leftCol}>
        <Text style={styles.topLabel}>{totalLabel}</Text>
        <Text style={styles.amount} numberOfLines={1}>
          {Intl.NumberFormat().format(Number(amount))}
        </Text>
        {!!ownerName && <Text style={styles.owner}>{ownerName}</Text>}
      </View>

      <View style={styles.rightCol}>
        <Image source={coinIcon} style={styles.coin} resizeMode="contain" />
      </View>
    </LinearGradient>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={styles.shadowWrap}>
        {content}
      </Pressable>
    );
  }
  return <View style={styles.shadowWrap}>{content}</View>;
}

const CARD_H = 190;

const styles = StyleSheet.create({
  shadowWrap: {
    borderRadius: 16,
    shadowColor: "#1F2937",
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  card: {
    height: CARD_H,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    overflow: "hidden",
  },
  leftCol: {
    flex: 1,
    justifyContent: "center",
  },
  rightCol: {
    width: 110,
    alignItems: "center",
    justifyContent: "center",
  },
  topLabel: {
    color: "rgba(255,255,255,0.92)",
    fontSize: 19,
    marginBottom: 6,
    
  },
  amount: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 36,
    lineHeight: 40,
    letterSpacing: 0.5,
  },
  owner: {
    marginTop: 50,
    color: "rgba(255,255,255,0.90)",
    fontSize: 13,
  },
  coin: {
    width: 146,
    height: 146,
    transform: [{ rotate: "0deg" }], // tweak if needed
  },
});
