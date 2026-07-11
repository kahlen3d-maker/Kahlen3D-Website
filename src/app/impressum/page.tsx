import type { Metadata } from "next";
import { LegalShell } from "@/components/layout/LegalShell";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false, follow: true },
};

// HINWEIS: Rechtstext-Vorlage. Bitte die mit [ ] markierten Felder ausfüllen
// (Adresse ist gesetzlich Pflicht) und im Zweifel rechtlich prüfen lassen.
export default function ImpressumPage() {
  return (
    <LegalShell title="Impressum">
      <h2>Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)</h2>
      <p>
        <strong>Kahlen3D</strong>
        <br />
        Dustin Kahlen
        <br />
        <span className="placeholder">[Straße und Hausnummer]</span>
        <br />
        <span className="placeholder">[PLZ] [Ort]</span>
        <br />
        Deutschland
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: {siteConfig.phone}
        <br />
        E-Mail: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
      </p>

      <h2>Umsatzsteuer</h2>
      <p>
        <span className="placeholder">
          [Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG, falls vorhanden.
          Andernfalls dieser Hinweis: „Als Kleinunternehmer im Sinne von § 19
          UStG wird keine Umsatzsteuer berechnet."]
        </span>
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        Dustin Kahlen
        <br />
        <span className="placeholder">[Anschrift wie oben]</span>
      </p>

      <h2>Haftung für Inhalte</h2>
      <p>
        Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf
        diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis
        10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte
        oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
        forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Unser Angebot enthält gegebenenfalls Links zu externen Websites Dritter,
        auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
        fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
        verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
        Seiten verantwortlich.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
        Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als
        solche gekennzeichnet. Downloads und Kopien dieser Seite sind nur für den
        privaten, nicht kommerziellen Gebrauch gestattet.
      </p>

      <p style={{ marginTop: "2.5rem", fontSize: "0.85rem", opacity: 0.75 }}>
        Stand: {new Date().getFullYear()}. Diese Angaben sind eine Vorlage und
        ersetzen keine Rechtsberatung.
      </p>
    </LegalShell>
  );
}
