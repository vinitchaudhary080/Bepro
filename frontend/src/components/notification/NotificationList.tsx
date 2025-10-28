// components/notification/NotificationList.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Switch, FlatList } from "react-native";

export type NotificationItem = {
  id: string;
  title: string;
  note: string;
  enabled: boolean;
  icon?: any; // ImageSourcePropType
};

type Props = { items?: NotificationItem[] };

export default function NotificationList({ items }: Props) {
  const [data, setData] = useState<NotificationItem[]>(
    items ?? [
      { id: "1", title: "Available to Match", note: "In your team every buddy can start the match", enabled: true,  icon: require("../../assets/icons/user-circle.png") },
      { id: "2", title: "Match Reminders",     note: "Get notified before match starts",         enabled: false, icon: require("../../assets/icons/user-circle.png") },
      { id: "3", title: "Score Updates",       note: "Over-wise updates from live match",        enabled: false, icon: require("../../assets/icons/user-circle.png") },
      { id: "4", title: "Team Announcements",  note: "Captain & admin messages",                 enabled: true,  icon: require("../../assets/icons/user-circle.png") },
      { id: "5", title: "Weekly Summary",      note: "Your weekly stats & highlights",           enabled: false, icon: require("../../assets/icons/user-circle.png") },
      { id: "6", title: "New Follower",        note: "When someone follows your profile",        enabled: false, icon: require("../../assets/icons/user-circle.png") },
    ]
  );

  const toggle = (id: string) => setData(prev => prev.map(it => it.id === id ? { ...it, enabled: !it.enabled } : it));

  const Row = ({ item }: { item: NotificationItem }) => (
    <View style={styles.row}>
      <Image source={item.icon} style={styles.icon} />
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
    <View style={styles.wrap}>
      <FlatList
        data={data}
        keyExtractor={(it) => it.id}
        renderItem={Row}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        scrollEnabled={false}
        contentContainerStyle={{ paddingVertical: 6 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: "#fff", paddingHorizontal: 16 },
  row: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 14 },
  icon: { width: 18, height: 18, opacity: 0.9 },
  title: { fontSize: 14, color: "#6B7280", fontWeight: "600" },
  titleActive: { color: "#2563EB" }, // active blue like screenshot
  note: { marginTop: 4, fontSize: 12, color: "#9CA3AF" },
  sep: { height: 1, backgroundColor: "rgba(15,23,42,0.06)" },
});
