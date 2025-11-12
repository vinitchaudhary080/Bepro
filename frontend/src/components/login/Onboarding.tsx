// src/components/login/Onboarding.tsx
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  Platform,
  Modal,
  FlatList,
  Dimensions,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, StackActions, useRoute } from "@react-navigation/native";
import { colors as themeColors } from "../../theme/colors";
import { fonts } from "../../theme/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api, getToken } from "../../config/api";

const { width } = Dimensions.get("window");
const IOS_CONTINUOUS =
  Platform.OS === "ios" ? ({ borderCurve: "continuous" } as any) : {};
const ACCENT = "#E94A5A";

// 🔗 Onboarding API base
const API_BASE = "http://172.20.10.2:4000";

const IN_STATES = [
  "Delhi",
  "Maharashtra",
  "Karnataka",
  "Uttar Pradesh",
  "Gujarat",
  "Rajasthan",
  "Haryana",
  "Punjab",
  "West Bengal",
  "Tamil Nadu",
];

enum PlayerRole {
  BATSMAN = "BATSMAN",
  BOWLER = "BOWLER",
  ALL_ROUNDER = "ALL_ROUNDER",
  WICKET_KEEPER = "WICKET_KEEPER",
}
enum BattingHand {
  RIGHT = "RIGHT",
  LEFT = "LEFT",
}
enum BowlingStyle {
  NONE = "NONE",
  FAST = "FAST",
  MEDIUM = "MEDIUM",
  SPIN = "SPIN",
}
enum ExperienceLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}

type Form = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  primaryRole: PlayerRole;
  battingHand: BattingHand;
  bowlingStyle: BowlingStyle;
  experience: ExperienceLevel;
  jerseyNumber?: string;
  preferredPositions: string;
  photoUri?: string;
  avatarUrl?: string;
};

const CHIP = (p: { label: string; active: boolean; onPress: () => void }) => (
  <Pressable
    onPress={p.onPress}
    style={[styles.chip, p.active ? styles.chipActive : styles.chipIdle]}
  >
    <Text
      style={[styles.chipText, p.active ? { color: "#fff" } : undefined]}
    >
      {p.label}
    </Text>
  </Pressable>
);

