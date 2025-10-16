// components/profile/ProfileDetailsContent.tsx
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  FlatList,
  Platform,
  ImageSourcePropType,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { ProfileStackParamList } from "../../navigation/ProfileStack";

/* ---------- types ---------- */
type MatchItem = {
  id: string;
  title: string;
  subtitle: string;
  team1: { name: string; score: string; logo: ImageSourcePropType };
  team2: { name: string; score: string; logo: ImageSourcePropType };
  resultText: string;
  highlight: string;
  noteRight?: string;
};

type StatMetric = { key: string; label: string; value: string };
type StatBucket = {
  title: "Batting" | "Bowling" | "Fielding" | "Captain";
  metrics: StatMetric[];
};

type AwardCardData = {
  id: string;
  matchTitle: string; // e.g., "DHL vs MUM"
  subtitle: string; // e.g., "Best Batsman"
  chips: Array<{ value: string; label: string; rating: string; tint: string }>;
};

type TeamCardData = {
  id: string;
  name: string;
  logo: ImageSourcePropType;
  designationLeft: string; // "Member"
  designationHint: string; // "Your Designation"
  totalPlayers: string; // "15 Players"
  totalPlayersHint: string; // "Total Player in team"
  winningMatches: string; // "5"
  winningMatchesHint: string; // "Winning Match"
  createdOn: string; // "22 June 2025"
  createdOnHint: string; // "Created on"
};

type BadgeCardData = {
  id: string;
  icon: ImageSourcePropType;
  title: string;
  description: string;
  chips: Array<{ value: string; label: string; rating: string; tint: string }>;
};

/* ---------- props ---------- */
export type ProfileDetailsContentProps = {
  avatar: ImageSourcePropType;
  name: string;
  location: string;
  role: string;

  // small icons
  editIcon: ImageSourcePropType;
  locationIcon: ImageSourcePropType;
  roleIcon: ImageSourcePropType;

  // big icons
  trophyIcon?: ImageSourcePropType; // Awards right trophy
  menuIcon?: ImageSourcePropType; // Teams 3-dots

  // tabs data
  matches?: MatchItem[];

  // Stats new shape: 4 buckets with metric grid
  statBuckets?: StatBucket[];

  // Awards/Teams/Badges data for cards
  awardCards?: AwardCardData[];
  teamCards?: TeamCardData[];
  badgeCards?: BadgeCardData[];
};

/* ---------- theme ---------- */
const BG = "#F7F9FC";
const CARD = "#FFFFFF";
const TEXT = "#1C2433";
const MUTED = "#6F7D95";
const PINK = "#F85C8A";

/* ---------- tabs ---------- */
const TABS = ["Matches", "Stats", "Awards", "Teams", "Badges"] as const;
type TabKey = (typeof TABS)[number];

