"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Locale = "de" | "en";

/* -------------------------------------------------------------------------- */
/*  Übersetzungen / Translations                                              */
/* -------------------------------------------------------------------------- */

const dictionaries = {
  de: {
    nav: {
      start: "Start",
      services: "Leistungen",
      industries: "Branchen",
      about: "Über uns",
      contact: "Kontakt",
      cta: "Anfrage",
    },
    hero: {
      badge: "3D-Druck · Engineering · Präzision",
      titleLine1: "Engineering.",
      titleLine2: "Additive Manufacturing.",
      subtitle:
        "Präzise Lösungen für Prototypen, Kleinserien und technische Bauteile – gefertigt mit modernstem 3D-Druck.",
      ctaPrimary: "Projekt anfragen",
      ctaSecondary: "Leistungen entdecken",
      scroll: "Mehr entdecken",
    },
    ctaBand: {
      title: "Bereit für Ihr nächstes Bauteil?",
    },
    stats: {
      title: "Fertigung, auf die man sich verlassen kann",
      subtitle:
        "Moderne Anlagen, saubere Prozesse und ein klarer Fokus auf technische Qualität.",
      items: [
        { value: 0.08, suffix: " mm", label: "Erreichbare Schichtauflösung", decimals: 2, display: "" },
        { value: 0, suffix: " mm", label: "Max. Bauraum (FDM)", decimals: 0, display: "420 × 420 × 500" },
        { value: 2, suffix: "", label: "Druckverfahren – FDM & Resin", decimals: 0, display: "" },
        { value: 24, suffix: " h", label: "Max. Reaktionszeit auf Anfragen", decimals: 0, display: "" },
      ],
    },
    services: {
      badge: "Leistungen",
      title: "Von der Idee zum Bauteil",
      subtitle:
        "Ein durchgängiges Leistungsspektrum – von der Konstruktion bis zum fertigen, einsatzbereiten Bauteil.",
      showAll: "Alle Leistungen anzeigen",
      showLess: "Weniger anzeigen",
      items: [
        {
          title: "FDM 3D-Druck",
          text: "Robuste Bauteile aus technischen Thermoplasten – wirtschaftlich für Funktionsteile, Vorrichtungen und Prototypen.",
        },
        {
          title: "Resin 3D-Druck",
          text: "Höchste Detailtreue und feine Oberflächen für filigrane Geometrien und anspruchsvolle Sichtteile.",
        },
        {
          title: "Prototypen",
          text: "Schnelle, präzise Prototypen für Design-Reviews, Passungstests und die frühe Produktentwicklung.",
        },
        {
          title: "Kleinserien",
          text: "Reproduzierbare Kleinserien mit gleichbleibender Qualität – flexibel und ohne teuren Werkzeugbau.",
        },
        {
          title: "CAD-Konstruktion",
          text: "Fertigungsgerechte 3D-Konstruktion – von der Skizze bis zum druckoptimierten Datensatz.",
        },
        {
          title: "Reverse Engineering",
          text: "Rekonstruktion vorhandener Bauteile in präzise, weiterverwendbare CAD-Modelle.",
        },
        {
          title: "3D-Scanning",
          text: "Präzise Digitalisierung realer Objekte mit hochwertigen 3D-Scannern – die ideale Basis für Reverse Engineering, Qualitätsprüfung und Reproduktion.",
        },
      ],
    },
    industries: {
      badge: "Branchen",
      title: "Lösungen für unterschiedlichste Anwendungen",
      subtitle:
        "Unsere Lösungen eignen sich unter anderem für die folgenden Bereiche:",
      note: "Die Nennung dieser Bereiche beschreibt geeignete Einsatzfelder unserer Fertigung – keine bestehenden Referenzen.",
      items: [
        "Maschinenbau",
        "Automobilindustrie",
        "Medizintechnik",
        "Luft- und Raumfahrt",
        "Start-ups",
        "Industrieunternehmen",
        "Privatkunden",
      ],
    },
    about: {
      badge: "Über Kahlen3D",
      title: "Ein junges Unternehmen mit klarem Anspruch",
      paragraphs: [
        "Angefangen hat alles mit einem einzigen 3D-Drucker – zunächst rein hobbymäßig, aus Begeisterung für Technik, Konstruktion und das Fertigen eigener Teile. Aus dem Hobby wurden mit der Zeit mehr Drucker, mehr Erfahrung und immer mehr Kundenaufträge.",
        "Heute steht Kahlen3D für 3D-Druck mit Anspruch: technische Bauteile in verlässlicher Qualität – von der ersten Idee bis zum einsatzbereiten Teil. Geblieben ist, was von Anfang an zählte – die Leidenschaft fürs Detail, ehrliche Beratung und der Anspruch an Präzision statt großer Versprechen.",
      ],
      values: [
        { title: "Präzision", text: "Sorgfältige Prozesse für maßhaltige, reproduzierbare Ergebnisse." },
        { title: "Innovation", text: "Moderne Verfahren und stetige Weiterentwicklung." },
        { title: "Qualität", text: "Anspruch an jedes Bauteil – von der Datei bis zur Oberfläche." },
        { title: "Zuverlässigkeit", text: "Klare Kommunikation und verlässliche Umsetzung." },
      ],
    },
    contact: {
      badge: "Kontakt",
      title: "Projekt anfragen",
      subtitle:
        "Beschreiben Sie Ihr Vorhaben – wir melden uns zeitnah mit einer ersten Einschätzung.",
      fields: {
        name: "Name",
        company: "Unternehmen",
        email: "E-Mail",
        phone: "Telefon",
        message: "Nachricht",
        optional: "optional",
      },
      placeholder: {
        name: "Max Mustermann",
        company: "Musterfirma GmbH",
        email: "name@beispiel.de",
        phone: "+49 …",
        message: "Beschreiben Sie kurz Ihr Bauteil, Stückzahl und gewünschten Zeitraum …",
      },
      submit: "Projekt anfragen",
      sending: "Wird gesendet …",
      success: "Vielen Dank für Ihre Anfrage!",
      successHint:
        "Wir haben Ihre Nachricht erhalten und melden uns zeitnah bei Ihnen.",
      errorTitle: "Senden fehlgeschlagen",
      error:
        "Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es später erneut oder schreiben Sie uns direkt an kahlen3d@gmail.com.",
      notConfigured:
        "Der E-Mail-Versand ist noch nicht eingerichtet. Bitte schreiben Sie uns direkt an kahlen3d@gmail.com.",
      retry: "Erneut versuchen",
      directTitle: "Direkter Kontakt",
      required: "Pflichtfeld",
      attachments: "Anhänge",
      attachmentsHint: "Bilder oder PDF · optional · max. 4 MB insgesamt",
      attachmentsButton: "Dateien auswählen",
      attachmentsTooLarge: "Die Anhänge sind zu groß (max. 4 MB insgesamt).",
      attachmentsType: "Nur Bilder und PDF-Dateien sind erlaubt.",
      attachmentsRemove: "Entfernen",
    },
    footer: {
      tagline:
        "3D-Druck und Engineering für Prototypen, Kleinserien und technische Bauteile.",
      navTitle: "Navigation",
      legalTitle: "Rechtliches",
      contactTitle: "Kontakt",
      imprint: "Impressum",
      privacy: "Datenschutz",
      rights: "Alle Rechte vorbehalten.",
      disclaimer:
        "Diese Website ist ein Demonstrationsentwurf. Bilder sind Platzhalter.",
    },
    theme: { toLight: "Hellmodus", toDark: "Dunkelmodus" },
  },

  en: {
    nav: {
      start: "Home",
      services: "Services",
      industries: "Industries",
      about: "About",
      contact: "Contact",
      cta: "Request",
    },
    hero: {
      badge: "3D Printing · Engineering · Precision",
      titleLine1: "Engineering.",
      titleLine2: "Additive Manufacturing.",
      subtitle:
        "Precise solutions for prototypes, small series and technical parts – manufactured with state-of-the-art 3D printing.",
      ctaPrimary: "Request a project",
      ctaSecondary: "Explore services",
      scroll: "Discover more",
    },
    ctaBand: {
      title: "Ready for your next part?",
    },
    stats: {
      title: "Manufacturing you can rely on",
      subtitle:
        "Modern equipment, clean processes and a clear focus on technical quality.",
      items: [
        { value: 0.08, suffix: " mm", label: "Achievable layer resolution", decimals: 2, display: "" },
        { value: 0, suffix: " mm", label: "Max. build volume (FDM)", decimals: 0, display: "420 × 420 × 500" },
        { value: 2, suffix: "", label: "Print technologies – FDM & Resin", decimals: 0, display: "" },
        { value: 24, suffix: " h", label: "Max. response time on requests", decimals: 0, display: "" },
      ],
    },
    services: {
      badge: "Services",
      title: "From idea to finished part",
      subtitle:
        "An end-to-end range of services – from design to the finished, ready-to-use part.",
      showAll: "Show all services",
      showLess: "Show less",
      items: [
        {
          title: "FDM 3D Printing",
          text: "Robust parts from technical thermoplastics – economical for functional parts, fixtures and prototypes.",
        },
        {
          title: "Resin 3D Printing",
          text: "Maximum detail and fine surfaces for delicate geometries and demanding visible parts.",
        },
        {
          title: "Prototypes",
          text: "Fast, precise prototypes for design reviews, fit tests and early product development.",
        },
        {
          title: "Small Series",
          text: "Reproducible small series with consistent quality – flexible and without costly tooling.",
        },
        {
          title: "CAD Design",
          text: "Manufacturing-oriented 3D design – from sketch to print-optimised data set.",
        },
        {
          title: "Reverse Engineering",
          text: "Reconstruction of existing parts into precise, reusable CAD models.",
        },
        {
          title: "3D Scanning",
          text: "Precise digitisation of real objects with high-quality 3D scanners – the ideal basis for reverse engineering, quality inspection and reproduction.",
        },
      ],
    },
    industries: {
      badge: "Industries",
      title: "Solutions for a wide range of applications",
      subtitle: "Our solutions are suitable, among others, for the following areas:",
      note: "Naming these areas describes suitable fields of application for our manufacturing – not existing references.",
      items: [
        "Mechanical Engineering",
        "Automotive",
        "Medical Technology",
        "Aerospace",
        "Start-ups",
        "Industrial Companies",
        "Private Customers",
      ],
    },
    about: {
      badge: "About Kahlen3D",
      title: "A young company with a clear ambition",
      paragraphs: [
        "It all started with a single 3D printer – at first purely as a hobby, driven by a passion for technology, design and making our own parts. Over time, the hobby grew into more printers, more experience and more and more customer projects.",
        "Today, Kahlen3D stands for 3D printing with ambition: technical parts in reliable quality – from the first idea to the ready-to-use part. What has remained is what mattered from day one – an eye for detail, honest advice and a focus on precision instead of big promises.",
      ],
      values: [
        { title: "Precision", text: "Careful processes for dimensionally accurate, reproducible results." },
        { title: "Innovation", text: "Modern processes and continuous development." },
        { title: "Quality", text: "A standard for every part – from file to surface." },
        { title: "Reliability", text: "Clear communication and dependable execution." },
      ],
    },
    contact: {
      badge: "Contact",
      title: "Request a project",
      subtitle:
        "Describe your project – we will get back to you promptly with an initial assessment.",
      fields: {
        name: "Name",
        company: "Company",
        email: "Email",
        phone: "Phone",
        message: "Message",
        optional: "optional",
      },
      placeholder: {
        name: "John Doe",
        company: "Example Ltd.",
        email: "name@example.com",
        phone: "+49 …",
        message: "Briefly describe your part, quantity and desired timeframe …",
      },
      submit: "Request a project",
      sending: "Sending …",
      success: "Thank you for your request!",
      successHint: "We have received your message and will get back to you shortly.",
      errorTitle: "Sending failed",
      error:
        "Your request could not be sent. Please try again later or email us directly at kahlen3d@gmail.com.",
      notConfigured:
        "Email delivery is not set up yet. Please email us directly at kahlen3d@gmail.com.",
      retry: "Try again",
      directTitle: "Direct contact",
      required: "Required field",
      attachments: "Attachments",
      attachmentsHint: "Images or PDF · optional · max. 4 MB total",
      attachmentsButton: "Choose files",
      attachmentsTooLarge: "The attachments are too large (max. 4 MB total).",
      attachmentsType: "Only images and PDF files are allowed.",
      attachmentsRemove: "Remove",
    },
    footer: {
      tagline:
        "3D printing and engineering for prototypes, small series and technical parts.",
      navTitle: "Navigation",
      legalTitle: "Legal",
      contactTitle: "Contact",
      imprint: "Imprint",
      privacy: "Privacy",
      rights: "All rights reserved.",
      disclaimer: "This website is a demonstration draft. Images are placeholders.",
    },
    theme: { toLight: "Light mode", toDark: "Dark mode" },
  },
};

// Bewusst ohne "as const": so teilen sich DE und EN denselben (verbreiterten)
// Struktur-Typ und bleiben gegeneinander zuweisbar.
export type Dictionary = (typeof dictionaries)["de"];

/* -------------------------------------------------------------------------- */
/*  Context                                                                    */
/* -------------------------------------------------------------------------- */

type LanguageContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("de");

  useEffect(() => {
    const stored = window.localStorage.getItem("kahlen3d-locale");
    if (stored === "de" || stored === "en") {
      setLocaleState(stored);
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    window.localStorage.setItem("kahlen3d-locale", l);
    document.documentElement.lang = l;
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => {
      const next = prev === "de" ? "en" : "de";
      window.localStorage.setItem("kahlen3d-locale", next);
      document.documentElement.lang = next;
      return next;
    });
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({ locale, setLocale, toggleLocale, t: dictionaries[locale] }),
    [locale, setLocale, toggleLocale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
