// components/faq/FAQList.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";

export type FAQItem = { id: string; q: string; a: string };

type Props = {
  items?: FAQItem[];
};

export default function FAQList({
  items = [
    {
      id: "1",
      q: "Coins kaise earn hote hain?",
      a: "Coins Daily/Weekly/Monthly tasks complete karke, match participation aur special events se milte hain. Har task ke sath coin value mention hoti hai—verify hote hi coins Wallet me 'Added' ho jate hain.",
    },
    {
      id: "2",
      q: "Wallet balance kab update hota hai?",
      a: "Jaise hi task verify hota hai ya reward trigger hota hai, balance realtime update hota hai. Slow network me 1–2 minute lag sakte hain.",
    },
    {
      id: "3",
      q: "Redeem kaise karun?",
      a: "Wallet → Redeem (Add Coin/Withdraw) par jao. Allowed redemption options app ke region ke hisab se dikhengi. Minimum redemption threshold cross karna zaroori hota hai.",
    },
    {
      id: "4",
      q: "Team me roles aur permissions kaise kaam karte hain?",
      a: "Captain/Admin toggle se aap ‘Toss’, ‘Update Scoreboard’, ‘Create Match’ jaise permissions members ko de ya revoke kar sakte ho. Changes turant apply hote hain.",
    },
    {
      id: "5",
      q: "Match kaise create karun?",
      a: "Play tab → Create Match. Basic details bharo (venue, date/time, overs). Phir Set Game Rules aur Fix Timing finalize karke publish karo.",
    },
    {
      id: "6",
      q: "Daily/Weekly/Monthly tasks me difference kya hai?",
      a: "Daily tasks har din reset hote hain, Weekly har Monday, aur Monthly first day of month. Progress reset pe carry forward nahi hoti jab tak explicitly mentioned na ho.",
    },
    {
      id: "7",
      q: "Notifications ka control kahan milega?",
      a: "Profile → Notifications me jao. Wahan ‘Match Reminders’, ‘Score Updates’, ‘Team Announcements’ jaise toggles on/off kar sakte ho.",
    },
    {
      id: "8",
      q: "Mera task ‘Pending’ kyu dikh raha hai?",
      a: "Task verification ko thoda waqt lag sakta hai (scorecard sync/validation). Agar 24 ghante se zyada ho gaye, support ko match details ke sath likho.",
    },
    {
      id: "9",
      q: "Profile details kaise edit karun?",
      a: "Profile → Edit Profile. Wahan se naam, role, location, avatar update kar sakte ho. Changes save karne ke baad turant reflect hote hain.",
    },
    {
      id: "10",
      q: "Support se contact kaise karun?",
      a: "Profile → About App/Help & Support me ‘Contact Support’ button milega. Aap email ya in-app chat se ticket raise kar sakte ho.",
    },
  ],
}: Props) {
  const [openId, setOpenId] = useState<string>(items[0]?.id ?? "");

  const Row = ({ item }: { item: FAQItem }) => {
    const isOpen = openId === item.id;
    return (
      <View>
        <Pressable onPress={() => setOpenId(isOpen ? "" : item.id)} style={styles.qRow}>
          <Text style={[styles.qText, isOpen && styles.qTextActive]}>{item.q}</Text>
        </Pressable>
        {isOpen && <Text style={styles.aText}>{item.a}</Text>}
        <View style={styles.sep} />
      </View>
    );
  };

  return (
    <View style={styles.wrap}>
      <FlatList
        data={items}
        keyExtractor={(it) => it.id}
        renderItem={Row}
        scrollEnabled={false}
        contentContainerStyle={{ paddingTop: 6 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: "#fff", paddingHorizontal: 16 },
  qRow: { paddingVertical: 14 },
  qText: { fontSize: 14, color: "#111827" },
  qTextActive: { color: "#7B61FF" },
  aText: { marginTop: 6, fontSize: 12, color: "#6B7280", lineHeight: 18 },
  sep: { height: 1, backgroundColor: "rgba(15,23,42,0.08)" },
});
