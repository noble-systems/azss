/**
 * ============================================================================
 * ARIZONA SOUND SYSTEM: ALL THE WORDING ON THE SITE
 * ============================================================================
 *
 * Copy, contact details, the service pages and links all live here. The
 * components read from this file and don't carry wording of their own.
 *
 * How the copy is written: plain, complete sentences that say what we do.
 * No slogans, no lists of three for rhythm, nothing about what other
 * companies do, and nothing we can't back up. Two earlier versions got
 * thrown out for reading AI-made, once for sounding like an ad and once for
 * trying too hard to sound casual.
 *
 * PHOTOGRAPHY
 *   Drop files into /public/media/ and point a slot at them, e.g.
 *   `image: "/media/rig-01.jpg"`. A slot left null shows a plain gradient.
 * ============================================================================
 */

export type MediaTone = "ember" | "night" | "sand";

/**
 * Version of the privacy policy. It's stored with every inquiry so we know
 * which wording someone submitted under. Bump it when the policy changes in
 * a real way, and update the "Last updated" date on that page too.
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
    "Arizona Sound System rents out a full sound system for events across Arizona, with an engineer who sets it up and runs it.",
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
   * want a physical address in the message, so this can't be null. City and
   * state are enough to start.
   */
  postalAddress: "Arizona Sound System, Phoenix, AZ" as string | null,
} as const;

/* -------------------------------------------------------------------------- */
/* Who gets notified when the form is submitted                               */
/* -------------------------------------------------------------------------- */

/**
 * Internal recipients for inquiry emails. INQUIRY_NOTIFY_ADDRESS (comma
 * separated) overrides it per environment. Email only goes out once SES is
 * set up; see DEPLOY.md.
 */
export const notifications = {
  inquiry: ["hello@azsoundsystem.com"] as readonly string[],
} as const;

/* -------------------------------------------------------------------------- */
/* Crowd size. The one number the site makes a claim about                    */
/* -------------------------------------------------------------------------- */

/**
 * Daniel asked for no model names or specs on the site, only that it's
 * high-end gear and how many people it plays for. This is that number.
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
/* Service pages                                                               */
/* -------------------------------------------------------------------------- */

/**
 * One page per thing people search for. In October 2026 the searches that
 * turned up local rental companies were "sound system rental phoenix", "line
 * array rental phoenix", "dj sound system rental phoenix" and the battery
 * one, and the pages that came up for them were service pages, not home
 * pages. Each page here has to say something the others don't, or Google
 * treats it as a doorway page. That's also why there are no city pages yet:
 * a Scottsdale page with nothing but a different city name in it would be
 * exactly that.
 */
export type ServiceSection = {
  heading: string;
  body: readonly string[];
};

export type ServicePage = {
  slug: string;
  /** Goes before " | Arizona Sound System" in the browser tab and in search. */
  metaTitle: string;
  /** Under 160 characters so search results don't cut it off. */
  metaDescription: string;
  /** Short name for links and breadcrumbs. */
  linkLabel: string;
  h1: string;
  intro: readonly string[];
  image: string;
  imageAlt: string;
  /** "cover" for photos, "contain" for product cutouts. */
  imageFit: "cover" | "contain";
  sections: readonly ServiceSection[];
  /** Name of the service in the structured data. */
  serviceName: string;
};

