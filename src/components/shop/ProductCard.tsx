"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Box, FileDown, Check } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";
import { useCart } from "./CartProvider";
import { useI18n } from "@/lib/i18n";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { t } = useI18n();
  const { add, items } = useCart();
  const inCart = items.some((i) => i.id === product.id);
  const isDigital = product.type === "digital";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-graphite-100 bg-white shadow-soft transition-shadow duration-300 hover:shadow-card dark:border-white/10 dark:bg-graphite-900"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-graphite-100 dark:bg-graphite-800">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-graphite-700 backdrop-blur-sm dark:bg-graphite-900/80 dark:text-graphite-100">
          {isDigital ? <FileDown size={13} /> : <Box size={13} />}
          {isDigital ? t.shop.typeDigital : t.shop.typePhysical}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold tracking-tight text-graphite-800 dark:text-white">
          {product.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-graphite-500 dark:text-graphite-300">
          {product.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="font-display text-xl font-bold text-graphite-800 dark:text-white">
            {formatPrice(product.price)}
          </span>
          <button
            type="button"
            onClick={() => add(product.id)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
              inCart
                ? "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300"
                : "bg-brand-500 text-white hover:bg-brand-600"
            }`}
          >
            {inCart ? <Check size={16} /> : <ShoppingCart size={16} />}
            {inCart ? t.shop.inCart : t.shop.addToCart}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
