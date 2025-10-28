// src/components/login/Registration.tsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View, Text, Image, StyleSheet, Pressable, Dimensions, Platform,
  FlatList, TextInput, NativeSyntheticEvent, NativeScrollEvent, ScrollView, ActivityIndicator
} from "react-native";
import { colors as themeColors } from "../../theme/colors";
import { fonts } from "../../theme/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../config/api"; // ⬅️ central client

const { width } = Dimensions.get("window");
export type DetailSlide = { image: any };

type Props = {
  slides: DetailSlide[];
  accent?: string;
  backgroundColor?: string;
  autoPlay?: boolean;
  intervalMs?: number;
  onRegisterSuccess?: (data: any) => void;
  onRegisterError?: (message: string, status?: number, data?: any) => void;
  onPressLogin?: () => void; // "Already have an account? Login"
};

export default function Registration({
  slides,
  accent = "#E94A5A",
  backgroundColor = themeColors?.bg ?? "#0B0F1A",
  autoPlay = true,
  intervalMs = 3500,
  onRegisterSuccess,
  onRegisterError,
  onPressLogin,
}: Props) {
  const listRef = useRef<FlatList<DetailSlide>>(null);
  const total = slides?.length ?? 0;
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!autoPlay || total < 2) return;
    const id = setInterval(() => {
      setIdx((p) => {
        const n = (p + 1) % total;
        listRef.current?.scrollToIndex({ index: n, animated: true });
        return n;
      });
    }, intervalMs);
    return () => clearInterval(id);
  }, [autoPlay, intervalMs, total]);

  const onMomentumEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const n = Math.round(e.nativeEvent.contentOffset.x / width);
      if (n !== idx) setIdx(n);
    },
    [idx]
  );

  // form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // touched
  const [tName, setTName] = useState(false);
  const [tEmail, setTEmail] = useState(false);
  const [tPass, setTPass] = useState(false);

  // validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validName = name.trim().length >= 2;
  const validEmail = emailRegex.test(email.trim());
  const validPass = password.length >= 6;
  const isValid = validName && validEmail && validPass;

  // api state
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  

  // 🔐 Save tokens + set api header
  const persistTokens = async (resp: any) => {
  // cover ALL common shapes
  const access =
    resp?.token?.access ??
    resp?.accessToken ??
    resp?.access ??
    resp?.access_token ??         // 👈 add
    resp?.token ??                // 👈 some APIs return single token
    resp?.data?.token?.access ??
    resp?.data?.accessToken ??
    resp?.data?.access ??
    resp?.data?.access_token ??   // 👈 add
    resp?.data?.token;            // 👈 add

  const refresh =
    resp?.token?.refresh ??
    resp?.refreshToken ??
    resp?.refresh ??
    resp?.refresh_token ??        // 👈 add
    resp?.data?.token?.refresh ??
    resp?.data?.refreshToken ??
    resp?.data?.refresh ??
    resp?.data?.refresh_token;    // 👈 add

  if (access) {
    try {
      await AsyncStorage.setItem("token", String(access));
      await AsyncStorage.setItem("accessToken", String(access));
      if (refresh) await AsyncStorage.setItem("refreshToken", String(refresh));
    } catch {}
    try {
      // @ts-ignore
      if (typeof api?.setToken === "function") {
        // @ts-ignore
        api.setToken(String(access));
      } else if (api?.defaults?.headers) {
        // @ts-ignore
        api.defaults.headers.common = api.defaults.headers.common || {};
        // @ts-ignore
        api.defaults.headers.common.Authorization = `Bearer ${String(access)}`;
      } else {
        // @ts-ignore
        api.token = String(access);
      }
    } catch {}
  }
  return { access, refresh };
};

