export const fonts = {
  regular: "SFProRounded-Regular",
  medium: "SFProRounded-Medium",
  semibold: "SFProRounded-Semibold",
  bold: "SFProRounded-Bold",
};

export const type = {
  h1: { fontSize: 28, lineHeight: 34, fontFamily: fonts.bold as const },
  h2: { fontSize: 22, lineHeight: 28, fontFamily: fonts.bold as const },
  body: { fontSize: 14, lineHeight: 20, fontFamily: fonts.medium as const },
  caption: { fontSize: 12, lineHeight: 16, fontFamily: fonts.regular as const },
};
