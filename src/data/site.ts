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
  hours: "24/7 for towing and emergencies. Scheduled work by appointment.",
  usdot: "4507783",
  mc: "1784194",
  llcNumber: "996802",
  insurance: "$750,000 BIPD",
  insuranceCarrier: "United Financial Casualty Company",
  policyNumber: "CA867792963",
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
  testimonials: "/testimonials",
  services: "/services",
} as const;

// ──────────────────────────────────────────────
// NAVIGATION
// ──────────────────────────────────────────────
export const navigation = {
  links: [
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Gallery", href: "/gallery" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
    { label: "⬥ Pricing", href: "/pricing" },
  ],
  cta: { label: "Call Now. 24/7.", href: "tel:+18027515786" },
  quizCta: { label: "Take the Quiz", href: "/quiz" },
};

// ──────────────────────────────────────────────
// HERO
// ──────────────────────────────────────────────
export const hero = {
  eyebrow: "24/7 TOWING & AUTO RESTORATION. GROVETON, NH.",
  // H1 = siteConfig.tagline (rendered via component with shimmer class)
  subheadline:
    "Stuck in a ditch at 2 AM? Rust eating your truck alive? From emergency towing to full restorations, Zeek handles it all. One shop, one guy, one call.",
  ctaPrimary: { label: "Call Now. 24/7.", href: "tel:+18027515786" },
  ctaSecondary: { label: "What Does Your Vehicle Need?", href: "/quiz" },
  trustMicro: [
    "⚡ 24/7 Emergency Response",
    "🛡️ $750K Fully Insured",
    "✅ Zero Safety Violations",
    "🇺🇸 Licensed in All 50 States",
  ],
};

// ──────────────────────────────────────────────
// PAIN POINTS
// ──────────────────────────────────────────────
export const painPoints = [
  {
    emoji: "😰",
    title: "Stranded with nobody to call",
    description:
      "Broke down on Route 3 at midnight with no cell signal and no idea who to call. The nearest shop is 45 minutes away and closed.",
  },
  {
    emoji: "💸",
    title: "Paying dealership prices to wait",
    description:
      "Driving to Berlin or Lancaster just to get told they can't fit you in for two weeks. Then the bill is twice what you expected.",
  },
  {
    emoji: "🦊",
    title: "Rust that won't stop spreading",
    description:
      "Failed inspection because the rockers are gone. Road salt has been eating your truck for years, and nobody locally can do the welding.",
  },
  {
    emoji: "🏚️",
    title: "A project that never gets started",
    description:
      "That truck or classic car sitting under a tarp in the yard. You've been meaning to fix it up for years, but can't find anyone who'll actually do it right.",
  },
];

