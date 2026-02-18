export function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export function round(n, d = 0) {
  const p = 10 ** d;
  return Math.round(n * p) / p;
}

export const ACTIVITY = [
  { k: "sedentary", label: "Sedentary (little/no exercise)", mult: 1.2 },
  { k: "light", label: "Light (1-3 days/week)", mult: 1.375 },
  { k: "moderate", label: "Moderate (3-5 days/week)", mult: 1.55 },
  { k: "active", label: "Active (6-7 days/week)", mult: 1.725 },
  { k: "very", label: "Very Active (hard training)", mult: 1.9 },
];

export const GOALS = [
  { k: "maintain", label: "Maintain Weight", deficit: 0, macro: { p: 0.30, c: 0.40, f: 0.30 } },
  { k: "cut", label: "Fat Loss (Cut)", deficit: -0.20, macro: { p: 0.35, c: 0.35, f: 0.30 } },
  { k: "leanbulk", label: "Muscle Gain (Bulk)", deficit: 0.10, macro: { p: 0.28, c: 0.47, f: 0.25 } },
];

export function calcBMI({ heightCm, weightKg }) {
  if (!heightCm || !weightKg) return null;
  return weightKg / ((heightCm / 100) ** 2);
}

export function bmiCategory(bmi) {
  if (bmi < 18.5) return { label: "Underweight", color: "bg-blue-50 text-blue-700" };
  if (bmi < 25) return { label: "Normal", color: "bg-green-50 text-green-700" };
  if (bmi < 30) return { label: "Overweight", color: "bg-amber-50 text-amber-700" };
  return { label: "Obese", color: "bg-red-50 text-red-700" };
}

export function calcBMR({ sex, age, heightCm, weightKg }) {
  if (!age || !heightCm || !weightKg) return null;
  const s = sex === "male" ? 5 : -161;
  return (10 * weightKg) + (6.25 * heightCm) - (5 * age) + s;
}

export function calcTDEE({ bmr, activityKey }) {
  if (!bmr) return null;
  const mult = ACTIVITY.find(a => a.k === activityKey)?.mult ?? 1.2;
  return bmr * mult;
}

export function calcGoalCalories({ tdee, goalKey, customAdjPct }) {
  if (!tdee) return null;
  const baseAdj = GOALS.find(g => g.k === goalKey)?.deficit ?? 0;
  const adj = typeof customAdjPct === "number" ? customAdjPct : baseAdj;
  return tdee * (1 + adj);
}

export function calcMacros({ calories, weightKg, macroPct, proteinMode }) {
  if (!calories) return null;
  let proteinG;
  if (proteinMode === "gkg") {
    const gPerKg = clamp((macroPct?.gPerKg ?? 1.8), 1.2, 2.6);
    proteinG = weightKg ? (weightKg * gPerKg) : null;
  } else {
    proteinG = (calories * (macroPct.p ?? 0.30)) / 4;
  }
  const fatG = (calories * (macroPct.f ?? 0.30)) / 9;
  let carbsG;
  if (proteinMode === "gkg" && proteinG) {
    const proteinCals = proteinG * 4;
    const fatCals = fatG * 9;
    const remaining = Math.max(0, calories - proteinCals - fatCals);
    carbsG = remaining / 4;
  } else {
    carbsG = (calories * (macroPct.c ?? 0.40)) / 4;
  }
  return { proteinG, carbsG, fatG };
}

export function estimateTimelineWeeks({ weeklyDeficitKcal, poundsToLose }) {
  if (!weeklyDeficitKcal || !poundsToLose) return null;
  return (poundsToLose * 3500) / weeklyDeficitKcal;
}
