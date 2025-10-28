// components/dailytask/TaskHistory.tsx
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

export type TaskHistoryItem = {
  id: string;
  date: string;        // "20/01/2025"
  task: string;        // "10 Runs in a Match"
  coin: number;        // 500
  status: "Added" | "Pending" | "Failed";
};

type Props = {
  title?: string;
  description?: string;
  data: TaskHistoryItem[];
};

export default function TaskHistory({
  title = "History",
  description = "Recent task rewards you’ve earned. Coins are added instantly after task verification.",
  data,
}: Props) {
  const renderRow = ({ item }: { item: TaskHistoryItem }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, styles.colDate]}>{item.date}</Text>
      <Text style={[styles.cell, styles.colTask]} numberOfLines={1}>
        {item.task}
      </Text>
      <Text style={[styles.cell, styles.colCoin]}>{item.coin}</Text>
      <Text
        style={[
          styles.cell,
          styles.colStatus,
          item.status === "Added"
            ? styles.added
            : item.status === "Failed"
            ? styles.failed
            : styles.pending,
        ]}
      >
        {item.status}
      </Text>
    </View>
  );

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      {!!description && <Text style={styles.desc}>{description}</Text>}

      {/* Header */}
      <View style={[styles.row, styles.headerRow]}>
        <Text style={[styles.header, styles.colDate]}>Date</Text>
        <Text style={[styles.header, styles.colTask]}>Task</Text>
        <Text style={[styles.header, styles.colCoin]}>Coin</Text>
        <Text style={[styles.header, styles.colStatus]}>Status</Text>
      </View>

      {/* Rows */}
      <FlatList
        data={data}
        keyExtractor={(it) => it.id}
        renderItem={renderRow}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        scrollEnabled={false}
        contentContainerStyle={{ paddingTop: 4 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 6,
  },
  desc: {
    fontSize: 12,
    lineHeight: 18,
    color: "#6B7280",
    marginBottom: 12,
  },
  headerRow: {
    paddingVertical: 12,
  },
  header: {
    fontSize: 12,
    color: "#6B7280",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  sep: {
    height: 1,
    backgroundColor: "rgba(15,23,42,0.06)",
  },
  cell: {
    fontSize: 13,
    color: "#0F172A",
  },
  // left-aligned fixed widths to match screenshot
  colDate: { width: 96 },
  colTask: { flex: 1, paddingRight: 8 },
  colCoin: { width: 60 },
  colStatus: { width: 72, textAlign: "right" },

  added: { color: "#22C55E", fontWeight: "600" },
  failed: { color: "#EF4444", fontWeight: "600" },
  pending: { color: "#F59E0B", fontWeight: "600" },
});
