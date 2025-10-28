import React, { memo, useMemo, useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  Pressable,
  Platform,
} from "react-native";
import { fonts } from "../../theme/type";

const { width } = Dimensions.get("window");
const H_PADDING = 16;
const CARD_R = 16;

export type Innings = {
  teamName: string;      // "IND"
  logo: any;             // require(".../ind.png")
  score: string;         // "187/5" or "120/5"
  overs?: string;        // "(18.5/20 ov; T: 120)" etc (optional)
};

export type MatchItem = {
  id: string | number;
  type: "T20" | "ODI" | "Test";
  fixtureTitle: string;  // "IND vs AUS"
  series: string;        // "Men's T20 - Tri Series, East Zone"
  badge?: any;           // tiny left image (optional)
  firstInnings: Innings;
  secondInnings: Innings;
  resultText: string;    // "India won by 6 wickets"
};

type Props = {
  title?: string;
  data: MatchItem[];             // full dataset (all formats), we filter by tab
  onPressItem?: (m: MatchItem) => void;
  onPressShowMore?: () => void;
};

/* ----------------- UI bits ----------------- */
const TeamRow = ({ team, alignRight = false }: { team: Innings; alignRight?: boolean }) => (
  <View style={[styles.teamRow, alignRight && { justifyContent: "space-between" }]}>
    <View style={styles.teamLeft}>
      <Image source={team.logo} style={styles.teamLogo} />
      <Text style={styles.teamName}>{team.teamName}</Text>
    </View>
    <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
      {!!team.overs && <Text style={styles.overs}>{team.overs}</Text>}
      <Text style={styles.score}>{team.score}</Text>
    </View>
  </View>
);

const ResultCard = ({ item, onPress }: { item: MatchItem; onPress?: () => void }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [
      styles.card,
      pressed && Platform.OS === "ios" && { transform: [{ scale: 0.98 }] },
    ]}
  >
    {/* Header line with tiny badge + series text */}
    <View style={styles.cardHeader}>
      {!!item.badge && <Image source={item.badge} style={styles.badge} />}
      <View style={{ flex: 1 }}>
        <Text style={styles.fixture} numberOfLines={1}>{item.fixtureTitle}</Text>
        <Text style={styles.series} numberOfLines={1}>
          {item.type} • {item.series}
        </Text>
      </View>
    </View>

    {/* Innings rows */}
    <TeamRow team={item.firstInnings} />
    <View style={styles.separator} />
    <TeamRow team={item.secondInnings} />

    {/* Result text */}
    <Text style={styles.resultText} numberOfLines={1}>
      {item.resultText}
    </Text>
  </Pressable>
);

/* ----------------- Main ----------------- */


function LatestResults({
  title = "Latest Results",
  data,
  onPressItem,
  onPressShowMore,
}: Props) {
  const [tab, setTab] = useState<"T20" | "ODI" | "Test">("T20");

  const tabs = [
    { key: "T20", label: "T20" },
    { key: "ODI", label: "ODI" },
    { key: "Test", label: "Test" },
  ] as const;

  const list = useMemo(() => data.filter((m) => m.type === tab), [data, tab]);

  const renderCard = useCallback(
    (item: MatchItem) => (
      <ResultCard item={item} onPress={() => onPressItem?.(item)} />
    ),
    [onPressItem]
  );

  return (
    <View style={{ marginTop: 16 }}>
      {/* Title + Show More */}
      <View style={styles.headerRow}>
        <Text style={styles.heading}>{title}</Text>
        <Pressable onPress={onPressShowMore}>
          <Text style={styles.showMore}>Show More</Text>
        </Pressable>
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        {tabs.map((t) => {
          const active = tab === t.key;
          return (
            <Pressable
              key={t.key}
              onPress={() => setTab(t.key)}
              style={[
                styles.tabBase,
                active ? styles.tabActive : styles.tabInactive,
              ]}
            >
              <Text
                style={[
                  styles.tabTextBase,
                  active ? styles.tabTextActive : styles.tabTextInactive,
                ]}
              >
                {t.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* 🔧 List (no FlatList to avoid nested VirtualizedList warning) */}
      <View style={{ paddingHorizontal: 16, paddingTop: 6 }}>
        {list.map((it, idx) => (
          <View key={String(it.id)} style={{ marginBottom: idx === list.length - 1 ? 0 : 10 }}>
            {renderCard(it)}
          </View>
        ))}
      </View>
    </View>
  );
}

export default memo(LatestResults);


/* ----------------- styles ----------------- */
const styles = StyleSheet.create({
  headerRow: {
    paddingHorizontal: H_PADDING,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  heading: {
    fontSize: 18,
    color: "#0E1628",
    fontFamily: fonts.semibold,
  },
  showMore: {
    fontSize: 12,
    color: "#9AA6C0",
    fontFamily: fonts.semibold,
  },

  tabsRow: {
    paddingHorizontal: H_PADDING,
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  tabBase: {
    minHeight: 34,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabInactive: {
    backgroundColor: "#F3F5F8",
    borderColor: "#E2E7EE",
  },
  tabActive: {
    backgroundColor: "#FFE7EC",
    borderColor: "#FF3A57",
    shadowColor: "#FF3A57",
    shadowOpacity: Platform.select({ ios: 0.12, android: 0 }),
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  tabTextBase: { fontSize: 13, fontFamily: fonts.semibold },
  tabTextInactive: { color: "#6677A1" },
  tabTextActive: { color: "#FF3A57" },

  card: {
    borderRadius: CARD_R,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
      },
      android: { elevation: 2 },
    }),
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  badge: { width: 18, height: 18, borderRadius: 9 },
  fixture: {
    fontSize: 12,
    color: "#1D2B48",
    fontFamily: fonts.semibold,
    letterSpacing: 0.2,
  },
  series: {
    fontSize: 11,
    color: "#9AA6C0",
    fontFamily: fonts.semibold,
    marginTop: 2,
  },

  teamRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  teamLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  teamLogo: { width: 32, height: 32, borderRadius: 16 },
  teamName: { fontSize: 14, color: "#1D2B48", fontFamily: fonts.semibold },
  overs: { fontSize: 11, color: "#9AA6C0", fontFamily: fonts.semibold },
  score: { fontSize: 16, color: "#1D2B48", fontFamily: fonts.semibold },

  separator: {
    height: 1,
    backgroundColor: "#EEF2F7",
    marginVertical: 2,
  },

  resultText: {
    marginTop: 8,
    fontSize: 12,
    color: "#1D2B48",
    fontFamily: fonts.semibold,
  },
});
