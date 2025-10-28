// pages/PermissionPage.tsx
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Hero from "../components/permission/Hero";
import PermissionList from "../components/permission/PermissionList";

export default function PermissionPage() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
    >
      <Hero backIcon={require("../assets/icons/back.png")} />

      <View style={{ marginTop: 4 }}>
        <PermissionList />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
});
