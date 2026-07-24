"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingCart, Loader2, AlertCircle } from "lucide-react";
import { useCart } from "./CartProvider";
import { getProduct, formatPrice } from "@/lib/products";
import { useI18n } from "@/lib/i18n";

export function CartDrawer() {
  const { t } = useI18n();
  const { items, total, count, open, setOpen, setQty, remove } = useCart();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string>("");

  const checkout = async () => {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: items.map((i) => ({ id: i.id, qty: i.qty })) }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.url) {
        window.location.href = data.url; // Weiterleitung zu Stripe Checkout
        return;
      }
      setError(data.error === "not_configured" ? t.shop.notConfigured : t.shop.checkoutError);
    } catch {
      setError(t.shop.checkoutError);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] bg-graphite-950/50 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-white shadow-2xl dark:bg-graphite-900"
          >
            <div className="flex items-center justify-between border-b border-graphite-100 px-5 py-4 dark:border-white/10">
              <h2 className="inline-flex items-center gap-2 font-display text-lg font-semibold text-graphite-800 dark:text-white">
                <ShoppingCart size={18} /> {t.shop.cart} {count > 0 && `(${count})`}
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Schließen"
                className="flex h-9 w-9 items-center justify-center rounded-full text-graphite-500 hover:bg-graphite-50 dark:text-graphite-300 dark:hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <p className="mt-10 text-center text-graphite-500 dark:text-graphite-400">
                  {t.shop.cartEmpty}
                </p>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => {
                    const p = getProduct(item.id);
                    if (!p) return null;
                    return (
                      <li key={item.id} className="flex gap-3">
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-graphite-100 dark:bg-graphite-800">
                          <Image src={p.image} alt={p.name} fill sizes="64px" className="object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-graphite-800 dark:text-white">
                            {p.name}
                          </p>
                          <p className="text-sm text-graphite-500 dark:text-graphite-400">
                            {formatPrice(p.price)}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setQty(item.id, item.qty - 1)}
                              className="flex h-7 w-7 items-center justify-center rounded-md border border-graphite-200 text-graphite-600 hover:bg-graphite-50 dark:border-white/15 dark:text-graphite-200 dark:hover:bg-white/10"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="w-6 text-center text-sm font-medium text-graphite-800 dark:text-white">
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQty(item.id, item.qty + 1)}
                              className="flex h-7 w-7 items-center justify-center rounded-md border border-graphite-200 text-graphite-600 hover:bg-graphite-50 dark:border-white/15 dark:text-graphite-200 dark:hover:bg-white/10"
                            >
                              <Plus size={13} />
                            </button>
                            <button
                              type="button"
                              onClick={() => remove(item.id)}
                              aria-label={t.shop.remove}
                              className="ml-auto text-graphite-400 hover:text-red-500"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-graphite-100 px-5 py-4 dark:border-white/10">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm text-graphite-500 dark:text-graphite-400">{t.shop.total}</span>
                  <span className="font-display text-xl font-bold text-graphite-800 dark:text-white">
                    {formatPrice(total)}
                  </span>
                </div>
                <p className="mb-3 text-xs text-graphite-400">
                  {t.shop.shippingNote} {t.shop.taxNote}
                </p>

                {error && (
                  <p className="mb-3 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
                    <AlertCircle size={16} className="mt-0.5 shrink-0" /> {error}
                  </p>
                )}

                <button
                  type="button"
                  onClick={checkout}
                  disabled={busy}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-6 py-3.5 text-base font-semibold text-white shadow-soft transition-all hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {busy ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> {t.shop.opening}
                    </>
                  ) : (
                    t.shop.checkout
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-2 w-full rounded-xl px-6 py-2.5 text-sm font-medium text-graphite-500 hover:text-graphite-800 dark:text-graphite-400 dark:hover:text-white"
                >
                  {t.shop.continue}
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
