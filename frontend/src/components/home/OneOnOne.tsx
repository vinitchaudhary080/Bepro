import React, { memo, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { fonts } from "../../theme/type";

const { width } = Dimensions.get("window");

// layout sizing (screenshot-like)
const H_PADDING = 16;
const GUTTER = 12;
const CARD_W = Math.floor((width - H_PADDING * 2 - GUTTER) / 2);
const CARD_H = 44;
const RADIUS = 14;

export type OneOnOneItem = {
  id: string | number;
  title: string;
  icon: any; // require("...") or { uri }
};

type Props = {
  title?: string;
  data: OneOnOneItem[];
  onPressItem?: (item: OneOnOneItem) => void;
};

function Tile({ item, onPress }: { item: OneOnOneItem; onPress?: (i: OneOnOneItem) => void }) {
  return (
    <Pressable
      onPress={() => onPress?.(item)}
      android_ripple={{ color: "rgba(0,0,0,0.06)", borderless: false }}
      style={({ pressed }) => [
        styles.card,
        pressed && Platform.OS === "ios" && { transform: [{ scale: 0.98 }] },
      ]}
    >
      {/* gradient icon (already baked into provided PNG/SVG) */}
      <View style={styles.iconWrap}>
        <Image source={item.icon} style={styles.icon} resizeMode="contain" />
      </View>

      <Text style={styles.label} numberOfLines={1}>
        {item.title}
      </Text>
    </Pressable>
  );
}

function OneOnOne({ title = "One on One", data, onPressItem }: Props) {
  const key = useCallback((it: OneOnOneItem) => String(it.id), []);
  const render = useCallback(
    ({ item }: { item: OneOnOneItem }) => <Tile item={item} onPress={onPressItem} />,
    [onPressItem]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{title}</Text>

      <FlatList
        data={data}
        keyExtractor={key}
        renderItem={render}
        numColumns={2}
        columnWrapperStyle={{ gap: GUTTER, paddingHorizontal: H_PADDING }}
        ItemSeparatorComponent={() => <View style={{ height: GUTTER }} />}
        contentContainerStyle={{ paddingBottom: 4 }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false} // section height stays compact inside Home scroll
        getItemLayout={(_, index) => ({
          length: CARD_H + GUTTER,
          offset: (CARD_H + GUTTER) * Math.floor(index / 2),
          index,
        })}
      />
    </View>
  );
}

export default memo(OneOnOne);

/* ---------------- styles ---------------- */

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
  },
  heading: {
    marginLeft: H_PADDING,
    marginBottom: 12,
    fontSize: 18,
    color: "#0E1628",
    fontFamily: fonts.semibold,
  },
  card: {
    width: CARD_W,
    height: CARD_H,
    borderRadius: RADIUS,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    // soft neumorphic-ish shadow like ref
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
      },
      android: { elevation: 1 },
    }),
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 12,
    // subtle fallback if icon PNG has transparent edges
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    overflow: "hidden",
  },
  icon: {
    width: 32,
    height: 32,
  },
  label: {
    flex: 1,
    fontSize: 14,
    color: "#1A2B4B",
    fontFamily: fonts.semibold,
  },
});
