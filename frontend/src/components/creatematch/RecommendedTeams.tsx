import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { fonts } from "../../theme/type";

const { width } = Dimensions.get("window");
const H_PADDING = 16;
const CARD_W = Math.min(300, width - H_PADDING * 2.5); // responsive ~ 280-300
const CARD_H = 170;
const RADIUS = 18;

export type TeamItem = {
  id: string;
  name: string;             // e.g. "Delhi Knight Fighters"
  roleLine?: string;        // e.g. "You are Captain on this team"
  image: any;               // require("...png") or { uri: string }
};

type Props = {
  title?: string;
  data: TeamItem[];
  initialSelectedId?: string;
  onChange?: (team: TeamItem) => void;
};

export default function RecommendedTeams({
  title = "Recommended Teams",
  data,
  initialSelectedId,
  onChange,
}: Props) {
  const [selectedId, setSelectedId] = useState<string | undefined>(
    initialSelectedId ?? data?.[0]?.id
  );

  const contentInset = useMemo(() => ({ left: H_PADDING, right: H_PADDING }), []);

  const handleSelect = (team: TeamItem) => {
    setSelectedId(team.id);
    onChange?.(team);
  };

  const renderItem = ({ item }: { item: TeamItem }) => {
    const isSelected = item.id === selectedId;
    return (
      <Pressable
        onPress={() => handleSelect(item)}
        style={({ pressed }) => [
          styles.cardWrap,
          { opacity: pressed ? 0.95 : 1 },
        ]}
      >
        <ImageBackground
          source={item.image}
          resizeMode="cover"
          style={[
            styles.card,
            { borderColor: isSelected ? "#E74B58" : "rgba(15,27,51,0.12)" },
          ]}
          imageStyle={styles.cardImg}
        >
          {/* top-right tick */}
          {isSelected ? (
            <View style={styles.tickWrap}>
              <Text style={styles.tick}>✓</Text>
            </View>
          ) : null}

          {/* bottom overlay for texts */}
          <LinearGradient
            colors={["rgba(0,0,0,0.0)", "rgba(0,0,0,0.55)"]}
            start={{ x: 0.5, y: 0.1 }}
            end={{ x: 0.5, y: 1 }}
            style={StyleSheet.absoluteFill}
          />

          <View style={styles.bottom}>
            <Text numberOfLines={1} style={styles.name}>
              {item.name}
            </Text>
            {!!item.roleLine && (
              <Text numberOfLines={1} style={styles.role}>
                {item.roleLine}
              </Text>
            )}
          </View>
        </ImageBackground>
      </Pressable>
    );
  };

  return (
    <View style={{ marginTop: 18 }}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <FlatList
        horizontal
        data={data}
        keyExtractor={(it) => it.id}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentInset={contentInset}
        contentContainerStyle={{ paddingHorizontal: H_PADDING }}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    marginLeft: H_PADDING,
    marginBottom: 10,
    fontSize: 18,
    color: "#0F1B33",
    fontFamily: fonts.semibold,
  },

  cardWrap: {
    width: CARD_W,
    height: CARD_H,
  },

  card: {
    flex: 1,
    borderRadius: RADIUS,
    overflow: "hidden",
    borderWidth: 2,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
      },
      android: { elevation: 4 },
    }),
  },
  cardImg: { borderRadius: RADIUS },

  bottom: {
    position: "absolute",
    left: 14,
    right: 14,
    bottom: 12,
  },
  name: {
    color: "#fff",
    fontSize: 16,
    fontFamily: fonts.semibold,
    marginBottom: 2,
  },
  role: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 12.5,
    fontFamily: fonts.regular,
  },

  tickWrap: {
    position: "absolute",
    top: 10,
    right: 10,
    height: 28,
    width: 28,
    borderRadius: 14,
    backgroundColor: "#E74B58",
    alignItems: "center",
    justifyContent: "center",
  },
  tick: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 16,
    fontFamily: fonts.semibold,
  },
});
