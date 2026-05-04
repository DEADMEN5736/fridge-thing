"use client";

import React from "react";
import styles from "../../dashboard/dashboard.module.css";

export default function RecipeCard({ title, description, match }) {
  return (
    <div className={styles.recipeCard}>
      <h3 className={styles.recipeTitle}>{title}</h3>
      <p className={styles.recipeDescription}>{description}</p>
      <p className={styles.recipeMatch}>{match}</p>
      <button className={styles.buttonSecondary}>View Recipe</button>
    </div>
  );
}
