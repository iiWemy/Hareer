// Temporary ambient declaration to silence missing types for the automatic
// JSX runtime import (react/jsx-runtime) in environments without
// @types/react installed.
declare module "react/jsx-runtime";

import { motion } from "motion/react";
import { ImageWithFallback } from "../app/components/ui/ImageWithFallback";

import branchImg from "../imports/hareer-tea-branch.png";
import productBox from "../imports/hareer-product-box.png";

import { useInView } from "../hooks/useInView";
import type { Lang } from "../types";
import { GOLD_TEXT } from "../constants/theme";

interface BrandStorySectionProps {
  lang: Lang;
  isDark: boolean;
}

export default function BrandStorySection({
  lang,
  isDark,
}: BrandStorySectionProps) {
  const { ref, inView } = useInView<HTMLElement>(0.12);

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
            {lang === "ar" ? "قصتنا" : "Our Story"}
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
              className="mb-8 leading-snug text-[#741518] dark:text-white"
              style={{
                fontFamily:
                  lang === "ar"
                    ? "'Noto Kufi Arabic', serif"
                    : "'Playfair Display', serif",
                fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
                fontWeight: lang === "ar" ? 600 : 400,
                lineHeight: 1.35,
              }}
            >
              {lang === "ar"
                ? "في عالمٍ تُصنع فيه الفخامة من التفاصيل"
                : "In a world where luxury is crafted from details"}
            </h2>

            <div
              className="space-y-5 text-black dark:text-white"
               style={{
                fontFamily:
                  lang === "ar"
                   ? "'Noto Kufi Arabic', serif"
                   : "'Inter', sans-serif",
                fontSize: "0.975rem",
                lineHeight: "1.9",
              }}
            >
              {lang === "ar" ? (
                <>
                  <p>
                    في عالمٍ تُصنع فيه الفخامة من التفاصيل، جاء شاي حرير
                    ليكون أكثر من مجرد شاي؛ تجربة تُلامس الحواس وتمنح اللحظة
                    قيمتها.
                  </p>
                  <p>
                    استوحينا اسمه من الحرير، رمز النعومة والرقي عبر العصور،
                    واخترنا أجود أوراق الشاي لنقدم مذاقًا متوازنًا وغنيًا
                    ينساب بسلاسة ويترك أثرًا يدوم.
                  </p>
                  <p>
                    مع كل كوب، تبدأ حكاية من الدفء والأصالة والهدوء، لتكتشف أن
                    أجمل اللحظات قد تبدأ برشفة.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    In a world where luxury is crafted from details, Hareer Tea
                    came to be more than just tea — an experience that touches
                    the senses and gives each moment its true value.
                  </p>
                  <p>
                    We drew its name from silk, the timeless symbol of softness
                    and refinement, selecting only the finest leaves to offer a
                    balanced, rich flavour that flows smoothly and leaves a
                    lasting impression.
                  </p>
                  <p>
                    With every cup, a story of warmth, authenticity, and calm
                    begins — revealing that the most beautiful moments may start
                    with a single sip.
                  </p>
                </>
              )}
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
                {lang === "ar"
                  ? "شاي حرير… حيث تلتقي الأصالة بالفخامة."
                  : "Hareer Tea… where authenticity meets luxury."}
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
                alt="Hareer Tea Ceylon Black Tea luxury gift box"
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
