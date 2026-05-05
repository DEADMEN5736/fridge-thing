"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "../../dashboard/dashboard.module.css";
import { primaryTabs } from "./dashboardContent";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const activeTab =
    primaryTabs.find((tab) => pathname === tab.href)?.key || "dashboard";

  const handleLogout = () => {
    console.log("User logged out");
    router.push("/");
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarTop}>
        <div className={styles.brandBlock}>
          <p className={styles.brandEyebrow}>Personal Nutrition Hub</p>
          <h1 className={styles.brandTitle}>Fridge Thing</h1>
          <p className={styles.brandText}>
            Keep your pantry, meals, and macro goals in one calm workspace.
          </p>
        </div>

        <nav className={styles.navList} aria-label="Dashboard">
          {primaryTabs.map((tab) => {
            const isActive = tab.key === activeTab;
            const navClassName = [
              styles.navButton,
              isActive ? styles.navButtonActive : "",
            ]
              .filter(Boolean)
              .join(" ");
            const iconClassName = [
              styles.iconBadge,
              isActive ? styles.iconBadgeActive : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <Link key={tab.key} href={tab.href} className={navClassName}>
                <span className={iconClassName}>{tab.shortLabel}</span>
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className={styles.bottomSection}>
        <button type="button" className={styles.settingsButton}>
          <span className={styles.settingsDot} />
          <span>Settings</span>
        </button>

        <button type="button" className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
}
