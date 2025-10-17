import React from "react";
import { View, Pressable, Text, StyleSheet, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type Props = { disabled?: boolean; onPress: () => void };

export default function CreateTeamButton({ disabled, onPress }: Props) {
  return (
    <View style={styles.container}>
      <Pressable disabled={disabled} onPress={onPress} style={({ pressed }) => [{ opacity: pressed ? 0.95 : 1 }]}>
        <LinearGradient
          colors={disabled ? ["#F1B3BA", "#F1B3BA"] : ["#E94A5A", "#E94A5A"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.btn}
        >
          <Text style={styles.text}>Create Team</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: Platform.OS === "ios" ? 28 : 20,
    alignItems: "center",
  },
  btn: {
    width: 320,
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  text: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
