import { useEffect, useRef } from "react";
import AnimatedNumber from "./AnimatedNumber";

const SIZE = 88;
const STROKE = 7;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function MacroRing({ label, grams, color, percentage }) {
  const circleRef = useRef(null);

  useEffect(() => {
    if (!circleRef.current) return;
    const offset = CIRCUMFERENCE - (CIRCUMFERENCE * (percentage ?? 0)) / 100;
    circleRef.current.style.strokeDashoffset = offset;
  }, [percentage]);

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} className="-rotate-90">
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="#e8eaed"
            strokeWidth={STROKE}
          />
          <circle
            ref={circleRef}
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke={color}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE}
            className="macro-ring-progress"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <AnimatedNumber value={grams} className="text-base font-bold text-on-surface" />
          <span className="text-[10px] text-on-surface-muted">g</span>
        </div>
      </div>
      <div className="text-center">
        <div className="text-xs font-semibold text-on-surface">{label}</div>
        <div className="text-[10px] text-on-surface-muted">{percentage != null ? Math.round(percentage) : 0}%</div>
      </div>
    </div>
  );
}
