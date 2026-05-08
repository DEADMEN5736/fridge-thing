"use client";
import { useState } from "react";
import { colors } from "../../styles";
import { PrimaryButton } from "../../components/Buttons";

export default function MealRecorder({ user, recipe, view }) {
    // Use local state so the progress bars animate when clicked
    const [currentProgress, setCurrentProgress] = useState({
        cal: user.cal_Prog,
        p: user.pro_Prog,
        c: user.car_Prog,
        f: user.fat_Prog
    });

    const handleRecord = () => {
        setCurrentProgress(prev => ({
            cal: prev.cal + recipe.cal,
            p: prev.p + recipe.p,
            c: prev.c + recipe.c,
            f: prev.f + recipe.f,
        }));
        alert("Meal Recorded!");
    };

    // Move your MacroBar component here
    const MacroBar = ({ macroKey, amount }) => {
        const goals = {
            cal: user.cal_Goal,
            p: user.pro_Goal,
            c: user.car_Goal,
            f: user.fat_Goal
        };
        const current = currentProgress[macroKey];
        const pct = (current / goals[macroKey]) * 100;
        const addPct = (amount / goals[macroKey]) * 100;

        return (
            <div style={{ width: "100%", height: "6px", backgroundColor: "#eee", borderRadius: "10px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct + addPct}%`, background: "#34c759", transition: "0.5s" }} />
            </div>
        );
    };

    if (view === "grid") {
        return (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {/* Map your macro cards here */}
                <MacroBar macroKey="cal" amount={recipe.cal} />
            </div>
        );
    }

    return (
        <div style={{ position: "fixed", bottom: 0, width: "100%", height: "90px", background: "#2c3e50", display: "flex", padding: "0 60px", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ color: "white" }}>Total: {recipe.cal} Cal</div>
            <PrimaryButton onClick={handleRecord}>Record Meal</PrimaryButton>
        </div>
    );
}