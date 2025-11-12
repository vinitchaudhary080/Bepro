import React, { useEffect, useState, useCallback } from "react";
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
import { api } from "../../config/api"; // ✅ use same API wrapper as TopPlayers

const { width } = Dimensions.get("window");

const CARD_W = 160;
const CARD_H = 180;
const RADIUS = 16;
const GUTTER = 14;

type Frequency = "DAILY" | "WEEKLY" | "MONTHLY";
type TabKey = "daily" | "weekly" | "monthly";

type ApiTask = {
  id: string;
  frequency: Frequency;
  status: "PENDING" | "COMPLETED" | string;
  points: number;
  title: string;
  description: string;
  periodStart: string;
  periodEnd: string;
  completedAt: string | null;
};

type UITask = {
  id: string;
  title: string;
  desc: string;
  color1: string;
  color2: string;
  status: string;
  points: number;
};

const FREQUENCY_COLORS: Record<Frequency, { color1: string; color2: string }> = {
  DAILY:   { color1: "#0285FF", color2: "#0059D6" },
  WEEKLY:  { color1: "#00CBA8", color2: "#009F86" },
  MONTHLY: { color1: "#FF7A00", color2: "#D45C00" },
};

const TAB_TO_FREQ: Record<TabKey, Frequency> = {
  daily: "DAILY",
  weekly: "WEEKLY",
  monthly: "MONTHLY",
};

export default function TasksSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("daily");

  const [tasksByFrequency, setTasksByFrequency] = useState<
    Record<Frequency, UITask[]>
  >({
    DAILY: [],
    WEEKLY: [],
    MONTHLY: [],
  });

  const [loading, setLoading] = useState(false);

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get<any>("/tasks/today");

      // API response: { success: true, data: ApiTask[] }
      const items: ApiTask[] = data?.data || [];

      const grouped: Record<Frequency, UITask[]> = {
        DAILY: [],
        WEEKLY: [],
        MONTHLY: [],
      };

      items.forEach((t) => {
        const freq = t.frequency as Frequency;
        if (!grouped[freq]) return;

        const colorsCfg = FREQUENCY_COLORS[freq];

        grouped[freq].push({
          id: t.id,
          title: t.title,
          desc: t.description,
          color1: colorsCfg.color1,
          color2: colorsCfg.color2,
          status: t.status,
          points: t.points,
        });
      });

      setTasksByFrequency(grouped);
    } catch (err: any) {
      console.log(
        "🚨 [TasksSection] Error fetching /tasks/today:",
        err?.status,
        err?.message
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const renderCard = ({ item }: { item: UITask }) => (
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
          {/* icon above heading */}
          <Image
            source={require("../../assets/icons/ball.png")}
            style={styles.cardIcon}
            resizeMode="contain"
          />

          <Text style={styles.cardTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.cardDesc} numberOfLines={3}>
            {item.desc}
          </Text>
        </View>
      </LinearGradient>
    </View>
  );

  const tabs: { key: TabKey; label: string }[] = [
    { key: "daily", label: "Daily Task" },
    { key: "weekly", label: "Weekly Task" },
    { key: "monthly", label: "Monthly Task" },
  ];

  const currentFreq = TAB_TO_FREQ[activeTab];
  const currentTasks = tasksByFrequency[currentFreq] || [];

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
              onPress={() => setActiveTab(tab.key)}
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
        data={currentTasks}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ItemSeparatorComponent={() => <View style={{ width: GUTTER }} />}
        ListEmptyComponent={
          !loading ? (
            <Text style={styles.emptyText}>No tasks available.</Text>
          ) : null
        }
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
    opacity: 0.8,
  },
  cardContent: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 14,
    paddingTop: 28,
  },
  cardIcon: {
    width: 36,
    height: 36,
    marginBottom: 10,
    alignSelf: "flex-start",
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
  emptyText: {
    paddingHorizontal: 16,
    fontSize: 13,
    color: "#858CAB",
    fontFamily: fonts.regular,
  },
});
