// components/toss/Hero.tsx
import React from "react";
import { ImageBackground, StyleSheet, View, Dimensions } from "react-native";

type Props = {
  /** put your image here, e.g. require("../../assets/toss/toss-hero.png") */
  bg: any;
};

const { width, height } = Dimensions.get("window");
const HERO_H = Math.min(height * 0.58, 920); // roughly as per ref

export default function Hero({ bg }: Props) {
  return (
    <View style={styles.wrap}>
      <ImageBackground source={bg} resizeMode="cover" style={styles.bg} />
      {/* tiny grabber mimic on top of sheet (will align visually with TossChoice) */}
      <View pointerEvents="none" style={styles.grabberShadow}>
        <View style={styles.grabber} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width,
    height: HERO_H,
    backgroundColor: "#EAF0F7",
  },
  bg: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  grabberShadow: {
    position: "absolute",
    bottom: -8,
    width: "100%",
    alignItems: "center",
  },
  grabber: {
    width: 88,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(0,0,0,0.08)",
  },
});
