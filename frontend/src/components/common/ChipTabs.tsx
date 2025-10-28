import React from "react";
import { View, Pressable, Text, StyleSheet, ViewStyle } from "react-native";

export type TabKey = "Live" | "Players" | "Statistics" | "Past Matches";

export default function ChipTabs({
  tabs,
  active,
  onChange,
  style,
}: {
  tabs: TabKey[];
  active: TabKey;
  onChange: (k: TabKey) => void;
  style?: ViewStyle;
}) {
  return (
    <View style={[styles.row, style]}>
      {tabs.map((t) => {
        const selected = t === active;
        return (
          <Pressable key={t} onPress={() => onChange(t)} style={[styles.chip, selected && styles.sel]}>
            <Text style={[styles.txt, selected && styles.selTxt]}>{t}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 8 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 24,
    backgroundColor: "#F0F3FF",
  },
  sel: { backgroundColor: "#F8E3E8", borderWidth: 1, borderColor: "#F21D52" },
  txt: { fontSize: 12, color: "#64748B", fontWeight: "600" },
  selTxt: { color: "#F21D52" },
});
