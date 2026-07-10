"use client";

import { motion } from "framer-motion";
import {
  Cog,
  Car,
  HeartPulse,
  Plane,
  Rocket,
  Factory,
  User,
  Info,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { useI18n } from "@/lib/i18n";

const icons: LucideIcon[] = [Cog, Car, HeartPulse, Plane, Rocket, Factory, User];

export function Industries() {
  const { t } = useI18n();

  return (
    <section id="branchen" className="scroll-mt-24 bg-white py-24 dark:bg-graphite-900 lg:py-32">
      <div className="mx-auto max-w-wide px-5 sm:px-8">
        <SectionHeading
          badge={t.industries.badge}
          title={t.industries.title}
          subtitle={t.industries.subtitle}
        />

        <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {t.industries.items.map((industry, i) => {
            const Icon = icons[i] ?? Factory;
            return (
              <motion.div
                key={industry}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.55, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col items-start gap-2.5 rounded-2xl border border-graphite-100 bg-graphite-50/50 p-4 transition-colors duration-300 hover:border-brand-200 hover:bg-white dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-brand-500/40 dark:hover:bg-white/[0.06] sm:flex-row sm:items-center sm:gap-4 sm:p-5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-graphite-500 shadow-soft transition-colors duration-300 group-hover:text-brand-500 dark:bg-graphite-800 dark:text-graphite-300 dark:group-hover:text-brand-300 sm:h-11 sm:w-11">
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <span className="w-full min-w-0 hyphens-auto break-words font-display text-sm font-semibold leading-tight text-graphite-700 dark:text-graphite-100 sm:w-auto sm:text-[0.95rem]">
                  {industry}
                </span>
              </motion.div>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 flex items-start gap-2.5 rounded-xl border border-graphite-100 bg-graphite-50/60 px-5 py-4 text-sm text-graphite-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-graphite-400">
            <Info size={17} className="mt-0.5 shrink-0 text-accent-600 dark:text-accent" />
            {t.industries.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
