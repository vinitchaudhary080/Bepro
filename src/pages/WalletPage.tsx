// pages/WalletPage.tsx
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import WalletHero from "../components/wallet/WalletHero";
import WalletCard from "../components/wallet/WalletCard";
import WalletHistory, { HistoryItem } from "../components/wallet/WalletHistory";
import AddCoinButton from "../components/wallet/AddCoinButton";

export default function WalletPage() {
  const navigation = useNavigation();
  const history: HistoryItem[] = [
    { id: "1", date: "20/01/2025", team: "Dehli Fighter", coin: 500, status: "Success" },
    { id: "2", date: "20/01/2025", team: "Dehli Fighter", coin: 500, status: "Success" },
  ];

  const handleBack = () => {
    // If this screen can goBack in the stack, use that; otherwise force ProfileHome
    // @ts-ignore - parent is the RootTabs
    if ("canGoBack" in navigation && navigation.canGoBack()) navigation.goBack();
    else navigation.getParent()?.navigate("Profile", { screen: "ProfileHome" });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
        <WalletHero onBack={handleBack} />
        <View style={styles.content}>
          <WalletCard
            totalLabel="Total Coin"
            amount={5756}
            ownerName="Manoj Tiwari"
            coinIcon={require("../assets/wallet/coin.png")}
          />
          <View style={{ height: 16 }} />
          <WalletHistory data={history} />
        </View>
      </ScrollView>

      <AddCoinButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  content: { paddingHorizontal: 16, paddingTop: 12 },
});
