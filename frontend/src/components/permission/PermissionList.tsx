// components/permission/PermissionList.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Switch, FlatList, ViewStyle } from "react-native";

export type PermissionItem = {
  id: string;
  title: string;
  note: string;
  enabled: boolean;
  icon?: any; // ImageSourcePropType
};

type Props = {
  style?: ViewStyle;
  items?: PermissionItem[];
};

export default function PermissionList({ style, items }: Props) {
  const [data, setData] = useState<PermissionItem[]>(
    items ?? [
      {
        id: "1",
        title: "Available to Match",
        note: "In your team every buddy can start the match",
        enabled: true,
        icon: require("../../assets/icons/user-circle.png"),
      },
      {
        id: "2",
        title: "Toss",
        note: "In your team every buddy can start the match",
        enabled: false,
        icon: require("../../assets/icons/user-circle.png"),
      },
      {
        id: "3",
        title: "Update the Scoreboard",
        note: "In your team every buddy can start the match",
        enabled: true,
        icon: require("../../assets/icons/user-circle.png"),
      },
      {
        id: "4",
        title: "Create New Match",
        note: "In your team every buddy can start the match",
        enabled: false,
        icon: require("../../assets/icons/user-circle.png"),
      },
      {
        id: "5",
        title: "Manage Players",
        note: "In your team every buddy can start the match",
        enabled: false,
        icon: require("../../assets/icons/user-circle.png"),
      },
    ]
  );

  const toggle = (id: string) =>
    setData((prev) => prev.map((it) => (it.id === id ? { ...it, enabled: !it.enabled } : it)));

  const renderRow = ({ item }: { item: PermissionItem }) => (
    <View style={styles.row}>
      <Image source={item.icon} style={styles.dot} resizeMode="contain" />
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, item.enabled && styles.titleActive]}>{item.title}</Text>
        <Text style={styles.note}>{item.note}</Text>
      </View>
      <Switch
        value={item.enabled}
        onValueChange={() => toggle(item.id)}
        trackColor={{ false: "rgba(15,23,42,0.08)", true: "rgba(16,185,129,0.35)" }}
        thumbColor={item.enabled ? "#10B981" : "#ffffff"}
      />
    </View>
  );

  return (
    <View style={[styles.wrap, style]}>
      <FlatList
        data={data}
        keyExtractor={(it) => it.id}
        renderItem={renderRow}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        scrollEnabled={false}
        contentContainerStyle={{ paddingVertical: 4 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: "#fff", paddingHorizontal: 16 },
  row: { flexDirection: "row", alignItems: "center", paddingVertical: 14, gap: 10 },
  dot: { width: 18, height: 18, opacity: 0.8 },
  title: { fontSize: 14, color: "#6B7280", fontWeight: "600" },
  titleActive: { color: "#0F172A" },
  note: { marginTop: 4, fontSize: 12, color: "#9CA3AF" },
  sep: { height: 1, backgroundColor: "rgba(15,23,42,0.06)" },
});
