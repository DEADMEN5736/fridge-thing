import React from "react";
//import { useRouter } from "next/navigation";
import { Navbar } from "../components/Navbar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import MacroSummary from "../components/dashboard/MacroSummary";
import InventoryPreview from "../components/dashboard/InventoryPreview";
import QuickActions from "../components/dashboard/QuickActions";
import RecipeSuggestions from "../components/dashboard/RecipeSuggestions";

//These two imports are related to getting user info and such once logged in
import { getAuthUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  //const router = useRouter(); removed temporarily since not compatible with the asnyc function auth

  const user = await getAuthUser();
  if (!user) {
    redirect("/login"); // Kick them out if not logged in
  }

  const macroData = [
    { title: "Calories", current: user.cal_Prog, goal: user.cal_Goal, unit: "kcal" },
    { title: "Protein", current: user.pro_Prog, goal: user.pro_Goal, unit: "g" },
    { title: "Carbs", current: user.car_Prog, goal: user.car_Goal, unit: "g" },
    { title: "Fats", current: user.fat_Prog, goal: user.fat_Goal, unit: "g" },
  ];

  const inventoryItems = [
    "Chicken Breast",
    "Eggs",
    "Greek Yogurt",
    "Spinach",
    "Brown Rice",
    "Avocados",
  ];

  const recipes = [
    {
      title: "Chicken Rice Bowl",
      description: "High-protein meal using chicken, brown rice, and spinach.",
      match: "Uses 5 ingredients you already have",
    },
    {
      title: "Spinach Omelet",
      description: "Quick breakfast packed with protein and healthy fats.",
      match: "Uses 3 ingredients you already have",
    },
    {
      title: "Greek Yogurt Power Bowl",
      description: "Fast snack with yogurt, fruit, and granola.",
      match: "Uses 2 ingredients you already have",
    },
  ];

  console.log(user.isAdmin);

  return (
    <div style={styles.page}>
      <Navbar />

      <main style={styles.main}>
        <DashboardHeader username={user.firstName} />

        <MacroSummary macroData={macroData} />

        <div style={styles.twoColumnLayout}>
          <InventoryPreview items={inventoryItems} />
          <QuickActions />
        </div>

        <RecipeSuggestions recipes={recipes} />
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f1f3f2",
  },

  main: {
    maxWidth: "1180px",
    margin: "0 auto",
    padding: "48px 24px 64px",
  },

  twoColumnLayout: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    marginBottom: "24px",
  },
};