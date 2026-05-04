"use client";

import React from "react";
import MacroCard from "./MacroCard";
import DashboardSection from "./DashboardSection";
import styles from "../../dashboard/dashboard.module.css";

export default function MacroSummary({ macroData }) {
  return (
    <DashboardSection title="Macro Goals" tag="Today">
      <div className={styles.macroGrid}>
        {macroData.map((macro) => (
          <MacroCard
            key={macro.title}
            title={macro.title}
            current={macro.current}
            goal={macro.goal}
            unit={macro.unit}
          />
        ))}
      </div>
    </DashboardSection>
  );
}