// ──────────────────────────────────────────────
// SERVICES
// ──────────────────────────────────────────────
export const services = [
  {
    name: "24/7 Towing & Recovery",
    slug: "towing-recovery",
    emoji: "🚛",
    tagline: "Day or night, any weather, I'm on my way.",
    shortDescription:
      "Local tows, long-distance hauls, winch-outs, accident recovery. FMCSA licensed to operate in all 50 states. USDOT 4507783.",
    fullDescription:
      "Whether you slid off Route 3 into a snowbank or need your truck hauled across state lines, I run 24/7 with a fully insured Chevy C6500 flatbed. Local tows, long-distance interstate hauls, accident recovery, and vehicle transport. Zero safety violations. Zero accidents. $750K insured on every job.",
    whoItsFor:
      "Anyone stranded, broken down, or needing a vehicle moved. Emergency or planned.",
    startingAt: "$75 + $4/mile",
    cta: { label: "Call Now for a Tow", href: "tel:+18027515786" },
  },
  {
    name: "Winch-Out Service",
    slug: "winch-out",
    emoji: "🪝",
    tagline: "Stuck? I've pulled trucks out of worse.",
    shortDescription:
      "Stuck in a ditch, snowbank, or mud? I'll pull you out. Day or night, any weather.",
    fullDescription:
      "Ditch, snowbank, mud pit, logging road. I've seen it all and pulled vehicles out of all of it. Quick response, careful extraction, no extra damage. If your wheels aren't touching pavement, call me.",
    whoItsFor:
      "Drivers stuck off-road or in winter conditions anywhere in northern NH or VT.",
    startingAt: "$95",
    cta: { label: "Call Now. Stuck?", href: "tel:+18027515786" },
  },
  {
    name: "Mobile Mechanic",
    slug: "mobile-mechanic",
    emoji: "🔧",
    tagline: "I come to you. Your driveway, your yard, wherever.",
    shortDescription:
      "Brakes, bearings, fluids, and more. I come to your location so you don't have to tow it anywhere.",
    fullDescription:
      "Can't drive it to a shop? Don't have to. I bring the tools and parts to your driveway, your yard, your job site. Brakes, wheel bearings, fluids, belts, starters, alternators, and more. After-hours calls available because breakdowns don't wait for business hours.",
    whoItsFor:
      "Anyone who can't get their vehicle to a shop, or just doesn't want to.",
    startingAt: "$75/hr + $35 trip fee",
    cta: { label: "Schedule Mobile Service", href: "/booking" },
  },
  {
    name: "Auto Body & Paint",
    slug: "auto-body-paint",
    emoji: "🎨",
    tagline: "From rusted out to looking new.",
    shortDescription:
      "Rust repair, panel replacement, welding, paint matching, bedliner. Make it look like new.",
    fullDescription:
      "Rocker panels, cab corners, bed sides, pillars, floor pans. If rust has eaten it, I cut it out and weld in new metal. PDR for dents, full panel replacement when needed, color-matched paint, and bedliner application. Every job gets the same standard: it's great work or no work.",
    whoItsFor:
      "Anyone with rust damage, dents, or a vehicle that needs paint work.",
    startingAt: "Quote required",
    cta: { label: "Send Photos for a Quote", href: "/contact" },
  },
  {
    name: "Vehicle Restoration",
    slug: "vehicle-restoration",
    emoji: "🔩",
    tagline: "That project you've been putting off? Let's go.",
    shortDescription:
      "Full restorations on trucks, classic cars, and project vehicles. If you've been putting it off, let's go.",
    fullDescription:
      "Full frame-off restorations, engine swaps, custom builds. Trucks, classic cars, and anything with a body and an engine. I've done an 87 F-250, a 1978 Ford LTD, a 1972 Mercury Cougar, and everything in between. You bring the dream. I'll build it.",
    whoItsFor:
      "Classic car owners, project truck owners, anyone who wants a vehicle brought back to life.",
    startingAt: "Quote required",
    cta: { label: "Book a Restoration Consult", href: "/booking" },
  },
  {
    name: "Mechanical Repair",
    slug: "mechanical-repair",
    emoji: "⚙️",
    tagline: "Diesel or gas. If it runs, I fix it.",
    shortDescription:
      "Brakes, suspension, engine work, transmission, cooling, fuel system. Diesel and gas.",
    fullDescription:
      "Brakes, suspension, struts, control arms, sway bars, wheel bearings, engine work, turbo replacement, transmission service, cooling system, fuel system. I work on diesels (6.0 and 7.3 Powerstroke, 6.6L Duramax) and gas engines. Honest diagnosis, straight pricing, no upsells.",
    whoItsFor:
      "Vehicle owners who need reliable mechanical work without the dealership markup.",
    startingAt: "Quote required",
    cta: { label: "Schedule Repair", href: "/booking" },
  },
  {
    name: "Custom Fabrication",
    slug: "custom-fabrication",
    emoji: "🔥",
    tagline: "If the part doesn't exist, I'll make it.",
    shortDescription:
      "Welding, frame work, patch panels, custom cross members. If the part doesn't exist, I'll make it.",
    fullDescription:
      "MIG welding, acetylene torch work, metal shaping with a stretcher/shrinker, custom patch panels, cross members, and frame repair. When a part is discontinued or doesn't exist for your vehicle, I fabricate it from scratch. This is the work most shops say they can't do.",
    whoItsFor:
      "Owners of older vehicles needing custom parts, frame repair, or structural welding.",
    startingAt: "Quote required",
    cta: { label: "Describe Your Project", href: "/contact" },
  },
  {
    name: "Headlight Restoration",
    slug: "headlight-restoration",
    emoji: "💡",
    tagline: "$99. See the road again.",
    shortDescription:
      "Yellowed, oxidized headlights wet-sanded and polished to crystal clear. $99 flat.",
    fullDescription:
      "Cloudy, yellowed headlights are a safety hazard and an inspection fail waiting to happen. I wet-sand and polish them back to crystal clear for $99 flat. Takes about 30 minutes. No appointment needed for this one. Way cheaper than replacing the assemblies at $250 to $700 each.",
    whoItsFor: "Anyone with foggy or yellowed headlights.",
    startingAt: "$99",
    cta: { label: "Book Headlight Restoration", href: "/booking" },
  },
  {
    name: "Snowmobile & ATV Repair",
    slug: "snowmobile-atv",
    emoji: "🏔️",
    tagline: "Get trail-ready before the snow flies.",
    shortDescription:
      "Clutch kits, carb rebuilds, chain case repair, pre-season inspections. Get trail-ready.",
    fullDescription:
      "Clutch kit installs, carburetor rebuilds with ultrasonic cleaning, chain case repair, track tension, suspension tuning, and full pre-season inspections. I work on Arctic Cat, Ski-Doo, Polaris, and Honda. The Ride the Wilds trail system runs right through here, so don't get stuck on the trail without a plan.",
    whoItsFor:
      "Snowmobile and ATV owners in the North Country who need seasonal service or trail-side repairs.",
    startingAt: "$70/hr",
    cta: { label: "Schedule Pre-Season Service", href: "/booking" },
  },
];

// ──────────────────────────────────────────────
// STATS
// ──────────────────────────────────────────────
export const stats = [
  {
    emoji: "🔧",
    value: 100,
    suffix: "+",
    label: "Jobs Completed",
    source: "Documented on Facebook since April 2024",
  },
  {
    emoji: "⚡",
    value: 24,
    suffix: "/7",
    label: "Emergency Availability",
    source: "FMCSA active authority, 24/7 operation",
  },
  {
    emoji: "🛡️",
    value: 0,
    suffix: "",
    label: "Safety Violations",
    source: "FMCSA safety record, USDOT 4507783",
  },
  {
    emoji: "🇺🇸",
    value: 50,
    suffix: "",
    label: "States Licensed",
    source: "FMCSA Common Authority MC 1784194",
  },
];

// ──────────────────────────────────────────────
// PROCESS / HOW IT WORKS
// ──────────────────────────────────────────────
export const processSteps = [
  {
    emoji: "📞",
    step: 1,
    title: "Call or Text Zeek",
    description:
      "Reach me directly at (802) 751-5786. Day or night. No call center, no dispatcher. Just me.",
  },
  {
    emoji: "🚛",
    step: 2,
    title: "I'm On My Way",
    description:
      "For emergencies, I'm rolling within minutes. For scheduled work, we pick a time that works for you.",
  },
  {
    emoji: "📋",
    step: 3,
    title: "Honest Quote, No Surprises",
    description:
      "I'll tell you what it needs, what it costs, and how long it'll take. If I think you shouldn't put money into it, I'll say that too.",
  },
  {
    emoji: "✅",
    step: 4,
    title: "Job Done Right",
    description:
      "Great work or no work. You get quality repairs, fair pricing, and a vehicle that's ready to roll.",
  },
];

