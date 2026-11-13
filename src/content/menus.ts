/**
 * The menus shown in the pop-out viewer, in this order: the lunch menu, the Speisekarte (main menu and drinks) and the
 * pâtisserie card. Every PDF page is also pre-rendered to an image in /public/menu/pages, because phones often show only
 * the first page of an embedded PDF. `spreads` groups the pages the way they are shown together on a wide screen, like
 * an open menu book (the Speisekarte in pairs, the closing page on its own); on a phone every page gets
 * its own row.
 * To update a menu: replace the PDF in /public/menu, re-render its pages and update this list. Names and notes are in
 * text/en.ts + de.ts (`menus`).
 */
export const menuFiles = [
  {
    id: "lunch",
    file: "/menu/lunch.pdf",
    spreads: [
      [{ src: "/menu/pages/lunch-01.webp", width: 1300, height: 1839 }, { src: "/menu/pages/lunch-02.webp", width: 1300, height: 1839 }],
    ],
  },
  {
    id: "food",
    file: "/menu/speisekarte.pdf",
    spreads: [
      [{ src: "/menu/pages/food-02.webp", width: 1300, height: 1839 }, { src: "/menu/pages/food-03.webp", width: 1300, height: 1839 }],
      [{ src: "/menu/pages/food-04.webp", width: 1300, height: 1839 }, { src: "/menu/pages/food-05.webp", width: 1300, height: 1839 }],
      [{ src: "/menu/pages/food-06.webp", width: 1300, height: 1839 }, { src: "/menu/pages/food-07.webp", width: 1300, height: 1839 }],
      [{ src: "/menu/pages/food-08.webp", width: 1300, height: 1839 }, { src: "/menu/pages/food-09.webp", width: 1300, height: 1839 }],
      [{ src: "/menu/pages/food-10.webp", width: 1300, height: 1839 }, { src: "/menu/pages/food-11.webp", width: 1300, height: 1839 }],
      [{ src: "/menu/pages/food-12.webp", width: 1300, height: 1839 }, { src: "/menu/pages/food-13.webp", width: 1300, height: 1839 }],
      [{ src: "/menu/pages/food-14.webp", width: 1300, height: 1839 }],
    ],
  },
  {
    id: "patisserie",
    file: "/menu/patisserie.pdf",
    spreads: [
      [{ src: "/menu/pages/patisserie-01.webp", width: 1300, height: 1832 }, { src: "/menu/pages/patisserie-02.webp", width: 1300, height: 1832 }],
    ],
  },
] as const;

export type MenuId = (typeof menuFiles)[number]["id"];
