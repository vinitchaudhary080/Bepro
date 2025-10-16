// src/components/myteam/Hero.tsx
import React, { memo, useCallback } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  Pressable,
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fonts } from "../../theme/type";

const { width } = Dimensions.get("window");
const H_PADDING = 16;
const CARD_W = 110;
const CARD_H = 110;
const RADIUS = 16;
const GUTTER = 12;

export type TeamTypeItem = {
  id: string | number;
  title: string;         // e.g. "Match Type A"
  icon: any;             // require(".../pill.png")
  isCreate?: boolean;    // if true, render as "+ Create Team"
};

type Props = {
  bgImage: any;
  items: TeamTypeItem[];
  onPressCreate?: () => void;
  onPressItem?: (it: TeamTypeItem) => void;
};

function TypeCard({
  item,
  onPressCreate,
  onPressItem,
}: {
  item: TeamTypeItem;
  onPressCreate?: () => void;
  onPressItem?: (it: TeamTypeItem) => void;
}) {
  const onPress = () =>
    item.isCreate ? onPressCreate?.() : onPressItem?.(item);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && { transform: [{ scale: 0.98 }] },
      ]}
    >
      <View style={styles.iconWrap}>
        <Image source={item.icon} style={styles.icon} resizeMode="contain" />
      </View>

      <Text
        style={[
          styles.cardTitle,
          item.isCreate ? styles.createText : undefined,
        ]}
        numberOfLines={1}
      >
        {item.isCreate ? "+ Create Team" : item.title}
      </Text>
    </Pressable>
  );
}

function MyTeamHero({ bgImage, items, onPressCreate, onPressItem }: Props) {
  const insets = useSafeAreaInsets();

  const key = useCallback((it: TeamTypeItem) => String(it.id), []);
  const render = useCallback(
    ({ item }: { item: TeamTypeItem }) => (
      <TypeCard
        item={item}
        onPressCreate={onPressCreate}
        onPressItem={onPressItem}
      />
    ),
    [onPressCreate, onPressItem]
  );

  return (
    <View>
      <ImageBackground
        source={bgImage}
        resizeMode="cover"
        style={[
          styles.hero,
          { paddingTop: Math.max(insets.top + 6, 18) },
        ]}
      >
        <Text style={styles.heading}>Type of Teams</Text>

        <FlatList
          data={items}
          keyExtractor={key}
          renderItem={render}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: H_PADDING }}
          ItemSeparatorComponent={() => <View style={{ width: GUTTER }} />}
          getItemLayout={(_, index) => ({
            length: CARD_W + GUTTER,
            offset: (CARD_W + GUTTER) * index + H_PADDING,
            index,
          })}
        />
      </ImageBackground>
    </View>
  );
}

export default memo(MyTeamHero);

/* ---------------- styles ---------------- */

const styles = StyleSheet.create({
  hero: {
    width,
    paddingBottom: 18,
    gap: 12,
  },
  heading: {
    marginLeft: H_PADDING,
    marginBottom: 6,
    fontSize: 20,
    color: "#141A29",
    fontFamily: fonts.semibold,
  },

  card: {
    width: CARD_W,
    height: CARD_H,
    borderRadius: RADIUS,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
      },
      android: { elevation: 3 },
    }),
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    // overflow removed ✅
  },
  icon: { width: 36, height: 36 },

  cardTitle: {
    fontSize: 13,
    color: "#6A748F",
    fontFamily: fonts.semibold,
  },
  createText: {
    color: "#FF3A57",
  },
});
