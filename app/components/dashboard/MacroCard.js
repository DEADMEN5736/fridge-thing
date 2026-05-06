"use client";

import React from "react";
import styles from "../../dashboard/dashboard.module.css";

export default function MacroCard({ title, current, goal, unit }) {
  const progress = Math.min((current / goal) * 100, 100);

  return (
    <div className={styles.macroCard}>
      <p className={styles.macroLabel}>{title}</p>

      <h3 className={styles.macroValue}>
        {current}
        <span className={styles.macroUnit}>
          {" "}
          / {goal} {unit}
        </span>
      </h3>

      <div className={styles.progressTrack}>
        <div
          className={styles.progressFill}
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <p className={styles.progressText}>{Math.round(progress)}% of goal reached</p>
    </div>
  );
}
