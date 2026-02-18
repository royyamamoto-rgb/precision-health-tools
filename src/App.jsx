import { useMemo, useState } from "react";

function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }
function round(n, d=0) { const p = 10**d; return Math.round(n*p)/p; }

function calcBMI({ heightCm, weightKg }) {
  if (!heightCm || !weightKg) return null;
  return weightKg / ((heightCm / 100) ** 2);
}

function bmiCategory(bmi) {
  if (bmi < 18.5) return { label: "Underweight", color: "bg-blue-100 text-blue-800" };
  if (bmi < 25) return { label: "Normal", color: "bg-green-100 text-green-800" };
  if (bmi < 30) return { label: "Overweight", color: "bg-yellow-100 text-yellow-800" };
  return { label: "Obese", color: "bg-red-100 text-red-800" };
}

function calcBMR({ sex, age, heightCm, weightKg }) {
  if (!age || !heightCm || !weightKg) return null;
  const s = sex === "male" ? 5 : -161;
  return (10*weightKg) + (6.25*heightCm) - (5*age) + s;
}

const ACTIVITY = [
  { k: "sedentary", label: "Sedentary (little/no exercise)", mult: 1.2 },
  { k: "light", label: "Light (1-3 days/week)", mult: 1.375 },
  { k: "moderate", label: "Moderate (3-5 days/week)", mult: 1.55 },
  { k: "active", label: "Active (6-7 days/week)", mult: 1.725 },
  { k: "very", label: "Very Active (hard training)", mult: 1.9 },
];

const GOALS = [
  { k: "maintain", label: "Maintain Weight", deficit: 0, macro: { p: 0.30, c: 0.40, f: 0.30 } },
  { k: "cut", label: "Fat Loss (Cut)", deficit: -0.20, macro: { p: 0.35, c: 0.35, f: 0.30 } },
  { k: "leanbulk", label: "Muscle Gain (Bulk)", deficit: 0.10, macro: { p: 0.28, c: 0.47, f: 0.25 } },
];

function calcTDEE({ bmr, activityKey }) {
  if (!bmr) return null;
  const mult = ACTIVITY.find(a => a.k === activityKey)?.mult ?? 1.2;
  return bmr * mult;
}

function calcGoalCalories({ tdee, goalKey, customAdjPct }) {
  if (!tdee) return null;
  const baseAdj = GOALS.find(g => g.k === goalKey)?.deficit ?? 0;
  const adj = typeof customAdjPct === "number" ? customAdjPct : baseAdj;
  return tdee * (1 + adj);
}

