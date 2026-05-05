"use client";

import React from "react";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import styles from "./dashboard.module.css";

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        <div className={styles.sidebarColumn}>
          <DashboardSidebar />
        </div>

        <div className={styles.contentColumn}>
          <main className={styles.main}>{children}</main>
        </div>
      </div>
    </div>
  );
}
