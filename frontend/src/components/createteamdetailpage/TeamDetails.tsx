import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";

type Props = {
  name: string;
  slug: string;
  logoUrl: string;
  onChangeName: (v: string) => void;
  onChangeSlug: (v: string) => void;
  onChangeLogoUrl: (v: string) => void;
};

export default function TeamDetails({
  name,
  slug,
  logoUrl,
  onChangeName,
  onChangeSlug,
  onChangeLogoUrl,
}: Props) {
  return (
    <View style={styles.section}>
      {/* Name */}
      <Text style={styles.label}>Team Name</Text>
      <View style={styles.inputWrap}>
        <TextInput
          value={name}
          onChangeText={onChangeName}
          placeholder="Enter team name"
          placeholderTextColor="#9AA2AB"
          style={styles.input}
        />
      </View>

      {/* Slug */}
      <Text style={[styles.label, { marginTop: 16 }]}>Slug</Text>
      <View style={styles.inputWrap}>
        <TextInput
          value={slug}
          onChangeText={onChangeSlug}
          placeholder="team-slug"
          placeholderTextColor="#9AA2AB"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
      </View>

      {/* Profile Image URL */}
      <Text style={[styles.label, { marginTop: 16 }]}>Profile Image URL</Text>
      <View style={styles.inputWrap}>
        <TextInput
          value={logoUrl}
          onChangeText={onChangeLogoUrl}
          placeholder="https://example.com/logo.png"
          placeholderTextColor="#9AA2AB"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="url"
          style={styles.input}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 20, marginTop: 14 },
  label: {
    fontSize: 14,
    color: "#59626D",
    marginBottom: 8,
    fontWeight: "600",
  },
  inputWrap: {
    height: 48,
    borderRadius: 12,
    backgroundColor: "#F5F7FA",
    borderWidth: 1,
    borderColor: "#E6EAF0",
    paddingHorizontal: 14,
    justifyContent: "center",
  },
  input: {
    fontSize: 15,
    color: "#0A0A0A",
  },
});
