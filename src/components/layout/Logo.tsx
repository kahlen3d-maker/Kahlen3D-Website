"use client";

type LogoProps = {
  className?: string;
  onDark?: boolean;
  /** "lockup" = Signet + Wortmarke nebeneinander (Nav). "stacked" = Signet über K3D / KAHLEN3D. */
  variant?: "lockup" | "stacked";
};

/**
 * K3D-Signet: 3D-Drucker-Extruder (grüne Gantry + gelbes Hotend/Düse).
 * Rein per SVG – scharf in jeder Größe und Dark-Mode-fähig.
 * Austausch gegen eine eigene Datei: dieses <svg> durch
 * <Image src="/logo.svg" ... /> ersetzen (Datei in /public ablegen).
 */
function ExtruderMark({ size = 30 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      {/* Gantry / X-Achse */}
      <rect x="8" y="18" width="84" height="10" rx="2" className="fill-brand-500" />
      {/* Hotend + Düse – gestufter Extruder wie im Kahlen3D-Logo */}
      <g className="fill-accent">
        <rect x="42" y="12" width="16" height="22" rx="2" />
        <rect x="33" y="34" width="34" height="24" rx="2.5" />
        <rect x="43" y="58" width="14" height="7" rx="1" />
        <path d="M42 65 H58 L51.5 78 V86 H48.5 V78 Z" />
      </g>
    </svg>
  );
}

export function Logo({ className = "", onDark = false, variant = "lockup" }: LogoProps) {
  const primary = onDark ? "text-white" : "text-graphite-800 dark:text-white";
  const accentText = "text-brand-500 dark:text-brand-300";

  if (variant === "stacked") {
    return (
      <span className={`inline-flex flex-col items-center gap-2 ${className}`}>
        <ExtruderMark size={44} />
        <span className={`font-display text-2xl font-extrabold leading-none ${accentText}`}>
          K3D
        </span>
        <span
          className={`text-[0.7rem] font-semibold tracking-[0.32em] ${
            onDark ? "text-graphite-400" : "text-graphite-400"
          }`}
        >
          KAHLEN3D
        </span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <ExtruderMark />
      <span className={`font-display text-lg font-bold tracking-tight ${primary}`}>
        Kahlen<span className={accentText}>3D</span>
      </span>
    </span>
  );
}
