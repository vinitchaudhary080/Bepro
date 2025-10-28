import React, { memo, useMemo } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Platform,
  Pressable,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { fonts } from "../../theme/type";

const { width } = Dimensions.get("window");
const H_PADDING = 16;
const GUTTER = 12;

const CARD_W = width - H_PADDING * 4;
const CARD_H = 200;
const CARD_R = 20;

/* ---------- Types ---------- */
export type TeamSide = { name: string; score?: string; ov?: string; avatar: any };
export type FixtureHero = { bg: any; left: TeamSide; right: TeamSide; status: string; meta: string };
export type FixtureInfo = {
  thumb: any;
  title: string;
  venue: string;
  players: any[];
  captains: any[];
  metaIcon: any;
  metaText: string;
};
type Props = {
  title?: string;
  hero: FixtureHero;
  infoCards: FixtureInfo[];
  onPressToss?: () => void;
  onPressCard?: (card: FixtureInfo) => void; // 👈 NEW
};

/* ---------- Small UI Bits ---------- */
const Avatar = ({ src, size = 42, border = 2 }: any) => (
  <Image source={src} style={{ width: size, height: size, borderRadius: size / 2, borderWidth: border, borderColor: "white" }} resizeMode="cover" />
);

const AvatarsStack = ({ list, size = 28, max = 5 }: { list: any[]; size?: number; max?: number }) => {
  const display = list.slice(0, max);
  const extra = list.length - display.length;
  return (
    <View style={{ flexDirection: "row" }}>
      {display.map((img, i) => (
        <View key={i} style={{ marginLeft: i === 0 ? 0 : -size * 0.35 }}>
          <Avatar src={img} size={size} border={2} />
        </View>
      ))}
      {extra > 0 && (
        <View
          style={{
            marginLeft: -size * 0.35,
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: "#E7ECF6",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 2,
            borderColor: "white",
          }}
        >
          <Text style={{ fontFamily: fonts.semibold, fontSize: 12, color: "#4A5A82" }}>{`+${extra}`}</Text>
        </View>
      )}
    </View>
  );
};

/* ---------- Card 1: Big Hero ---------- */
function FixtureHeroCard({ data }: { data: FixtureHero }) {
  return (
    <ImageBackground source={data.bg} style={styles.hero} imageStyle={styles.heroImg} resizeMode="cover">
      <LinearGradient
        colors={["rgba(0,0,0,0.55)", "rgba(0,0,0,0.25)", "rgba(0,0,0,0.05)"]}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.rowBetween}>
        <View style={styles.sideBox}>
          <Avatar src={data.left.avatar} size={54} />
          <Text style={styles.sideName}>{data.left.name}</Text>
          {!!data.left.score && <Text style={styles.sideScore}>{data.left.score}</Text>}
          {!!data.left.ov && <Text style={styles.sideOv}>{data.left.ov}</Text>}
        </View>

        <View style={styles.vsBadge}>
          <Text style={styles.vsText}>VS</Text>
        </View>

        <View style={[styles.sideBox, { alignItems: "flex-end" }]}>
          <Avatar src={data.right.avatar} size={54} />
          <Text style={styles.sideName}>{data.right.name}</Text>
          {!!data.right.score && <Text style={styles.sideScore}>{data.right.score}</Text>}
          {!!data.right.ov && <Text style={styles.sideOv}>{data.right.ov}</Text>}
        </View>
      </View>

      <View style={styles.heroBottom}>
        <Text style={styles.status} numberOfLines={1}>{data.status}</Text>
        <Text style={styles.meta}>{data.meta}</Text>
      </View>
    </ImageBackground>
  );
}

/* ---------- Card 2: Info ---------- */
function FixtureInfoCard({ it, onPressToss }: { it: FixtureInfo; onPressToss?: () => void }) {
  return (
    <LinearGradient colors={["#A8F3E6", "#7DB8F9"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.infoBorder]}>
      <View style={[styles.infoCard]}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
          <Avatar src={it.thumb} size={36} border={0} />
          <View style={{ marginLeft: 10, flex: 1 }}>
            <Text style={styles.infoTitle} numberOfLines={1}>{it.title}</Text>
            <Text style={styles.infoVenue} numberOfLines={1}>{it.venue}</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.subhead}>Players</Text>
            <View style={{ height: 6 }} />
            <AvatarsStack list={it.players} />
            <View style={{ height: 12 }} />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={it.metaIcon} style={{ width: 18, height: 18, marginRight: 6 }} />
              <Text style={styles.metaLine}>{it.metaText}</Text>
            </View>
          </View>

          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.subhead}>Team Captain</Text>
            <View style={{ height: 6 }} />
            <View style={{ flexDirection: "row" }}>
              {it.captains.slice(0, 2).map((img, i) => (
                <View key={i} style={{ marginLeft: i ? 8 : 0 }}>
                  <Avatar src={img} size={30} border={2} />
                </View>
              ))}
            </View>
            <View style={{ height: 14 }} />
            <Pressable onPress={onPressToss} style={({ pressed }) => [styles.tossBtn, pressed && { opacity: 0.9 }]}>
              <Text style={styles.tossText}>TOSS</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

