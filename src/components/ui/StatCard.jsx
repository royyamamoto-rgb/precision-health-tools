import AnimatedNumber from "./AnimatedNumber";

export default function StatCard({ label, value, unit, badge, color = "text-primary", decimals = 0, delay = 0 }) {
  return (
    <div className="animate-card-enter" style={{ animationDelay: `${delay}ms` }}>
      <div className="m3-card p-5">
        <div className="text-xs font-medium uppercase tracking-wide text-on-surface-muted">{label}</div>
        <div className="mt-1.5">
          <AnimatedNumber
            value={value}
            decimals={decimals}
            className={`text-2xl font-bold ${color}`}
          />
        </div>
        {unit && <div className="mt-0.5 text-xs text-on-surface-muted">{unit}</div>}
        {badge && (
          <span className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.color}`}>
            {badge.label}
          </span>
        )}
      </div>
    </div>
  );
}
