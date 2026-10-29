const UNITS = [
  { unit: "year", seconds: 60 * 60 * 24 * 365 },
  { unit: "month", seconds: 60 * 60 * 24 * 30 },
  { unit: "week", seconds: 60 * 60 * 24 * 7 },
  { unit: "day", seconds: 60 * 60 * 24 },
  { unit: "hour", seconds: 60 * 60 },
  { unit: "minute", seconds: 60 },
];

const JUST_NOW_THRESHOLD_SECONDS = 45;

/**
 * Formats a date as a human friendly relative time ("3 days ago").
 *
 * Replaces the `vue-moment` plugin used in the Vue 2 version: the browser's
 * native Intl.RelativeTimeFormat does the same job with zero dependencies.
 *
 * @param {string|number|Date} date - Date to format.
 * @param {Date} [now=new Date()] - Reference date (injectable for tests).
 * @param {string} [locale="en"] - BCP 47 locale.
 * @returns {string} Relative time, or an empty string for invalid dates.
 */
export function formatRelativeTime(date, now = new Date(), locale = "en") {
  const target = new Date(date);
  if (Number.isNaN(target.getTime())) return "";

  const diffSeconds = Math.round((target.getTime() - now.getTime()) / 1000);
  const absSeconds = Math.abs(diffSeconds);

  if (absSeconds < JUST_NOW_THRESHOLD_SECONDS) return "just now";

  const formatter = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  const match = UNITS.find(({ seconds }) => absSeconds >= seconds);

  if (!match) return formatter.format(Math.round(diffSeconds), "second");
  return formatter.format(Math.round(diffSeconds / match.seconds), match.unit);
}
