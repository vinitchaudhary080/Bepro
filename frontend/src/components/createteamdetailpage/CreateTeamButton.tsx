// src/components/team/CreateTeamButton.tsx
import React, { useState } from "react";
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { TeamStackParamList } from "../../navigation/TeamStack";
import { api } from "../../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  name: string;
  slug: string;
  logoUrl: string;
};

export default function CreateTeamButton({ name, slug, logoUrl }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<TeamStackParamList>>();
  const [loading, setLoading] = useState(false);

  const handleCreateTeam = async () => {
    if (!name.trim() || !slug.trim()) {
      Alert.alert("Missing info", "Please enter both Name and Slug");
      return;
    }

    try {
      setLoading(true);
      console.log("📤 Creating team with:", { name, slug, logoUrl });

      const { data } = await api.post("/teams", {
        name: name.trim(),
        slug: slug.trim(),
        logoUrl: logoUrl.trim() || null,
      });

      const created = data?.data || data;
      const teamId = created?.id;

      if (!teamId) {
        console.log("❌ No team ID found in response", data);
        Alert.alert("Error", "Team created but ID missing in response");
        return;
      }

      await AsyncStorage.setItem("@last_created_team_id", teamId);
      console.log("💾 Saved team ID:", teamId);

      Alert.alert("Success", "Team created successfully!");
      navigation.navigate("MyTeam");
    } catch (err: any) {
      console.log("🚨 Create team failed:", err);
      Alert.alert("Error", err?.message || "Unable to create team");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        disabled={loading}
        onPress={handleCreateTeam}
        style={({ pressed }) => [{ opacity: pressed || loading ? 0.8 : 1 }]}
      >
        <LinearGradient
          colors={["#E94A5A", "#E94A5A"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.btn}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.text}>Create Team</Text>
          )}
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: Platform.OS === "ios" ? 28 : 20,
    alignItems: "center",
  },
  btn: {
    width: 320,
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
