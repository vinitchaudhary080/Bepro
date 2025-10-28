// components/login/LoginDetails.tsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View, Text, Image, StyleSheet, Pressable, Dimensions, Platform,
  FlatList, TextInput, NativeSyntheticEvent, NativeScrollEvent, ScrollView
} from "react-native";
import { colors as themeColors } from "../../theme/colors";
import { fonts } from "../../theme/type";

const { width } = Dimensions.get("window");
export type DetailSlide = { image: any };

type Props = {
  slides: DetailSlide[];
  accent?: string;
  backgroundColor?: string;
  autoPlay?: boolean;
  intervalMs?: number;
  onLoginSuccess?: (data: any) => void;
  onLoginError?: (message: string, status?: number, data?: any) => void;
  onPressRegister?: () => void; // "Register" footer tap
};

export default function LoginDetails({
  slides,
  accent = "#E94A5A",
  backgroundColor = themeColors?.bg ?? "#0B0F1A",
  autoPlay = true,
  intervalMs = 3500,
  onLoginSuccess,
  onPressRegister,
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

  // form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tEmail, setTEmail] = useState(false);
  const [tPass, setTPass] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validEmail = emailRegex.test(email.trim());
  const validPass = password.length >= 6;
  const isValid = validEmail && validPass;
  const passRef = useRef<TextInput>(null);

  // 🔄 API removed → simple handler
  const submit = () => {
    setTEmail(true);
    setTPass(true);
    if (!isValid) return;

    // direct success → parent (LoginDetailsPage) will navigate to Home/Tabs
    const mockData = { user: { email: email.trim() }, token: "dev-login-skip" };
    onLoginSuccess?.(mockData);
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
        <Text style={[styles.heading, { color: accent }]}>Log In</Text>
        <Text style={styles.sub}>
          It was popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum.
        </Text>

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
              returnKeyType="next"
              placeholder="Enter your email"
              placeholderTextColor="#A4AEC0"
              style={styles.input}
              onSubmitEditing={() => passRef.current?.focus()}
            />
          </View>
          {tEmail && !validEmail ? (
            <Text style={styles.error}>Please enter a valid email address.</Text>
          ) : null}
        </View>

        <View style={styles.fieldWrap}>
          <Text style={styles.label}>Password</Text>
          <View
            style={[
              styles.inputBox,
              tPass && !validPass ? { borderColor: "#FC374E" } : { borderColor: "#E6EAF2" },
            ]}
          >
            <TextInput
              ref={passRef}
              value={password}
              onChangeText={setPassword}
              onBlur={() => setTPass(true)}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="password"
              returnKeyType="done"
              placeholder="Enter your password"
              placeholderTextColor="#A4AEC0"
              style={styles.input}
              onSubmitEditing={submit}
            />
          </View>
          {tPass && !validPass ? (
            <Text style={styles.error}>Password must be at least 6 characters.</Text>
          ) : null}
        </View>

        {/* CTA */}
        <Pressable
          disabled={!isValid}
          onPress={submit}
          style={[
            styles.cta,
            { backgroundColor: !isValid ? "#D8DCE5" : accent },
            Platform.OS === "android" ? styles.ctaShadowAndroid : styles.ctaShadowIOS,
          ]}
        >
          <Text style={styles.ctaText}>Log In</Text>
        </Pressable>

        {/* Footer */}
        <View style={{ alignItems: "center" }}>
          <Text style={styles.footerText}>
            Don’t have an account?{" "}
            <Text style={[styles.footerLink, { color: accent }]} onPress={onPressRegister}>
              Register
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
  sub: {
    fontSize: 14,
    lineHeight: 20,
    color: "#8A95A6",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 18,
    fontFamily: fonts.regular,
  },
  fieldWrap: { marginBottom: 18 },
  label: { fontSize: 13, color: "#6B7280", marginBottom: 8, fontFamily: fonts.medium },
  inputBox: {
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: "#F5F7FB",
    paddingHorizontal: 14,
    height: 54,
    justifyContent: "center",
    ...IOS_CONTINUOUS,
  },
  input: { fontSize: 16, color: "#0E1726", fontFamily: fonts.medium },
  error: { marginTop: 8, color: "#FC374E", fontSize: 12, fontFamily: fonts.medium },
  cta: {
    height: 60,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    marginBottom: 18,
    ...IOS_CONTINUOUS,
  },
  ctaShadowIOS: {
    shadowColor: "#E94A5A",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    ...IOS_CONTINUOUS,
  },
  ctaShadowAndroid: { elevation: 4 },
  ctaText: { color: "#FFFFFF", fontSize: 16, fontFamily: fonts.semibold },
  footerText: { fontSize: 14, color: "#6B7280", fontFamily: fonts.medium },
  footerLink: { fontSize: 14, fontFamily: fonts.semibold },
});
