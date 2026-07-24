import Stripe from "stripe";
import { NextResponse } from "next/server";
import { getProduct } from "@/lib/products";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    // Shop-Bezahlung noch nicht eingerichtet (kein Stripe-Schlüssel).
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let body: { items?: { id: string; qty: number }[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const stripe = new Stripe(key);
  const host = req.headers.get("host") || "";
  const proto = host.startsWith("localhost") ? "http" : "https";
  const base = `${proto}://${host}`;

  // Preise IMMER serverseitig aus dem Katalog nehmen (nie dem Client vertrauen).
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  let hasPhysical = false;

  for (const it of body.items ?? []) {
    const p = getProduct(String(it.id));
    if (!p) continue;
    const qty = Math.max(1, Math.min(99, Number(it.qty) || 1));
    if (p.type === "physical") hasPhysical = true;
    line_items.push({
      quantity: qty,
      price_data: {
        currency: "eur",
        unit_amount: Math.round(p.price * 100),
        product_data: {
          name: p.name,
          description: p.description.slice(0, 240),
          images: p.image.startsWith("http") ? [p.image] : [],
          metadata: { productId: p.id, type: p.type },
        },
      },
    });
  }

  if (line_items.length === 0) {
    return NextResponse.json({ error: "empty" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${base}/shop/erfolg?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/shop`,
      ...(hasPhysical
        ? { shipping_address_collection: { allowed_countries: ["DE", "AT", "CH"] } }
        : {}),
      metadata: { items: JSON.stringify(body.items ?? []).slice(0, 500) },
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout] Stripe-Fehler:", err);
    return NextResponse.json({ error: "stripe_error" }, { status: 502 });
  }
}
