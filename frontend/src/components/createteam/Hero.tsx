import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Hero() {
  const navigation = useNavigation();

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack(); // ✅ normal back
    } else {
      // ✅ fallback agar parent tab se direct open hua ho
      navigation.getParent()?.navigate("Team" as never, { screen: "MyTeam" } as never);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleBack} hitSlop={10}>
        <Image
          source={require("../../assets/icons/back.png")}
          style={styles.backIcon}
          resizeMode="contain"
        />
      </Pressable>

      <Text style={styles.title}>Create Team</Text>
      <Text style={styles.subtitle}>
        Lorem ipsum dolor sit amet consectetur. Enim velis pharetra eu ut in
        arcu. Quisque nibh a porttitor.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  backIcon: {
    width: 22,
    height: 22,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
    marginTop: 12,
  },
  subtitle: {
    color: "#777",
    fontSize: 14,
    marginTop: 6,
    lineHeight: 20,
  },
});
