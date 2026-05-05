"use client";
import { useParams } from "next/navigation";
import { allRecipes } from "../../data";
import { colors } from "../../styles";
import { Navbar } from "../../components/Navbar";
import { PrimaryButton } from "../../components/Buttons";

export default function RecipeDetail() {
  const { id } = useParams();
  const recipe = allRecipes.find((r) => r.id === parseInt(id)) || allRecipes[0];

  const userGoals = {
    cal: { current: 1200, target: 2000 },
    p: { current: 80, target: 150 },
    c: { current: 150, target: 250 },
    f: { current: 40, target: 70 },
  };

  const handleRecordMeal = () => {
    console.log(`Recording ${recipe.title}...`);
    alert("Meal Recorded!");
  };

  const MacroBar = ({ macroKey, amount, height = "6px" }) => {
    const goal = userGoals[macroKey];
    const currentPct = (goal.current / goal.target) * 100;
    const addedPct = (amount / goal.target) * 100;

    return (
      <div
        style={{
          width: "100%",
          height: height,
          backgroundColor: "rgba(255,255,255,0.2)",
          borderRadius: "10px",
          marginTop: "4px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            background: `linear-gradient(to right, 
              #34c759 0%, #34c759 ${currentPct}%, 
              #ffcc00 ${currentPct}%, #ffcc00 ${currentPct + addedPct}%, 
              transparent ${currentPct + addedPct}%)`,
            transition: "all 0.5s ease",
          }}
        />
      </div>
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f9f9f9",
        fontFamily: "'Lexend', sans-serif",
      }}
    >
      <Navbar />

      <main
        style={{
          flex: 1,
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "40px 20px 120px 20px",
        }}
      >
        <div style={{ display: "flex", gap: "40px", marginBottom: "50px" }}>
          <div style={{ flex: 1 }}>
            <h1
              style={{
                fontSize: "2.8rem",
                fontWeight: "900",
                color: colors.secondary,
                marginBottom: "15px",
              }}
            >
              {recipe.title}
            </h1>
            <p
              style={{
                fontSize: "1.1rem",
                color: "#666",
                lineHeight: "1.6",
                marginBottom: "30px",
              }}
            >
              {recipe.detailedDesc || recipe.description}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "12px",
              }}
            >
              {[
                { label: "Calories", val: recipe.cal, unit: "", key: "cal" },
                { label: "Protein", val: recipe.p, unit: "g", key: "p" },
                { label: "Carbs", val: recipe.c, unit: "g", key: "c" },
                { label: "Fats", val: recipe.f, unit: "g", key: "f" },
              ].map((m) => (
                <div key={m.label} style={detailCardStyle}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.7rem",
                        textTransform: "uppercase",
                        color: "#888",
                        fontWeight: "800",
                      }}
                    >
                      {m.label}
                    </span>
                    <div
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "900",
                        color: colors.secondary,
                      }}
                    >
                      {m.val}
                      <span style={{ fontSize: "0.8rem", marginLeft: "2px" }}>
                        {m.unit}
                      </span>
                    </div>
                  </div>
                  <div style={{ marginTop: "8px" }}>
                    <MacroBar macroKey={m.key} amount={m.val} height="8px" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ width: "45%", flexShrink: 0 }}>
            <div
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                height: "400px",
              }}
            >
              <img
                src={`/${recipe.id}.png`}
                alt={recipe.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "60px" }}>
          <div style={{ width: "300px" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                color: colors.secondary,
                marginBottom: "20px",
              }}
            >
              Ingredients
            </h2>
            <div
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "12px",
                border: "1px solid #eee",
              }}
            >
              {recipe.ingredients.map((ing, i) => (
                <div
                  key={i}
                  style={{
                    padding: "10px 0",
                    borderBottom:
                      i === recipe.ingredients.length - 1
                        ? "none"
                        : "1px solid #f0f0f0",
                    fontWeight: "600",
                    color: colors.secondary,
                  }}
                >
                  {typeof ing === "object"
                    ? `${ing.amount} ${ing.unit} ${ing.item}`
                    : ing}
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <h2
              style={{
                fontSize: "1.5rem",
                color: colors.secondary,
                marginBottom: "20px",
              }}
            >
              Instructions
            </h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              {recipe.steps ? (
                recipe.steps.map((step, index) => (
                  <div key={index} style={{ display: "flex", gap: "15px" }}>
                    <span
                      style={{
                        fontWeight: "900",
                        color: colors.primary,
                        fontSize: "1.2rem",
                      }}
                    >
                      {index + 1}
                    </span>
                    <p
                      style={{
                        color: "#666",
                        lineHeight: "1.6",
                        marginTop: "2px",
                      }}
                    >
                      {step.text}
                    </p>
                  </div>
                ))
              ) : (
                <p style={{ color: "#666" }}>
                  Follow standard preparation for {recipe.title}.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      <div style={bottomBarStyle}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "120px",
              }}
            >
              <span
                style={{
                  fontSize: "0.7rem",
                  opacity: 0.8,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Total Intake
              </span>
              <span style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                {recipe.cal} Calories
              </span>
              <MacroBar macroKey="cal" amount={recipe.cal} height="4px" />
            </div>

            <div style={{ display: "flex", gap: "30px" }}>
              {[
                { label: "Protein", val: recipe.p, unit: "g", key: "p" },
                { label: "Carbs", val: recipe.c, unit: "g", key: "c" },
                { label: "Fats", val: recipe.f, unit: "g", key: "f" },
              ].map((m) => (
                <div
                  key={m.label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "80px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.6rem",
                      opacity: 0.7,
                      textTransform: "uppercase",
                    }}
                  >
                    {m.label}
                  </span>
                  <span style={{ fontSize: "0.9rem", fontWeight: "700" }}>
                    {m.val}
                    {m.unit}
                  </span>
                  <MacroBar macroKey={m.key} amount={m.val} height="4px" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
          <PrimaryButton
            bgColor={colors.primary}
            padding="12px 60px"
            width="auto"
            onClick={handleRecordMeal}
          >
            Record Meal
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

const detailCardStyle = {
  backgroundColor: "white",
  padding: "12px 16px",
  borderRadius: "10px",
  border: "1px solid #eee",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const bottomBarStyle = {
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  minHeight: "90px",
  backgroundColor: "rgba(44, 62, 80, 0.95)",
  backdropFilter: "blur(12px)",
  borderTop: "1px solid rgba(255,255,255,0.1)",
  zIndex: 1000,
  color: "white",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 60px",
};
