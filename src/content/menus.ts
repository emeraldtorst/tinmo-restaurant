/**
 * The menus shown in the pop-out viewer: the A4 menu (Speisekarte, drinks and the lunch menu, in one PDF) and the A6
 * pâtisserie card. Every PDF page is also pre-rendered to an image in /public/menu/pages, because phones often show only
 * the first page of an embedded PDF; the pop-out shows the images and links to the PDF.
 * To update a menu: replace the PDF in /public/menu, re-render its pages and update this list. Names and notes are in
 * text/en.ts + de.ts (`menus`).
 */
export const menuFiles = [
  {
    id: "food",
    file: "/menu/speisekarte.pdf",
    pages: [
      { src: "/menu/pages/food-01.webp", width: 1300, height: 1839 },
      { src: "/menu/pages/food-02.webp", width: 1300, height: 1839 },
      { src: "/menu/pages/food-03.webp", width: 1300, height: 1839 },
      { src: "/menu/pages/food-04.webp", width: 1300, height: 1839 },
      { src: "/menu/pages/food-05.webp", width: 1300, height: 1839 },
      { src: "/menu/pages/food-06.webp", width: 1300, height: 1839 },
      { src: "/menu/pages/food-07.webp", width: 1300, height: 1839 },
      { src: "/menu/pages/food-08.webp", width: 1300, height: 1839 },
      { src: "/menu/pages/food-09.webp", width: 1300, height: 1839 },
      { src: "/menu/pages/food-10.webp", width: 1300, height: 1839 },
      { src: "/menu/pages/food-11.webp", width: 1300, height: 1839 },
      { src: "/menu/pages/food-12.webp", width: 1300, height: 1839 },
      { src: "/menu/pages/food-13.webp", width: 1300, height: 1839 },
      { src: "/menu/pages/food-14.webp", width: 1300, height: 1839 },
      { src: "/menu/pages/food-15.webp", width: 1300, height: 1839 },
      { src: "/menu/pages/food-16.webp", width: 1300, height: 1839 },
    ],
  },
  {
    id: "patisserie",
    file: "/menu/patisserie.pdf",
    pages: [
      { src: "/menu/pages/patisserie-01.webp", width: 1300, height: 1832 },
      { src: "/menu/pages/patisserie-02.webp", width: 1300, height: 1832 },
    ],
  },
] as const;

export type MenuId = (typeof menuFiles)[number]["id"];
