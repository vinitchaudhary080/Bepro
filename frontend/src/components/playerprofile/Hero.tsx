import React from "react";
import { ImageBackground, StyleSheet, View, Text, Pressable, Image } from "react-native";

type Props = {
    bgImage: any;
    onBack?: () => void;
};

export default function Hero({ bgImage, onBack }: Props) {
    return (
        <ImageBackground source={bgImage} style={styles.bg} resizeMode="cover">
            {/* dark overlay */}
            <View style={styles.overlay} />

            {/* ✅ header shifted top */}
            <View style={styles.header}>
                <Pressable onPress={onBack}>
                    <Image source={require("../../assets/icons/back.png")} style={styles.icon} />
                </Pressable>
                <Text style={styles.title}>Manoj Tiwari</Text>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    bg: {
        width: "100%",
        height: 240,
        justifyContent: "flex-start", // ✅ was flex-end — moved header to top
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.4)",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        marginTop: 12, // ✅ top margin applied
        zIndex: 2, // ensure above overlay
    },
    title: {
        flex: 1,
        textAlign: "center",
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },
    icon: {
        width: 24,
        height: 24,
        tintColor: "#fff",
    },
});
