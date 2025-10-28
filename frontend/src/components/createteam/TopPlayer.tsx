import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RecommendedPlayer from "./RecommendedPlayer";

export default function TopPlayer() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Top Player</Text>
      <RecommendedPlayer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 24 },
  heading: {
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 20,
    marginBottom: 10,
  },
});
