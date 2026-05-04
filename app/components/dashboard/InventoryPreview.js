"use client";

import React from "react";
<<<<<<< HEAD
import DashboardSection from "./DashboardSection";
import styles from "../../dashboard/dashboard.module.css";
=======
import { useRouter } from "next/navigation";
>>>>>>> 0824440fbcd239960aeebb4ecf19b583dc7784ef

export default function InventoryPreview({ items }) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/pantry");
  }
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

<<<<<<< HEAD
      <div className={styles.inventoryActions}>
        <button className={styles.buttonPrimary}>Add Ingredient</button>
        <button className={styles.buttonSecondary}>View Pantry</button>
      </div>
    </DashboardSection>
=======
      <button style={styles.primaryButtonFull} onClick={handleClick}>Update Pantry</button>
    </section>
>>>>>>> 0824440fbcd239960aeebb4ecf19b583dc7784ef
  );
}
