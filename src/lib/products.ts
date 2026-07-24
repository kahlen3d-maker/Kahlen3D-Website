/**
 * Produktkatalog des Shops.
 *
 * PRODUKT HINZUFÜGEN:
 *  1. Bild in "public/products/" legen (z. B. "public/products/vase.jpg")
 *  2. Hier unten einen Eintrag ergänzen.
 *
 * type: "physical" = gedrucktes Produkt (mit Versand)
 *       "digital"  = STL-Datei zum Download (nach Kauf per Link geliefert)
 * Für "digital": "file" = Pfad der STL im Blob-Speicher (später hochladen).
 * Preise in Euro (brutto). Als Kleinunternehmer (§ 19 UStG) ohne USt-Ausweis.
 */

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number; // in Euro
  image: string;
  type: "physical" | "digital";
  file?: string; // nur digital: Pfad im Blob-Speicher
};

const u = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

// Beispielprodukte (Platzhalterbilder) – einfach ersetzen/ergänzen.
export const products: Product[] = [
  {
    id: "druck-beispiel-1",
    name: "3D-Druck Beispielprodukt",
    description:
      "Hochwertig gedrucktes Bauteil aus technischem Kunststoff. Präzise gefertigt, sofort einsatzbereit.",
    price: 24.9,
    image: u("1611117775350-ac3950990985"),
    type: "physical",
  },
  {
    id: "druck-beispiel-2",
    name: "Prototyp / Kleinserie",
    description:
      "Beispiel für ein gedrucktes Funktionsteil. Robust, maßhaltig, in verschiedenen Farben möglich.",
    price: 14.9,
    image: u("1638959492386-f9a68d55c374"),
    type: "physical",
  },
  {
    id: "stl-beispiel-1",
    name: "STL-Datei: Beispielmodell",
    description:
      "Digitale 3D-Datei (STL) zum Selberdrucken. Sofortiger Download nach dem Kauf.",
    price: 5.9,
    image: u("1563520239648-a24e51d4b570"),
    type: "digital",
    file: "shop/beispielmodell.stl",
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const formatPrice = (euro: number) =>
  euro.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
