import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  Animated,
  Easing,
  ScrollView,
  Image,
  Platform,
  ImageSourcePropType,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// reset icon asset (add in your project)
const RESET_ICON = require("../../assets/icons/reset.png");

type SectionKey = "Time" | "Match Type" | "Country" | "State" | "District" | "Default";

export type FilterSelections = Partial<Record<SectionKey, string>>;

type Props = {
  visible: boolean;
  onClose: () => void;
  onApply: (sel: FilterSelections) => void;
  resetIcon?: ImageSourcePropType; // optional override
  initial?: FilterSelections;
};

const PINK = "#F85C8A";
const PINK_BG = "rgba(253, 90, 120, 0.12)";
const CHIP_BG = "#F3F6FA";

const REAL_DATA: Record<SectionKey, string[]> = {
  Time: ["Morning", "Afternoon", "Evening"],
  "Match Type": ["Friendly", "League", "Knockout"],
  Country: ["India", "Nepal", "Sri Lanka"],
  State: ["Delhi", "Maharashtra", "Karnataka"],
  District: ["South Delhi", "Pune", "Bengaluru Urban"],
  Default: ["Type A", "Type B", "Type C"],
};

export default function FilterSheet({ visible, onClose, onApply, resetIcon, initial }: Props) {
  const insets = useSafeAreaInsets();
  const [sel, setSel] = useState<FilterSelections>(initial || {});
  const slide = useRef(new Animated.Value(0)).current;
  const backdrop = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slide, { toValue: 1, duration: 260, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
        Animated.timing(backdrop, { toValue: 1, duration: 200, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slide, { toValue: 0, duration: 220, easing: Easing.in(Easing.cubic), useNativeDriver: true }),
        Animated.timing(backdrop, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  const translateY = slide.interpolate({ inputRange: [0, 1], outputRange: [600, 0] });
  const backdropOpacity = backdrop.interpolate({ inputRange: [0, 1], outputRange: [0, 0.35] });

  const sections = useMemo(() => REAL_DATA, []);

  const toggle = (section: SectionKey, value: string) => {
    setSel((prev) => ({ ...prev, [section]: prev[section] === value ? "" : value }));
  };

  const resetAll = () => setSel({});
  const apply = () => onApply(sel);

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      {/* Backdrop */}
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose}>
        <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: "#000", opacity: backdropOpacity }]} />
      </Pressable>

      {/* Bottom sheet */}
      <Animated.View
        style={[
          styles.sheet,
          { paddingBottom: insets.bottom + 16, transform: [{ translateY }] },
        ]}
      >
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Filter</Text>
          <Text style={styles.desc}>
            Refine results by time, match type and location. Choose a single option in each section.
          </Text>

          {Object.entries(sections).map(([key, values]) => {
            const k = key as SectionKey;
            const current = sel[k] || "";
            return (
              <View key={k} style={{ marginTop: 16 }}>
                <Text style={styles.sectionLabel}>{k}</Text>
                <View style={styles.chipRow}>
                  {values.map((val) => {
                    const active = current === val;
                    return (
                      <Pressable
                        key={val}
                        onPress={() => toggle(k, val)}
                        style={({ pressed }) => [
                          styles.chip,
                          active && styles.chipActive,
                          pressed && { opacity: 0.9 },
                        ]}
                      >
                        <Text style={[styles.chipText, active && styles.chipTextActive]}>{val}</Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </ScrollView>

        {/* Bottom bar */}
        <View style={[styles.bottomBar, { paddingBottom: insets.bottom > 0 ? insets.bottom : 12 }]}>
          <Pressable onPress={resetAll} style={({ pressed }) => [styles.resetWrap, pressed && { opacity: 0.7 }]}>
            <Image
              source={resetIcon || RESET_ICON}
              style={{ width: 18, height: 18, marginRight: 8 }}
              resizeMode="contain"
            />
            <Text style={styles.resetText}>Reset all</Text>
          </Pressable>

          <Pressable onPress={apply} style={({ pressed }) => [styles.primaryBtn, pressed && { opacity: 0.9 }]}>
            <Text style={styles.primaryText}>Show Teams</Text>
          </Pressable>
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: -8 },
      },
      android: { elevation: 16 },
    }),
  },
  title: { fontSize: 18, fontWeight: "700", color: "#0F172A" },
  desc: { marginTop: 6, fontSize: 13, color: "#73809B" },

  sectionLabel: {
    fontSize: 13,
    color: "#7A8797",
    marginBottom: 10,
    fontWeight: "600",
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  chip: {
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: CHIP_BG,
    alignItems: "center",
    justifyContent: "center",
  },
  chipActive: {
    backgroundColor: PINK_BG,
    borderWidth: 1,
    borderColor: PINK,
  },
  chipText: { fontSize: 13, color: "#6B7A90", fontWeight: "600" },
  chipTextActive: { color: PINK },

  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: "#FFFFFF",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(0,0,0,0.06)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  resetWrap: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  resetText: { fontSize: 14, color: "#F85C8A", fontWeight: "700" },

  primaryBtn: {
    height: 46,
    paddingHorizontal: 22,
    borderRadius: 14,
    backgroundColor: "#F85C8A",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryText: { color: "#FFF", fontSize: 15, fontWeight: "700" },
});
