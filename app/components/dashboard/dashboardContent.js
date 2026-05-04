export const primaryTabs = [
  { key: "dashboard", label: "Dashboard", shortLabel: "D", href: "/dashboard" },
  { key: "accounts", label: "Accounts", shortLabel: "A", href: "/dashboard/accounts" },
  { key: "meals", label: "Meals", shortLabel: "M", href: "/dashboard/meals" },
  { key: "nutrition", label: "Nutrition", shortLabel: "N", href: "/dashboard/nutrition" },
];

export const dashboardMacroData = [
  { title: "Calories", current: 1850, goal: 2200, unit: "kcal" },
  { title: "Protein", current: 132, goal: 170, unit: "g" },
  { title: "Carbs", current: 190, goal: 240, unit: "g" },
  { title: "Fats", current: 58, goal: 75, unit: "g" },
];

export const dashboardInventoryItems = [
  "Chicken Breast",
  "Eggs",
  "Greek Yogurt",
  "Spinach",
  "Brown Rice",
  "Avocados",
];

export const dashboardQuickActions = [
  "Add Groceries",
  "Set Macro Goals",
  "Find Recipes",
  "View Substitutes",
];

export const dashboardRecipes = [
  {
    title: "Chicken Rice Bowl",
    description: "High-protein meal using chicken, brown rice, and spinach.",
    match: "Uses 5 ingredients you already have",
  },
  {
    title: "Spinach Omelet",
    description: "Quick breakfast packed with protein and healthy fats.",
    match: "Uses 3 ingredients you already have",
  },
  {
    title: "Greek Yogurt Power Bowl",
    description: "Fast snack with yogurt, fruit, and granola.",
    match: "Uses 2 ingredients you already have",
  },
];

export const accountStats = [
  { label: "Profile completion", value: "92%" },
  { label: "Weekly grocery budget", value: "$85" },
  { label: "Meal prep time target", value: "25 min" },
];

export const nutritionGoals = [
  {
    title: "Macro goals",
    description:
      "2200 kcal, 170g protein, 240g carbs, and 75g fats to support a balanced high-protein plan.",
    value: "Daily",
  },
  {
    title: "Diet style",
    description:
      "Flexible high-protein meals that prioritize whole foods and easy ingredient swaps.",
    value: "Lifestyle",
  },
  {
    title: "Health focus",
    description:
      "Reduce food waste while staying consistent with nutritious meals and pantry-first planning.",
    value: "Priority",
  },
];

export const accountPreferences = [
  {
    title: "Account details",
    description: "Antonio Ramirez, antonio@example.com, student-friendly meal planning profile.",
    value: "Owner",
  },
  {
    title: "Dietary preferences",
    description: "Lean protein, simple breakfasts, fast lunches, and flexible dinner recipes.",
    value: "Saved",
  },
  {
    title: "Substitution rules",
    description: "Suggest alternatives for missing ingredients before recommending a store run.",
    value: "Enabled",
  },
];

export const convenienceSettings = [
  {
    title: "Budget mode",
    description:
      "Prioritize recipes that use ingredients already in the fridge and keep grocery spend low.",
    value: "On",
  },
  {
    title: "Time-saving recipes",
    description:
      "Surface meals that fit within a short prep window for classes, work, and busy evenings.",
    value: "25 min max",
  },
  {
    title: "Shopping reminders",
    description:
      "Highlight only the essentials when pantry gaps affect your macro goals or meal plan.",
    value: "Smart list",
  },
];

export const mealPlans = [
  {
    title: "Breakfast rotation",
    description: "Protein oatmeal, Greek yogurt bowls, and spinach omelets for fast starts.",
    value: "3 staples",
  },
  {
    title: "Lunch prep",
    description: "Chicken rice bowls and fridge-cleanout wraps built from pantry-first ingredients.",
    value: "2 prep days",
  },
  {
    title: "Dinner ideas",
    description: "Simple meals that reuse proteins and vegetables already in the fridge.",
    value: "Low waste",
  },
];

export const nutritionAreas = [
  {
    title: "Protein consistency",
    description: "Track whether your recipe suggestions keep you aligned with your protein target.",
    value: "170g goal",
  },
  {
    title: "Balanced macros",
    description: "See how meals contribute to daily calories, carbs, fats, and overall energy.",
    value: "Daily view",
  },
  {
    title: "Smarter substitutions",
    description: "Recommend ingredient swaps that preserve macro quality when staples run out.",
    value: "Adaptive",
  },
];
