// navigation/RootTabs.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import WavyTabBar from "../components/nav/WavyTabBar";
import HomeStack from "../navigation/HomeStack";
import PlayStack from "../navigation/PlayStack";
import RankingPage from "../pages/RankingPage";
import ProfileStack from "../navigation/ProfileStack";
import TeamStack from "./TeamStack";

const Tab = createBottomTabNavigator();

export default function RootTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => {
        const { state } = props;
        const currentTab = state.routes[state.index];

        // 🔒 safely read nested stack's active child route name
        const nestedState: any =
          (currentTab as any)?.state ||
          // sometimes in RN v6 nested state sits on "params.state" when restored
          (currentTab as any)?.params?.state;

        const childIndex = nestedState?.index ?? 0;
        const childRouteName =
          nestedState?.routes?.[childIndex]?.name ?? undefined;

        /* ---------------- PLAY STACK ---------------- */
        const hideOnPlay =
          currentTab.name === "Play" &&
          (childRouteName === "CreateMatch" ||
            childRouteName === "SetGameRules" ||
            childRouteName === "FixTiming");

        /* ---------------- TEAM STACK (NEW) ---------------- */
        const hideOnTeamCreate =
          currentTab.name === "Team" && childRouteName === "CreateTeam";

        /* ---------------- PROFILE STACK ---------------- */
        const hideOnProfileDailyTask =
          currentTab.name === "Profile" && childRouteName === "DailyTask";
        const hideOnProfileWallet =
          currentTab.name === "Profile" && childRouteName === "Wallet";
        const hideOnProfilePermission =
          currentTab.name === "Profile" && childRouteName === "Permission";
        const hideOnProfileTeamSetting =
          currentTab.name === "Profile" && childRouteName === "TeamSetting";
        const hideOnProfileNotifications =
          currentTab.name === "Profile" && childRouteName === "Notifications";
        const hideOnProfileFaqs =
          currentTab.name === "Profile" && childRouteName === "Faqs";
        const hideOnProfileAboutApp =
          currentTab.name === "Profile" && childRouteName === "AboutApp";
        const hideOnProfileToss =
          currentTab.name === "Profile" && childRouteName === "TossPage";
        const hideOnProfileDetail =
          currentTab.name === "Profile" &&
          (childRouteName === "ProfileDetail" ||
            childRouteName === "ProfileDetailPage");
        const hideOnProfileEdit =
          currentTab.name === "Profile" &&
          (childRouteName === "EditProfile" ||
            childRouteName === "EditProfilePage");

        /* ---------------- HOME STACK ---------------- */
        const hideOnHomeNotification =
          currentTab.name === "Home" && childRouteName === "NotificationPanel";
        const hideOnHomePlayerProfile =
          currentTab.name === "Home" && childRouteName === "PlayerProfilePage";

        /* ---------------- AUTH FLOW ---------------- */
        const hideOnAuthFlow =
          childRouteName === "Login" ||
          childRouteName === "LoginPage" ||
          childRouteName === "LoginDetails" ||
          childRouteName === "LoginDetailsPage" ||
          childRouteName === "Onboarding" ||
          childRouteName === "OnboardingPage";

        /* ---------------- FINAL CHECK ---------------- */
        const shouldHide =
          hideOnPlay ||
          hideOnTeamCreate || // 👈 NEW
          hideOnProfileDailyTask ||
          hideOnProfileWallet ||
          hideOnProfilePermission ||
          hideOnProfileTeamSetting ||
          hideOnProfileNotifications ||
          hideOnProfileFaqs ||
          hideOnProfileAboutApp ||
          hideOnProfileToss ||
          hideOnProfileDetail ||
          hideOnProfileEdit ||
          hideOnHomeNotification ||
          hideOnHomePlayerProfile ||
          hideOnAuthFlow;

        if (shouldHide) return null;
        return <WavyTabBar {...props} />;
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Team" component={TeamStack} options={{ headerShown: false }} />
      <Tab.Screen
        name="Play"
        component={PlayStack}
        options={{ headerShown: false, unmountOnBlur: true }}
        listeners={({ navigation }) => ({
          tabPress: () => navigation.navigate("Play", { screen: "MatchPage" }),
        })}
      />
      <Tab.Screen name="Rankings" component={RankingPage} />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{ headerShown: false, unmountOnBlur: true }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("Profile", { screen: "ProfileHome" });
          },
        })}
      />
    </Tab.Navigator>
  );
}
