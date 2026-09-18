/**
 * ============================================================================
 * ARIZONA SOUND SYSTEM: CENTRAL CONTENT CONFIG
 * ============================================================================
 *
 * Everything a non-developer needs to edit lives in this file: copy, the gear
 * list, links and contact details. The components read from here and never
 * carry wording of their own.
 *
 * PHOTOGRAPHY
 *   Drop files into /public/media/ and point a slot at them, e.g.
 *   `image: "/media/rig-01.jpg"`. Anything left null renders as a designed
 *   gradient rather than a broken image.
 * ============================================================================
 */

export type MediaTone = "ember" | "night" | "sand";

/**
 * Version of the privacy policy. Stored against every inquiry so it is always
 * clear which wording someone submitted under. Bump it whenever the policy
 * changes materially, and update the "Last updated" date on that page.
 */
export const LEGAL_VERSION = "2026-09-14";

/* -------------------------------------------------------------------------- */
/* Brand                                                                       */
/* -------------------------------------------------------------------------- */

export const brand = {
  name: "Arizona Sound System",
  shortName: "AZ Sound System",
  city: "Phoenix, Arizona",
  region: "Arizona",
  domain: "https://azsoundsystem.com",
  description:
    "Arizona Sound System rents out a full sound system for events across Arizona and sends an engineer to set it up and run it.",
  shortDescription:
    "Sound system rental for events across Arizona, delivered and run by us.",
} as const;

/* -------------------------------------------------------------------------- */
/* Contact                                                                     */
/* -------------------------------------------------------------------------- */

export const contact = {
  email: "hello@azsoundsystem.com",
  /** As displayed. */
  phone: "(804) 517-8968",
  /** E.164, for tel: links and structured data. */
  phoneHref: "tel:+18045178968",
  instagramHandle: "@arizonasoundsystem" as string | null,
  instagramUrl: "https://instagram.com/arizonasoundsystem" as string | null,
  /**
   * Shown in the footer of every email we send. US commercial email rules
   * require a valid physical address in the message, so leaving this null is
   * a launch blocker rather than a nicety. City and state are enough to start.
   */
  postalAddress: "Arizona Sound System, Phoenix, AZ" as string | null,
} as const;

/* -------------------------------------------------------------------------- */
/* Who gets notified when the form is submitted                               */
/* -------------------------------------------------------------------------- */

/**
 * Internal recipients for inquiry notifications. Override per environment with
 * INQUIRY_NOTIFY_ADDRESS (comma separated). Email only sends when SES is
 * configured; see DEPLOY.md.
 */
export const notifications = {
  inquiry: ["hello@azsoundsystem.com"] as readonly string[],
} as const;

/* -------------------------------------------------------------------------- */
/* Navigation                                                                  */
/* -------------------------------------------------------------------------- */

export const navLinks = [
  { label: "The system", href: "#system" },
  { label: "Power", href: "#power" },
  { label: "How it works", href: "#process" },
  { label: "Contact", href: "#contact" },
] as const;

/* -------------------------------------------------------------------------- */
/* Crowd size. The one number the page makes a claim about                    */
/* -------------------------------------------------------------------------- */

/**
 * The site names no gear models and no specs, on purpose: it says high-end
 * gear and how many people the system can play for. This is that number, and
 * it appears in the hero and the system cards, so change it here only.
 *
 * Where 1,000 comes from (researched 17 September 2026, rig is four BASSBOSS
 * SSP218-MK3 subs and four QSC LA112 line array elements):
 *
 *   - BASSBOSS's own sizing copy, as carried on the Fullblast Sound dealer
 *     page for the SSP218-MK3: "Two SSP218 under ... tops handles wedding
 *     events up to 1,000 guests", and "1,000 plus dance-floor capacity" is
 *     where "the cabinet count needs to scale up". Four subs is that scaled
 *     count, and EDM wants roughly double the sub density of a wedding.
 *   - FOH magazine's L Class road test: "Two LA108s and a KS212C cardioid sub
 *     per side were ample for 800-1,000 people" at a weekly outdoor concert.
 *     The LA112 is the larger, louder box, and we run two per side.
 *   - bassboss.com lists the SSP218 for mid-size touring, club installs and
 *     festival support stages, and against sub-200 rooms and festival
 *     mainstages.
 *
 * So 1,000 is the honest number at EDM levels outdoors. A lighter-genre or
 * indoor event stretches to around 1,500; a mainstage needs more boxes.
 */
