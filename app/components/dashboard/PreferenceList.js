"use client";

import React from "react";
import styles from "../../dashboard/dashboard.module.css";

export default function PreferenceList({ items }) {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <div key={item.title} className={styles.listItem}>
          <div>
            <p className={styles.itemTitle}>{item.title}</p>
            <p className={styles.itemText}>{item.description}</p>
          </div>
          <span className={styles.valuePill}>{item.value}</span>
        </div>
      ))}
    </div>
  );
}
