// components/myteamdetail/Heading.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Heading() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        Rohit Sharma: “Proud of the way the team came back & grabbed opportunities”
      </Text>
      <Text style={styles.meta}>Just now • Delhi HQ</Text>
      <Text style={styles.sub}>
        Jab aap job-to-job khelte ho, momentum hold karna tough hota hai. Isliye
        humne basics pe focus kiya—new ball discipline, strike rotation, aur pressure moments
        mein clear plans. Agla target: middle-overs control & death-over execution. 🔥
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    gap: 6,
  },
  title: { fontSize: 14, fontWeight: "700", color: "#0D1B2A", lineHeight: 18 },
  meta: { fontSize: 11, color: "#6C7A91" },
  sub: { fontSize: 12, color: "#3B4656", lineHeight: 18 },
});
