import React, { useMemo, useState } from "react";

// 👇 Alias use kar rahe ho to ye theek hai.
// Agar alias setup nahi ho to relative import use karo:
// import RankingPage, { RankingItem } from "../components/ranking/RankingPage";
import RankingPage, { RankingItem } from "@/components/ranking/RankingPage";

// Filter sheet
// Agar alias nahi ho to: "../components/ranking/FilterSheet"
import FilterSheet, { FilterSelections } from "@/components/ranking/FilterSheet";

// ✅ relative asset paths (tumhari tree ke hisaab se)
const AVATAR = require("../assets/avatars/player.png");
const SEARCH = require("../assets/icons/search.png");
const FILTER = require("../assets/icons/filter-sliders.png");
const TROPHY = require("../assets/icons/trophy-yellow.png");

export default function RankingsPage() {
  // 2–3 items in each tab (mock data)
  const team: RankingItem[] = [
    { id: "t1", name: "Manoj Tiwari", subtitle: "State Level champion", avatar: AVATAR },
    { id: "t2", name: "Ravi Sharma",  subtitle: "U-19 opener",         avatar: AVATAR },
    { id: "t3", name: "Amit Verma",   subtitle: "All-rounder",          avatar: AVATAR },
  ];

  const batsman: RankingItem[] = [
    { id: "b1", name: "Kunal Singh",  subtitle: "Top-order batsman",     avatar: AVATAR },
    { id: "b2", name: "Rahul Das",    subtitle: "Middle-order finisher", avatar: AVATAR },
  ];

  const typeC: RankingItem[] = [
    { id: "c1", name: "V. Iyer",   subtitle: "State Level champion", avatar: AVATAR },
    { id: "c2", name: "S. Pillai", subtitle: "Right-hand bat",       avatar: AVATAR },
  ];

  // ---------------- Filter integration ----------------
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterSelections>({}); // { Time, Country, ... }

  // (optional) example: yaha filters ke basis par list change kar sakte ho
  const filteredData = useMemo(() => {
    // abhi demo ke liye koi hard filter nahi laga rahe;
    // future: filters.Country === "India" ... etc.
    return { Team: team, Batsman: batsman, "Type C": typeC };
  }, [team, batsman, typeC, filters]);
  // ----------------------------------------------------

  return (
    <>
      <RankingPage
        data={filteredData}
        searchIcon={SEARCH}
        filterIcon={FILTER}
        trophyIcon={TROPHY}
        onFilterPress={() => setFilterOpen(true)}
        showFilterButton={true}
      />

      <FilterSheet
        visible={filterOpen}
        initial={filters}
        onClose={() => setFilterOpen(false)}
        onApply={(sel) => {
          setFilters(sel);
          setFilterOpen(false);
          // TODO: yaha filters ke basis par `filteredData` compute karo
          // e.g., if (sel["Match Type"] === "League") { ...filter lists }
        }}
        // resetIcon={require("../assets/icons/reset.png")} // optional
      />
    </>
  );
}
