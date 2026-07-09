import logoImg from "@/imports/.temp-14-14-1-image_upscayl_4x_upscayl-standard-4x.png";

import { GOLD, GOLD_TEXT } from "../constants/theme";
import { siteContent } from "../data/siteContent";
import type { Lang } from "../types";

interface FooterProps {
  lang: Lang;
}

export default function Footer({ lang }: FooterProps) {
  const content = siteContent[lang];

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
                alt={content.brand.logoAlt}
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
                  {content.brand.name}
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
                  {content.brand.englishName}
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
              {content.footer.tagline}
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
              {content.footer.navigationTitle}
            </div>

            <div className="flex flex-col gap-3">
              {content.navLinks.map((link) => (
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
                  {link.label}
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
              {content.footer.contactTitle}
            </div>

            <div className="flex flex-col gap-2.5">
              {content.footer.contactItems.map((item) => (
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
            © 2025 {content.brand.englishName}. {content.footer.copyright}
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
            {content.footer.signature}
          </div>
        </div>
      </div>
    </footer>
  );
}
