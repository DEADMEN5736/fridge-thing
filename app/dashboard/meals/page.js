"use client";

import React from "react";
import styles from "../dashboard.module.css";
import DashboardPageHero from "../../components/dashboard/DashboardPageHero";
import DashboardSection from "../../components/dashboard/DashboardSection";
import { FeatureGrid } from "../../components/dashboard/MetricGrid";
import { mealPlans } from "../../components/dashboard/dashboardContent";

export default function MealsPage() {
  return (
    <div className={styles.pageStack}>
      <DashboardPageHero
        eyebrow="Meals"
        title="Plan meals around what you already have"
        subtitle="This page supports the proposal’s pantry-first idea by organizing quick meals that save time, reduce waste, and keep your weekly routine consistent."
      />

      <DashboardSection title="Meal planning focus" tag="Time saver">
        <FeatureGrid items={mealPlans} />
      </DashboardSection>
    </div>
  );
}
