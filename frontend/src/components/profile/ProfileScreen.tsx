// components/profile/ProfileScreen.tsx
import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type MenuItem = {
  key: string;
  label: string;
  icon: any;               // require("../../assets/.../icon.png")
  onPress?: () => void;
  disabled?: boolean;      // optional (for greyed look)
};

type Props = {
  // Profile
  name?: string;
  location?: string;
  role?: string;           // e.g. "Left Hand Batsman | Right Arm Off Break"
  avatar?: any;            // require("...")

  // Icons
  chevronIcon?: any;       // right arrow icon
  locationIcon?: any;      // small location dot icon
  roleIcon?: any;          // small role/badge icon

  // Menus
  items?: MenuItem[];
};

export default function ProfileScreen({
  name = "Manoj Tiwari",
  location = "Bengaluru, Karnataka, India",
  role = "Left Hand Batsman | Right Arm Off Break",
  avatar = require("../../assets/avatars/avatar.jpg"), // ⬅️ replace
  chevronIcon = require("../../assets/icons/chevron-right.png"),
  locationIcon = require("../../assets/icons/location-dot.png"),
  roleIcon = require("../../assets/icons/badge.png"),
  items,
}: Props) {
  const insets = useSafeAreaInsets();

  // Default menu list (same order as screenshot)
  const menu: MenuItem[] =
    items ??
    [
      { key: "my-profile", label: "My Profile", icon: require("../../assets/icons/user.png") },
      { key: "wallet", label: "Wallet", icon: require("../../assets/icons/wallet.png") },
      { key: "toss", label: "Toss", icon: require("../../assets/icons/toss.png") },
      { key: "daily-task", label: "Daily Task", icon: require("../../assets/icons/task.png") },
      { key: "permission", label: "Permission", icon: require("../../assets/icons/permission.png") },
      { key: "team-setting", label: "Team Setting", icon: require("../../assets/icons/team-setting.png") },
      { key: "setting", label: "Setting", icon: require("../../assets/icons/setting.png") },
      { key: "notifications", label: "Notifications", icon: require("../../assets/icons/bellp.png") },
      { key: "faqs", label: "FAQs", icon: require("../../assets/icons/faq.png") },
      { key: "about-app", label: "About App", icon: require("../../assets/icons/info.png") },
      { key: "logout", label: "Logout", icon: require("../../assets/icons/logout.png") },
    ];

  return (
    <View style={[styles.root, { paddingTop: insets.top + 8 }]}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Profile Card */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Image source={avatar} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{name}</Text>

              <View style={styles.metaRow}>
                <Image source={locationIcon} style={styles.metaIcon} />
                <Text style={styles.metaText} numberOfLines={1}>
                  {location}
                </Text>
              </View>

              <View style={[styles.metaRow, { marginTop: 6 }]}>
                <Image source={roleIcon} style={styles.metaIcon} />
                <Text style={styles.metaText} numberOfLines={1}>
                  {role}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Menu List */}
        <View style={styles.list}>
          {menu.map((it, idx) => {
            const isLast = idx === menu.length - 1;
            return (
              <View key={it.key}>
                <Pressable
                  onPress={it.onPress}
                  disabled={it.disabled}
                  style={({ pressed }) => [
                    styles.item,
                    it.disabled && { opacity: 0.5 },
                    pressed && { opacity: 0.92 },
                  ]}
                >
                  <View style={styles.itemLeft}>
                    <Image source={it.icon} style={styles.itemIcon} />
                    <Text style={styles.itemLabel}>{it.label}</Text>
                  </View>
                  <Image source={chevronIcon} style={styles.chev} />
                </Pressable>

                {!isLast && <View style={styles.divider} />}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const CARD_BG = "#FFFFFF";
const SCREEN_BG = "#F7F9FC"; // very light
const TEXT_PRIMARY = "#1C2433";
const TEXT_MUTED = "#6F7D95";
const TINT_SOFT = "#7C8EC5"; // soft blue-ish (as in screenshot)
const DIVIDER = "rgba(28,36,51,0.06)";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: SCREEN_BG,
  },
  card: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    padding: 16,
    ...shadow(12),
  },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: "#E9EFF7",
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: TEXT_PRIMARY,
    marginBottom: 6,
  },
  metaRow: { flexDirection: "row", alignItems: "center" },
  metaIcon: { width: 14, height: 14, marginRight: 8, tintColor: TINT_SOFT, opacity: 0.9 },
  metaText: {
    flex: 1,
    fontSize: 12.5,
    color: TEXT_MUTED,
  },

  list: {
    marginTop: 16,
    backgroundColor: CARD_BG,
    borderRadius: 16,
    ...shadow(10),
    overflow: "hidden",
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: CARD_BG,
  },
  itemLeft: { flexDirection: "row", alignItems: "center" },
  itemIcon: {
    width: 22,
    height: 22,
    marginRight: 12,
    tintColor: TINT_SOFT, // light desaturated like screenshot
    opacity: 0.9,
  },
  itemLabel: {
    fontSize: 14.5,
    color: "#6272A0",
    fontWeight: Platform.OS === "ios" ? "600" : "500",
  },
  chev: { width: 18, height: 18, tintColor: "#A9B6D3", opacity: 0.9 },

  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: DIVIDER,
    marginLeft: 50, // aligns under labels (leaves icon area untouched)
  },
});

// cross-platform soft shadow
function shadow(elev: number) {
  if (Platform.OS === "android") {
    return { elevation: elev };
  }
  // iOS shadow
  return {
    shadowColor: "#001029",
    shadowOpacity: 0.08,
    shadowRadius: Math.max(8, elev / 1.5),
    shadowOffset: { width: 0, height: 6 },
  };
}
