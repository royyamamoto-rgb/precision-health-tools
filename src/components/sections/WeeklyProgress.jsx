import AnimatedNumber from "../ui/AnimatedNumber";
import GlassCard from "../ui/GlassCard";

export default function WeeklyProgress({ weeklyDelta }) {
  if (weeklyDelta == null) return null;

  const isDeficit = weeklyDelta > 0;

  return (
    <div className="animate-card-enter" style={{ animationDelay: "300ms" }}>
      <GlassCard>
        <h2 className="mb-4 text-base font-semibold text-on-surface">Weekly Progress</h2>
        <div className="rounded-xl bg-surface-dim p-4">
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-medium text-on-surface-muted">
              Weekly {isDeficit ? "Deficit" : "Surplus"}
            </span>
            <div>
              <AnimatedNumber
                value={Math.abs(weeklyDelta)}
                className="text-xl font-bold text-on-surface"
              />
              <span className="ml-1 text-xs text-on-surface-muted">kcal</span>
            </div>
          </div>
          {isDeficit && (
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-container-high">
              <div
                className="h-full rounded-full bg-secondary transition-all duration-700"
                style={{ width: `${Math.min((weeklyDelta / 7000) * 100, 100)}%` }}
              />
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
