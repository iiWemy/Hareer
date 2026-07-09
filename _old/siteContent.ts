import { motion } from "motion/react";

import branchImg from "@/imports/.temp-14-34-31-image_upscayl_7x_upscayl-standard-4x.png";

import { WINE } from "../constants/theme";
import { siteContent } from "../data/siteContent";
import { useInView } from "../hooks/useInView";
import type { Lang } from "../types";

interface PhilosophySectionProps {
  lang: Lang;
}

export default function PhilosophySection({ lang }: PhilosophySectionProps) {
  const { ref, inView } = useInView<HTMLElement>(0.2);
  const content = siteContent[lang].philosophy;

  return (
    <section id="philosophy" className="relative py-44 overflow-hidden" ref={ref}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1613158556069-e7d8eae76214?w=1920&h=900&fit=crop&auto=format')",
          backgroundColor: WINE,
        }}
      />

      <div className="absolute inset-0" style={{ background: "rgba(116,21,24,0.85)" }} />

      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ opacity: 0.18 }}
      >
        <img src={branchImg} alt="" className="w-full h-full object-cover" />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          dir={lang === "ar" ? "rtl" : "ltr"}
        >
          <div
            className="mx-auto mb-14"
            style={{
              height: 1,
              width: 80,
              background: "rgba(248,211,118,0.5)",
            }}
          />

          <p
            style={{
              fontFamily:
                lang === "ar"
                  ? "'Noto Kufi Arabic', serif"
                  : "'Playfair Display', serif",
              color: "#FFFFFF",
              fontSize: "clamp(1.7rem, 4.5vw, 3.2rem)",
              fontStyle: lang === "ar" ? "normal" : "italic",
              lineHeight: 1.55,
              fontWeight: lang === "ar" ? 600 : 400,
            }}
          >
            {content.quote}
          </p>

          <div
            className="mx-auto mt-14"
            style={{
              height: 1,
              width: 80,
              background: "rgba(248,211,118,0.5)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