export const crowd = {
  /** As displayed, e.g. "1,000". */
  max: "1,000",
} as const;

/* -------------------------------------------------------------------------- */
/* Hero                                                                        */
/* -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: "Sound system rental, Phoenix and all of Arizona",
  title: "Big sound. Anywhere in Arizona.",
  tagline: "We bring the whole system and run it. You run the party.",
  body: `Line array tops, big subs, booth monitors and our own battery power, enough for about ${crowd.max} people. An engineer comes with it, sets it up and stays on it until the last track. We mostly do electronic music. Pool decks, warehouses, rooftops. The desert is fine too.`,
  primaryCta: { label: "Get a quote", href: "#contact" },
  secondaryCta: { label: "See the system", href: "#system" },
  image: "/media/hero.jpg" as string | null,
  imageAlt:
    "The Arizona Sound System rig on a pool deck stage: line arrays on subwoofer stacks either side of a DJ booth under truss and a shade sail",
} as const;

/* -------------------------------------------------------------------------- */
/* The system                                                                  */
/* -------------------------------------------------------------------------- */

export type GearItem = {
  id: string;
  index: string;
  title: string;
  lead: string;
  body: string;
  points: readonly string[];
  tone: MediaTone;
  /** Product cutout on a transparent background; shown over the tone gradient. */
  image: string | null;
  imageAlt: string;
};

export const system = {
  eyebrow: "The system",
  title: "What shows up.",
  intro: `It's our own rig and it's the same one every time. Good for about ${crowd.max} people. You get the tops, the subs, the booth, the cables, the power and a person to run it.`,
} as const;

export const gear: readonly GearItem[] = [
  {
    id: "subs",
    index: "01",
    title: "The subs",
    lead: "The low end is the whole point.",
    body: "Big touring subs, and enough of them. We stack them under the tops or split them across the floor depending on the room, then tune them on the night.",
    points: [
      "Built for bass music",
      `Enough for about ${crowd.max} people`,
      "We can aim them so the bass stays off the neighbours",
    ],
    tone: "ember",
    image: "/media/sub.png",
    imageAlt: "A powered subwoofer cabinet, seen from the front at an angle",
  },
  {
    id: "tops",
    index: "02",
    title: "The tops",
    lead: "Everyone hears the same mix.",
    body: "A proper line array. We fly it off truss, stack it on the subs or put it on poles, depending on the venue. Line arrays throw far and even, so the back of the room hears what the front does and the front row doesn't get blasted.",
    points: [
      "Flown, stacked or on poles",
      "Aimed and time-aligned on the day",
      "Stays clean at full volume",
    ],
    tone: "night",
    image: "/media/top.png",
    imageAlt: "A line array element, seen from the front at an angle",
  },
  {
    id: "booth",
    index: "03",
    title: "The booth",
    lead: "The DJ hears the room.",
    body: "Real booth monitors on their own level. If the booth sounds nothing like the floor, the set suffers, so we don't let that happen.",
    points: [
      "Own level, separate from the main system",
      "Bring your decks and mixer, or ask about ours",
    ],
    tone: "sand",
    image: "/media/booth.png",
    imageAlt: "A booth monitor speaker, seen from the front at an angle",
  },
] as const;

/* -------------------------------------------------------------------------- */
/* Power                                                                       */
/* -------------------------------------------------------------------------- */

