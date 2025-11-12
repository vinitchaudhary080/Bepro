// pages/ProfilePage.tsx
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import ProfileScreen from "../components/profile/ProfileScreen";
import type { ProfileStackParamList } from "../navigation/ProfileStack";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE = "http://172.20.10.2:4000";

type MeResponseUser = {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  // baaki fields agar aaye to ignore kar sakte ho
};

export default function ProfilePage() {
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();

  const [user, setUser] = useState<MeResponseUser | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);

  // ✅ Profile fetch from /users/me using @auth_token
  useEffect(() => {
    const fetchProfile = async () => {
      console.log("👤 [Profile] Fetching /users/me ...");
      setLoadingProfile(true);

      try {
        const token = await AsyncStorage.getItem("@auth_token");
        console.log("🔑 [Profile] Loaded token from storage:", token);

        if (!token) {
          console.log("⚠️ [Profile] No token found, skipping /users/me call");
          setLoadingProfile(false);
          return;
        }

        const url = `${API_BASE}/users/me`;
        console.log("🌐 [Profile] Hitting:", url);

        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("📡 [Profile] /users/me status:", res.status);

        const data = await res.json().catch(() => null);
        console.log("📨 [Profile] /users/me data:", data);

        if (!res.ok) {
          console.log("❌ [Profile] /users/me failed:", data);
          setLoadingProfile(false);
          return;
        }

        // Backend pattern ke hisab se user ko nikaal lo
        // Example: { data: { ...user }, success: true }
        const userNode: MeResponseUser =
          data?.data && typeof data.data === "object" ? data.data : data;

        setUser({
          name: userNode?.name ?? "",
          email: userNode?.email ?? "",
          phone: userNode?.phone ?? "",
        });

        console.log("✅ [Profile] User set:", {
          name: userNode?.name,
          email: userNode?.email,
          phone: userNode?.phone,
        });
      } catch (err) {
        console.log("🚨 [Profile] Error while fetching /users/me:", err);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, []);

  // ✅ Logout handler with console tracking
  const handleLogout = async () => {
    console.log("🔹 [Logout] Logout process started...");

    try {
      const token = await AsyncStorage.getItem("@auth_token");
      console.log("🟩 [Logout] Retrieved token from storage:", token);

      if (!token) {
        console.log("⚠️ [Logout] No token found, proceeding to clear session...");
      }

      // 🔥 Step 1: Hit logout API
      const url = `${API_BASE}/auth/logout`;
      console.log("🌐 [Logout] Hitting API:", url);

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      console.log("📡 [Logout] API response status:", res.status);

      const data = await res.json().catch(() => null);
      console.log("📨 [Logout] API response data:", data);

      if (!res.ok) {
        console.log("❌ [Logout] Logout API failed:", data);
      } else {
        console.log("✅ [Logout] Logout API success:", data);
      }

      // 🧹 Step 2: Remove token
      await AsyncStorage.removeItem("@auth_token");
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
      console.log("🧽 [Logout] Tokens removed from AsyncStorage.");

      // 🔁 Step 3: Navigate to LoginDetails
      console.log("🔁 [Logout] Redirecting user to LoginDetails screen...");
      (navigation as any).reset({
        index: 0,
        routes: [{ name: "LoginDetails" }],
      });

      console.log("🎉 [Logout] Logout flow completed successfully!");
    } catch (err) {
      console.log("🚨 [Logout] Unexpected error occurred:", err);
    }
  };

  // Display values: location = email, role = phone
  const displayName = user?.name || "Player";
  const displayEmail = user?.email || "Email not available";
  const displayPhone = user?.phone || "Phone not available";

  return (
    <View style={{ flex: 1 }}>
      <ProfileScreen
        // ✅ Name from /users/me
        name={displayName}
        // ✅ Location prop me ab email
        location={displayEmail}
        // ✅ Role prop me ab phone
        role={displayPhone}
        avatar={require("../assets/profile/manoj.jpg")}
        chevronIcon={require("../assets/icons/chevron-right.png")}
        locationIcon={require("../assets/icons/Email.png")}
        roleIcon={require("../assets/icons/Phone.png")}
        items={[
          {
            key: "my-profile",
            label: "My Profile",
            icon: require("../assets/icons/user.png"),
            onPress: () => navigation.navigate("ProfileDetail"),
          },
          {
            key: "wallet",
            label: "Wallet",
            icon: require("../assets/icons/wallet.png"),
            onPress: () => navigation.navigate("Wallet"),
          },
          {
            key: "toss",
            label: "Toss",
            icon: require("../assets/icons/toss.png"),
            onPress: () => (navigation as any).navigate("TossPage"),
          },
          {
            key: "daily-task",
            label: "Daily Task",
            icon: require("../assets/icons/task.png"),
            onPress: () => navigation.navigate("DailyTask"),
          },
          {
            key: "permission",
            label: "Permission",
            icon: require("../assets/icons/permission.png"),
            onPress: () => (navigation as any).navigate("Permission"),
          },
          {
            key: "team-setting",
            label: "Team Setting",
            icon: require("../assets/icons/team-setting.png"),
            onPress: () => (navigation as any).navigate("TeamSetting"),
          },
          {
            key: "setting",
            label: "Setting",
            icon: require("../assets/icons/setting.png"),
            onPress: () => (navigation as any).navigate("Setting"),
          },
          {
            key: "notifications",
            label: "Notifications",
            icon: require("../assets/icons/bellp.png"),
            onPress: () => (navigation as any).navigate("Notifications"),
          },
          {
            key: "faqs",
            label: "FAQs",
            icon: require("../assets/icons/faq.png"),
            onPress: () => (navigation as any).navigate("Faqs"),
          },
          {
            key: "about-app",
            label: "About App",
            icon: require("../assets/icons/info.png"),
            onPress: () => (navigation as any).navigate("AboutApp"),
          },
          {
            key: "logout",
            label: "Logout",
            icon: require("../assets/icons/logout.png"),
            onPress: handleLogout,
          },
        ]}
      />
    </View>
  );
}
