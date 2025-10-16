import React, { memo, useCallback } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  Pressable,
  Platform,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { fonts } from "../../theme/type";

const { width } = Dimensions.get("window");

// slightly larger so image feels more immersive
const CARD_W = 150;
const CARD_H = 190;
const RADIUS = 16;
const GUTTER = 16;

export type PlayerItem = {
  id: string | number;
  name: string;
  role: string;
  image: any;
};

type Props = {
  title?: string;
  data: PlayerItem[];
  onPressItem?: (item: PlayerItem) => void;
};

function PlayerCard({
  item,
  onPress,
}: {
  item: PlayerItem;
  onPress?: (it: PlayerItem) => void;
}) {
  return (
    <Pressable
      onPress={() => onPress?.(item)}
      style={({ pressed }) => [
        styles.cardWrap,
        pressed && { transform: [{ scale: 0.97 }] },
      ]}
    >
      {/* full image as background */}
      <ImageBackground
        source={item.image}
        style={styles.card}
        imageStyle={styles.cardImg}
        resizeMode="cover"
      >
        {/* dark-to-transparent gradient for text readability */}
        <LinearGradient
          colors={[
            "rgba(0,0,0,0.85)",
            "rgba(0,0,0,0.45)",
            "rgba(0,0,0,0.05)",
            "transparent",
          ]}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
          style={styles.gradient}
        />

        {/* text overlay */}
        <View style={styles.caption}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.role} numberOfLines={1}>
            {item.role}
          </Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

function TopPlayers({ title = "Top Players", data, onPressItem }: Props) {
  const key = useCallback((it: PlayerItem) => String(it.id), []);
  const render = useCallback(
    ({ item }: { item: PlayerItem }) => (
      <PlayerCard item={item} onPress={onPressItem} />
    ),
    [onPressItem]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <FlatList
        data={data}
        keyExtractor={key}
        renderItem={render}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ItemSeparatorComponent={() => <View style={{ width: GUTTER }} />}
        getItemLayout={(_, index) => ({
          length: CARD_W + GUTTER,
          offset: (CARD_W + GUTTER) * index + 16,
          index,
        })}
        decelerationRate="fast"
        snapToAlignment="start"
        snapToInterval={CARD_W + GUTTER}
      />
    </View>
  );
}

export default memo(TopPlayers);

/* ---------------- styles ---------------- */

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 8,
  },
  title: {
    marginLeft: 16,
    marginBottom: 12,
    fontSize: 18,
    color: "#0E1628",
    fontFamily: fonts.semibold,
  },
  cardWrap: {
    width: CARD_W,
    height: CARD_H,
    borderRadius: RADIUS,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
      },
      android: { elevation: 6 },
    }),
  },
  card: {
    flex: 1,
    borderRadius: RADIUS,
    overflow: "hidden",
  },
  cardImg: {
    borderRadius: RADIUS,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "55%", // tune darkness spread
  },
  caption: {
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 12,
  },
  name: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 20,
    fontFamily: fonts.semibold,
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  role: {
    marginTop: 3,
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: fonts.regular,
  },
});
