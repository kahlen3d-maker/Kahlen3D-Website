"use client";

import { motion } from "framer-motion";
import {
  Boxes,
  Droplets,
  Layers,
  PencilRuler,
  Repeat,
  ScanLine,
  Settings2,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useI18n } from "@/lib/i18n";

const icons: LucideIcon[] = [
  Layers, // FDM
  Droplets, // Resin
  Boxes, // Prototypen
  Repeat, // Kleinserien
  PencilRuler, // CAD
  ScanLine, // Reverse Engineering
  Settings2, // Bauteiloptimierung
];

export function Services() {
  const { t } = useI18n();

  return (
    <section id="leistungen" className="scroll-mt-24 bg-graphite-50/60 py-24 dark:bg-graphite-950 lg:py-32">
      <div className="mx-auto max-w-wide px-5 sm:px-8">
        <SectionHeading badge={t.services.badge} title={t.services.title} subtitle={t.services.subtitle} />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((service, i) => {
            const Icon = icons[i] ?? Layers;
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col rounded-2xl border border-graphite-100 bg-white p-7 shadow-soft transition-shadow duration-300 hover:shadow-card dark:border-white/10 dark:bg-graphite-900"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white dark:bg-brand-500/15 dark:text-brand-300">
                  <Icon size={22} strokeWidth={1.8} />
                </div>

                <h3 className="font-display text-xl font-semibold tracking-tight text-graphite-800 dark:text-white">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-graphite-500 dark:text-graphite-300">
                  {service.text}
                </p>

                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-500 opacity-0 transition-all duration-300 group-hover:opacity-100 dark:text-brand-300">
                  <ArrowUpRight size={16} />
                </span>

                {/* Akzentlinie unten */}
                <span className="absolute inset-x-7 bottom-0 h-0.5 origin-left scale-x-0 rounded-full bg-accent transition-transform duration-300 group-hover:scale-x-100" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
