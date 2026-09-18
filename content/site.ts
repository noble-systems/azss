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
    "Arizona Sound System is a turn-key sound rental for events across Arizona. One crew brings the rig, the booth, the power and the engineer, sets it up, runs the show and takes it down.",
  shortDescription:
    "Turn-key sound for events across Arizona. Rig, booth, power and engineer, delivered and run.",
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
  tagline: "One call. One crew. The whole system, set up and run for you.",
  body: `High-end line array tops, festival-grade subs, booth monitors and silent battery power, sized for crowds up to ${crowd.max} and delivered with an engineer who dials it in for the room and stays for the show. Built for EDM. Ready for pool decks, warehouses, rooftops and the middle of the desert.`,
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
  intro: `The same rig every time, owned and maintained by us. High-end touring gear sized for crowds up to ${crowd.max}, and it comes as one package: tops, subs, booth, cabling, power and the person who runs it.`,
} as const;

export const gear: readonly GearItem[] = [
  {
    id: "subs",
    index: "01",
    title: "The subs",
    lead: "The low end is the whole point.",
    body: "Festival-grade subwoofers, the kind touring rigs and club installs run, and enough of them to move a full dance floor. Stacked under the tops or split across the room, and tuned to the space on the night.",
    points: [
      "High-end subs built for bass music",
      `Enough of them for crowds up to ${crowd.max}`,
      "Stacked, split or steered to keep the bass off the neighbours",
    ],
    tone: "ember",
    image: "/media/sub.png",
    imageAlt: "A powered subwoofer cabinet, seen from the front at an angle",
  },
  {
    id: "tops",
    index: "02",
    title: "The tops",
    lead: "Even coverage from the front row to the back wall.",
    body: "A professional line array, flown from truss, stacked over the subs or up on poles, whichever the site calls for. Line arrays throw further and more evenly, so the people at the back hear the same mix as the people at the rail without the front row getting flattened.",
    points: [
      "High-end line array, flown, stacked over the subs, or on poles",
      "Aimed and time-aligned on site",
      "Clean at full volume, all night",
    ],
    tone: "night",
    image: "/media/top.png",
    imageAlt: "A line array element, seen from the front at an angle",
  },
  {
    id: "booth",
    index: "03",
    title: "The booth",
    lead: "The DJ hears the room, not a guess at it.",
    body: "Proper booth monitors so the artist can mix with confidence. Nothing kills a set faster than a booth that sounds nothing like the floor.",
    points: [
      "Dedicated booth monitoring",
      "Separate level from the main system",
      "Room for your own decks and mixer, or ask about ours",
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
  title: "No outlet, no generator, no problem.",
  intro:
    "A battery power station big enough to run the whole show travels with the rig, with more packs for the nights that run long. It is silent, there are no fumes and no cable run back to a wall, which opens up the places a generator can't go or isn't allowed.",
  points: [
    {
      title: "Where generators can't reach",
      body: "Desert sites, rooftops, courtyards, anywhere a generator can't be placed or can't be heard over.",
    },
    {
      title: "Silent",
      body: "Battery power makes no noise, so it can sit next to the stage instead of a hundred feet away on a cable.",
    },
    {
      title: "Clean",
      body: "No fuel on site, no exhaust, and steady power for the amplifiers all night.",
    },
    {
      title: "Indoors too",
      body: "Older buildings and warehouses often can't feed a full rig from the wall. The battery covers the gap.",
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
  title: "Made for the music that needs it.",
  intro:
    "House, techno, drum and bass, dubstep, trance. The system was put together for electronic music first, with the sub-bass and the headroom that genre asks for. It handles everything else as a bonus.",
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
  title: "Turn-key means turn-key.",
  intro: "You book the room and the lineup. We handle everything that makes noise.",
  steps: [
    {
      index: "01",
      title: "Tell us about the event",
      body: "Date, location, crowd size, indoors or out, and whether there's power on site. A quick form or a phone call is enough to quote.",
    },
    {
      index: "02",
      title: "We show up and set up",
      body: "The rig, booth, cabling and power arrive together, with an engineer. We build it, tune it to the room and sound check before doors.",
    },
    {
      index: "03",
      title: "We run it, then we're gone",
      body: "Someone stays on the system for the whole show. When it's over we tear down and load out. You never touch a cable.",
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
    "A date and a rough headcount are enough to start. We reply personally, usually the same day, with a price and any questions about the site.",
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
    "Turn-key sound system rental for events across Arizona. Line array, subs, DJ booth, silent battery power and an engineer, set up and run for crowds up to 1,000.",
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
  title: "Based in Phoenix. Booked anywhere in Arizona.",
  intro:
    "The rig, the power and the crew travel together, so distance is a drive rather than a problem. Metro Phoenix is home turf, and the rest of the state is a phone call.",
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
      answer: `Up to about ${crowd.max} at full electronic-music volume outdoors. Indoors, or for lighter genres, it stretches further. Tell us the headcount and the space and we will say straight away whether it fits.`,
    },
    {
      question: "Do we need to provide power?",
      answer:
        "No. A battery power station big enough to run the whole show travels with the rig, silently and with no fumes, so rooftops, desert sites and old buildings with weak wiring are all fine. If the venue has good power we can use that instead.",
    },
    {
      question: "What exactly is included?",
      answer:
        "The full system: line array tops, subwoofers, booth monitors, all cabling, power, and an engineer who delivers it, sets it up, tunes it to the room, runs it for the whole show and takes it down afterwards. You never touch a cable.",
    },
    {
      question: "Do you supply DJ decks and a mixer?",
      answer:
        "Most artists bring their own and plug into the booth. If you need decks and a mixer supplied, say so on the quote form and we will sort it.",
    },
    {
      question: "What kind of events do you do?",
      answer:
        "Club nights and takeovers, pool and day parties, warehouse and after-hours events, desert and outdoor gatherings, festival side stages, private parties and brand events. The system was built for EDM, and it handles everything else as a bonus.",
    },
    {
      question: "Where do you travel?",
      answer: `Anywhere in Arizona. We are based in Phoenix and regularly work ${serviceArea.cities.slice(1, 4).join(", ")} and the rest of the Valley, and we drive to Tucson, Flagstaff, Sedona and the desert in between.`,
    },
    {
      question: "Can you keep the bass off the neighbours?",
      answer:
        "Mostly, yes. The subwoofers can be arranged to throw forward into the crowd and cancel behind the stage, which is what keeps a residential street or a hotel behind you happier. Tell us about the site and we will plan the layout.",
    },
    {
      question: "How do I get a price?",
      answer: `Fill in the form below or call ${contact.phone}. A date, a location and a rough headcount are enough for a quote, and a real person replies, usually the same day. Earlier is better, but ask about short notice.`,
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Footer                                                                      */
/* -------------------------------------------------------------------------- */

export const footer = {
  blurb: "Turn-key sound rental for events, based in Arizona.",
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
