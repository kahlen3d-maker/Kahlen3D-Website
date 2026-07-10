/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Platzhalterbilder werden aktuell von Unsplash geladen und sind zentral
    // in src/lib/site.ts hinterlegt – dort einfach austauschbar.
    // "unoptimized" hält das Austauschen der Bilder (auch lokale Dateien) trivial.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
