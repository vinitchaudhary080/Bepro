// components/wallet/WalletHistory.tsx
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

export type HistoryItem = {
  id: string;
  date: string;   // "20/01/2025"
  team: string;   // "Dehli Fighter"
  coin: number;   // 500
  status: "Success" | "Failed" | "Pending";
};

type Props = {
  title?: string;
  description?: string;
  data: HistoryItem[];
};

export default function WalletHistory({
  title = "History",
  description = "Lorem ipsum dolor sit amet consectetur. Enim varius pharetra et in arcu. Quisque nibh a porttitor aliquam.",
  data,
}: Props) {
  const renderRow = ({ item }: { item: HistoryItem }) => {
    return (
      <View style={styles.row}>
        <Text style={[styles.cell, styles.colDate]} numberOfLines={1}>
          {item.date}
        </Text>
        <Text style={[styles.cell, styles.colTeam]} numberOfLines={1}>
          {item.team}
        </Text>
        <Text style={[styles.cell, styles.colCoin]} numberOfLines={1}>
          {item.coin}
        </Text>
        <Text
          style={[
            styles.cell,
            styles.colStatus,
            item.status === "Success"
              ? styles.success
              : item.status === "Failed"
              ? styles.failed
              : styles.pending,
          ]}
          numberOfLines={1}
        >
          {item.status}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      {!!description && <Text style={styles.desc}>{description}</Text>}

      {/* Header */}
      <View style={[styles.row, styles.headerRow]}>
        <Text style={[styles.header, styles.colDate]}>Date</Text>
        <Text style={[styles.header, styles.colTeam]}>Team</Text>
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
    paddingVertical: 18,
  },
  sep: {
    height: 1,
    backgroundColor: "rgba(15, 23, 42, 0.06)",
  },
  cell: {
    fontSize: 13,
    color: "#0F172A",
  },
  colDate: { width: 96 },
  colTeam: { flex: 1, paddingRight: 8 },
  colCoin: { width: 60, textAlign: "left" },
  colStatus: { width: 72, textAlign: "right" },

  success: { color: "#22C55E", fontWeight: "600" },
  failed: { color: "#EF4444", fontWeight: "600" },
  pending: { color: "#F59E0B", fontWeight: "600" },
});