/* ---------- Section with HORIZONTAL list ---------- */
function UpcomingFixtures({ title = "Upcoming Match Fixtures", hero, infoCards, onPressToss, onPressCard }: Props) {
  const items = useMemo(
    () => [{ type: "hero" as const, data: hero }, ...infoCards.map((it) => ({ type: "info" as const, data: it }))],
    [hero, infoCards]
  );

  return (
    <View style={{ marginTop: 16 }}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <FlatList
        horizontal
        data={items}
        keyExtractor={(_, idx) => String(idx)}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: H_PADDING }}
        ItemSeparatorComponent={() => <View style={{ width: GUTTER }} />}
        snapToAlignment="start"
        decelerationRate="fast"
        renderItem={({ item }) =>
          item.type === "hero" ? (
            // (Optional) Hero clickable banaana ho to yahan Pressable wrap kar sakte ho
            <View style={{ width: CARD_W }}>
              <FixtureHeroCard data={item.data} />
            </View>
          ) : (
            <Pressable style={{ width: CARD_W }} onPress={() => onPressCard?.(item.data)}>
              <FixtureInfoCard it={item.data} onPressToss={onPressToss} />
            </Pressable>
          )
        }
      />
    </View>
  );
}

export default memo(UpcomingFixtures);

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  sectionTitle: {
    marginLeft: H_PADDING,
    marginBottom: 10,
    fontSize: 18,
    fontFamily: fonts.semibold,
  },
  hero: {
    width: CARD_W,
    height: CARD_H,
    borderRadius: CARD_R,
    overflow: "hidden",
    padding: 26,
    paddingTop: 32,
    justifyContent: "space-between",
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOpacity: 0.18, shadowRadius: 14, shadowOffset: { width: 0, height: 8 } },
      android: { elevation: 6 },
    }),
  },
  heroImg: { borderRadius: CARD_R },
  rowBetween: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  sideBox: { width: CARD_W * 0.33, alignItems: "flex-start" },
  sideName: { color: "#FFFFFF", fontFamily: fonts.semibold, fontSize: 13, marginTop: 6 },
  sideScore: { color: "#FFFFFF", fontFamily: fonts.semibold, fontSize: 16, marginTop: 2 },
  sideOv: { color: "rgba(255,255,255,0.85)", fontFamily: fonts.regular, fontSize: 12, marginTop: 2 },
  vsBadge: { width: 44, height: 44, borderRadius: 22, backgroundColor: "rgba(255,255,255,0.92)", alignItems: "center", justifyContent: "center" },
  vsText: { fontFamily: fonts.semibold, color: "#1E2A44", fontSize: 14 },
  heroBottom: { alignItems: "center", gap: 4 },
  status: { color: "#FFFFFF", fontFamily: fonts.semibold, fontSize: 13 },
  meta: { color: "rgba(255,255,255,0.85)", fontFamily: fonts.regular, fontSize: 12 },

  infoBorder: { borderRadius: CARD_R, padding: 1.2 },
  infoCard: {
    height: CARD_H,
    borderRadius: CARD_R,
    backgroundColor: "#FFFFFF",
    padding: 26,
    paddingTop: 32,
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 10, shadowOffset: { width: 0, height: 6 } },
      android: { elevation: 2 },
    }),
  },
  infoTitle: { fontSize: 15, color: "#0F1B33", fontFamily: fonts.semibold },
  infoVenue: { fontSize: 12, color: "#7B8DB6", fontFamily: fonts.semibold },
  subhead: { fontSize: 13, color: "#0F1B33", fontFamily: fonts.semibold },
  metaLine: { fontSize: 12, color: "#4A5A82", fontFamily: fonts.semibold },
  tossBtn: { backgroundColor: "#FF5C66", borderRadius: 12, paddingVertical: 10, paddingHorizontal: 18, alignSelf: "flex-end" },
  tossText: { color: "#fff", fontFamily: fonts.semibold, fontSize: 13, letterSpacing: 0.3 },
});
