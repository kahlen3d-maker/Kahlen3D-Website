"use client";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Reveal } from "@/components/ui/Reveal";
import { useI18n } from "@/lib/i18n";

export function Stats() {
  const { t } = useI18n();

  return (
    <section className="relative border-b border-graphite-100 bg-white dark:border-white/10 dark:bg-graphite-900">
      <div className="mx-auto max-w-wide px-5 py-20 sm:px-8 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-graphite-800 dark:text-white sm:text-3xl">
              {t.stats.title}
            </h2>
            <p className="mt-4 max-w-md text-graphite-500 dark:text-graphite-300">
              {t.stats.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {t.stats.items.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <div className="border-l-2 border-accent pl-4">
                  <div className="font-display text-3xl font-bold tracking-tight text-graphite-800 dark:text-white sm:text-4xl">
                    <AnimatedCounter
                      value={stat.value}
                      decimals={stat.decimals}
                      suffix={stat.suffix}
                    />
                  </div>
                  <p className="mt-2 text-sm leading-snug text-graphite-500 dark:text-graphite-400">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
