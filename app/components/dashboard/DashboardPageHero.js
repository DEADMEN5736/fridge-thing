"use client";

import React from "react";
import styles from "../../dashboard/dashboard.module.css";

export default function DashboardPageHero({ eyebrow, title, subtitle, children }) {
  return (
    <section className={styles.heroCard}>
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
      {children ? <div className={styles.heroFooter}>{children}</div> : null}
    </section>
  );
}
