"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { useI18n } from "@/lib/i18n";
import { siteImages } from "@/lib/site";

export function CTABand() {
  const { t } = useI18n();

  return (
    <section className="bg-graphite-50/60 px-5 pb-24 dark:bg-graphite-950 sm:px-8 lg:pb-32">
      <div className="mx-auto max-w-wide">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl bg-graphite-900 px-8 py-16 shadow-card sm:px-14 sm:py-20">
            <div className="absolute inset-0 -z-10">
              <Image src={siteImages.cta} alt="" fill sizes="100vw" className="object-cover opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-r from-graphite-950 via-graphite-900/95 to-graphite-900/70" />
              <div className="tech-grid absolute inset-0 opacity-[0.1]" />
            </div>

            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-bold tracking-tightest text-white sm:text-4xl">
                {t.ctaBand.title}
              </h2>
              <p className="mt-4 text-lg text-graphite-200">{t.contact.subtitle}</p>
              <a
                href="#kontakt"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-graphite-900 shadow-card transition-all hover:bg-accent-400"
              >
                {t.hero.ctaPrimary}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
