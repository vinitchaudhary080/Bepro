import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { fonts } from "../../theme/type";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <Text style={styles.label}>{children}</Text>;
}

function FieldShell({
  children,
  onPress,
}: {
  children: React.ReactNode;
  onPress?: () => void;
}) {
  const Comp: any = onPress ? Pressable : View;
  return (
    <Comp onPress={onPress} style={styles.field}>
      {children}
    </Comp>
  );
}

export default function FixTimingContent() {
  const [betAmount, setBetAmount] = useState("2000");

  const [dt, setDt] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState<{
    visible: boolean;
    mode: "date" | "time";
  }>({ visible: false, mode: "date" });

  const [location, setLocation] = useState("");

  const openDateThenTime = () => {
    setShowPicker({ visible: true, mode: "date" });
  };

  const onChange = (e: DateTimePickerEvent, value?: Date) => {
    if (e.type === "dismissed") {
      setShowPicker({ visible: false, mode: "date" });
      return;
    }
    if (showPicker.mode === "date") {
      // store date and go to time
      const base = value ?? new Date();
      const prev = dt ?? new Date();
      const merged = new Date(
        base.getFullYear(),
        base.getMonth(),
        base.getDate(),
        prev.getHours(),
        prev.getMinutes()
      );
      setDt(merged);
      setShowPicker({ visible: true, mode: "time" });
    } else {
      // time selected → merge with existing date
      const base = value ?? new Date();
      const prev = dt ?? new Date();
      const merged = new Date(
        prev.getFullYear(),
        prev.getMonth(),
        prev.getDate(),
        base.getHours(),
        base.getMinutes()
      );
      setDt(merged);
      setShowPicker({ visible: false, mode: "date" });
    }
  };

  const displayDT = dt
    ? `${dt.toDateString()}  |  ${dt.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`
    : "Date | Time";

  return (
    <View style={styles.wrap}>
      {/* Bet Amount */}
      <View style={{ marginBottom: 16 }}>
        <FieldLabel>Bet Amount</FieldLabel>
        <FieldShell>
          <TextInput
            value={betAmount}
            onChangeText={setBetAmount}
            placeholder="0"
            placeholderTextColor="rgba(15,27,51,0.45)"
            keyboardType="number-pad"
            style={styles.input}
          />
        </FieldShell>
      </View>

      {/* Date | Time */}
      <View style={{ marginBottom: 16 }}>
        <FieldLabel>Date | Time</FieldLabel>
        <FieldShell onPress={openDateThenTime}>
          {/* 👇 icon optional; replace with your icon if you want */}
          <Text style={styles.leadingIcon}>📅</Text>
          <Text
            style={[
              styles.input,
              {
                color:
                  dt === null ? "rgba(15,27,51,0.45)" : "#0F1B33",
              },
            ]}
            numberOfLines={1}
          >
            {displayDT}
          </Text>
        </FieldShell>

        {showPicker.visible && (
          <DateTimePicker
            value={dt ?? new Date()}
            mode={showPicker.mode}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onChange}
          />
        )}
      </View>

      {/* Location */}
      <View style={{ marginBottom: 8 }}>
        <FieldLabel>Location</FieldLabel>
        <FieldShell>
          {/* 👇 icon optional; replace with your png if needed */}
          <Text style={styles.leadingIcon}>📍</Text>
          <TextInput
            value={location}
            onChangeText={setLocation}
            placeholder="Location"
            placeholderTextColor="rgba(15,27,51,0.45)"
            style={styles.input}
          />
        </FieldShell>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  label: {
    marginBottom: 8,
    color: "rgba(15,27,51,0.9)",
    fontSize: 13,
    fontFamily: fonts.semibold,
  },
  field: {
    minHeight: 52,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(15,27,51,0.12)",
    backgroundColor: "#F8FAFF",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.04,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
      },
      android: { elevation: 1 },
    }),
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#0F1B33",
    fontFamily: fonts.regular,
  },
  leadingIcon: {
    marginRight: 8,
    fontSize: 14,
    color: "rgba(15,27,51,0.6)",
  },
});