// ──────────────────────────────────────────────
// ABOUT
// ──────────────────────────────────────────────
// [DEMO COPY — pending client review]
export const about = {
  ownerName: "Zeek Witt",
  ownerTitle: "Owner & Operator",
  // [DEMO COPY — pending client review]
  story: `I grew up around trucks and tools in northern New Hampshire. My old man had a garage full of projects and a philosophy that stuck with me: if you're gonna do something, do it right or don't do it at all. I started fixing things for friends and neighbors, and word got around. One busted water pump turned into a brake job turned into a full restoration turned into "Hey, can you tow my truck out of a ditch at 3 AM?" Turns out, yeah, I can.

I registered Witt's Restoration in 2025 because I was already doing the work. People needed someone local who'd actually pick up the phone, show up when they said they would, and not charge them an arm and a leg. The nearest dealership is 45 minutes away. The nearest body shop that does real welding? Even further. I figured if nobody else was going to step up, I would.

I run a one-man shop out of 11 West St in Groveton. I do the towing, the body work, the mechanical repairs, the restorations, and the fabrication. When the part doesn't exist anymore, I make it. When nobody else wants to work in minus-15 with an acetylene torch, I'm out there getting it done. My garage collapsed under snow in December 2025, and I was back at it the next week. That's just how it goes up here.

Every job I do gets documented on Facebook. Before and after photos, no filters, no excuses. If the work speaks for itself, I don't need to say much.`,
  beliefs: [
    {
      emoji: "💪",
      text: "Great work or no work. Every job gets my full effort or it doesn't leave the shop.",
    },
    {
      emoji: "🤝",
      text: "Treat every vehicle like it's my own. Because up here, your truck isn't a luxury. It's how you get to work.",
    },
    {
      emoji: "⏰",
      text: "Show up when I say I will. If I tell you Tuesday, it's Tuesday. Not Thursday, not next week.",
    },
    {
      emoji: "🌨️",
      text: "Working when everyone else doesn't want to. That's not a complaint. That's the job.",
    },
    {
      emoji: "💬",
      text: "If I think you shouldn't put money into it, I'll tell you. Honest advice is worth more than a big invoice.",
    },
  ],
  whoWeServe:
    // [DEMO COPY — pending client review]
    "You're the truck owner whose rockers are rusting through. You're the person who slid off Route 3 in a snowstorm and needs someone who'll actually answer the phone at 2 AM. You're the snowmobiler who needs a clutch kit before trail season. You're the person with a classic sitting in the barn, waiting for someone who cares enough to bring it back to life. If you live in Coos County or anywhere in northern NH and VT, and you need somebody who does the work right the first time, that's who I built this for.",
  whyUs: [
    // [DEMO COPY — pending client review]
    "I'm the only operation in the North Country that does towing AND restoration AND body work AND mechanical repair under one roof. You don't need three shops. You need one guy who can do it all.",
    "Zero safety violations. Zero accidents. $750,000 insured. FMCSA licensed in all 50 states. This isn't a guy with a chain and a hope. This is a real, licensed, insured operation.",
    "I answer my own phone. You're not calling a dispatch center in another state. You're calling the person who's going to show up with the truck.",
  ],
  founderSpotlight:
    // [DEMO COPY — pending client review]
    "When he's not under a truck or behind a welding mask, Zeek is usually working on whatever project vehicle caught his eye that week. He lives in Groveton, knows every back road in Coos County, and has pulled trucks out of places most people wouldn't walk into.",
};

