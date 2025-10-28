// src/pages/RegistrationPage.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import Registration, { DetailSlide } from "../components/login/Registration";
import { useNavigation } from "@react-navigation/native";

const SLIDES: DetailSlide[] = [
  { image: require("../assets/login/slide-1.png") },
  { image: require("../assets/login/slide-2.png") },
  { image: require("../assets/login/slide-3.png") },
];

export default function RegistrationPage() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.root}>
      <Registration
        slides={SLIDES}
        accent="#E94A5A"
        onPressLogin={() => navigation.navigate("LoginDetails")}
        onRegisterSuccess={(data) => {
          // ---- Prefill (name/email) from multiple possible shapes
          const name =
            data?.form?.name ||
            data?.user?.name ||
            data?.resp?.user?.name ||
            data?.resp?.data?.user?.name ||
            "";
          const email =
            data?.form?.email ||
            data?.user?.email ||
            data?.resp?.user?.email ||
            data?.resp?.data?.user?.email ||
            "";

          // ---- Token extraction: handle many common shapes
          const access =
            data?.tokens?.access ||
            data?.resp?.access_token ||
            data?.resp?.accessToken ||
            data?.resp?.token?.access ||
            data?.resp?.token ||
            data?.resp?.data?.access_token ||
            data?.resp?.data?.accessToken ||
            data?.resp?.data?.token?.access ||
            data?.resp?.data?.token ||
            null;

          const refresh =
            data?.tokens?.refresh ||
            data?.resp?.refresh_token ||
            data?.resp?.refreshToken ||
            data?.resp?.token?.refresh ||
            data?.resp?.data?.refresh_token ||
            data?.resp?.data?.refreshToken ||
            data?.resp?.data?.token?.refresh ||
            null;

          // (optional) quick dev log
          console.log("[Registration->Onboarding] prefill:", { name, email });
          console.log("[Registration->Onboarding] tokens:", { hasAccess: !!access, hasRefresh: !!refresh });

          navigation.navigate("Onboarding", {
            prefill: { name, email },
            tokens: { access, refresh }, // pass tokens forward
          });
        }}
        onRegisterError={(msg) => console.warn("Register error:", msg)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
