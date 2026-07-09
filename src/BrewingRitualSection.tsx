import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

import branchImg from "@/imports/.temp-14-34-31-image_upscayl_7x_upscayl-standard-4x.png";
import { GOLD, WINE } from "../constants/theme";
import { siteContent } from "../data/siteContent";
import type { Lang } from "../types";

interface HeroSectionProps {
  lang: Lang;
}

export default function HeroSection({ lang }: HeroSectionProps) {
  const content = siteContent[lang].hero;
  const brand = siteContent[lang].brand;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundColor: "#fffcf1" }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at bottom, rgba(116,21,24,0.18) 0%, transparent 70%)",
        }}
      />

      <div
        className="absolute top-0 right-0 w-1/2 h-[55%] pointer-events-none overflow-hidden"
        style={{ opacity: 0.12 }}
      >
        <img
          src={branchImg}
          alt=""
          className="w-full h-full object-cover"
          style={{ mixBlendMode: "screen" }}
        />
      </div>

      <div
        className="absolute bottom-0 left-0 w-1/3 h-[40%] pointer-events-none overflow-hidden"
        style={{ opacity: 0.07, transform: "scaleX(-1) scaleY(-1)" }}
      >
        <img
          src={branchImg}
          alt=""
          className="w-full h-full object-cover"
          style={{ mixBlendMode: "screen" }}
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "#750505",
            fontSize: "0.65rem",
            letterSpacing: "0.55em",
            textTransform: "uppercase",
            marginBottom: "2rem",
          }}
        >
          {content.label}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Noto Kufi Arabic', serif",
            color: "#750505",
            fontSize: "clamp(6rem, 18vw, 14rem)",
            lineHeight: 1.05,
            fontWeight: 700,
            textShadow:
              "0 0 120px rgba(248,211,118,0.12), 0 0 40px rgba(248,211,118,0.06)",
            marginBottom: "0.25rem",
          }}
        >
          {content.title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#70505",
            fontSize: "clamp(0.9rem, 2vw, 1.2rem)",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            marginBottom: "2.5rem",
          }}
        >
          {brand.englishName}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9 }}
          style={{
            fontFamily:
              lang === "ar"
                ? "'Noto Kufi Arabic', serif"
                : "'Playfair Display', serif",
            fontStyle: lang === "ar" ? "normal" : "italic",
            color: "#750505",
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            lineHeight: 1.7,
            maxWidth: "36rem",
            margin: "0 auto 3rem",
          }}
        >
          {content.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <a
            href="#story"
            className="group px-9 py-3.5 text-white text-xs tracking-widest uppercase transition-all duration-400"
            style={{
              fontFamily: "'Inter', sans-serif",
              background: WINE,
              border: `1px solid ${WINE}`,
              letterSpacing: "0.18em",
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.boxShadow =
                "0 0 40px rgba(248,211,118,0.18)";
              event.currentTarget.style.borderColor = GOLD;
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.boxShadow = "none";
              event.currentTarget.style.borderColor = WINE;
            }}
          >
            {content.primaryCta}
          </a>

          <a
            href="#products"
            className="px-9 py-3.5 text-xs tracking-widest uppercase transition-all duration-400"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "#750505",
              background: "transparent",
              border: "1px solid rgba(248,211,118,0.35)",
              letterSpacing: "0.18em",
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.borderColor = GOLD;
              event.currentTarget.style.background = "rgba(248,211,118,0.05)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.borderColor = "#7A1612";
              event.currentTarget.style.background = "transparent";
              event.currentTarget.style.color = "#7A1612";
            }}
          >
            {content.secondaryCta}
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <div
          style={{
            width: 1,
            height: 48,
            background:
              "linear-gradient(to bottom, transparent, rgba(248,211,118,0.4))",
          }}
        />
        <ChevronDown size={13} style={{ color: "rgba(248,211,118,0.45)" }} />
      </motion.div>
    </section>
  );
}
