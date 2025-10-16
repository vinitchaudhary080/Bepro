import React from "react";
import { View, Text, Pressable, Image, StyleSheet, Dimensions } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Svg, { Path } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// layout tuning to match reference
const BAR_H = 68;          // visible bar height (without safe area)
const WAVE_Y = 16;         // straight-line y from bottom of component
const BUMP_H = 14;         // wave crest height
const SIDE_FLAT = 28;      // flat part near edges before wave starts
const CENTER_SIZE = 56;    // raised circle size
const ROW_TOP_PADDING = 8;

type IconMap = {
  [routeName: string]: {
    active: any;
    inactive: any;
    label: string;
  };
};

export default function WavyTabBar({
  state,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const bgH = BAR_H + insets.bottom;

  // icons map (rename keys if your route names differ)
  const icons: IconMap = {
    Home:     { active: require("../../assets/tab/home-active.png"),     inactive: require("../../assets/tab/home.png"),     label: "Home" },
    Team:     { active: require("../../assets/tab/team-active.png"),     inactive: require("../../assets/tab/team.png"),     label: "My Team" },
    Play:     { active: require("../../assets/tab/ball-active.png"),     inactive: require("../../assets/tab/ball.png"),     label: "" },
    Rankings: { active: require("../../assets/tab/rank-active.png"),     inactive: require("../../assets/tab/rank.png"),     label: "Rankings" },
    Profile:  { active: require("../../assets/tab/profile-active.png"),  inactive: require("../../assets/tab/profile.png"),  label: "Profile" },
  };

  // ---- smooth single bump line (thin pink stroke) ----
  // flat -> subtle up -> crest @ center -> subtle down -> flat
  const leftC1  = width * 0.35;
  const rightC1 = width * 0.65;

  const d = `
    M 0 ${WAVE_Y}
    L ${SIDE_FLAT} ${WAVE_Y}
    C ${leftC1 * 0.7} ${WAVE_Y} ${leftC1} ${WAVE_Y - BUMP_H} ${width / 2} ${WAVE_Y - BUMP_H}
    C ${rightC1} ${WAVE_Y - BUMP_H} ${rightC1 * 1.3} ${WAVE_Y} ${width - SIDE_FLAT} ${WAVE_Y}
    L ${width} ${WAVE_Y}
    L ${width} ${bgH}
    L 0 ${bgH}
    Z
  `;

  const go = (name: string) => {
    const idx = state.routes.findIndex(r => r.name === name);
    if (idx >= 0 && state.index !== idx) navigation.navigate(name as never);
  };

  const centerBottom =
  insets.bottom +
  (BAR_H - WAVE_Y) +      // distance from row top to baseline
  (BUMP_H - 2) -          // crest lift
  CENTER_SIZE / 1.5 +
  ROW_TOP_PADDING / 4; 

  // Split routes so center is free (matches screenshot spacing)
  const leftRoutes  = state.routes.filter(r => r.name !== "Play").slice(0, 2);
  const rightRoutes = state.routes.filter(r => r.name !== "Play").slice(2);

  const renderTab = (route: any, i: number) => {
    const focused = state.index === state.routes.findIndex(r => r.key === route.key);
    const info = icons[route.name];
    return (
      <Pressable
        key={route.key}
        onPress={() => go(route.name)}
        style={styles.tab}
      >
        <Image
          source={focused ? info.active : info.inactive}
          style={{ width: 22, height: 22 }}
          resizeMode="contain"
        />
        {!!info.label && (
          <Text style={[styles.label, focused ? styles.labelActive : styles.labelInactive]}>
            {info.label}
          </Text>
        )}
      </Pressable>
    );
  };

  return (
    <View style={{ height: bgH, backgroundColor: "transparent" }}>
      {/* white plate + pink wave line */}
      <View style={{ position: "absolute", left: 0, right: 0, bottom: 10, height: bgH }}>
        <Svg width={width} height={bgH}>
          {/* white background */}
          <Path d={`M0 0 H${width} V${bgH} H0 Z`} fill="#FFFFFF" />
          {/* thin wave stroke only (no fill) */}
          {/* pink stroke ONLY on top wave */}
<Path
  d={`
    M 0 ${WAVE_Y}
    L ${SIDE_FLAT} ${WAVE_Y}
    C ${width * 0.35 * 0.7} ${WAVE_Y} ${width * 0.35} ${WAVE_Y - BUMP_H} ${width / 2} ${WAVE_Y - BUMP_H}
    C ${width * 0.65} ${WAVE_Y - BUMP_H} ${width * 0.65 * 1.3} ${WAVE_Y} ${width - SIDE_FLAT} ${WAVE_Y}
    L ${width} ${WAVE_Y}
  `}
  fill="none"
  stroke="#FF4A66"
  strokeWidth={1.2}
/>

        </Svg>
      </View>

      {/* center raised circular button */}
      <View style={[styles.centerWrap, { bottom: centerBottom }]}>
        <Pressable
          onPress={() => go("Play")}
          style={({ pressed }) => [styles.centerBtn, pressed && { transform: [{ scale: 0.98 }] }]}
        >
          <Image
            source={
              state.index === state.routes.findIndex(r => r.name === "Play")
                ? icons.Play.active
                : icons.Play.inactive
            }
            style={{ width: 26, height: 26 }}
            resizeMode="contain"
          />
        </Pressable>
      </View>

      {/* tabs row: left group | spacer | right group */}
      <View style={[styles.row, { paddingBottom: insets.bottom }]}>
        <View style={styles.group}>{leftRoutes.map(renderTab)}</View>
        <View style={{ width: CENTER_SIZE + 24 }} />
        <View style={styles.group}>{rightRoutes.map(renderTab)}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
 row: {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  height: BAR_H,
  flexDirection: "row",
  alignItems: "flex-end",
  justifyContent: "space-between",
  paddingHorizontal: 20,
  paddingTop: ROW_TOP_PADDING,   // NEW
  backgroundColor: "transparent",
},
  group: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 34, // spacing between items in each group
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
  },
  label: { fontSize: 12, marginTop: 4 },
  labelActive: { color: "#FF3A57", fontWeight: "600" },
  labelInactive: { color: "#8E97AD", fontWeight: "500" },

  centerWrap: {
    position: "absolute",
    left: width / 2 - CENTER_SIZE / 2,
  },
  centerBtn: {
    width: CENTER_SIZE,
    height: CENTER_SIZE,
    borderRadius: CENTER_SIZE / 2,
    backgroundColor: "rgba(255,58,87,0.12)", // soft pink fill
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,58,87,0.35)",
    top: 20,
  },
});