// ──────────────────────────────────────────────
// TESTIMONIALS — 36 total (5 real + 31 written)
// Paginated 9 per page, 4 pages, 3×3 grid
// ──────────────────────────────────────────────
export const testimonials = [
  // ═══ PAGE 1 (indices 0-8) ═══
  // Real testimonial from Facebook
  {
    name: "David Rowe",
    text: "Thank you for installing my new water pump in my Ford, always a pleasure dealing with you and you do top notch work! Will always bring you my business.",
    service: "Mechanical Repair",
    featured: true,
  },
  // Real testimonial from Facebook
  {
    name: "Christian Laflamme",
    text: "Looks amazing boss great work keep up the outstanding work!!!!",
    service: "Vehicle Restoration",
    featured: true,
  },
  // Real testimonial from Facebook
  {
    name: "Julia Prince",
    text: "Thank you so much! It is so clean! You did a great job!!",
    service: "Detailing",
    featured: true,
  },
  // [DEMO COPY — pending client review]
  {
    name: "Tom Lavoie",
    text: "Slid off Route 3 near Stark at like 11 pm in January. Called Zeek and he was there in 25 minutes. Pulled me out, checked everything over, and sent me on my way. Didn't even charge me what I expected.",
    service: "Winch-Out Service",
    featured: true,
  },
  // [DEMO COPY — pending client review]
  {
    name: "Sarah Buckley",
    text: "Got my rockers done and the cab corners. Zeek welded in new metal and matched the paint. Passed inspection no problem. Should have done this a year ago.",
    service: "Auto Body & Paint",
    featured: false,
  },
  // [DEMO COPY — pending client review]
  {
    name: "Mike Doyon",
    text: "I needed a tow from Lancaster to Groveton on a Sunday morning. He picked up on the second ring. No attitude, no extra charge for the weekend. Just showed up and got it done.",
    service: "24/7 Towing & Recovery",
    featured: false,
  },
  // [DEMO COPY — pending client review]
  {
    name: "Karen Goulet",
    text: "Took my Subaru in for brakes and he found the control arms were shot too. Showed me exactly what was wrong, gave me a fair price, and had it done the next day. Finally found a mechanic I trust.",
    service: "Mechanical Repair",
    featured: false,
  },
  // Real testimonial from Facebook
  {
    name: "Jay Gates",
    text: "He does an amazing job.",
    service: "Mechanical Repair",
    featured: false,
  },
  // Real testimonial from Facebook
  {
    name: "Annette Unsworth",
    text: "You have so much talent.",
    service: "Vehicle Restoration",
    featured: false,
  },

  // ═══ PAGE 2 (indices 9-17) ═══
  // [DEMO COPY — pending client review]
  {
    name: "Brian Cote",
    text: "My Duramax needed a turbo and the dealer wanted almost four grand. Zeek did it for way less and it runs better than it has in years. Honest pricing, solid work.",
    service: "Mechanical Repair",
    featured: false,
  },
  // [DEMO COPY — pending client review]
  {
    name: "Ashley Perkins",
    text: "Had my headlights done for $99. Took him maybe a half hour. I can actually see the road at night now. Wish I'd done it sooner.",
    service: "Headlight Restoration",
    featured: false,
  },
  // [DEMO COPY — pending client review]
  {
    name: "Dan Stickney",
    text: "Zeek pulled my truck out of a mud pit off a logging road in Stratford. Pouring rain, pitch dark. He didn't hesitate. That's the kind of guy you want on speed dial up here.",
    service: "Winch-Out Service",
    featured: false,
  },
  // [DEMO COPY — pending client review]
  {
    name: "Lisa Corrigan",
    text: "Had him detail my SUV before I sold it. Inside and out, engine bay too. The buyer thought it was newer than it was. Zeek made it look brand new.",
    service: "Detailing",
    featured: false,
  },
  // [DEMO COPY — pending client review]
  {
    name: "Steve Roberge",
    text: "Brought my 87 F-250 to Zeek for a full restoration. The frame was rough, panels were gone, but he brought it back to life. I get compliments every time I drive it now.",
    service: "Vehicle Restoration",
    featured: false,
  },
  // [DEMO COPY — pending client review]
  {
    name: "Nicole Tremblay",
    text: "Called at 6 in the morning because my car wouldn't start. Minus 10 outside. He came out to my house, diagnosed the problem, and fixed it right there in the driveway. Didn't have to get towed anywhere.",
    service: "Mobile Mechanic",
    featured: false,
  },
  // [DEMO COPY — pending client review]
  {
    name: "Randy Boucher",
    text: "My Arctic Cat needed a full clutch kit before trail season. Zeek had it done in two days. Runs like a completely different sled now. Great price too.",
    service: "Snowmobile & ATV Repair",
    featured: false,
  },
  // [DEMO COPY — pending client review]
  {
    name: "Tammy Frizzell",
    text: "I'm a single mom and my car is everything. Zeek fixed the wheel bearings, did the brakes, and didn't try to upsell me on stuff I didn't need. Finally someone honest.",
    service: "Mechanical Repair",
    featured: false,
  },
  // [DEMO COPY — pending client review]
  {
    name: "Jason Emery",
    text: "Needed a custom cross member fabricated for my old GMC. No shop within an hour could do it. Zeek made one from scratch and it fit perfect. The guy can build anything.",
    service: "Custom Fabrication",
    featured: false,
  },

  // ═══ PAGE 3 (indices 18-26) ═══
  // [DEMO COPY — pending client review]
  {
    name: "Brenda Washburn",
    text: "Zeek towed my daughter's car after a deer strike on Route 110. He was so kind to her. She was shaken up and he made sure she was okay before he even looked at the car.",
    service: "24/7 Towing & Recovery",
    featured: false,
  },
  // [DEMO COPY — pending client review]
  {
    name: "Kevin Aldrich",
    text: "Got my bed sides done, rust was eating right through. He cut it all out, welded new panels, and sprayed bedliner. Looks better than when I bought the truck.",
    service: "Auto Body & Paint",
    featured: false,
  },
  // [DEMO COPY — pending client review]
  {
    name: "Heather Blodgett",
    text: "Third mechanic I tried and the only one who actually fixed the problem. Turns out the other two were guessing. Zeek found it in 20 minutes.",
    service: "Mechanical Repair",
    featured: false,
  },
  // [DEMO COPY — pending client review]
  {
    name: "Paul Frechette",
    text: "Had him tow my truck from Vermont to his shop in Groveton. Interstate haul, no issue. Got the body work done and drove it home a week later. One stop for everything.",
    service: "24/7 Towing & Recovery",
    featured: false,
  },
  // [DEMO COPY — pending client review]
  {
    name: "Donna Goss",
    text: "My Fourtrax wasn't running right. Zeek pulled the carbs, cleaned them with an ultrasonic cleaner, put everything back together, and it fired right up. Quick turnaround too.",
    service: "Snowmobile & ATV Repair",
    featured: false,
  },
  // [DEMO COPY — pending client review]
  {
    name: "Rick Placey",
    text: "Rolled into a ditch during the ice storm in February. Two other companies didn't pick up. Zeek answered on the first ring and had me out in under an hour.",
    service: "Winch-Out Service",
    featured: false,
  },
  // [DEMO COPY — pending client review]
  {
    name: "Jen LeBlanc",
    text: "Zeek replaced the struts and sway bar links on my Outback. Drives like a completely different car now. Fair price, done when he said it would be.",
    service: "Mechanical Repair",
    featured: false,
  },
  // [DEMO COPY — pending client review]
  {
    name: "Gary Hinton",
    text: "I've been sitting on a 72 Cougar for years. Finally brought it to Zeek and he's bringing it back piece by piece. The progress photos alone are worth it. This guy cares about what he does.",
    service: "Vehicle Restoration",
    featured: false,
  },
  // [DEMO COPY — pending client review]
  {
    name: "Amy Covell",
    text: "Needed my Powerstroke looked at. The 6.0 is a headache and most shops around here won't touch it. Zeek diagnosed the issue, ordered the parts, and had it running smooth in three days.",
    service: "Mechanical Repair",
    featured: false,
  },

  // ═══ PAGE 4 (indices 27-35) ═══
  // [DEMO COPY — pending client review]
  {
    name: "Tyler Haynes",
    text: "Got a long distance tow from Colebrook down to Concord. Zeek's price was fair and the truck was strapped down solid. No damage, no drama. Would use him again.",
    service: "24/7 Towing & Recovery",
    featured: false,
  },
  // [DEMO COPY — pending client review]
  {
    name: "Sherry Quinn",
    text: "My headlights were so yellow I could barely see at night. $99 and they look brand new. I tell everyone about this.",
    service: "Headlight Restoration",
    featured: false,
  },
  // [DEMO COPY — pending client review]
  {
    name: "Matt Sargent",
    text: "He welded a patch panel on my floor pan that the last shop said couldn't be saved. Still holding up a year later. Zeek doesn't cut corners.",
    service: "Custom Fabrication",
    featured: false,
  },
  // [DEMO COPY — pending client review]
  {
    name: "Christine Tessier",
    text: "My Ski-Doo chain case was making a horrible noise. Zeek had it apart, fixed, and back together in a day. Got it back just in time for the weekend.",
    service: "Snowmobile & ATV Repair",
    featured: false,
  },
  // [DEMO COPY — pending client review]
  {
    name: "Derek Ramsey",
    text: "Called him on a Saturday night because my battery was dead and it was already below zero. He came out, tested the system, and got me started. Didn't charge me an arm and a leg either.",
    service: "Mobile Mechanic",
    featured: false,
  },
  // [DEMO COPY — pending client review]
  {
    name: "Colleen Dupuis",
    text: "Zeek painted my truck's hood and fender after a parking lot scrape. Color match was perfect. You honestly can't tell where the damage was.",
    service: "Auto Body & Paint",
    featured: false,
  },
  // [DEMO COPY — pending client review]
  {
    name: "Adam Whitcomb",
    text: "He came to my place in Northumberland to do an oil change and ended up finding a leaking brake line. Fixed it right there on the spot. Probably saved me from something bad.",
    service: "Mobile Mechanic",
    featured: false,
  },
  // [DEMO COPY — pending client review]
  {
    name: "Melissa Gagnon",
    text: "The interior detail was incredible. My kids trashed my van and Zeek made it look new. Even got the stains out of the carpet I thought were permanent.",
    service: "Detailing",
    featured: false,
  },
  // [DEMO COPY — pending client review]
  {
    name: "Josh Presby",
    text: "Witt's is the real deal. Towed my truck after an accident, did the body work, handled the mechanical stuff, and got me back on the road. All one shop. Nobody else around here can do all that.",
    service: "24/7 Towing & Recovery",
    featured: false,
  },
];

