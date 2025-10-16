import React from "react";
import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { fonts } from "../../theme/type";

export default function SetNextButton() {
  const navigation = useNavigation();

  const handlePress = () => {
    // Try nested navigation through the Tab parent.
    // NOTE: If your tab is not named "Play", change it below.
    const parent = (navigation as any).getParent?.();
    if (parent) {
      parent.navigate("Play", { screen: "FixTiming" }); // ✅ go to Play tab -> FixTiming
      return;
    }
    // Fallback (in case this component sits directly inside PlayStack)
    (navigation as any).navigate("FixTiming");
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress} style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}>
        <LinearGradient
          colors={["#F21D52", "#C613B4"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <Text style={styles.text}>Continue</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: Platform.select({ ios: 24, android: 16 }),
    left: 16,
    right: 16,
    zIndex: 999,
  },
  gradient: {
    height: 60,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOpacity: 0.25, shadowRadius: 6, shadowOffset: { width: 0, height: 4 } },
      android: { elevation: 6 },
    }),
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontFamily: fonts.semibold,
  },
});
