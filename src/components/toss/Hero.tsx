// components/toss/Hero.tsx
import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

type Props = {
  bg: any;
  /** default: true — pure page par full-screen cover */
  fullScreen?: boolean;
  children?: React.ReactNode;
};

export default function Hero({ bg, fullScreen = true, children }: Props) {
  return (
    <View style={[styles.wrap, fullScreen ? styles.full : styles.fixed]}>
      <ImageBackground
        source={bg}
        resizeMode="cover"
        style={StyleSheet.absoluteFillObject}
      />
      {/* optional overlay children (e.g., logos/text etc.) */}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: "#EAF0F7" },
  full: { ...StyleSheet.absoluteFillObject }, // 🔥 fills entire screen
  fixed: {
    width: "100%",
    height: 520, // fallback if kabhi fixed chaho
  },
});
