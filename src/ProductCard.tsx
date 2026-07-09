import { useEffect } from "react";
import { motion } from "motion/react";

import logoImg from "./imports/.temp-14-14-1-image_upscayl_4x_upscayl-standard-4x.png";
import { GOLD } from "./constants/theme";
import { siteContent } from "./data/siteContent";;

interface LoadingScreenProps {
  onDone: () => void;
}

export default function LoadingScreen({ onDone }: LoadingScreenProps) {
  const content = siteContent.ar;

  useEffect(() => {
    const timer = setTimeout(onDone, 2800);
    return () => clearTimeout(timer);
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
          alt={content.brand.logoAlt}
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
          {content.brand.name}
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
          {content.loading.subtitle}
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
