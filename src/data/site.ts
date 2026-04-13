// site.ts — Witt's Restoration LLC
// ALL copy lives here. Zero hard-coded strings in components.
// Source: initial-business-data.md, market-intelligence.md, design-system.md

export const siteConfig = {
  name: "Witt's Restoration LLC",
  tagline: "Where We Have the Witt to Make All Your Car Problems Quit",
  domain: "wittsrestoration.com",
  url: "https://wittsrestoration.com",
  description:
    "24/7 towing and recovery, auto body and paint, vehicle restoration, mobile mechanic, and snowmobile/ATV repair in Groveton, NH. Serving Coos County and the surrounding areas.",
  ogImage: "/og-image.jpg",
};

export const meta = {
  phone: "(802) 751-5786",
  phoneRaw: "8027515786",
  email: "zw25wr@gmail.com",
  address: "11 West St, Groveton, NH 03582",
  city: "Groveton",
  state: "NH",
  zip: "03582",
  county: "Coos County",
  hours: "24/7 — Emergency towing available anytime",
  usdot: "4507783",
  mc: "1784194",
  llcNumber: "996802",
  insurance: "$750,000 BIPD",
  social: {
    facebook: "https://www.facebook.com/WittsRestoration",
  },
};

// CTA href constants — per build-log Error #41: enforce consistent routing
export const CTA = {
  primary: "tel:+18027515786",
  booking: "/booking",
  quiz: "/quiz",
  contact: "/contact",
  gallery: "/gallery",
} as const;

export const hero = {
  eyebrow: "24/7 Towing & Auto Restoration — Groveton, NH",
  subheadline:
    "Stuck in a ditch at 2 AM? Rust eating your truck alive? From emergency towing to full restorations, Zeek handles it all. One shop, one guy, one call.",
  ctaPrimary: "Call Now — 24/7",
  ctaSecondary: "What Does Your Vehicle Need?",
  trustMicro: [
    "⚡ 24/7 Emergency Response",
    "🛡️ $750K Fully Insured",
    "✅ Zero Safety Violations",
  ],
};

export const services = [
  {
    name: "24/7 Towing & Recovery",
    slug: "towing-recovery",
    emoji: "🚛",
    shortDescription: "Local tows, long-distance hauls, winch-outs, accident recovery. Licensed in all 50 states.",
    startingAt: "$75 + $4/mile",
  },
  {
    name: "Mobile Mechanic",
    slug: "mobile-mechanic",
    emoji: "🔧",
    shortDescription: "Brakes, bearings, fluids, and more. I come to you — your driveway, your yard, wherever you are.",
    startingAt: "$75/hr + $35 trip",
  },
  {
    name: "Auto Body & Paint",
    slug: "auto-body-paint",
    emoji: "🎨",
    shortDescription: "Rust repair, panel replacement, welding, paint matching, bedliner. Make it look like new.",
    startingAt: "Quote required",
  },
  {
    name: "Vehicle Restoration",
    slug: "vehicle-restoration",
    emoji: "🔩",
    shortDescription: "Full restorations on trucks, classic cars, and project vehicles. If you've been putting it off, let's go.",
    startingAt: "Quote required",
  },
  {
    name: "Mechanical Repair",
    slug: "mechanical-repair",
    emoji: "⚙️",
    shortDescription: "Brakes, suspension, engine work, transmission, cooling, fuel system. Diesel and gas.",
    startingAt: "Quote required",
  },
  {
    name: "Winch-Out Service",
    slug: "winch-out",
    emoji: "🪝",
    shortDescription: "Stuck in a ditch, snowbank, or mud? I'll pull you out. Day or night, any weather.",
    startingAt: "$95",
  },
  {
    name: "Custom Fabrication",
    slug: "custom-fabrication",
    emoji: "🔥",
    shortDescription: "Welding, frame work, patch panels, custom cross members. If the part doesn't exist, I'll make it.",
    startingAt: "Quote required",
  },
  {
    name: "Headlight Restoration",
    slug: "headlight-restoration",
    emoji: "💡",
    shortDescription: "Yellowed, oxidized headlights wet-sanded and polished to crystal clear. See the road again.",
    startingAt: "$99",
  },
  {
    name: "Snowmobile & ATV Repair",
    slug: "snowmobile-atv",
    emoji: "🏔️",
    shortDescription: "Clutch kits, carb rebuilds, chain case repair, pre-season inspections. Get trail-ready.",
    startingAt: "$70/hr",
  },
];

