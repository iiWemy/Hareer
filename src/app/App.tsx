// @ts-nocheck
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon, Globe, Menu, X, ChevronDown } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

import logoImg from "@/imports/.temp-14-14-1-image_upscayl_4x_upscayl-standard-4x.png";
import branchImg from "@/imports/.temp-14-34-31-image_upscayl_7x_upscayl-standard-4x.png";
import productBag from "@/imports/WhatsApp_Image_2026-06-30_at_14.03.43.png";
import productBox from "@/imports/WhatsApp_Image_2026-06-30_at_12.45.44.png";

type Lang = "ar" | "en";

const GOLD = "#F8D376";
const WINE = "#741518";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

// ─── Loading Screen ──────────────────────────────────────────────────────

function LoadingScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      style={{ background: "#0E0E0E" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="flex flex-col items-center gap-5"
      >
        <img
          src={logoImg}
          alt="Hareer Tea"
          className="w-20 h-20 object-contain rounded-full"
        />
        <div
          style={{
            fontFamily: "'Noto Kufi Arabic', serif",
            color: "#D8B15C",
            fontSize: "2.5rem",
            letterSpacing: "0.05em",
          }}
        >
          حرير
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "rgba(255,255,255,0.5)",
            fontSize: "0.7rem",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
          }}
        >
          Silk Tea loading…
        </motion.div>
        <motion.div
          style={{ height: 1, background: GOLD, opacity: 0.4 }}
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ delay: 0.7, duration: 1.6, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── Navbar ──────────────────────────────────────────────────────────────

