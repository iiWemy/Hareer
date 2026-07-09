import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Globe, Menu, Moon, Sun, X } from "lucide-react";

import logoImg from "@/imports/hareer-logo.png";
import type { Lang } from "../types";
import { GOLD } from "../constants/theme";

interface NavbarProps {
  isDark: boolean;
  onToggleDark: () => void;
  lang: Lang;
  onToggleLang: () => void;
}

export default function Navbar({
  isDark,
  onToggleDark,
  lang,
  onToggleLang,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
      }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.15 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
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
              onMouseEnter={(event) => {
                event.currentTarget.style.color = GOLD;
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.color = "var(--muted-foreground)";
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

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
            onMouseEnter={(event) => {
              event.currentTarget.style.color = GOLD;
              event.currentTarget.style.borderColor = "rgba(248,211,118,0.35)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.color = "var(--muted-foreground)";
              event.currentTarget.style.borderColor = "var(--border)";
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
            onMouseEnter={(event) => {
              event.currentTarget.style.color = GOLD;
              event.currentTarget.style.borderColor = "rgba(248,211,118,0.4)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.color = "var(--muted-foreground)";
              event.currentTarget.style.borderColor = "var(--border)";
            }}
          >
            {isDark ? <Sun size={13} /> : <Moon size={13} />}
          </button>

          <button
            className="md:hidden w-9 h-9 flex items-center justify-center transition-colors duration-300"
            style={{ color: "var(--muted-foreground)" }}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

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
