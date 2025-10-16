import React, { useState } from "react";
import {
  View, Text, StyleSheet, Image, Pressable, TextInput, Platform,
  Modal, FlatList, Dimensions, Alert, ScrollView, KeyboardAvoidingView
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/types";
import { colors as themeColors } from "../../theme/colors";
import { fonts } from "../../theme/type";

const { width } = Dimensions.get("window");
const IOS_CONTINUOUS = Platform.OS === "ios" ? ({ borderCurve: "continuous" } as any) : {};
const ACCENT = "#E94A5A";

const IN_STATES = [/* ...same states ... */];

type Form = {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  photoUri?: string;
};

export default function Onboarding() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [form, setForm] = useState<Form>({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    photoUri: undefined,
  });
  const [stateModal, setStateModal] = useState(false);

  const setField = (k: keyof Form, v: string) => setForm(prev => ({ ...prev, [k]: v }));

  const pickPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Please allow photo library access to add your profile.");
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, aspect: [1,1], quality: 0.8,
    });
    if (!res.canceled) setField("photoUri", res.assets[0].uri);
  };

  // ✅ Correct way to go to the Home tab from a nested stack screen
  const goToHome = () => {
    const parent = navigation.getParent(); // Tab navigator
    if (parent) {
      parent.reset({
        index: 0,
        routes: [{ name: "Home" }], // <-- Tab name exactly as in RootTabs
      });
    } else {
      // Fallback (shouldn't normally happen)
      // @ts-ignore
      navigation.navigate("Home");
    }
  };

  return (
    <View style={[styles.root, { backgroundColor: themeColors.bg }]}>
      <LinearGradient
        colors={["#E7F0FF", "#FFFFFF"]}
        start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Pressable
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            style={styles.backBtn}
          >
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>

          <Text style={styles.title}>Onboarding</Text>
          <Text style={styles.sub}>
            Lorem ipsum dolor sit amet consectetur. Enim varius pharetra ac ut in arcu. Quisque nibh a porttitor
          </Text>

          <Pressable onPress={pickPhoto} style={[styles.avatarWrap, styles.avatarShadow]}>
            {form.photoUri ? (
              <Image source={{ uri: form.photoUri }} style={styles.avatar} />
            ) : (
              <View style={styles.placeholder}>
                <Image
                  source={{ uri: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png" }}
                  style={{ width: 36, height: 36, opacity: 0.35 }}
                />
                <Text style={styles.addPhoto}>+ Add Photo</Text>
              </View>
            )}
          </Pressable>
        </View>
      </LinearGradient>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 28 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic"
        >
          {/* sabhi input field yahan same rakho (no validation) */}

          {/* CTA Button — Always enabled */}
          <Pressable
            style={[styles.cta, styles.ctaEnabled]}
            onPress={goToHome} // ✅ use helper
          >
            <Text style={styles.ctaText}>Continue</Text>
          </Pressable>

          <View style={{ height: 12 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

/* -------------------- Styles -------------------- */
const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    width,
    paddingTop: 24,
    paddingBottom: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    ...IOS_CONTINUOUS,
  },
  headerContent: { alignItems: "center", paddingHorizontal: 20 },
  backBtn: {
    position: "absolute",
    left: 12,
    top: 52,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    fontSize: 28,
    lineHeight: 28,
    color: "#0E1726",
    fontFamily: fonts.bold,
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontFamily: fonts.bold,
    color: "#0E1726",
    marginTop: 68,
    textAlign: "center",
  },
  sub: {
    textAlign: "center",
    color: "#8A95A6",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },
  avatarWrap: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 18,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    ...IOS_CONTINUOUS,
  },
  avatarShadow: {
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOpacity: 0.12, shadowRadius: 18, shadowOffset: { width: 0, height: 8 } },
      android: { elevation: 4 },
    }),
  },
  avatar: { width: 120, height: 120, borderRadius: 60 },
  placeholder: { alignItems: "center", justifyContent: "center" },
  addPhoto: { marginTop: 8, color: "#748096", fontFamily: fonts.medium },
  cta: {
    height: 60,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    marginBottom: 18,
    ...IOS_CONTINUOUS,
  },
  ctaEnabled: {
    backgroundColor: ACCENT,
    ...Platform.select({
      ios: { shadowColor: ACCENT, shadowOpacity: 0.25, shadowRadius: 12, shadowOffset: { width: 0, height: 6 } },
      android: { elevation: 4 },
    }),
  },
  ctaText: { color: "#FFFFFF", fontSize: 16, fontFamily: fonts.semibold },
});
