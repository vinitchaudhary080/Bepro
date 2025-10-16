import React, { memo, useCallback } from "react";
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  Pressable,
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";


const { width } = Dimensions.get("window");
const H_PADDING = 16;
const CARD_W = Math.min(width - H_PADDING * 2, 360); // wide card like screenshot
const CARD_H = Math.round(CARD_W * 0.56);            // ~16:9
const RADIUS = 18;

export type TeamCardItem = {
  id: string | number;
  title: string;           // e.g. "Dehli Knight Fighters"
  subtitle?: string;       // e.g. "You are Captain on this team"
  image: any;              // require("../assets/xyz.png")
  onPress?: () => void;
};

type Props = {
  heading?: string;        // default: "Your Team"
  items: TeamCardItem[];
};

function TeamCard({ item }: { item: TeamCardItem }) {
  return (
    <Pressable
      onPress={item.onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && { transform: [{ scale: 0.98 }] },
      ]}
    >
      <ImageBackground
        source={item.image}
        resizeMode="cover"
        imageStyle={{ borderRadius: RADIUS }}
        style={styles.bg}
      >
        {/* bottom fade like screenshot */}
        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.65)"]}
          start={{ x: 0.5, y: 0.2 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.gradient}
        />

        <View style={styles.textBlock}>
          <Text numberOfLines={1} style={styles.title}>
            {item.title}
          </Text>
          {item.subtitle ? (
            <Text numberOfLines={1} style={styles.subtitle}>
              {item.subtitle}
            </Text>
          ) : null}
        </View>
      </ImageBackground>
    </Pressable>
  );
}

function YourTeam({ heading = "Your Team", items }: Props) {
  const key = useCallback((it: TeamCardItem) => String(it.id), []);

  return (
    <View style={styles.wrap}>
      <Text style={styles.heading}>{heading}</Text>

      <FlatList
        data={items}
        keyExtractor={key}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: H_PADDING }}
        ItemSeparatorComponent={() => <View style={{ width: 14 }} />}
        renderItem={({ item }) => <TeamCard item={item} />}
        getItemLayout={(_, index) => ({
          length: CARD_W + 14,
          offset: (CARD_W + 14) * index + H_PADDING,
          index,
        })}
      />
    </View>
  );
}

export default memo(YourTeam);

const styles = StyleSheet.create({
  wrap: { paddingTop: 8, paddingBottom: 10 },
  heading: {
    marginLeft: H_PADDING,
    marginBottom: 10,
    fontSize: 22,
    fontWeight: "700",
    color: "#141A29",
  },

  card: {
    width: CARD_W,
    height: CARD_H,
    borderRadius: RADIUS,
    overflow: "hidden", // image corners crisp like screenshot
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 8 },
      },
      android: { elevation: 4 },
    }),
  },
  bg: { flex: 1, justifyContent: "flex-end" },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: RADIUS,
  },
  textBlock: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 4,
    color: "rgba(255,255,255,0.9)",
    fontSize: 13,
    fontWeight: "500",
  },
});
