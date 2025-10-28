// components/wallet/AddCoinButton.tsx
import React from "react";
import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { ProfileStackParamList } from "../../navigation/ProfileStack"; // ✅ assuming wallet inside Profile stack
import { fonts } from "../../theme/type";

export default function AddCoinButton() {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          // ✅ yahan tum future AddCoin screen ya popup navigation likh sakte ho
          console.log("Add Coin pressed");
          // navigation.navigate("AddCoinPage");
        }}
        style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
      >
        <LinearGradient
          colors={["#F21D52", "#C613B4"]} // 💎 cool blue→teal gradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <Text style={styles.text}>Add Coin</Text>
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
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 6 },
    }),
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontFamily: fonts.semibold,
  },
});
