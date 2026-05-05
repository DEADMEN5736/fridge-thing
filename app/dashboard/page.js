import React from "react";
import { redirect } from "next/navigation";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import MacroSummary from "../components/dashboard/MacroSummary";
import InventoryPreview from "../components/dashboard/InventoryPreview";
import RecipeSuggestions from "../components/dashboard/RecipeSuggestions";
import styles from "./dashboard.module.css";
import { getAuthUser } from "@/lib/auth";
import {
  dashboardInventoryItems,
  dashboardRecipes,
} from "../components/dashboard/dashboardContent";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getAuthUser();
  if (!user) {
    redirect("/login");
  }

  const macroData = [
    { title: "Calories", current: user.cal_Prog, goal: user.cal_Goal, unit: "kcal" },
    { title: "Protein", current: user.pro_Prog, goal: user.pro_Goal, unit: "g" },
    { title: "Carbs", current: user.car_Prog, goal: user.car_Goal, unit: "g" },
    { title: "Fats", current: user.fat_Prog, goal: user.fat_Goal, unit: "g" },
  ];

  return (
    <div className={styles.pageStack}>
      <DashboardHeader username={user.firstName} />

      <MacroSummary macroData={macroData} />

      <div className={styles.twoColumnLayout}>
        <InventoryPreview items={dashboardInventoryItems} />
        <RecipeSuggestions recipes={dashboardRecipes} />
      </div>
    </div>
  );
}