export const services = {
  lineArray: {
    slug: "line-array-rental",
    metaTitle: "Line Array and PA Rental in Phoenix",
    metaDescription:
      "Line array and PA system rental in Phoenix, with subwoofers, booth monitors, battery power and an engineer on site. For events up to about 1,000 people.",
    linkLabel: "Line array and PA rental",
    h1: "Line array and PA system rental in Phoenix",
    intro: [
      `We rent out a complete PA system built around a line array and subwoofers. An engineer from our team sets it up, runs it for the whole event and takes it down afterward.`,
      `The system is sized for events of up to about ${crowd.max} people at electronic music volume. We bring it to events around Phoenix and anywhere else in Arizona.`,
    ],
    image: "/media/rig-01.jpg",
    imageAlt:
      "Two line array speakers stacked on two subwoofers next to a DJ booth on a pool deck stage, with a DJ setting up",
    imageFit: "cover",
    sections: [
      {
        heading: "What comes with the system",
        body: [
          "Every booking includes the line array, the subwoofers, monitors for the DJ booth, all the cabling and our own battery power. It also includes the engineer, who stays with the system from setup until we pack up.",
          "We use professional touring gear and bring the same setup to every event.",
        ],
      },
      {
        heading: "How we set it up",
        body: [
          "The line array goes on top of the subwoofers or on poles, depending on the venue and where the crowd will be standing. The subwoofers go under the line array or across the front of the stage.",
          "Before guests arrive, the engineer aims the speakers at the crowd, tunes the system to the space and does a sound check.",
        ],
      },
      {
        heading: "Why we use a line array",
        body: [
          "A line array is a column of speakers that work together. It can be aimed so the sound carries to the back of the crowd without being much louder at the front, so people near the stage and people at the back hear a similar level.",
        ],
      },
      {
        heading: "Subwoofers",
        body: [
          "Our subwoofers are built for bass-heavy music like house, techno and dubstep, and there are enough of them for a full dance floor.",
          "If there are neighbors close to the venue, we can arrange the subwoofers so that less bass travels behind the stage. Tell us about the site when you ask for a quote and we will plan the layout around it.",
        ],
      },
      {
        heading: "How many people it covers",
        body: [
          `The system covers up to about ${crowd.max} people outdoors at electronic music volume. Indoors, or with quieter music, it covers more. If your event is bigger than that, tell us the numbers and we will let you know whether it is a good fit.`,
        ],
      },
    ],
    serviceName: "Line array and PA system rental",
  },

  dj: {
    slug: "dj-sound-system-rental",
    metaTitle: "DJ Sound System Rental in Phoenix",
    metaDescription:
      "DJ sound system rental in Phoenix for club nights, pool parties and warehouse events. Line array, subwoofers, booth monitors and an engineer on site.",
    linkLabel: "DJ sound system rental",
    h1: "DJ sound system rental in Phoenix",
    intro: [
      "Most of the events we do are DJ events, like club nights, pool parties, warehouse parties and outdoor parties in the desert. We bring the main speakers, monitors for the DJ booth and power, and our engineer runs the system for the whole event.",
    ],
    image: "/media/rig-02.jpg",
    imageAlt:
      "A DJ booth between two stacks of line array speakers and subwoofers, set up beside a hotel pool",
    imageFit: "cover",
    sections: [
      {
        heading: "The DJ booth",
        body: [
          "We set up booth monitors next to the decks so the DJ can hear their mix clearly. The booth monitors have their own volume control, separate from the main speakers, so the DJ can turn them up without changing the level on the dance floor.",
          "Most DJs bring their own decks and mixer and plug into our system. If you need us to provide decks and a mixer, say so when you ask for a quote.",
        ],
      },
      {
        heading: "Built for electronic music",
        body: [
          "We put the system together for house, techno, drum and bass, dubstep and trance. Those genres need a lot of clean low end at high volume, so the subwoofers are a big part of what we bring. The system works for other kinds of music as well.",
        ],
      },
      {
        heading: "Events we do",
        body: [
          "We do club nights and takeovers, pool parties and day parties, warehouse and after-hours events, and outdoor events in the desert. We also do festival side stages, private parties and brand events.",
          "Because the system runs on our own battery power, we can set up in places that don't have outlets near the stage, like a pool deck, a rooftop or an empty lot.",
        ],
      },
    ],
    serviceName: "DJ sound system rental",
  },

  battery: {
    slug: "battery-powered-sound",
    metaTitle: "Battery-Powered Sound System Rental",
    metaDescription:
      "A full event sound system that runs on our own battery power, for rooftops, desert sites and venues without enough power. Phoenix and across Arizona.",
    linkLabel: "Battery-powered sound",
    h1: "Battery-powered sound system rental in Arizona",
    intro: [
      `Our whole sound system runs on our own battery power. That includes the line array, the subwoofers and the DJ booth monitors, and it is a full event system for up to about ${crowd.max} people.`,
      "We bring the battery to every event, so the venue does not need to provide any power for the sound.",
    ],
    image: "/media/power.png",
    imageAlt: "A large battery power station on a wheeled cart",
    imageFit: "contain",
    sections: [
      {
        heading: "Where it helps",
        body: [
          "Battery power lets us put a full system on rooftops, in courtyards, at desert sites and in empty lots. It also works in older buildings and warehouses where the wiring can't handle a sound system.",
        ],
      },
      {
        heading: "Quiet, with no exhaust",
        body: [
          "The battery doesn't make any noise and doesn't give off fumes, so it can sit right next to the stage. There is no fuel to bring to the site.",
        ],
      },
      {
        heading: "Planning the power",
        body: [
          "When you ask for a quote, tell us when the event starts and ends, including any time the DJs need for setup and sound check. We plan the power around those times.",
        ],
      },
    ],
    serviceName: "Battery-powered sound system rental",
  },
} as const satisfies Record<string, ServicePage>;