export default function Onboarding() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  // Prefill from Registration
  const prefill = useMemo(() => {
    const p = route?.params?.prefill || {};
    return {
      name: (p?.name ?? "").trim(),
      email: (p?.email ?? "").trim(),
      phone: (p?.phone ?? "").trim(),
    };
  }, [route?.params]);

  // Token from Registration (highest priority)
  const routeAccess: string | undefined = route?.params?.tokens?.access;

  const [form, setForm] = useState<Form>({
    name: prefill.name || "",
    email: prefill.email || "",
    phone: prefill.phone || "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    primaryRole: PlayerRole.ALL_ROUNDER,
    battingHand: BattingHand.RIGHT,
    bowlingStyle: BowlingStyle.MEDIUM,
    experience: ExperienceLevel.INTERMEDIATE,
    jerseyNumber: "",
    preferredPositions: "",
    photoUri: undefined,
    avatarUrl: undefined,
  });

  const [stateModal, setStateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const setField = (k: keyof Form, v: any) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  // route → storage → helper
  const getAccessTokenDeterministic = async (): Promise<string | null> => {
    if (routeAccess) return String(routeAccess);
    const stored =
      (await AsyncStorage.getItem("accessToken")) ||
      (await AsyncStorage.getItem("token"));
    if (stored) return stored;
    try {
      const t = await getToken();
      if (t) return String(t);
    } catch {}
    return null;
  };

  // set client header (optional) & return token for explicit use
  const ensureAuthHeader = async (): Promise<string | null> => {
    const access = await getAccessTokenDeterministic();
    if (!access) return null;

    // prefer api.setToken if available
    // @ts-ignore
    if (typeof api?.setToken === "function") {
      // @ts-ignore
      api.setToken(access);
    } else if (api?.defaults?.headers) {
      // @ts-ignore
      api.defaults.headers.common =
        api.defaults.headers.common || {};
      // @ts-ignore
      api.defaults.headers.common.Authorization = `Bearer ${access}`;
    } else {
      // @ts-ignore
      api.token = access;
    }
    return access;
  };

  const pickPhoto = async () => {
    const { status } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "Please allow photo library access to add your profile."
      );
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({
      // ✅ new API – no deprecation warning
      mediaTypes: [ImagePicker.MediaType.IMAGE],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.85,
    });

    if (!res.canceled) setField("photoUri", res.assets[0].uri);
  };

  // avatar upload (optional) → return URL ya undefined
  async function uploadAvatarIfNeeded(
    accessToken?: string
  ): Promise<string | undefined> {
    if (!form.photoUri || !accessToken) return undefined;

    const fd = new FormData();
    fd.append(
      "file",
      {
        uri: form.photoUri,
        name: "avatar.jpg",
        type: "image/jpeg",
      } as any
    );
    fd.append("folder", "bepro/avatars");

    const res = await api.post("/media/upload", fd, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const url = res?.data?.url ?? res?.url;
    console.log("✅ Uploaded to Cloudinary via backend:", url);
    return url;
  }

  const onContinue = async () => {
    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.state
    ) {
      Alert.alert("Missing info", "Please fill your basic details.");
      return;
    }

    setLoading(true);
    try {
      // token try karenge, agar nahi mila to bhi request karega (without auth)
      const access = await ensureAuthHeader().catch(() => null);

      // avatar url decide karo
      let avatarUrl = await uploadAvatarIfNeeded(access ?? undefined);
      if (!avatarUrl) {
        // 👇 default avatar if nothing uploaded
        avatarUrl = "https://cdn.example.com/avatars/u1.png";
      }

      // 👇 payload ko simple / expected keys pe laa diya (name instead of fullName)
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        state: form.state,
        pincode: form.pincode || undefined,
        primaryRole: form.primaryRole,
        battingHand: form.battingHand,
        bowlingStyle: form.bowlingStyle,
        jerseyNumber: form.jerseyNumber
          ? Number(form.jerseyNumber)
          : undefined,
        experience: form.experience,
        preferredPositions: form.preferredPositions
          ? form.preferredPositions
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
        avatarUrl, // final avatar url (uploaded or default)
        consentAccepted: true,
        notifMatchAlerts: true,
        notifTeamEvents: true,
        notifWalletUpdates: true,
        completed: true,
      };

      const res = await fetch(`${API_BASE}/onboarding`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(access ? { Authorization: `Bearer ${access}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      const text = await res.text(); // raw text
      let data: any = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = text || null;
      }

      console.log("[ONBOARDING] status:", res.status);
      console.log("[ONBOARDING] response body:", data);

      if (!res.ok) {
        const msgFromServer =
          (data && data.message) ||
          (Array.isArray(data?.message) && data.message[0]) ||
          data?.error ||
          data?.detail ||
          (typeof data === "string" ? data : null);

        const msg =
          msgFromServer || `Onboarding failed (status ${res.status})`;
        throw new Error(String(msg));
      }

      console.log("ONBOARDING SUCCESS →", data);

      // Navigate Home / RootTabs
      let nav: any = navigation;
      while (nav?.getParent && nav.getParent()) nav = nav.getParent();
      nav.dispatch(StackActions.replace("RootTabs"));
    } catch (e: any) {
      console.warn("ONBOARDING ERROR →", e);
      const msg = e?.message || "Onboarding failed";
      Alert.alert("Error", msg);
    } finally {
      setLoading(false);
    }
  };

  const AvatarPreview = () => {
    const preview = form.photoUri;
    return (
      <Pressable
        onPress={pickPhoto}
        style={[styles.avatarWrap, styles.avatarShadow]}
      >
        {preview ? (
          <Image source={{ uri: preview }} style={styles.avatar} />
        ) : (
          <View style={styles.placeholder}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png",
              }}
              style={{ width: 36, height: 36, opacity: 0.35 }}
            />
            <Text style={styles.addPhoto}>+ Add Photo</Text>
          </View>
        )}
      </Pressable>
    );
  };

  return (
    <View style={[styles.root, { backgroundColor: themeColors.bg }]}>
      <LinearGradient
        colors={["#E7F0FF", "#FFFFFF"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
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
            Please complete your basic details to get started.
          </Text>

          <AvatarPreview />
        </View>
      </LinearGradient>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 12,
            paddingBottom: 28,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic"
        >
          <Field label="Full Name">
            <Input
              value={form.name}
              onChangeText={(t) => setField("name", t)}
              placeholder="e.g., Vinit Chaudhary"
            />
          </Field>

          <Field label="Email">
            <Input
              value={form.email}
              onChangeText={(t) => setField("email", t)}
              placeholder="e.g., vinit@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </Field>

          <Field label="Phone">
            <Input
              value={form.phone}
              onChangeText={(t) => setField("phone", t)}
              placeholder="e.g., +91 98765 43210"
              keyboardType="phone-pad"
            />
          </Field>

          <Field label="Address">
            <Input
              value={form.address}
              onChangeText={(t) => setField("address", t)}
              placeholder="e.g., C-123, Street 4, Laxmi Nagar"
            />
          </Field>

          <View style={{ flexDirection: "row", gap: 12 }}>
            <View style={{ flex: 1 }}>
              <Field label="City">
                <Input
                  value={form.city}
                  onChangeText={(t) => setField("city", t)}
                  placeholder="e.g., New Delhi"
                />
              </Field>
            </View>
            <View style={{ flex: 1 }}>
              <Field label="State">
                <Pressable
                  style={styles.inputBox}
                  onPress={() => setStateModal(true)}
                >
                  <Text
                    style={[
                      styles.inputText,
                      form.state
                        ? { color: "#0E1726" }
                        : { color: "#A4AEC0" },
                    ]}
                  >
                    {form.state || "Select state"}
                  </Text>
                </Pressable>
              </Field>
            </View>
          </View>

          <View style={{ flexDirection: "row", gap: 12 }}>
            <View style={{ flex: 1 }}>
              <Field label="Pincode">
                <Input
                  value={form.pincode}
                  onChangeText={(t) => setField("pincode", t)}
                  placeholder="6-digit pincode"
                  keyboardType="number-pad"
                  maxLength={6}
                />
              </Field>
            </View>
            <View style={{ flex: 1 }}>
              <Field label="Jersey # (optional)">
                <Input
                  value={form.jerseyNumber || ""}
                  onChangeText={(t) => setField("jerseyNumber", t)}
                  placeholder="e.g., 7"
                  keyboardType="number-pad"
                />
              </Field>
            </View>
          </View>

          <Field label="Primary Role">
            <View style={styles.rowChips}>
              {Object.values(PlayerRole).map((r) => (
                <CHIP
                  key={r}
                  label={r.replace("_", " ")}
                  active={form.primaryRole === r}
                  onPress={() => setField("primaryRole", r)}
                />
              ))}
            </View>
          </Field>

          <Field label="Batting Hand">
            <View style={styles.rowChips}>
              {Object.values(BattingHand).map((b) => (
                <CHIP
                  key={b}
                  label={b}
                  active={form.battingHand === b}
                  onPress={() => setField("battingHand", b)}
                />
              ))}
            </View>
          </Field>

          <Field label="Bowling Style">
            <View style={styles.rowChips}>
              {Object.values(BowlingStyle).map((b) => (
                <CHIP
                  key={b}
                  label={b}
                  active={form.bowlingStyle === b}
                  onPress={() => setField("bowlingStyle", b)}
                />
              ))}
            </View>
          </Field>

          <Field label="Experience">
            <View style={styles.rowChips}>
              {Object.values(ExperienceLevel).map((e) => (
                <CHIP
                  key={e}
                  label={e}
                  active={form.experience === e}
                  onPress={() => setField("experience", e)}
                />
              ))}
            </View>
          </Field>

          <Field label="Preferred Positions (comma separated)">
            <Input
              value={form.preferredPositions}
              onChangeText={(t) => setField("preferredPositions", t)}
              placeholder="e.g., Opener, Slip"
              autoCapitalize="words"
            />
          </Field>

          <Pressable
            style={[
              styles.cta,
              styles.ctaEnabled,
              loading && { opacity: 0.7 },
            ]}
            onPress={onContinue}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.ctaText}>Continue</Text>
            )}
          </Pressable>

          <View style={{ height: 12 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* State Picker Modal */}
      <Modal
        visible={stateModal}
        transparent
        animationType="fade"
        onRequestClose={() => setStateModal(false)}
      >
        <Pressable
          style={styles.backdrop}
          onPress={() => setStateModal(false)}
        >
          <View />
        </Pressable>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>Select State</Text>
          <FlatList
            data={IN_STATES}
            keyExtractor={(it) => it}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  setField("state", item);
                  setStateModal(false);
                }}
                style={[
                  styles.stateItem,
                  form.state === item ? { borderColor: ACCENT } : null,
                ]}
              >
                <Text style={styles.stateText}>{item}</Text>
              </Pressable>
            )}
            contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
          />
        </View>
      </Modal>
    </View>
  );
}

/* ---------- small form helpers ---------- */
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
}
function Input(props: any) {
  return (
    <TextInput
      placeholderTextColor="#A4AEC0"
      style={styles.inputBox}
      {...props}
    />
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
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 8 },
      },
      android: { elevation: 4 },
    }),
  },
  avatar: { width: 120, height: 120, borderRadius: 60 },
  placeholder: { alignItems: "center", justifyContent: "center" },
  addPhoto: { marginTop: 8, color: "#748096", fontFamily: fonts.medium },

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
    fontSize: 16,
    color: "#0E1726",
    fontFamily: fonts.medium,
    ...IOS_CONTINUOUS,
  },
  inputText: { fontSize: 16, fontFamily: fonts.medium },

  rowChips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    paddingHorizontal: 12,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  chipIdle: { borderColor: "#E6EAF2" },
  chipActive: { borderColor: ACCENT, backgroundColor: ACCENT },
  chipText: { color: "#0E1726", fontFamily: fonts.medium, fontSize: 13 },

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
      ios: {
        shadowColor: ACCENT,
        shadowOpacity: 0.25,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
      },
      android: { elevation: 4 },
    }),
  },
  ctaText: { color: "#FFFFFF", fontSize: 16, fontFamily: fonts.semibold },

  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.2)" },
  modalCard: {
    position: "absolute",
    left: 16,
    right: 16,
    top: 120,
    bottom: 120,
    borderRadius: 16,
    backgroundColor: "#fff",
    ...IOS_CONTINUOUS,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 10 },
      },
      android: { elevation: 6 },
    }),
  },
  modalTitle: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: "#0E1726",
    padding: 16,
    paddingBottom: 8,
  },
  stateItem: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E6EAF2",
  },
  stateText: { fontFamily: fonts.medium, color: "#0E1726" },
});
