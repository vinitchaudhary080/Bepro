// components/dailytask/TaskListing.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Image, FlatList, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

type TaskItem = {
  id: string;
  title: string;
  desc: string;
  icon: any; // ImageSourcePropType
};

export default function TaskListing() {
  const [activeTab, setActiveTab] = useState<"Daily" | "Weekly" | "Monthly">("Daily");

  // 🗓 Mock data
  const DATA: Record<typeof activeTab, TaskItem[]> = {
    Daily: [
      {
        id: "1",
        title: "10 Runs in a Match",
        desc: "Score 10 or more runs in any match.",
        icon: require("../../assets/tasks/batsman.png"),
      },
      {
        id: "2",
        title: "1 Wicket in a Match",
        desc: "Take at least one wicket in a match.",
        icon: require("../../assets/tasks/bowler.png"),
      },
    ],
    Weekly: [
      {
        id: "3",
        title: "50 Runs This Week",
        desc: "Accumulate 50 runs across matches this week.",
        icon: require("../../assets/tasks/batsman2.png"),
      },
      {
        id: "4",
        title: "5 Wickets This Week",
        desc: "Take 5 wickets across any matches this week.",
        icon: require("../../assets/tasks/bowler2.png"),
      },
    ],
    Monthly: [
      {
        id: "5",
        title: "200 Runs in a Month",
        desc: "Achieve 200 runs total this month.",
        icon: require("../../assets/tasks/batsman3.png"),
      },
      {
        id: "6",
        title: "15 Wickets in a Month",
        desc: "Take 15 wickets total this month.",
        icon: require("../../assets/tasks/bowler3.png"),
      },
    ],
  };

  const renderItem = ({ item }: { item: TaskItem }) => (
    <View style={styles.card}>
      <Image source={item.icon} style={styles.cardImage} resizeMode="contain" />
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDesc}>{item.desc}</Text>
    </View>
  );

  return (
    <View style={styles.wrap}>
      {/* Tabs */}
      <View style={styles.tabs}>
        {(["Daily", "Weekly", "Monthly"] as const).map((tab) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[
              styles.tabBtn,
              activeTab === tab && styles.tabActive,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.tabTextActive,
              ]}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Section heading */}
      {/* <Text style={styles.heading}>Task Listing</Text> */}

      {/* Cards */}
      <FlatList
        data={DATA[activeTab]}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingTop: 12 }}
        scrollEnabled={false}
      />
    </View>
  );
}

const CARD_W = (width - 16 * 2 - 12) / 2;

const styles = StyleSheet.create({
  wrap: {
    marginTop: 12,
    paddingHorizontal: 16,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 14,
  },
  tabBtn: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
  },
  tabActive: {
    backgroundColor: "#F8E3E8",
    borderColor: "#F21D52",
  },
  tabText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  tabTextActive: {
    color: "#F21D52",
    fontWeight: "600",
  },
  heading: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 6,
  },
  card: {
    width: CARD_W,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
    textAlign: "center",
  },
  cardDesc: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 4,
  },
});
