"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function InventoryPreview({ items }) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/pantry");
  }
  return (
    <section style={styles.sectionCard}>
      <div style={styles.sectionHeaderRow}>
        <h2 style={styles.sectionTitle}>Current Inventory</h2>
        <span style={styles.linkText}>See all</span>
      </div>

      <div style={styles.inventoryList}>
        {items.map((item) => (
          <div key={item} style={styles.inventoryItem}>
            <span style={styles.bullet} />
            <span style={styles.inventoryText}>{item}</span>
          </div>
        ))}
      </div>

      <button style={styles.primaryButtonFull} onClick={handleClick}>Update Pantry</button>
    </section>
  );
}

const styles = {
  sectionCard: {
    backgroundColor: "#ffffff",
    borderRadius: "18px",
    padding: "28px",
    boxShadow: "0 8px 24px rgba(36, 59, 90, 0.06)",
  },

  sectionHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    gap: "12px",
    flexWrap: "wrap",
  },

  sectionTitle: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#243b5a",
    margin: 0,
  },

  linkText: {
    color: "#38c96b",
    fontWeight: 700,
    fontSize: "0.95rem",
    cursor: "pointer",
  },

  inventoryList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    marginBottom: "24px",
  },

  inventoryItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    backgroundColor: "#f8faf9",
    borderRadius: "12px",
    padding: "14px 16px",
    border: "1px solid #e4e8e7",
  },

  bullet: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: "#38c96b",
    display: "inline-block",
  },

  inventoryText: {
    color: "#243b5a",
    fontWeight: 600,
  },

  primaryButtonFull: {
    width: "100%",
    backgroundColor: "#38c96b",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    padding: "14px 20px",
    fontWeight: 700,
    fontSize: "1rem",
    cursor: "pointer",
  },
};