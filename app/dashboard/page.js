"use client";

import React from "react";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import MacroSummary from "../components/dashboard/MacroSummary";
import InventoryPreview from "../components/dashboard/InventoryPreview";
import RecipeSuggestions from "../components/dashboard/RecipeSuggestions";
import styles from "./dashboard.module.css";
import {
  dashboardInventoryItems,
  dashboardMacroData,
  dashboardRecipes,
} from "../components/dashboard/dashboardContent";

<<<<<<< HEAD
export default function DashboardPage() {
=======
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

>>>>>>> 0824440fbcd239960aeebb4ecf19b583dc7784ef
  return (
    <div className={styles.pageStack}>
      <DashboardHeader username="Antonio" />

      <MacroSummary macroData={dashboardMacroData} />

      <div className={styles.twoColumnLayout}>
        <InventoryPreview items={dashboardInventoryItems} />
        <RecipeSuggestions recipes={dashboardRecipes} />
      </div>
    </div>
  );
}
