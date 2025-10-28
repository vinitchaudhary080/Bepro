import React from "react";
import { Text, Pressable, StyleSheet, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { PlayStackParamList } from "../../navigation/PlayStack"; // 👈 use your PlayStack types

export default function FloatingButton() {
  // ✅ navigation type-safe with PlayStack
  const navigation = useNavigation<NativeStackNavigationProp<PlayStackParamList>>();

  return (
    <Pressable
      style={styles.wrapper}
      onPress={() => navigation.navigate("CreateMatch")} // ✅ screen inside PlayStack
    >
      <LinearGradient
        colors={["#F21D52", "#C613B4"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Text style={styles.label}>Create Match</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    right: 20,
    bottom: 30,
    zIndex: 99,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 6 },
    }),
  },
  gradient: {
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 28,
  },
  label: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
});
