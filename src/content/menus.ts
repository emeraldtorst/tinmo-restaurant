/**
 * The menus shown in the pop-out viewer. Each PDF lives in /public/menu — to update a menu, replace the file
 * (keep the name) or change the path here. Names and notes are in text/en.ts + de.ts (`menus`).
 */
export const menuFiles = [
  { id: "food", file: "/menu/speisekarte.pdf" },
  { id: "lunch", file: "/menu/menue-b.pdf" },
  { id: "patisserie", file: "/menu/patisserie.pdf" },
] as const;

export type MenuId = (typeof menuFiles)[number]["id"];
