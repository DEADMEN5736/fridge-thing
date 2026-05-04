"use client";
import { useParams } from "next/navigation";
import { colors } from "../../styles";
import { Navbar } from "../../components/Navbar";
import { PrimaryButton } from "../../components/Buttons";

export default function RecipeDetail() {
  const { id } = useParams();

  const recipe = {
    title: "Citrus Salmon and Asparagus",
    description: "A refreshing, heart-healthy meal featuring pan-seared salmon with a zesty lemon garlic butter sauce. This is a perfect light dinner that packs high protein and healthy fats.",
    time: 15,
    cal: 250,
    macros: {
      protein: { amount: 32, unit: "g", label: "Protein" },
      carbs: { amount: 5.5, unit: "g", label: "Carbs" },
      fats: { amount: 1.6, unit: "g", label: "Fats" },
      fiber: { amount: 3.2, unit: "g", label: "Fiber" },
      sugar: { amount: 1.2, unit: "g", label: "Sugar" },
      sodium: { amount: 450, unit: "mg", label: "Sodium" },
    },
    ingredients: [
      { item: "Salmon Fillets", amount: "2", unit: "pcs" },
      { item: "Asparagus", amount: "1", unit: "bunch" },
      { item: "Lemon", amount: "1", unit: "large" },
      { item: "Unsalted Butter", amount: "2", unit: "tbsp" },
      { item: "Garlic", amount: "3", unit: "cloves" },
    ],
    steps: [
      { text: "Season the salmon fillets with salt and pepper.", image: null },
      { text: "Sauté garlic in butter until golden.", image: null },
      { text: "BOMBOCLATT", image: null },
    ]
  };

  const handleRecordMeal = () => {
    console.log(`Recording ${recipe.title} to user history...`);
    alert("Meal Recorded!");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#f9f9f9", fontFamily: "'Lexend', sans-serif" }}>
      <Navbar />

      <main style={{ flex: 1, maxWidth: "1200px", margin: "0 auto", padding: "40px 20px 120px 20px" }}>
        
        <div style={{ display: "flex", gap: "40px", marginBottom: "50px", alignItems: "flex-start" }}>
          
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: "2.8rem", fontWeight: "900", color: colors.secondary, marginBottom: "15px" }}>
              {recipe.title}
            </h1>
            <p style={{ fontSize: "1.1rem", color: "#666", lineHeight: "1.6", marginBottom: "30px" }}>
              {recipe.description}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
              {Object.values(recipe.macros).map((m) => (
                <div key={m.label} style={detailCardStyle}>
                  <span style={{ fontSize: "0.7rem", textTransform: "uppercase", color: "#888", fontWeight: "800" }}>{m.label}</span>
                  <div style={{ fontSize: "1.2rem", fontWeight: "900", color: colors.secondary }}>
                    {m.amount}<span style={{ fontSize: "0.8rem", fontWeight: "600", marginLeft: "2px" }}>{m.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ width: "45%", flexShrink: 0 }}>
            <div style={{ 
              borderRadius: "20px", 
              overflow: "hidden", 
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              height: "400px" 
            }}>
              <img 
                src={`/${id}.png`} 
                alt={recipe.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }} 
              />
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "60px" }}>
          <div style={{ width: "300px", flexShrink: 0 }}>
            <h2 style={{ fontSize: "1.5rem", color: colors.secondary, marginBottom: "20px" }}>Ingredients</h2>
            <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "12px", border: "1px solid #eee" }}>
              {recipe.ingredients.map((ing, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i === recipe.ingredients.length - 1 ? "none" : "1px solid #f0f0f0" }}>
                  <span style={{ fontSize: "0.95rem", fontWeight: "600", color: colors.secondary }}>{ing.item}</span>
                  <span style={{ fontSize: "0.95rem", color: colors.primary, fontWeight: "700" }}>{ing.amount} {ing.unit}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: "1.5rem", color: colors.secondary, marginBottom: "20px" }}>Instructions</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
              {recipe.steps.map((step, index) => (
                <div key={index} style={{ display: "flex", gap: "20px" }}>
                  <div style={stepNumberStyle}>{index + 1}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "1.05rem", color: colors.secondary, lineHeight: "1.6", margin: 0 }}>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <div style={bottomBarStyle}>
        <div style={{ 
          display: "flex", 
          flexDirection: "column",
          justifyContent: "center"
        }}>
          <span style={{ fontSize: "0.7rem", opacity: 0.8, textTransform: "uppercase", letterSpacing: "1px" }}>Total Intake</span>
          <span style={{ fontSize: "1.1rem", fontWeight: "bold" }}>{recipe.cal} Calories</span>
        </div>
        
        <div style={{ 
          height: "100%",
          display: "flex", 
          alignItems: "center"
        }}>
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
  justifyContent: "center"
};

const stepNumberStyle = {
  width: "32px",
  height: "32px",
  backgroundColor: colors.primary,
  color: "white",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "900",
  fontSize: "0.9rem",
  flexShrink: 0
};

const bottomBarStyle = {
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  height: "80px", 
  backgroundColor: "rgba(44, 62, 80, 0.95)",
  backdropFilter: "blur(12px)",
  borderTop: "1px solid rgba(255,255,255,0.1)",
  zIndex: 1000,
  color: "white",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "stretch",
  padding: "0px 60px",
};