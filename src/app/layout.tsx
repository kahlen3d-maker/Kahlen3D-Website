import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/lib/i18n";
import { CartProvider } from "@/components/shop/CartProvider";
import { CartDrawer } from "@/components/shop/CartDrawer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kahlen3d.de"),
  title: {
    default: "Kahlen3D – 3D-Druck & Engineering",
    template: "%s · Kahlen3D",
  },
  description:
    "Präzise Lösungen für Prototypen, Kleinserien und technische Bauteile – gefertigt mit modernstem 3D-Druck. FDM & Resin 3D-Druck, 3D-Scanning, CAD-Konstruktion und Reverse Engineering.",
  keywords: [
    "3D-Druck",
    "3D-Scanning",
    "Additive Fertigung",
    "FDM",
    "Resin",
    "Prototypen",
    "Kleinserien",
    "CAD-Konstruktion",
    "Reverse Engineering",
    "Engineering",
    "Kahlen3D",
    "Nordrhein-Westfalen",
  ],
  authors: [{ name: "Kahlen3D" }],
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    title: "Kahlen3D – 3D-Druck & Engineering",
    description:
      "Präzise Lösungen für Prototypen, Kleinserien und technische Bauteile – gefertigt mit modernstem 3D-Druck.",
    siteName: "Kahlen3D",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#141414" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Verhindert ein Aufblitzen des falschen Themes (FOUC) vor der Hydration.
const themeScript = `(function(){try{var s=localStorage.getItem('kahlen3d-theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var d=s?s==='dark':m;var e=document.documentElement;e.classList.toggle('dark',d);e.style.colorScheme=d?'dark':'light';var l=localStorage.getItem('kahlen3d-locale');if(l==='de'||l==='en')e.lang=l;}catch(_){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning className={`${inter.variable} ${manrope.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-white font-sans text-graphite-700 antialiased dark:bg-graphite-950 dark:text-graphite-200">
        <ThemeProvider>
          <LanguageProvider>
            <CartProvider>
              {children}
              <CartDrawer />
            </CartProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
