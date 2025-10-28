// components/notificationpanel/NotificationsListing.tsx
import React, { useMemo } from "react";
import { View, Text, StyleSheet, FlatList, Image, Pressable } from "react-native";

type ActionItem = {
  id: string;
  type: "request" | "text" | "cta" | "comment";
  avatar?: any;
  title: string;
  subtitle?: string;
  time: string;
  pillBg?: string;
  onAccept?: () => void;
  onDecline?: () => void;
  onPress?: () => void;
  ctaLabel?: string;
  quote?: string;
};

type Props = { data?: ActionItem[] };

export default function NotificationsListing({ data }: Props) {
  const items = useMemo<ActionItem[]>(
    () =>
      data ?? [
        {
          id: "1",
          type: "request",
          avatar: require("../../assets/avatars/team1.png"),
          title:
            "Delhi Team is requesting to a T20 Match on 20 June 2025 | 10:00AM at sector 19 Stadium.",
          time: "2m",
          pillBg: "rgba(249, 64, 64, 0.08)",
        },
        {
          id: "2",
          type: "request",
          avatar: require("../../assets/avatars/team2.png"),
          title: "Galiboy Team is requesting to add you on their team.",
          time: "2m",
        },
        {
          id: "3",
          type: "comment",
          avatar: require("../../assets/avatars/user1.png"),
          title:
            "Patrick won an award in Delhi vs Mumbai match - Best Batsman Award 🏆",
          time: "8h",
          quote: "“Looks perfect, Lorem ipsum donor is simple dummy text!”",
        },
        {
          id: "4",
          type: "cta",
          avatar: require("../../assets/avatars/app.png"),
          title:
            "Start the match now! We’ve introduced the latest enhancements.",
          time: "14h",
          ctaLabel: "Toss now!",
        },
        {
          id: "5",
          type: "text",
          avatar: require("../../assets/avatars/user2.png"),
          title:
            "Steve and 8 others added comments on Design Assets – Smart Tags file",
          time: "15h",
        },
      ],
    [data]
  );

  const renderItem = ({ item }: { item: ActionItem }) => {
    return (
      <View
        style={[styles.card, item.pillBg ? { backgroundColor: item.pillBg } : null]}
      >
        <View style={styles.row}>
          {item.avatar ? (
            <Image source={item.avatar} style={styles.avatar} />
          ) : (
            <View style={styles.avatar} />
          )}
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{item.title}</Text>
            {item.quote ? <Text style={styles.quote}>{item.quote}</Text> : null}

            {item.type === "request" && (
              <View style={styles.actionRow}>
                <Pressable style={[styles.btn, styles.btnPrimary]}>
                  <Text style={[styles.btnTxt, { color: "#fff" }]}>Accept</Text>
                </Pressable>
                <Pressable style={[styles.btn, styles.btnGhost]}>
                  <Text style={[styles.btnTxt, { color: "#E63B58" }]}>Decline</Text>
                </Pressable>
              </View>
            )}

            {item.type === "cta" && item.ctaLabel && (
              <Pressable style={[styles.btn, styles.btnLight]}>
                <Text style={[styles.btnTxt, { color: "#0F172A" }]}>
                  {item.ctaLabel}
                </Text>
              </Pressable>
            )}
          </View>

          <View style={styles.meta}>
            <Text style={styles.time}>{item.time}</Text>
            <Text style={styles.more}>•••</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(it) => it.id}
      contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#EEF2F7",
  },
  row: { flexDirection: "row", alignItems: "flex-start" },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    backgroundColor: "#E5E7EB",
  },
  title: { fontSize: 14, color: "#111827", flexShrink: 1 },
  quote: {
    marginTop: 8,
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#F7F9FC",
    color: "#4B5563",
    fontStyle: "italic",
  },
  meta: { alignItems: "flex-end", marginLeft: 8 },
  time: { fontSize: 12, color: "#9CA3AF" },
  more: { marginTop: 16, color: "#6B7280" },
  actionRow: { flexDirection: "row", gap: 10, marginTop: 12 },
  btn: {
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btnPrimary: { backgroundColor: "#E94A5A" },
  btnGhost: {
    borderWidth: 1,
    borderColor: "#F0C2C9",
    backgroundColor: "#FFF5F7",
  },
  btnLight: {
    backgroundColor: "#F3F6FA",
    borderWidth: 1,
    borderColor: "#E7ECF2",
    marginTop: 10,
  },
  btnTxt: { fontSize: 14, fontWeight: "700" },
});
