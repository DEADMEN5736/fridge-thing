"use client";
import { colors } from "../styles";

export const RecipeCard = ({ recipe, isSelected, onClick, isVisible }) => {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: colors.background,
        borderRadius: "12px",
        display: "flex",
        flexDirection: "row",
        cursor: "pointer",
        outline: isSelected
          ? `3px solid ${colors.primary}`
          : `3px solid transparent`,
        outlineOffset: "2px",
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? isSelected
            ? "scale(1.01)"
            : "scale(1)"
          : "scale(0.9)",
        transition:
          "opacity 0.4s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), outline 0.2s ease",
        pointerEvents: isVisible ? "auto" : "none",
        overflow: "hidden",
        boxShadow: isSelected
          ? "0 15px 30px rgba(0,0,0,0.12)"
          : "0 4px 10px rgba(0,0,0,0.05)",
        height: "230px",
        width: "100%",
      }}
    >
      <div style={{ width: "25%", height: "100%", overflow: "hidden" }}>
        <img
          src={`/${recipe.id}.png`}
          alt={recipe.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      <div
        style={{
          width: "75%",
          display: "flex",
          flexDirection: "column",
          padding: "0",
        }}
      >
        <div
          style={{
            height: "70%",
            padding: "15px 20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: '15px'
            }}
          >
            <h3
              style={{
                fontWeight: "900",
                fontSize: "1.4rem",
                color: colors.secondary,
                margin: 0,
                fontFamily: "'Lexend', sans-serif",
              }}
            >
              {recipe.title}
            </h3>
            <span
              style={{
                fontSize: "0.85rem",
                fontWeight: "bold",
                color: colors.primary,
                backgroundColor: `${colors.primary}15`,
                padding: "4px 8px",
                borderRadius: "6px",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              ⏱ {recipe.time}m
            </span>
          </div>

          <div
            style={{
              marginTop: "10px",
              fontSize: "0.85rem",
              color: colors.textSecondary,
              fontWeight: "600",
              display: "flex",
              gap: "15px",
            }}
          >
            <span>
              Calories: <strong>{recipe.cal}</strong>
            </span>
            <span>
              Protein: <strong>{recipe.p}g</strong>
            </span>
            <span>
              Carbs: <strong>{recipe.c}g</strong>
            </span>
            <span>
              Fiber: <strong>{recipe.f}g</strong>
            </span>
          </div>
        </div>

        <div
          style={{
            height: "30%",
            backgroundColor: colors.lightBackground,
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            borderTop: `1px solid ${colors.lightBorder}`,
          }}
        >
          <p
            style={{
              fontSize: "0.8rem",
              color: colors.textSecondary,
              margin: 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%",
            }}
          >
            {recipe.description}
          </p>
        </div>
      </div>
    </div>
  );
};
