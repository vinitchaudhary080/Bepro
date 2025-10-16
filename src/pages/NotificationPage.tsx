// pages/NotificationPage.tsx
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Hero from "../components/notification/Hero";
import NotificationList from "../components/notification/NotificationList";

export default function NotificationPage() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
    >
      <Hero backIcon={require("../assets/icons/back.png")} />
      <NotificationList />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
});
