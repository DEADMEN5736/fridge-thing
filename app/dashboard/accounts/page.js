//"use client";

import React from "react";
import styles from "../dashboard.module.css";
import DashboardPageHero from "../../components/dashboard/DashboardPageHero";
import DashboardSection from "../../components/dashboard/DashboardSection";
import { FeatureGrid, StatGrid } from "../../components/dashboard/MetricGrid";
import PreferenceList from "../../components/dashboard/PreferenceList";
import {
  accountPreferences,
  convenienceSettings,
  nutritionGoals,
} from "../../components/dashboard/dashboardContent";
import {redirect} from "next/navigation";
import {getAuthUser} from "../../../lib/auth";

function getTotalProgress(user)
{
    let total = 0;
    total += user.cal_Prog/user.cal_Goal;
    total += user.car_Prog/user.car_Goal;
    total += user.fat_Prog/user.fat_Goal;
    total += user.cal_Prog/user.cal_Goal;
    total += user.pro_Prog/user.pro_Goal;

    total = (total/5)*100;

    return total;
}

export default async function AccountsPage() {
    const user = await getAuthUser();
    if (!user) {
        redirect("/login");
    }

    const accountStats = [
        { label: "Profile completion", value: "" + getTotalProgress(user).toFixed(2) + "%"},
        { label: "Weekly grocery budget", value: "$" + user.weeklyBudget },
        { label: "Meal prep time target", value: "" + user.prepTimeGoal + "min" },
    ];

    const nutritionGoals = [
        {
            title: "Macro goals",
            description:
                user.cal_Goal + " kcal, " + user.pro_Goal + "g protein, " + user.car_Goal + "g carbs, and " + user.fat_Goal + "g fats to support a balanced high-protein plan.",
            value: "Daily",
        },
        {
            title: "Diet style",
            description:
                "Flexible high-protein meals that prioritize whole foods and easy ingredient swaps.",
            value: "Lifestyle",
        },
        {
            title: "Health focus",
            description:
                "Reduce food waste while staying consistent with nutritious meals and pantry-first planning.",
            value: "Priority",
        },
    ];

    const accountPreferences = [
        {
            title: "Account details",
            description: user.firstName + " " + user.lastName + ", " + user.email + ", student-friendly meal planning profile.",
            value: "Owner",
        },
        {
            title: "Dietary preferences",
            description: "Lean protein, simple breakfasts, fast lunches, and flexible dinner recipes.",
            value: "Saved",
        },
        {
            title: "Substitution rules",
            description: "Suggest alternatives for missing ingredients before recommending a store run.",
            value: "Enabled",
        },
    ];

    return (
        <div className={styles.pageStack}>
            <DashboardPageHero
                eyebrow="Account Center"
                title="Your account, goals, and food preferences"
                subtitle="Built from the project proposal, this page focuses on the three core user needs: healthier eating, lower grocery waste, and less time spent figuring out what to cook."
            />

            <DashboardSection title="Overview" tag="Synced today">
                <StatGrid items={accountStats}/>
            </DashboardSection>

            <div className={styles.twoColumnLayout}>
                <DashboardSection title="Nutrition profile" tag="Health conscious">
                    <PreferenceList items={nutritionGoals}/>
                </DashboardSection>

                <DashboardSection title="Account preferences" tag="Personalized">
                    <PreferenceList items={accountPreferences}/>
                </DashboardSection>
            </div>

            <DashboardSection title="Convenience and savings" tag="Budget conscious">
                <FeatureGrid items={convenienceSettings}/>
            </DashboardSection>
        </div>
    );
}
