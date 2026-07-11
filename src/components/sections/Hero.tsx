"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { siteImages } from "@/lib/site";

export function Hero() {
  const { t } = useI18n();
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="start" className="relative isolate overflow-hidden bg-graphite-900">
      {/* Hintergrundbild */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={siteImages.hero}
          alt="Industrieller 3D-Druck"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-graphite-950/95 via-graphite-900/85 to-graphite-900/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite-950/80 via-transparent to-graphite-950/30" />
        {/* Technisches Raster */}
        <div className="tech-grid absolute inset-0 opacity-[0.12]" />
      </div>

      <div className="mx-auto flex min-h-[100svh] max-w-wide flex-col justify-center px-5 pb-20 pt-32 sm:px-8">
        <motion.div variants={container} initial="hidden" animate="visible" className="max-w-4xl">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-graphite-100 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {t.hero.badge}
          </motion.span>

          <h1 className="mt-7 font-display text-4xl font-bold leading-[1.05] tracking-tightest text-white sm:text-6xl lg:text-7xl">
            <motion.span variants={item} className="block">
              {t.hero.titleLine1}
            </motion.span>
            <motion.span variants={item} className="block text-brand-300">
              {t.hero.titleLine2}
            </motion.span>
          </h1>

          <motion.p
            variants={item}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-graphite-200 sm:text-xl"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#kontakt"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 text-base font-semibold text-white shadow-card transition-all hover:bg-brand-600 hover:shadow-[0_16px_50px_rgba(47,125,74,0.35)]"
            >
              {t.hero.ctaPrimary}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#leistungen"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-white/10"
            >
              {t.hero.ctaSecondary}
            </a>
          </motion.div>
        </motion.div>

        <motion.a
          href="#leistungen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-16 inline-flex items-center gap-2 self-start text-xs font-medium uppercase tracking-[0.16em] text-graphite-300 transition-colors hover:text-white"
        >
          <ArrowDown size={16} className="animate-bounce" />
          {t.hero.scroll}
        </motion.a>
      </div>
    </section>
  );
}
