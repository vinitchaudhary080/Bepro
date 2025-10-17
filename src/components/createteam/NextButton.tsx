import React from "react";
import { View, Pressable, Text, StyleSheet, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function NextButton() {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => {}}>
        <LinearGradient
          colors={["#E94A5A", "#E94A5A"]}
          style={styles.button}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.text}>Next</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 30 : 20,
    alignSelf: "center",
  },
  button: {
    width: 320,
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
