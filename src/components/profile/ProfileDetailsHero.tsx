// components/profile/ProfileDetailsHero.tsx
import React from "react";
import {
  View,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

type Props = {
  photo: ImageSourcePropType;     // full-bleed hero image
  backIcon: ImageSourcePropType;  // left arrow icon
  height?: number;                // optional: hero height
  onBack?: () => void;            // optional: custom back
};

export default function ProfileDetailsHero({
  photo,
  backIcon,
  height = 240,
  onBack,
}: Props) {
  const insets = useSafeAreaInsets();
  const nav = useNavigation();

  const handleBack = () => {
    if (onBack) return onBack();
    // default: go back; if not possible, navigate to Profile tab
    // @ts-ignore
    if (nav.canGoBack?.()) nav.goBack();
    else {
      // @ts-ignore
      nav.navigate?.("Profile");
    }
  };

  return (
    <View style={[styles.wrap, { height }]}>
      {/* Hero Image */}
      <Image source={photo} style={StyleSheet.absoluteFillObject as any} resizeMode="cover" />

      {/* Top gradient for better icon visibility */}
      <View
        pointerEvents="none"
        style={[
          styles.topFade,
          { paddingTop: insets.top > 0 ? insets.top : 8 },
        ]}
      />

      {/* Back Button */}
      <Pressable
        onPress={handleBack}
        style={({ pressed }) => [
          styles.backBtn,
          { top: (insets.top || 8) + 8 },
          pressed && { opacity: 0.85 },
        ]}
        android_ripple={{ color: "rgba(255,255,255,0.2)", borderless: true }}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <Image source={backIcon} style={styles.backIcon} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
    backgroundColor: "#000",
    overflow: "hidden",
  },
  topFade: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 96,
    backgroundColor:
      Platform.OS === "ios"
        ? "rgba(0,0,0,0.15)"
        : "rgba(0,0,0,0.22)", // subtle for icon contrast
  },
  backBtn: {
    position: "absolute",
    left: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.28)",
  },
  backIcon: {
    width: 18,
    height: 18,
    tintColor: "#FFFFFF",
  },
});
