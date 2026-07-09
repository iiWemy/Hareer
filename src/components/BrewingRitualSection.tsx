import { motion } from "motion/react";

import branchImg from "@/imports/.temp-14-34-31-image_upscayl_7x_upscayl-standard-4x.png";

import { ritualSteps } from "../data/ritualSteps";
import { useInView } from "../hooks/useInView";
import type { Lang } from "../types";
import { GOLD_TEXT } from "../constants/theme";

interface BrewingRitualSectionProps {
  lang: Lang;
  isDark: boolean;
}

const iraqiTeaSteps = [
  {
    num: "01",
    detail: "95-100°",
    title: "درجة حرارة الماء",
    desc: "اغلي 250 مل من الماء بدرجة حرارة 95-100.",
  },
  {
    num: "02",
    detail: "2.5 جرام",
    title: "أضف ملعقة من الشاي",
    desc: "أضف 2.5 جرام، ما يعادل ملعقة شاي واحدة لكل 250 مل.",
  },
  {
    num: "03",
    detail: "3-5 دقائق",
    title: "اتركه يغلي",
    desc: "اترك الشاي يغلي من 3 إلى 5 دقائق حسب الرغبة.",
  },
  {
    num: "04",
    detail: "5-10 دقائق",
    title: "خفف النار",
    desc: "خفف النار واتركه من 5 إلى 10 دقائق حتى يخدر.",
  },
  {
    num: "05",
    detail: "حسب الرغبة",
    title: "أضف السكر وقدّمه",
    desc: "أضف السكر حسب الرغبة، ثم قدّمه في خوري أو دلة.",
  },
];

export default function BrewingRitualSection({
  lang,
  isDark,
}: BrewingRitualSectionProps) {
  const { ref, inView } = useInView<HTMLElement>(0.08);

  return (
    <section
      id="ritual"
      className="py-32 relative overflow-hidden"
      style={{ background: "var(--background)" }}
      ref={ref}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.035 }}
      >
        <img src={branchImg} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
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
            {lang === "ar" ? "طريقة التحضير" : "Brewing Ritual"}
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
            {lang === "ar" ? "طريقتان لتحضير الشاي" : "Two Ways to Brew"}
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

        <div dir="rtl" className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-14">
            <h3
              style={{
                fontFamily: "'Noto Kufi Arabic', serif",
                color: "var(--foreground)",
                fontSize: "1.5rem",
                fontWeight: 700,
              }}
            >
              طريقة تحضير الشاي الأصلية
            </h3>

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
                    }}
                  >
                    {step.num}
                  </span>
                </div>

                <div className="flex-1 pb-10">
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.65rem",
                      color: "rgba(248,211,118,0.45)",
                    }}
                  >
                    {step.detail}
                  </span>

                  <h3
                    className="mb-3"
                    style={{
                      fontFamily: "'Noto Kufi Arabic', serif",
                      color: "var(--foreground)",
                      fontSize: "1.35rem",
                      fontWeight: 600,
                      lineHeight: 1.5,
                    }}
                  >
                    {lang === "ar" ? step.titleAr : step.titleEn}
                  </h3>

                  <p
                    style={{
                      fontFamily: "'Noto Kufi Arabic', serif",
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

          <div className="space-y-14">
            <h3
              style={{
                fontFamily: "'Noto Kufi Arabic', serif",
                color: "var(--foreground)",
                fontSize: "1.5rem",
                fontWeight: 700,
              }}
            >
              طريقة تحضير الشاي العراقي
            </h3>

            {iraqiTeaSteps.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: 24 }}
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
                    }}
                  >
                    {step.num}
                  </span>
                </div>

                <div className="flex-1 pb-10">
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.65rem",
                      color: "rgba(248,211,118,0.45)",
                    }}
                  >
                    {step.detail}
                  </span>

                  <h3
                    className="mb-3"
                    style={{
                      fontFamily: "'Noto Kufi Arabic', serif",
                      color: "var(--foreground)",
                      fontSize: "1.35rem",
                      fontWeight: 600,
                      lineHeight: 1.5,
                    }}
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "'Noto Kufi Arabic', serif",
                      color: "var(--muted-foreground)",
                      fontSize: "0.95rem",
                      lineHeight: "1.85",
                      maxWidth: "36rem",
                    }}
                  >
                    {step.desc}
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