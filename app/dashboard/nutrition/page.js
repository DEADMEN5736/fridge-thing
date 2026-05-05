"use client";

import React from "react";
import styles from "../dashboard.module.css";
import DashboardPageHero from "../../components/dashboard/DashboardPageHero";
import DashboardSection from "../../components/dashboard/DashboardSection";
import { FeatureGrid } from "../../components/dashboard/MetricGrid";
import { nutritionAreas } from "../../components/dashboard/dashboardContent";

export default function NutritionPage() {
  return (
    <div className={styles.pageStack}>
      <DashboardPageHero
        eyebrow="Nutrition"
        title="Stay on track without overthinking every meal"
        subtitle="The proposal emphasizes healthy eating that still feels practical. This section frames nutrition around clear macro targets, better substitutions, and sustainable habits."
      />

      <DashboardSection title="Nutrition insights" tag="Macro aware">
        <FeatureGrid items={nutritionAreas} />
      </DashboardSection>
    </div>
  );
}
