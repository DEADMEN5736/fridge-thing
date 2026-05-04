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

export default function DashboardPage() {
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
