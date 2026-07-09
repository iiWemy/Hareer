import { useState } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "@/app/components/ui/ImageWithFallback";

import productBag from "@/imports/hareer-product-bag.png";
import productBox from "@/imports/hareer-product-box.png";

import type { Lang, Product } from "../types";
import { GOLD, GOLD_TEXT } from "../constants/theme";

interface ProductCardProps {
  product: Product;
  lang: Lang;
  delay: number;
  inView: boolean;
}

export default function ProductCard({
  product,
  lang,
  delay,
  inView,
}: ProductCardProps) {
  const [hovered, setHovered] = useState(false);

  const imgSrc =
    product.id === 1 ? productBag : product.id === 2 ? productBox : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className="group relative flex flex-col"
      style={{
        background: "var(--card)",
        border: hovered
          ? "1px solid rgba(248,211,118,0.45)"
          : "1px solid var(--border)",
        transition: "border-color 0.45s ease, box-shadow 0.45s ease",
        boxShadow: hovered
          ? "0 20px 60px rgba(0,0,0,0.2), 0 0 0 1px rgba(248,211,118,0.1)"
          : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {product.tag && (
        <div
          className="absolute top-4 z-20"
          style={{
            ...(lang === "ar" ? { left: "1rem" } : { right: "1rem" }),
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.55rem",
            letterSpacing: "0.2em",
            color: GOLD_TEXT,
            border: "1px solid rgba(248,211,118,0.3)",
            padding: "2px 8px",
            background: "transparent",
          }}
        >
          {product.tag}
        </div>
      )}

      <div
        className="relative overflow-hidden"
        style={{ height: "280px", background: "var(--card)" }}
      >
        {imgSrc ? (
          <ImageWithFallback
            src={imgSrc}
            alt={product.nameEn}
            className="w-full h-full object-contain transition-transform duration-700"
            style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
          />
        ) : (
          <img
            src={product.image ?? ""}
            alt={product.nameEn}
            className="w-full h-full object-cover transition-transform duration-700"
            style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
          />
        )}

        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(135deg, rgba(248,211,118,0.07) 0%, transparent 60%)",
            opacity: hovered ? 1 : 0,
          }}
        />
      </div>

      <div className="flex flex-col flex-1 p-6" dir={lang === "ar" ? "rtl" : "ltr"}>
        <div className="flex items-start justify-between mb-2">
          <h3
            style={{
              fontFamily:
                lang === "ar"
                  ? "'Noto Kufi Arabic', serif"
                  : "'Playfair Display', serif",
              color: "var(--foreground)",
              fontSize: "1.05rem",
              fontWeight: lang === "ar" ? 600 : 400,
              lineHeight: 1.4,
              flex: 1,
            }}
          >
            {lang === "ar" ? product.nameAr : product.nameEn}
          </h3>

          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              color: "rgba(248,211,118,0.55)",
              marginTop: "3px",
              marginLeft: "0.5rem",
            }}
          >
            {product.weight}
          </span>
        </div>

        <p
          className="flex-1 mb-6"
          style={{
            fontFamily:
              lang === "ar"
                ? "'Noto Kufi Arabic', serif"
                : "'Inter', sans-serif",
            color: "var(--muted-foreground)",
            fontSize: "0.83rem",
            lineHeight: "1.75",
          }}
        >
          {lang === "ar" ? product.descAr : product.descEn}
        </p>

        <button
          className="self-start transition-all duration-300"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: GOLD_TEXT,
            borderBottom: `1px solid rgba(248,211,118,${hovered ? "0.8" : "0.35"})`,
            paddingBottom: "2px",
            background: "none",
            cursor: "pointer",
          }}
        >
          {lang === "ar" ? "اكتشف" : "Discover"}
        </button>
      </div>

      <div
        className="absolute top-0 right-0 w-8 h-8 pointer-events-none transition-opacity duration-500"
        style={{
          borderTop: `1px solid ${GOLD}`,
          borderRight: `1px solid ${GOLD}`,
          opacity: hovered ? 0.5 : 0,
        }}
      />

      <div
        className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none transition-opacity duration-500"
        style={{
          borderBottom: `1px solid ${GOLD}`,
          borderLeft: `1px solid ${GOLD}`,
          opacity: hovered ? 0.5 : 0,
        }}
      />
    </motion.div>
  );
}