export const painPoints = [
  {
    emoji: "😰",
    title: "Stranded on the road",
    description: "Broke down on Route 3 at midnight with no cell signal and no idea who to call.",
  },
  {
    emoji: "💸",
    title: "Paying dealership prices",
    description: "Driving 45 minutes to Berlin or Lancaster just to get told they can't fit you in for two weeks.",
  },
  {
    emoji: "🦊",
    title: "Rust eating your truck",
    description: "Failed inspection because the rockers are gone, and nobody locally can do the work.",
  },
  {
    emoji: "🏚️",
    title: "Project sitting in the yard",
    description: "That truck or classic car you've been meaning to fix up for years, but can't find anyone to do it right.",
  },
];

export const stats = [
  { emoji: "🔧", value: 100, suffix: "+", label: "Jobs Completed" },
  { emoji: "⚡", value: 24, suffix: "/7", label: "Emergency Availability" },
  { emoji: "🛡️", value: 0, suffix: "", label: "Safety Violations" },
];

export const processSteps = [
  { emoji: "📞", title: "Call or Text", description: "Reach Zeek directly at (802) 751-5786. Day or night." },
  { emoji: "🚛", title: "I'm On My Way", description: "For emergencies, I'm rolling within minutes. For scheduled work, we pick a time that works." },
  { emoji: "✅", title: "Job Done Right", description: "Great work or no work. You get honest pricing, quality repairs, and a vehicle that's ready to roll." },
];

export const testimonials = [
  // 5 real testimonials from Facebook — initial-business-data.md Section 7
  {
    name: "David Rowe",
    text: "Thank you for installing my new water pump in my Ford, always a pleasure dealing with you and you do top notch work! Will always bring you my business.",
    service: "Mechanical Repair",
    featured: true,
  },
  {
    name: "Julia Prince",
    text: "Thank you so much! It is so clean! You did a great job!!",
    service: "Detailing",
    featured: false,
  },
  {
    name: "Jay Gates",
    text: "He does an amazing job.",
    service: "Mechanical Repair",
    featured: false,
  },
  {
    name: "Annette Unsworth",
    text: "You have so much talent.",
    service: "Vehicle Restoration",
    featured: false,
  },
  {
    name: "Christian Laflamme",
    text: "Looks amazing boss great work keep up the outstanding work!!!!",
    service: "Vehicle Restoration",
    featured: true,
  },
  // Remaining 31 testimonials to be written by content-writer agent
  // [DEMO COPY — pending content-writer agent]
];

export const about = {
  ownerName: "Zeek Witt",
  ownerTitle: "Owner & Operator",
  story: "", // [DEMO COPY — pending content-writer agent]
  beliefs: [
    { emoji: "💪", text: "Great work or no work" },
    { emoji: "🤝", text: "Treat every vehicle like it's our own" },
    { emoji: "⏰", text: "Show up when we say we will" },
    { emoji: "🌨️", text: "Working when everyone else doesn't want to" },
  ],
};

export const navigation = {
  links: [
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Gallery", href: "/gallery" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  cta: { label: "Call Now — 24/7", href: "tel:+18027515786" },
  quizCta: { label: "Take the Quiz", href: "/quiz" },
};

export const footer = {
  tagline: "From the ditch to the dream build. One shop, one guy, one call.",
  regulatory: {
    usdot: "USDOT: 4507783",
    mc: "MC: 1784194",
    llc: "NH LLC #996802 — Good Standing",
    insurance: "Fully Insured — $750,000 BIPD",
  },
  payment: "We accept Visa, Mastercard, American Express via Square.",
};
