"use client";

import React from "react";
import styles from "../../dashboard/dashboard.module.css";
import { SecondaryButton } from "../Buttons";

export default function RecipeCard({ title, description, match }) {
  return (
    <div className={styles.recipeCard}>
      <h3 className={styles.recipeTitle}>{title}</h3>
      <p className={styles.recipeDescription}>{description}</p>
      <p className={styles.recipeMatch}>{match}</p>
      <SecondaryButton 
        style={{ 
          width: "100%", 
          height: "50px", 
          borderRadius: "8px",
          fontWeight: "600",
          fontSize: "0.9rem"
        }}
      >
        View Recipe
      </SecondaryButton>
    </div>
  );
}