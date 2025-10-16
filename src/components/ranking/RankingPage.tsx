// components/ranking/RankingPage.tsx
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
  Image,
  Platform,
  ViewStyle,
  ImageSourcePropType,
} from "react-native";
// (optional) if you have theme files; else replace with your own
import { colors } from "../../theme/colors";
import { fonts } from "../../theme/type";

type TabKey = "Team" | "Batsman" | "Type C";

export type RankingItem = {
  id: string;
  name: string;
  subtitle?: string;
  avatar: ImageSourcePropType;
  trophyIcon?: ImageSourcePropType;
};

type Props = {
  data: { Team: RankingItem[]; Batsman: RankingItem[]; "Type C": RankingItem[] };
  searchIcon: ImageSourcePropType;
  filterIcon?: ImageSourcePropType;
  trophyIcon: ImageSourcePropType;
  onFilterPress?: () => void;
  containerStyle?: ViewStyle;
  showFilterButton?: boolean;
};

const H = 16;
const CARD_R = 14;

// iOS-style smooth shadow (your IOS_CONTINUOUS)
const IOS_CONTINUOUS: ViewStyle = Platform.select({
  ios: {
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
  },
  android: { elevation: 0 },
}) as ViewStyle;

export default function RankingPage({
  data,
  searchIcon,
  filterIcon,
  trophyIcon,
  onFilterPress,
  containerStyle,
  showFilterButton = true,
}: Props) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<TabKey>("Team");

  const list = useMemo(() => {
    const rows = data[active] || [];
    if (!query.trim()) return rows;
    const q = query.trim().toLowerCase();
    return rows.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        (r.subtitle || "").toLowerCase().includes(q)
    );
  }, [data, active, query]);

  return (
    <View style={[styles.screen, containerStyle]}>
      {/* Search – your styling */}
      <View style={styles.searchWrap}>
        <View style={styles.searchBox}>
          <Image source={searchIcon} style={styles.searchIcon} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
            returnKeyType="search"
          />
          {/* custom placeholder */}
          {!query.length && (
            <Text pointerEvents="none" style={styles.placeholder}>
              Search
            </Text>
          )}
        </View>

        {showFilterButton && filterIcon && (
          <Pressable
            onPress={onFilterPress}
            style={({ pressed }) => [
              styles.filterBtn,
              pressed && { opacity: 0.8 },
            ]}
          >
            <Image source={filterIcon} style={{ width: 18, height: 18 }} />
          </Pressable>
        )}
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        {(["Team", "Batsman", "Type C"] as TabKey[]).map((t) => {
          const isActive = active === t;
          return (
            <Pressable
              key={t}
              onPress={() => setActive(t)}
              style={({ pressed }) => [
                styles.tab,
                isActive && styles.tabActive,
                pressed && { opacity: 0.9 },
              ]}
            >
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                {t}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* List */}
      <FlatList
        data={list}
        keyExtractor={(it) => it.id}
        contentContainerStyle={{ paddingHorizontal: H, paddingBottom: 24 }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.avatar} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name} numberOfLines={1}>
                {item.name}
              </Text>
              {!!item.subtitle && (
                <Text style={styles.subtitle} numberOfLines={1}>
                  {item.subtitle}
                </Text>
              )}
            </View>

            {/* Right — trophy only */}
            <View style={styles.badgeCol}>
              <View style={styles.trophyPill}>
                <Image
                  source={item.trophyIcon || trophyIcon}
                  style={{ width: 18, height: 18 }}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F6F8FB",
    paddingTop: 8,
    marginTop: 56,
  },

  // Search (updated to your spec)
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: H,
  },
  searchBox: {
    marginTop: 24,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#F5F9FE",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    position: "relative",
    flex: 1,
    ...IOS_CONTINUOUS,
  },
  searchIcon: { width: 18, height: 18, marginRight: 8, opacity: 0.8 },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: colors?.text ?? "#111827",
    // @ts-ignore – optional custom font if available in your app
    fontFamily: fonts?.medium ?? undefined,
    paddingVertical: 0,
  },
  placeholder: {
    position: "absolute",
    left: 12 + 18 + 8, // padding + icon + gap
    right: 12,
    fontSize: 15,
    color: "#9AA6B2",
    // @ts-ignore
    fontFamily: fonts?.medium ?? undefined,
  },
  filterBtn: {
    marginLeft: 8,
    marginTop: 24,
    height: 60,
    width: 60,
    borderRadius: 16,
    backgroundColor: "#F5F9FE",
    alignItems: "center",
    justifyContent: "center",
    ...IOS_CONTINUOUS,
  },

  // Tabs
  tabsRow: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: H,
    paddingVertical: 12,
  },
  tab: {
    flex: 1,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#EEF2F7",
    alignItems: "center",
    justifyContent: "center",
  },
  tabActive: {
    backgroundColor: "rgba(253, 90, 120, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(253, 90, 120, 0.35)",
  },
  tabLabel: { fontSize: 13, color: "#7A8797", fontWeight: "600" },
  tabLabelActive: { color: "#F85C8A" },

  // Card
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: CARD_R,
    backgroundColor: "#FFFFFF",
    ...shadowSm(0.08),
  },
  avatar: { width: 36, height: 36, borderRadius: 18, marginRight: 10 },
  name: { fontSize: 14, fontWeight: "700", color: "#111827" },
  subtitle: { fontSize: 12, color: "#9AA6B2", marginTop: 2 },

  badgeCol: { marginLeft: 12, alignItems: "center", justifyContent: "center" },
  trophyPill: {
    height: 42,
    minWidth: 42,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "rgba(255,195,31,0.22)",
    alignItems: "center",
    justifyContent: "center",
  },
});

function shadowSm(opacity = 0.12) {
  const ios = {
    shadowColor: "#000",
    shadowOpacity: opacity,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  };
  const android = { elevation: 4 };
  return Platform.select({ ios, android }) as ViewStyle;
}
