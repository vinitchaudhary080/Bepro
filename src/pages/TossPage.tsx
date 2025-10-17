// pages/TossPage.tsx
import React, { useMemo } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  Alert,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // ✅
import TossChoice from "../components/toss/TossChoice";

const BG = require("../assets/toss/toss-hero.png");

export default function TossPage() {
  // ✅ navigation hook (type-any to avoid TS type issues)
  const navigation = useNavigation<any>();

  const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");

  // 👉 foreground image ko "fit-height" kar rahe hain, taaki full image bina crop ke dikhe
  const fgStyle = useMemo(() => {
    const src = Image.resolveAssetSource(BG);
    const aspect = src.width / src.height; // w/h
    const fgW = SCREEN_H * aspect;         // height fit → width = H * aspect
    const left = (SCREEN_W - fgW) / 2;     // horizontally center
    return { width: fgW, height: SCREEN_H, left };
  }, [SCREEN_W, SCREEN_H]);

  const handleClose = () => {
    if (navigation?.canGoBack?.()) navigation.goBack();
    else navigation?.navigate?.("Home"); // fallback if needed
  };

  return (
    <View style={styles.root}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
      />

      {/* 1) BLURRED FILL (cover) -> gaps hide + nice look */}
      <Image
        source={BG}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
        blurRadius={18}
      />

      {/* 2) FOREGROUND MAIN ART (fit-height box) -> no crop, bottom anchored */}
      <Image
        source={BG}
        resizeMode="cover"
        style={[styles.fg, fgStyle]}
      />

      {/* Bottom sheet */}
      <View style={styles.sheetHost}>
        <TossChoice
          onSelect={(ans) => Alert.alert("You chose", ans)}
          onClose={handleClose} // ✅ back on close
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000", // behind-image fallback
  },
  fg: {
    position: "absolute",
    bottom: 0, // 📌 image bottom align (like your ref)
  },
  sheetHost: {
    flex: 1,
    justifyContent: "flex-end", // keep sheet at bottom
  },
});
