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

/**
 * Galerie / Referenzen.
 *
 * BILDER HINZUFÜGEN – so einfach geht's:
 *  1. Eigenes Foto (z. B. von einem gedruckten Bauteil) in den Ordner
 *     "public/gallery/" legen, z. B. "public/gallery/mein-bauteil.jpg".
 *  2. Hier unten eine Zeile ergänzen:
 *     { src: "/gallery/mein-bauteil.jpg", caption: "Beschreibung" },
 *  Fertig – das Bild erscheint automatisch in der Galerie.
 *
 * Die folgenden Einträge sind Platzhalter (Unsplash) und können ersetzt werden.
 */
export const galleryImages = [
  { src: u("1611117775350-ac3950990985", 800), caption: "3D-Druck im Betrieb" },
  { src: u("1702863361902-93c51bfbd923", 800), caption: "Prototyp" },
  { src: u("1638959492386-f9a68d55c374", 800), caption: "Präzisionsbauteil" },
  { src: u("1563520239648-a24e51d4b570", 800), caption: "Konstruktion & Druck" },
  { src: u("1532186773960-85649e5cb70b", 800), caption: "Industrielle Fertigung" },
  { src: u("1611505982706-9ebc79e5d3f1", 800), caption: "Detailaufnahme" },
] as const;

export const siteConfig = {
  name: "Kahlen3D",
  domain: "kahlen3d.de",
  email: "kahlen3d@gmail.com",
  phone: "0176 26797387",
  location: "Deutschland, Nordrhein-Westfalen",
  foundedYear: 2024,
} as const;
