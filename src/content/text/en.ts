/**
 * ALL English wording for the site lives in this file (German: de.ts — same shape, enforced by
 * TypeScript). Edit the text here; images are in media.ts and structure/data in the other
 * src/content files. Anything marked "placeholder" is illustrative until the owner confirms it.
 */
export const en = {
  htmlLang: "en",
  ogLocale: "en_GB",
  meta: {
    title: "TINMO — Sushi & Asian Cuisine in Vienna",
    description:
      "TINMO in Vienna's city centre: sushi, dim sum, udon, Thai curry and pâtisserie, with sake and house-made lemonades. Marc-Aurel-Straße 2a, 1010 Vienna.",
    cuisine: "Sushi, Asian cuisine",
    tagline: "Sushi | Asian Cuisine",
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
    reserve: "Reserve a table",
    call: "Call",
    getDirections: "Get directions",
    directionsPending: "Directions — address to be confirmed",
    directionsPendingReason: "Directions are available once the address is confirmed.",
    imageUnavailable: "Image unavailable",
    pauseVideo: "Pause background video",
    playVideo: "Play background video",
    closed: "Closed",
    backHome: "Back to the homepage",
    backToTop: "Back to top",
  },
  nav: {
    menu: "Menu",
    room: "Room",
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
    title: ["Book your ", { em: "table" }, "."],
    body: "Call or email us and we’ll find you a table.",
    call: "Call",
    email: "Email",
    close: "Close",
  },
  hero: {
    line: "Sushi, dim sum and udon by lantern light, in the heart of Vienna.",
    menuLabel: "View the menu",
  },
  dishes: {
    heading: "From the kitchen",
    intro: "Sushi and maki, dim sum, udon, Thai curry, and pâtisserie to finish.",
    captions: ["Korean Chicken","Salmon Teriyaki","Pumpkin croquettes on stir-fried udon","Cashew Chicken","Tropical Cheesecake","Matcha Terramisu"],
  },
  menus: {
    title: "Menu",
    food: { name: "Menu", note: "Food, drinks and the lunch menu (Wed and Fri)" },
    patisserie: { name: "Pâtisserie", note: "Matcha terramisu, pistachio, Kumo and more" },
    view: "View",
    openPdf: "Open PDF",
    close: "Close",
    tabs: "Menus",
  },
  gallery: {
    heading: "The room",
    intro: "Paper lanterns, warm timber and a long bar. The light stays low.",
  },
  visit: {
    heading: "Visit us",
    address: "Address",
    phone: "Phone",
    email: "Email",
    hoursLabel: "Opening hours",
    hoursNote: "",
    holidays: "Public holidays: 12:00–22:00",
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
      openInMaps: "Open in Google Maps",
    },
  },
  reserve: {
    heading: "A table for tonight",
    line: "Reservations by phone or email.",
  },
  footer: {
    visit: "Visit",
    navigate: "Navigate",
    contact: "Contact",
    openingHours: "Opening hours",
    placeholderTimes: "Placeholder times",
    rights: "All rights reserved.",
  },
  alt: {
    food1: "Korean Chicken: crispy chicken in sweet-and-sour sauce with sesame seeds and pea shoots.",
    food2: "Salmon Teriyaki: grilled salmon with vegetables and sesame.",
    food3: "Pumpkin croquettes on stir-fried udon with grilled vegetables.",
    food4: "Cashew Chicken with green vegetables on a stone plate.",
    dessert1: "Tropical Cheesecake: a coconut cheesecake with a mango blossom and a pipette of exotic fruit.",
    dessert2: "Matcha Terramisu with fresh mint in a red clay pot.",
    interior1: "The dining room with wooden tables, velvet chairs and paper lanterns.",
    interior2: "The entrance staircase and the long bar beneath hanging paper panels.",
    interior3: "Tables and chairs under exposed ducts, the bar in the background.",
    interior4: "A paper lantern and hanging glasses above the long wooden bar.",
    interior5: "A table in front of the blossom-tree mural, lit by paper lanterns.",
    heroVideo: "A cook tosses food in a wok over a roaring gas flame in a busy kitchen.",
  } as Record<string, string>,
  legal: {
    imprint: {
      title: "Legal notice",
      description: "Legal notice (Impressum) for the TINMO website.",
      intro: "Information under Austrian law (§ 5 E-Commerce Act, § 14 Commercial Code, § 63 Trade Act and § 25 Media Act).",
      rows: {
        operator: "Company, media owner and publisher",
        legalForm: "Legal form",
        seat: "Registered office and business address",
        managing: "Managing director",
        contact: "Contact",
        register: "Company register",
        vat: "VAT ID (UID)",
        trade: "Trade",
        authority: "Trade authority",
        chamber: "Chamber membership",
        regulations: "Applicable regulations",
        regulationsValue: "Trade Act (Gewerbeordnung): www.ris.bka.gv.at",
        purpose: "Business purpose",
        purposeValue: "Operation of the restaurant TINMO (catering business).",
      },
    },
    privacy: {
      title: "Privacy policy",
      description: "How the TINMO website handles personal data.",
      intro: "A plain-language summary of which data is processed when you visit this website, in line with the GDPR and the Austrian Data Protection Act.",
      updated: "Last updated: November 2026",
      sections: [
        {
          heading: "1. Controller",
          paragraphs: [
            "The controller for this website is {company}, {address}, Austria (company register no. {register}). Contact: {email}, {phone}.",
          ],
        },
        {
          heading: "2. Hosting and server logs",
          paragraphs: [
            "When you open this website, our hosting provider processes technically necessary data (for example your IP address, the time, the page requested and your browser type) to deliver the page and keep it secure. Legal basis: our legitimate interest in secure and stable operation (Art. 6(1)(f) GDPR).",
          ],
        },
        {
          heading: "3. No cookies, no tracking",
          paragraphs: [
            "This website does not set cookies for analytics or advertising and uses no tracking or analytics services. Fonts, images, video and the menus (PDF) are served from our own server. The one exception is the Google Map (see section 5).",
          ],
        },
        {
          heading: "4. Menus (PDF)",
          paragraphs: [
            "The menus are shown as PDF files from our own server. No data is passed on to third parties.",
          ],
        },
        {
          heading: "5. Google Maps",
          paragraphs: [
            "The “Visit” section shows a Google Map. When the page loads, your browser connects to Google, your IP address is sent to Google, and Google may set cookies or process further data. Legal basis: our legitimate interest in showing our location clearly (Art. 6(1)(f) GDPR). Google’s privacy policy: https://policies.google.com/privacy",
          ],
        },
        {
          heading: "6. Getting in touch and reservations",
          paragraphs: [
            "If you contact us by email or phone or reserve a table, we process the details you give us (for example name, phone number, number of guests, date and time) to answer your enquiry and organise your reservation (Art. 6(1)(b) or (f) GDPR). We delete them once they are no longer needed and do not pass them on to third parties.",
          ],
        },
        {
          heading: "7. Storage period",
          paragraphs: [
            "We keep personal data only as long as needed for the purpose or as required by statutory retention duties.",
          ],
        },
        {
          heading: "8. Your rights",
          paragraphs: [
            "You have the right of access, rectification, erasure, restriction of processing, data portability and objection. Write to {email} to exercise them. You can also complain to the Austrian Data Protection Authority (Barichgasse 40–42, 1030 Vienna, www.dsb.gv.at).",
          ],
        },
      ],
    },
  },
};

export type TextBundle = typeof en;
