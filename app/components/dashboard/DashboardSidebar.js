"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "../../dashboard/dashboard.module.css"; 
import { primaryTabs } from "./dashboardContent";

export default function DashboardNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [hoveredTab, setHoveredTab] = useState(null);

  const activeTab = primaryTabs
    .slice()
    .sort((a, b) => b.href.length - a.href.length)
    .find((tab) => 
      tab.href === "/" 
        ? pathname === "/" 
        : pathname.startsWith(tab.href)
    )?.key || "dashboard";

  const handleLogout = () => {
    console.log("User logged out");
    router.push("/");
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.navLeft}>
        <div className={styles.brandBlockHorizontal}>
          <h1 className={styles.brandTitle}>Fridge Thing</h1>
          <span className={styles.brandEyebrow}>Personal Nutrition Hub</span>
        </div>
      </div>

      <nav className={styles.navCenter} aria-label="Main Navigation">
        {primaryTabs.map((tab) => {
          const isActive = tab.key === activeTab;
          const isHovered = hoveredTab === tab.key;

          const navClassName = [
            styles.navLink,
            isActive ? styles.navLinkActive : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <Link 
              key={tab.key} 
              href={tab.href} 
              className={navClassName}
              onMouseEnter={() => setHoveredTab(tab.key)}
              onMouseLeave={() => setHoveredTab(null)}
              style={{
                backgroundColor: isHovered 
                  ? (isActive ? "rgba(46, 181, 97, 0.25)" : "rgba(0, 0, 0, 0.05)") 
                  : (isActive ? "rgba(56, 201, 107, 0.15)" : "transparent"),
                transition: "all 0.2s ease",
                borderRadius: "12px",
                padding: "8px 16px",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <span className={styles.navIcon}>{tab.shortLabel}</span>
              <span className={styles.navText}>{tab.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className={styles.navRight}>
        <button 
          type="button" 
          className={styles.settingsIconButton} 
          title="Settings"
          style={{ transition: "filter 0.2s ease", cursor: "pointer" }}
          onMouseEnter={(e) => e.currentTarget.style.filter = "brightness(0.8)"}
          onMouseLeave={(e) => e.currentTarget.style.filter = "brightness(1)"}
        >
          <span className={styles.settingsDot} />
          <span>Settings</span>
        </button>

        <button 
          type="button" 
          className={styles.logoutTextButton} 
          onClick={handleLogout}
          style={{ transition: "filter 0.2s ease", cursor: "pointer" }}
          onMouseEnter={(e) => e.currentTarget.style.filter = "brightness(0.8)"}
          onMouseLeave={(e) => e.currentTarget.style.filter = "brightness(1)"}
        >
          Logout
        </button>
      </div>
    </header>
  );
}