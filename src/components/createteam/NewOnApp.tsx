import React from "react";
import { View, Text, StyleSheet, FlatList, Image, Pressable } from "react-native";

const data = [
  {
    id: "1",
    name: "Amit Verma",
    role: "Batsman",
    stats: "5 matches, 2 50s",
    img: require("../../assets/players/player3.png"),
  },
  {
    id: "2",
    name: "Rajesh Kumar",
    role: "All-rounder",
    stats: "4 matches, 1 100",
    img: require("../../assets/players/player4.png"),
  },
];

export default function NewOnApp() {
  return (
    <View style={styles.section}>
      <Text style={styles.heading}>New on App</Text>
      <FlatList
        horizontal
        data={data}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable style={styles.card}>
            <Image source={item.img} style={styles.image} />
            <View style={styles.overlay} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.meta}>{item.role}</Text>
              <Text style={styles.meta}>{item.stats}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 24 },
  heading: {
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 20,
    marginBottom: 10,
  },
  card: {
    width: 160,
    height: 180,
    borderRadius: 16,
    overflow: "hidden",
    marginLeft: 20,
  },
  image: { width: "100%", height: "100%" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  info: {
    position: "absolute",
    bottom: 10,
    left: 10,
  },
  name: { color: "#fff", fontWeight: "700", fontSize: 14 },
  meta: { color: "#ddd", fontSize: 12 },
});