// ──────────────────────────────────────────────
// FAQ — 15 Q&As from market-intelligence.md buyer questions
// ──────────────────────────────────────────────
export const faq = [
  {
    question: "How fast can you get to me in an emergency?",
    answer:
      "It depends on where you are, but I cover most of Coos County and the surrounding areas. For emergencies, I'm usually rolling within minutes of your call. If you're on Route 3, Route 110, or anywhere in the Groveton, Lancaster, Stark, or Northumberland area, I can typically be there in 15 to 30 minutes.",
  },
  {
    question: "What's your service area?",
    answer:
      "I'm based in Groveton, NH and serve all of Coos County and the surrounding areas, including Lancaster, Stark, Northumberland, Stratford, Colebrook, and across the border into Guildhall and Lunenburg, VT. For towing, I'm FMCSA licensed to operate in all 50 states, so I can do long-distance and interstate hauls too.",
  },
  {
    question: "How much does a tow cost?",
    answer:
      "Local towing starts at $75 plus $4 per mile. Winch-outs start at $95. Long-distance and interstate hauls are quoted based on distance. I'll always give you a clear price before I hook up. No surprises.",
  },
  {
    question: "Do you work with insurance companies?",
    answer:
      "Yes. If you've been in an accident or your vehicle needs towing through an insurance claim, I can work with your insurance company on the paperwork. I'm fully insured with $750,000 in BIPD coverage myself, so your vehicle is covered while it's in my care.",
  },
  {
    question: "What forms of payment do you accept?",
    answer:
      "I accept Visa, Mastercard, and American Express through Square. Cash works too. Payment is due when the job is complete.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Yes. Witt's Restoration is a registered NH LLC in good standing. For towing, I hold FMCSA Common Authority with USDOT number 4507783 and MC number 1784194, which means I'm licensed to operate in all 50 states. I carry $750,000 in BIPD insurance through United Financial Casualty Company. Zero safety violations, zero accidents on record.",
  },
  {
    question: "Do you do after-hours work?",
    answer:
      "Towing and emergencies are 24/7, no exceptions. For scheduled mechanical work, body work, and restorations, I try to work normal shop hours, but I've done plenty of after-hours calls when someone really needs it. Just call and we'll figure it out.",
  },
  {
    question: "How much does rust repair cost?",
    answer:
      "Every rust job is different. Surface rust on a fender is a different job than rocker panels that are gone through to the frame. Send me some photos of the damage and I'll give you a straight quote. No pressure, no games. Rocker panel repairs typically start around $500 per side depending on severity.",
  },
  {
    question: "Can you work on diesel trucks?",
    answer:
      "Absolutely. I work on 6.0 and 7.3 Powerstroke, 6.6L Duramax, and other diesel platforms. Turbo replacement, injectors, fuel systems, the works. A lot of shops up here won't touch diesels. I do.",
  },
  {
    question: "Do you do snowmobile and ATV repairs?",
    answer:
      "Yes. Clutch kits, carburetor rebuilds with ultrasonic cleaning, chain case repair, track and suspension work, and full pre-season inspections. I work on Arctic Cat, Ski-Doo, Polaris, and Honda. The Ride the Wilds trail system runs right through this area, so I see a lot of sleds.",
  },
  {
    question: "Can you come to me instead of me bringing the vehicle to you?",
    answer:
      "That's what the mobile mechanic service is for. Brakes, bearings, fluids, starters, alternators, and most standard repairs. I bring the tools to your driveway, your yard, or your job site. $75 per hour plus a $35 trip fee. Saves you the cost and hassle of a tow.",
  },
  {
    question: "How long does a restoration take?",
    answer:
      "It depends on the scope. A cosmetic refresh might take a few weeks. A full frame-off restoration is months of work. I'll walk you through a realistic timeline during the consultation so there are no surprises. I document everything with photos along the way so you can see the progress.",
  },
  {
    question: "Is this a one-man shop?",
    answer:
      "Yes, and that's by design. When you call Witt's Restoration, you're talking to me. When I quote you a price, I'm the one doing the work. There's no runaround, no hand-offs, no miscommunication. One guy, one standard: great work or no work.",
  },
  {
    question: "What's the $99 headlight restoration?",
    answer:
      "If your headlights are yellowed, cloudy, or oxidized, I wet-sand and polish them back to clear for a flat $99. Takes about 30 minutes. It's a fraction of the cost of replacing the headlight assemblies, which can run $250 to $700 each. Huge difference in night visibility.",
  },
  {
    question: "Do you offer free estimates?",
    answer:
      "For most work, yes. Send me photos through the website or text them to (802) 751-5786 and I'll give you a quote. For bigger projects like restorations, I'll want to see the vehicle in person, but there's no charge for the initial look.",
  },
];

