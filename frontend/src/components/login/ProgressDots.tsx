import React from "react";
import { View } from "react-native";

type Props = {
  total?: number;
  activeIndex?: number; // 0-based
  accent?: string;
};

export default function ProgressDots({ total = 4, activeIndex = 0, accent = "#E94A5A" }: Props) {
  const dots = Array.from({ length: total });

  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      {dots.map((_, i) => {
        const active = i === activeIndex;
        const w = active ? 36 : 16;
        const h = 8;
        const br = 8;
        const bg = active ? accent : "#E6E9EE";
        return <View key={i} style={{ width: w, height: h, borderRadius: br, backgroundColor: bg }} />;
      })}
    </View>
  );
}
