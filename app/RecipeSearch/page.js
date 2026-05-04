"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { sharedStyles, colors } from "../styles";
import { Navbar } from "../components/Navbar";
import { RecipeCard } from "../components/RecipeCard";
import { PrimaryButton } from "../components/Buttons";

export default function RecipeSearch() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({});

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

  const allRecipes = useMemo(
    () => [
      {
        id: 1,
        title: "Carmel Apple Pie",
        description: "Treat time.",
        ingredients: ["Apple", "Caramel", "Milk", "Flour", "Butter"],
        cal: 480,
        p: 8,
        c: 80,
        f: 3.28,
        time: 150,
      },
      {
        id: 2,
        title: "Citrus Salmon and Asparagus",
        description: "Lemon garlic salmon.",
        ingredients: ["Salmon", "Asparagus", "Lemon", "Butter", "Garlic"],
        cal: 250,
        p: 32,
        c: 5.55,
        f: 1.69,
        time: 15,
      },
      {
        id: 3,
        title: "Feta-stuffed Hamburger",
        description: "Mediterranean twist.",
        ingredients: ["Beef", "Feta", "Onion", "Garlic", "Spinach"],
        cal: 390,
        p: 24,
        c: 1.67,
        f: 0.04,
        time: 20,
      },
      {
        id: 4,
        title: "Herbed Chicken With Roast Potatos",
        description: "Classic hearty meal.",
        ingredients: ["Chicken", "Potato"],
        cal: 470,
        p: 36,
        c: 77,
        f: 14,
        time: 40,
      },
      {
        id: 5,
        title: "Tuna-Stuffed Baked Peppers with Cheddar",
        description: "Seafood twist on stuffed peppers.",
        ingredients: ["Bell Peppers", "Tuna", "Cheddar"],
        cal: 250,
        p: 36,
        c: 14,
        f: 2.16,
        time: 20,
      },
      {
        id: 6,
        title: "Meatloaf",
        description: "It's a loaf. Of meat.",
        ingredients: ["Beef", "Tomato paste", "Breadcrumbs"],
        cal: 500,
        p: 33,
        c: 14,
        f: 2.16,
        time: 70,
      },
      {
        id: 7,
        title: "Bacon Parmesean Carbonara",
        description: "Pasta with a white bacon sauce.",
        ingredients: ["Pasta", "Milk", "Bacon", "Parmesean"],
        cal: 460,
        p: 30,
        c: 24,
        f: 2.81,
        time: 20,
      },
      {
        id: 8,
        title: "Chicken Curry",
        description: "Rice with a spiced chicken sauce.",
        ingredients: ["Rice", "Chicken"],
        cal: 390,
        p: 27,
        c: 11,
        f: 3.44,
        time: 30,
      },
      {
        id: 9,
        title: "Beef and Barley Stew",
        description: "Rich beef stew with barley.",
        ingredients: ["Beef", "Barley"],
        cal: 380,
        p: 40,
        c: 44,
        f: 8,
        time: 380,
      },
      {
        id: 10,
        title: "Steak Diane",
        description: "Steak cooked with a brandy sauce.",
        ingredients: ["Beef", "Brandy", "Mushrooms"],
        cal: 710,
        p: 63,
        c: 7,
        f: 1.23,
        time: 30,
      },
 {
        id: 11,
        title: "BBQ Glazed Pork Chops",
        description: "Pork chops glazed in a savory BBQ sauce.",
        ingredients: ["Pork", "BBQ sauce"],
        cal: 280,
        p: 44,
        c: 15,
        f: 0.47,
        time: 30,
      },
      {
        id: 12,
        title: "Protein Shake",
        description: "Protein shake base that can work with many ingredients.",
        ingredients: ["Milk", "Whey"],
        cal: 1100,
        p: 220,
        c: 27,
        f: 8,
        time: 10,
      },
      {
        id: 13,
        title: "Basalmic Chicken with Mushrooms",
        description: "Chicken baked in a basalmic glaze.",
        ingredients: ["Chicken", "Basalmic Vinegar"],
        cal: 320,
        p: 55,
        c: 2.73,
        f: 0.59,
        time: 25,
      },
      {
        id: 14,
        title: "Chicken Salad",
        description: "Salad with chicken for extra protein.",
        ingredients: ["Chicken", "Lettuce", "Cranberries"],
        cal: 230,
        p: 27,
        c: 6,
        f: 0.67,
        time: 47,
      },
      {
        id: 15,
        title: "Sweet and Sour Chicken",
        description: "Classic chicken recipe.",
        ingredients: ["Chicken", "Lemon Juice", "Rice"],
        cal: 370,
        p: 50,
        c: 22,
        f: 1.91,
        time: 30,
      },
      {
        id: 16,
        title: "Spaghetti Bolognaise",
        description: "Classic spaghetti recipe.",
        ingredients: ["Spaghetti", "Milk", "Cheese", "Tomato"],
        cal: 520,
        p: 33,
        c: 18,
        f: 7,
        time: 85,
      },
      {
        id: 17,
        title: "Beef, Mushroom, & Cilantro Soup",
        description: "Rich and Savory soup.",
        ingredients: ["Beef", "Mushroom", "Cilantro"],
        cal: 300,
        p: 27,
        c: 27,
        f: 0.77,
        time: 30,
      },
      {
        id: 18,
        title: "Chicken with Mushroom Sauce",
        description: "Chicken breasts in a mushroom cream sauce.",
        ingredients: ["Chicken", "Mushroom"],
        cal: 410,
        p: 36,
        c: 6,
        f: 1.04,
        time: 35,
      },
      {
        id: 19,
        title: "Shrimp Fettucine Alfredo",
        description: "Pasta with a cream sauce and sauted shrimp.",
        ingredients: ["Pasta", "Shrimp"],
        cal: 770,
        p: 45,
        c: 100,
        f: 4.4,
        time: 30,
      },
      {
        id: 20,
        title: "Crustless Quiche",
        description: "Egg based pastry.",
        ingredients: ["Onion", "Egg"],
        cal: 170,
        p: 36,
        c: 12,
        f: 1.88,
        time: 65,
      },

      //the best recipe
      {
        id: 256,
        title: "Five Hundred Cigarettes",
        description: "A lot of tobacco.",
        ingredients: ["Tobacco"],
        cal: -5000,
        p: 0,
        c: 0,
        f: 3,
        time: 0,
      },
    ],
    [],
  );

  const ingredientOptions = [
    "Beef",
    "Chicken",
    "Pork",
    "Tofu"
  ];

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
    const matchesIngredients = Object.entries(filters).every(([ing, state]) => {
      const hasIng = recipe.ingredients?.some(
        (i) => i.toLowerCase() === ing.toLowerCase(),
      );
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
        <div>
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
          padding="10px 50px"
          width="auto"
        >
          Start Cooking
        </PrimaryButton>
      </div>
    </div>
  );
}

const bottomBarStyle = {
  width: "100vw",
  height: "60px",
  backgroundColor: "rgba(44, 62, 80, 0.95)",
  backdropFilter: "blur(12px)",
  borderTop: "1px solid rgba(255,255,255,0.1)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 60px",
  color: "white",
  flexShrink: 0,
};