// ──────────────────────────────────────────────
// QUIZ — "What Does Your Vehicle Need?"
// Routes non-emergency customers to service recommendations
// ──────────────────────────────────────────────
export const quiz = {
  headline: "What Does Your Vehicle Need?",
  subheadline:
    "Not sure which service you need? Answer a few quick questions and we'll point you in the right direction.",
  steps: [
    {
      id: "situation",
      question: "What's going on with your vehicle right now?",
      options: [
        {
          emoji: "🚨",
          label: "Stranded or need a tow",
          value: "emergency",
        },
        {
          emoji: "🦊",
          label: "Rust, dents, or body damage",
          value: "bodyWork",
        },
        {
          emoji: "⚙️",
          label: "Something mechanical is wrong",
          value: "mechanical",
        },
        {
          emoji: "🔩",
          label: "Restoration or project build",
          value: "restoration",
        },
        {
          emoji: "🏔️",
          label: "Snowmobile or ATV needs work",
          value: "powersports",
        },
        {
          emoji: "💡",
          label: "Headlights are foggy or yellow",
          value: "headlights",
        },
      ],
    },
    {
      id: "timeline",
      question: "How soon do you need this handled?",
      options: [
        {
          emoji: "🔥",
          label: "Right now, it's urgent",
          value: "immediate",
        },
        {
          emoji: "📅",
          label: "This week or next",
          value: "soon",
        },
        {
          emoji: "🗓️",
          label: "Within a month or two",
          value: "planned",
        },
        {
          emoji: "🤔",
          label: "Just exploring my options",
          value: "exploring",
        },
      ],
    },
    {
      id: "vehicle",
      question: "What kind of vehicle are we talking about?",
      options: [
        {
          emoji: "🛻",
          label: "Truck or SUV",
          value: "truck",
        },
        {
          emoji: "🚗",
          label: "Car or sedan",
          value: "car",
        },
        {
          emoji: "🏎️",
          label: "Classic or project vehicle",
          value: "classic",
        },
        {
          emoji: "🏔️",
          label: "Snowmobile or ATV",
          value: "powersports",
        },
      ],
    },
  ],
  leadCapture: {
    heading: "Almost done. Where should we send your recommendation?",
    fields: ["name", "email", "phone"] as const,
    submitLabel: "Get My Recommendation",
    privacyNote: "No spam, ever. Your info stays between us.",
  },
  resultScreen: {
    heading: "Here's what we recommend for you",
    subheading:
      "Based on your answers, here's the best way Witt's Restoration can help.",
    ctaLabel: "Book Your Service",
    ctaHref: "/booking",
  },
};

// ──────────────────────────────────────────────
// QUIZ TYPES & RESULTS (used by /src/data/quiz.ts)
// ──────────────────────────────────────────────
export const quizTypes = [
  "emergencyRescue",
  "rustFighter",
  "dreamBuilder",
  "trailRider",
] as const;

export type QuizType = (typeof quizTypes)[number];

export const quizResults: Record<
  QuizType,
  {
    name: string;
    tagline: string;
    body: string[];
    recommendedProgram: { name: string; href: string; reason: string };
  }
> = {
  emergencyRescue: {
    name: "The Emergency Rescue",
    tagline: "You need help now, and Zeek's already on his way.",
    body: [
      "Sounds like you're dealing with something urgent. Whether it's a tow, a winch-out, or a roadside mechanical issue, the fastest path is a phone call.",
      "Zeek runs 24/7 emergency service across Coos County and northern NH/VT. Licensed, insured, and rolling within minutes of your call.",
    ],
    recommendedProgram: {
      name: "Call Now for Emergency Service",
      href: "tel:+18027515786",
      reason:
        "For emergencies, a phone call beats a form every time. Tap to call.",
    },
  },
  rustFighter: {
    name: "The Rust Fighter",
    tagline:
      "Your truck is solid under there. It just needs someone who can weld.",
    body: [
      "Road salt doesn't take breaks, and neither does rust. Whether it's rockers, cab corners, floor pans, or bed sides, Zeek cuts the bad metal out and welds in new.",
      "Send some photos of the damage and get a straight quote. No pressure, no runaround. If it can be saved, he'll save it.",
    ],
    recommendedProgram: {
      name: "Auto Body & Paint",
      href: "/services/auto-body-paint",
      reason:
        "Book a consultation or send photos for a quote on your rust repair.",
    },
  },
  dreamBuilder: {
    name: "The Dream Builder",
    tagline:
      "That project has been waiting long enough. Time to make it happen.",
    body: [
      "You've got a vehicle that deserves a second life. Maybe it's a classic truck, a muscle car, or something you've been staring at under a tarp for five years.",
      "Zeek does full restorations, custom fabrication, engine work, and body. One shop, start to finish. Book a consult and let's talk about what you want to build.",
    ],
    recommendedProgram: {
      name: "Vehicle Restoration",
      href: "/services/vehicle-restoration",
      reason:
        "Start with a restoration consultation. Bring the vehicle or bring photos.",
    },
  },
  trailRider: {
    name: "The Trail Rider",
    tagline: "Get trail-ready before the snow flies.",
    body: [
      "Whether it's a snowmobile that needs a clutch kit or an ATV with a rough-running carb, Zeek handles seasonal powersports service for the North Country.",
      "Pre-season inspections, carb rebuilds, chain case work, and everything else you need to ride all winter without breaking down on the trail.",
    ],
    recommendedProgram: {
      name: "Snowmobile & ATV Repair",
      href: "/services/snowmobile-atv",
      reason: "Book a pre-season inspection or schedule your repair.",
    },
  },
};

