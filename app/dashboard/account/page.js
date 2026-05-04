"use client";

import React from "react";
import styles from "../dashboard.module.css";
import DashboardPageHero from "../../components/dashboard/DashboardPageHero";
import DashboardSection from "../../components/dashboard/DashboardSection";
import { FeatureGrid, StatGrid } from "../../components/dashboard/MetricGrid";
import PreferenceList from "../../components/dashboard/PreferenceList";
import {
  accountPreferences,
  accountStats,
  convenienceSettings,
  nutritionGoals,
} from "../../components/dashboard/dashboardContent";

export default function AccountsPage() {
  return (
    <div className={styles.pageStack}>
      <DashboardPageHero
        eyebrow="Account Center"
        title="Your account, goals, and food preferences"
        subtitle="Built from the project proposal, this page focuses on the three core user needs: healthier eating, lower grocery waste, and less time spent figuring out what to cook."
      />

      <DashboardSection title="Overview" tag="Synced today">
        <StatGrid items={accountStats} />
      </DashboardSection>

      <div className={styles.twoColumnLayout}>
        <DashboardSection title="Nutrition profile" tag="Health conscious">
          <PreferenceList items={nutritionGoals} />
        </DashboardSection>

        <DashboardSection title="Account preferences" tag="Personalized">
          <PreferenceList items={accountPreferences} />
        </DashboardSection>
      </div>

      <DashboardSection title="Convenience and savings" tag="Budget conscious">
        <FeatureGrid items={convenienceSettings} />
      </DashboardSection>
    </div>
  );
}
