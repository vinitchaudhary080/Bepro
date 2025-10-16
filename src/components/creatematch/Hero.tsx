// components/creatematch/Hero.tsx
import React from "react";
import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { fonts } from "../../theme/type";

type Props = {
  title?: string;
  description?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  RightComponent?: React.ReactNode; // e.g. help icon / menu
};

export default function CreateMatchHero({
  title = "Create Match",
  description = "Lorem ipsum dolor sit amet consectetur. Enim varius pharetra ac ut in arcu. Quisque nibh a porttitor",
  showBack = true,
  onBackPress,
  RightComponent,
}: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleBack = () => {
    if (onBackPress) return onBackPress();
    if (navigation.canGoBack()) navigation.goBack();
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.topRow}>
        {/* Left: Back */}
        <View style={styles.sideBox}>
          {showBack ? (
            <Pressable hitSlop={10} onPress={handleBack} style={styles.backBtn}>
              {/* simple chevron without icon library */}
              <Text style={styles.backIcon}>‹</Text>
            </Pressable>
          ) : null}
        </View>

        {/* Center: Title */}
        <View style={styles.centerBox}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>

        {/* Right: optional action to keep title centered */}
        <View style={styles.sideBox}>{RightComponent ?? null}</View>
      </View>

      {description ? (
        <Text style={styles.desc} numberOfLines={2}>
          {description}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingTop: Platform.select({ ios: 8, android: 8 }),
    paddingHorizontal: 16,
    paddingBottom: 12,
    marginTop: 56,
    backgroundColor: "#FFFFFF",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sideBox: {
    width: 48, // keep title perfectly centered
    alignItems: "flex-start",
    justifyContent: "center",
  },
  backBtn: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    fontSize: 26,
    lineHeight: 26,
    color: "#0F1B33",
    marginTop: 2,
  },
  centerBox: { flex: 1, alignItems: "center", justifyContent: "center" },

  title: {
    fontSize: 28,
    color: "#0F1B33",
    fontFamily: fonts.semibold,
  },
  desc: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 16,
    color: "rgba(15,27,51,0.7)",
    fontFamily: fonts.regular,
    paddingHorizontal: 8,
  },
});
