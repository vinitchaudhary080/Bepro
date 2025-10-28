import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";


// 👉 apne project ke fonts import karo
import { fonts } from "../../theme/type";

const { width } = Dimensions.get("window");
const H_PADDING = 16;
const CARD_W = width - H_PADDING * 2;
const CARD_H = 210;
const CARD_R = 24;

export type TeamSide = {
  name: string;
  score?: string;   // e.g. "155 - 8"
  ov?: string;      // e.g. "18.5 ov"
  avatar: any;      // require("...png")
};

type Props = {
  title?: string;           // default: "Upcoming Match Fixtures"
  bg: any;                  // background stadium image
  left: TeamSide;
  right: TeamSide;
  status: string;           // e.g. "DHL is playing their inning"
  meta: string;             // e.g. "T20 | Match"
};

export default function UpcomingMatchHero({
  title = "Upcoming Match Fixtures",
  bg,
  left,
  right,
  status,
  meta,
}: Props) {
  return (
    <View style={{ marginTop: 16 }}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <ImageBackground
        source={bg}
        resizeMode="cover"
        style={styles.card}
        imageStyle={styles.cardImg}
      >
        {/* Soft darkening from bottom → top to match reference */}
        <LinearGradient
          colors={["rgba(0,0,0,0.55)", "rgba(0,0,0,0.28)", "rgba(0,0,0,0.10)"]}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
          style={StyleSheet.absoluteFill}
        />

        {/* Top row: both sides + VS */}
        <View style={styles.rowBetween}>
          <View style={styles.sideBox}>
            <Image source={left.avatar} style={styles.avatar} />
            <Text style={styles.sideName} numberOfLines={1}>{left.name}</Text>
            {!!left.score && <Text style={styles.sideScore}>{left.score}</Text>}
            {!!left.ov && <Text style={styles.sideOv}>{left.ov}</Text>}
          </View>

          <View style={styles.vsBadge}>
            <Text style={styles.vsText}>VS</Text>
          </View>

          <View style={[styles.sideBox, { alignItems: "flex-end" }]}>
            <Image source={right.avatar} style={styles.avatar} />
            <Text style={styles.sideName} numberOfLines={1}>{right.name}</Text>
            {!!right.score && <Text style={styles.sideScore}>{right.score}</Text>}
            {!!right.ov && <Text style={styles.sideOv}>{right.ov}</Text>}
          </View>
        </View>

        {/* Bottom status/meta */}
        <View style={styles.bottom}>
          <Text style={styles.status} numberOfLines={1}>{status}</Text>
          <Text style={styles.meta}   numberOfLines={1}>{meta}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    marginLeft: H_PADDING,
    marginBottom: 10,
    marginTop: 56,
    fontSize: 18,
    color: "#0F1B33",
    fontFamily: fonts.semibold,
  },

  card: {
    width: CARD_W,
    height: CARD_H,
    alignSelf: "center",
    borderRadius: CARD_R,
    overflow: "hidden",
    paddingHorizontal: 26,
    paddingTop: 28,
    paddingBottom: 18,
    justifyContent: "space-between",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.18,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 8 },
      },
      android: { elevation: 6 },
    }),
  },
  cardImg: { borderRadius: CARD_R },

  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  sideBox: {
    width: CARD_W * 0.34,
    alignItems: "flex-start",
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "#fff",
  },

  sideName: {
    color: "#FFFFFF",
    fontFamily: fonts.semibold,
    fontSize: 13,
    marginTop: 6,
  },
  sideScore: {
    color: "#FFFFFF",
    fontFamily: fonts.semibold,
    fontSize: 16,
    marginTop: 2,
  },
  sideOv: {
    color: "rgba(255,255,255,0.90)",
    fontFamily: fonts.regular,
    fontSize: 12,
    marginTop: 2,
  },

  vsBadge: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "rgba(255,255,255,0.96)",
    alignItems: "center",
    justifyContent: "center",
  },
  vsText: { fontFamily: fonts.semibold, color: "#1E2A44", fontSize: 14 },

  bottom: { alignItems: "center" },
  status: { color: "#FFFFFF", fontFamily: fonts.semibold, fontSize: 13, marginBottom: 4 },
  meta: { color: "rgba(255,255,255,0.90)", fontFamily: fonts.regular, fontSize: 12 },
});
