// components/myteamdetail/PlayersList.tsx
import React from "react";
import {
  View, Text, StyleSheet, FlatList, ImageBackground, Image, Pressable
} from "react-native";

type Player = {
  id: string;
  name: string;
  role: string;
  image: any;
  stat?: string;
  tag?: string;
};

export default function PlayersList({ players }: { players: Player[] }) {
  return (
    <View style={{ gap: 10 }}>
      <Text style={styles.heading}>Players List</Text>
      <FlatList
        data={players}
        numColumns={2}
        keyExtractor={(it) => it.id}
        columnWrapperStyle={{ gap: 12 }}
        renderItem={({ item }) => <PlayerCard item={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        scrollEnabled={false}
      />
    </View>
  );
}

function PlayerCard({ item }: { item: Player }) {
  return (
    <Pressable style={styles.card}>
      <ImageBackground source={item.image} style={styles.bg} imageStyle={{ borderRadius: 14 }}>
        <View style={styles.grad} />
        <View style={styles.content}>
          <Text numberOfLines={1} style={styles.name}>{item.name}</Text>
          <Text numberOfLines={1} style={styles.role}>{item.role}</Text>
          {!!item.stat && <Text numberOfLines={1} style={styles.stat}>{item.stat}</Text>}
          {!!item.tag && <Text numberOfLines={1} style={styles.tag}>{item.tag}</Text>}
        </View>
      </ImageBackground>
    </Pressable>
  );
}

const CARD_W = (360 - 16*2 - 12) / 2; // tweak if needed

const styles = StyleSheet.create({
  heading: { fontSize: 13, fontWeight: "700", color: "#0D1B2A" },
  card: { flex: 1, minWidth: CARD_W, borderRadius: 14, overflow: "hidden" },
  bg: { height: 150, justifyContent: "flex-end" },
  grad: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  content: { padding: 10, gap: 2 },
  name: { color: "#fff", fontWeight: "700", fontSize: 13 },
  role: { color: "#E6EAF2", fontSize: 11 },
  stat: { color: "#CDE9FF", fontSize: 11, marginTop: 2 },
  tag: { color: "#F0F3F9", fontSize: 10 },
});
