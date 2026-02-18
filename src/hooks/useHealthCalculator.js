import { useMemo, useState } from "react";
import {
  calcBMI, bmiCategory, calcBMR, calcTDEE,
  calcGoalCalories, calcMacros, estimateTimelineWeeks, GOALS,
} from "../lib/calculators";

export function useHealthCalculator() {
  const [sex, setSex] = useState("male");
  const [age, setAge] = useState(30);
  const [heightCm, setHeightCm] = useState(175);
  const [weightKg, setWeightKg] = useState(75);
  const [activityKey, setActivityKey] = useState("moderate");
  const [goalKey, setGoalKey] = useState("cut");
  const [useCustomAdj, setUseCustomAdj] = useState(false);
  const [customAdjPct, setCustomAdjPct] = useState(-0.20);
  const [proteinMode, setProteinMode] = useState("gkg");
  const [gPerKg, setGPerKg] = useState(1.8);
  const [timelinePounds, setTimelinePounds] = useState(10);

  const adjPct = useCustomAdj ? customAdjPct : undefined;

  const bmr = useMemo(() => calcBMR({ sex, age, heightCm, weightKg }), [sex, age, heightCm, weightKg]);
  const tdee = useMemo(() => calcTDEE({ bmr, activityKey }), [bmr, activityKey]);
  const goalCalories = useMemo(() => calcGoalCalories({ tdee, goalKey, customAdjPct: adjPct }), [tdee, goalKey, adjPct]);
  const bmi = useMemo(() => calcBMI({ heightCm, weightKg }), [heightCm, weightKg]);
  const bmiCat = useMemo(() => bmi ? bmiCategory(bmi) : null, [bmi]);
  const macroPreset = useMemo(() => GOALS.find(x => x.k === goalKey)?.macro ?? GOALS[0].macro, [goalKey]);
  const macros = useMemo(
    () => calcMacros({ calories: goalCalories, weightKg, macroPct: { ...macroPreset, gPerKg }, proteinMode }),
    [goalCalories, weightKg, macroPreset, proteinMode, gPerKg]
  );
  const weeklyDelta = useMemo(() => {
    if (!tdee || !goalCalories) return null;
    return (tdee - goalCalories) * 7;
  }, [tdee, goalCalories]);
  const weeks = useMemo(() => {
    if (!weeklyDelta || weeklyDelta <= 0) return null;
    return estimateTimelineWeeks({ weeklyDeficitKcal: weeklyDelta, poundsToLose: timelinePounds });
  }, [weeklyDelta, timelinePounds]);

  return {
    sex, setSex, age, setAge, heightCm, setHeightCm, weightKg, setWeightKg,
    activityKey, setActivityKey, goalKey, setGoalKey,
    useCustomAdj, setUseCustomAdj, customAdjPct, setCustomAdjPct,
    proteinMode, setProteinMode, gPerKg, setGPerKg,
    timelinePounds, setTimelinePounds,
    bmi, bmiCat, bmr, tdee, goalCalories, macros, weeklyDelta, weeks,
  };
}
