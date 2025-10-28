// components/createteam/NextButton.tsx
import React from "react";
import { View, Pressable, Text, StyleSheet, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { TeamStackParamList } from "../../navigation/TeamStack";

export default function NextButton() {
  const navigation = useNavigation<NativeStackNavigationProp<TeamStackParamList>>();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate("CreateTeamDetail")} // 👈 go to details
        style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
      >
        <LinearGradient colors={["#E94A5A", "#E94A5A"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.button}>
          <Text style={styles.text}>Next</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { position: "absolute", bottom: Platform.OS === "ios" ? 30 : 20, alignSelf: "center" },
  button: { width: 320, height: 52, borderRadius: 14, justifyContent: "center", alignItems: "center" },
  text: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
