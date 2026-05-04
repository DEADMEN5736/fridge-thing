"use client";

import React from "react";
import DashboardPageHero from "./DashboardPageHero";

export default function DashboardHeader({ username }) {
  return (
    <DashboardPageHero
      eyebrow="Dashboard"
      title={`Welcome back, ${username}`}
      subtitle="Here's your nutrition, inventory, and recipe overview for today."
    />
  );
}
