import { motion } from "motion/react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

import branchImg from "@/imports/.temp-14-34-31-image_upscayl_7x_upscayl-standard-4x.png";
import productBox from "@/imports/.png";

import { GOLD_TEXT } from "../constants/theme";
import { siteContent } from "../data/siteContent";
import { useInView } from "../hooks/useInView";
import type { Lang } from "../types";

interface BrandStorySectionProps {
  lang: Lang;
}

export default function BrandStorySection({ lang }: BrandStorySectionProps) {
  const { ref, inView } = useInView<HTMLElement>(0.12);
  const content = siteContent[lang].story;

  return (
    <section
      id="story"
      className="py-32 overflow-hidden"
      style={{ background: "var(--background)" }}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              color: GOLD_TEXT,
              fontSize: "0.65rem",
              letterSpacing: "0.5em",
              textTransform: "uppercase",
            }}
          >
            {content.label}
          </span>
          <div
            className="mx-auto mt-3"
            style={{
              height: 1,
              width: 56,
              background: "rgba(248,211,118,0.35)",
            }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: lang === "ar" ? 50 : -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            dir={lang === "ar" ? "rtl" : "ltr"}
          >
            <h2
              className="mb-8 leading-snug"
              style={{
                fontFamily:
                  lang === "ar"
                    ? "'Noto Kufi Arabic', serif"
                    : "'Playfair Display', serif",
                color: "var(--foreground)",
                fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
                fontWeight: lang === "ar" ? 600 : 400,
                lineHeight: 1.35,
              }}
            >
              {content.title}
            </h2>

            <div
              className="space-y-5"
              style={{
                fontFamily:
                  lang === "ar"
                    ? "'Noto Kufi Arabic', serif"
                    : "'Inter', sans-serif",
                color: "var(--muted-foreground)",
                fontSize: "0.975rem",
                lineHeight: "1.9",
              }}
            >
              {content.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
              <p
                style={{
                  fontFamily:
                    lang === "ar"
                      ? "'Noto Kufi Arabic', serif"
                      : "'Playfair Display', serif",
                  fontStyle: lang === "ar" ? "normal" : "italic",
                  color: "#750505",
                  fontSize: "1.1rem",
                  lineHeight: 1.6,
                }}
              >
                {content.signature}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: lang === "ar" ? -50 : 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div
              className="absolute z-0"
              style={{
                inset: 0,
                transform: "translate(16px, 16px)",
                border: "1px solid rgba(248,211,118,0.18)",
              }}
            />

            <div className="relative z-10 overflow-hidden" style={{ background: "var(--card)" }}>
              <ImageWithFallback
                src={productBox}
                alt={content.imageAlt}
                className="w-full object-contain"
                style={{ height: "520px" }}
              />
            </div>

            <div
              className="absolute -bottom-10 -right-10 w-44 h-28 pointer-events-none overflow-hidden"
              style={{ opacity: 0.22 }}
            >
              <img src={branchImg} alt="" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
