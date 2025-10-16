// pages/TeamSettingPage.tsx
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Hero from "../components/teamsetting/Hero";
import TeamCard from "../components/teamsetting/TeamCard";

export default function TeamSettingPage() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
    >
      <Hero backIcon={require("../assets/icons/back.png")} />

      <View style={styles.list}>
        <TeamCard
          name="Delhi Knight Fighters"
          caption="You are Captain on this team"
          image={require("../assets/team/bg1.jpg")}
          active={true}
        />
        <TeamCard
          name="Mumbai Tigers"
          caption="You are Captain on this team"
          image={require("../assets/team/bg2.jpg")}
          active={false}
        />
        <TeamCard
          name="Bengaluru Warriors"
          caption="You are Captain on this team"
          image={require("../assets/team/bg3.jpg")}
          active={true}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  list: { paddingHorizontal: 16, paddingTop: 10 },
});
