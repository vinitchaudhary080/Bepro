import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";

export default function ProfileCard() {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image
          source={require("../../assets/players/p1.jpg")}
          style={styles.avatar}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>Manoj Tiwari</Text>
          <Text style={styles.location}>Bengaluru, Karnataka, India</Text>
          <Text style={styles.role}>
            Left-hand Batsman | Right Arm Off Break
          </Text>
        </View>

        <Pressable>
          <Image
            source={require("../../assets/icons/share.png")}
            style={styles.share}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: -50,
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  row: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 70, height: 70, borderRadius: 35, marginRight: 12 },
  name: { fontSize: 18, fontWeight: "700", color: "#111" },
  location: { fontSize: 14, color: "#666", marginTop: 2 },
  role: { fontSize: 13, color: "#888", marginTop: 4 },
  share: { width: 22, height: 22, tintColor: "#666" },
});
