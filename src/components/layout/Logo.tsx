"use client";

import Image from "next/image";

type LogoProps = {
  className?: string;
  /** Wird nicht mehr benötigt – das Logo hat einen transparenten Hintergrund
   *  und funktioniert auf hellem wie dunklem Grund. Bleibt für Kompatibilität. */
  onDark?: boolean;
  /** "lockup" = Navigationsgröße. "stacked" = größere Darstellung. */
  variant?: "lockup" | "stacked";
};

/**
 * Original Kahlen3D-Logo.
 * Quelldatei: public/kahlen3d-logo.png (transparentes PNG, 512×512).
 * Austauschen: einfach diese Datei in /public ersetzen.
 */
export function Logo({ className = "", variant = "lockup" }: LogoProps) {
  const sizeClass = variant === "stacked" ? "h-20 sm:h-24" : "h-11 sm:h-12";

  return (
    <span className={`inline-flex items-center ${className}`}>
      <Image
        src="/kahlen3d-logo.png"
        alt="Kahlen3D – 3D-Druck und Engineering"
        width={512}
        height={512}
        priority
        className={`${sizeClass} w-auto`}
      />
    </span>
  );
}
