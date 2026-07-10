# Kahlen3D – Corporate Website

Hochwertige Unternehmenswebsite für **Kahlen3D** (Engineering & Additive Manufacturing).
Industrieller, zeitloser Look mit viel Weißraum – im Stil moderner Industrieunternehmen.

## Tech-Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (Corporate-Farbsystem, Dark Mode)
- **Framer Motion** (dezente Scroll-/Micro-Interaktionen)
- **Lucide Icons**
- Fonts: **Manrope** (Headlines) + **Inter** (Fließtext) via `next/font`

## Features

- Sticky-Navigation: transparent am Seitenanfang, danach weiß mit Schatten
- **Dark Mode** (Umschalter, System-Preference, ohne FOUC)
- **Sprachumschalter DE / EN** (komplette Übersetzung, in `localStorage` gespeichert)
- Animierte Kennzahlen (Count-Up), Fade-In beim Scrollen, Hover-Effekte
- SEO-Metadaten, responsive, performance-orientiert

## Entwicklung

```bash
npm install
npm run dev      # http://localhost:3000
```

Produktion:

```bash
npm run build && npm run start
```

## Inhalte anpassen

- **Texte / Übersetzungen:** `src/lib/i18n.tsx`
- **Bilder (Platzhalter):** `src/lib/site.ts` – URLs zentral gebündelt, einfach durch
  eigene Dateien ersetzen (z. B. `"/images/hero.jpg"` im `public/`-Ordner).
- **Kontaktdaten:** `src/lib/site.ts` (`siteConfig`)
- **Farben / Design-Tokens:** `tailwind.config.ts`

## Struktur

```
src/
├─ app/            layout.tsx · page.tsx · globals.css
├─ components/
│  ├─ layout/      Navbar · Footer · Logo
│  ├─ sections/    Hero · Stats · Services · Industries · About · CTABand · Contact
│  ├─ ui/          Reveal · AnimatedCounter · SectionHeading
│  └─ providers/   ThemeProvider
└─ lib/            i18n.tsx · site.ts
```

## Kontaktformular (E-Mail-Versand)

Das Formular sendet echte E-Mails über die API-Route `src/app/api/contact/route.ts`
(Nodemailer / SMTP). Einrichtung:

1. `.env.example` nach `.env.local` kopieren.
2. Gmail-**App-Passwort** erzeugen: Google-Konto → Sicherheit → Bestätigung in zwei
   Schritten aktivieren → „App-Passwörter" → 16-stelliges Passwort erstellen.
3. `SMTP_USER` (deine Gmail) und `SMTP_PASS` (das App-Passwort) eintragen, Dev-Server neu starten.

Ohne Zugangsdaten zeigt das Formular einen freundlichen Hinweis und verweist auf die
direkte E-Mail-Adresse (kein Absturz). Spam-Schutz per verstecktem Honeypot-Feld ist aktiv.

## Logo

Das K3D-Signet (3D-Drucker-Extruder) ist als **SVG** in `src/components/layout/Logo.tsx`
umgesetzt – scharf in jeder Größe, Dark-Mode-fähig. Zwei Varianten:
`<Logo />` (Signet + Wortmarke, Nav) und `<Logo variant="stacked" />` (Signet über
K3D / KAHLEN3D). Eigene Datei stattdessen nutzen: `logo.svg` in `public/` ablegen und
das `<svg>` in `Logo.tsx` durch `<Image src="/logo.svg" … />` ersetzen.

## Hinweise

- Die Branchen-Sektion nennt geeignete **Einsatzfelder** – keine bestehenden Referenzen.
- Bilder sind Platzhalter (Unsplash) und leicht austauschbar (`src/lib/site.ts`).
