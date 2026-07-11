import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "./Logo";
import { Footer } from "./Footer";

export function LegalShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b border-graphite-100 bg-white dark:border-white/10 dark:bg-graphite-900">
        <div className="mx-auto flex h-[72px] max-w-wide items-center justify-between px-5 sm:px-8">
          <Link href="/" aria-label="Kahlen3D – Start">
            <Logo />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-graphite-600 transition-colors hover:text-brand-500 dark:text-graphite-300 dark:hover:text-brand-300"
          >
            <ArrowLeft size={16} /> Zurück zur Startseite
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <h1 className="font-display text-3xl font-bold tracking-tight text-graphite-800 dark:text-white sm:text-4xl">
          {title}
        </h1>
        <div className="legal-prose mt-8">{children}</div>
      </main>

      <Footer />
    </>
  );
}
