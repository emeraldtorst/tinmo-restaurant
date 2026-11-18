/**
 * Guest reviews and press, shown in the "Gäste & Presse" section.
 *
 * Reviews are quoted word for word from the public Google Maps listing (read 18.11.2026), in their original German, and
 * all are five-star. The rating is the listing's own figure at that date: 5.0 from 12 reviews. Update `google` when the
 * numbers change, and only ever add real reviews.
 */
export const google = { rating: { de: "5,0", en: "5.0" }, count: 12 };

export interface GuestReview {
  name: string;
  /** Word for word, original language. */
  text: string;
  /** When it was posted, as Google shows it. */
  when: { de: string; en: string };
}

export const reviews: GuestReview[] = [
  {
    name: "Jasmin Zimmermann",
    text: "Das Essen war unglaublich lecker, besonders die Ente war ein absolutes Highlight – super zart und geschmacklich einfach top! Auch das Sushi war extrem frisch und richtig köstlich. Wir waren rundum begeistert und kommen auf jeden Fall gerne wieder! Absolute Empfehlung!",
    when: { de: "November 2026", en: "November 2026" },
  },
  {
    name: "Michael Rosar",
    text: "Es war wirklich sehr gut. Ich hatte Roll und Maki, Dessert mit Cocktail, aber auch die Miso Suppe als Starter. War alles vom Feinsten. Bravo! Ich komme gerne wieder, um andere Speisen der reichhaltigen Karte zu genießen. Weiter so!",
    when: { de: "November 2026", en: "November 2026" },
  },
  {
    name: "jay",
    text: "Das Sushi schmeckt fantastisch!",
    when: { de: "November 2026", en: "November 2026" },
  },
];

export interface PressItem {
  outlet: string;
  /** ISO date of publication. */
  date: string;
  /** The article's own headline. */
  title: string;
  url: string;
}

export const press: PressItem[] = [
  {
    outlet: "Falstaff",
    date: "2026-11-17",
    title: "Tinmo bringt Sushi, Dim Sum und asiatische Klassiker in die Wiener Innenstadt",
    url: "https://www.falstaff.com/at/news/tinmo-bringt-sushi-dim-sum-und-asiatische-klassiker-in-die-wiener-innenstadt",
  },
  {
    outlet: "gastro.news",
    date: "2026-11-16",
    title: "Ein asiatisches Herzensprojekt",
    url: "https://gastro.news/ein-asiatisches-herzensprojekt/",
  },
];
