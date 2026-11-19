import { track } from "./analytics";

export type LeadType = "audit" | "backlink-report" | "traffic-report" | "rank-report" | "newsletter" | "contact";

/** Sends a form submission to /api/lead. Resolves with an error message, or null on success. */
export async function submitLead(data: { type: LeadType; email?: string; website?: string; name?: string; keywords?: string; location?: string; message?: string }) {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...data, page: typeof window !== "undefined" ? window.location.pathname : "" }),
    });
    if (res.ok) {
      // GA4 recommended event; mark "generate_lead" as a key event in GA4 to count conversions.
      track("generate_lead", { form_type: data.type });
      return null;
    }
    const json = await res.json().catch(() => ({}));
    return (json.error as string) || "Something went wrong. Please try again.";
  } catch {
    return "You seem to be offline. Check your connection and try again.";
  }
}
