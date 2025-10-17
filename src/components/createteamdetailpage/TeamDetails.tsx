import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Modal, FlatList } from "react-native";

type Props = {
  teamName: string;
  onChangeName: (v: string) => void;
  teamType: string | null;
  onChangeType: (v: string) => void;
};

const TYPES = ["Academy", "Corporate", "College", "Local Club", "Friends", "District", "State"];

export default function TeamDetails({ teamName, onChangeName, teamType, onChangeType }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.section}>
      {/* Team Name */}
      <Text style={styles.label}>Team Name</Text>
      <View style={styles.inputWrap}>
        <TextInput
          value={teamName}
          onChangeText={onChangeName}
          placeholder="Enter team name"
          placeholderTextColor="#9AA2AB"
          style={styles.input}
        />
      </View>

      {/* Team Type */}
      <Text style={[styles.label, { marginTop: 16 }]}>Team Type</Text>
      <Pressable onPress={() => setOpen(true)}>
        <View style={styles.inputWrap}>
          <Text style={[styles.input, { paddingTop: 12 }]}>
            {teamType ?? "Select"}
          </Text>
        </View>
      </Pressable>

      {/* Simple Picker Modal */}
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.modalBg} onPress={() => setOpen(false)}>
          <View style={styles.sheet}>
            <FlatList
              data={TYPES}
              keyExtractor={(it) => it}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    onChangeType(item);
                    setOpen(false);
                  }}
                  style={styles.option}
                >
                  <Text style={{ fontSize: 16, color: "#0A0A0A" }}>{item}</Text>
                </Pressable>
              )}
              ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: "#EDF0F4" }} />}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { paddingHorizontal: 20, marginTop: 14 },
  label: { fontSize: 14, color: "#59626D", marginBottom: 8, fontWeight: "600" },
  inputWrap: {
    height: 48,
    borderRadius: 12,
    backgroundColor: "#F5F7FA",
    borderWidth: 1,
    borderColor: "#E6EAF0",
    paddingHorizontal: 14,
    justifyContent: "center",
  },
  input: { fontSize: 15, color: "#0A0A0A" },

  modalBg: { flex: 1, backgroundColor: "rgba(0,0,0,0.2)", justifyContent: "flex-end" },
  sheet: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "50%",
  },
  option: { paddingVertical: 14, paddingHorizontal: 16 },
});
