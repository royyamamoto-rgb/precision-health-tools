import AnimatedNumber from "../ui/AnimatedNumber";
import GlassCard from "../ui/GlassCard";
import InputField from "../ui/InputField";

export default function WeightTimeline({ weeks, timelinePounds, setTimelinePounds }) {
  return (
    <div className="animate-card-enter" style={{ animationDelay: "400ms" }}>
      <GlassCard>
        <h2 className="mb-4 text-base font-semibold text-on-surface">Weight Loss Timeline</h2>
        <div className="mb-4">
          <InputField
            label="Target Weight Loss (pounds)"
            type="number"
            value={timelinePounds}
            onChange={e => setTimelinePounds(Number(e.target.value))}
            min="1"
            max="100"
          />
        </div>
        {weeks ? (
          <div className="rounded-xl bg-surface-dim p-6 text-center">
            <div className="text-xs font-medium uppercase tracking-wide text-on-surface-muted">
              Estimated Time
            </div>
            <AnimatedNumber
              value={weeks}
              decimals={1}
              className="mt-1 block text-4xl font-bold text-primary"
            />
            <div className="mt-1 text-sm text-on-surface-variant">
              weeks to lose {timelinePounds} lb
            </div>
          </div>
        ) : (
          <div className="rounded-xl bg-surface-dim p-4 text-center text-sm text-on-surface-muted">
            Timeline appears when you have a calorie deficit
          </div>
        )}
      </GlassCard>
    </div>
  );
}
