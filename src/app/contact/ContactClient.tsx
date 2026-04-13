"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FadeUp from "@/components/animations/FadeUp";

import SlideIn from "@/components/animations/SlideIn";
import RisingAsh from "@/components/animations/RisingAsh";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

interface Props {
  meta: {
    phone: string;
    phoneRaw: string;
    email: string;
    address: string;
    hours: string;
    usdot: string;
    mc: string;
    insurance: string;
  };
  siteConfig: { name: string };
}

export default function ContactClient({ meta, siteConfig }: Props) {
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) return;

    setSubmitState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (res.ok) {
        setSubmitState("success");
        reset();
      } else {
        setSubmitState("error");
      }
    } catch {
      setSubmitState("error");
    }
  };

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent("11 West St, Groveton, NH 03582")}&output=embed`;

  const inputStyles: React.CSSProperties = {
    background: "var(--bg-elevated)",
    border: "1px solid rgba(245,245,245,0.15)",
    color: "var(--text-primary)",
  };

  return (
    <>
      {/* Page Header */}
      <section
        className="relative overflow-hidden py-16 md:py-24"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(212,160,23,0.08), transparent 70%)",
        }}
      >
        <RisingAsh />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <FadeUp>
            <h1 className="hero-shimmer font-display text-display text-center">
              Get In Touch
            </h1>
            <p
              className="font-body text-lg text-center mt-4 max-w-2xl mx-auto"
              style={{ color: "var(--text-secondary)" }}
            >
              Emergency? Call now. Everything else? Send a message.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Form + Sidebar */}
      <section className="py-16 md:py-24" style={{ background: "var(--bg-elevated)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Contact Form */}
            <SlideIn direction="left" className="md:col-span-2">
              <div
                className="rounded-xl p-6 md:p-8"
                style={{ background: "var(--bg-card)" }}
              >
                <h2
                  className="font-display text-h3 mb-6"
                  style={{ color: "var(--text-primary)" }}
                >
                  Send a Message
                </h2>

                {submitState === "success" ? (
                  <div
                    className="rounded-lg p-6 text-center"
                    style={{
                      background: "rgba(212,160,23,0.1)",
                      border: "1px solid rgba(212,160,23,0.2)",
                    }}
                  >
                    <span className="text-3xl block mb-2">✅</span>
                    <p
                      className="font-display text-h4"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Message sent.
                    </p>
                    <p
                      className="font-body text-sm mt-2"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Zeek will get back to you as soon as possible.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                      <label
                        className="block font-body text-sm mb-1.5"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Name
                      </label>
                      <input
                        {...register("name")}
                        type="text"
                        placeholder="Your name"
                        className="w-full rounded-lg px-4 py-3 font-body text-base placeholder:opacity-40 focus:outline-none transition-all duration-200"
                        style={{
                          ...inputStyles,
                          ...(errors.name
                            ? { borderColor: "#EF4444" }
                            : {}),
                        }}
                        onFocus={(e) => {
                          if (!errors.name) {
                            e.currentTarget.style.borderColor = "var(--accent)";
                            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(212,160,23,0.15)";
                          }
                        }}
                        onBlur={(e) => {
                          if (!errors.name) {
                            e.currentTarget.style.borderColor = "rgba(245,245,245,0.15)";
                            e.currentTarget.style.boxShadow = "none";
                          }
                        }}
                      />
                      {errors.name && (
                        <p className="text-sm mt-1" style={{ color: "#EF4444" }}>
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        className="block font-body text-sm mb-1.5"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Email
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="you@example.com"
                        className="w-full rounded-lg px-4 py-3 font-body text-base placeholder:opacity-40 focus:outline-none transition-all duration-200"
                        style={{
                          ...inputStyles,
                          ...(errors.email
                            ? { borderColor: "#EF4444" }
                            : {}),
                        }}
                        onFocus={(e) => {
                          if (!errors.email) {
                            e.currentTarget.style.borderColor = "var(--accent)";
                            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(212,160,23,0.15)";
                          }
                        }}
                        onBlur={(e) => {
                          if (!errors.email) {
                            e.currentTarget.style.borderColor = "rgba(245,245,245,0.15)";
                            e.currentTarget.style.boxShadow = "none";
                          }
                        }}
                      />
                      {errors.email && (
                        <p className="text-sm mt-1" style={{ color: "#EF4444" }}>
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        className="block font-body text-sm mb-1.5"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Phone
                      </label>
                      <input
                        {...register("phone")}
                        type="tel"
                        placeholder="(555) 555-5555"
                        className="w-full rounded-lg px-4 py-3 font-body text-base placeholder:opacity-40 focus:outline-none transition-all duration-200"
                        style={{
                          ...inputStyles,
                          ...(errors.phone
                            ? { borderColor: "#EF4444" }
                            : {}),
                        }}
                        onFocus={(e) => {
                          if (!errors.phone) {
                            e.currentTarget.style.borderColor = "var(--accent)";
                            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(212,160,23,0.15)";
                          }
                        }}
                        onBlur={(e) => {
                          if (!errors.phone) {
                            e.currentTarget.style.borderColor = "rgba(245,245,245,0.15)";
                            e.currentTarget.style.boxShadow = "none";
                          }
                        }}
                      />
                      {errors.phone && (
                        <p className="text-sm mt-1" style={{ color: "#EF4444" }}>
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        className="block font-body text-sm mb-1.5"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Message
                      </label>
                      <textarea
                        {...register("message")}
                        rows={5}
                        placeholder="Tell me what you need..."
                        className="w-full rounded-lg px-4 py-3 font-body text-base placeholder:opacity-40 focus:outline-none transition-all duration-200 resize-y"
                        style={{
                          ...inputStyles,
                          ...(errors.message
                            ? { borderColor: "#EF4444" }
                            : {}),
                        }}
                        onFocus={(e) => {
                          if (!errors.message) {
                            e.currentTarget.style.borderColor = "var(--accent)";
                            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(212,160,23,0.15)";
                          }
                        }}
                        onBlur={(e) => {
                          if (!errors.message) {
                            e.currentTarget.style.borderColor = "rgba(245,245,245,0.15)";
                            e.currentTarget.style.boxShadow = "none";
                          }
                        }}
                      />
                      {errors.message && (
                        <p className="text-sm mt-1" style={{ color: "#EF4444" }}>
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {submitState === "error" && (
                      <p className="text-sm" style={{ color: "#EF4444" }}>
                        Something went wrong. Please call {meta.phone} instead.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={submitState === "loading"}
                      className="w-full rounded-lg px-8 py-4 text-lg font-bold transition-all duration-300 disabled:opacity-50 cursor-pointer"
                      style={{
                        background: "var(--accent)",
                        color: "var(--bg-base)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "0 0 20px rgba(212,160,23,0.4)";
                        e.currentTarget.style.filter = "brightness(1.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.filter = "none";
                      }}
                    >
                      {submitState === "loading" ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                )}
              </div>
            </SlideIn>

            {/* Contact Info Sidebar */}
            <SlideIn direction="right" delay={0.15}>
              <div className="space-y-6">
                {/* Phone */}
                <div
                  className="rounded-xl p-6"
                  style={{ background: "var(--bg-card)" }}
                >
                  <span className="text-2xl block mb-2">📞</span>
                  <h3
                    className="font-display text-h4 mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Phone
                  </h3>
                  <a
                    href={`tel:+1${meta.phoneRaw}`}
                    className="font-mono text-base transition-colors duration-200"
                    style={{ color: "var(--accent)" }}
                  >
                    {meta.phone}
                  </a>
                </div>

                {/* Email */}
                <div
                  className="rounded-xl p-6"
                  style={{ background: "var(--bg-card)" }}
                >
                  <span className="text-2xl block mb-2">📧</span>
                  <h3
                    className="font-display text-h4 mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Email
                  </h3>
                  <a
                    href={`mailto:${meta.email}`}
                    className="font-body text-base transition-colors duration-200"
                    style={{ color: "var(--accent)" }}
                  >
                    {meta.email}
                  </a>
                </div>

                {/* Address */}
                <div
                  className="rounded-xl p-6"
                  style={{ background: "var(--bg-card)" }}
                >
                  <span className="text-2xl block mb-2">📍</span>
                  <h3
                    className="font-display text-h4 mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Address
                  </h3>
                  <p
                    className="font-body text-base"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {meta.address}
                  </p>
                </div>

                {/* Hours */}
                <div
                  className="rounded-xl p-6"
                  style={{ background: "var(--bg-card)" }}
                >
                  <span className="text-2xl block mb-2">🕐</span>
                  <h3
                    className="font-display text-h4 mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Hours
                  </h3>
                  <p
                    className="font-body text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {meta.hours}
                  </p>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Map */}
      <section
        className="py-16 md:py-24"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(212,160,23,0.06), transparent 70%)",
        }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <FadeUp>
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: "1px solid rgba(245,245,245,0.05)" }}
            >
              <iframe
                src={mapSrc}
                width="100%"
                height="400"
                style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map showing ${siteConfig.name} at ${meta.address}`}
              />
            </div>
          </FadeUp>

          {/* FMCSA Info */}
          <FadeUp delay={0.1}>
            <div className="mt-8 text-center">
              <p
                className="font-mono text-xs"
                style={{ color: "var(--text-muted)" }}
              >
                USDOT {meta.usdot} &middot; MC {meta.mc} &middot;{" "}
                {meta.insurance} &middot; {siteConfig.name}
              </p>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
