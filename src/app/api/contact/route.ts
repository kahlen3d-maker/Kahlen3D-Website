import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  message?: string;
  website?: string; // Honeypot – muss leer bleiben
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const escapeHtml = (v: string) =>
  v.replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string
  ));

export async function POST(req: Request) {
  let data: ContactPayload;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Spam-Schutz: wenn das versteckte Feld gefüllt ist, still verwerfen.
  if (data.website && data.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const message = (data.message ?? "").trim();
  const company = (data.company ?? "").trim();
  const phone = (data.phone ?? "").trim();

  if (!name || !email || !message || !isEmail(email)) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const {
    SMTP_HOST = "smtp.gmail.com",
    SMTP_PORT = "465",
    SMTP_USER,
    SMTP_PASS,
    CONTACT_TO,
    CONTACT_FROM,
  } = process.env;

  // Ohne Zugangsdaten kann nicht versendet werden – klare Rückmeldung.
  if (!SMTP_USER || !SMTP_PASS) {
    console.warn(
      "[contact] SMTP nicht konfiguriert – bitte SMTP_USER / SMTP_PASS in .env.local setzen."
    );
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const to = CONTACT_TO || SMTP_USER;
  const from = CONTACT_FROM || SMTP_USER;
  const port = Number(SMTP_PORT);

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465, // 465 = SSL, 587 = STARTTLS
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const rows: [string, string][] = [
    ["Name", name],
    ["Unternehmen", company || "—"],
    ["E-Mail", email],
    ["Telefon", phone || "—"],
  ];

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;color:#2B2B2B;max-width:560px">
      <h2 style="color:#2F7D4A;margin:0 0 16px">Neue Projektanfrage – Kahlen3D</h2>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 12px 6px 0;color:#7A7A7A;white-space:nowrap">${k}</td><td style="padding:6px 0"><strong>${escapeHtml(v)}</strong></td></tr>`
          )
          .join("")}
      </table>
      <p style="margin:20px 0 6px;color:#7A7A7A;font-size:14px">Nachricht</p>
      <div style="white-space:pre-wrap;background:#F5F5F5;border-left:3px solid #F4B400;padding:14px 16px;border-radius:8px;font-size:14px">${escapeHtml(
        message
      )}</div>
    </div>`;

  const text =
    `Neue Projektanfrage – Kahlen3D\n\n` +
    rows.map(([k, v]) => `${k}: ${v}`).join("\n") +
    `\n\nNachricht:\n${message}\n`;

  try {
    await transporter.sendMail({
      from: `"Kahlen3D Website" <${from}>`,
      to,
      replyTo: `"${name}" <${email}>`,
      subject: `Projektanfrage von ${name}${company ? ` (${company})` : ""}`,
      text,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Versand fehlgeschlagen:", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