// ✅ submit me success payload me tokens + form pass karo
const submit = async () => {
  setTName(true); setTEmail(true); setTPass(true);
  if (!isValid || loading) return;

  setLoading(true);
  setApiError(null);
  try {
    const payload = { name: name.trim(), email: email.trim(), password };
    let resp: any;

    if (typeof (api as any).register === "function") {
      resp = await (api as any).register(payload, "/auth/register");
    } else {
      const r = await api.post("/auth/register", payload);
      resp = r?.data ?? r;
    }

    const tokens = await persistTokens(resp);

    onRegisterSuccess?.({
      resp,
      tokens,                      // 👈 pass tokens ahead
      user: resp?.user || resp?.data?.user,
      form: { name, email },       // 👈 ensure prefill works
    });
  } catch (err: any) {
    const msg = err?.response?.data?.message || err?.message || "Registration failed";
    setApiError(msg);
    onRegisterError?.(msg, err?.status ?? err?.response?.status, err?.response?.data);
  } finally {
    setLoading(false);
  }
};

  const renderItem = useCallback(
    ({ item }: { item: DetailSlide }) => (
      <Image source={item.image} style={styles.hero} resizeMode="contain" />
    ),
    []
  );

  return (
    <View style={[styles.root, { backgroundColor }]}>
      <FlatList
        ref={listRef}
        data={slides}
        keyExtractor={(_, i) => String(i)}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumEnd}
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
        initialScrollIndex={0}
        style={{ flexGrow: 0 }}
      />

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.heading, { color: accent }]}>Create Account</Text>
        <Text style={styles.sub}>Sign up to continue with BePro.</Text>

        {/* Name */}
        <View style={styles.fieldWrap}>
          <Text style={styles.label}>Full Name</Text>
          <View
            style={[
              styles.inputBox,
              tName && !validName ? { borderColor: "#FC374E" } : { borderColor: "#E6EAF2" },
            ]}
          >
            <TextInput
              value={name}
              onChangeText={setName}
              onBlur={() => setTName(true)}
              placeholder="John Doe"
              placeholderTextColor="#A4AEC0"
              style={styles.input}
              returnKeyType="next"
            />
          </View>
          {tName && !validName ? (
            <Text style={styles.error}>Please enter your full name.</Text>
          ) : null}
        </View>

        {/* Email */}
        <View style={styles.fieldWrap}>
          <Text style={styles.label}>Email</Text>
          <View
            style={[
              styles.inputBox,
              tEmail && !validEmail ? { borderColor: "#FC374E" } : { borderColor: "#E6EAF2" },
            ]}
          >
            <TextInput
              value={email}
              onChangeText={setEmail}
              onBlur={() => setTEmail(true)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="emailAddress"
              placeholder="Enter your email"
              placeholderTextColor="#A4AEC0"
              style={styles.input}
              returnKeyType="next"
            />
          </View>
          {tEmail && !validEmail ? (
            <Text style={styles.error}>Please enter a valid email address.</Text>
          ) : null}
        </View>

        {/* Password */}
        <View style={styles.fieldWrap}>
          <Text style={styles.label}>Password</Text>
          <View
            style={[
              styles.inputBox,
              tPass && !validPass ? { borderColor: "#FC374E" } : { borderColor: "#E6EAF2" },
            ]}
          >
            <TextInput
              value={password}
              onChangeText={setPassword}
              onBlur={() => setTPass(true)}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="password"
              placeholder="Create a password"
              placeholderTextColor="#A4AEC0"
              style={styles.input}
              returnKeyType="done"
              onSubmitEditing={submit}
            />
          </View>
          {tPass && !validPass ? (
            <Text style={styles.error}>Password must be at least 6 characters.</Text>
          ) : null}
        </View>

        {/* API error */}
        {apiError ? (
          <Text style={[styles.error, { textAlign: "center" }]}>{apiError}</Text>
        ) : null}

        {/* CTA */}
        <Pressable
          disabled={!isValid || loading}
          onPress={submit}
          style={[
            styles.cta,
            { backgroundColor: !isValid || loading ? "#D8DCE5" : accent },
            Platform.OS === "android" ? styles.ctaShadowAndroid : styles.ctaShadowIOS,
          ]}
        >
          {loading ? <ActivityIndicator /> : <Text style={styles.ctaText}>Create Account</Text>}
        </Pressable>

        {/* Footer → back to LoginDetails */}
        <View style={{ alignItems: "center" }}>
          <Text style={styles.footerText}>
            Already have an account?{" "}
            <Text style={[styles.footerLink, { color: accent }]} onPress={onPressLogin}>
              Log In
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const IOS_CONTINUOUS =
  Platform.OS === "ios" ? ({ borderCurve: "continuous" } as any) : {};

const styles = StyleSheet.create({
  root: { flex: 1 },
  hero: { width, height: Math.round((width / 3) * 3), marginTop: 68 },
  body: { flex: 1 },
  bodyContent: { paddingHorizontal: 20, paddingTop: 76, paddingBottom: 32 },
  heading: { fontSize: 26, lineHeight: 30, marginTop: 16, textAlign: "center", fontFamily: fonts.bold },
  sub: { fontSize: 14, lineHeight: 20, color: "#8A95A6", textAlign: "center", marginTop: 8, marginBottom: 18, fontFamily: fonts.regular },
  fieldWrap: { marginBottom: 18 },
  label: { fontSize: 13, color: "#6B7280", marginBottom: 8, fontFamily: fonts.medium },
  inputBox: { borderWidth: 1, borderRadius: 16, backgroundColor: "#F5F7FB", paddingHorizontal: 14, height: 54, justifyContent: "center", ...IOS_CONTINUOUS },
  input: { fontSize: 16, color: "#0E1726", fontFamily: fonts.medium },
  error: { marginTop: 8, color: "#FC374E", fontSize: 12, fontFamily: fonts.medium },
  cta: { height: 60, borderRadius: 16, alignItems: "center", justifyContent: "center", marginTop: 18, marginBottom: 18, ...IOS_CONTINUOUS },
  ctaShadowIOS: { shadowColor: "#E94A5A", shadowOpacity: 0.25, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, ...IOS_CONTINUOUS },
  ctaShadowAndroid: { elevation: 4 },
  ctaText: { color: "#FFFFFF", fontSize: 16, fontFamily: fonts.semibold },
  footerText: { fontSize: 14, color: "#6B7280", fontFamily: fonts.medium },
  footerLink: { fontSize: 14, fontFamily: fonts.semibold },
});
