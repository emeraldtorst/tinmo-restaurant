import type { TextBundle } from "@/content/text/en";

/** Deutsche Texte — gleiche Struktur wie en.ts (von TypeScript erzwungen). Hier Texte bearbeiten. */
export const de: TextBundle = {
  htmlLang: "de",
  ogLocale: "de_AT",
  meta: {
    title: "TINMO — Sushi & Asian Cuisine in Wien",
    description:
      "TINMO in der Wiener Innenstadt: Sushi, Dim Sum, Udon, Thai Curry und Pâtisserie, dazu Sake und hausgemachte Limonaden. Marc-Aurel-Straße 2a, 1010 Wien.",
    cuisine: "Sushi, Asiatische Küche",
    tagline: "Sushi | Asian Cuisine",
    menuTitle: "Speisekarte",
    menuDescription: "Die TINMO-Speisekarte: kleine Teller, Hauptgerichte, Beilagen und Süßes zum Teilen.",
    notFoundTitle: "Seite nicht gefunden",
  },
  ui: {
    skip: "Zum Inhalt springen",
    homeAria: "TINMO — Startseite",
    language: "Sprache",
    menuOpen: "Menü",
    menuClose: "Schließen",
    navPrimary: "Hauptnavigation",
    navMobile: "Mobile Navigation",
    navFooter: "Fußzeile",
    reserve: "Tisch reservieren",
    call: "Anrufen",
    getDirections: "Route planen",
    directionsPending: "Route — Adresse folgt",
    directionsPendingReason: "Die Route ist verfügbar, sobald die Adresse bestätigt ist.",
    imageUnavailable: "Bild nicht verfügbar",
    pauseVideo: "Hintergrundvideo pausieren",
    playVideo: "Hintergrundvideo abspielen",
    closed: "Geschlossen",
    backHome: "Zurück zur Startseite",
    backToTop: "Nach oben",
  },
  nav: {
    menu: "Speisekarte",
    room: "Raum",
    visit: "Besuch",
    imprint: "Impressum",
    privacy: "Datenschutz",
  },
  placeholders: {
    address: "Adresse folgt",
    phone: "Telefonnummer folgt",
    email: "E-Mail-Adresse folgt",
    instagram: "Instagram — Link folgt",
  },
  dialog: {
    eyebrow: "Reservierungen",
    title: ["Tisch ", { em: "reservieren" }, "."],
    body: "Rufen Sie uns an oder schreiben Sie uns – wir finden einen Tisch für Sie.",
    call: "Anrufen",
    email: "E-Mail",
    close: "Schließen",
  },
  hero: {
    line: "Sushi, Dim Sum und Udon bei Laternenlicht, mitten in Wien.",
    menuLabel: "Speisekarte ansehen",
  },
  dishes: {
    heading: "Aus der Küche",
    intro: "Sushi und Maki, Dim Sum, Udon, Thai Curry, zum Schluss Pâtisserie.",
    captions: ["Korean Chicken","Lachs Teriyaki","Kürbiskroketten auf gebratenen Udon","Cashew Chicken","Tropischer Cheesecake","Matcha-Terramisu"],
  },
  menus: {
    title: "Speisekarte",
    food: { name: "Speisekarte", note: "Sushi, Dim Sum, Udon, Curry, Sake und Getränke" },
    lunch: { name: "Lunch", note: "Mi und Fr, 11–17 Uhr. Mit Vorspeise und Obst" },
    patisserie: { name: "Pâtisserie", note: "Matcha-Terramisu, Pistazie, Kumo und mehr" },
    view: "Ansehen",
    openPdf: "PDF öffnen",
    close: "Schließen",
    tabs: "Speisekarten",
  },
  gallery: {
    heading: "Der Raum",
    intro: "Papierlaternen, warmes Holz und eine lange Bar. Das Licht bleibt gedämpft.",
  },
  visit: {
    heading: "Besuchen Sie uns",
    address: "Adresse",
    phone: "Telefon",
    email: "E-Mail",
    hoursLabel: "Öffnungszeiten",
    hoursNote: "",
    holidays: "Feiertage: 12:00–22:00 Uhr",
    days: {
      Monday: "Montag",
      Tuesday: "Dienstag",
      Wednesday: "Mittwoch",
      Thursday: "Donnerstag",
      Friday: "Freitag",
      Saturday: "Samstag",
      Sunday: "Sonntag",
    },
    map: {
      title: "TINMO auf der Karte",
      openInMaps: "In Google Maps öffnen",
    },
  },
  reserve: {
    heading: "Ein Tisch für heute Abend",
    line: "Reservierungen telefonisch oder per E-Mail.",
  },
  footer: {
    visit: "Besuch",
    navigate: "Navigation",
    contact: "Kontakt",
    openingHours: "Öffnungszeiten",
    placeholderTimes: "Platzhalterzeiten",
    rights: "Alle Rechte vorbehalten.",
  },
  alt: {
    food1: "Korean Chicken: knuspriges Hühnerfleisch in süß-saurer Sauce mit Sesam und Erbsensprossen.",
    food2: "Lachs Teriyaki: gegrillter Lachs mit Gemüse und Sesam.",
    food3: "Kürbiskroketten auf gebratenen Udon mit gegrilltem Gemüse.",
    food4: "Cashew Chicken mit grünem Gemüse auf einem Steinteller.",
    dessert1: "Tropischer Cheesecake: Kokos-Cheesecake mit Mango-Blüte und einer Pipette aus exotischen Früchten.",
    dessert2: "Matcha-Terramisu mit frischer Minze im roten Tontopf.",
    interior1: "Der Gastraum mit Holztischen, Samtstühlen und Papierlaternen.",
    interior2: "Die Eingangstreppe und die lange Bar unter hängenden Papierbahnen.",
    interior3: "Tische und Stühle unter freiliegenden Lüftungsrohren, im Hintergrund die Bar.",
    interior4: "Eine Papierlaterne und hängende Gläser über der langen Holzbar.",
    interior5: "Ein Tisch vor dem Wandbild mit Blütenbäumen, beleuchtet von Papierlaternen.",
    heroVideo: "Ein Koch schwenkt Essen im Wok über einer lodernden Gasflamme in einer geschäftigen Küche.",
  },
  legal: {
    imprint: {
      title: "Impressum",
      description: "Impressum der Website von TINMO.",
      intro: "Angaben gemäß § 5 E-Commerce-Gesetz (ECG), § 14 Unternehmensgesetzbuch (UGB), § 63 Gewerbeordnung (GewO) und § 25 Mediengesetz.",
      rows: {
        operator: "Unternehmen, Medieninhaber und Herausgeber",
        legalForm: "Rechtsform",
        seat: "Sitz und Geschäftsanschrift",
        managing: "Geschäftsführer",
        contact: "Kontakt",
        register: "Firmenbuch",
        vat: "UID-Nummer",
        trade: "Gewerbe",
        authority: "Gewerbebehörde",
        chamber: "Kammerzugehörigkeit",
        regulations: "Anwendbare Vorschriften",
        regulationsValue: "Gewerbeordnung (GewO): www.ris.bka.gv.at",
        purpose: "Unternehmensgegenstand",
        purposeValue: "Betrieb des Restaurants TINMO (Gastronomiebetrieb).",
      },
    },
    privacy: {
      title: "Datenschutzerklärung",
      description: "Wie die TINMO-Website mit personenbezogenen Daten umgeht.",
      intro: "Hier erfahren Sie in einfachen Worten, welche Daten beim Besuch dieser Website verarbeitet werden – gemäß Datenschutz-Grundverordnung (DSGVO) und Datenschutzgesetz (DSG).",
      updated: "Stand: November 2026",
      sections: [
        {
          heading: "1. Verantwortlicher",
          paragraphs: [
            "Verantwortlich für diese Website ist {company}, {address}, Österreich (Firmenbuchnummer {register}). Kontakt: {email}, {phone}.",
          ],
        },
        {
          heading: "2. Hosting und Server-Logfiles",
          paragraphs: [
            "Beim Aufruf der Website verarbeitet unser Hosting-Anbieter technisch notwendige Daten (zum Beispiel IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browsertyp), um die Seite auszuliefern und sicher zu betreiben. Rechtsgrundlage: unser berechtigtes Interesse an einem sicheren und stabilen Betrieb (Art. 6 Abs. 1 lit. f DSGVO).",
          ],
        },
        {
          heading: "3. Keine Cookies, kein Tracking",
          paragraphs: [
            "Diese Website setzt keine Cookies für Statistik oder Werbung und verwendet keine Analyse- oder Tracking-Dienste. Schriften, Bilder, Video und Speisekarten (PDF) werden von unserem eigenen Server geladen. Einzige Ausnahme ist die Google-Karte (siehe Abschnitt 5).",
          ],
        },
        {
          heading: "4. Speisekarten (PDF)",
          paragraphs: [
            "Die Speisekarten werden als PDF-Dateien von unserem eigenen Server angezeigt. Dabei werden keine Daten an Dritte übermittelt.",
          ],
        },
        {
          heading: "5. Google Maps",
          paragraphs: [
            "Im Bereich „Besuch“ ist eine Google-Karte eingebunden. Beim Laden der Seite verbindet sich Ihr Browser mit Google, Ihre IP-Adresse wird an Google übermittelt, und Google kann Cookies setzen oder weitere Daten verarbeiten. Rechtsgrundlage: unser berechtigtes Interesse an einer übersichtlichen Darstellung unseres Standorts (Art. 6 Abs. 1 lit. f DSGVO). Datenschutzerklärung von Google: https://policies.google.com/privacy",
          ],
        },
        {
          heading: "6. Kontaktaufnahme und Reservierung",
          paragraphs: [
            "Wenn Sie uns per E-Mail oder Telefon kontaktieren oder einen Tisch reservieren, verarbeiten wir Ihre Angaben (zum Beispiel Name, Telefonnummer, Anzahl der Gäste, Datum und Uhrzeit), um Ihre Anfrage zu beantworten und die Reservierung zu organisieren (Art. 6 Abs. 1 lit. b oder f DSGVO). Wir löschen die Daten, sobald sie nicht mehr benötigt werden, und geben sie nicht an Dritte weiter.",
          ],
        },
        {
          heading: "7. Speicherdauer",
          paragraphs: [
            "Wir speichern personenbezogene Daten nur so lange, wie es für den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.",
          ],
        },
        {
          heading: "8. Ihre Rechte",
          paragraphs: [
            "Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Wenden Sie sich dazu an {email}. Sie können sich außerdem bei der Österreichischen Datenschutzbehörde beschweren (Barichgasse 40–42, 1030 Wien, www.dsb.gv.at).",
          ],
        },
      ],
    },
  },
};
