"use client";

import Link from "next/link";
import { useEffect } from "react";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/components/shop/CartProvider";
import { useI18n } from "@/lib/i18n";

export default function ShopSuccessPage() {
  const { t } = useI18n();
  const { clear } = useCart();

  // Warenkorb nach erfolgreichem Kauf leeren
  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <>
      <Navbar />
      <main className="flex min-h-[70vh] items-center bg-white pt-[72px] dark:bg-graphite-900">
        <div className="mx-auto max-w-lg px-5 py-20 text-center sm:px-8">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-300">
            <CheckCircle2 size={36} />
          </span>
          <h1 className="mt-6 font-display text-2xl font-bold tracking-tight text-graphite-800 dark:text-white sm:text-3xl">
            {t.shop.successTitle}
          </h1>
          <p className="mt-3 text-graphite-500 dark:text-graphite-300">{t.shop.successText}</p>
          <Link
            href="/shop"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
          >
            <ArrowLeft size={16} /> {t.shop.backToShop}
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
