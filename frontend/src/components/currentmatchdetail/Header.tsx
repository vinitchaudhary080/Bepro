import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Header({ title, subtitle }: { title: string; subtitle: string }) {
  const navigation = useNavigation();

  return (
    <View style={styles.wrap}>
      {/* 🔙 Back button */}
      <Pressable
        onPress={() => navigation.goBack()}
        style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }, styles.backBtn]}
      >
        <Image
          source={require("../../assets/icons/back.png")}
          style={styles.backIcon}
          resizeMode="contain"
        />
      </Pressable>

      {/* Title & Subtitle */}
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.sub} numberOfLines={2}>
          {subtitle}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
    marginTop: 56,
    paddingHorizontal: 16, // ✅ same horizontal margin as other sections
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F4F7",
  },
  backIcon: {
    width: 16,
    height: 16,
    tintColor: "#0D1B2A",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0D1B2A",
    letterSpacing: 0.3,
  },
  sub: {
    fontSize: 12,
    color: "#6C7A91",
  },
});
