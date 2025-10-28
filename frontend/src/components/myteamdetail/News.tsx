// components/myteamdetail/News.tsx
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type NewsCard = {
  id: string;
  image: any;
  title: string;
  time: string;
  excerpt: string;
};

export default function News({ items }: { items: NewsCard[] }) {
  return (
    <View style={{ gap: 10 }}>
      <Text style={styles.heading}>News</Text>
      {items.map((n) => (
        <View key={n.id} style={styles.card}>
          <Image source={n.image} style={styles.pic} />
          <View style={{ flex: 1 }}>
            <Text numberOfLines={2} style={styles.title}>{n.title}</Text>
            <Text style={styles.time}>{n.time}</Text>
            <Text numberOfLines={2} style={styles.excerpt}>{n.excerpt}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: { fontSize: 13, fontWeight: "700", color: "#0D1B2A" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 10,
    flexDirection: "row",
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  pic: { width: 88, height: 88, borderRadius: 12 },
  title: { fontSize: 13, fontWeight: "700", color: "#0D1B2A" },
  time: { fontSize: 11, color: "#6C7A91", marginTop: 2 },
  excerpt: { fontSize: 12, color: "#3B4656", marginTop: 4 },
});

