import React from "react";
import { View, Text, StyleSheet, FlatList, Pressable, Image } from "react-native";

type LogoItem = { id: string; title: string; src: any };

type Props = {
  title?: string;
  logos: LogoItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export default function TeamLogo({ title = "Team Logo", logos, selectedId, onSelect }: Props) {
  return (
    <View style={styles.section}>
      <Text style={styles.heading}>{title}</Text>

      <FlatList
        data={logos}
        keyExtractor={(it) => it.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        renderItem={({ item }) => {
          const active = selectedId === item.id;
          return (
            <Pressable onPress={() => onSelect(item.id)} style={[styles.card, active && styles.cardActive]}>
              <View style={[styles.logoWrap, active && styles.logoWrapActive]}>
                <Image source={item.src} style={styles.logo} resizeMode="contain" />
              </View>
              <Text numberOfLines={1} style={[styles.caption, active && styles.captionActive]}>
                {item.title}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const CARD_W = 92;

const styles = StyleSheet.create({
  section: { marginTop: 20 },
  heading: { marginLeft: 20, marginBottom: 10, fontSize: 16, fontWeight: "700", color: "#0A0A0A" },
  card: {
    width: CARD_W,
    marginRight: 12,
    alignItems: "center",
  },
  cardActive: {},
  logoWrap: {
    width: CARD_W,
    height: CARD_W,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EDF0F4",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
    elevation: 2,
  },
  logoWrapActive: { borderColor: "#E94A5A" },
  logo: { width: CARD_W * 0.7, height: CARD_W * 0.7 },
  caption: { marginTop: 6, fontSize: 12, color: "#6C757D" },
  captionActive: { color: "#E94A5A", fontWeight: "700" },
});
