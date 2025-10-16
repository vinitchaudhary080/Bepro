import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  View, Text, Image, StyleSheet, Pressable, Dimensions, Platform,
  FlatList, TextInput, NativeSyntheticEvent, NativeScrollEvent
} from "react-native";
import { colors as themeColors } from "../../theme/colors";
import { s } from "../../theme/spacing";
import { fonts } from "../../theme/type";

const { width } = Dimensions.get("window");

export type DetailSlide = { image: any }; // require(...) or { uri: ... }

type Props = {
  slides: DetailSlide[];
  accent?: string;
  backgroundColor?: string;
  autoPlay?: boolean;
  intervalMs?: number;
  onSubmit?: (phone10: string) => void;
  onTermsPress?: () => void;
};

export default function LoginDetails({
  slides,
  accent = "#E94A5A",
  backgroundColor = themeColors?.bg ?? "#0B0F1A",
  autoPlay = true,
  intervalMs = 3500,
  onSubmit,
  onTermsPress,
}: Props) {
  // -------- Carousel --------
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

  const onMomentumEnd = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const n = Math.round(x / width);
    if (n !== idx) setIdx(n);
  }, [idx]);

  // -------- Phone input --------
  const [phone, setPhone] = useState("");
  const [touched, setTouched] = useState(false);

  const cleanDigits = (v: string) => v.replace(/[^\d]/g, "").slice(0, 10);
  const onChangePhone = (v: string) => setPhone(cleanDigits(v));

  const isValid = phone.length === 10;
  const showError = touched && !isValid;

  const submit = () => {
    setTouched(true);
    if (isValid) onSubmit?.(phone);
  };

  // -------- UI --------
  const renderItem = useCallback(({ item }: { item: DetailSlide }) => {
    return <Image source={item.image} style={styles.hero} resizeMode="contain" />;
  }, []);

  return (
    <View style={[styles.root, { backgroundColor }]}>
      {/* Top sliding illustration */}
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

      {/* Content */}
      <View style={styles.body}>
        <Text style={[styles.heading, { color: accent }]}>Log In</Text>

        <Text style={styles.sub}>
          It was popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum.
        </Text>

        <View style={styles.fieldWrap}>
          <Text style={styles.label}>Mobile number</Text>

          <View
            style={[
              styles.inputBox,
              showError ? { borderColor: "#FC374E" } : { borderColor: "#E6EAF2" },
            ]}
          >
            <TextInput
              value={phone}
              onChangeText={onChangePhone}
              onBlur={() => setTouched(true)}
              keyboardType="number-pad"
              returnKeyType="done"
              placeholder="Enter your mobile number"
              placeholderTextColor="#A4AEC0"
              maxLength={10}
              style={styles.input}
            />
          </View>

          {showError ? (
            <Text style={styles.error}>Please enter a valid 10-digit mobile number.</Text>
          ) : null}
        </View>

        <Pressable
          disabled={!isValid}
          onPress={submit}
          style={[
            styles.cta,
            { backgroundColor: isValid ? accent : "#D8DCE5" },
            Platform.OS === "android" ? styles.ctaShadowAndroid : styles.ctaShadowIOS,
          ]}
        >
          <Text style={styles.ctaText}>Log In</Text>
        </Pressable>

        <Text style={styles.tc}>
          By signing in, you agree to our{" "}
          <Text onPress={onTermsPress} style={[styles.tc, { color: accent, fontFamily: fonts.semibold }]}>
            Terms & Conditions
          </Text>
        </Text>
      </View>
    </View>
  );
}

const IOS_CONTINUOUS = Platform.OS === "ios" ? ({ borderCurve: "continuous" } as any) : {};

const styles = StyleSheet.create({
  root: { flex: 1 },
  hero: {
    width,
    height: Math.round((width / 3) * 3),
    marginTop: 68,
  },

  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 76,
  },

  heading: {
    fontSize: 26,
    lineHeight: 30,
    marginTop: 16,
    textAlign: "center",
    fontFamily: fonts.bold,
  },
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
  label: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 8,
    fontFamily: fonts.medium,
  },
  inputBox: {
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: "#F5F7FB",
    paddingHorizontal: 14,
    height: 54,
    justifyContent: "center",
    // (optional) iOS smooth corners for input too:
    ...IOS_CONTINUOUS,
  },
  input: {
    fontSize: 16,
    color: "#0E1726",
    fontFamily: fonts.medium,
  },
  error: {
    marginTop: 8,
    color: "#FC374E",
    fontSize: 12,
    fontFamily: fonts.medium,
  },

  cta: {
    height: 60,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    marginBottom: 18,
    ...IOS_CONTINUOUS, // ← smooth iOS corners
  },
  ctaShadowIOS: {
    shadowColor: "#E94A5A",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    ...IOS_CONTINUOUS, // ← shadow follows continuous curve
  },
  ctaShadowAndroid: { elevation: 4 },

  ctaText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: fonts.semibold,
  },

  tc: {
    marginTop: 14,
    fontSize: 12,
    color: "#8A95A6",
    textAlign: "center",
    fontFamily: fonts.regular,
  },
});
