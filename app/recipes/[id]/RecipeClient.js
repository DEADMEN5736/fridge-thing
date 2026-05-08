"use client";
import { useState } from "react";
import { colors } from "../../styles";
import { PrimaryButton } from "../../components/Buttons";
import { recordMealAction } from "./actions";

export default function RecipeClient({ user: initialUser, recipe, type }) {
    const [user, setUser] = useState(initialUser);
    const [isSaving, setIsSaving] = useState(false);

    const handleRecordMeal = async () => {
        setIsSaving(true);

        try {
            const updatedUser = await recordMealAction(recipe);

            setUser(updatedUser);

            alert("Meal Recorded & Saved!");
        } catch (error) {
            console.error("Failed to save:", error);
            alert("Could not save to database.");
        } finally {
            setIsSaving(false);
        }
    };

    const MacroBar = ({ macroKey, amount, height = "6px" }) => {
        const goals = {
            cal: { current: user.cal_Prog, target: user.cal_Goal },
            p: { current: user.pro_Prog, target: user.pro_Goal },
            c: { current: user.car_Prog, target: user.car_Goal },
            f: { current: user.fat_Prog, target: user.fat_Goal },
        };
        const goal = goals[macroKey];
        const currentPct = (goal.current / goal.target) * 100;
        const addedPct = (amount / goal.target) * 100;

        return (
            <div style={{ width: "100%", height, backgroundColor: "rgba(0,0,0,0.1)", borderRadius: "10px", marginTop: "4px", overflow: "hidden" }}>
                <div style={{
                    height: "100%",
                    width: "100%",
                    background: `linear-gradient(to right, #34c759 0%, #34c759 ${currentPct}%, #ffcc00 ${currentPct}%, #ffcc00 ${currentPct + addedPct}%, transparent ${currentPct + addedPct}%)`,
                    transition: "all 0.5s ease"
                }} />
            </div>
        );
    };

    if (type === "grid") {
        return (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
                {[
                    { label: "Calories", val: recipe.cal, unit: "", key: "cal" },
                    { label: "Protein", val: recipe.p, unit: "g", key: "p" },
                    { label: "Carbs", val: recipe.c, unit: "g", key: "c" },
                    { label: "Fats", val: recipe.f, unit: "g", key: "f" },
                ].map((m) => (
                    <div key={m.label} style={{ backgroundColor: "white", padding: "12px 16px", borderRadius: "10px", border: "1px solid #eee" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                            <span style={{ fontSize: "0.7rem", color: "#888", fontWeight: "800" }}>{m.label}</span>
                            <div style={{ fontSize: "1.2rem", fontWeight: "900", color: colors.secondary }}>
                                {m.val}<span style={{ fontSize: "0.8rem" }}>{m.unit}</span>
                            </div>
                        </div>
                        <MacroBar macroKey={m.key} amount={m.val} height="8px" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div style={{ position: "fixed", bottom: 0, left: 0, width: "100%", minHeight: "90px", backgroundColor: "rgba(44, 62, 80, 0.95)", backdropFilter: "blur(12px)", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 60px", zIndex: 1000 }}>
            <div>
                <span style={{ fontSize: "1.1rem", fontWeight: "bold" }}>{recipe.cal} Calories</span>
                <div style={{ width: "120px" }}><MacroBar macroKey="cal" amount={recipe.cal} height="4px" /></div>
            </div>
            <PrimaryButton
                onClick={handleRecordMeal}
                bgColor={isSaving ? "#7f8c8d" : colors.primary}
                width="auto"
                padding="12px 60px"
            >
                {isSaving ? "Saving..." : "Record Meal"}
            </PrimaryButton>
        </div>
    );
}