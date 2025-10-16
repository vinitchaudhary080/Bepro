// components/notificationpanel/Hero.tsx
import React from "react";
import { View, Text, Pressable, StyleSheet, Platform } from "react-native";

type Props = {
  title?: string;
  onBack?: () => void;
};

export default function Hero({ title = "Notifications", onBack }: Props) {
  return (
    <View style={styles.wrap}>
      <Pressable onPress={onBack} hitSlop={12} style={styles.backBtn}>
        <Text style={styles.backTxt}>‹</Text>
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <View style={{ width: 24 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingTop: Platform.select({ ios: 12, android: 8 }),
    paddingHorizontal: 16,
    paddingBottom: 12,
    marginTop: 56,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EFF2F6",
  },
  backBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F6FA",
  },
  backTxt: { fontSize: 20, color: "#2B2F36" },
  title: { flex: 1, textAlign: "center", fontSize: 20, fontWeight: "700", color: "#0F172A" },
});
