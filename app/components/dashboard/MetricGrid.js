"use client";

import React from "react";
import styles from "../../dashboard/dashboard.module.css";

export function StatGrid({ items }) {
  return (
    <div className={styles.statGrid}>
      {items.map((item) => (
        <div key={item.label} className={styles.statTile}>
          <p className={styles.statLabel}>{item.label}</p>
          <p className={styles.statValue}>{item.value}</p>
        </div>
      ))}
    </div>
  );
}

export function FeatureGrid({ items, columnsClassName = "" }) {
  const gridClassName = [styles.threeColumnLayout, columnsClassName].filter(Boolean).join(" ");

  return (
    <div className={gridClassName}>
      {items.map((item) => (
        <div key={item.title} className={styles.statTile}>
          <p className={styles.itemTitle}>{item.title}</p>
          <p className={styles.itemText}>{item.description}</p>
          <p className={`${styles.statLabel} ${styles.tileValue}`}>{item.value}</p>
        </div>
      ))}
    </div>
  );
}
