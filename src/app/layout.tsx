import type { Metadata } from "next";
import { Barlow_Condensed, Inter, JetBrains_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyCallBar from "@/components/layout/StickyCallBar";
import { CartProvider } from "@/lib/cart";
import CartDrawer from "@/components/CartDrawer";
import JsonLd from "@/components/JsonLd";

import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Witt's Restoration LLC — 24/7 Towing & Auto Restoration | Groveton, NH",
    template: "%s | Witt's Restoration LLC",
  },
  description:
    "24/7 towing and recovery, auto body and paint, vehicle restoration, mobile mechanic, and snowmobile/ATV repair in Groveton, NH. Serving Coos County and the surrounding areas. Call (802) 751-5786.",
  metadataBase: new URL("https://wittsrestoration.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Witt's Restoration LLC",
    url: "https://wittsrestoration.com",
    title: "Witt's Restoration LLC — 24/7 Towing & Auto Restoration | Groveton, NH",
    description:
      "24/7 towing and recovery, auto body and paint, vehicle restoration, mobile mechanic, and snowmobile/ATV repair in Groveton, NH.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Witt's Restoration LLC — 24/7 towing and auto restoration in Groveton, NH",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Witt's Restoration LLC — 24/7 Towing & Auto Restoration",
    description:
      "24/7 towing, auto body, restoration, and mobile mechanic in Groveton, NH.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col pb-16 md:pb-0">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <StickyCallBar />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
