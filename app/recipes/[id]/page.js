import { redirect } from "next/navigation";
import { allRecipes } from "../../data";
import { colors, sharedStyles } from "../../styles";
import DashboardNavbar from "../../components/dashboard/DashboardSidebar";
import { getAuthUser } from "@/lib/auth";
import RecipeClient from "./RecipeClient";

export default async function RecipeDetail({ params }) {
  const { id } = await params;
  const recipe = allRecipes.find((r) => r.id === parseInt(id)) || allRecipes[0];

  const user = await getAuthUser();
  if (!user) redirect("/login");

  // { id: 101, name: "Whole Milk", quantity: getDbItem("Whole Milk").quantity, measurement: getDbItem("Whole Milk").unit },
  // { id: 102, name: "Large Eggs", quantity: getDbItem("Large Eggs").quantity, measurement: getDbItem("Large Eggs").unit },
  // { id: 103, name: "Roma Tomatoes", quantity: getDbItem("Roma Tomatoes").quantity, measurement: getDbItem("Roma Tomatoes").unit },
  // { id: 104, name: "Ground Beef", quantity: getDbItem("Ground Beef").quantity, measurement: getDbItem("Ground Beef").unit },
  // { id: 105, name: "Onions", quantity: getDbItem("Onions").quantity, measurement: getDbItem("Onions").unit },
  // { id: 106, name: "Garlic", quantity: getDbItem("Garlic").quantity, measurement: getDbItem("Garlic").unit },
  // { id: 107, name: "Butter", quantity: getDbItem("Butter").quantity, measurement: getDbItem("Butter").unit },
  // { id: 108, name: "Salt", quantity: getDbItem("Salt").quantity, measurement: getDbItem("Salt").unit },

  //This is so cancerous, I hate it but we are running out of time

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f7f6",
        padding: "20px 0",
      }}
    >
      <header
        style={{ width: "100%", padding: "0 20px", marginBottom: "20px" }}
      >
        <DashboardNavbar />
      </header>

      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px 20px 120px 20px",
          fontFamily: "'Lexend', sans-serif",
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

            {/* PASS THE INTERACTIVE GRID HERE */}
            <RecipeClient user={user} recipe={recipe} type="grid" />
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
          {/* Ingredients Section */}
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

          {/* Instructions Section */}
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
              {recipe.steps?.map((step, index) => (
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
              )) || <p>Follow standard prep for {recipe.title}.</p>}
            </div>
          </div>
        </div>
      </main>

      {/* PASS THE INTERACTIVE BOTTOM BAR HERE */}
      <RecipeClient user={user} recipe={recipe} type="bar" />
    </div>
  );
}
