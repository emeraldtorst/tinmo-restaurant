/**
 * ALL English wording for the site lives in this file (German: de.ts — same shape, enforced by
 * TypeScript). Edit the text here; images are in media.ts and structure/data in the other
 * src/content files. Anything marked "placeholder" is illustrative until the owner confirms it.
 */
export const en = {
  htmlLang: "en",
  ogLocale: "en_GB",
  meta: {
    title: "TINMO — Modern Asian fusion restaurant",
    description:
      "TINMO is a modern Asian fusion restaurant in Vienna: distinctive flavours, thoughtful ingredients and the pleasure of sharing a table.",
    cuisine: "Asian fusion",
    tagline: "An unexpected meeting of Asian flavours.",
    menuTitle: "Menu",
    menuDescription: "The TINMO menu: small plates, mains, sides and sweets built for sharing.",
    notFoundTitle: "Page not found",
  },
  ui: {
    skip: "Skip to content",
    homeAria: "TINMO — home",
    language: "Language",
    menuOpen: "Menu",
    menuClose: "Close",
    navPrimary: "Primary",
    navMobile: "Mobile",
    navFooter: "Footer",
    reserve: "Reserve a Table",
    call: "Call",
    getDirections: "Get Directions",
    directionsPending: "Directions — address to be confirmed",
    directionsPendingReason: "Directions are available once the address is confirmed.",
    imageUnavailable: "Image unavailable",
    pauseVideo: "Pause background video",
    playVideo: "Play background video",
    closed: "Closed",
    backHome: "Back to the homepage",
  },
  nav: {
    story: "Story",
    menu: "Menu",
    atmosphere: "Atmosphere",
    reviews: "Guest notes",
    visit: "Visit",
    imprint: "Legal notice",
    privacy: "Privacy",
  },
  placeholders: {
    address: "Address to be confirmed",
    phone: "Phone number to be added",
    email: "Email address to be added",
    instagram: "Instagram — link to be added",
  },
  dialog: {
    eyebrow: "Reservations",
    title: ["Booking opens ", { em: "soon" }, "."],
    body: "Online reservations aren’t connected yet. In the meantime, please get in touch and we’ll find you a table.",
    call: "Call",
    email: "Email",
    devNote: "Placeholder — set reservation.url in src/content/site.ts to connect a booking provider.",
    close: "Close",
  },
  hero: { eyebrow: "01 — Asian fusion", menuLabel: "Explore the Menu" },
  story: {
    placeholderNote: "Placeholder copy — to be written with the owner.",
    eyebrow: "02 — Story",
    heading: ["A ", { em: "different" }, " kind of evening."],
    lead: "Rooted in Asian culinary traditions and shaped by contemporary creativity, TINMO brings together distinctive flavours, thoughtful ingredients, and the pleasure of sharing a table.",
    principles: [
      { label: "Technique", text: "Fire, steam and patience, applied with a light hand." },
      { label: "Ingredients", text: "Chosen for flavour first, then arranged with restraint." },
      { label: "Sharing", text: "Plates made to be passed, tasted and talked about." },
    ],
    captions: {
      interior: "The room, before the first guests",
      chef: "Made by hand",
      ingredients: "This week's market",
      table: "Around the table",
    },
  },
  dishes: {
    placeholderNote: "Illustrative dishes and prices — placeholders, not confirmed menu items.",
    eyebrow: "03 — Signature plates",
    heading: ["Made to be ", { em: "remembered" }, "."],
    intro: "A few plates that say who we are. The full menu changes with the season.",
    viewMenu: "View Full Menu",
    plate: "Plate",
    items: {
      "black-cod": {
        name: "Miso-Glazed Black Cod",
        description: "Caramelised white miso glaze, pickled ginger, charred greens.",
        tag: "Signature",
      },
      "crispy-duck": {
        name: "Crispy Duck with Asian Pear",
        description: "Lacquered breast, poached pear, star anise jus.",
        tag: "",
      },
      dumplings: {
        name: "Handcrafted Dumplings",
        description: "Folded to order, black vinegar and chilli oil.",
        tag: "To share",
      },
      "matcha-basque": {
        name: "Matcha Basque Cheesecake",
        description: "Burnt top, soft centre, ceremonial matcha.",
        tag: "",
      },
    } as Record<string, { name: string; description: string; tag: string }>,
  },
  menu: {
    placeholderNote: "Illustrative menu — dishes, descriptions and prices are placeholders.",
    eyebrow: "The Menu",
    heading: ["Made for ", { em: "sharing" }, "."],
    intro: "A short menu of plates built to be passed around the table. Order a few, then a few more.",
    footnote:
      "Placeholder allergen note — replace with the restaurant's real allergen and dietary information. V vegetarian · VG vegan · GF gluten-free.",
    categories: [
      {
        id: "small-plates",
        title: "Small plates",
        note: "Two or three each is a good start.",
        items: [
          { name: "Handcrafted Dumplings", description: "Pork and chive, black vinegar, chilli oil.", price: "00" },
          { name: "Tuna Crudo", description: "Yuzu kosho, ponzu, shiso, toasted sesame.", price: "00" },
          { name: "Charred Aubergine", description: "White miso, sesame, pickled shallot.", price: "00", dietary: ["VG"] },
          { name: "Sichuan Pepper Chicken", description: "Crisp thigh, lime salt, fermented chilli mayo.", price: "00" },
        ],
      },
      {
        id: "mains",
        title: "Mains",
        note: "",
        items: [
          { name: "Miso-Glazed Black Cod", description: "Caramelised glaze, pickled ginger, charred greens.", price: "00" },
          { name: "Crispy Duck with Asian Pear", description: "Lacquered breast, pear, star anise jus.", price: "00" },
          { name: "Short Rib, Gochujang Caramel", description: "Slow-braised, kimchi, spring onion.", price: "00" },
          { name: "Hand-pulled Noodles", description: "Wild mushrooms, XO butter, soft egg.", price: "00", dietary: ["V"] },
        ],
      },
      {
        id: "sides",
        title: "Sides",
        note: "",
        items: [
          { name: "Jasmine Rice", description: "Steamed, with a little toasted sesame oil.", price: "00", dietary: ["VG"] },
          { name: "Tenderstem Broccoli", description: "Garlic, chilli crisp, lemon.", price: "00", dietary: ["VG"] },
        ],
      },
      {
        id: "sweets",
        title: "Sweets",
        note: "",
        items: [
          { name: "Matcha Basque Cheesecake", description: "Burnt top, soft centre, ceremonial matcha.", price: "00", dietary: ["V"] },
          { name: "Black Sesame Ice Cream", description: "Salted caramel, toasted rice.", price: "00", dietary: ["V"] },
        ],
      },
    ] as Array<{
      id: string;
      title: string;
      note: string;
      items: Array<{ name: string; description: string; price: string; dietary?: string[] }>;
    }>,
  },
  gallery: {
    eyebrow: "04 — Atmosphere",
    heading: ["The ", { em: "evening" }, " in detail."],
    intro: "Low light, warm tables, and small things done with care.",
    captions: [
      "The first pour",
      "Around the table",
      "Made in the kitchen",
      "Set for the evening",
      "After the last course",
      "The final touch",
      "Straight from the steam",
    ],
  },
  reviews: {
    eyebrow: "05 — Guest notes",
    heading: ["Good evenings ", { em: "stay" }, " with you."],
    label: "Illustrative guest notes",
    disclosure:
      "Illustrative guest notes — not real reviews. Real feedback will appear here once TINMO is open.",
    notes: [
      "The sort of dinner you describe to friends the next morning.",
      "Every plate had one clear idea, and it was done properly.",
      "We came for an hour and stayed for three.",
    ],
    illustrative: "Guest note — illustrative",
    googlePending: "Google listing — link to be added",
    googlePendingReason: "The Google listing link is added once the restaurant's listing exists.",
    readMore: "Read more reviews",
  },
  visit: {
    eyebrow: "06 — Visit",
    heading: ["Your table ", { em: "awaits" }, "."],
    intro: "Find us, call ahead, or reserve in a moment.",
    address: "Address",
    phone: "Phone",
    email: "Email",
    hoursLabel: "Temporary opening hours",
    hoursNote: "Placeholder times — to be confirmed before launch.",
    days: {
      Monday: "Monday",
      Tuesday: "Tuesday",
      Wednesday: "Wednesday",
      Thursday: "Thursday",
      Friday: "Friday",
      Saturday: "Saturday",
      Sunday: "Sunday",
    },
    map: {
      title: "TINMO on the map",
      placeholder: "Map appears once the address is confirmed",
      loadButton: "Load map",
      consent:
        "Loading the map connects your browser to Google (Google Maps). Nothing is sent to Google until you click.",
      privacyLink: "Privacy policy",
      openInMaps: "Open in Google Maps",
    },
  },
  reserve: {
    eyebrow: "07 — Reserve",
    heading: ["Make an ", { em: "evening" }, " of it."],
    text: "Come hungry. Stay for the conversation.",
  },
  footer: {
    visit: "Visit",
    navigate: "Navigate",
    contact: "Contact",
    openingHours: "Opening hours",
    placeholderTimes: "Placeholder times",
    rights: "All rights reserved.",
    designNote: "Placeholder site — content, imagery and details are illustrative until confirmed.",
  },
  alt: {
    storyInterior: "A dim dining room with banquette seating and tables laid for the evening under warm light.",
    storyChef: "A cook's hands placing a final garnish on a dish in a dark bowl.",
    storyIngredients: "A bunch of fresh herbs tied with twine on dark slate.",
    storyTable: "Hands reaching across a candlelit table of shared dishes, seen from above.",
    ctaEvening: "A long timber table set for dinner, lit by rows of candles.",
    atmoPour: "A hand catching a thin stream of liquid poured from a bottle against a dark background.",
    atmoTable: "Raised glasses of red wine above a candlelit table of shared plates.",
    atmoKitchen: "Noodles tossed in a wok over a roaring gas flame.",
    atmoDetail: "A small white ceramic dish and wooden chopsticks on a timber table.",
    atmoBar: "A softly lit backbar of bottles glowing amber behind a dark bar.",
    atmoPlating: "A chef's hand finishing a plated dish in warm kitchen light.",
    atmoSteam: "Steam rising from a dark bowl, backlit against a window.",
    dishBlackCod: "A glazed fish fillet plated on a ceramic dish.",
    dishDuck: "Sliced roast duck with crisp skin and orange segments in a cream bowl.",
    dishDumplings: "Delicate steamed dumplings topped with a small garnish on a blue-grey plate.",
    dishCheesecake: "A slice of matcha Basque cheesecake with a vivid green top on a grey plate.",
    heroPoster: "A cook tosses food in a wok over a roaring gas flame in a busy kitchen.",
    heroVideo: "A cook tosses food in a wok over a roaring gas flame in a busy kitchen.",
  } as Record<string, string>,
  legal: {
    draftNote:
      "Draft — the operator's details are still missing and this text must be legally reviewed before launch.",
    tbd: "To be added",
    imprint: {
      title: "Legal notice",
      description: "Legal notice (Impressum) for the TINMO website.",
      intro: "Disclosure under Austrian law (including the E-Commerce Act, the Trade Act and the Media Act).",
      rows: {
        operator: "Operator and media owner",
        legalForm: "Legal form",
        address: "Address",
        contact: "Contact",
        vat: "VAT ID (UID)",
        register: "Company register number and court",
        chamber: "Chamber membership",
        authority: "Trade authority",
        regulations: "Applicable regulations",
        regulationsValue: "Trade Act (Gewerbeordnung): www.ris.bka.gv.at",
        purpose: "Purpose of the website",
        purposeValue: "Information about the restaurant TINMO.",
      },
    },
    privacy: {
      title: "Privacy policy",
      description: "How the TINMO website handles personal data.",
      intro: "This is a plain-language summary of how this website handles personal data under the GDPR.",
      sections: [
        {
          heading: "1. Controller",
          paragraphs: [
            "The controller for this website is the operator named in the legal notice. Contact: {email}, {phone}.",
          ],
        },
        {
          heading: "2. Hosting and server logs",
          paragraphs: [
            "When you open this website, the hosting provider processes technically necessary data (for example your IP address, the time, the page requested and your browser type) to deliver the page and keep it secure. Legal basis: our legitimate interest in secure operation (Art. 6(1)(f) GDPR). Hosting provider: to be added.",
          ],
        },
        {
          heading: "3. No cookies, no tracking",
          paragraphs: [
            "This website does not set cookies for analytics or advertising and uses no tracking or analytics services. Fonts, images and video are served from our own server.",
          ],
        },
        {
          heading: "4. Google Maps",
          paragraphs: [
            "The map in the “Visit” section is only loaded after you click “Load map”. When it loads, your IP address is sent to Google and Google may set cookies. Legal basis: your consent (Art. 6(1)(a) GDPR), which you can withdraw at any time by leaving the page. Google’s privacy policy: https://policies.google.com/privacy",
          ],
        },
        {
          heading: "5. Getting in touch",
          paragraphs: [
            "If you contact us by email or phone, we process the details you give us to answer your enquiry (Art. 6(1)(b) or (f) GDPR) and delete them once they are no longer needed.",
          ],
        },
        {
          heading: "6. Reservations",
          paragraphs: [
            "Once an online reservation system is connected, the provider and the data it processes will be named here.",
          ],
        },
        {
          heading: "7. Your rights",
          paragraphs: [
            "You have the right of access, rectification, erasure, restriction of processing, data portability and objection. You can complain to the Austrian Data Protection Authority (www.dsb.gv.at).",
          ],
        },
      ],
    },
  },
};

export type TextBundle = typeof en;
