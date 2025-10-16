// components/faq/Hero.tsx
import React from "react";
import { View, Text, StyleSheet, Pressable, Image, Platform, ImageSourcePropType } from "react-native";
import { useNavigation } from "@react-navigation/native";

type Props = {
  title?: string;
  subtitle?: string;
  backIcon?: ImageSourcePropType;
};

export default function Hero({
  title = "FAQs",
  subtitle = "Lorem ipsum dolor sit amet consectetur. Enim varius pharetra et in arcu. Quisque nibh a porttitor",
  backIcon,
}: Props) {
  const navigation = useNavigation();
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <Pressable onPress={() => navigation.goBack()} style={styles.hitbox}>
          {backIcon ? <Image source={backIcon} style={{ width: 20, height: 20 }} /> : <Text style={styles.chev}>‹</Text>}
        </Pressable>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
        </View>
        <View style={styles.hitbox} />
      </View>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: "#fff", paddingHorizontal: 16, paddingTop: 12, paddingBottom: 14, marginTop: 56 },
  row: { flexDirection: "row", alignItems: "center" },
  hitbox: { width: 40, height: 40, justifyContent: "center" },
  chev: { fontSize: 28, color: "#0F172A", lineHeight: Platform.select({ ios: 28, android: 30 }) },
  title: { fontSize: 18, color: "#0F172A", fontWeight: Platform.select({ ios: "600", android: "700" }) },
  subtitle: { marginTop: 8, textAlign: "center", fontSize: 12, color: "#6B7280", lineHeight: 18 },
});
