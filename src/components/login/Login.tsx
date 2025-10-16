import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  View, Text, Image, StyleSheet, Pressable, Dimensions, Platform,
  FlatList, NativeScrollEvent, NativeSyntheticEvent
} from "react-native";
import ProgressDots from "./ProgressDots";
import { colors as themeColors } from "../../theme/colors";
import { s } from "../../theme/spacing";
import { fonts } from "../../theme/type";

const { width, height: SCREEN_H } = Dimensions.get("window");
const RADIUS = 28;
const OVERLAP = 18;

// 🔧 Shorter fixed height so content tight rahe
const SHEET_HEIGHT = Math.min(460, Math.max(360, Math.round(SCREEN_H * 0.42)));

export type LoginSlide = {
  image: any;
  title: string;
  description: string;
};

type Props = {
  slides: LoginSlide[];
  accent?: string;
  autoPlay?: boolean;
  intervalMs?: number;
  backgroundColor?: string;
  onContinue?: (index: number, isLast: boolean) => void;
};

export default function Login({
  slides,
  accent = "#E94A5A",
  autoPlay = true,
  intervalMs = 3500,
  backgroundColor = themeColors?.bg ?? "#0B0F1A",
  onContinue,
}: Props) {
  const total = slides?.length ?? 0;
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList<LoginSlide>>(null);
  const canAutoPlay = autoPlay && total > 1;

  useEffect(() => {
    if (!canAutoPlay) return;
    const id = setInterval(() => {
      setIndex(prev => {
        const next = (prev + 1) % total;
        listRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, intervalMs);
    return () => clearInterval(id);
  }, [canAutoPlay, intervalMs, total]);

  const onMomentumEnd = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const next = Math.round(x / width);
    if (next !== index) setIndex(next);
  }, [index]);

  const keyExtractor = useCallback((_, i: number) => String(i), []);
  const renderItem = useCallback(({ item }: { item: LoginSlide }) => {
    return <Image source={item.image} resizeMode="cover" style={styles.hero} />;
  }, []);

  const { title, description } = useMemo(() => slides[index] ?? slides[0], [slides, index]);

  const handleContinue = () => {
    const isLast = index === total - 1;
    onContinue?.(index, isLast);
    if (!onContinue) {
      const next = (index + 1) % total;
      listRef.current?.scrollToIndex({ index: next, animated: true });
      setIndex(next);
    }
  };

  return (
    <View style={[styles.root, { backgroundColor }]}>
      {/* Top image carousel */}
      <FlatList
        ref={listRef}
        data={slides}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumEnd}
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
        initialScrollIndex={0}
      />

      {/* Bottom sheet: edge-to-edge left/right, bottom flush */}
      <View style={[styles.sheet, styles.shadow, { height: SHEET_HEIGHT }]}>
        {/* Header: dots */}
        <View style={styles.dotsWrap}>
          <ProgressDots total={total} activeIndex={index} accent={accent} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {title}
          </Text>
          <Text style={styles.desc} numberOfLines={3} ellipsizeMode="tail">
            {description}
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Pressable onPress={handleContinue} style={[styles.cta, styles.ctaShadow, { backgroundColor: accent }]}>
            <Text style={styles.ctaText}>Continue</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  hero: {
    width,
    height: Math.round((width / 9) * 14),
  },

  // ⬇️ Absolute sheet: no side/bottom margin
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    // Slight overlap with hero for that tucked look
    transform: [{ translateY: OVERLAP * -1 }],
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: RADIUS,
    borderTopRightRadius: RADIUS,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,

    // tighter paddings
    paddingTop: 12,
    paddingBottom: 10,
    paddingHorizontal: 16,

    // internal layout
    justifyContent: "space-between",
  },
  shadow: {
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOpacity: 0.10, shadowRadius: 14, shadowOffset: { width: 0, height: -2 } },
      android: { elevation: 8 },
    }),
  },

  dotsWrap: {
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 0,
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 4,
  },
  title: {
    textAlign: "center",
    color: "#0E1726",
    fontSize: 28,             // a bit smaller
    letterSpacing: 0.2,
    marginTop: 0,
    marginBottom: 6,
    fontFamily: fonts.bold,
  },
  desc: {
    textAlign: "center",
    color: "#8A95A6",         // slightly lighter
    fontSize: 13,
    lineHeight: 18,
    fontFamily: fonts.regular,
    maxWidth: 320,
  },

  footer: {
    paddingTop: 6,
    paddingBottom: Platform.OS === "ios" ? 8 : 6,
  },
  cta: {
    height: 60,               // thoda compact
    borderRadius: 14,         // pillier button
    alignItems: "center",
    justifyContent: "center",
  },
  ctaShadow: {
    ...Platform.select({
      ios: { shadowColor: "#E94A5A", shadowOpacity: 0.25, shadowRadius: 12, shadowOffset: { width: 0, height: 6 } },
      android: { elevation: 4 },
    }),
  },
  ctaText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: fonts.semibold,
  },
});
