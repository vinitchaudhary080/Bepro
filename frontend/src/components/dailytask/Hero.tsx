// components/dailytask/Hero.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Platform,
  ImageSourcePropType,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

type Props = {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  backIcon?: ImageSourcePropType; // e.g. require("../../assets/icons/chevron-left.png")
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
};

export default function Hero({
  title = "Task",
  subtitle = "Lorem ipsum dolor sit amet consectetur. Enim varius pharetra et in arcu. Quisque nibh a porttitor",
  showBack = true,
  onBack,
  backIcon,
  containerStyle,
  titleStyle,
  subtitleStyle,
}: Props) {
  const navigation = useNavigation();

  const handleBack = () => {
    if (onBack) onBack();
    else navigation.goBack();
  };

  return (
    <View style={[styles.wrap, containerStyle]}>
      {/* Top Row: Back | Title | Spacer */}
      <View style={styles.topRow}>
        {showBack ? (
          <Pressable onPress={handleBack} style={styles.leftHitbox}>
            {backIcon ? (
              <Image source={backIcon} style={styles.backIcon} resizeMode="contain" />
            ) : (
              <Text style={styles.backFallback}>‹</Text>
            )}
          </Pressable>
        ) : (
          <View style={styles.leftHitbox} />
        )}

        <View style={styles.center}>
          <Text style={[styles.title, titleStyle]} numberOfLines={1}>
            {title}
          </Text>
        </View>

        <View style={styles.rightSpacer} />
      </View>

      {!!subtitle && <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>}
    </View>
  );
}

const ICON_BOX = 40;

const styles = StyleSheet.create({
  wrap: {
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 14,
    marginTop: 56,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  topRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  leftHitbox: {
    width: ICON_BOX,
    height: ICON_BOX,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  rightSpacer: { width: ICON_BOX, height: ICON_BOX },
  backIcon: { width: 20, height: 20 },
  backFallback: {
    fontSize: 28,
    lineHeight: Platform.select({ ios: 28, android: 30 }),
    color: "#0F172A",
    marginLeft: 2,
  },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: {
    fontWeight: Platform.select({ ios: "600", android: "700" }),
    fontSize: 18,
    color: "#0F172A",
  },
  subtitle: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 12,
    color: "#6B7280",
    lineHeight: 18,
    paddingHorizontal: 8,
  },
});