function Navbar({
  isDark,
  onToggleDark,
  lang,
  onToggleLang,
}: {
  isDark: boolean;
  onToggleDark: () => void;
  lang: Lang;
  onToggleLang: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navLinks =
    lang === "ar"
      ? [
          { label: "قصتنا", href: "#story" },
          { label: "المجموعة", href: "#products" },
          { label: "طرائق التحضير  ", href: "#ritual" },
          { label: "فلسفتنا", href: "#philosophy" },
        ]
      : [
          { label: "Our Story", href: "#story" },
          { label: "Collection", href: "#products" },
          { label: "Brewing Ritual", href: "#ritual" },
          { label: "Philosophy", href: "#philosophy" },
        ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? isDark
            ? "rgba(14,14,14,0.92)"
            : "rgba(250,248,244,0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid var(--border)` : "none",
      }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.15 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <img
            src={logoImg}
            alt="Hareer Tea"
            className="w-9 h-9 object-contain rounded-full transition-transform duration-300 group-hover:scale-105"
          />
          <span
            style={{
              fontFamily: "'Noto Kufi Arabic', serif",
              color: "#7e0909",
              fontSize: "1.2rem",
              fontWeight: 600,
            }}
          >
            حرير
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors duration-300 text-sm"
              style={{
                fontFamily:
                  lang === "ar"
                    ? "'Noto Kufi Arabic', serif"
                    : "'Inter', sans-serif",
                color: "var(--muted-foreground)",
                letterSpacing: lang === "ar" ? "0" : "0.04em",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = GOLD)
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color =
                  "var(--muted-foreground)")
              }
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 transition-all duration-300 rounded-full px-3 py-1.5"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
              border: "1px solid var(--border)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = GOLD;
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(248,211,118,0.35)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                "var(--muted-foreground)";
              (e.currentTarget as HTMLElement).style.borderColor =
                "var(--border)";
            }}
          >
            <Globe size={12} />
            {lang === "ar" ? "EN" : "عر"}
          </button>

          <button
            onClick={onToggleDark}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              border: "1px solid var(--border)",
              color: "var(--muted-foreground)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = GOLD;
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(248,211,118,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                "var(--muted-foreground)";
              (e.currentTarget as HTMLElement).style.borderColor =
                "var(--border)";
            }}
          >
            {isDark ? <Sun size={13} /> : <Moon size={13} />}
          </button>

          <button
            className="md:hidden w-9 h-9 flex items-center justify-center transition-colors duration-300"
            style={{ color: "var(--muted-foreground)" }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
            style={{
              background: isDark
                ? "rgba(14,14,14,0.97)"
                : "rgba(250,248,244,0.97)",
              borderTop: "1px solid var(--border)",
            }}
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-base transition-colors duration-300"
                  style={{
                    fontFamily:
                      lang === "ar"
                        ? "'Noto Kufi Arabic', serif"
                        : "'Inter', sans-serif",
                    color: "var(--muted-foreground)",
                    textAlign: lang === "ar" ? "right" : "left",
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────
import hareerbg from "../imports/hareerbg.png";
function HeroSection({ lang }: { lang: Lang }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          // backgroundImage: `url(${hareerbg})`,
          backgroundColor: "#fffcf1",
        }}
      />
      {/* Layered overlays for cinematic depth */}
      <div
        className="absolute inset-0"
        style={{
          // background:
          //   "linear-gradient(180deg, rgba(14,14,14,0.75) 0%, rgba(14,14,14,0.5) 50%, rgba(14,14,14,0.92) 100%)",
        }}
      />
      {/* Subtle wine red vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at bottom, rgba(116,21,24,0.18) 0%, transparent 70%)`,
        }}
      />

      {/* Branch decoration top-right */}
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
      {/* Branch decoration bottom-left (flipped) */}
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

      {/* Content */}
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
          {lang === "ar" ? "تجربة شاي فاخرة" : "A Luxury Tea Experience"}
        </motion.div>

        {/* Brand name — the centerpiece */}
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
            textShadow: `0 0 120px rgba(248,211,118,0.12), 0 0 40px rgba(248,211,118,0.06)`,
            marginBottom: "0.25rem",
          }}
        >
          حرير
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
          Hareer Tea
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
          {lang === "ar"
            ? "حيث تلتقي الأصالة بالفخامة في كل رشفة"
            : "Where authenticity meets luxury in every sip"}
        </motion.p>

        {/* CTA buttons */}
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
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px rgba(248,211,118,0.18)`;
              (e.currentTarget as HTMLElement).style.borderColor = GOLD;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
              (e.currentTarget as HTMLElement).style.borderColor = WINE;
            }}
          >
            {lang === "ar" ? "اكتشف القصة" : "Explore Story"}
          </a>
          <a
            href="#products"
            className="px-9 py-3.5 text-xs tracking-widest uppercase transition-all duration-400"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "#750505",
              background: "transparent",
              border: `1px solid rgba(248,211,118,0.35)`,
              letterSpacing: "0.18em",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = GOLD;
              (e.currentTarget as HTMLElement).style.background =
                "rgba(248,211,118,0.05)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#7A1612";
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "#7A1612";
            }}
          >
            {lang === "ar" ? "المجموعة" : "Discover Collection"}
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
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
            background: `linear-gradient(to bottom, transparent, rgba(248,211,118,0.4))`,
          }}
        />
        <ChevronDown size={13} style={{ color: `rgba(248,211,118,0.45)` }} />
      </motion.div>
    </section>
  );
}

// ─── Gold Divider ─────────────────────────────────────────────────────────

function GoldDivider({ withBranch = false }: { withBranch?: boolean }) {
  return (
    <div className="relative flex items-center justify-center overflow-hidden py-1">
      <div
        style={{
          height: 1,
          width: "100%",
          background: `linear-gradient(90deg, transparent 0%, rgba(248,211,118,0.3) 35%, rgba(248,211,118,0.5) 50%, rgba(248,211,118,0.3) 65%, transparent 100%)`,
        }}
      />
      {withBranch && (
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ opacity: 0.06 }}
        >
          <img
            src={branchImg}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
}

// ─── Brand Story Section ──────────────────────────────────────────────────

function BrandStorySection({ lang }: { lang: Lang }) {
  const { ref, inView } = useInView(0.12);

  return (
    <section
      id="story"
      className="py-32 overflow-hidden"
      style={{ background: "var(--background)" }}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              color: GOLD,
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
              background: `rgba(248,211,118,0.35)`,
            }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text */}
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
              {lang === "ar"
                ? "في عالمٍ تُصنع فيه الفخامة من التفاصيل"
                : "In a world where luxury is crafted from details"}
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
                    مع كل كوب، تبدأ حكاية من الدفء والأصالة والهدوء،
                    لتكتشف أن أجمل اللحظات قد تبدأ برشفة.
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
                    begins — revealing that the most beautiful moments may
                    start with a single sip.
                  </p>
                </>
              )}
            </div>

            {/* Signature */}
            <div
              className="mt-10 pt-8"
              style={{ borderTop: "1px solid var(--border)" }}
            >
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

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: lang === "ar" ? -50 : 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Offset border accent */}
            <div
              className="absolute z-0"
              style={{
                inset: 0,
                transform: "translate(16px, 16px)",
                border: `1px solid rgba(248,211,118,0.18)`,
              }}
            />
            <div
              className="relative z-10 overflow-hidden"
              style={{ background: "var(--card)" }}
            >
              <ImageWithFallback
                src={productBox}
                alt="Hareer Tea Ceylon Black Tea luxury gift box"
                className="w-full object-contain"
                style={{ height: "520px" }}
              />
            </div>

            {/* Branch corner decoration */}
            <div
              className="absolute -bottom-10 -right-10 w-44 h-28 pointer-events-none overflow-hidden"
              style={{ opacity: 0.22 }}
            >
              <img
                src={branchImg}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Products Section ─────────────────────────────────────────────────────

interface Product {
  id: number;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
  weight: string;
  image: string | null;
  tag?: string;
}

const products: Product[] = [
  {
    id: 1,
    nameAr: "شاي أسود سيلاني ٥٠٠ج",
    nameEn: "Ceylon Black Tea 500g",
    descAr: "أجود أوراق الشاي الأسود من سريلانكا، غني بالنكهة وعميق الأثر",
    descEn:
      "The finest Ceylon black tea leaves — rich, bold, and deeply satisfying",
    weight: "500g",
    image: null,
    tag: "FBOP1",
  },
  {
    id: 2,
    nameAr: "مجموعة الهدايا الفاخرة",
    nameEn: "Luxury Gift Collection",
    descAr: "ثلاث عبوات من أجود الشاي في علبة هدايا أنيقة تليق بالمناسبات الخاصة",
    descEn:
      "Three premium packs in one elegant gift box — a perfect luxury offering for special occasions",
    weight: "1500g",
    image: null,
    tag: "GIFT",
  },
  {
    id: 3,
    nameAr: "خلطة الحرير الممتازة",
    nameEn: "Silk Premium Blend",
    descAr: "خلطة استثنائية من أرقى أوراق الشاي السيلاني، نكهة فريدة في كل كوب",
    descEn:
      "An exceptional blend of the finest Ceylon leaves — a unique expression in every cup",
    weight: "250g",
    image:
      "https://images.unsplash.com/photo-1573784540576-21ddeff9479b?w=600&h=500&fit=crop&auto=format",
  },
];

function ProductCard({
  product,
  lang,
  delay,
  inView,
}: {
  product: Product;
  lang: Lang;
  delay: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const imgSrc =
    product.id === 1
      ? productBag
      : product.id === 2
      ? productBox
      : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className="group relative flex flex-col"
      style={{
        background: "var(--card)",
        border: hovered
          ? `1px solid rgba(248,211,118,0.45)`
          : "1px solid var(--border)",
        transition: "border-color 0.45s ease, box-shadow 0.45s ease",
        boxShadow: hovered
          ? `0 20px 60px rgba(0,0,0,0.2), 0 0 0 1px rgba(248,211,118,0.1)`
          : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tag */}
      {product.tag && (
        <div
          className="absolute top-4 z-20"
          style={{
            [lang === "ar" ? "left" : "right"]: "1rem",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.55rem",
            letterSpacing: "0.2em",
            color: GOLD,
            border: `1px solid rgba(248,211,118,0.3)`,
            padding: "2px 8px",
            background: "transparent",
          }}
        >
          {product.tag}
        </div>
      )}

      {/* Image */}
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
            src={product.image!}
            alt={product.nameEn}
            className="w-full h-full object-cover transition-transform duration-700"
            style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
          />
        )}
        {/* Hover gold shimmer */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, rgba(248,211,118,0.07) 0%, transparent 60%)`,
            opacity: hovered ? 1 : 0,
          }}
        />
      </div>

      {/* Info */}
      <div
        className="flex flex-col flex-1 p-6"
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
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
              color: `rgba(248,211,118,0.55)`,
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
            color: GOLD,
            borderBottom: `1px solid rgba(248,211,118,${hovered ? "0.8" : "0.35"})`,
            paddingBottom: "2px",
            background: "none",
            cursor: "pointer",
          }}
        >
          {lang === "ar" ? "اكتشف" : "Discover"}
        </button>
      </div>

      {/* Corner accents */}
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

