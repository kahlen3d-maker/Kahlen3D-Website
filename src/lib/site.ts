/**
 * Zentrale Konfiguration – Bilder & Stammdaten.
 *
 * Alle Platzhalterbilder sind hier gebündelt und lassen sich später
 * mühelos austauschen: einfach die URL ersetzen (z. B. durch eine lokale
 * Datei "/images/hero.jpg" im /public-Verzeichnis).
 */

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const siteImages = {
  // Additive-Fertigungs-Maschine (Landscape) – Hero-Hintergrund
  hero: u("1642969164999-979483e21601"),
  // Arbeit am 3D-Drucker (Portrait) – Sektion „Über uns"
  about: u("1549563316-5384a923453e", 1200),
  // Industrielle Fertigung (Landscape) – CTA-Band (dezent, 30 % Deckkraft)
  cta: u("1606206873764-fd15e242df52"),
} as const;

export const siteConfig = {
  name: "Kahlen3D",
  domain: "kahlen3d.de",
  email: "kahlen3d@gmail.com",
  phone: "0176 26797387",
  location: "Deutschland",
  foundedYear: 2024,
} as const;