/* =============================================================== */
export default function ProfileDetailsContent(props: ProfileDetailsContentProps) {
  const [active, setActive] = useState<TabKey>("Matches");
  const [statTab, setStatTab] =
    useState<"Batting" | "Bowling" | "Fielding" | "Captain">("Batting");

  // ✅ navigation instance (for Edit button)
  const nav = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();

  const bucketsMap = useMemo(() => {
    const map = new Map<string, StatBucket>();
    (props.statBuckets || []).forEach((b) => map.set(b.title, b));
    return map;
  }, [props.statBuckets]);

  return (
    <View style={styles.container}>
      {/* top info */}
      <View style={styles.headerCard}>
        <View style={{ flexDirection: "row" }}>
          <Image source={props.avatar} style={styles.avatar} />
          <View style={{ flex: 1, paddingRight: 36 }}>
            <Text style={styles.name}>{props.name}</Text>

            <View style={styles.metaRow}>
              <Image source={props.locationIcon} style={styles.metaIcon} />
              <Text style={styles.metaText} numberOfLines={1}>
                {props.location}
              </Text>
            </View>
            <View style={[styles.metaRow, { marginTop: 6 }]}>
              <Image source={props.roleIcon} style={styles.metaIcon} />
              <Text style={styles.metaText} numberOfLines={1}>
                {props.role}
              </Text>
            </View>
          </View>

          {/* ✏️ Edit -> navigate to EditProfile */}
          <Pressable
            style={styles.editBtn}
            onPress={() => nav.navigate("EditProfile")}
          >
            <Image source={props.editIcon} style={styles.editIcon} />
          </Pressable>
        </View>

        {/* main segmented tabs */}
        <View style={styles.tabsRow}>
          {TABS.map((t) => {
            const sel = active === t;
            return (
              <Pressable
                key={t}
                onPress={() => setActive(t)}
                style={[styles.tab, sel && styles.tabActive]}
              >
                <Text style={[styles.tabText, sel && styles.tabTextActive]}>
                  {t}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* content */}
      <View style={{ marginTop: 12 }}>
        {active === "Matches" && (
          <FlatList
            data={props.matches}
            keyExtractor={(it) => it.id}
            ItemSeparatorComponent={() => <View style={styles.sep} />}
            renderItem={({ item }) => <MatchCard item={item} />}
            contentContainerStyle={{ paddingVertical: 6 }}
            ListEmptyComponent={<Empty text="No matches yet" />}
          />
        )}

        {active === "Stats" && (
          <StatsSection
            statTab={statTab}
            setStatTab={setStatTab}
            bucket={bucketsMap.get(statTab)}
          />
        )}

        {active === "Awards" && (
          <FlatList
            data={props.awardCards}
            keyExtractor={(it) => it.id}
            ItemSeparatorComponent={() => <View style={styles.sep} />}
            renderItem={({ item }) => (
              <AwardsCard item={item} trophyIcon={props.trophyIcon} />
            )}
            ListEmptyComponent={<Empty text="No awards yet" />}
            contentContainerStyle={{ paddingVertical: 6 }}
          />
        )}

        {active === "Teams" && (
          <FlatList
            data={props.teamCards}
            keyExtractor={(it) => it.id}
            ItemSeparatorComponent={() => <View style={styles.sep} />}
            renderItem={({ item }) => (
              <TeamCard item={item} menuIcon={props.menuIcon} />
            )}
            ListEmptyComponent={<Empty text="No teams yet" />}
            contentContainerStyle={{ paddingVertical: 6 }}
          />
        )}

        {active === "Badges" && (
          <FlatList
            data={props.badgeCards}
            keyExtractor={(it) => it.id}
            ItemSeparatorComponent={() => <View style={styles.sep} />}
            renderItem={({ item }) => <BadgesCard item={item} />}
            ListEmptyComponent={<Empty text="No badges yet" />}
            contentContainerStyle={{ paddingVertical: 6 }}
          />
        )}
      </View>
    </View>
  );
}

/* ===================== subcomponents ======================== */

function MatchCard({ item }: { item: MatchItem }) {
  return (
    <View style={styles.card}>
      <Text style={styles.matchTitle}>{item.title}</Text>
      <Text style={styles.matchSub}>{item.subtitle}</Text>

      <View style={styles.teamRow}>
        <View style={styles.teamLeft}>
          <Image source={item.team1.logo} style={styles.teamLogo} />
          <Text style={styles.teamName}>{item.team1.name}</Text>
        </View>
        <Text style={styles.score}>{item.team1.score}</Text>
      </View>

      <View style={styles.teamRow}>
        <View style={styles.teamLeft}>
          <Image source={item.team2.logo} style={styles.teamLogo} />
          <Text style={styles.teamName}>{item.team2.name}</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          {!!item.noteRight && <Text style={styles.mutedTiny}>{item.noteRight}</Text>}
          <Text style={styles.score}>{item.team2.score}</Text>
        </View>
      </View>

      <Text style={[styles.result, { color: "#1BAA55" }]}>{item.resultText}</Text>
      <View style={styles.noteBar}>
        <Text style={styles.noteText}>{item.highlight}</Text>
      </View>
    </View>
  );
}

function StatsSection({
  statTab,
  setStatTab,
  bucket,
}: {
  statTab: "Batting" | "Bowling" | "Fielding" | "Captain";
  setStatTab: (t: any) => void;
  bucket?: StatBucket;
}) {
  const tabs: Array<typeof statTab> = ["Batting", "Bowling", "Fielding", "Captain"];
  const metrics = bucket?.metrics ?? [];

  return (
    <View style={styles.card}>
      {/* small underline tabs */}
      <View style={styles.smallTabsRow}>
        {tabs.map((t) => {
          const sel = t === statTab;
          return (
            <Pressable key={t} onPress={() => setStatTab(t)} style={styles.smallTabBtn}>
              <Text style={[styles.smallTabText, sel && { color: PINK }]}>{t}</Text>
              {sel && <View style={styles.smallTabUnderline} />}
            </Pressable>
          );
        })}
      </View>

      {/* grid 3 columns */}
      <View style={styles.metricGrid}>
        {metrics.map((m) => (
          <View key={m.key} style={styles.metricCell}>
            <Text style={styles.metricValue}>{m.value}</Text>
            <Text style={styles.metricLabel}>{m.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function AwardsCard({ item, trophyIcon }: { item: AwardCardData; trophyIcon?: ImageSourcePropType }) {
  return (
    <View style={[styles.card, { overflow: "hidden" }]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={require("../../assets/teams/dhl.png")} style={styles.teamLogoLarge} />
        <View style={{ flex: 1 }}>
          <Text style={styles.teamName}>{item.matchTitle}</Text>
          <Text style={styles.mutedBlue}>Best Batsman</Text>
        </View>
        {!!trophyIcon && <Image source={trophyIcon} style={styles.trophy} />}
      </View>

      <View style={styles.chipsRow}>
        {item.chips.map((c, idx) => (
          <View key={idx} style={styles.kpiCard}>
            <View style={[styles.kpiCircle, { backgroundColor: `${c.tint}22` }]}>
              <Text style={[styles.kpiValue, { color: c.tint }]}>{c.value}</Text>
            </View>
            <Text style={styles.kpiLabel}>{c.label}</Text>
            <Text style={styles.kpiRating}>Rating: {c.rating}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function TeamCard({ item, menuIcon }: { item: TeamCardData; menuIcon?: ImageSourcePropType }) {
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={item.logo} style={[styles.teamLogoLarge, { borderRadius: 16 }]} />
        <Text style={[styles.teamName, { flex: 1 }]}>{item.name}</Text>
        {!!menuIcon && <Image source={menuIcon} style={{ width: 16, height: 16, tintColor: "#8EA0C5" }} />}
      </View>

      <View style={styles.teamInfoGrid}>
        <View>
          <Text style={styles.pinkSmall}>{item.designationLeft}</Text>
          <Text style={styles.gridHint}>{item.designationHint}</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.darkSmall}>{item.totalPlayers}</Text>
          <Text style={styles.gridHint}>{item.totalPlayersHint}</Text>
        </View>

        <View style={{ marginTop: 14 }}>
          <Text style={styles.darkSmall}>{item.winningMatches}</Text>
          <Text style={styles.gridHint}>{item.winningMatchesHint}</Text>
        </View>
        <View style={{ marginTop: 14, alignItems: "flex-end" }}>
          <Text style={styles.darkSmall}>{item.createdOn}</Text>
          <Text style={styles.gridHint}>{item.createdOnHint}</Text>
        </View>
      </View>
    </View>
  );
}

function BadgesCard({ item }: { item: BadgeCardData }) {
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={item.icon} style={{ width: 36, height: 36, marginRight: 10 }} />
        <View style={{ flex: 1 }}>
          <Text style={styles.teamName}>{item.title}</Text>
          <Text style={styles.mutedBlue}>{item.description}</Text>
        </View>
      </View>

      <View style={styles.chipsRow}>
        {item.chips.map((c, idx) => (
          <View key={idx} style={styles.kpiCard}>
            <View style={[styles.kpiCircle, { backgroundColor: `${c.tint}22` }]}>
              <Text style={[styles.kpiValue, { color: c.tint }]}>{c.value}</Text>
            </View>
            <Text style={styles.kpiLabel}>{c.label}</Text>
            <Text style={styles.kpiRating}>Rating: {c.rating}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <View style={{ padding: 18, alignItems: "center" }}>
      <Text style={{ color: MUTED }}>{text}</Text>
    </View>
  );
}

/* ===================== styles ======================== */

const styles = StyleSheet.create({
  container: { marginTop: -16, paddingHorizontal: 16 },

  headerCard: {
    backgroundColor: CARD,
    borderRadius: 16,
    padding: 16,
    ...shadow(10),
  },
  avatar: { width: 60, height: 60, borderRadius: 12, marginRight: 12 },
  name: { fontSize: 16, fontWeight: "700", color: TEXT, marginBottom: 6 },
  metaRow: { flexDirection: "row", alignItems: "center" },
  metaIcon: { width: 14, height: 14, marginRight: 8, tintColor: "#7C8EC5", opacity: 0.9 },
  metaText: { fontSize: 12.5, color: MUTED, flex: 1 },

  editBtn: {
    position: "absolute",
    right: 12,
    top: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#EEF2F8",
    alignItems: "center",
    justifyContent: "center",
  },
  editIcon: { width: 16, height: 16, tintColor: PINK },

  tabsRow: { flexDirection: "row", gap: 10, marginTop: 16, flexWrap: "wrap" },
  tab: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 12, backgroundColor: "#EDEFF5" },
  tabActive: { backgroundColor: "#FDE7EE", borderWidth: 1, borderColor: PINK },
  tabText: { fontSize: 13, color: "#6E7CA4", fontWeight: Platform.OS === "ios" ? "600" : "500" },
  tabTextActive: { color: PINK },

  /* lists/cards */
  card: { backgroundColor: CARD, borderRadius: 16, padding: 16, ...shadow(8) },
  sep: { height: 10, backgroundColor: BG },

  matchTitle: { fontSize: 12, color: "#8996B2", fontWeight: "700" },
  matchSub: { fontSize: 10.5, color: "#A6B2C8", marginTop: 2, marginBottom: 8 },
  teamRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 6 },
  teamLeft: { flexDirection: "row", alignItems: "center" },
  teamLogo: { width: 28, height: 28, borderRadius: 14, marginRight: 8 },
  teamLogoLarge: { width: 32, height: 32, borderRadius: 16, marginRight: 12 },
  teamName: { fontSize: 14.5, color: TEXT, fontWeight: "700" },
  score: { fontSize: 16, color: TEXT, fontWeight: "700" },
  result: { marginTop: 6, fontSize: 12.5, fontWeight: "700" },

  noteBar: { marginTop: 8, backgroundColor: "#F1F4F9", borderRadius: 8, paddingVertical: 8, paddingHorizontal: 10 },
  noteText: { fontSize: 12, color: "#64748B" },

  /* stats section */
  smallTabsRow: { flexDirection: "row", gap: 18, marginBottom: 12 },
  smallTabBtn: { paddingVertical: 6 },
  smallTabText: { fontSize: 13, color: "#9AA8C6", fontWeight: "600" },
  smallTabUnderline: { height: 2, backgroundColor: PINK, marginTop: 6, width: 26, borderRadius: 2 },

  metricGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  metricCell: {
    width: "31.5%",
    backgroundColor: "#F6F8FC",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  metricValue: { fontSize: 18, fontWeight: "800", color: "#0E1B36" },
  metricLabel: { fontSize: 11.5, color: "#6E7CA4", marginTop: 6 },

  /* awards/badges chips */
  chipsRow: { flexDirection: "row", gap: 12, marginTop: 14 },
  kpiCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    ...shadow(5),
  },
  kpiCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  kpiValue: { fontSize: 18, fontWeight: "800" },
  kpiLabel: { fontSize: 12, color: "#55678E" },
  kpiRating: { fontSize: 11, color: "#9AA8C6", marginTop: 2 },
  mutedBlue: { color: "#7C8EC5", fontSize: 12 },

  /* team grid details */
  teamInfoGrid: {
    marginTop: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  pinkSmall: { color: PINK, fontWeight: "700", fontSize: 13 },
  darkSmall: { color: TEXT, fontWeight: "700", fontSize: 13 },
  gridHint: { color: "#9AA8C6", fontSize: 11, marginTop: 2 },

  trophy: { width: 54, height: 54, marginLeft: 8 },
});

/* shadow helper */
function shadow(elev: number) {
  if (Platform.OS === "android") return { elevation: elev };
  return {
    shadowColor: "#001029",
    shadowOpacity: 0.06,
    shadowRadius: Math.max(6, elev / 2),
    shadowOffset: { width: 0, height: 6 },
  };
}
