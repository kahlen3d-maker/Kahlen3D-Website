"use client";

import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  badge,
  title,
  subtitle,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <Reveal className={`flex flex-col ${alignment} max-w-2xl ${className}`}>
      {badge && (
        <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-500 dark:text-brand-300">
          <span className="h-px w-8 bg-accent" />
          {badge}
        </span>
      )}
      <h2 className="font-display text-3xl font-semibold tracking-tightest text-graphite-800 dark:text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.08]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-base leading-relaxed text-graphite-500 dark:text-graphite-300 sm:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
