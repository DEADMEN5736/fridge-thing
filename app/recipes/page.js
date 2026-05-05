"use client";
import { useState, useRef, useEffect } from "react";
import { colors } from "../styles";
import { Navbar } from "../components/Navbar";
import { RecipeCard } from "../components/RecipeCard";
import { PrimaryButton } from "../components/Buttons";
import { useRouter } from "next/navigation";
import { allRecipes, ingredientOptions } from "../data";

export default function RecipeSearch() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({});

  const router = useRouter();
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowFilters(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFilterToggle = (ing) => {
    setFilters((prev) => {
      const current = prev[ing];
      if (current === undefined) return { ...prev, [ing]: true };
      if (current === true) return { ...prev, [ing]: false };
      const newState = { ...prev };
      delete newState[ing];
      return newState;
    });
  };

  const filteredRecipes = allRecipes.filter((recipe) => {
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesIngredients = Object.entries(filters).every(([filterIng, state]) => {
      const hasIng = recipe.ingredients?.some((recipeIng) => {
        const ingName = typeof recipeIng === "object" ? recipeIng.item : recipeIng;
        return ingName.toLowerCase() === filterIng.toLowerCase();
      });
      return state === true ? hasIng : !hasIng;
    });

    return matchesSearch && matchesIngredients;
  });

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        backgroundColor: "#f9f9f9",
        fontFamily: "'Lexend', sans-serif",
      }}
    >
      <Navbar />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "30px 40px 10px 40px",
          width: "100%",
          flexShrink: 0,
        }}
      >
        <div
          ref={searchContainerRef}
          style={{ position: "relative", width: "100%", maxWidth: "650px" }}
        >
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onFocus={() => setShowFilters(true)}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              color: colors.black,
              width: "100%",
              padding: "14px 20px",
              borderRadius: "12px",
              border: "1px solid #eee",
              backgroundColor: "white",
              fontSize: "1rem",
              outline: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
            }}
          />

          {showFilters && searchTerm === "" && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 10px)",
                left: "-50px",
                right: "-50px",
                backgroundColor: "#121212",
                borderRadius: "12px",
                padding: "24px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                zIndex: 100,
                border: "1px solid #333",
                maxHeight: "450px",
                overflowY: "auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <span
                  style={{
                    color: "#888",
                    fontSize: "0.7rem",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Filter Ingredients
                </span>
                <span
                  style={{
                    color: colors.primary,
                    fontSize: "0.7rem",
                    cursor: "pointer",
                  }}
                  onClick={() => setFilters({})}
                >
                  Clear All
                </span>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {ingredientOptions.map((ing) => {
                  const state = filters[ing];
                  const isInclude = state === true;
                  const isExclude = state === false;

                  return (
                    <button
                      key={ing}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleFilterToggle(ing)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "0.8rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        transition: "0.15s ease",
                        backgroundColor: isInclude
                          ? "rgba(52, 199, 89, 0.2)"
                          : isExclude
                          ? "rgba(255, 59, 48, 0.2)"
                          : "#222",
                        border: `1px solid ${isInclude ? "#34c759" : isExclude ? "#ff3b30" : "#444"}`,
                        color: isInclude
                          ? "#34c759"
                          : isExclude
                          ? "#ff3b30"
                          : "#eee",
                      }}
                    >
                      {isInclude && <span>✓</span>}
                      {isExclude && <span>✕</span>}
                      {ing}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          flex: 1,
          maxWidth: "1500px",
          width: "100%",
          margin: "0 auto",
          padding: "20px 40px 40px 40px",
          boxSizing: "border-box",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "30px",
            width: "100%",
          }}
        >
          {filteredRecipes.map((r) => (
            <div key={r.id} style={{ height: "auto" }}>
              <RecipeCard
                recipe={r}
                isSelected={selectedRecipe === r.id}
                onClick={() =>
                  setSelectedRecipe(selectedRecipe === r.id ? null : r.id)
                }
                isVisible={true}
              />
            </div>
          ))}
        </div>
      </div>

      <div style={bottomBarStyle}>
        <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
          {selectedRecipe ? (
            <span>
              Selected:{" "}
              <strong style={{ color: colors.primary }}>
                {allRecipes.find((r) => r.id === selectedRecipe)?.title}
              </strong>
            </span>
          ) : (
            <span style={{ opacity: 0.5 }}>Select a recipe to continue</span>
          )}
        </div>

        <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
          <PrimaryButton
            bgColor={selectedRecipe ? colors.primary : "#4a5a6a"}
            padding="10px 50px"
            width="auto"
            onClick={() => {
              if (selectedRecipe) {
                router.push(`/recipes/${selectedRecipe}`);
              }
            }}
            style={{ cursor: selectedRecipe ? "pointer" : "not-allowed" }}
          >
            Start Cooking
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

const bottomBarStyle = {
  width: "100vw",
  height: "80px",
  backgroundColor: "rgba(44, 62, 80, 0.95)",
  backdropFilter: "blur(12px)",
  borderTop: "1px solid rgba(255,255,255,0.1)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "stretch",
  padding: "0 60px",
  color: "white",
  flexShrink: 0,
  zIndex: 1000,
};