function ProductsSection({ lang }: { lang: Lang }) {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="products"
      className="py-32 overflow-hidden"
      style={{ background: "var(--card)" }}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
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
            {lang === "ar" ? "المجموعة المختارة" : "Curated Collection"}
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
            {lang === "ar" ? "اكتشف المجموعة" : "Discover the Collection"}
          </h2>
          <div
            className="mx-auto mt-5"
            style={{
              height: 1,
              width: 56,
              background: `rgba(248,211,118,0.3)`,
            }}
          />
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              lang={lang}
              delay={i * 0.15}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Brewing Ritual Section ───────────────────────────────────────────────

const ritualSteps = [
  {
    num: "01",
    titleAr: "اختيار الأوراق",
    titleEn: "Leaf Selection",
    descAr:
      "نختار أجود أوراق الشاي بعناية لتعكس نقاء الطعم وعمق النكهة.",
    descEn:
      "We carefully select the finest tea leaves to reflect purity of taste and depth of flavour.",
    detail: "95–100°C",
  },
  {
    num: "02",
    titleAr: "نقاء الماء",
    titleEn: "Pure Water",
    descAr: "حرارة دقيقة تُحضّر رحلة النكهة القادمة.",
    descEn: "Precise temperature prepares the journey of flavour that awaits.",
    detail: "250ml / cup",
  },
  {
    num: "03",
    titleAr: "لحظة الانسجام",
    titleEn: "The Harmony Moment",
    descAr:
      "تلتقي الأوراق بالماء وتبدأ الفخامة بالظهور تدريجيًا.",
    descEn: "Leaves meet water, and luxury slowly reveals itself.",
    detail: "3–5 min",
  },
  {
    num: "04",
    titleAr: "لحظة التقديم",
    titleEn: "The Presentation",
    descAr: "كوب من الهدوء… يُقدَّم بإتقان.",
    descEn: "A cup of calm… presented with mastery.",
    detail: "Savour",
  },
];

function BrewingRitualSection({ lang }: { lang: Lang }) {
  const { ref, inView } = useInView(0.08);

  return (
    <section
      id="ritual"
      className="py-32 relative overflow-hidden"
      style={{ background: "var(--background)" }}
      ref={ref}
    >
      {/* Full-bleed branch bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.035 }}
      >
        <img
          src={branchImg}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-24"
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              color: GOLD,
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
              color: "var(--foreground)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: lang === "ar" ? 700 : 400,
            }}
          >
            {lang === "ar" ? "طرائق التحضير" : "The Art of Brewing"}
          </h2>
          <div
            className="mx-auto mt-5"
            style={{
              height: 1,
              width: 56,
              background: `rgba(248,211,118,0.3)`,
            }}
          />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute top-3 bottom-3"
            style={{
              left: "1.5rem",
              width: 1,
              background: `linear-gradient(to bottom, rgba(248,211,118,0.4), rgba(248,211,118,0.1), transparent)`,
            }}
          />

          <div className="space-y-14">
            {ritualSteps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.75, delay: i * 0.18 }}
                className="relative flex items-start gap-10 pl-14"
              >
                {/* Number node */}
                <div
                  className="absolute left-0 w-12 h-12 rounded-full flex items-center justify-center z-10"
                  style={{
                    background: "var(--background)",
                    border: `1px solid rgba(248,211,118,0.4)`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.65rem",
                      color: GOLD,
                      letterSpacing: "0.05em",
                      fontWeight: 500,
                    }}
                  >
                    {step.num}
                  </span>
                </div>

                {/* Content */}
                <div
                  className="flex-1 pb-10"
                  style={{
                    borderBottom:
                      i < ritualSteps.length - 1
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
                        color: `rgba(248,211,118,0.45)`,
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

// ─── Philosophy Section ───────────────────────────────────────────────────

function PhilosophySection({ lang }: { lang: Lang }) {
  const { ref, inView } = useInView(0.2);

  return (
    <section
      id="philosophy"
      className="relative py-44 overflow-hidden"
      ref={ref}
    >
      {/* Photo bg */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1613158556069-e7d8eae76214?w=1920&h=900&fit=crop&auto=format')",
          backgroundColor: WINE,
        }}
      />
      {/* Wine red wash */}
      <div
        className="absolute inset-0"
        style={{ background: `rgba(116,21,24,0.85)` }}
      />
      {/* Branch overlay */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ opacity: 0.18 }}
      >
        <img
          src={branchImg}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      {/* Noise grain for texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
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
              background: `rgba(248,211,118,0.5)`,
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
            {lang === "ar"
              ? "ليس مجرد شاي… بل طقس يومي من الهدوء."
              : "Not just tea… but a daily ritual of calm."}
          </p>
          <div
            className="mx-auto mt-14"
            style={{
              height: 1,
              width: 80,
              background: `rgba(248,211,118,0.5)`,
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────

function Footer({ lang }: { lang: Lang }) {
  const footerLinks = [
    { ar: "قصتنا", en: "Our Story", href: "#story" },
    { ar: "المجموعة", en: "Collection", href: "#products" },
    { ar: "طرائق التحضير", en: "Brewing Ritual", href: "#ritual" },
    { ar: "فلسفتنا", en: "Philosophy", href: "#philosophy" },
  ];

  return (
    <footer
      className="pt-16 pb-10"
      style={{
        background: "var(--background)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Brand */}
          <div dir={lang === "ar" ? "rtl" : "ltr"}>
            <div className="flex items-center gap-3 mb-5">
              <img
                src={logoImg}
                alt="Hareer Tea"
                className="w-10 h-10 object-contain rounded-full"
              />
              <div>
                <div
                  style={{
                    fontFamily: "'Noto Kufi Arabic', serif",
                    color: GOLD,
                    fontSize: "1.2rem",
                    fontWeight: 600,
                  }}
                >
                  حرير
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: "var(--muted-foreground)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    opacity: 0.6,
                  }}
                >
                  Hareer Tea
                </div>
              </div>
            </div>
            <p
              style={{
                fontFamily:
                  lang === "ar"
                    ? "'Noto Kufi Arabic', serif"
                    : "'Inter', sans-serif",
                color: "var(--muted-foreground)",
                fontSize: "0.875rem",
                lineHeight: "1.8",
                maxWidth: "22rem",
              }}
            >
              {lang === "ar"
                ? "حيث تلتقي الأصالة بالفخامة في كل رشفة"
                : "Where authenticity meets luxury in every sip"}
            </p>
          </div>

          {/* Nav */}
          <div dir={lang === "ar" ? "rtl" : "ltr"}>
            <div
              className="mb-4"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: "var(--muted-foreground)",
                fontSize: "0.6rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                opacity: 0.5,
              }}
            >
              {lang === "ar" ? "التنقل" : "Navigate"}
            </div>
            <div className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="transition-colors duration-300"
                  style={{
                    fontFamily:
                      lang === "ar"
                        ? "'Noto Kufi Arabic', serif"
                        : "'Inter', sans-serif",
                    color: "var(--muted-foreground)",
                    fontSize: "0.875rem",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = GOLD)
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color =
                      "var(--muted-foreground)")
                  }
                >
                  {lang === "ar" ? link.ar : link.en}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div dir={lang === "ar" ? "rtl" : "ltr"}>
            <div
              className="mb-4"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: "var(--muted-foreground)",
                fontSize: "0.6rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                opacity: 0.5,
              }}
            >
              {lang === "ar" ? "تواصل معنا" : "Contact"}
            </div>
            <div className="flex flex-col gap-2.5">
              {[
                { icon: "✉", value: "hareeralamer@gmail.com" },
                { icon: "◎", value: "@hareer_ksa" },
              ].map((item) => (
                <div
                  key={item.value}
                  className="flex items-center gap-2"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: "var(--muted-foreground)",
                    fontSize: "0.875rem",
                  }}
                >
                  <span style={{ color: GOLD, opacity: 0.5, fontSize: "0.75rem" }}>
                    {item.icon}
                  </span>
                  {item.value}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "var(--muted-foreground)",
              fontSize: "0.7rem",
              opacity: 0.4,
            }}
          >
            © 2025 Hareer Tea.{" "}
            {lang === "ar" ? "جميع الحقوق محفوظة لدى قسم إن." : "All rights reserved."}
          </div>
          <div
            style={{
              fontFamily: "'Noto Kufi Arabic', serif",
              color: GOLD,
              opacity: 0.3,
              fontSize: "1rem",
              letterSpacing: "0.05em",
            }}
          >
            حرير
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────

export default function App() {
  const [isDark, setIsDark] = useState(false)
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
            onToggleDark={() => setIsDark((d) => !d)}
            lang={lang}
            onToggleLang={() => setLang((l) => (l === "ar" ? "en" : "ar"))}
          />
          <HeroSection lang={lang} />
          <GoldDivider withBranch />
          <BrandStorySection lang={lang} />
          <GoldDivider />
          <ProductsSection lang={lang} />
          <GoldDivider withBranch />
          <BrewingRitualSection lang={lang} />
          <PhilosophySection lang={lang} />
          <Footer lang={lang} />
        </>
      )}
    </div>
  );
}
