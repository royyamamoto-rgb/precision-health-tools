import StatCard from "../ui/StatCard";

export default function QuickResults({ bmi, bmiCat, bmr, tdee, goalCalories }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <StatCard
        label="BMI"
        value={bmi}
        decimals={1}
        badge={bmiCat}
        color="text-primary"
        delay={0}
      />
      <StatCard
        label="BMR"
        value={bmr}
        unit="kcal/day"
        color="text-secondary"
        delay={60}
      />
      <StatCard
        label="TDEE"
        value={tdee}
        unit="kcal/day"
        color="text-calories"
        delay={120}
      />
      <StatCard
        label="Goal"
        value={goalCalories}
        unit="kcal/day"
        color="text-heart"
        delay={180}
      />
    </div>
  );
}
