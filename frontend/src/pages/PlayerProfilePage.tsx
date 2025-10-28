// pages/PlayerProfilePage.tsx
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Pressable, Text, View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "../navigation/HomeStack";
import Hero from "../components/playerprofile/Hero";
import ProfileCard from "../components/playerprofile/ProfileCard";
import Matches from "../components/playerprofile/tabs/Matches";
import Stats from "../components/playerprofile/tabs/Stats";
import Awards from "../components/playerprofile/tabs/Awards";
import Team from "../components/playerprofile/tabs/Team";
import Badges from "../components/playerprofile/tabs/Badges";

type TabKey = "Matches" | "Stats" | "Awards" | "Team" | "Badges";

export default function PlayerProfilePage() {
  // 👇 define navigation properly
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const [tab, setTab] = useState<TabKey>("Matches");

  const renderContent = () => {
    switch (tab) {
      case "Matches":
        return <Matches />;
      case "Awards":
        return <Awards />;
      case "Team":
        return <Team />;
      case "Stats":
        return (
          <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
            <Stats />
          </ScrollView>
        );
      case "Badges":
        return (
          <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
            <Badges />
          </ScrollView>
        );
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <Hero
        bgImage={require("../assets/fixtures/stadium.jpg")}
        onBack={() => {
          if (navigation.canGoBack?.()) navigation.goBack();
          else navigation.getParent()?.goBack?.();
        }}
      />

      <ProfileCard />

      {/* Tabs */}
      <View style={styles.tabs}>
        {(["Matches", "Stats", "Awards", "Team", "Badges"] as TabKey[]).map((t) => (
          <Pressable
            key={t}
            onPress={() => setTab(t)}
            style={[styles.tab, tab === t && styles.tabActive]}
          >
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>{t}</Text>
          </Pressable>
        ))}
      </View>

      {/* Content */}
      <View style={{ flex: 1 }}>{renderContent()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F7F9FC" },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 6,
  },
  tab: { flex: 1, alignItems: "center", paddingVertical: 10, borderRadius: 8 },
  tabActive: { backgroundColor: "rgba(233,74,90,0.08)" },
  tabText: { color: "#666", fontWeight: "600" },
  tabTextActive: { color: "#E94A5A" },
});
