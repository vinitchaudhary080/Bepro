// pages/ProfileDetailPage.tsx
import React from "react";
import { FlatList } from "react-native";
import ProfileDetailsHero from "../components/profile/ProfileDetailsHero";
import ProfileDetailsContent from "../components/profile/ProfileDetailsContent";

export default function ProfileDetailPage() {
  /* Matches (as-is) */
  const matches = [
    {
      id: "m1",
      title: "DELHI VS MUMBAI",
      subtitle: "MEN’S T20 TRI – Series East India",
      team1: { name: "DHL", score: "120/5", logo: require("../assets/teams/dhl.png") },
      team2: { name: "MUB", score: "122/4", logo: require("../assets/teams/mub.png") },
      noteRight: "(18.5/20 ov, T:120)",
      resultText: "Mumbai won by 6 wickets",
      highlight: "Manoj Tiwari create: 99 runs, 8 Fours, 4 Six (45 Balls)",
    },
    {
      id: "m2",
      title: "DELHI VS MUMBAI",
      subtitle: "MEN’S T20 TRI – Series East India",
      team1: { name: "DHL", score: "120/5", logo: require("../assets/teams/dhl.png") },
      team2: { name: "MUB", score: "122/4", logo: require("../assets/teams/mub.png") },
      noteRight: "(18.5/20 ov, T:120)",
      resultText: "Mumbai won by 6 wickets",
      highlight: "Manoj Tiwari create: 99 runs, 8 Fours, 4 Six (45 Balls)",
    },
  ];

  /* Stats → 4 buckets with grid metrics (order matches screenshot) */
  const statBuckets = [
    {
      title: "Batting" as const,
      metrics: [
        { key: "mts", label: "MTS", value: "0" },
        { key: "inns", label: "INNS", value: "0" },
        { key: "runs", label: "RUNS", value: "0" },
        { key: "avg", label: "AVG.", value: "0.00" },
        { key: "highest", label: "HIGHEST", value: "0" },
        { key: "sr", label: "SR", value: "0" },
        { key: "30s", label: "30S", value: "0" },
        { key: "50s", label: "50S", value: "0" },
        { key: "100s", label: "100S", value: "0" },
        { key: "4s", label: "4S", value: "0" },
        { key: "6s", label: "6S", value: "0" },
        { key: "notouts", label: "Not OUTS", value: "0" },
      ],
    },
    { title: "Bowling" as const, metrics: [] },
    { title: "Fielding" as const, metrics: [] },
    { title: "Captain" as const, metrics: [] },
  ];

  /* Awards cards */
  const awardCards = [
    {
      id: "aw1",
      matchTitle: "DHL vs MUM",
      subtitle: "Best Batsman",
      chips: [
        { value: "99", label: "Runs", rating: "1", tint: "#22C55E" },
        { value: "4", label: "Fours", rating: "1", tint: "#8B5CF6" },
        { value: "6", label: "Six", rating: "2", tint: "#F97316" },
      ],
    },
  ];

  /* Teams cards */
  const teamCards = [
    {
      id: "tm1",
      name: "Mumbai Fighters",
      logo: require("../assets/teams/mub.png"),
      designationLeft: "Member",
      designationHint: "Your Designation",
      totalPlayers: "15 Players",
      totalPlayersHint: "Total Player in team",
      winningMatches: "5",
      winningMatchesHint: "Winning Match",
      createdOn: "22 June 2025",
      createdOnHint: "Created on",
    },
  ];

  /* Badges cards */
  const badgeCards = [
    {
      id: "bd1",
      icon: require("../assets/badges/century.png"),
      title: "Badges",
      description:
        "Lorem ipsum dolor sit amet consectetur. Enim varius pharetra et in arcu. Quisque nibh a porttitor aliquam.",
      chips: [
        { value: "99", label: "Daily", rating: "1", tint: "#22C55E" },
        { value: "4", label: "Weekly", rating: "1", tint: "#8B5CF6" },
        { value: "6", label: "Monthly", rating: "2", tint: "#F97316" },
      ],
    },
  ];

  return (
    <FlatList
      data={[] as any[]}
      keyExtractor={(_, i) => `k-${i}`}
      ListHeaderComponent={
        <>
          <ProfileDetailsHero
            photo={require("../assets/profile/detail-hero.jpg")}
            backIcon={require("../assets/icons/chevron-left.png")}
            height={240}
          />

          <ProfileDetailsContent
            avatar={require("../assets/profile/manoj.jpg")}
            name="Manoj Tiwari"
            location="Bengaluru, Karnataka, India"
            role="Left Hand Batsman | Right Arm Off Break"
            editIcon={require("../assets/icons/edit.png")}
            locationIcon={require("../assets/icons/location-dot.png")}
            roleIcon={require("../assets/icons/badge.png")}

            /* big icons for cards */
            trophyIcon={require("../assets/icons/trophy.png")}
            menuIcon={require("../assets/icons/dots-vertical.png")}

            /* data */
            matches={matches}
            statBuckets={statBuckets}
            awardCards={awardCards}
            teamCards={teamCards}
            badgeCards={badgeCards}
          />
        </>
      }
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: "#F7F9FC" }}
      contentContainerStyle={{ paddingBottom: 28 }}
    />
  );
}
