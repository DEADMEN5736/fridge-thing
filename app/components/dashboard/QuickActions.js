"use client";

import React from "react";
import DashboardSection from "./DashboardSection";
import styles from "../../dashboard/dashboard.module.css";

export default function QuickActions({ actions }) {
  return (
    <DashboardSection title="Quick Actions">
      <div className={styles.quickActionsGrid}>
        {actions.map((action) => (
          <button key={action} className={styles.actionCard}>
            {action}
          </button>
        ))}
      </div>
    </DashboardSection>
  );
}
