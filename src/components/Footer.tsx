import logoImg from "@/imports/.temp-14-14-1-image_upscayl_4x_upscayl-standard-4x.png";

import type { Lang } from "../types";
import { GOLD, GOLD_TEXT } from "../constants/theme";

interface FooterProps {
  lang: Lang;
}

const footerLinks = [
  { ar: "قصتنا", en: "Our Story", href: "#story" },
  { ar: "المجموعة", en: "Collection", href: "#products" },
  { ar: "طرائق التحضير", en: "Brewing Ritual", href: "#ritual" },
  { ar: "فلسفتنا", en: "Philosophy", href: "#philosophy" },
];

const contactItems = [
  { icon: "✉", value: "hareeralamer@gmail.com" },
  { icon: "◎", value: "@hareer_ksa" },
];

export default function Footer({ lang }: FooterProps) {
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
                    color: GOLD_TEXT,
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
                  onMouseEnter={(event) => {
                    event.currentTarget.style.color = GOLD;
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.color = "var(--muted-foreground)";
                  }}
                >
                  {lang === "ar" ? link.ar : link.en}
                </a>
              ))}
            </div>
          </div>

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
              {contactItems.map((item) => (
                <div
                  key={item.value}
                  className="flex items-center gap-2"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: "var(--muted-foreground)",
                    fontSize: "0.875rem",
                  }}
                >
                  <span
                    style={{
                      color: GOLD_TEXT,
                      opacity: 0.5,
                      fontSize: "0.75rem",
                    }}
                  >
                    {item.icon}
                  </span>
                  {item.value}
                </div>
              ))}
            </div>
          </div>
        </div>

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
              color: GOLD_TEXT,
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
