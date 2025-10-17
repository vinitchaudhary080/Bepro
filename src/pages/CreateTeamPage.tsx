// src/pages/CreateTeamPage.tsx
import React, { useCallback } from "react";
import { View, ScrollView, StyleSheet, StatusBar } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import Hero from "../components/createteam/Hero";
import SearchBar from "../components/createteam/SearchBar";
import RecommendedPlayer from "../components/createteam/RecommendedPlayer";
import NewOnApp from "../components/createteam/NewOnApp";
import TopPlayer from "../components/createteam/TopPlayer";
import NextButton from "../components/createteam/NextButton";

export default function CreateTeamPage() {
  const navigation = useNavigation();

  // Hide tab bar on focus, restore on blur
  useFocusEffect(
    useCallback(() => {
      const parent = navigation.getParent?.();
      // Hide for default tab bar:
      parent?.setOptions({ tabBarStyle: { display: "none" } });
      // Hide for custom tab bar (like WavyTabBar):
      parent?.setOptions({ tabBar: () => null });

      return () => {
        // Restore defaults when leaving this screen
        parent?.setOptions({
          tabBarStyle: undefined, // back to whatever was set globally
          tabBar: undefined,      // back to global tabBar (e.g., WavyTabBar)
        });
      };
    }, [navigation])
  );

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Hero />
        <SearchBar />
        <RecommendedPlayer />
        <NewOnApp />
        <TopPlayer />
      </ScrollView>
      <NextButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
