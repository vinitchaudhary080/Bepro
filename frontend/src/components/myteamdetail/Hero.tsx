// components/myteamdetail/Hero.tsx
import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Pressable,
  Platform,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

type Props = {
  teamName: string;
  cover: any; // ImageSourcePropType
};

const BACK_ICON = require("../../assets/icons/back.png");
const SHARE_ICON = require("../../assets/icons/share.png");


export default function Hero({ teamName, cover }: Props) {
  const nav = useNavigation();

  return (
    <View style={styles.wrap}>
      <ImageBackground source={cover} style={styles.bg} resizeMode="cover">
        <View style={styles.overlay} />
        {/* top bar */}
        <View style={styles.topRow}>
          <Pressable hitSlop={12} onPress={() => nav.goBack()} style={styles.iconBtn}>
            <Image source={BACK_ICON} style={styles.icon} />
          </Pressable>

          <Text numberOfLines={1} style={styles.team}>
            {teamName}
          </Text>

          <Pressable hitSlop={12} onPress={() => {}} style={styles.iconBtn}>
            <Image source={SHARE_ICON} style={styles.icon} />
          </Pressable>
        </View>

        {/* bottom soft fade */}
        <View style={styles.bottomFade} />
      </ImageBackground>
    </View>
  );
}

const HEADER_H = 260;

const styles = StyleSheet.create({
  wrap: { borderBottomLeftRadius: 18, borderBottomRightRadius: 18, overflow: "hidden" },
  bg: { height: HEADER_H, width: "100%", justifyContent: "space-between" },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.25)" },
  topRow: {
    marginTop: Platform.select({ ios: 56, android: 40 }),
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  team: { color: "#fff", fontSize: 16, fontWeight: "700", maxWidth: "70%" },
  iconBtn: {
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: { width: 18, height: 18, tintColor: "#fff" },
  bottomFade: {
    height: 80,
    backgroundColor: "rgba(246,247,251,0.0)",
  },
});
