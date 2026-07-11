# Galerie-Bilder

Eigene Fotos (z. B. von gedruckten Bauteilen) einfach **hier hineinlegen**,
z. B. `mein-bauteil.jpg`.

Danach in `src/lib/site.ts` unter `galleryImages` eine Zeile ergänzen:

```ts
{ src: "/gallery/mein-bauteil.jpg", caption: "Beschreibung" },
```

Das Bild erscheint dann automatisch in der Galerie auf der Website.

Tipp: Bilder vorher auf ca. 1200 px Breite verkleinern (schnellere Ladezeit).
