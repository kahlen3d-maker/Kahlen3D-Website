"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { useI18n } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const { t } = useI18n();

  const nav = [
    { id: "start", href: "/#start" },
    { id: "services", href: "/#leistungen" },
    { id: "industries", href: "/#branchen" },
    { id: "about", href: "/#ueber-uns" },
    { id: "gallery", href: "/#galerie" },
    { id: "contact", href: "/#kontakt" },
  ] as const;

  return (
    <footer className="border-t border-graphite-100 bg-graphite-900 text-graphite-300 dark:border-white/10">
      <div className="mx-auto max-w-wide px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo onDark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-graphite-400">
              {t.footer.tagline}
            </p>
          </div>

          <FooterCol title={t.footer.navTitle}>
            {nav.map((n) => (
              <a key={n.id} href={n.href} className="footer-link">
                {t.nav[n.id]}
              </a>
            ))}
          </FooterCol>

          <FooterCol title={t.footer.legalTitle}>
            <a href="/impressum" className="footer-link">
              {t.footer.imprint}
            </a>
            <a href="/datenschutz" className="footer-link">
              {t.footer.privacy}
            </a>
          </FooterCol>

          <FooterCol title={t.footer.contactTitle}>
            <a href={`mailto:${siteConfig.email}`} className="footer-link inline-flex items-center gap-2">
              <Mail size={15} className="text-brand-300" /> {siteConfig.email}
            </a>
            <a href={`tel:${siteConfig.phone.replace(/\s|\(|\)/g, "")}`} className="footer-link inline-flex items-center gap-2">
              <Phone size={15} className="text-brand-300" /> {siteConfig.phone}
            </a>
            <span className="inline-flex items-center gap-2 text-sm text-graphite-400">
              <MapPin size={15} className="text-brand-300" /> {siteConfig.location}
            </span>
          </FooterCol>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-graphite-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. {t.footer.rights}
          </p>
          <div className="flex gap-4">
            <a href="/impressum" className="transition-colors hover:text-graphite-300">
              {t.footer.imprint}
            </a>
            <a href="/datenschutz" className="transition-colors hover:text-graphite-300">
              {t.footer.privacy}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-white">{title}</h3>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}
