"use client";

import React from "react";
import styles from "../../dashboard/dashboard.module.css";

export default function DashboardSection({
  title,
  tag,
  action,
  children,
  className = "",
  bodyClassName = "",
}) {
  const sectionClassName = [styles.card, className].filter(Boolean).join(" ");
  const sectionBodyClassName = [bodyClassName].filter(Boolean).join(" ");

  return (
    <section className={sectionClassName}>
      {(title || tag) && (
        <div className={styles.sectionHeader}>
          {title ? <h2 className={styles.sectionTitle}>{title}</h2> : <span />}
          {action || (tag ? <span className={styles.tag}>{tag}</span> : null)}
        </div>
      )}

      <div className={sectionBodyClassName}>{children}</div>
    </section>
  );
}
