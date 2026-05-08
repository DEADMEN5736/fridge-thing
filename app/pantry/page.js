"use client";
import { useState, useMemo, useEffect } from "react";
import { sharedStyles, colors } from "../styles";
import { Navbar } from "../components/Navbar";
import { IngredientItem } from "../components/IngredientItem";

export default function Pantry() {
    const [inventory, setInventory] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    // 1. Load data from your API on mount
    useEffect(() => {
        async function loadData() {
            try {
                const res = await fetch("/api/user"); // This calls the route we discussed earlier
                const user = await res.json();

                if (user && user.userPantry) {
                    const getDbItem = (name) =>
                        user.userPantry.find((i) => i.itemName === name) || { quantity: 0, unit: "Unit" };

                    setInventory([
                        { id: 101, name: "Whole Milk", quantity: getDbItem("Whole Milk").quantity, measurement: getDbItem("Whole Milk").unit },
                        { id: 102, name: "Large Eggs", quantity: getDbItem("Large Eggs").quantity, measurement: getDbItem("Large Eggs").unit },
                        { id: 103, name: "Roma Tomatoes", quantity: getDbItem("Roma Tomatoes").quantity, measurement: getDbItem("Roma Tomatoes").unit },
                        { id: 104, name: "Ground Beef", quantity: getDbItem("Ground Beef").quantity, measurement: getDbItem("Ground Beef").unit },
                        { id: 105, name: "Onions", quantity: getDbItem("Onions").quantity, measurement: getDbItem("Onions").unit },
                        { id: 106, name: "Garlic", quantity: getDbItem("Garlic").quantity, measurement: getDbItem("Garlic").unit },
                        { id: 107, name: "Butter", quantity: getDbItem("Butter").quantity, measurement: getDbItem("Butter").unit },
                        { id: 108, name: "Salt", quantity: getDbItem("Salt").quantity, measurement: getDbItem("Salt").unit },
                    ]);
                }
            } catch (err) {
                console.error("Failed to load pantry", err);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const filteredInventory = useMemo(() => {
        return inventory.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, inventory]);

    const handleUpdateQuantity = async (id, change) => {
        let updatedItem = null;

        setInventory((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    updatedItem = { ...item, quantity: Math.max(0, item.quantity + change) };
                    return updatedItem;
                }
                return item;
            })
        );

        if (updatedItem) {
            await fetch("/api/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    itemName: updatedItem.name,
                    newQuantity: updatedItem.quantity,
                }),
            });
        }
    };

    const handleManualEntry = async (id, value) => {
        const finalQuantity = value === "" ? 0 : parseInt(value, 10);
        const safeQuantity = isNaN(finalQuantity) ? 0 : Math.max(0, finalQuantity);

        let targetItemName = "";

        setInventory((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    targetItemName = item.name;
                    return { ...item, quantity: safeQuantity };
                }
                return item;
            })
        );

        if (targetItemName) {
            try {
                const response = await fetch("/api/user", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        itemName: targetItemName,
                        newQuantity: Number(safeQuantity),
                    }),
                });

                if (!response.ok) {
                    console.error("Server rejected the update");
                }
            } catch (err) {
                console.error("Network error saving to DB:", err);
            }
        }
    };

    if (loading) return <div style={{ padding: "40px", color: colors.secondary }}>Loading your pantry...</div>;

    return (
        <div style={sharedStyles.dashboardWrapper}>
            <Navbar />

            <div style={{ padding: "40px 40px 20px 40px", textAlign: "center", flexShrink: 0 }}>
                <h1 style={{ color: colors.secondary, fontSize: "2rem", fontWeight: "900", marginBottom: "20px", fontFamily: "'Lexend', sans-serif" }}>
                    Pantry
                </h1>

                <div style={sharedStyles.searchContainer}>
                    <div style={{ position: "relative", width: "100%", maxWidth: "500px", margin: "0 auto", color: "#000000"}}>
                        <input
                            type="text"
                            placeholder="Search your ingredients..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={sharedStyles.searchBar}
                        />
                    </div>
                </div>
            </div>

            <div style={sharedStyles.gridWrapper}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", width: "100%" }}>
                    {filteredInventory.map((item) => (
                        <IngredientItem
                            key={item.id}
                            item={item}
                            onUpdateQuantity={handleUpdateQuantity}
                            onManualEntry={handleManualEntry}
                        />
                    ))}
                </div>
            </div>

            <div style={bottomSummaryStyle}>
                <div>
                    Pantry: <strong>{inventory.filter((i) => i.quantity > 0).length} Items In-Stock</strong>
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
    fontSize: "0.9rem",
    fontFamily: "'Lexend', sans-serif",
};