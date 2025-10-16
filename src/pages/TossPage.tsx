// pages/TossPage.tsx
import React, { useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View, Alert } from "react-native";
import Hero from "../components/toss/Hero";
import TossChoice from "../components/toss/TossChoice";
import { useNavigation } from "@react-navigation/native";

export default function TossPage() {
  const navigation = useNavigation();
  const [bg] = useState(require("../assets/toss/toss-hero.png")); // <— put your image here

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.flex}>
        <Hero bg={bg} />
        <TossChoice
          onSelect={(ans) => {
            // yaha aap state/save/logic laga sakte ho
            Alert.alert("You chose", ans);
          }}
          onClose={() => navigation.goBack?.()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#EAF0F7" },
  flex: { flex: 1 },
});
