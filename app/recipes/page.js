"use client";
import { useState, useRef, useEffect } from "react";
import { colors } from "../styles";
import DashboardNavbar from "../components/dashboard/DashboardSidebar";
import { RecipeCard } from "../components/RecipeCard";
import { PrimaryButton } from "../components/Buttons";
import { useRouter } from "next/navigation";
import { allRecipes, ingredientOptions } from "../data";
import styles from "../dashboard/dashboard.module.css";

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

    const matchesIngredients = Object.entries(filters).every(
      ([filterIng, state]) => {
        const hasIng = recipe.ingredients?.some((recipeIng) => {
          const ingName =
            typeof recipeIng === "object" ? recipeIng.item : recipeIng;
          return ingName.toLowerCase() === filterIng.toLowerCase();
        });
        return state === true ? hasIng : !hasIng;
      },
    );

    return matchesSearch && matchesIngredients;
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f7f6",
        padding: "20px 0",
        position: "relative",
      }}
    >
      <header
        style={{ width: "100%", padding: "0 20px", marginBottom: "20px" }}
      >
        <DashboardNavbar />
      </header>

      <main
        style={{
          width: "100%",
          fontFamily: "'Lexend', sans-serif",
          paddingBottom: "120px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "10px 40px 10px 40px",
            width: "100%",
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
                border: "1px solid #dde6e2",
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
                  zIndex: 110,
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
                  <span style={filterLabelStyle}>Filter Ingredients</span>
                  <span
                    style={{
                      color: colors.primary,
                      fontSize: "0.7rem",
                      cursor: "pointer",
                      fontWeight: "600",
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
            maxWidth: "1500px",
            width: "100%",
            margin: "0 auto",
            padding: "20px 40px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              gap: "30px",
            }}
          >
            {filteredRecipes.map((r) => (
              <RecipeCard
                key={r.id}
                recipe={r}
                isSelected={selectedRecipe === r.id}
                onClick={() =>
                  setSelectedRecipe(selectedRecipe === r.id ? null : r.id)
                }
                isVisible={true}
              />
            ))}
          </div>
        </div>
      </main>

      <div style={bottomBarStyle}>
        <div style={{ display: "flex", alignItems: "center" }}>
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
        <PrimaryButton
          bgColor={selectedRecipe ? colors.primary : "#4a5a6a"}
          padding="12px 60px"
          width="auto"
          onClick={() =>
            selectedRecipe && router.push(`/recipes/${selectedRecipe}`)
          }
          style={{ cursor: selectedRecipe ? "pointer" : "not-allowed" }}
        >
          Start Cooking
        </PrimaryButton>
      </div>
    </div>
  );
}

const filterLabelStyle = {
  color: "#888",
  fontSize: "0.7rem",
  fontWeight: "bold",
  textTransform: "uppercase",
  letterSpacing: "1px",
};

const bottomBarStyle = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  height: "80px",
  backgroundColor: "rgba(44, 62, 80, 0.95)",
  backdropFilter: "blur(12px)",
  borderTop: "1px solid rgba(255,255,255,0.1)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 60px",
  color: "white",
  zIndex: 1000,
};
