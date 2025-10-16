// pages/DailyTaskPage.tsx
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Hero from "../components/dailytask/Hero";
import CoinCard from "../components/dailytask/CoinCard";
import TaskListing from "../components/dailytask/TaskListing";
import TaskHistory, { TaskHistoryItem } from "../components/dailytask/TaskHistory";

export default function DailyTaskPage() {
  // 🔸 Realistic sample data
  const history: TaskHistoryItem[] = [
    { id: "1", date: "16/10/2025", task: "10 Runs in a Match", coin: 500, status: "Added" },
    { id: "2", date: "15/10/2025", task: "1 Wicket in a Match", coin: 300, status: "Added" },
    { id: "3", date: "14/10/2025", task: "Clean Fielding (3 catches)", coin: 450, status: "Added" },
    { id: "4", date: "13/10/2025", task: "Match Participation (Daily Bonus)", coin: 100, status: "Added" },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 28 }}
      showsVerticalScrollIndicator={false}
    >
      <Hero />

      <View style={styles.content}>
        <CoinCard
          title="Total Coin"
          amount={5756}
          icon={require("../assets/wallet/coin.png")}
          desc="Total coins available to redeem in rewards."
        />

        <TaskListing />

        <TaskHistory data={history} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  content: { paddingHorizontal: 16, paddingTop: 12, gap: 16 },
});
