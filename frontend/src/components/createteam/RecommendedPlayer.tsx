import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { api } from "../../config/api";

const { width } = Dimensions.get("window");
const CARD_W = width * 0.4;

// placeholder jab avatarUrl null ho
const EMPTY_USER = require("../../assets/icons/Empty-user.png");

type ApiUser = {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string | null;
};

type PlayerCard = {
  id: string;
  name: string;
  role: string;
  img: any;
};

type Props = {
  onSelectionChange?: (ids: string[]) => void; // ✅ selected ids parent ko dene ke liye
};

export default function RecommendedPlayer({ onSelectionChange }: Props) {
  const [players, setPlayers] = useState<PlayerCard[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    let mounted = true;

    const loadPlayers = async () => {
      try {
        const { data } = await api.get<any>("/users?page=0&limit=20");
        const items: ApiUser[] = data?.data?.items || data?.data || [];

        const mapped: PlayerCard[] = items.map((u) => ({
          id: String(u.id),
          name: u.name || "Unknown",
          role: u.role || "",
          img: u.avatarUrl ? { uri: u.avatarUrl } : EMPTY_USER,
        }));

        if (mounted) {
          setPlayers(mapped);
        }
      } catch (err: any) {
        console.log(
          "🚨 [RecommendedPlayer] Error fetching users:",
          err?.status,
          err?.message
        );
      }
    };

    loadPlayers();
    return () => {
      mounted = false;
    };
  }, []);

  // ✅ handle selection toggle
  const toggleSelect = useCallback(
    (id: string) => {
      setSelectedIds((prev) => {
        let updated: string[];

        if (prev.includes(id)) {
          // unselect
          updated = prev.filter((x) => x !== id);
          console.log("🧹 Unselected:", id, "→ now:", updated);
        } else {
          // select
          updated = [...prev, id];
          console.log("✅ Selected:", id, "→ now:", updated);
        }

        // parent ko inform karo
        onSelectionChange?.(updated);
        return updated;
      });
    },
    [onSelectionChange]
  );

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Recommended Player</Text>
      <FlatList
        horizontal
        data={players}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const isSelected = selectedIds.includes(item.id);
          return (
            <Pressable
              style={[
                styles.card,
                isSelected && styles.selectedCard,
              ]}
              onPress={() => toggleSelect(item.id)}
            >
              <Image source={item.img} style={styles.image} />
              <View style={styles.overlay} />
              <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.meta} numberOfLines={1}>
                  {item.role}
                </Text>
              </View>
            </Pressable>
          );
        }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No players found.</Text>
        }
      />

      {selectedIds.length > 0 && (
        <Text style={styles.selectedText}>
          Selected IDs: {selectedIds.join(", ")}
        </Text>
      )}
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
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedCard: {
    borderColor: "#00CBA8",
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
    right: 10,
  },
  name: { color: "#fff", fontWeight: "700", fontSize: 14 },
  meta: { color: "#ddd", fontSize: 12, marginTop: 2 },
  emptyText: {
    marginLeft: 20,
    fontSize: 12,
    color: "#888",
    paddingVertical: 4,
  },
  selectedText: {
    marginTop: 12,
    marginLeft: 20,
    fontSize: 13,
    color: "#00CBA8",
  },
});