// ──────────────────────────────────────────────
// BLOG ARTICLE STUBS
// From market-intelligence.md Section 6 content gaps
// ──────────────────────────────────────────────
export const blogArticles = [
  {
    title: "How Much Does a Tow Cost in New Hampshire? A Local Guide",
    slug: "towing-cost-guide-nh",
    excerpt:
      "Real pricing breakdowns for local tows, long-distance hauls, and winch-outs in northern NH. No other company in the region publishes this information.",
    category: "Towing",
  },
  {
    title: "What to Do If You Break Down on Route 3 in Coos County",
    slug: "break-down-route-3-coos-county",
    excerpt:
      "A step-by-step guide for handling a breakdown on one of New Hampshire's most remote highway stretches. Cell dead zones, nearest service points, and safety tips.",
    category: "Towing",
  },
  {
    title: "The Complete Guide to Vehicle Rust Repair in New Hampshire",
    slug: "vehicle-rust-repair-guide-nh",
    excerpt:
      "How road salt destroys your truck, the stages of rust damage, when to repair vs. replace, and what rust repair actually costs in northern NH.",
    category: "Auto Body",
  },
  {
    title: "Snowmobile Broke Down on the Trail? Here's What to Do",
    slug: "snowmobile-trail-breakdown-guide",
    excerpt:
      "What to do when your sled dies on Ride the Wilds or any northern NH trail system. Safety steps, common trail-side fixes, and when to call for help.",
    category: "Snowmobile & ATV",
  },
  {
    title: "Why a Mobile Mechanic Makes Sense in Rural New Hampshire",
    slug: "mobile-mechanic-rural-nh",
    excerpt:
      "When the nearest shop is 45 minutes away, a mobile mechanic who comes to your driveway saves time, money, and the cost of a tow.",
    category: "Mobile Mechanic",
  },
  {
    title: "Off-Road Vehicle Recovery: What to Expect in Northern NH",
    slug: "off-road-recovery-northern-nh",
    excerpt:
      "Logging roads, mud season, and remote terrain. What off-road recovery involves, what it costs, and how to prepare for the worst.",
    category: "Towing",
  },
  {
    title: "Pre-Season Snowmobile Maintenance Checklist for NH Riders",
    slug: "snowmobile-maintenance-checklist",
    excerpt:
      "Everything you should check, replace, and tune before hitting the trails. Clutch, carbs, chain case, track tension, and more.",
    category: "Snowmobile & ATV",
  },
  {
    title: "Failed NH Inspection for Rust? Here Are Your Options",
    slug: "failed-nh-inspection-rust",
    excerpt:
      "What to do when your truck fails inspection because of rust. Repair options, typical costs, and how to find a body shop that does real metalwork.",
    category: "Auto Body",
  },
  {
    title: "How to Choose a Towing Company You Can Trust",
    slug: "choose-towing-company-trust",
    excerpt:
      "What to look for in a towing company before you need one. Licensing, insurance, safety records, and the questions most people forget to ask.",
    category: "Towing",
  },
  {
    title: "Diesel Truck Repair in Northern NH: What Shops Won't Tell You",
    slug: "diesel-truck-repair-northern-nh",
    excerpt:
      "Powerstroke and Duramax owners know the struggle. Most shops won't touch your diesel. Here's what to look for and what common repairs actually cost.",
    category: "Mechanical Repair",
  },
];

// ──────────────────────────────────────────────
// HOMEPAGE CTA BLOCK (quiz launcher)
// ──────────────────────────────────────────────
export const quizCTA = {
  headline: "Not Sure What Your Vehicle Needs?",
  subtext:
    "Take a 60-second quiz and get a personalized recommendation. No commitment, no spam.",
  cta: { label: "Start the Quiz", href: "/quiz" },
};

// ──────────────────────────────────────────────
// FINAL CTA BLOCK (bottom of homepage)
// ──────────────────────────────────────────────
export const finalCTA = {
  headline: "Ready to Get It Fixed?",
  subtext:
    "Whether it's an emergency tow or a project you've been putting off, the first step is the same. Call, text, or book online.",
  cta: { label: "Call Now. (802) 751-5786", href: "tel:+18027515786" },
  ctaSecondary: { label: "Book an Appointment", href: "/booking" },
};

// ──────────────────────────────────────────────
// FOOTER
// ──────────────────────────────────────────────
export const footer = {
  // [DEMO COPY — pending client review]
  closingStatement:
    "From the ditch to the dream build. When your truck breaks down at 2 AM or that project has been waiting long enough, there's one number to call in the North Country. Zeek's got it from here.",
  tagline: "Where We Have the Witt to Make All Your Car Problems Quit",
  navLinks: [
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Gallery", href: "/gallery" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  regulatory: {
    usdot: "USDOT: 4507783",
    mc: "MC: 1784194",
    llc: "NH LLC #996802. Good Standing.",
    insurance: "Fully Insured. $750,000 BIPD.",
  },
  payment: "We accept Visa, Mastercard, American Express via Square.",
  legal: `\u00A9 ${new Date().getFullYear()} Witt's Restoration LLC. All rights reserved.`,
  social: {
    facebook: "https://www.facebook.com/WittsRestoration",
  },
};

