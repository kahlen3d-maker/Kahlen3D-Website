"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Target, Lightbulb, ShieldCheck, Gem } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { useI18n } from "@/lib/i18n";
import { siteImages } from "@/lib/site";

const valueIcons = [Target, Lightbulb, Gem, ShieldCheck];

export function About() {
  const { t } = useI18n();

  return (
    <section id="ueber-uns" className="scroll-mt-24 bg-graphite-50/60 py-24 dark:bg-graphite-950 lg:py-32">
      <div className="mx-auto max-w-wide px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Bild */}
          <Reveal y={28} className="order-last lg:order-first">
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-card sm:aspect-[4/3] lg:aspect-[4/5]">
                <Image
                  src={siteImages.about}
                  alt="Engineering und technische Konstruktion bei Kahlen3D"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite-950/40 to-transparent" />
              </div>
              {/* Akzent-Karte */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="absolute -bottom-6 -right-4 hidden rounded-2xl border border-graphite-100 bg-white px-6 py-5 shadow-card dark:border-white/10 dark:bg-graphite-900 sm:block"
              >
                <div className="font-display text-3xl font-bold text-brand-500 dark:text-brand-300">
                  {t.about.badge.includes("About") ? "Est." : "Seit"} 2024
                </div>
                <p className="mt-1 text-xs uppercase tracking-wide text-graphite-400">
                  3D-Druck &amp; Engineering
                </p>
              </motion.div>
            </div>
          </Reveal>

          {/* Text */}
          <div>
            <SectionHeading badge={t.about.badge} title={t.about.title} />
            <div className="mt-6 space-y-4">
              {t.about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className="text-base leading-relaxed text-graphite-500 dark:text-graphite-300 sm:text-lg">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {t.about.values.map((value, i) => {
                const Icon = valueIcons[i] ?? CheckCircle2;
                return (
                  <Reveal key={value.title} delay={i * 0.07}>
                    <div className="flex gap-3.5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-300">
                        <Icon size={18} strokeWidth={1.9} />
                      </span>
                      <div>
                        <h4 className="font-display font-semibold text-graphite-800 dark:text-white">
                          {value.title}
                        </h4>
                        <p className="mt-1 text-sm leading-snug text-graphite-500 dark:text-graphite-400">
                          {value.text}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
