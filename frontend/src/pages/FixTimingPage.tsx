// pages/FixTimingPage.tsx
import React from "react";
import { View } from "react-native";
import FixTimingHero from "../components/creatematch/FixTimingHero";
import FixTimingContent from "../components/creatematch/FixTimingContent";
import FixButton from "../components/creatematch/FixButton";

export default function FixTimingPage() {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FixTimingHero />
      <FixTimingContent />
      <FixButton />
      
    </View>
  );
}
