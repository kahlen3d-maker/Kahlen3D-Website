import type { Metadata } from "next";
import { LegalShell } from "@/components/layout/LegalShell";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutz",
  robots: { index: false, follow: true },
};

// HINWEIS: Vorlage für eine Datenschutzerklärung. Adresse ([ ]) ergänzen und
// im Zweifel rechtlich prüfen lassen (z. B. mit einem Datenschutz-Generator).
export default function DatenschutzPage() {
  return (
    <LegalShell title="Datenschutzerklärung">
      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website ist:
        <br />
        <strong>Kahlen3D</strong> – Dustin Kahlen
        <br />
        Metgesheide 20, 41334 Nettetal
        <br />
        E-Mail: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        <br />
        Telefon: {siteConfig.phone}
      </p>

      <h2>2. Hosting</h2>
      <p>
        Diese Website wird bei <strong>Vercel Inc.</strong> (340 S Lemon Ave #4133,
        Walnut, CA 91789, USA) gehostet. Beim Aufruf der Website verarbeitet Vercel
        automatisch technisch notwendige Zugriffsdaten (u. a. IP-Adresse,
        Datum/Uhrzeit, aufgerufene Seite, Browsertyp) in sogenannten Server-Logfiles.
        Dies dient dem sicheren und stabilen Betrieb der Website. Rechtsgrundlage ist
        Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer sicheren
        Bereitstellung). Mit Vercel besteht ein Auftragsverarbeitungsvertrag.
      </p>

      <h2>3. Kontaktformular</h2>
      <p>
        Wenn Sie uns über das Kontaktformular eine Anfrage senden, verarbeiten wir
        die von Ihnen angegebenen Daten (<strong>Name, Unternehmen, E-Mail-Adresse,
        Telefonnummer, Nachricht</strong>), um Ihre Anfrage zu bearbeiten und zu
        beantworten. Die Übermittlung erfolgt per E-Mail an unser Postfach.
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Anbahnung/Erfüllung eines
        Vertrags) bzw. lit. f DSGVO (berechtigtes Interesse an der Bearbeitung von
        Anfragen). Die Daten werden gelöscht, sobald sie für die Bearbeitung nicht
        mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten
        entgegenstehen.
      </p>
      <p>
        Für den E-Mail-Versand nutzen wir den Dienst <strong>Google (Gmail)</strong>{" "}
        der Google Ireland Ltd. Auch dabei können Daten verarbeitet werden.
      </p>

      <h2>4. Cookies &amp; lokale Speicherung</h2>
      <p>
        Diese Website setzt <strong>keine Tracking- oder Marketing-Cookies</strong>{" "}
        ein und bindet keine Analyse-Dienste ein. Lediglich Ihre Einstellungen für
        Design (Hell-/Dunkelmodus) und Sprache werden lokal in Ihrem Browser
        (localStorage) gespeichert. Diese Daten verlassen Ihr Gerät nicht und
        dienen ausschließlich der Darstellung.
      </p>

      <h2>5. Ihre Rechte</h2>
      <p>Sie haben nach der DSGVO jederzeit das Recht auf:</p>
      <ul>
        <li>Auskunft über die zu Ihnen gespeicherten Daten (Art. 15 DSGVO)</li>
        <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
        <li>Löschung (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
      </ul>
      <p>
        Zur Ausübung genügt eine formlose Nachricht an{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>. Zudem steht
        Ihnen ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu.
      </p>

      <p style={{ marginTop: "2.5rem", fontSize: "0.85rem", opacity: 0.75 }}>
        Stand: {new Date().getFullYear()}. Diese Datenschutzerklärung ist eine
        Vorlage und ersetzt keine Rechtsberatung.
      </p>
    </LegalShell>
  );
}
