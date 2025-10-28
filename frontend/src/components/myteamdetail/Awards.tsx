// components/myteamdetail/Awards.tsx
import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

type Award = { id: string; name: string; image: any; award: string };

export default function Awards({ items }: { items: Award[] }) {
  return (
    <View style={{ gap: 10 }}>
      <Text style={styles.heading}>Awards Winning Players</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
        {items.map((it, idx) => (
          <View key={it.id} style={[styles.card, idx % 2 ? styles.pink : styles.blue]}>
            <Image source={it.image} style={styles.pic} />
            <View style={{ alignItems: "center" }}>
              <Text style={styles.name}>{it.name}</Text>
              <Text style={styles.award}>{it.award}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: { fontSize: 13, fontWeight: "700", color: "#0D1B2A" },
  card: {
    width: 180,
    backgroundColor: "#EEF6FF",
    borderRadius: 14,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  blue: { borderWidth: 1, borderColor: "#E3EDFF" },
  pink: { backgroundColor: "#FFF0F4", borderWidth: 1, borderColor: "#FFE0EA" },
  pic: { width: 44, height: 44, borderRadius: 22 },
  name: { fontSize: 12, fontWeight: "700", color: "#0D1B2A" },
  award: { fontSize: 11, color: "#6C7A91" },
});
