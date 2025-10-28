// pages/AboutAppPage.tsx
import React from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import Hero from "../components/about/Hero";

export default function AboutAppPage() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 28 }}
      showsVerticalScrollIndicator={false}
    >
      <Hero backIcon={require("../assets/icons/back.png")} />

      <View style={styles.sectionWrap}>
        {/* Section 1 */}
        <Text style={styles.h1}>What is this app?</Text>
        <Text style={styles.p}>
          This app helps local cricket teams organize matches, keep live scorecards, and
          reward players with coins for completing daily, weekly, and monthly tasks. Coins
          appear in your Wallet once tasks are verified and can be redeemed per the
          program rules.
        </Text>

        {/* Section 2 */}
        <Text style={styles.h1}>Key Features</Text>
        <Text style={styles.p}>
          • Create and manage matches with custom game rules and timings.{"\n"}
          • Real-time score updates and team announcements.{"\n"}
          • Task Center to track performance targets and earn coins.{"\n"}
          • Team permissions for captain/admin to control toss, scoring, and more.{"\n"}
          • Clean profiles with career highlights and notifications you can control.
        </Text>

        {/* Section 3 */}
        <Text style={styles.h1}>Privacy & Data</Text>
        <Text style={styles.p}>
          We store only the information needed to run your team and matches—such as name,
          basic profile, team membership, and match stats. You can edit your details any
          time from Profile → Edit Profile, or request data removal via Support.
        </Text>

        {/* Section 4 */}
        <Text style={styles.h1}>Contact & Support</Text>
        <Text style={styles.p}>
          For help, feedback, or partnership queries, go to Profile → About App →
          Contact Support. You can also reach us at support@yourapp.com.
        </Text>

        {/* Section 5 */}
        <Text style={styles.h1}>App Info</Text>
        <Text style={styles.p}>
          Version: 1.0.0{"\n"}
          Build: 100{"\n"}
          © {new Date().getFullYear()} YourApp. All rights reserved.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  sectionWrap: { paddingHorizontal: 16, paddingTop: 8 },
  h1: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 6,
    marginTop: 18,
  },
  p: {
    fontSize: 12,
    lineHeight: 20,
    color: "#6B7280",
  },
});