export const power = {
  eyebrow: "Power anywhere",
  title: "We bring our own power.",
  intro:
    "A battery power station that runs the whole show comes with the rig. Extra packs for long nights. It's silent and there's no exhaust, so it can go on a rooftop, out in the desert, or inside an old building with bad wiring. If the venue has decent power, we'll use that.",
  points: [
    {
      title: "Where a generator can't go",
      body: "Rooftops, courtyards, desert sites.",
    },
    {
      title: "Silent",
      body: "It makes no noise, so it sits right next to the stage.",
    },
    {
      title: "Clean",
      body: "No fuel, no exhaust.",
    },
    {
      title: "Indoors too",
      body: "Old buildings and warehouses often can't run a full rig off the wall. The battery does.",
    },
  ],
  image: "/media/power.png" as string | null,
  imageAlt: "A battery power station on a wheeled cart",
} as const;

/* -------------------------------------------------------------------------- */
/* Who it's for                                                                */
/* -------------------------------------------------------------------------- */

export const audience = {
  eyebrow: "Built for EDM",
  title: "Built for electronic music.",
  intro:
    "House, techno, drum and bass, dubstep, trance. That's what the system was put together for, so the sub-bass and the headroom are there. Other genres are fine too.",
  uses: [
    "Club nights and takeovers",
    "Pool parties and day parties",
    "Warehouse and after-hours events",
    "Desert and outdoor gatherings",
    "Festivals and side stages",
    "Private parties and brand events",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* How it works                                                                */
/* -------------------------------------------------------------------------- */

export const process = {
  eyebrow: "How it works",
  title: "What happens when you book.",
  intro: "You book the room and the lineup. We handle everything that makes noise.",
  steps: [
    {
      index: "01",
      title: "Tell us about the event",
      body: "Date, where, roughly how many people, indoors or out, and whether there's power. The form or a phone call is enough for a quote.",
    },
    {
      index: "02",
      title: "We show up and set up",
      body: "Everything arrives in one load with an engineer. We build it, tune it to the room and sound check before doors.",
    },
    {
      index: "03",
      title: "We run it, then we're gone",
      body: "Someone stays on the system the whole show. Afterwards we tear down and load out. You don't touch a cable.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Gallery                                                                     */
/* -------------------------------------------------------------------------- */

export type MediaSlot = {
  id: string;
  shotNote: string;
  tone: MediaTone;
  image: string | null;
  imageAlt: string;
  span: "wide" | "tall";
};

export const gallery = {
  eyebrow: "On site",
  title: "Recent setups.",
} as const;

export const gallerySlots: readonly MediaSlot[] = [
  {
    id: "pool",
    shotNote: "Pool deck stage, line arrays on subs, truss and shade",
    tone: "sand",
    image: "/media/rig-02.jpg",
    imageAlt:
      "Line arrays stacked on subwoofers either side of a DJ booth under truss, beside a hotel pool",
    span: "tall",
  },
  {
    id: "stage",
    shotNote: "Stage left, subs and tops from behind the booth",
    tone: "ember",
    image: "/media/rig-01.jpg",
    imageAlt:
      "Two line array elements on a stack of subwoofers next to a DJ booth, with an engineer on stage",
    span: "tall",
  },
];

/* -------------------------------------------------------------------------- */
/* Contact section                                                             */
/* -------------------------------------------------------------------------- */

export const inquiry = {
  eyebrow: "Get a quote",
  title: "Tell us about the show.",
  intro:
    "A date and a rough headcount is enough to start. We read every one and reply with a price and any questions about the venue.",
  eventTypes: [
    "Club night",
    "Pool or day party",
    "Warehouse or after-hours",
    "Outdoor or desert",
    "Festival",
    "Private party",
    "Corporate or brand event",
    "Other",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Search                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * The title and description search engines show. The title leads with the
 * phrase people type ("sound system rental") and the place, then the brand;
 * the description repeats the offer in plain words and stays under 160
 * characters so it is not cut off.
 */
export const seo = {
  title: "Sound System Rental in Phoenix, AZ | Arizona Sound System",
  description:
    "Sound system rental for events across Arizona. Line array, subs, DJ booth, our own battery power and an engineer to run it, for crowds up to 1,000.",
  keywords: [
    "sound system rental Phoenix",
    "sound system rental Arizona",
    "PA rental Phoenix",
    "PA system rental Arizona",
    "line array rental Phoenix",
    "subwoofer rental Phoenix",
    "DJ sound system rental Arizona",
    "EDM sound system rental",
    "event sound rental Scottsdale",
    "sound system rental Tempe",
    "sound system rental Tucson",
    "battery powered sound system rental",
    "outdoor party sound system Arizona",
    "warehouse party sound system Phoenix",
    "pool party sound system Scottsdale",
    "festival sound rental Arizona",
    "audio engineer for hire Phoenix",
    "Arizona Sound System",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Service area                                                                */
/* -------------------------------------------------------------------------- */

export const serviceArea = {
  eyebrow: "Where we go",
  title: "Based in Phoenix. We'll drive anywhere in Arizona.",
  intro:
    "Everything travels in one load, so the rest of the state is just a longer drive. Most of our work is around the Valley.",
  /** Shown as a list on the page and as areaServed in the structured data. */
  cities: [
    "Phoenix",
    "Scottsdale",
    "Tempe",
    "Mesa",
    "Chandler",
    "Gilbert",
    "Glendale",
    "Peoria",
    "Tucson",
    "Flagstaff",
    "Sedona",
    "Prescott",
    "Lake Havasu City",
    "Yuma",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Questions people ask before they book                                      */
/* -------------------------------------------------------------------------- */

/**
 * Real questions, plain answers. Every answer is also published as FAQPage
 * structured data, so keep them factual: no prices, no promises the crew
 * cannot keep.
 */
export const faq = {
  eyebrow: "Questions",
  title: "Before you book.",
  items: [
    {
      question: "How many people can the system play for?",
      answer: `About ${crowd.max} outdoors at full electronic-music volume. Indoors, or for lighter music, more. Tell us the headcount and the space and we'll tell you if it fits.`,
    },
    {
      question: "Do we need to provide power?",
      answer:
        "No. We bring a battery power station that runs the whole show. No noise, no exhaust, so rooftops, desert sites and old buildings with weak wiring are fine. If the venue has good power we can use that.",
    },
    {
      question: "What exactly is included?",
      answer:
        "Everything. Tops, subs, booth monitors, cables, power, and an engineer who delivers it, sets it up, tunes it, runs it for the whole show and takes it down after.",
    },
    {
      question: "Do you supply DJ decks and a mixer?",
      answer:
        "Most DJs bring their own and plug into the booth. If you need decks and a mixer, say so on the form.",
    },
    {
      question: "What kind of events do you do?",
      answer:
        "Club nights, pool parties, warehouse and after-hours events, desert and outdoor stuff, festival side stages, private parties, brand events. The system was built for electronic music. Other genres are fine.",
    },
    {
      question: "Where do you travel?",
      answer: `Anywhere in Arizona. We're in Phoenix and do most of our work around the Valley. Tucson, Flagstaff, Sedona and anywhere between is fine, it's just a longer drive.`,
    },
    {
      question: "Can you keep the bass off the neighbours?",
      answer:
        "Mostly. The subs can be set up to throw forward into the crowd and cancel behind the stage, which helps a lot with a residential street or a hotel behind you. Tell us about the site and we'll plan the layout.",
    },
    {
      question: "How do I get a price?",
      answer: `Fill in the form below or call ${contact.phone}. A date, a location and a rough headcount is enough to quote. Earlier is better, but ask about short notice.`,
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Footer                                                                      */
/* -------------------------------------------------------------------------- */

export const footer = {
  blurb: "Sound system rental for events. Based in Phoenix.",
  columns: [
    {
      title: "Site",
      links: [
        { label: "The system", href: "/#system" },
        { label: "Power", href: "/#power" },
        { label: "How it works", href: "/#process" },
        { label: "Get a quote", href: "/#contact" },
      ],
    },
    {
      title: "Legal",
      links: [{ label: "Privacy policy", href: "/privacy" }],
    },
  ],
} as const;
