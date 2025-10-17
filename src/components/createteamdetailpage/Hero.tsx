import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Hero() {
  const navigation = useNavigation();

  const handleBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
    else navigation.getParent()?.navigate("Team" as never, { screen: "MyTeam" } as never);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleBack} hitSlop={10}>
        <Image source={require("../../assets/icons/back.png")} style={{ width: 22, height: 22 }} />
      </Pressable>

      <Text style={styles.title}>Team with 10 Players</Text>
      <Text style={styles.subtitle}>
        Create your official team profile—add a display photo, pick a logo, and set the basics so
        players can find and join your squad.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingTop: 60 },
  title: { fontSize: 22, fontWeight: "700", color: "#0A0A0A", marginTop: 12 },
  subtitle: { color: "#7A7F87", fontSize: 14, marginTop: 6, lineHeight: 20 },
});
