import GlassCard from "../ui/GlassCard";
import MacroRing from "../ui/MacroRing";

export default function MacrosDisplay({ macros, goalCalories }) {
  if (!macros) {
    return (
      <div className="animate-card-enter" style={{ animationDelay: "200ms" }}>
        <GlassCard>
          <h2 className="mb-4 text-base font-semibold text-on-surface">Daily Macros</h2>
          <p className="py-6 text-center text-sm text-on-surface-muted">
            Enter your information to see results
          </p>
        </GlassCard>
      </div>
    );
  }

  const totalCals = goalCalories || 1;
  const proteinPct = ((macros.proteinG * 4) / totalCals) * 100;
  const carbsPct = ((macros.carbsG * 4) / totalCals) * 100;
  const fatPct = ((macros.fatG * 9) / totalCals) * 100;

  return (
    <div className="animate-card-enter" style={{ animationDelay: "200ms" }}>
      <GlassCard>
        <h2 className="mb-5 text-base font-semibold text-on-surface">Daily Macros</h2>
        <div className="flex items-start justify-around">
          <MacroRing label="Protein" grams={macros.proteinG} color="#5b8def" percentage={proteinPct} />
          <MacroRing label="Carbs" grams={macros.carbsG} color="#4ecdc4" percentage={carbsPct} />
          <MacroRing label="Fat" grams={macros.fatG} color="#ffb347" percentage={fatPct} />
        </div>
      </GlassCard>
    </div>
  );
}