export const serviceList: readonly ServicePage[] = [
  services.lineArray,
  services.dj,
  services.battery,
];

/* -------------------------------------------------------------------------- */
/* Navigation                                                                  */
/* -------------------------------------------------------------------------- */

export const navLinks = [
  { label: "Line array and PA", href: `/${services.lineArray.slug}` },
  { label: "DJ events", href: `/${services.dj.slug}` },
  { label: "Battery power", href: `/${services.battery.slug}` },
  { label: "Contact", href: "#contact" },
] as const;

/* -------------------------------------------------------------------------- */
/* Home page                                                                   */
/* -------------------------------------------------------------------------- */

export const hero = {
  title: "Sound system rental in Phoenix, Arizona",
  body: [
    `We rent out a full sound system for events across Arizona, with an engineer who sets it up and runs it. The system is a line array with subwoofers, DJ booth monitors and our own battery power, and it covers events of up to about ${crowd.max} people.`,
    "Most of our events are electronic music events, like club nights, pool parties and warehouse parties.",
  ],
  primaryCta: { label: "Get a quote", href: "#contact" },
  image: "/media/hero.jpg" as string | null,
  imageAlt:
    "The Arizona Sound System rig on a pool deck stage: line arrays on subwoofer stacks either side of a DJ booth under truss and a shade sail",
} as const;

export type GearItem = {
  id: string;
  title: string;
  body: string;
  link?: { label: string; href: string };
  tone: MediaTone;
  /** Product cutout on a transparent background, shown over the tone gradient. */
  image: string | null;
  imageAlt: string;
};

export const system = {
  title: "What we bring",
  intro:
    "We own the system and bring the same setup to every event. Each booking includes the speakers, the cabling, the power and an engineer.",
} as const;

export const gear: readonly GearItem[] = [
  {
    id: "tops",
    title: "Line array",
    body: "The main speakers are a professional line array. We stack them on the subwoofers or put them on poles, depending on the venue, and aim them at the crowd.",
    link: {
      label: "Line array and PA rental",
      href: `/${services.lineArray.slug}`,
    },
    tone: "night",
    image: "/media/top.png",
    imageAlt: "A line array speaker, seen from the front at an angle",
  },
  {
    id: "subs",
    title: "Subwoofers",
    body: "We bring professional touring subwoofers, enough for a full dance floor. They are built for bass-heavy music, and we can arrange them so less bass goes behind the stage.",
    tone: "ember",
    image: "/media/sub.png",
    imageAlt: "A powered subwoofer cabinet, seen from the front at an angle",
  },
  {
    id: "booth",
    title: "DJ booth monitors",
    body: "The DJ gets monitors with their own volume control, separate from the main speakers. You can bring your own decks and mixer, or ask us about providing them.",
    link: { label: "DJ sound system rental", href: `/${services.dj.slug}` },
    tone: "sand",
    image: "/media/booth.png",
    imageAlt: "A booth monitor speaker, seen from the front at an angle",
  },
];

export const power = {
  title: "Battery power",
  body: [
    "The whole system runs on our own battery power, so the venue does not need to provide any. The battery is silent and has no exhaust.",
    "That means we can set up on rooftops, in courtyards and at desert sites, and in older buildings that can't supply enough power for a sound system.",
  ],
  link: {
    label: "More about battery-powered sound",
    href: `/${services.battery.slug}`,
  },
  image: "/media/power.png" as string | null,
  imageAlt: "A battery power station on a wheeled cart",
} as const;

export const events = {
  title: "Events we do",
  body: "We mostly do electronic music events: club nights and takeovers, pool parties and day parties, warehouse and after-hours events, and outdoor events in the desert. We also do festival side stages, private parties and brand events. The system was put together for house, techno, drum and bass, dubstep and trance, and it works for other music too.",
} as const;

export const process = {
  title: "How booking works",
  steps: [
    {
      title: "Send us the details",
      body: "Send us the date, the location, a rough headcount, whether it is indoors or outdoors, and when the event starts and ends. That is enough for us to give you a price.",
    },
    {
      title: "We set up",
      body: "On the day, we deliver the system, set it up, tune it to the space and do a sound check before guests arrive.",
    },
    {
      title: "We run it and pack up",
      body: "Our engineer runs the system for the whole event. When it is over, we take everything down and load it out.",
    },
  ],
} as const;

export type MediaSlot = {
  id: string;
  tone: MediaTone;
  image: string | null;
  imageAlt: string;
};

