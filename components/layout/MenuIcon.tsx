import type { MenuIconName } from "@/lib/pages/menu";

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
};

export function MenuIcon({ name }: { name: MenuIconName }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={PATHS[name]} />
    </svg>
  );
}
