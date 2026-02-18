import { useCallback, useEffect, useRef, useState } from "react";

export function useAnimatedValue(target, duration = 600) {
  const [display, setDisplay] = useState(() => target ?? 0);
  const rafRef = useRef(null);
  const fromRef = useRef(target ?? 0);

  const animate = useCallback((from, to) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const delta = to - from;
    if (Math.abs(delta) < 0.01) {
      setDisplay(to);
      fromRef.current = to;
      return;
    }

    const start = performance.now();
    const step = (now) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = from + delta * eased;
      setDisplay(current);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        fromRef.current = to;
      }
    };

    rafRef.current = requestAnimationFrame(step);
  }, [duration]);

  useEffect(() => {
    const to = target ?? 0;
    animate(fromRef.current, to);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, animate]);

  return display;
}
