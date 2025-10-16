// pages/EditProfilePage.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const BG = "#F7F9FC";
const CARD = "#FFFFFF";
const TEXT = "#0E1B36";
const MUTED = "#7E8AA9";
const BORDER = "#E6EAF2";
const PINK = "#F85C8A";

export default function EditProfilePage() {
  const insets = useSafeAreaInsets();
  const nav = useNavigation();

  const [name, setName] = useState("Manoj Tiwari");
  const [location, setLocation] = useState("Bengaluru, Karnataka, India");
  const [batsmanType, setBatsmanType] = useState("Left Hand Batsman");
  const [breakType, setBreakType] = useState("Right Arm Off Break");

  const onSave = () => {
    // TODO: server call / validation
    // Example: nav.goBack();
    // @ts-ignore
    nav.goBack?.();
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top || 8 }]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            // @ts-ignore
            if (nav.canGoBack?.()) nav.goBack();
          }}
          style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.85 }]}
          hitSlop={10}
        >
          <Image
            source={require("../assets/icons/chevron-left.png")}
            style={{ width: 18, height: 18, tintColor: TEXT }}
          />
        </Pressable>

        <Text style={styles.title}>Profile Details</Text>
        <View style={{ width: 34 }} />{/* spacer to balance back button */}
      </View>

      <Text style={styles.subtitle}>
        Lorem ipsum dolor sit amet consectetur. Enim varius pharetra et in arcu.
        Quisque nibh a porttitor
      </Text>

      {/* Avatar */}
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <Image
          source={require("../assets/profile/manoj.jpg")} // ← profile image (same as Profile page)
          style={styles.avatar}
        />
      </View>

      {/* Form */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 12 : 0}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <LabeledInput label="Name" value={name} onChangeText={setName} />
          <LabeledInput label="Location" value={location} onChangeText={setLocation} />
          <LabeledInput label="Batsman Type" value={batsmanType} onChangeText={setBatsmanType} />
          <LabeledInput label="Break Type" value={breakType} onChangeText={setBreakType} />

          {/* Save button */}
          <Pressable onPress={onSave} style={({ pressed }) => [styles.saveBtn, pressed && { opacity: 0.95 }]}>
            <Text style={styles.saveText}>Save</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

function LabeledInput({
  label,
  value,
  onChangeText,
  placeholder,
}: {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
}) {
  return (
    <View style={{ marginTop: 14 }}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9AA8C6"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG,
  },

  header: {
    paddingHorizontal: 12,
    paddingBottom: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: BORDER,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: TEXT,
  },

  subtitle: {
    textAlign: "center",
    color: MUTED,
    fontSize: 12.5,
    lineHeight: 18,
    paddingHorizontal: 24,
    marginTop: 6,
  },

  avatar: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: "#E9EFF7",
  },

  inputLabel: {
    color: "#6F7D95",
    fontSize: 12,
    marginBottom: 6,
  },

  input: {
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: TEXT,
  },

  saveBtn: {
    marginTop: 18,
    backgroundColor: PINK,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  saveText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
