import { motion } from "motion/react";

import branchImg from "@/imports/.temp-14-34-31-image_upscayl_7x_upscayl-standard-4x.png";

import { GOLD_TEXT } from "../constants/theme";
import { siteContent } from "../data/siteContent";
import { ritualSteps } from "../data/ritualSteps";
import { useInView } from "../hooks/useInView";
import type { Lang } from "../types";

interface BrewingRitualSectionProps {
  lang: Lang;
  isDark: boolean;
}

export default function BrewingRitualSection({
  lang,
  isDark,
}: BrewingRitualSectionProps) {
  const { ref, inView } = useInView<HTMLElement>(0.08);
  const content = siteContent[lang].ritual;

  return (
    <section
      id="ritual"
      className="py-32 relative overflow-hidden"
      style={{ background: "var(--background)" }}
      ref={ref}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.035 }}>
        <img src={branchImg} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-24"
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              color: isDark ? "#D8B15C" : "#7A1612",
              fontSize: "0.65rem",
              letterSpacing: "0.5em",
              textTransform: "uppercase",
            }}
          >
            {content.label}
          </span>

          <h2
            className="mt-4"
            style={{
              fontFamily:
                lang === "ar"
                  ? "'Noto Kufi Arabic', serif"
                  : "'Playfair Display', serif",
              color: isDark ? "#d8b15c" : "#7A1612",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: lang === "ar" ? 700 : 400,
            }}
          >
            {content.title}
          </h2>

          <div
            className="mx-auto mt-5"
            style={{
              height: 1,
              width: 56,
              background: "rgba(248,211,118,0.3)",
            }}
          />
        </motion.div>

        <div className="relative">
          <div
            className="absolute top-3 bottom-3"
            style={{
              left: "1.5rem",
              width: 1,
              background:
                "linear-gradient(to bottom, rgba(248,211,118,0.4), rgba(248,211,118,0.1), transparent)",
            }}
          />

          <div className="space-y-14">
            {ritualSteps.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.75, delay: index * 0.18 }}
                className="relative flex items-start gap-10 pl-14"
              >
                <div
                  className="absolute left-0 w-12 h-12 rounded-full flex items-center justify-center z-10"
                  style={{
                    background: "var(--background)",
                    border: "1px solid rgba(248,211,118,0.4)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.65rem",
                      color: GOLD_TEXT,
                      letterSpacing: "0.05em",
                      fontWeight: 500,
                    }}
                  >
                    {step.num}
                  </span>
                </div>

                <div
                  className="flex-1 pb-10"
                  style={{
                    borderBottom:
                      index < ritualSteps.length - 1
                        ? "1px solid var(--border)"
                        : "none",
                  }}
                  dir={lang === "ar" ? "rtl" : "ltr"}
                >
                  <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                    <h3
                      style={{
                        fontFamily:
                          lang === "ar"
                            ? "'Noto Kufi Arabic', serif"
                            : "'Playfair Display', serif",
                        color: "var(--foreground)",
                        fontSize: "1.35rem",
                        fontWeight: lang === "ar" ? 600 : 400,
                        lineHeight: 1.3,
                      }}
                    >
                      {lang === "ar" ? step.titleAr : step.titleEn}
                    </h3>

                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.65rem",
                        color: "rgba(248,211,118,0.45)",
                        letterSpacing: "0.1em",
                        marginTop: "6px",
                      }}
                    >
                      {step.detail}
                    </span>
                  </div>

                  <p
                    style={{
                      fontFamily:
                        lang === "ar"
                          ? "'Noto Kufi Arabic', serif"
                          : "'Inter', sans-serif",
                      color: "var(--muted-foreground)",
                      fontSize: "0.95rem",
                      lineHeight: "1.85",
                      maxWidth: "36rem",
                    }}
                  >
                    {lang === "ar" ? step.descAr : step.descEn}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
