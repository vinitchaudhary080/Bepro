// pages/CreateTeamDetailPage.tsx
import React, { useCallback, useMemo, useState } from "react";
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { TeamStackParamList } from "../navigation/TeamStack";

import Hero from "../components/createteamdetailpage/Hero";
import Profile from "../components/createteamdetailpage/Profile";
import TeamLogo from "../components/createteamdetailpage/TeamLogo";
import TeamDetails from "../components/createteamdetailpage/TeamDetails";
import CreateTeamButton from "../components/createteamdetailpage/CreateTeamButton";
import CoinConfirmModal from "../components/createteamdetailpage/CoinConfirmModal";

export default function CreateTeamDetailPage() {
  const navigation = useNavigation<NativeStackNavigationProp<TeamStackParamList>>();

  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [selectedLogo, setSelectedLogo] = useState<string | null>(null);
  const [teamName, setTeamName] = useState("Delhi Knight Fighter");
  const [teamType, setTeamType] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

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

  useFocusEffect(
    useCallback(() => {
      const parent = navigation.getParent?.();
      // parent?.setOptions({ tabBarStyle: { display: "none" }, tabBar: () => null });
      return () => {
        // parent?.setOptions({ tabBarStyle: undefined, tabBar: undefined });
      };
    }, [navigation])
  );

  const onSubmit = () => {
    if (!isValid) return;
    setConfirmOpen(true); // open popup
  };

  // 👇 when user confirms in popup
  const handleConfirm = () => {
    setConfirmOpen(false);
    // navigate back to MyTeam screen in same stack
    navigation.navigate("MyTeam");
  };

  const handleChanges = () => {
    setConfirmOpen(false);
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

         

          <TeamDetails
            teamName={teamName}
            onChangeName={setTeamName}
            teamType={teamType}
            onChangeType={setTeamType}
          />
        </ScrollView>

        <CreateTeamButton disabled={!isValid} onPress={onSubmit} />

        <CoinConfirmModal
          visible={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleConfirm}
          onChanges={handleChanges}
          coinsRequired={100}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
});
