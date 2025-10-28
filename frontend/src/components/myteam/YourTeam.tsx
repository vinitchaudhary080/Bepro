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
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { TeamStackParamList } from "../../navigation/TeamStack"; // <-- ✅

const { width } = Dimensions.get("window");
const H_PADDING = 16;
const CARD_W = Math.min(width - H_PADDING * 2, 360);
const CARD_H = Math.round(CARD_W * 0.56);
const RADIUS = 18;

export type TeamCardItem = {
  id: string | number;
  title: string;           // e.g. "Delhi Knight Fighters"
  subtitle?: string;       // e.g. "You are Captain on this team"
  image: any;              // require("../assets/xyz.png")
  onPress?: () => void;    // optional custom handler
};

type Props = {
  heading?: string;        // default: "Your Team"
  items: TeamCardItem[];
};

function TeamCard({ item }: { item: TeamCardItem }) {
  const navigation = useNavigation<NativeStackNavigationProp<TeamStackParamList>>(); // ✅

  const handlePress = item.onPress
    ? item.onPress
    : () => {
        // ✅ default navigation + params
        navigation.navigate("MyTeamDetail", {
          teamId: String(item.id),
          teamName: item.title,
        });
      };

  return (
    <Pressable
      onPress={handlePress} // ✅
      android_ripple={{ color: "rgba(255,255,255,0.15)", borderless: true }}
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
    overflow: "hidden",
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
  gradient: { ...StyleSheet.absoluteFillObject, borderRadius: RADIUS },
  textBlock: { paddingHorizontal: 16, paddingVertical: 14 },
  title: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },
  subtitle: { marginTop: 4, color: "rgba(255,255,255,0.9)", fontSize: 13, fontWeight: "500" },
});
