"use client";
import { useState, useMemo, useEffect } from "react";
import { sharedStyles, colors } from "../styles";
import DashboardNavbar from "../components/dashboard/DashboardSidebar"; 
import { IngredientItem } from "../components/IngredientItem";

export default function Pantry() {
    const [inventory, setInventory] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const res = await fetch("/api/user");
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
                await fetch("/api/user", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        itemName: targetItemName,
                        newQuantity: Number(safeQuantity),
                    }),
                });
            } catch (err) {
                console.error("Network error saving to DB:", err);
            }
        }
    };

    if (loading) return <div style={{ padding: "40px", backgroundColor: "#f4f7f6", minHeight: "100vh" }}>Loading...</div>;

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f4f7f6", padding: "20px 0", position: "relative" }}>
            
            <header style={{ width: "100%", padding: "0 20px", marginBottom: "20px" }}>
                <DashboardNavbar />
            </header>

            <main style={{ width: "100%", fontFamily: "'Lexend', sans-serif", paddingBottom: "120px" }}>
                <div style={{ padding: "10px 40px 20px 40px", textAlign: "center" }}>
                    <h1 style={{ color: colors.secondary, fontSize: "2.2rem", fontWeight: "900", marginBottom: "25px" }}>
                        Pantry
                    </h1>

                    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                        <div style={{ position: "relative", width: "100%", maxWidth: "500px" }}>
                            <input
                                type="text"
                                placeholder="Search your ingredients..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "14px 20px",
                                    borderRadius: "12px",
                                    border: "1px solid #dde6e2",
                                    backgroundColor: "white",
                                    fontSize: "1rem",
                                    outline: "none",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                                    color: colors.black
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div style={{ maxWidth: "1500px", margin: "0 auto", padding: "20px 40px" }}>
                    <div style={{ 
                        display: "grid", 
                        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
                        gap: "25px", 
                        width: "100%" 
                    }}>
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
            </main>

            
            <div style={bottomSummaryStyle}>
                <div>
                    Pantry: <strong>{inventory.filter((i) => i.quantity > 0).length} Items In-Stock</strong>
                </div>
            </div>
        </div>
    );
}

const bottomSummaryStyle = {
    position: "fixed",
    bottom: 0,
    left: 0,
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
    zIndex: 1000,
};