export const gallerySlots: readonly MediaSlot[] = [
  {
    id: "pool",
    tone: "sand",
    image: "/media/rig-02.jpg",
    imageAlt:
      "Line arrays stacked on subwoofers either side of a DJ booth under truss, beside a hotel pool",
  },
  {
    id: "stage",
    tone: "ember",
    image: "/media/rig-01.jpg",
    imageAlt:
      "Two line array speakers on a stack of subwoofers next to a DJ booth, with a DJ on stage",
  },
];

/* -------------------------------------------------------------------------- */
/* Contact section                                                             */
/* -------------------------------------------------------------------------- */

export const inquiry = {
  title: "Get a quote",
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
 * The home page's title and description in search results. The title leads
 * with the phrase people type and the city, then the name. There used to be
 * a keywords list here too; Google hasn't read the meta keywords tag in
 * years, so it went.
 */
export const seo = {
  /**
   * Codes from Google Search Console and Bing Webmaster Tools, for the
   * "HTML tag" way of proving we own the site. Paste the content="..." part
   * only. Left null, no tag is printed.
   */
  verification: {
    google: null as string | null,
    bing: null as string | null,
  },
  title: "Sound System Rental in Phoenix, AZ | Arizona Sound System",
  description:
    "Sound system rental for events across Arizona. Line array, subwoofers, booth monitors and battery power, with an engineer on site, for up to 1,000 people.",
} as const;

/* -------------------------------------------------------------------------- */
/* Service area                                                                */
/* -------------------------------------------------------------------------- */

export const serviceArea = {
  title: "Where we work",
  intro:
    "We are based in Phoenix and do most of our events around the Valley, including Scottsdale, Tempe, Mesa, Chandler, Gilbert, Glendale and Peoria. We also travel to Tucson, Flagstaff, Sedona, Prescott, Lake Havasu City, Yuma and anywhere else in Arizona.",
  /** Only used for areaServed in the structured data now; the page says it in a sentence. */
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
 * Real questions, plain answers. They're also published as FAQPage data,
 * which Google stopped showing as a rich result in May 2026, so it's there
 * for other search engines and costs nothing. Keep them factual: no prices
 * and no promises the crew can't keep.
 */
export const faq = {
  title: "Questions people ask",
  items: [
    {
      question: "How many people can the system play for?",
      answer: `The system is sized for up to about ${crowd.max} people outdoors at electronic music volume. Indoors, or for quieter music, it can cover more. Tell us your expected crowd size and the venue and we will let you know if it is a good fit.`,
    },
    {
      question: "Do we need to provide power?",
      answer:
        "No. We bring our own battery power and the whole system runs on it, so the venue does not need to provide any. It is silent and has no exhaust, so it works on rooftops, at desert sites and in older buildings.",
    },
    {
      question: "What is included?",
      answer:
        "The line array, subwoofers, booth monitors, cabling and battery power, plus an engineer who delivers the system, sets it up, tunes it, runs it during the event and takes it down afterward.",
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
      answer:
        "Anywhere in Arizona. We are based in Phoenix and do most of our events around the Valley, and we also travel to Tucson, Flagstaff, Sedona and the rest of the state.",
    },
    {
      question: "Can you keep the bass down for the neighbors?",
      answer:
        "In most cases, yes. The subwoofers can be arranged so the bass goes forward into the crowd and less of it goes behind the stage, which helps at venues with neighbors close by. Tell us about the site and we will plan the layout.",
    },
    {
      question: "How do I get a price?",
      answer: `Fill out the form or call ${contact.phone}. A date, a location and a rough headcount are enough for us to put together a quote. The earlier you reach out the better, but feel free to ask about short notice.`,
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Footer                                                                      */
/* -------------------------------------------------------------------------- */

export const footer = {
  // One plain sentence about who we are, on every page. AI answers quote
  // pages that name the business and say what it does in the same sentence.
  blurb: `Arizona Sound System is a sound system rental company based in Phoenix, Arizona. We bring a line array, subwoofers, DJ booth monitors and our own battery power, with an engineer, to events of up to about ${crowd.max} people across the state.`,
  columns: [
    {
      title: "Services",
      links: serviceList.map((page) => ({
        label: page.linkLabel,
        href: `/${page.slug}`,
      })),
    },
    {
      title: "More",
      links: [
        { label: "Get a quote", href: "/#contact" },
        { label: "Questions", href: "/#faq" },
        { label: "Privacy policy", href: "/privacy" },
      ],
    },
  ],
} as const;
