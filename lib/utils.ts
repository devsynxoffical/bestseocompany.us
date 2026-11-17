export const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

export const cx = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(" ");

export const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/** Formats a number with optional decimals, thousands separator, prefix and suffix. */
export function formatNumber(
  value: number,
  { decimals = 0, separator = false, prefix = "", suffix = "" }: { decimals?: number; separator?: boolean; prefix?: string; suffix?: string } = {},
) {
  const fixed = separator
    ? value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : value.toFixed(decimals);
  return prefix + fixed + suffix;
}
