import React from "react";
import { View, Text, StyleSheet, FlatList, Image, Pressable, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const CARD_W = width * 0.4;

const data = [
  {
    id: "1",
    name: "Karan Sharma",
    role: "Batsman",
    stats: "8 matches, 3 50s",
    img: require("../../assets/players/player1.png"),
  },
  {
    id: "2",
    name: "Rahul Joshi",
    role: "Bowler",
    stats: "9 matches, 15 wickets",
    img: require("../../assets/players/player2.png"),
  },
];

export default function RecommendedPlayer() {
  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Recommended Player</Text>
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
    width: CARD_W,
    height: 200,
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
