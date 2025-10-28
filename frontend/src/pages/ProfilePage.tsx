// pages/ProfilePage.tsx
import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import ProfileScreen from "../components/profile/ProfileScreen";
import type { ProfileStackParamList } from "../navigation/ProfileStack";

export default function ProfilePage() {
    const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();

    return (
        <View style={{ flex: 1 }}>
            <ProfileScreen
                name="Manoj Tiwari"
                location="Bengaluru, Karnataka, India"
                role="Left Hand Batsman | Right Arm Off Break"
                avatar={require("../assets/profile/manoj.jpg")}
                chevronIcon={require("../assets/icons/chevron-right.png")}
                locationIcon={require("../assets/icons/location-dot.png")}
                roleIcon={require("../assets/icons/badge.png")}
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
                        onPress: () => navigation.navigate("DailyTask"), // ✅ opens DailyTaskPage
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
                        onPress: () => navigation.navigate("LoginDetails"), // ✅ redirect to LoginDetailsPage
                    },
                ]}
            />
        </View>
    );
}
