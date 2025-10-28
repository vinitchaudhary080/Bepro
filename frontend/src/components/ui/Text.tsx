// src/components/ui/Text.tsx
import React from "react";
import { Text as RNText, TextProps } from "react-native";

const families = {
  regular: "SFProRounded-Regular",
  medium: "SFProRounded-Medium",
  semibold: "SFProRounded-Semibold",
  bold: "SFProRounded-Bold",
};

export default function Text(
  { weight = "regular", style, ...rest }:
  TextProps & { weight?: keyof typeof families }
) {
  return <RNText {...rest} style={[{ fontFamily: families[weight] }, style]} />;
}
