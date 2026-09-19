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
    "Arizona Sound System provides full sound system rentals for events across Arizona, with an engineer on site to set up and run the system.",
  shortDescription:
    "Sound system rental for events across Arizona, with an engineer on site.",
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
  eyebrow: "Sound system rental in Phoenix and across Arizona",
  title: "Big sound. Anywhere in Arizona.",
  tagline:
    "We deliver the system, set it up, run it during the event and take it down after.",
  body: `Our system is a line array with subwoofers, DJ booth monitors and our own battery power, and it covers events of up to about ${crowd.max} people. An engineer comes with it and stays for the whole event. We mainly do electronic music events: club nights, pool parties, warehouse parties, outdoor and desert events, festivals and private events.`,
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
  title: "What we bring.",
  intro: `We own the system and bring the same setup to every event. It is sized for up to about ${crowd.max} people and includes the tops, subwoofers, booth monitors, cabling, power and an engineer.`,
} as const;

export const gear: readonly GearItem[] = [
  {
    id: "subs",
    index: "01",
    title: "Subwoofers",
    lead: "Enough low end for a full dance floor.",
    body: "We bring professional touring subwoofers, enough for a full dance floor. Depending on the room we stack them under the tops or spread them across the front of the stage, and we tune them to the space before doors open.",
    points: [
      "Built for bass-heavy music",
      `Sized for events up to about ${crowd.max} people`,
      "Can be arranged to reduce bass behind the stage",
    ],
    tone: "ember",
    image: "/media/sub.png",
    imageAlt: "A powered subwoofer cabinet, seen from the front at an angle",
  },
  {
    id: "tops",
    index: "02",
    title: "Line array",
    lead: "Even coverage across the whole crowd.",
    body: "The tops are a professional line array. We can fly it from truss, stack it on the subwoofers or mount it on poles, depending on the venue. A line array covers the crowd evenly, so the sound is the same at the back as it is at the front.",
    points: [
      "Flown, stacked or pole mounted",
      "Aimed and time-aligned at the venue",
      "Clean sound at full volume",
    ],
    tone: "night",
    image: "/media/top.png",
    imageAlt: "A line array element, seen from the front at an angle",
  },
  {
    id: "booth",
    index: "03",
    title: "DJ booth",
    lead: "Monitors so the DJ can hear the mix.",
    body: "We provide booth monitors on their own volume control, separate from the main system. You can bring your own decks and mixer, or ask us about providing them.",
    points: [
      "Separate booth level",
      "Bring your own decks and mixer, or ask about ours",
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
    "We bring a battery power station that runs the entire system. It is silent and produces no exhaust, so it can be used on rooftops, at desert sites and in buildings that cannot supply enough power. If the venue has reliable power, we can use that instead.",
  points: [
    {
      title: "Where a generator can't go",
      body: "Rooftops, courtyards and remote outdoor sites.",
    },
    {
      title: "Silent",
      body: "The battery makes no noise, so it can sit next to the stage.",
    },
    {
      title: "No fumes",
      body: "No fuel on site and no exhaust.",
    },
    {
      title: "Indoors",
      body: "Older buildings and warehouses often cannot run a full system from the wall. The battery covers it.",
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
    "The system was put together for house, techno, drum and bass, dubstep and trance, with the sub-bass and headroom those genres need. It works for other music as well.",
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
  eyebrow: "Booking",
  title: "How it works.",
  intro: "You book the venue and the lineup. We take care of the sound.",
  steps: [
    {
      index: "01",
      title: "Tell us about the event",
      body: "Send us the date, location, expected crowd size, whether it is indoors or outdoors, and whether the venue has power. That is enough for us to send a quote.",
    },
    {
      index: "02",
      title: "We set up",
      body: "We deliver the system, set it up, tune it to the room and sound check before doors.",
    },
    {
      index: "03",
      title: "We run it and take it down",
      body: "An engineer stays on the system for the whole event. Afterwards we tear down and load out.",
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
  eyebrow: "Photos",
  title: "Recent events.",
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
  eyebrow: "Contact",
  title: "Get a quote.",
  intro:
    "Send us the date and a rough headcount and we will get back to you with a price and any questions we have about the venue.",
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
    "Sound system rental for events across Arizona. Line array, subwoofers, booth monitors and battery power, with an engineer on site, for up to 1,000 people.",
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
  title: "Based in Phoenix. Available across Arizona.",
  intro:
    "We are based in Phoenix and do most of our events in the Valley. We also travel to Tucson, Flagstaff, Sedona and anywhere else in the state.",
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
  eyebrow: "FAQ",
  title: "Common questions.",
  items: [
    {
      question: "How many people can the system play for?",
      answer: `The system is sized for up to about ${crowd.max} people outdoors at electronic music volume. Indoors, or for quieter music, it can cover more. Tell us your expected crowd size and the venue and we will let you know if it is a good fit.`,
    },
    {
      question: "Do we need to provide power?",
      answer:
        "No. We bring a battery power station that runs the whole system. It is silent and has no exhaust, so it works on rooftops, at desert sites and in older buildings. If the venue has reliable power we can use that instead.",
    },
    {
      question: "What exactly is included?",
      answer:
        "Everything: the line array, subwoofers, booth monitors, cabling and power, plus an engineer who delivers it, sets it up, tunes it, runs it during the event and takes it down afterwards.",
    },
    {
      question: "Do you supply DJ decks and a mixer?",
      answer:
        "Most DJs bring their own decks and mixer and plug into the booth. If you need us to provide them, let us know on the quote form.",
    },
    {
      question: "What kind of events do you do?",
      answer:
        "Club nights, pool parties, warehouse and after-hours events, outdoor and desert events, festival side stages, private parties and corporate events. The system was built for electronic music but works for other genres too.",
    },
    {
      question: "Where do you travel?",
      answer: `Anywhere in Arizona. We are based in Phoenix and do most of our events around the Valley, and we travel to Tucson, Flagstaff, Sedona and everywhere in between.`,
    },
    {
      question: "Can you keep the bass off the neighbours?",
      answer:
        "In most cases, yes. The subwoofers can be arranged so the bass projects forward into the crowd and is reduced behind the stage, which helps at venues with neighbors close by. Let us know about the site and we will plan the layout.",
    },
    {
      question: "How do I get a price?",
      answer: `Fill out the form below or call ${contact.phone}. A date, a location and a rough headcount are enough for us to put together a quote. The earlier you reach out the better, but feel free to ask about short notice.`,
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Footer                                                                      */
/* -------------------------------------------------------------------------- */

export const footer = {
  blurb: "Sound system rental for events in Phoenix and across Arizona.",
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
