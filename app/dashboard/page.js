import React from "react";
import { redirect } from "next/navigation";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import MacroSummary from "../components/dashboard/MacroSummary";
import InventoryPreview from "../components/dashboard/InventoryPreview";
import RecipeSuggestions from "../components/dashboard/RecipeSuggestions";
import styles from "./dashboard.module.css";
import { getAuthUser } from "@/lib/auth";
import {
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

  // { id: 101, name: "Whole Milk", quantity: getDbItem("Whole Milk").quantity, measurement: getDbItem("Whole Milk").unit },
  // { id: 102, name: "Large Eggs", quantity: getDbItem("Large Eggs").quantity, measurement: getDbItem("Large Eggs").unit },
  // { id: 103, name: "Roma Tomatoes", quantity: getDbItem("Roma Tomatoes").quantity, measurement: getDbItem("Roma Tomatoes").unit },
  // { id: 104, name: "Ground Beef", quantity: getDbItem("Ground Beef").quantity, measurement: getDbItem("Ground Beef").unit },
  // { id: 105, name: "Onions", quantity: getDbItem("Onions").quantity, measurement: getDbItem("Onions").unit },
  // { id: 106, name: "Garlic", quantity: getDbItem("Garlic").quantity, measurement: getDbItem("Garlic").unit },
  // { id: 107, name: "Butter", quantity: getDbItem("Butter").quantity, measurement: getDbItem("Butter").unit },
  // { id: 108, name: "Salt", quantity: getDbItem("Salt").quantity, measurement: getDbItem("Salt").unit },

  const dashboardInventoryItems = [

  ];

  const getDbItem = (name) =>
      user.userPantry.find((i) => i.itemName === name) || { quantity: 0, unit: "Unit" };

  //This is so cancerous, I hate it but we are running out of time

  if(getDbItem("Whole Milk").quantity > 0)
  {
    dashboardInventoryItems.push("Whole Milk")
  }
  if(getDbItem("Large Eggs").quantity > 0)
  {
    dashboardInventoryItems.push("Large Eggs")
  }
  if(getDbItem("Roma Tomatoes").quantity > 0)
  {
    dashboardInventoryItems.push("Roma Tomatoes")
  }
  if(getDbItem("Ground Beef").quantity > 0)
  {
    dashboardInventoryItems.push("Ground Beef")
  }
  if(getDbItem("Onions").quantity > 0)
  {
    dashboardInventoryItems.push("Onions")
  }
  if(getDbItem("Garlic").quantity > 0)
  {
    dashboardInventoryItems.push("Garlic")
  }
  if(getDbItem("Butter").quantity > 0)
  {
    dashboardInventoryItems.push("Butter")
  }
  if(getDbItem("Salt").quantity > 0)
  {
    dashboardInventoryItems.push("Salt")
  }

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
