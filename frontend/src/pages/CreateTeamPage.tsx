// src/pages/CreateTeamPage.tsx
import React, { useCallback, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import Hero from "../components/createteam/Hero";
import SearchBar from "../components/createteam/SearchBar";
import RecommendedPlayer from "../components/createteam/RecommendedPlayer";
import NewOnApp from "../components/createteam/NewOnApp";
import TopPlayer from "../components/createteam/TopPlayer";
import NextButton from "../components/createteam/NextButton";

import TeamDetails from "../components/createteamdetailpage/TeamDetails"; // ⚠️ path adjust if different
import { api } from "../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CreateTeamPage() {
  const navigation = useNavigation();

  // form state from TeamDetails
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [logoUrl, setLogoUrl] = useState("");

  // selected players from RecommendedPlayer
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  // Hide tab bar on focus, restore on blur
  useFocusEffect(
    useCallback(() => {
      const parent = navigation.getParent?.();
      parent?.setOptions({ tabBarStyle: { display: "none" } });
      parent?.setOptions({ tabBar: () => null });

      return () => {
        parent?.setOptions({
          tabBarStyle: undefined,
          tabBar: undefined,
        });
      };
    }, [navigation])
  );

  const handleCreateAndInvite = useCallback(async () => {
    try {
      setLoading(true);
      console.log("📤 Creating team with:", {
        name,
        slug,
        logoUrl,
        selectedUserIds,
      });

      // 1) Team create - POST /teams
      const { data } = await api.post<any>("/teams", {
        name: name.trim(),
        slug: slug.trim(),
        logoUrl: logoUrl.trim() || null,
      });

      const created = data?.data || data;
      const teamId: string | undefined = created?.id;

      if (!teamId) {
        console.log("❌ No team id in /teams response:", data);
        Alert.alert("Error", "Team created but no team id returned.");
        return;
      }

      // team id local save (tumne bola tha)
      await AsyncStorage.setItem("@last_created_team_id", teamId);
      console.log("💾 Saved team ID:", teamId);

      // 2) Invite users - POST /teams/{id}/invite
      if (selectedUserIds.length > 0) {
        const payload = {
          userIds: selectedUserIds,
          note: "Join for upcoming tournament season",
        };

        const { data: inviteRes } = await api.post<any>(
          `/teams/${teamId}/invite`,
          payload
        );
        console.log("✅ Invite response:", inviteRes);
      } else {
        console.log("ℹ️ No selected users, skipping invite call");
      }

      // 3) Success message + navigate
      Alert.alert("Success", "Invitations sent");
      navigation.navigate("MyTeam" as never);
    } catch (err: any) {
      console.log(
        "🚨 [CreateTeamPage] Error:",
        err?.status,
        err?.message,
        err?.data
      );
      Alert.alert(
        "Error",
        err?.message || "Failed to create team or send invites."
      );
    } finally {
      setLoading(false);
    }
  }, [name, slug, logoUrl, selectedUserIds, navigation]);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Hero />
       

        {/* form section for name/slug/logoUrl */}
        <TeamDetails
          name={name}
          slug={slug}
          logoUrl={logoUrl}
          onChangeName={setName}
          onChangeSlug={setSlug}
          onChangeLogoUrl={setLogoUrl}
        />
<SearchBar />
        {/* players list with selection */}
        <RecommendedPlayer
          onSelectionChange={(ids) => {
            console.log("👥 Selected userIds:", ids);
            setSelectedUserIds(ids);
          }}
        />

        {/* optional: if tum NewOnApp / TopPlayer dikhana chahte ho to unko fir se add kar sakte ho */}
        {/* <NewOnApp /> */}
        {/* <TopPlayer /> */}
      </ScrollView>

      {/* Next / Create button - assuming it accepts onPress + optional disabled */}
      <NextButton onPress={handleCreateAndInvite} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