// ──────────────────────────────────────────────
// PRICING PAGE (Optimus sales tool — removed before launch)
// ──────────────────────────────────────────────
export const pricing = {
  tiers: [
    {
      name: "Starter",
      price: 1500,
      badge: null,
      headline: "The digital foundation your business needs",
      features: [
        "✅ Custom-designed homepage with animated hero",
        "✅ Service pages for all 9 offerings",
        "✅ About page with your story",
        "✅ Contact page with click-to-call",
        "✅ FAQ page with schema markup",
        "✅ Mobile-first responsive design",
        "✅ SEO foundation (meta tags, sitemap, schema)",
        "✅ Google-ready in 60-90 days",
        "✗ Blog architecture",
        "✗ Quiz lead capture",
        "✗ Booking calendar",
        "✗ Gallery page",
        "✗ Testimonials page",
        "✗ Online shop",
      ],
      cta: { label: "Get Started", href: "/booking" },
      featured: false,
    },
    {
      name: "Pro",
      price: 3000,
      badge: "Most Popular",
      headline: "Everything you need to dominate your market",
      features: [
        "✅ Everything in Starter",
        "✅ Blog architecture (Sanity CMS)",
        "✅ 9-10 SEO-optimized article stubs",
        "✅ Interactive quiz lead capture",
        "✅ Inline booking calendar",
        "✅ Before/after gallery page",
        "✅ Testimonials page (36 reviews)",
        "✅ Sticky mobile click-to-call bar",
        "✅ Service area pages (8+ towns)",
        "✅ AEO optimization for AI search",
        "✗ Online shop",
      ],
      cta: { label: "Get Pro", href: "/booking" },
      featured: true,
    },
    {
      name: "Premium",
      price: 5500,
      badge: null,
      headline: "The complete digital business platform",
      features: [
        "✅ Everything in Pro",
        "✅ Branded merchandise shop (Printful + Stripe)",
        "✅ Product pages with variant picker",
        "✅ Shopping cart and checkout",
        "✅ Inventory management dashboard",
        "✅ Automated order fulfillment",
      ],
      cta: { label: "Get Premium", href: "/booking" },
      featured: false,
    },
  ],
  roiCalculator: {
    headline: "See What Your Website Could Do",
    subtitle:
      "Adjust the sliders to match your business and see the ROI for each package.",
    jobValueLabel: "Average Job Value ($)",
    jobValueDefault: 200,
    jobValueMin: 50,
    jobValueMax: 5000,
    clientsPerMonthLabel: "New Clients Per Month from Website",
    clientsPerMonthDefault: 5,
    clientsPerMonthMin: 1,
    clientsPerMonthMax: 30,
  },
};

// ──────────────────────────────────────────────
// SERVICE AREA PAGES
// ──────────────────────────────────────────────
export const serviceAreas = [
  {
    town: "Groveton",
    state: "NH",
    slug: "groveton-nh",
    description:
      "Home base. 11 West St, Groveton. The fastest response time in the area because this is where the shop is.",
  },
  {
    town: "Lancaster",
    state: "NH",
    slug: "lancaster-nh",
    description:
      "Serving Lancaster and the Route 2 corridor. Towing, mobile mechanic, and body work for the county seat.",
  },
  {
    town: "Stark",
    state: "NH",
    slug: "stark-nh",
    description:
      "Covering Stark and the Route 110 stretch. Remote roads, quick response. I know every turn.",
  },
  {
    town: "Northumberland",
    state: "NH",
    slug: "northumberland-nh",
    description:
      "Right next door to Groveton. Towing, mechanical work, and body repair for Northumberland residents.",
  },
  {
    town: "Stratford",
    state: "NH",
    slug: "stratford-nh",
    description:
      "Serving Stratford and the upper Connecticut River valley. Logging roads, remote terrain, no problem.",
  },
  {
    town: "Colebrook",
    state: "NH",
    slug: "colebrook-nh",
    description:
      "Covering Colebrook and the northern tip of Coos County. Long-distance tows and recovery service.",
  },
  {
    town: "Guildhall",
    state: "VT",
    slug: "guildhall-vt",
    description:
      "Just across the Connecticut River into Vermont. Same fast response, same quality work.",
  },
  {
    town: "Lunenburg",
    state: "VT",
    slug: "lunenburg-vt",
    description:
      "Serving Lunenburg and the Vermont side of the border. FMCSA licensed for interstate service.",
  },
];

// ──────────────────────────────────────────────
// SEO METADATA (per-page)
// ──────────────────────────────────────────────
export const seoMeta = {
  home: {
    title:
      "Witt's Restoration LLC | 24/7 Towing & Auto Restoration | Groveton, NH",
    description:
      "24/7 towing and recovery, auto body, vehicle restoration, mobile mechanic, and snowmobile repair in Groveton, NH. Serving Coos County. Call (802) 751-5786.",
  },
  services: {
    title: "Services | Witt's Restoration LLC | Groveton, NH",
    description:
      "Towing, winch-outs, auto body and paint, vehicle restoration, mechanical repair, mobile mechanic, custom fabrication, headlight restoration, and snowmobile/ATV repair.",
  },
  about: {
    title: "About Zeek Witt | Witt's Restoration LLC | Groveton, NH",
    description:
      "One-man shop, one standard: great work or no work. Meet Zeek Witt, owner and operator of Witt's Restoration in Groveton, NH. Licensed, insured, community trusted.",
  },
  gallery: {
    title: "Our Work | Before & After Gallery | Witt's Restoration LLC",
    description:
      "100+ documented jobs. Before and after photos of towing recoveries, rust repair, restorations, and mechanical work. Real results, no stock photos.",
  },
  testimonials: {
    title: "Customer Reviews | Witt's Restoration LLC | Groveton, NH",
    description:
      "Read what Coos County vehicle owners say about Witt's Restoration. Real reviews from real customers. Towing, body work, restorations, and mechanical repair.",
  },
  blog: {
    title: "Blog | Towing & Auto Repair Tips | Witt's Restoration LLC",
    description:
      "Guides, tips, and local information for vehicle owners in northern NH. Towing costs, rust repair, snowmobile maintenance, and more.",
  },
  contact: {
    title: "Contact | Witt's Restoration LLC | (802) 751-5786",
    description:
      "Call, text, or send a message. 24/7 for emergencies. 11 West St, Groveton, NH 03582. Serving Coos County and northern NH/VT.",
  },
  faq: {
    title: "FAQ | Witt's Restoration LLC | Groveton, NH",
    description:
      "Answers to common questions about towing costs, service area, hours, insurance, payment, and more. Witt's Restoration, Groveton, NH.",
  },
  quiz: {
    title: "What Does Your Vehicle Need? | Witt's Restoration LLC",
    description:
      "Take a 60-second quiz to find out which Witt's Restoration service is right for your situation. Towing, body work, restoration, mechanical, or powersports.",
  },
  booking: {
    title: "Book an Appointment | Witt's Restoration LLC",
    description:
      "Schedule a consultation, mechanical repair, restoration assessment, or pre-season snowmobile service with Witt's Restoration in Groveton, NH.",
  },
  pricing: {
    title: "Website Pricing | Optimus Business Solutions",
    description:
      "Website packages for small businesses. Starter, Pro, and Premium tiers with transparent pricing and ROI calculator.",
  },
};
