// pages/FAQPage.tsx
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Hero from "../components/faq/Hero";
import FAQList from "../components/faq/FAQList";

export default function FAQPage() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
    >
      <Hero backIcon={require("../assets/icons/back.png")} />
      <FAQList />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
});
