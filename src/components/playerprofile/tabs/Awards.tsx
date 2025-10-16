import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";

const awards = [
  {
    id: "1",
    match: "DHL vs MUM",
    title: "Best Batsman",
    icon: require("../../../assets/awards/trophy1.png"),
  },
  { id: "2", match: "DHL vs MUM", title: "Best Batsman", icon: require("../../../assets/awards/trophy2.png") },
];

export default function Awards() {
  return (
    <FlatList
      data={awards}
      keyExtractor={(i) => i.id}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.row}>
            <Image source={item.icon} style={styles.icon} />
            <View style={{ flex: 1 }}>
              <Text style={styles.match}>{item.match}</Text>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  row: { flexDirection: "row", alignItems: "center" },
  icon: { width: 42, height: 42, marginRight: 12 },
  match: { fontWeight: "700", color: "#111" },
  title: { color: "#888", fontSize: 13 },
});
