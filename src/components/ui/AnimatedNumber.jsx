import { useAnimatedValue } from "../../hooks/useAnimatedValue";

export default function AnimatedNumber({ value, decimals = 0, className = "" }) {
  const display = useAnimatedValue(value);
  const formatted = value != null
    ? (decimals > 0 ? display.toFixed(decimals) : Math.round(display))
    : "\u2014";
  return <span className={className}>{formatted}</span>;
}
