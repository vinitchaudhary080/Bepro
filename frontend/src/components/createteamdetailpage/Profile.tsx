import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";

type Props = {
  photoUri: string | null;
  onPick: (uri: string | null) => void;
};

export default function Profile({ photoUri, onPick }: Props) {
  const pick = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!res.canceled) onPick(res.assets[0].uri);
  };

  return (
    <View style={styles.wrap}>
      <Pressable onPress={pick} style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}>
        <View style={styles.avatar}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.img} />
          ) : (
            <>
              <View style={styles.placeholder} />
              <Text style={styles.addText}>+ Add Photo</Text>
            </>
          )}
        </View>
      </Pressable>
    </View>
  );
}

const AVATAR = 120;

const styles = StyleSheet.create({
  wrap: { alignItems: "center", marginTop: 16, marginBottom: 8 },
  avatar: {
    width: AVATAR,
    height: AVATAR,
    borderRadius: AVATAR / 2,
    backgroundColor: "#F4F6F9",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  img: { width: "100%", height: "100%" },
  placeholder: {
    width: 56,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E8ECF2",
    marginBottom: 8,
  },
  addText: { color: "#9AA2AB", fontSize: 13, fontWeight: "600" },
});
