import type { MenuIconName } from "@/lib/pages/menu";

/** Circle as a path segment, so every icon stays a single <path>. */
const c = (cx: number, cy: number, r: number) => ` M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;

/** 24px line icons for the mega menu (stroke = currentColor). */
const PATHS: Record<MenuIconName, string> = {
  pin: "M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  gear: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z M20 20l-4-4",
  link: "M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7 M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7",
  store: "M4 9l1.5-5h13L20 9 M4 9h16v2a3 3 0 0 1-6 0 3 3 0 0 1-4 0 3 3 0 0 1-6 0z M5 13v7h14v-7 M10 20v-4h4v4",
  spark: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z M19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z",
  robot: "M5 9h14v10H5z M12 5v4 M12 4.5a.5.5 0 1 0 0-1 M9 14h.01 M15 14h.01 M9.5 17h5 M3 13v2 M21 13v2",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21a8 8 0 0 1 16 0",
  branches: "M6 4v8a4 4 0 0 0 4 4h8 M6 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M6 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M18 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  bag: "M5 8h14l-1 13H6z M9 8V6a3 3 0 0 1 6 0v2",
  cart: "M3 4h2l2.4 11h11.2L21 7H6.2 M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M18 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
  building: "M4 21V5l8-2v18 M12 8h8v13 M8 8h.01 M8 12h.01 M8 16h.01 M16 12h.01 M16 16h.01 M2 21h20",
  box: "M21 8l-9-5-9 5 9 5z M3 8v8l9 5 9-5V8 M12 13v8",
  chat: "M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z",
  tag: "M3 12V4h8l10 10-8 8z M7.5 8.5h.01",
  gauge: "M12 14l4-4 M4 18a9 9 0 1 1 16 0",
  backlink: "M9 15l6-6 M11 6l.5-.5a4 4 0 0 1 6 6l-.5.5 M13 18l-.5.5a4 4 0 0 1-6-6l.5-.5",
  traffic: "M3 17l6-6 4 4 8-8 M15 7h6v6",
  rank: "M4 20V10 M10 20V4 M16 20v-7 M3 20h18",
  book: "M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z M4 19V5 M8 7h7",
  pen: "M4 20h4L19 9l-4-4L4 16z M13.5 6.5l4 4",
  info: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M12 11v5 M12 8h.01",
  trophy: "M8 4h8v5a4 4 0 0 1-8 0z M8 6H5a3 3 0 0 0 3 4 M16 6h3a3 3 0 0 1-3 4 M12 13v4 M8 21h8 M9 17h6v4H9z",
  mail: "M3 6h18v12H3z M3 7l9 6 9-6",
  check: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M8 12l3 3 5-6",
  grid: "M4 4h7v7H4z M13 4h7v7h-7z M4 13h7v7H4z M13 13h7v7h-7z",
  // Industries
  hammer: "M13 3l5 5-3 3-5-5z M10 8l-7 7 3 3 7-7 M16 6l3-3",
  drop: "M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5",
  roof: "M3 12l9-8 9 8 M5 10v10h14V10 M10 20v-5h4v5",
  snow: "M12 3v18 M4.2 7.5l15.6 9 M4.2 16.5l15.6-9 M9.5 4.5L12 6l2.5-1.5 M9.5 19.5L12 18l2.5 1.5",
  bolt: "M13 3L5 14h6l-1 7 8-11h-6z",
  tooth: "M7 3C4.5 3 3 5 3 7.5c0 3 1.5 5 2 8 .4 2.6 1 5.5 2.5 5.5S9.5 17 12 17s2 4 4.5 4 2.1-2.9 2.5-5.5c.5-3 2-5 2-8C21 5 19.5 3 17 3c-2 0-3 1-5 1S9 3 7 3z",
  cross: "M9 3h6v6h6v6h-6v6H9v-6H3V9h6z",
  spine: "M9 3h6v3H9z M8 8h8v3H8z M9 13h6v3H9z M10 18h4v3h-4z",
  leaf: "M5 19C5 10 11 5 20 5c0 9-5 15-14 15 M5 19l8-8",
  paw: "M12 13c-3 0-5 3-5 5 0 1.7 1.3 2.5 2.7 2 1-.3 1.6-.5 2.3-.5s1.3.2 2.3.5c1.4.5 2.7-.3 2.7-2 0-2-2-5-5-5z" + c(5.5, 10.5, 1.6) + c(9.5, 6.5, 1.6) + c(14.5, 6.5, 1.6) + c(18.5, 10.5, 1.6),
  scale: "M12 3v18 M7 21h10 M5 7h14 M5 7l-3 7a3 3 0 0 0 6 0z M19 7l-3 7a3 3 0 0 0 6 0z",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z M12 9v6 M9 12h6",
  car: "M3 16v-4l2-5h14l2 5v4z M5 16v3h3v-3 M16 16v3h3v-3 M7 12h.01 M17 12h.01",
  calc: "M6 3h12v18H6z M9 7h6 M9 11h.01 M12 11h.01 M15 11h.01 M9 14h.01 M12 14h.01 M15 14h.01 M9 17h.01 M12 17h.01 M15 17h.01",
  umbrella: "M3 12a9 9 0 0 1 18 0z M12 12v6a2 2 0 0 0 4 0 M12 3v1",
  fork: "M7 3v8 M5 3v5a2 2 0 0 0 4 0V3 M7 11v10 M17 3c-2 0-3 2-3 5s1 4 3 4v9",
  house: "M3 11l9-7 9 7 M5 9.5V20h14V9.5 M9 20v-6h6v6",
  wrench: "M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z",
  bed: "M3 18V7 M3 14h18v4 M21 14v-2a3 3 0 0 0-3-3h-7v5" + c(7, 11.5, 1.5),
  cloud: "M7 18h10a4 4 0 0 0 .5-8A6 6 0 0 0 6 11.5 3.3 3.3 0 0 0 7 18z",
};

export function MenuIcon({ name }: { name: MenuIconName }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={PATHS[name]} />
    </svg>
  );
}
