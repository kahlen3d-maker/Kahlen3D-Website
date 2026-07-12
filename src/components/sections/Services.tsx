"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Boxes,
  ChevronDown,
  Droplets,
  Layers,
  PencilRuler,
  Repeat,
  ScanLine,
  ScanSearch,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useI18n } from "@/lib/i18n";

// Auf dem Handy zunächst nur so viele Karten zeigen, der Rest per Button.
const MOBILE_INITIAL = 4;

const icons: LucideIcon[] = [
  Layers, // FDM
  Droplets, // Resin
  Boxes, // Prototypen
  Repeat, // Kleinserien
  PencilRuler, // CAD
  ScanLine, // Reverse Engineering
  ScanSearch, // 3D-Scanning
];

export function Services() {
  const { t } = useI18n();
  const [showAll, setShowAll] = useState(false);
  const hasMore = t.services.items.length > MOBILE_INITIAL;

  return (
    <section id="leistungen" className="scroll-mt-24 bg-graphite-50/60 py-24 dark:bg-graphite-950 lg:py-32">
      <div className="mx-auto max-w-wide px-5 sm:px-8">
        <SectionHeading badge={t.services.badge} title={t.services.title} subtitle={t.services.subtitle} />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {t.services.items.map((service, i) => {
            const Icon = icons[i] ?? Layers;
            // Ab der 5. Karte auf dem Handy zunächst ausblenden (Desktop zeigt immer alle).
            const hiddenOnMobile = i >= MOBILE_INITIAL && !showAll;
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className={`group relative ${
                  hiddenOnMobile ? "hidden sm:flex" : "flex"
                } flex-col rounded-2xl border border-graphite-100 bg-white p-5 shadow-soft transition-shadow duration-300 hover:shadow-card dark:border-white/10 dark:bg-graphite-900 sm:p-7`}
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-500 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white dark:bg-brand-500/15 dark:text-brand-300 sm:mb-6 sm:h-12 sm:w-12">
                  <Icon size={22} strokeWidth={1.8} />
                </div>

                <h3 className="font-display text-lg font-semibold tracking-tight text-graphite-800 dark:text-white sm:text-xl">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-graphite-500 dark:text-graphite-300 sm:mt-3">
                  {service.text}
                </p>

                <span className="mt-4 hidden items-center gap-1.5 text-sm font-semibold text-brand-500 opacity-0 transition-all duration-300 group-hover:opacity-100 dark:text-brand-300 sm:mt-6 sm:inline-flex">
                  <ArrowUpRight size={16} />
                </span>

                {/* Akzentlinie unten */}
                <span className="absolute inset-x-5 bottom-0 h-0.5 origin-left scale-x-0 rounded-full bg-accent transition-transform duration-300 group-hover:scale-x-100 sm:inset-x-7" />
              </motion.article>
            );
          })}
        </div>

        {/* „Alle anzeigen" / „Weniger" – nur auf dem Handy */}
        {hasMore && (
          <div className="mt-8 flex justify-center sm:hidden">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full border border-graphite-200 bg-white px-6 py-3 text-sm font-semibold text-graphite-700 shadow-soft transition-colors hover:border-brand-300 hover:text-brand-500 dark:border-white/15 dark:bg-graphite-900 dark:text-graphite-100"
            >
              {showAll
                ? t.services.showLess
                : `${t.services.showAll} (+${t.services.items.length - MOBILE_INITIAL})`}
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
