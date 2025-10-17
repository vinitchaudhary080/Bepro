// pages/CreateTeamDetailPage.tsx
import React, { useCallback, useMemo, useState } from "react";
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import Hero from "../components/createteamdetailpage/Hero";
import Profile from "../components/createteamdetailpage/Profile";
import TeamLogo from "../components/createteamdetailpage/TeamLogo";
import TeamDetails from "../components/createteamdetailpage/TeamDetails";
import CreateTeamButton from "../components/createteamdetailpage/CreateTeamButton";

export default function CreateTeamDetailPage() {
  const navigation = useNavigation();

  // form state
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [selectedLogo, setSelectedLogo] = useState<string | null>(null); // store require key or uri
  const [teamName, setTeamName] = useState("Delhi Knight Fighter");
  const [teamType, setTeamType] = useState<string | null>(null);

  // aap apne actual logos se replace kar dena
  const logos = useMemo(
    () => [
      { id: "l1", title: "Hit Man", src: require("../assets/team-logos/logo1.png") },
      { id: "l2", title: "Hit Man", src: require("../assets/team-logos/logo2.png") },
      { id: "l3", title: "Hit Man", src: require("../assets/team-logos/logo3.png") },
      { id: "l4", title: "Hit Man", src: require("../assets/team-logos/logo4.png") },
    ],
    []
  );

  const isValid = !!teamName?.trim() && !!teamType && !!selectedLogo;

  // (Optional) hide WavyTabBar while on this page — if you want
  useFocusEffect(
    useCallback(() => {
      const parent = navigation.getParent?.();
      // parent?.setOptions({ tabBarStyle: { display: "none" }, tabBar: () => null }); // uncomment if needed
      return () => {
        // parent?.setOptions({ tabBarStyle: undefined, tabBar: undefined });
      };
    }, [navigation])
  );

  const onSubmit = () => {
    if (!isValid) return;
    Alert.alert("Team Created 🎉", `Name: ${teamName}\nType: ${teamType}`);
    // TODO: API call / move next
  };

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Hero />
          <Profile photoUri={photoUri} onPick={(uri) => setPhotoUri(uri)} />

          <TeamLogo
            title="Team Logo"
            logos={logos}
            selectedId={selectedLogo}
            onSelect={(id) => setSelectedLogo(id)}
          />

          <TeamDetails
            teamName={teamName}
            onChangeName={setTeamName}
            teamType={teamType}
            onChangeType={setTeamType}
          />
        </ScrollView>

        <CreateTeamButton disabled={!isValid} onPress={onSubmit} />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
});
