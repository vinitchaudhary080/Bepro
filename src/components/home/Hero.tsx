import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View, Text, StyleSheet, Image, TextInput, Platform, Pressable, Dimensions, Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { fonts } from "../../theme/type";
import { colors } from "../../theme/colors";

const { width } = Dimensions.get("window");
const IOS_CONTINUOUS = Platform.OS === "ios" ? ({ borderCurve: "continuous" } as any) : {};
const HERO_HEIGHT = 200;

type Props = {
  bgImage: any;             // main hero image
  secondaryBg?: any;        // secondary background (hero-b)
  searchIcon: any;
  bellIcon: any;
  coinIcon: any;
  name?: string;
  welcomeLine?: string;
  walletAmount?: string | number;
  searchValue?: string;
  onChangeSearch?: (t: string) => void;
  onPressBell?: () => void;
  onPressWallet?: () => void;
  containerPaddingTop?: number;
};

export default function Hero({
  bgImage,
  secondaryBg,               // ✅ now received as prop
  searchIcon,
  bellIcon,
  coinIcon,
  name = "Rahul",
  welcomeLine = "Welcome back",
  walletAmount = "5000",
  searchValue = "",
  onChangeSearch,
  onPressBell,
  onPressWallet,
  containerPaddingTop = 56,
}: Props) {

  // ---------- Animated placeholder rotation ----------
  const words = useMemo(() => ["Matches", "Players", "Teams"], []);
  const [idx, setIdx] = useState(0);
  const fade = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const cycle = () => {
      Animated.timing(fade, { toValue: 0, duration: 180, useNativeDriver: true }).start(() => {
        setIdx((p) => (p + 1) % words.length);
        Animated.timing(fade, { toValue: 1, duration: 180, useNativeDriver: true }).start();
      });
    };
    const id = setInterval(cycle, 1800);
    return () => clearInterval(id);
  }, [fade, words.length]);

  const showOverlayPlaceholder = searchValue.length === 0;

  return (
    <LinearGradient
      colors={["#E6F0FF", "#FFFFFF"]}
      start={{ x: 0.15, y: 0 }}
      end={{ x: 0.85, y: 1 }}
      style={styles.wrap}
    >

      {/* 🟡 Secondary Bottom Background (hero-b.png) */}
      {secondaryBg && (
        <Image
          source={secondaryBg}
          style={styles.bgImageBottom}
          resizeMode="contain"
          pointerEvents="none"
        />
      )}

      {/* 🔵 Main Hero Background (hero-bg.png) */}
      <Image
        source={bgImage}
        style={styles.bgImage}
        resizeMode="contain"
        pointerEvents="none"
      />

      {/* 🧩 Content */}
      <View style={[styles.content, { paddingTop: containerPaddingTop }]}>
        {/* Top Row */}
        <View style={styles.topRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.hiText}>
              Hi, <Text style={[styles.hiText, { color: "#2B6BE5" }]}>{name}</Text> 👋
            </Text>
            <Text style={styles.welcome}>{welcomeLine}</Text>
          </View>

          {/* Wallet & Bell Actions */}
          <View style={styles.actions}>
            <Pressable onPress={onPressWallet} style={({ pressed }) => [styles.wallet, pressed && { opacity: 0.9 }]}>
              <Image source={coinIcon} style={{ width: 24, height: 24, marginRight: 6 }} />
              <Text style={styles.walletText}>{walletAmount}</Text>
            </Pressable>

            <Pressable onPress={onPressBell} style={({ pressed }) => [styles.bell, pressed && { opacity: 0.85 }]}>
              <Image source={bellIcon} style={{ width: 24, height: 24 }} />
            </Pressable>
          </View>
        </View>

        {/* 🔍 Search Box */}
        <View style={styles.searchBox}>
          <Image source={searchIcon} style={styles.searchIcon} />
          <TextInput
            value={searchValue}
            onChangeText={onChangeSearch}
            style={styles.searchInput}
            returnKeyType="search"
          />

          {/* Animated Placeholder */}
          {showOverlayPlaceholder && (
            <Animated.Text
              pointerEvents="none"
              style={[styles.placeholder, { opacity: fade }]}
              numberOfLines={1}
            >
              {`Search ${words[idx]}`}
            </Animated.Text>
          )}
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
    minHeight: HERO_HEIGHT,
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: "hidden",
    ...IOS_CONTINUOUS,
  },

  // 🟡 Secondary BG (hero-b)
  bgImageBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: width,
    height: HERO_HEIGHT * 0.6,
    zIndex: 1,
    opacity: 0.9,
  },

  // 🔵 Top BG (hero-bg)
  bgImage: {
    position: "absolute",
    right: -70,
    top: 50,
    width: width * 0.75,
    height: HERO_HEIGHT + 5,
    zIndex: 2,
  },

  content: {
    paddingHorizontal: 16,
    zIndex: 3,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  hiText: {
    fontSize: 20,
    color: colors.text,
    fontFamily: fonts.semibold,
  },
  welcome: {
    marginTop: 2,
    fontSize: 28,
    color: colors.text,
    fontFamily: fonts.bold,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
  },
  wallet: {
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#FFC800",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
    ...IOS_CONTINUOUS,
  },
  walletText: {
    fontSize: 13,
    color: "#ffffff",
    fontFamily: fonts.semibold,
  },
  bell: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F2F4F7",
    alignItems: "center",
    justifyContent: "center",
    ...IOS_CONTINUOUS,
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
    ...IOS_CONTINUOUS,
  },
  searchIcon: { width: 18, height: 18, marginRight: 8, opacity: 0.8 },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    fontFamily: fonts.medium,
    paddingVertical: 0,
  },
  placeholder: {
    position: "absolute",
    left: 12 + 18 + 8,
    right: 12,
    fontSize: 15,
    color: "#9AA6B2",
    fontFamily: fonts.medium,
  },
});
