import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const MAX_TOTAL_BYTES = 4 * 1024 * 1024; // 4 MB gesamt

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// Erlaubte Dateiendungen – 3D-Dateien (STL etc.) haben oft keinen MIME-Typ,
// daher wird primär über die Endung geprüft.
const ACCEPTED_EXT = new Set([
  "png", "jpg", "jpeg", "gif", "webp", "heic", "heif", "bmp", "tiff",
  "pdf", "stl", "step", "stp", "3mf", "obj", "igs", "iges",
]);
const extOf = (name: string) => {
  const i = name.lastIndexOf(".");
  return i >= 0 ? name.slice(i + 1).toLowerCase() : "";
};
const isAcceptedFile = (f: File) =>
  f.type.startsWith("image/") || ACCEPTED_EXT.has(extOf(f.name));
const escapeHtml = (v: string) =>
  v.replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string
  ));

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 });
  }

  const get = (k: string) => String(form.get(k) ?? "").trim();

  // Spam-Schutz: Honeypot gefüllt -> still verwerfen.
  if (get("website") !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = get("name");
  const email = get("email");
  const message = get("message");
  const company = get("company");
  const phone = get("phone");

  if (!name || !email || !message || !isEmail(email)) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  // Anhänge einsammeln und prüfen
  const rawFiles = form
    .getAll("attachments")
    .filter((v): v is File => v instanceof File && v.size > 0);

  for (const f of rawFiles) {
    if (!isAcceptedFile(f)) {
      return NextResponse.json({ ok: false, error: "bad_type" }, { status: 415 });
    }
  }
  const totalSize = rawFiles.reduce((s, f) => s + f.size, 0);
  if (totalSize > MAX_TOTAL_BYTES) {
    return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });
  }

  const attachments = await Promise.all(
    rawFiles.map(async (f) => ({
      filename: f.name || "anhang",
      content: Buffer.from(await f.arrayBuffer()),
      contentType: f.type || undefined,
    }))
  );

  const {
    SMTP_HOST = "smtp.gmail.com",
    SMTP_PORT = "465",
    SMTP_USER,
    SMTP_PASS,
    CONTACT_TO,
    CONTACT_FROM,
  } = process.env;

  if (!SMTP_USER || !SMTP_PASS) {
    console.warn(
      "[contact] SMTP nicht konfiguriert – bitte SMTP_USER / SMTP_PASS setzen."
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
    [
      "Anhänge",
      attachments.length ? attachments.map((a) => a.filename).join(", ") : "keine",
    ],
  ];

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;color:#2B2B2B;max-width:560px">
      <h2 style="color:#2F7D4A;margin:0 0 16px">Neue Projektanfrage – Kahlen3D</h2>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 12px 6px 0;color:#7A7A7A;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 0"><strong>${escapeHtml(v)}</strong></td></tr>`
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
      attachments,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Versand fehlgeschlagen:", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