function calcMacros({ calories, weightKg, macroPct, proteinMode }) {
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

function estimateTimelineWeeks({ weeklyDeficitKcal, poundsToLose }) {
  if (!weeklyDeficitKcal || !poundsToLose) return null;
  return (poundsToLose * 3500) / weeklyDeficitKcal;
}

export default function App() {
  const [sex, setSex] = useState("male");
  const [age, setAge] = useState(30);
  const [heightCm, setHeightCm] = useState(175);
  const [weightKg, setWeightKg] = useState(75);
  const [activityKey, setActivityKey] = useState("moderate");
  const [goalKey, setGoalKey] = useState("cut");
  const [useCustomAdj, setUseCustomAdj] = useState(false);
  const [customAdjPct, setCustomAdjPct] = useState(-0.20);
  const adjPct = useCustomAdj ? customAdjPct : undefined;
  const [proteinMode, setProteinMode] = useState("gkg");
  const [gPerKg, setGPerKg] = useState(1.8);
  const [timelinePounds, setTimelinePounds] = useState(10);

  const bmr = useMemo(() => calcBMR({ sex, age, heightCm, weightKg }), [sex, age, heightCm, weightKg]);
  const tdee = useMemo(() => calcTDEE({ bmr, activityKey }), [bmr, activityKey]);
  const goalCalories = useMemo(() => calcGoalCalories({ tdee, goalKey, customAdjPct: adjPct }), [tdee, goalKey, adjPct]);
  const bmi = useMemo(() => calcBMI({ heightCm, weightKg }), [heightCm, weightKg]);
  const bmiCat = useMemo(() => bmi ? bmiCategory(bmi) : null, [bmi]);
  const macroPreset = useMemo(() => GOALS.find(x => x.k === goalKey)?.macro ?? GOALS[0].macro, [goalKey]);
  const macros = useMemo(() => calcMacros({ calories: goalCalories, weightKg, macroPct: { ...macroPreset, gPerKg }, proteinMode }), [goalCalories, weightKg, macroPreset, proteinMode, gPerKg]);
  const weeklyDelta = useMemo(() => {
    if (!tdee || !goalCalories) return null;
    return (tdee - goalCalories) * 7;
  }, [tdee, goalCalories]);
  const weeks = useMemo(() => {
    if (!weeklyDelta || weeklyDelta <= 0) return null;
    return estimateTimelineWeeks({ weeklyDeficitKcal: weeklyDelta, poundsToLose: timelinePounds });
  }, [weeklyDelta, timelinePounds]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-center text-4xl font-bold text-white">💪 Health Calculator</h1>
          <p className="mt-2 text-center text-indigo-100">Calculate your BMI, BMR, TDEE, Macros & Weight Loss Timeline</p>
        </div>
      </div>

      {/* Ad Space */}
      <div className="container mx-auto px-4 py-6">
        <div className="rounded-xl bg-gray-50 p-4 text-center">
          <ins className="adsbygoogle"
               style={{ display: 'block' }}
               data-ad-client="ca-pub-2599493016668494"
               data-ad-slot="1234567890"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Results */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-xl bg-white p-6 shadow-md">
            <div className="text-sm font-medium text-gray-600">BMI</div>
            <div className="mt-2 text-3xl font-bold text-indigo-600">{bmi ? round(bmi, 1) : "—"}</div>
            {bmiCat && (
              <span className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${bmiCat.color}`}>
                {bmiCat.label}
              </span>
            )}
          </div>

          <div className="rounded-xl bg-white p-6 shadow-md">
            <div className="text-sm font-medium text-gray-600">BMR</div>
            <div className="mt-2 text-3xl font-bold text-purple-600">{bmr ? Math.round(bmr) : "—"}</div>
            <div className="mt-1 text-xs text-gray-500">kcal/day</div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-md">
            <div className="text-sm font-medium text-gray-600">TDEE</div>
            <div className="mt-2 text-3xl font-bold text-pink-600">{tdee ? Math.round(tdee) : "—"}</div>
            <div className="mt-1 text-xs text-gray-500">kcal/day</div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-md">
            <div className="text-sm font-medium text-gray-600">Goal Calories</div>
            <div className="mt-2 text-3xl font-bold text-orange-600">{goalCalories ? Math.round(goalCalories) : "—"}</div>
            <div className="mt-1 text-xs text-gray-500">kcal/day</div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="rounded-xl bg-white p-6 shadow-md">
              <h2 className="mb-6 text-xl font-bold text-gray-800">📝 Your Information</h2>

              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Sex</label>
                    <select
                      value={sex}
                      onChange={(e) => setSex(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Age</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      min="10"
                      max="100"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Height (cm)</label>
                    <input
                      type="number"
                      value={heightCm}
                      onChange={(e) => setHeightCm(Number(e.target.value))}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      min="120"
                      max="230"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Weight (kg)</label>
                    <input
                      type="number"
                      value={weightKg}
                      onChange={(e) => setWeightKg(Number(e.target.value))}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      min="30"
                      max="250"
                      step="0.1"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Activity Level</label>
                  <select
                    value={activityKey}
                    onChange={(e) => setActivityKey(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  >
                    {ACTIVITY.map(a => (
                      <option key={a.k} value={a.k}>{a.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Goal</label>
                  <select
                    value={goalKey}
                    onChange={(e) => setGoalKey(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  >
                    {GOALS.map(g => (
                      <option key={g.k} value={g.k}>{g.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Protein Mode</label>
                  <select
                    value={proteinMode}
                    onChange={(e) => setProteinMode(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  >
                    <option value="gkg">Grams per kg (Recommended)</option>
                    <option value="pct">Percentage of calories</option>
                  </select>
                  {proteinMode === "gkg" && (
                    <div className="mt-2">
                      <input
                        type="number"
                        value={gPerKg}
                        onChange={(e) => setGPerKg(Number(e.target.value))}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        min="1.2"
                        max="2.6"
                        step="0.1"
                      />
                      <div className="mt-1 text-xs text-gray-500">Grams of protein per kg of body weight (1.2-2.6)</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Macros */}
            <div className="rounded-xl bg-white p-6 shadow-md">
              <h2 className="mb-6 text-xl font-bold text-gray-800">🍽️ Daily Macros</h2>
              {macros ? (
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-4 text-center">
                    <div className="text-sm font-medium text-blue-800">Protein</div>
                    <div className="mt-2 text-3xl font-bold text-blue-900">{Math.round(macros.proteinG)}</div>
                    <div className="text-xs text-blue-700">grams</div>
                  </div>
                  <div className="rounded-lg bg-gradient-to-br from-green-50 to-green-100 p-4 text-center">
                    <div className="text-sm font-medium text-green-800">Carbs</div>
                    <div className="mt-2 text-3xl font-bold text-green-900">{Math.round(macros.carbsG)}</div>
                    <div className="text-xs text-green-700">grams</div>
                  </div>
                  <div className="rounded-lg bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 text-center">
                    <div className="text-sm font-medium text-yellow-800">Fat</div>
                    <div className="mt-2 text-3xl font-bold text-yellow-900">{Math.round(macros.fatG)}</div>
                    <div className="text-xs text-yellow-700">grams</div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500">Enter your information to see results</div>
              )}
            </div>

            {/* Weekly Progress */}
            {weeklyDelta != null && (
              <div className="rounded-xl bg-white p-6 shadow-md">
                <h2 className="mb-4 text-xl font-bold text-gray-800">📊 Weekly Progress</h2>
                <div className="rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Weekly {weeklyDelta > 0 ? "Deficit" : "Surplus"}</span>
                    <span className="text-2xl font-bold text-purple-600">{Math.abs(Math.round(weeklyDelta))}</span>
                  </div>
                  <div className="mt-1 text-xs text-gray-600">kcal/week</div>
                </div>
              </div>
            )}

            {/* Timeline */}
            <div className="rounded-xl bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-bold text-gray-800">⏱️ Weight Loss Timeline</h2>
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-700">Target Weight Loss (pounds)</label>
                <input
                  type="number"
                  value={timelinePounds}
                  onChange={(e) => setTimelinePounds(Number(e.target.value))}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  min="1"
                  max="100"
                />
              </div>
              {weeks ? (
                <div className="rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 p-6 text-center">
                  <div className="text-sm font-medium text-gray-700">Estimated Time</div>
                  <div className="mt-2 text-5xl font-bold text-indigo-600">{round(weeks, 1)}</div>
                  <div className="mt-1 text-sm text-gray-600">weeks to lose {timelinePounds} lb</div>
                </div>
              ) : (
                <div className="rounded-lg bg-gray-50 p-4 text-center text-sm text-gray-600">
                  Timeline appears when you have a calorie deficit
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Ad Space */}
        <div className="my-8 rounded-xl bg-gray-50 p-4 text-center">
          <ins className="adsbygoogle"
               style={{ display: 'block' }}
               data-ad-client="ca-pub-2599493016668494"
               data-ad-slot="9876543210"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        </div>

        {/* Footer */}
        <div className="mt-8 rounded-xl bg-white p-6 text-center shadow-md">
          <p className="text-sm text-gray-600">
            ⚠️ <strong>Disclaimer:</strong> This tool provides estimates for informational purposes only.
            Not medical advice. Consult healthcare professionals before starting any diet or exercise program.
          </p>
          <p className="mt-2 text-xs text-gray-500">© 2026 Health Calculator • Powered by React + Vite + Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}
