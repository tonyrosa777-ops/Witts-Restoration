"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navigation, CTA } from "@/data/site";

export default function StickyCallBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
        >
          <div className="flex shadow-2xl">
            <a
              href={CTA.primary}
              className="flex-1 flex items-center justify-center gap-2 py-4 font-bold text-base"
              style={{
                background: "var(--accent)",
                color: "var(--bg-base)",
                fontFamily: "var(--font-display)",
              }}
            >
              📞 {navigation.cta.label}
            </a>
            <a
              href={CTA.booking}
              className="flex-1 flex items-center justify-center gap-2 py-4 font-bold text-base"
              style={{
                background: "var(--bg-elevated)",
                color: "var(--text-primary)",
                fontFamily: "var(--font-display)",
              }}
            >
              📅 Book Service
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
