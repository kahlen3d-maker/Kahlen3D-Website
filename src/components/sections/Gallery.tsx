"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useI18n } from "@/lib/i18n";
import { galleryImages } from "@/lib/site";

export function Gallery() {
  const { t } = useI18n();

  return (
    <section id="galerie" className="scroll-mt-24 bg-white py-24 dark:bg-graphite-900 lg:py-32">
      <div className="mx-auto max-w-wide px-5 sm:px-8">
        <SectionHeading
          badge={t.gallery.badge}
          title={t.gallery.title}
          subtitle={t.gallery.subtitle}
        />

        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3">
          {galleryImages.map((img, i) => (
            <motion.figure
              key={img.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-graphite-100 shadow-soft dark:bg-graphite-800"
            >
              <Image
                src={img.src}
                alt={img.caption}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-graphite-950/75 via-graphite-950/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {img.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
