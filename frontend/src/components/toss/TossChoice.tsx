// components/toss/TossChoice.tsx
import React from "react";
import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  onSelect: (v: "Heads" | "Tails") => void;
  onClose?: () => void;
};

const PINK = "#E94A5A";
const PINK2 = "#F46977";
const SHEET_BG = "#FFFFFF";

export default function TossChoice({ onSelect, onClose }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.sheet, { paddingBottom: 10 + Math.max(insets.bottom, 8) }]}>
      {/* top grabber */}
      <View style={styles.grabber} />

      {/* close icon pill */}
      <Pressable
  onPress={() => onClose?.()}
  hitSlop={12}
  style={styles.close}
  accessibilityRole="button"
  accessibilityLabel="Close"
>
  <Text style={styles.closeTxt}>×</Text>
</Pressable>


      <Text style={styles.title}>Make your call</Text>
      <Text style={styles.sub}>
        Captain, it’s your call! 🎉 Will it be Heads or{" "}
        <Text style={{ fontWeight: Platform.OS === "ios" ? "600" : "bold" }}>Tails?</Text>
      </Text>

      <Pressable onPress={() => onSelect("Heads")} style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}>
        <LinearGradient
          colors={[PINK2, PINK]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.primaryBtn}
        >
          <Text style={styles.primaryTxt}>Heads</Text>
        </LinearGradient>
      </Pressable>

      <Pressable onPress={() => onSelect("Tails")} style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}>
        <View style={styles.secondaryBtn}>
          <Text style={styles.secondaryTxt}>Tails</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 18,
    paddingHorizontal: 16,
    backgroundColor: SHEET_BG,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: -4 },
    elevation: 14,
  },
  grabber: {
    alignSelf: "center",
    width: 88,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(0,0,0,0.08)",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    color: "#13161B",
    marginTop: 6,
  },
  sub: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 8,
    lineHeight: 20,
  },
  primaryBtn: {
    marginTop: 18,
    height: 52,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryTxt: { color: "#fff", fontSize: 16, fontWeight: "700" },
  secondaryBtn: {
    marginTop: 12,
    height: 52,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F7FA",
    borderWidth: 1,
    borderColor: "#E9ECF2",
  },
  secondaryTxt: { color: "#333", fontSize: 16, fontWeight: "700" },
  close: {
    position: "absolute",
    right: 10,
    top: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4F6FA",
    borderWidth: 1,
    borderColor: "#E7EBF2",
  },
  closeTxt: { fontSize: 20, lineHeight: 22, color: "#6B7280" },
});
