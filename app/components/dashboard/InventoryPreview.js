"use client";

import React from "react";
import { useRouter } from "next/navigation";
import DashboardSection from "./DashboardSection";
import styles from "../../dashboard/dashboard.module.css";
import { PrimaryButton, SecondaryButton } from "../Buttons";

export default function InventoryPreview({ items }) {
  const router = useRouter();

  const handleViewPantry = () => {
    router.push("/pantry");
  };

  return (
    <DashboardSection title="Your Pantry" action={<span className={styles.linkText}>See all</span>}>
      <div className={styles.inventoryList}>
        {items.map((item) => (
          <div key={item} className={styles.inventoryItem}>
            <span className={styles.inventoryBullet} />
            <span className={styles.inventoryText}>{item}</span>
          </div>
        ))}
      </div>

      <div className={styles.inventoryActions}>
        <PrimaryButton 
          style={{ 
            width: "100%", 
            height: "55px", 
            borderRadius: "10px",
            fontWeight: "600"
          }}
        >
          Add Ingredient
        </PrimaryButton>
        
        <SecondaryButton 
          onClick={handleViewPantry}
          style={{ 
            width: "100%", 
            height: "55px", 
            borderRadius: "10px",
            fontWeight: "600",
            marginTop: "0px"
          }}
        >
          View Pantry
        </SecondaryButton>
      </div>
    </DashboardSection>
  );
}