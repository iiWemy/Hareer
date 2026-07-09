import { motion } from "motion/react";

import { siteContent } from "../data/siteContent";
import { products } from "../data/products";
import { useInView } from "../hooks/useInView";
import type { Lang } from "../types";
import ProductCard from "./ProductCard";

interface ProductsSectionProps {
  lang: Lang;
}

export default function ProductsSection({ lang }: ProductsSectionProps) {
  const { ref, inView } = useInView<HTMLElement>(0.1);
  const content = siteContent[lang].products;

  return (
    <section
      id="products"
      className="py-32 overflow-hidden"
      style={{ background: "var(--card)" }}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "#750505",
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
              color: "var(--foreground)",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: lang === "ar" ? 700 : 400,
              lineHeight: 1.2,
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

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              lang={lang}
              delay={index * 0.15}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
