import React from "react";
import { View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { PlayStackParamList } from "../navigation/PlayStack"; // ✅ import type

import SetGameHero from "../components/creatematch/SetGameHero";
import RuleContent from "../components/creatematch/RuleContent";
import NextButton from "../components/creatematch/SetNextButton";

export default function SetGameRulesPage() {
  const navigation = useNavigation<NativeStackNavigationProp<PlayStackParamList>>();

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 140, paddingTop: 8 }}
        showsVerticalScrollIndicator={false}
      >
        <SetGameHero />
        <RuleContent />
      </ScrollView>

      {/* ✅ Navigate to FixTimingPage on button press */}
      <NextButton onPress={() => navigation.navigate("FixTiming")} />
    </View>
  );
}
