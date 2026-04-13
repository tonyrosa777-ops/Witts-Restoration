import Link from "next/link";
import { siteConfig, meta, footer, CTA } from "@/data/site";

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg-elevated)" }}>
      {/* Closing statement */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12">
        <div className="max-w-2xl">
          <p
            className="text-2xl font-bold leading-relaxed"
            style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
          >
            {footer.closingStatement}
          </p>
          <a
            href={CTA.primary}
            className="inline-flex items-center gap-2 mt-6 px-8 py-4 rounded-lg text-lg font-bold transition-all hover:shadow-lg"
            style={{ background: "var(--accent)", color: "var(--bg-base)" }}
          >
            📞 Call Zeek Now
          </a>
        </div>
      </div>

      {/* Nav + Info grid */}
      <div
        className="border-t"
        style={{ borderColor: "rgba(245,245,245,0.06)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand column */}
          <div>
            <p
              className="text-lg font-bold mb-2"
              style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
            >
              {siteConfig.name}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {footer.tagline}
            </p>
            <div className="mt-4 flex gap-3">
              {footer.social.facebook && (
                <a
                  href={footer.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium transition-colors hover:text-[var(--accent)]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Facebook
                </a>
              )}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p
              className="text-sm font-bold uppercase tracking-wider mb-4"
              style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
            >
              Quick Links
            </p>
            <nav className="flex flex-col gap-2">
              {footer.navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm transition-colors hover:text-[var(--accent)]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact + Regulatory */}
          <div>
            <p
              className="text-sm font-bold uppercase tracking-wider mb-4"
              style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
            >
              Contact
            </p>
            <div className="flex flex-col gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
              <a href={`tel:+1${meta.phoneRaw}`} className="hover:text-[var(--accent)] transition-colors">
                {meta.phone}
              </a>
              <a href={`mailto:${meta.email}`} className="hover:text-[var(--accent)] transition-colors">
                {meta.email}
              </a>
              <p>{meta.address}</p>
              <p className="font-semibold" style={{ color: "var(--text-primary)" }}>{meta.hours}</p>
            </div>
            <div className="mt-4 flex flex-col gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
              <p>{footer.regulatory.usdot} / {footer.regulatory.mc}</p>
              <p>{footer.regulatory.llc}</p>
              <p>{footer.regulatory.insurance}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{ borderColor: "rgba(245,245,245,0.04)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            {footer.legal}
          </p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            {footer.payment}
          </p>
        </div>
      </div>
    </footer>
  );
}
