// pages/NotificationPanelPage.tsx
import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import Hero from "../components/notificationpanel/Hero";
import NotificationsListing from "../components/notificationpanel/NotificationsListing";
import { useNavigation } from "@react-navigation/native";

export default function NotificationPanelPage() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.root}>
      <Hero onBack={() => navigation.goBack()} />
      <View style={{ flex: 1 }}>
        <NotificationsListing />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#FFFFFF" },
});
