"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { Logo } from "./Logo";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useI18n } from "@/lib/i18n";

const links = [
  { id: "start", href: "#start" },
  { id: "services", href: "#leistungen" },
  { id: "industries", href: "#branchen" },
  { id: "about", href: "#ueber-uns" },
  { id: "contact", href: "#kontakt" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t, locale, setLocale } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "border-b border-graphite-100/80 bg-white/90 shadow-nav backdrop-blur-md dark:border-white/10 dark:bg-graphite-900/85"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-wide items-center justify-between px-5 sm:px-8">
        <a href="#start" className="relative z-10" aria-label="Kahlen3D – Start">
          <Logo />
        </a>

        {/* Desktop-Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-graphite-600 transition-colors hover:text-brand-500 dark:text-graphite-200 dark:hover:text-brand-300"
            >
              {t.nav[link.id]}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <LangSwitch locale={locale} setLocale={setLocale} />

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? t.theme.toLight : t.theme.toDark}
            className="flex h-9 w-9 items-center justify-center rounded-full text-graphite-600 transition-colors hover:bg-graphite-50 hover:text-graphite-900 dark:text-graphite-200 dark:hover:bg-white/10 dark:hover:text-white"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <a
            href="#kontakt"
            className="hidden rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:bg-brand-600 hover:shadow-card sm:inline-flex"
          >
            {t.nav.cta}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menü"
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-full text-graphite-700 transition-colors hover:bg-graphite-50 dark:text-graphite-100 dark:hover:bg-white/10 lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile-Menü */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-graphite-100 bg-white dark:border-white/10 dark:bg-graphite-900 lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-5 sm:px-8">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-graphite-700 transition-colors hover:bg-graphite-50 hover:text-brand-500 dark:text-graphite-100 dark:hover:bg-white/5 dark:hover:text-brand-300"
                >
                  {t.nav[link.id]}
                </a>
              ))}
              <a
                href="#kontakt"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-xl bg-brand-500 px-4 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-brand-600"
              >
                {t.nav.cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function LangSwitch({
  locale,
  setLocale,
}: {
  locale: "de" | "en";
  setLocale: (l: "de" | "en") => void;
}) {
  return (
    <div className="flex items-center rounded-full border border-graphite-200/80 p-0.5 text-xs font-semibold dark:border-white/15">
      {(["de", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
            locale === l
              ? "bg-graphite-800 text-white dark:bg-white dark:text-graphite-900"
              : "text-graphite-500 hover:text-graphite-800 dark:text-graphite-300 dark:hover:text-white"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
