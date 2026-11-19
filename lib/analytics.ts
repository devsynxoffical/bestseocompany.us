type Gtag = (cmd: "event", name: string, params?: Record<string, unknown>) => void;

/** Sends a GA4 event if GA4 is loaded; does nothing otherwise. */
export function track(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("event", name, { page_path: window.location.pathname, ...params });
}
