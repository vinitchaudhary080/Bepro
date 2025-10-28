// components/creatematch/FixTimingHero.tsx
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
  RightComponent?: React.ReactNode;
};

export default function FixTimingHero({
  title = "Fix Timing",
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
    <View style={styles.container}>
      <View style={styles.row}>
        {/* Left: Back */}
        <View style={styles.sideBox}>
          {showBack ? (
            <Pressable hitSlop={10} onPress={handleBack} style={styles.backBtn}>
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

        {/* Right: optional spacer/action */}
        <View style={styles.sideBox}>{RightComponent ?? null}</View>
      </View>

      {!!description && (
        <Text style={styles.desc} numberOfLines={2}>
          {description}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: Platform.select({ ios: 8, android: 8 }),
    paddingBottom: 12,
    marginTop: 56,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sideBox: {
    width: 48, // keeps title perfectly centered
    alignItems: "flex-start",
    justifyContent: "center",
  },
  backBtn: {
    height: 40, width: 40, borderRadius: 20,
    alignItems: "center", justifyContent: "center",
  },
  backIcon: {
    fontSize: 26, lineHeight: 26, color: "#0F1B33", marginTop: 2,
  },
  centerBox: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 20, color: "#0F1B33", fontFamily: fonts.semibold },
  desc: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 13,
    color: "rgba(15,27,51,0.7)",
    fontFamily: fonts.regular,
    paddingHorizontal: 8,
  },
});
