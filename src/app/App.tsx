import { useEffect, useState } from "react";
// declare missing jsx-runtime module to satisfy TypeScript in this repo setup
declare module 'react/jsx-runtime';
import { AnimatePresence } from "motion/react";

import LoadingScreen from "../components/LoadingScreen";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import GoldDivider from "../components/GoldDivider";
import BrandStorySection from "../components/BrandStorySection";
import ProductsSection from "../components/ProductsSection";
import BrewingRitualSection from "../components/BrewingRitualSection";
import PhilosophySection from "../components/PhilosophySection";
import Footer from "../components/Footer";

import type { Lang } from "../types";

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<Lang>("ar");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{
        fontFamily:
          lang === "ar" ? "'Noto Kufi Arabic', serif" : "'Inter', sans-serif",
      }}
    >
      <AnimatePresence>
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar
            isDark={isDark}
            onToggleDark={() => setIsDark((darkMode: boolean) => !darkMode)}
            lang={lang}
            onToggleLang={() =>
              setLang((currentLang: Lang) => (currentLang === "ar" ? "en" : "ar"))
            }
          />

          <HeroSection lang={lang} />
          <GoldDivider withBranch />
          <BrandStorySection lang={lang} isDark={isDark} /> 
          <GoldDivider />
          <ProductsSection lang={lang} />
          <GoldDivider withBranch />
          <BrewingRitualSection lang={lang} isDark={isDark} />
          <PhilosophySection lang={lang} />
          <Footer lang={lang} />
        </>
      )}
    </div>
  );
}
