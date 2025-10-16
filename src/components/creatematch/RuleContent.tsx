import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Modal,
  FlatList,
  StyleSheet,
  Platform,
} from "react-native";
import { fonts } from "../../theme/type";

// ---------- Small atoms ----------
const Label = ({ children }: { children: React.ReactNode }) => (
  <Text style={styles.label}>{children}</Text>
);

const FieldShell = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.fieldShell}>{children}</View>
);

const Row = ({ children }: { children: React.ReactNode }) => (
  <View style={{ marginBottom: 14 }}>{children}</View>
);

// ---------- Select (custom modal) ----------
type Option = { label: string; value: string };

function SelectField({
  label,
  placeholder = "Select",
  options,
  value,
  onChange,
}: {
  label: string;
  placeholder?: string;
  options: Option[];
  value?: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selectedLabel = useMemo(
    () => options.find((o) => o.value === value)?.label,
    [options, value]
  );

  return (
    <Row>
      <Label>{label}</Label>
      <Pressable onPress={() => setOpen(true)}>
        <FieldShell>
          <Text
            style={[
              styles.inputText,
              { color: selectedLabel ? "#0F1B33" : "rgba(15,27,51,0.45)" },
            ]}
            numberOfLines={1}
          >
            {selectedLabel ?? placeholder}
          </Text>
          <Text style={styles.chev}>▾</Text>
        </FieldShell>
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>{label}</Text>
            <FlatList
              data={options}
              keyExtractor={(it) => it.value}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    onChange(item.value);
                    setOpen(false);
                  }}
                  style={({ pressed }) => [
                    styles.option,
                    pressed && { backgroundColor: "rgba(15,27,51,0.05)" },
                  ]}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </Pressable>
              )}
              ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            />
          </View>
        </Pressable>
      </Modal>
    </Row>
  );
}

// ---------- Toggle ----------
function Toggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <View style={styles.toggleRow}>
      <Text style={styles.toggleLabel}>{label}</Text>
      <Pressable
        onPress={() => onChange(!value)}
        style={[
          styles.switch,
          { backgroundColor: value ? "#00CBA8" : "rgba(15,27,51,0.15)" },
        ]}
      >
        <View
          style={[
            styles.knob,
            { transform: [{ translateX: value ? 22 : 2 }] },
          ]}
        />
      </Pressable>
    </View>
  );
}

// ---------- Main form ----------
export default function RuleContent() {
  // form state
  const [typeOfGame, setTypeOfGame] = useState<string>();
  const [matchType, setMatchType] = useState<string>();
  const [ballType, setBallType] = useState<string>();

  const [limitedOvers, setLimitedOvers] = useState<string>(""); // shown only when matchType === "limited_overs"
  const [players, setPlayers] = useState<string>("");
  const [overs, setOvers] = useState<string>("");

  const [noBall, setNoBall] = useState(false);
  const [wideBall, setWideBall] = useState(false);
  const [bye, setBye] = useState(false);
  const [lbw, setLBW] = useState(false);

  const [innings, setInnings] = useState<string>("");

  // options
  const typeOfGameOptions: Option[] = [
    { label: "Friendly", value: "friendly" },
    { label: "League", value: "league" },
    { label: "Knockout", value: "knockout" },
  ];

  const matchTypeOptions: Option[] = [
    { label: "Limited Overs", value: "limited_overs" },
    { label: "T10", value: "t10" },
    { label: "T20", value: "t20" },
    { label: "ODI (50 overs)", value: "odi" },
    { label: "Test", value: "test" },
  ];

  const ballTypeOptions: Option[] = [
    { label: "Leather (Red)", value: "leather_red" },
    { label: "White Leather", value: "leather_white" },
    { label: "Tennis", value: "tennis" },
    { label: "Rubber", value: "rubber" },
  ];

  return (
    <View style={styles.wrap}>
      {/* dropdowns */}
      <SelectField
        label="Type of Game"
        options={typeOfGameOptions}
        value={typeOfGame}
        onChange={setTypeOfGame}
      />

      <SelectField
        label="Match Type"
        options={matchTypeOptions}
        value={matchType}
        onChange={setMatchType}
      />

      <SelectField
        label="Ball Type"
        options={ballTypeOptions}
        value={ballType}
        onChange={setBallType}
      />

      {/* conditional field */}
      {matchType === "limited_overs" && (
        <Row>
          <Label>If user select limited over</Label>
          <FieldShell>
            <TextInput
              value={limitedOvers}
              onChangeText={setLimitedOvers}
              placeholder="Enter over"
              placeholderTextColor="rgba(15,27,51,0.45)"
              style={styles.inputText}
              keyboardType="number-pad"
            />
          </FieldShell>
        </Row>
      )}

      {/* numbers */}
      <Row>
        <Label>Number of Players</Label>
        <FieldShell>
          <TextInput
            value={players}
            onChangeText={setPlayers}
            placeholder="Enter Players Number"
            placeholderTextColor="rgba(15,27,51,0.45)"
            style={styles.inputText}
            keyboardType="number-pad"
          />
        </FieldShell>
      </Row>

      <Row>
        <Label>Number of Overs</Label>
        <FieldShell>
          <TextInput
            value={overs}
            onChangeText={setOvers}
            placeholder="Enter Overs Number"
            placeholderTextColor="rgba(15,27,51,0.45)"
            style={styles.inputText}
            keyboardType="number-pad"
          />
        </FieldShell>
      </Row>

      {/* toggles */}
      <Toggle label="No ball" value={noBall} onChange={setNoBall} />
      <Toggle label="Wide ball" value={wideBall} onChange={setWideBall} />
      <Toggle label="Bye" value={bye} onChange={setBye} />
      <Toggle label="Lbw" value={lbw} onChange={setLBW} />

      {/* innings */}
      <Row>
        <Label>Number of Innings</Label>
        <FieldShell>
          <TextInput
            value={innings}
            onChangeText={setInnings}
            placeholder="Enter"
            placeholderTextColor="rgba(15,27,51,0.45)"
            style={styles.inputText}
            keyboardType="number-pad"
          />
        </FieldShell>
      </Row>

      {/* NOTE: yahan se tum form state ko parent me lift karke Next pe pass kar sakte ho */}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 16, paddingTop: 6, paddingBottom: 24 },

  label: {
    marginBottom: 8,
    color: "rgba(15,27,51,0.9)",
    fontSize: 13,
    fontFamily: fonts.semibold,
  },

  fieldShell: {
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(15,27,51,0.12)",
    backgroundColor: "#F8FAFF",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 3, shadowOffset: { width: 0, height: 2 } },
      android: { elevation: 1 },
    }),
  },

  inputText: {
    flex: 1,
    fontSize: 14,
    color: "#0F1B33",
    fontFamily: fonts.regular,
  },

  chev: {
    marginLeft: 8,
    fontSize: 16,
    color: "rgba(15,27,51,0.45)",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },

  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    maxHeight: "60%",
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 20,
  },

  sheetTitle: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: "#0F1B33",
    marginBottom: 10,
    textAlign: "center",
  },

  option: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(15,27,51,0.08)",
    backgroundColor: "#fff",
  },

  optionText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: "#0F1B33",
  },

  toggleRow: {
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(15,27,51,0.12)",
    backgroundColor: "#F8FAFF",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  toggleLabel: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: "#0F1B33",
  },

  switch: {
    width: 44,
    height: 26,
    borderRadius: 13,
    padding: 0,
    justifyContent: "center",
  },

  knob: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
});
