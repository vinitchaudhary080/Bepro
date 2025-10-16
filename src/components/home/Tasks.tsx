import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { fonts } from "../../theme/type";
import { colors } from "../../theme/colors";

const { width } = Dimensions.get("window");

const CARD_W = 160;
const CARD_H = 180;
const RADIUS = 16;
const GUTTER = 14;

const tasksData = {
  daily: [
    {
      id: 1,
      title: "Score 15 Runs in a Match",
      desc: "Prove your batting consistency by hitting those quick runs.",
      color1: "#0285FF",
      color2: "#0059D6",
    },
    {
      id: 2,
      title: "Hit 3 Boundaries in 10 Balls",
      desc: "Show your power play skills — go big in limited chances!",
      color1: "#6C2CFB",
      color2: "#3313A1",
    },
    {
      id: 3,
      title: "Take 2 Wickets in a Match",
      desc: "Lead your bowling attack with precision and power!",
      color1: "#FF3A57",
      color2: "#D82040",
    },
  ],
  weekly: [
    {
      id: 1,
      title: "Take 5 Wickets This Week",
      desc: "Be the game changer your team needs!",
      color1: "#F93A3A",
      color2: "#C91E1E",
    },
    {
      id: 2,
      title: "Win 2 Consecutive Matches",
      desc: "Consistency defines champions!",
      color1: "#00CBA8",
      color2: "#009F86",
    },
    {
      id: 3,
      title: "Score 100 Runs This Week",
      desc: "Maintain your form and push for a top performance!",
      color1: "#FF7A00",
      color2: "#D45C00",
    },
  ],
  monthly: [
    {
      id: 1,
      title: "Score 200 Runs This Month",
      desc: "Keep building the scoreboard all month long!",
      color1: "#FF7A00",
      color2: "#D45C00",
    },
    {
      id: 2,
      title: "Play 10 Matches",
      desc: "Keep the momentum going — more matches, more experience.",
      color1: "#A84FF8",
      color2: "#6B1DE4",
    },
    {
      id: 3,
      title: "Earn Player of the Month",
      desc: "Show consistency, dedication and sportsmanship.",
      color1: "#0285FF",
      color2: "#0059D6",
    },
  ],
};

export default function TasksSection() {
  const [activeTab, setActiveTab] = useState<"daily" | "weekly" | "monthly">(
    "daily"
  );

  const renderCard = ({ item }: any) => (
    <View style={styles.cardWrap}>
      <LinearGradient
        colors={[item.color1, item.color2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardGradient}
      >
        {/* overlay white image */}
        <Image
          source={require("../../assets/home/white.png")}
          style={styles.overlayImage}
          resizeMode="cover"
        />

        {/* card content */}
        <View style={styles.cardContent}>
          {/* 👇 icon above heading */}
          <Image
            source={require("../../assets/icons/ball.png")}
            style={styles.cardIcon}
            resizeMode="contain"
          />

          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDesc}>{item.desc}</Text>
        </View>
      </LinearGradient>
    </View>
  );

  const tabs = [
    { key: "daily", label: "Daily Task" },
    { key: "weekly", label: "Weekly Task" },
    { key: "monthly", label: "Monthly Task" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Tasks</Text>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab;
          return (
            <Pressable
              key={tab.key}
              onPress={() => setActiveTab(tab.key as any)}
              style={({ pressed }) => [
                styles.tabBase,
                isActive ? styles.tabActive : styles.tabInactive,
                pressed && { transform: [{ scale: 0.98 }] },
              ]}
            >
              <Text
                style={[
                  styles.tabTextBase,
                  isActive ? styles.tabTextActive : styles.tabTextInactive,
                ]}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Task Cards */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={tasksData[activeTab]}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ItemSeparatorComponent={() => <View style={{ width: GUTTER }} />}
      />
    </View>
  );
}

/* ---------------- styles ---------------- */

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  sectionTitle: {
    marginLeft: 16,
    marginBottom: 12,
    fontSize: 18,
    color: "#0E1628",
    fontFamily: fonts.semibold,
  },

  /* ---- Tabs ---- */
  tabRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 14,
    gap: 10,
  },
  tabBase: {
    minHeight: 34,
    borderRadius: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
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
  tabTextBase: {
    fontSize: 13,
    fontFamily: fonts.semibold,
  },
  tabTextInactive: {
    color: "#6677A1",
  },
  tabTextActive: {
    color: "#FF3A57",
  },

  /* ---- Cards ---- */
  cardWrap: {
    width: CARD_W,
    height: CARD_H,
    borderRadius: RADIUS,
    overflow: "hidden",
  },
  cardGradient: {
    flex: 1,
    borderRadius: RADIUS,
    overflow: "hidden",
  },
  overlayImage: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: RADIUS,
    opacity: 0.80, // if too strong, try 0.3–0.5
  },
  cardContent: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 14,
    paddingTop: 28, // space for icon + title
  },
  // 👇 icon above heading
  cardIcon: {
    width: 36,
    height: 36,
    marginBottom: 10,
    alignSelf: "flex-start",
    // optional soft backdrop to make it pop on bright gradients:
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 18,
    padding: 6,
    overflow: "hidden",
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontFamily: fonts.semibold,
    marginBottom: 6,
  },
  cardDesc: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 12,
    fontFamily: fonts.regular,
  },
});
