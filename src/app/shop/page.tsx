"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/shop/ProductCard";
import { products } from "@/lib/products";
import { useI18n } from "@/lib/i18n";

export default function ShopPage() {
  const { t } = useI18n();

  return (
    <>
      <Navbar />
      <main className="bg-white pt-[72px] dark:bg-graphite-900">
        <section className="mx-auto max-w-wide px-5 py-20 sm:px-8 lg:py-28">
          <SectionHeading badge={t.shop.badge} title={t.shop.title} subtitle={t.shop.subtitle} />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>

          <p className="mt-10 text-sm text-graphite-400">{t.shop.taxNote}</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
