// JSON-LD structured data — AutoRepair + TowingService
// Per design-system.md Section 11: dual schema types
// Per market-intelligence.md Section 6: no competitor uses structured data

import { siteConfig, meta } from "@/data/site";

const autoRepairSchema = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: meta.phone,
  email: meta.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "11 West St",
    addressLocality: "Groveton",
    addressRegion: "NH",
    postalCode: "03582",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 44.5978,
    longitude: -71.5117,
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 44.5978,
      longitude: -71.5117,
    },
    geoRadius: "80467", // 50 miles in meters
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday", "Tuesday", "Wednesday", "Thursday",
      "Friday", "Saturday", "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
  priceRange: "$$",
  paymentAccepted: "Visa, Mastercard, American Express",
  sameAs: [meta.social.facebook],
  image: `${siteConfig.url}/og-image.jpg`,
};

const towingServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Towing Service",
  provider: {
    "@type": "AutoRepair",
    name: siteConfig.name,
    url: siteConfig.url,
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 44.5978,
      longitude: -71.5117,
    },
    geoRadius: "80467",
  },
  description:
    "24/7 towing and recovery, winch-outs, accident recovery, and long-distance hauls. FMCSA licensed to operate in all 50 states. USDOT 4507783, MC 1784194.",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "75",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "75",
      priceCurrency: "USD",
      unitText: "base fee + $4/mile",
    },
  },
  availableChannel: {
    "@type": "ServiceChannel",
    servicePhone: {
      "@type": "ContactPoint",
      telephone: meta.phone,
      contactType: "Emergency",
      availableLanguage: "English",
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday", "Tuesday", "Wednesday", "Thursday",
          "Friday", "Saturday", "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    },
  },
};

export default function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(autoRepairSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(towingServiceSchema),
        }}
      />
    </>
  );
}
