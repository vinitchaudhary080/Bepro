import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={18} color="#888" />
      <TextInput
        style={styles.input}
        placeholder="Search player by name, number"
        placeholderTextColor="#999"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f6f8",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    color: "#000",
  },
});
