// components/teamsetting/TeamCard.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Switch, ImageSourcePropType } from "react-native";

type Props = {
  image: ImageSourcePropType;
  name: string;
  caption: string;
  active?: boolean;
};

export default function TeamCard({
  image,
  name,
  caption,
  active = true,
}: Props) {
  const [enabled, setEnabled] = useState(active);

  return (
    <ImageBackground
      source={image}
      style={styles.bg}
      imageStyle={styles.bgImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.caption}>{caption}</Text>
        </View>

        <View style={styles.rightCol}>
          <Text style={styles.statusLabel}>Team Active</Text>
          <Switch
            value={enabled}
            onValueChange={() => setEnabled(!enabled)}
            trackColor={{ false: "rgba(15,23,42,0.1)", true: "rgba(16,185,129,0.35)" }}
            thumbColor={enabled ? "#10B981" : "#FFFFFF"}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    borderRadius: 14,
    overflow: "hidden",
    height: 150,
    marginBottom: 16,
  },
  bgImage: {
    borderRadius: 14,
  },
  overlay: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    backgroundColor: "rgba(0,0,0,0.25)",
    padding: 16,
  },
  name: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },
  caption: {
    color: "#E5E7EB",
    fontSize: 12,
  },
  rightCol: {
    alignItems: "flex-end",
    gap: 6,
  },
  statusLabel: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "500",
  },
});
