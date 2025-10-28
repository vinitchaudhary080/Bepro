import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  Image,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { TeamStackParamList } from "../../navigation/TeamStack";


type Props = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;  // "Create Team"
  onChanges?: () => void; // "Changes" CTA
  coinsRequired?: number; // default: 100
};

export default function CoinConfirmModal({
  visible,
  onClose,
  onConfirm,
  onChanges,
  coinsRequired = 100,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      {/* DIM BACKDROP */}
      <Pressable style={styles.backdrop} onPress={onClose} />

      {/* SHEET */}
      <View style={styles.sheetWrap} pointerEvents="box-none">
        <View style={styles.sheet}>
          {/* Close icon */}
          <Pressable onPress={onClose} style={styles.closeBtn} hitSlop={8}>
            <Image
              source={require("../../assets/icons/close.png")}
              style={{ width: 14, height: 14 }}
              resizeMode="contain"
            />
          </Pressable>

          {/* Illustration */}
          <Image
            source={require("../../assets/illustrations/coins.png")}
            style={styles.illus}
            resizeMode="contain"
          />

          {/* Title + Copy */}
          <Text style={styles.title}>
            You need {coinsRequired} Coins to create this team
          </Text>
          <Text style={styles.subtitle}>
            Coins cover creation costs and help us keep leagues fair and spam-free.
          </Text>

          {/* Primary CTA (solid color now) */}
          <Pressable
            onPress={onConfirm}
            style={({ pressed }) => [
              styles.primaryBtn,
              { opacity: pressed ? 0.9 : 1 },
            ]}
          >
            <Text style={styles.primaryText}>Create Team</Text>
          </Pressable>

          {/* Secondary CTA */}
          <Pressable
            onPress={onChanges}
            style={({ pressed }) => [
              styles.secondaryBtn,
              { opacity: pressed ? 0.9 : 1 },
            ]}
          >
            <Text style={styles.secondaryText}>Changes</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const SHEET_RADIUS = 20;

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  sheetWrap: {
    flex: 1,
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: SHEET_RADIUS,
    borderTopRightRadius: SHEET_RADIUS,
    paddingTop: 18,
    paddingBottom: Platform.OS === "ios" ? 28 : 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  closeBtn: {
    position: "absolute",
    right: 14,
    top: 14,
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#F5F7FA",
    alignItems: "center",
    justifyContent: "center",
  },
  illus: {
    width: 160,
    height: 110,
    marginTop: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0A0A0A",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: "#848C96",
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 18,
    paddingHorizontal: 8,
  },

  // 🔴 PRIMARY BUTTON (solid fill)
  primaryBtn: {
    width: "100%",             // full width ✅
    height: 52,
    borderRadius: 14,
    backgroundColor: "#F21D52", // solid color ✅
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  primaryText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  secondaryBtn: {
    width: "100%",
    height: 50,
    borderRadius: 14,
    backgroundColor: "#FFF1F3",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryText: {
    color: "#E94A5A",
    fontWeight: "700",
    fontSize: 15,
  },
});
