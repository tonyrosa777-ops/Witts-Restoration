"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig, navigation, meta } from "@/data/site";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      style={{ background: "rgba(20, 20, 20, 0.92)", height: "var(--nav-height-mobile)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between md:h-[var(--nav-height)]">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span
            className="text-lg font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
          >
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navigation.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-[var(--accent)]"
              style={{
                color: link.label.includes("Pricing")
                  ? "var(--accent)"
                  : "var(--text-secondary)",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={navigation.quizCta.href}
            className="text-sm font-semibold px-4 py-2 rounded-lg border transition-colors"
            style={{
              borderColor: "var(--text-secondary)",
              color: "var(--text-primary)",
            }}
          >
            {navigation.quizCta.label}
          </Link>
          <a
            href={navigation.cta.href}
            className="text-sm font-bold px-5 py-2.5 rounded-lg transition-all"
            style={{
              background: "var(--accent)",
              color: "var(--bg-base)",
            }}
          >
            📞 {navigation.cta.label}
          </a>
        </nav>

        {/* Mobile: Call CTA + Hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <a
            href={navigation.cta.href}
            className="text-sm font-bold px-4 py-2 rounded-lg"
            style={{ background: "var(--accent)", color: "var(--bg-base)" }}
          >
            📞 Call
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2"
            aria-label="Toggle menu"
            style={{ color: "var(--text-primary)" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/80"
              onClick={() => setMobileOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              ref={drawerRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[280px] flex flex-col"
              style={{ background: "var(--bg-base)" }}
            >
              <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "rgba(245,245,245,0.08)" }}>
                <span className="font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
                  Menu
                </span>
                <button onClick={() => setMobileOpen(false)} className="p-2" style={{ color: "var(--text-primary)" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 6l12 12M6 18L18 6" />
                  </svg>
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto py-4">
                {navigation.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-6 py-3 text-base font-medium transition-colors"
                    style={{
                      color: link.label.includes("Pricing")
                        ? "var(--accent)"
                        : "var(--text-secondary)",
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href={navigation.quizCta.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-6 py-3 text-base font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  🧩 {navigation.quizCta.label}
                </Link>
              </nav>
              <div className="p-4 border-t" style={{ borderColor: "rgba(245,245,245,0.08)" }}>
                <a
                  href={navigation.cta.href}
                  className="block w-full text-center font-bold py-3 rounded-lg"
                  style={{ background: "var(--accent)", color: "var(--bg-base)" }}
                >
                  📞 {navigation.cta.label}
                </a>
                <p className="mt-3 text-center text-xs" style={{ color: "var(--text-muted)" }}>
                  {meta.address}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
