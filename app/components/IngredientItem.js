"use client";
import { useState } from "react";
import { colors } from "../styles";

export const IngredientItem = ({ item, onUpdateQuantity, onManualEntry }) => {
  const [activeSide, setActiveSide] = useState(null);

  const handleMouseDown = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isRight = x > rect.width / 2;

    if (isRight) {
      setActiveSide("right");
      onUpdateQuantity(item.id, 1);
    } else {
      setActiveSide("left");
      onUpdateQuantity(item.id, -1);
    }
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={() => setActiveSide(null)}
      onMouseLeave={() => setActiveSide(null)}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "24px 10px",
        borderRadius: "16px",
        border: "1px solid #eee",
        cursor: "pointer",
        overflow: "hidden",
        userSelect: "none",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
        transition: "transform 0.1s ease",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: "50%",
          backgroundColor: "#ff3b30",
          opacity: activeSide === "left" ? 0.5 : 0,
          transition: "opacity 0.05s ease",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "50%",
          backgroundColor: "#34c759",
          opacity: activeSide === "right" ? 0.5 : 0,
          transition: "opacity 0.05s ease",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "#ff3b30",
          fontWeight: "bold",
          fontSize: "2.5rem",
          opacity: 0.2,
          zIndex: 2,
        }}
      >
        -
      </div>
      <div
        style={{
          position: "absolute",
          right: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "#34c759",
          fontWeight: "bold",
          fontSize: "2.5rem",
          opacity: 0.2,
          zIndex: 2,
        }}
      >
        +
      </div>

      <div style={{ zIndex: 5, textAlign: "center", pointerEvents: "none" }}>
        <span
          style={{
            fontSize: "1.1rem",
            color: colors.secondary,
            fontWeight: "800",
            display: "block",
            marginBottom: "2px",
          }}
        >
          {item.name}
        </span>
        <span
          style={{
            fontSize: "0.65rem",
            color: "#bbb",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          {item.measurement}
        </span>
      </div>

      <div style={{ zIndex: 10, marginTop: "14px" }}>
        <input
          type="text"
          inputMode="numeric"
          value={item.quantity}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) =>
            onManualEntry(item.id, e.target.value.replace(/\D/g, ""))
          }
          style={{
            width: "70px",
            textAlign: "center",
            fontSize: "1.8rem",
            fontWeight: "900",
            border: "none",
            background: "#f5f5f5",
            borderRadius: "10px",
            padding: "6px 0",
            color: colors.secondary,
            outline: "none",
            pointerEvents: "auto",
          }}
        />
      </div>
    </div>
  );
};
