"use client";
import { useState, useMemo } from "react";
import { sharedStyles, colors } from "../styles";
import { Navbar } from "../components/Navbar";
import { IngredientItem } from "../components/IngredientItem";

export default function Pantry() {
  const [searchTerm, setSearchTerm] = useState("");
  const [inventory, setInventory] = useState([
    { id: 101, name: "Whole Milk", quantity: 1, measurement: "Gal" },
    { id: 102, name: "Large Eggs", quantity: 12, measurement: "Unit" },
    { id: 103, name: "Roma Tomatoes", quantity: 4, measurement: "Unit" },
    { id: 104, name: "Ground Beef", quantity: 500, measurement: "Grams" },
    { id: 105, name: "Onions", quantity: 2, measurement: "Unit" },
    { id: 106, name: "Garlic", quantity: 1, measurement: "Bulb" },
    { id: 107, name: "Butter", quantity: 250, measurement: "Grams" },
    { id: 108, name: "Salt", quantity: 1, measurement: "Box" },
  ]);

  // Search Logic
  const filteredInventory = useMemo(() => {
    return inventory.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, inventory]);

  const handleUpdateQuantity = (id, change) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: Math.max(0, item.quantity + change) };
        }
        return item;
      }),
    );
  };

  const handleManualEntry = (id, value) => {
    const numValue = value === "" ? 0 : parseInt(value);
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: isNaN(numValue) ? 0 : Math.max(0, numValue),
          };
        }
        return item;
      }),
    );
  };

  return (
    <div style={sharedStyles.dashboardWrapper}>
      <Navbar />

      <div
        style={{
          padding: "40px 40px 20px 40px",
          textAlign: "center",
          flexShrink: 0,
        }}
      >
        <h1
          style={{
            color: colors.secondary,
            fontSize: "2rem",
            fontWeight: "900",
            marginBottom: "20px",
            letterSpacing: "-0.5px",
            fontFamily: "'Lexend', sans-serif",
          }}
        >
          Pantry
        </h1>

        <div style={sharedStyles.searchContainer}>
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "500px",
              margin: "0 auto",
              color: 'colors.black',
            }}
          >
            <input
              type="text"
              placeholder="Search your ingredients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={sharedStyles.searchBar}
              onFocus={(e) => (e.target.style.borderColor = colors.primary)}
              onBlur={(e) => (e.target.style.borderColor = colors.lightBorder)}
            />
            <span
              style={{
                position: "absolute",
                left: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "1.2rem",
                opacity: 0.3,
              }}
            >
            </span>
          </div>
        </div>
      </div>

      {/* Ingredient Grid */}
      <div style={sharedStyles.gridWrapper}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            width: "100%",
          }}
        >
          {filteredInventory.map((item) => (
            <IngredientItem
              key={item.id}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onManualEntry={handleManualEntry}
            />
          ))}
        </div>

        {filteredInventory.length === 0 && (
          <div
            style={{
              textAlign: "center",
              paddingTop: "60px",
              color: colors.textSecondary,
            }}
          >
            No ingredients found matching "{searchTerm}"
          </div>
        )}
      </div>

      <div style={bottomSummaryStyle}>
        <div style={{ opacity: 0.8 }}>
          Pantry:{" "}
          <strong>
            {inventory.filter((i) => i.quantity > 0).length} Items In-Stock
          </strong>
        </div>
        <div style={{ fontSize: "0.8rem", opacity: 0.5 }}>
          Click edges to adjust | Click number to type
        </div>
      </div>
    </div>
  );
}

const bottomSummaryStyle = {
  width: "100vw",
  height: "50px",
  backgroundColor: colors.background,
  borderTop: `1px solid ${colors.lightBorder}`,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 40px",
  color: colors.secondary,
  flexShrink: 0,
  fontSize: "0.9rem",
  fontFamily: "'Lexend', sans-serif",
};
