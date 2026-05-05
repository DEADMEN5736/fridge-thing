"use client";

import React from "react";
import RecipeCard from "./RecipeCard";
import DashboardSection from "./DashboardSection";
import styles from "../../dashboard/dashboard.module.css";

export default function RecipeSuggestions({ recipes }) {
  return (
    <DashboardSection title="Suggested Recipes" tag="Based on your fridge">
      <div className={styles.recipeGrid}>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.title}
            title={recipe.title}
            description={recipe.description}
            match={recipe.match}
          />
        ))}
      </div>
    </DashboardSection>
  );
}
