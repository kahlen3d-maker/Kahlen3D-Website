"use client";

import { useRef, useState, type FormEvent } from "react";
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
  Paperclip,
  FileText,
  Image as ImageIcon,
  Box,
  X,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { upload } from "@vercel/blob/client";
import { useI18n } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "error";

const MAX_FILE_BYTES = 50 * 1024 * 1024; // 50 MB pro Datei (Direkt-Upload in Blob)
const ACCEPTED = "image/*,.pdf,.stl,.step,.stp,.3mf,.obj,.igs,.iges";
// Prüfung per Dateiendung – 3D-Dateien (STL etc.) haben oft keinen MIME-Typ.
const ACCEPTED_EXT = [
  "png", "jpg", "jpeg", "gif", "webp", "heic", "heif", "bmp", "tiff",
  "pdf", "stl", "step", "stp", "3mf", "obj", "igs", "iges",
];
const extOf = (name: string) => {
  const i = name.lastIndexOf(".");
  return i >= 0 ? name.slice(i + 1).toLowerCase() : "";
};
const isAccepted = (f: File) =>
  f.type.startsWith("image/") || ACCEPTED_EXT.includes(extOf(f.name));
const formatSize = (bytes: number) =>
  bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

export function Contact() {
  const { t } = useI18n();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFiles = (list: FileList | null) => {
    if (!list || list.length === 0) return;
    const incoming = Array.from(list);
    const valid = incoming.filter(isAccepted);

    const combined = [...files];
    for (const f of valid) {
      if (!combined.some((c) => c.name === f.name && c.size === f.size)) {
        combined.push(f);
      }
    }
    if (fileInputRef.current) fileInputRef.current.value = "";

    if (valid.length < incoming.length) {
      setErrorMsg(t.contact.attachmentsType);
      setStatus("error");
      return;
    }
    if (combined.some((f) => f.size > MAX_FILE_BYTES)) {
      setErrorMsg(t.contact.attachmentsTooLarge);
      setStatus("error");
      return;
    }
    setFiles(combined);
    if (status === "error") setStatus("idle");
  };

  const removeFile = (idx: number) =>
    setFiles((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (files.some((f) => f.size > MAX_FILE_BYTES)) {
      setErrorMsg(t.contact.attachmentsTooLarge);
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      // 1) Dateien direkt in den (privaten) Blob-Speicher laden (umgeht das Funktions-Limit)
      const uploaded: { pathname: string; name: string; size: number }[] = [];
      for (const f of files) {
        const blob = await upload(f.name, f, {
          access: "private",
          handleUploadUrl: "/api/upload",
          multipart: true,
        });
        uploaded.push({ pathname: blob.pathname, name: f.name, size: f.size });
      }

      // 2) Anfrage + Datei-Links senden
      const fd = new FormData(form);
      const payload = {
        name: String(fd.get("name") ?? ""),
        company: String(fd.get("company") ?? ""),
        email: String(fd.get("email") ?? ""),
        phone: String(fd.get("phone") ?? ""),
        message: String(fd.get("message") ?? ""),
        website: String(fd.get("website") ?? ""), // Honeypot
        files: uploaded,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        form.reset();
        setFiles([]);
        setStatus("success");
      } else {
        setErrorMsg(data.error === "not_configured" ? t.contact.notConfigured : t.contact.error);
        setStatus("error");
      }
    } catch {
      // Fehler beim Upload oder Versand
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

                    {/* Anhänge: Bilder / PDF */}
                    <div>
                      <label className={labelClass}>
                        {t.contact.attachments}{" "}
                        <span className="text-graphite-400">
                          ({t.contact.fields.optional})
                        </span>
                      </label>
                      <input
                        ref={fileInputRef}
                        id="attachments-input"
                        type="file"
                        multiple
                        accept={ACCEPTED}
                        onChange={(e) => addFiles(e.target.files)}
                        className="sr-only"
                      />
                      <label
                        htmlFor="attachments-input"
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-graphite-300 bg-white px-4 py-4 text-sm font-medium text-graphite-600 transition-colors hover:border-brand-400 hover:text-brand-500 dark:border-white/15 dark:bg-graphite-800 dark:text-graphite-300 dark:hover:border-brand-400"
                      >
                        <Paperclip size={16} /> {t.contact.attachmentsButton}
                      </label>
                      <p className="mt-1.5 text-xs text-graphite-400">
                        {t.contact.attachmentsHint}
                      </p>

                      {files.length > 0 && (
                        <ul className="mt-3 space-y-2">
                          {files.map((f, i) => (
                            <li
                              key={`${f.name}-${f.size}`}
                              className="flex items-center gap-3 rounded-lg border border-graphite-100 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-graphite-800"
                            >
                              {f.type === "application/pdf" ? (
                                <FileText size={16} className="shrink-0 text-brand-500 dark:text-brand-300" />
                              ) : f.type.startsWith("image/") ? (
                                <ImageIcon size={16} className="shrink-0 text-brand-500 dark:text-brand-300" />
                              ) : (
                                <Box size={16} className="shrink-0 text-brand-500 dark:text-brand-300" />
                              )}
                              <span className="min-w-0 flex-1 truncate text-graphite-700 dark:text-graphite-200">
                                {f.name}
                              </span>
                              <span className="shrink-0 text-xs text-graphite-400">
                                {formatSize(f.size)}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeFile(i)}
                                aria-label={t.contact.attachmentsRemove}
                                className="shrink-0 text-graphite-400 transition-colors hover:text-red-500"
                              >
                                <X size={15} />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
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
