"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Clock,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { useI18n } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "error";

export function Contact() {
  const { t } = useI18n();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      company: String(fd.get("company") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""), // Honeypot
    };

    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        form.reset();
        setStatus("success");
      } else {
        setErrorMsg(data.error === "not_configured" ? t.contact.notConfigured : t.contact.error);
        setStatus("error");
      }
    } catch {
      setErrorMsg(t.contact.error);
      setStatus("error");
    }
  };

  const submitted = status === "success";
  const sending = status === "sending";

  const inputClass =
    "w-full rounded-xl border border-graphite-200 bg-white px-4 py-3 text-graphite-800 placeholder:text-graphite-300 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-white/10 dark:bg-graphite-800 dark:text-white dark:placeholder:text-graphite-500";
  const labelClass = "mb-1.5 block text-sm font-medium text-graphite-700 dark:text-graphite-200";

  return (
    <section id="kontakt" className="scroll-mt-24 bg-white py-24 dark:bg-graphite-900 lg:py-32">
      <div className="mx-auto max-w-wide px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          {/* Info-Spalte */}
          <div>
            <SectionHeading badge={t.contact.badge} title={t.contact.title} subtitle={t.contact.subtitle} />

            <div className="mt-10 space-y-5">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-graphite-400">
                {t.contact.directTitle}
              </h3>
              <ContactItem icon={<Mail size={18} />} href={`mailto:${siteConfig.email}`} value={siteConfig.email} />
              <ContactItem icon={<Phone size={18} />} href={`tel:${siteConfig.phone.replace(/\s|\(|\)/g, "")}`} value={siteConfig.phone} />
              <ContactItem icon={<MapPin size={18} />} value={siteConfig.location} />
              <ContactItem icon={<Clock size={18} />} value={t.stats.items[3].value + " h · " + t.stats.items[3].label} />
            </div>
          </div>

          {/* Formular */}
          <Reveal y={28}>
            <div className="relative rounded-3xl border border-graphite-100 bg-graphite-50/50 p-6 shadow-soft dark:border-white/10 dark:bg-white/[0.03] sm:p-9">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex min-h-[420px] flex-col items-center justify-center text-center"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-300">
                      <CheckCircle2 size={34} />
                    </span>
                    <p className="mt-6 font-display text-xl font-semibold text-graphite-800 dark:text-white">
                      {t.contact.success}
                    </p>
                    <p className="mt-2 max-w-sm text-sm text-graphite-500 dark:text-graphite-400">
                      {t.contact.successHint}
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-6 text-sm font-semibold text-brand-500 hover:text-brand-600 dark:text-brand-300"
                    >
                      ←
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className={labelClass}>
                          {t.contact.fields.name} *
                        </label>
                        <input id="name" name="name" required placeholder={t.contact.placeholder.name} className={inputClass} />
                      </div>
                      <div>
                        <label htmlFor="company" className={labelClass}>
                          {t.contact.fields.company}{" "}
                          <span className="text-graphite-400">({t.contact.fields.optional})</span>
                        </label>
                        <input id="company" name="company" placeholder={t.contact.placeholder.company} className={inputClass} />
                      </div>
                      <div>
                        <label htmlFor="email" className={labelClass}>
                          {t.contact.fields.email} *
                        </label>
                        <input id="email" name="email" type="email" required placeholder={t.contact.placeholder.email} className={inputClass} />
                      </div>
                      <div>
                        <label htmlFor="phone" className={labelClass}>
                          {t.contact.fields.phone}{" "}
                          <span className="text-graphite-400">({t.contact.fields.optional})</span>
                        </label>
                        <input id="phone" name="phone" type="tel" placeholder={t.contact.placeholder.phone} className={inputClass} />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className={labelClass}>
                        {t.contact.fields.message} *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        placeholder={t.contact.placeholder.message}
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {/* Honeypot – für Menschen unsichtbar, fängt Bots ab */}
                    <div className="absolute left-[-9999px]" aria-hidden="true">
                      <label htmlFor="website">Website</label>
                      <input id="website" name="website" tabIndex={-1} autoComplete="off" />
                    </div>

                    {status === "error" && (
                      <p className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
                        <AlertCircle size={17} className="mt-0.5 shrink-0" />
                        {errorMsg}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={sending}
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-7 py-4 text-base font-semibold text-white shadow-soft transition-all hover:bg-brand-600 hover:shadow-card disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {sending ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          {t.contact.sending}
                        </>
                      ) : (
                        <>
                          {t.contact.submit}
                          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  icon,
  value,
  href,
}: {
  icon: React.ReactNode;
  value: string;
  href?: string;
}) {
  const content = (
    <span className="flex items-center gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-300">
        {icon}
      </span>
      <span className="text-graphite-700 dark:text-graphite-200">{value}</span>
    </span>
  );
  return href ? (
    <a href={href} className="block transition-opacity hover:opacity-70">
      {content}
    </a>
  ) : (
    <div>{content}</div>
  );
}
