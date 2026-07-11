import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Services } from "@/components/sections/Services";
import { Industries } from "@/components/sections/Industries";
import { About } from "@/components/sections/About";
import { Gallery } from "@/components/sections/Gallery";
import { CTABand } from "@/components/sections/CTABand";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Industries />
        <About />
        <Gallery />
        <CTABand />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
