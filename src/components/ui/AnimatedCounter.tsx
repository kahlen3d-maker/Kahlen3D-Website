"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type AnimatedCounterProps = {
  value: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
};

/** Zählt eine Zahl dezent hoch, sobald sie in den Viewport kommt. */
export function AnimatedCounter({
  value,
  decimals = 0,
  suffix = "",
  duration = 1600,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;

    // Startet die Zähl-Animation genau einmal.
    const run = () => {
      if (started.current) return;
      started.current = true;

      if (reduce) {
        setDisplay(value);
        return;
      }

      let start: number | null = null;
      const step = (ts: number) => {
        if (start === null) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        // easeOutExpo für ein natürliches Auslaufen
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setDisplay(value * eased);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if (inView) {
      run();
      return;
    }

    // Sicherheitsnetz: Falls der Sichtbarkeits-Auslöser (z. B. auf manchen Handys)
    // nicht greift, wird der Zielwert nach kurzer Zeit direkt gesetzt (ohne
    // Animation) – so bleibt die Zahl garantiert nie auf 0 stehen.
    const t = setTimeout(() => {
      if (!started.current) {
        started.current = true;
        setDisplay(value);
      }
    }, 2200);
    return () => clearTimeout(t);
  }, [inView, value, duration, reduce]);

  const formatted = display.toLocaleString("de-DE", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref}>
      {formatted}
      {suffix}
    </span>
  );
}
