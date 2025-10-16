// pages/HomePage.tsx
import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Hero from "../components/home/Hero";
import TopPlayers, { PlayerItem } from "../components/home/TopPlayers";
import TasksSection from "../components/home/Tasks";
import OneOnOne, { OneOnOneItem } from "../components/home/OneOnOne";
import UpcomingFixtures, { FixtureHero, FixtureInfo } from "../components/home/UpcomingFixtures";
import LatestResults, { MatchItem } from "../components/home/LatestResults";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "../navigation/HomeStack";
import { colors } from "../theme/colors";

export default function HomePage() {
    const [query, setQuery] = useState("");

    // ✅ typed navigation for HomeStack (Home, NotificationPanel, etc.)
    const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

    // 🔹 Sample player data (replace with local images)
    const players: PlayerItem[] = [
        { id: 1, name: "Rahul Joshi", role: "Captain of team", image: require("../assets/players/p1.jpg") },
        { id: 2, name: "Varun Kumar", role: "Player of team", image: require("../assets/players/p2.jpg") },
        { id: 3, name: "Manish Yadav", role: "Captain of team", image: require("../assets/players/p3.jpg") },
    ];

    const oneOnOneData: OneOnOneItem[] = [
        { id: 1, title: "Quick Match", icon: require("../assets/oneonone/quick.png") },
        { id: 2, title: "Search", icon: require("../assets/oneonone/search.png") },
        { id: 3, title: "Challenge", icon: require("../assets/oneonone/challenge.png") },
        { id: 4, title: "Triangular Series", icon: require("../assets/oneonone/triangular.png") },
        { id: 5, title: "Tournaments", icon: require("../assets/oneonone/tournaments.png") },
        { id: 6, title: "Series", icon: require("../assets/oneonone/series.png") },
    ];

    const heroData: FixtureHero = {
        bg: require("../assets/fixtures/stadium.jpg"),
        left: { name: "DELHI", score: "155 - 8", ov: "18.5 ov", avatar: require("../assets/fixtures/delhi.png") },
        right: { name: "Mumbai", score: "00 - 0", ov: "00.0 ov", avatar: require("../assets/fixtures/mumbai.png") },
        status: "DHL is playing their inning",
        meta: "T20 | Match",
    };

    const infoCards: FixtureInfo[] = [
        {
            thumb: require("../assets/fixtures/mum_thumb.png"),
            title: "MUM vs DHL",
            venue: "T20 | Cricko International Stadium",
            players: [
                require("../assets/fixtures/p1.jpg"),
                require("../assets/fixtures/p2.jpg"),
                require("../assets/fixtures/p3.jpg"),
                require("../assets/fixtures/p4.jpg"),
                require("../assets/fixtures/p5.jpg"),
                require("../assets/fixtures/p6.jpg"),
            ],
            captains: [require("../assets/fixtures/c1.jpg"), require("../assets/fixtures/c2.jpg")],
            metaIcon: require("../assets/icons/ball.png"),
            metaText: "6 Over | Leather Ball",
        },
    ];

    // latest matches
    const results: MatchItem[] = [
        {
            id: "t20-1",
            type: "T20",
            fixtureTitle: "DELHI vs MUMBAI",
            series: "Men's T20 Tri-Series • East India",
            badge: require("../assets/results/badge_t20.png"),
            firstInnings: { teamName: "DHL", logo: require("../assets/fixtures/delhi.png"), score: "155/8" },
            secondInnings: { teamName: "MUB", logo: require("../assets/fixtures/mumbai.png"), score: "122/4", overs: "(18.5/20 ov; T: 156)" },
            resultText: "Delhi won by 6 wickets",
        },
        {
            id: "t20-2",
            type: "T20",
            fixtureTitle: "CHENNAI vs KOLKATA",
            series: "National T20 Cup • League",
            badge: require("../assets/results/badge_t20.png"),
            firstInnings: { teamName: "CSK", logo: require("../assets/results/ind.png"), score: "176/6" },
            secondInnings: { teamName: "KKR", logo: require("../assets/results/aus.png"), score: "169/7", overs: "(20.0/20 ov; T: 177)" },
            resultText: "Chennai won by 7 runs",
        },
        {
            id: "t20-3",
            type: "T20",
            fixtureTitle: "BANGALORE vs HYDERABAD",
            series: "Premium T20 League",
            badge: require("../assets/results/badge_t20.png"),
            firstInnings: { teamName: "BLR", logo: require("../assets/results/ind.png"), score: "201/4" },
            secondInnings: { teamName: "HYD", logo: require("../assets/results/aus.png"), score: "184/9", overs: "(20.0/20 ov; T: 202)" },
            resultText: "Bangalore won by 17 runs",
        },
        /* ODI */
        {
            id: "odi-1",
            type: "ODI",
            fixtureTitle: "INDIA vs AUSTRALIA",
            series: "ODI Series • Mumbai",
            badge: require("../assets/results/badge_odi.png"),
            firstInnings: { teamName: "IND", logo: require("../assets/results/aus.png"), score: "287/6" },
            secondInnings: { teamName: "AUS", logo: require("../assets/results/ind.png"), score: "284/9", overs: "(50.0/50 ov; T: 288)" },
            resultText: "India won by 3 runs",
        },
        {
            id: "odi-2",
            type: "ODI",
            fixtureTitle: "ENGLAND vs SOUTH AFRICA",
            series: "Champions ODI Trophy",
            badge: require("../assets/results/badge_odi.png"),
            firstInnings: { teamName: "ENG", logo: require("../assets/results/eng.png"), score: "312/8" },
            secondInnings: { teamName: "SA", logo: require("../assets/results/aus.png"), score: "289/10", overs: "(48.3/50 ov; T: 313)" },
            resultText: "England won by 23 runs",
        },
        {
            id: "odi-3",
            type: "ODI",
            fixtureTitle: "NEW ZEALAND vs PAKISTAN",
            series: "ODI Super League",
            badge: require("../assets/results/badge_odi.png"),
            firstInnings: { teamName: "NZ", logo: require("../assets/results/ind.png"), score: "268/7" },
            secondInnings: { teamName: "PAK", logo: require("../assets/results/aus.png"), score: "270/5", overs: "(47.1/50 ov; T: 269)" },
            resultText: "Pakistan won by 5 wickets",
        },
        /* Test */
        {
            id: "test-1",
            type: "Test",
            fixtureTitle: "ENGLAND vs PAKISTAN",
            series: "WTC • Lord’s",
            badge: require("../assets/results/badge_test.png"),
            firstInnings: { teamName: "ENG", logo: require("../assets/results/eng.png"), score: "362", overs: "(1st Inns)" },
            secondInnings: { teamName: "PAK", logo: require("../assets/results/aus.png"), score: "298", overs: "(1st Inns)" },
            resultText: "England lead by 64 runs (1st Inns)",
        },
        {
            id: "test-2",
            type: "Test",
            fixtureTitle: "INDIA vs SRI LANKA",
            series: "WTC • Bengaluru",
            badge: require("../assets/results/badge_test.png"),
            firstInnings: { teamName: "IND", logo: require("../assets/results/aus.png"), score: "411", overs: "(1st Inns)" },
            secondInnings: { teamName: "SL", logo: require("../assets/results/eng.png"), score: "234", overs: "(1st Inns)" },
            resultText: "India lead by 177 runs (1st Inns)",
        },
        {
            id: "test-3",
            type: "Test",
            fixtureTitle: "AUSTRALIA vs NEW ZEALAND",
            series: "WTC • Melbourne",
            badge: require("../assets/results/badge_test.png"),
            firstInnings: { teamName: "AUS", logo: require("../assets/results/aus.png"), score: "514/7d", overs: "(1st Inns)" },
            secondInnings: { teamName: "NZ", logo: require("../assets/results/eng.png"), score: "301", overs: "(1st Inns)" },
            resultText: "Australia lead by 213 runs (1st Inns)",
        },
    ];

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: colors.bg }}
            contentContainerStyle={{ paddingBottom: 24 }}
            keyboardShouldPersistTaps="handled"
        >
            {/* 🔹 Hero Section */}
            <Hero
                bgImage={require("../assets/home/hero-bg.png")}
                secondaryBg={require("../assets/home/hero-b.png")}
                searchIcon={require("../assets/icons/search.png")}
                bellIcon={require("../assets/icons/bell.png")}
                coinIcon={require("../assets/icons/coin.png")}
                name="Rahul"
                walletAmount="5000"
                searchValue={query}
                onChangeSearch={setQuery}
                // ✅ Bell → HomeStack: NotificationPanel
                onPressBell={() => navigation.navigate("NotificationPanel")}
                onPressWallet={() =>
                    navigation.getParent()?.navigate("Profile", { screen: "Wallet" })
                }
                containerPaddingTop={66}
            />

            {/* 🔹 Top Players Section */}
            <View style={styles.section}>
                <TopPlayers
                    title="Top Players"
                    data={players}
                    onPressItem={(it) =>
                        navigation.navigate("PlayerProfilePage", { playerId: it.id }) // ✅ correct navigation with param
                    }
                />
            </View>

            {/* 🔹 Tasks Section (tabs + cards) */}
            <View style={styles.section}>
                <TasksSection />
            </View>

            <View style={{ paddingTop: 16 }}>
                <OneOnOne data={oneOnOneData} onPressItem={(it) => console.log("go to", it.title)} />
            </View>

            <View style={{ paddingTop: 16 }}>
                <UpcomingFixtures
                    title="Upcoming Match Fixtures"
                    hero={heroData}
                    infoCards={infoCards}
                    // ✅ Toss → Profile tab ke nested TossPage (RootTabs nesting)
                    onPressToss={() =>
                        // parent = RootTabs navigator
                        // @ts-ignore – RootTabs ka generic type not enforced here
                        navigation.getParent()?.navigate("Profile", { screen: "TossPage" })
                    }
                />
            </View>

            <View style={{ paddingTop: 16 }}>
                <LatestResults
                    title="Latest Results"
                    data={results}
                    onPressShowMore={() => console.log("Show more results")}
                    onPressItem={(m) => console.log("open match", m.id)}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    section: { paddingTop: 16 },
});
